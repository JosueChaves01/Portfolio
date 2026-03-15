import { getPortfolioContext } from './lib/portfolioContext.js';

const SYSTEM_PROMPT_BASE = `You are the AI assistant for Josue Chaves, a Junior Software Developer from Costa Rica. You are embedded in his IDE-style portfolio.

CRITICAL RULES (follow strictly):
- Answer ONLY using the "Context about Josue's portfolio" block below. That is your only source of truth.
- NEVER use external knowledge. NEVER invent data. NEVER provide generic code, tutorials, or explanations that are not in that context.
- NEVER answer about: current date/time, weather, news, generic programming how-to, code snippets in any language, math or logic puzzles, or any topic not explicitly covered in the context.
- If the question cannot be answered from the context, reply with exactly one short sentence: say you can only help with questions about Josue's portfolio, projects, experience, skills, or contact, and suggest they ask about those. Use the same language as the user (English or Spanish).
- Be professional, concise, and helpful. Josue is a Computer Engineering student at ITCR.`;

const OPENROUTER_URL = 'https://openrouter.ai/api/v1/chat/completions';
const OPENROUTER_MODEL = 'stepfun/step-3.5-flash:free';

/** Patterns that indicate off-topic questions (date/time, generic code, general how-to). */
const OFF_TOPIC_PATTERNS = [
  /\b(qu[eé]?\s*d[ií]a|what\s*day|hoy\s*es|today\s*is|fecha|date\s*is|current\s*date|qu[eé]\s*hora|what\s*time)\b/i,
  /\b(funci[oó]n\s*(en|para|en python|in python)|function\s*(to|in python|for)|c[oó]digo\s*(para|en)|code\s*(to|for|in))/i,
  /\bfunci[oó]n\s+en\s+python\b/i,
  /\b(programar|escribir|crear)\s+(una\s+)?funci[oó]n\s+(en\s+)?(python|javascript|java)\b/i,
  /\b(dame\s+una\s+funci[oó]n|give\s+me\s+a\s+function|escr[ií]beme\s+un|write\s+me\s+a)\b/i,
  /\b(c[oó]mo\s+invertir|how\s+to\s+reverse|invertir\s+(una\s+)?lista|reverse\s+(a\s+)?list)\b/i,
  /\b(ordenar|sort)\s+(una\s+)?lista\b/i,
  /\b(c[oó]mo\s+hacer\s+(una|un)|how\s+do\s+I\s+(make|write|create)|expl[ií]came\s+c[oó]mo)\b/i,
  /\b(python|javascript|java)\s+(function|code|snippet|ejemplo|example)\b/i,
  /\b(weather|clima|tiempo\s+atmosf[eé]rico|noticias|news)\b/i,
];

function isOffTopic(text) {
  const t = text.trim().toLowerCase();
  return OFF_TOPIC_PATTERNS.some((p) => p.test(t));
}

function isSpanish(text) {
  return /\b(qu[eé]|c[oó]mo|d[ií]a|funci[oó]n|puedes|dame|gracias|hola|espa[nñ]ol)\b/i.test(text) || /[áéíóúñ¿¡]/.test(text);
}

const DECLINE_ES = 'Solo puedo responder preguntas sobre el portafolio de Josué: sus proyectos, experiencia, habilidades o contacto. ¿Algo de eso te gustaría saber?';
const DECLINE_EN = "I can only answer questions about Josue's portfolio: his projects, experience, skills, or contact. Would you like to know about any of that?";

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  const apiKey = process.env.OPENROUTER_API_KEY;
  if (!apiKey) {
    res.status(500).json({ error: 'OpenRouter API key not configured' });
    return;
  }

  let body;
  try {
    body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body || {};
  } catch {
    res.status(400).json({ error: 'Invalid JSON body' });
    return;
  }

  const { message, history = [] } = body;
  if (!message || typeof message !== 'string' || !message.trim()) {
    res.status(400).json({ error: 'Missing or empty message' });
    return;
  }

  const trimmedMessage = message.trim();
  if (isOffTopic(trimmedMessage)) {
    const content = isSpanish(trimmedMessage) ? DECLINE_ES : DECLINE_EN;
    res.status(200).setHeader('Content-Type', 'application/json').json({ content });
    return;
  }

  const portfolioContext = getPortfolioContext();
  const systemPrompt = `${SYSTEM_PROMPT_BASE}\n\nContext about Josue's portfolio (use this to answer questions):\n\n${portfolioContext}`;

  const messages = [
    { role: 'system', content: systemPrompt },
    ...history.slice(-10).map((m) => ({ role: m.role, content: m.content })),
    { role: 'user', content: trimmedMessage },
  ];

  try {
    const response = await fetch(OPENROUTER_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
        'HTTP-Referer': req.headers.origin || req.headers.referer || '',
      },
      body: JSON.stringify({
        model: OPENROUTER_MODEL,
        messages,
        max_tokens: 1024,
      }),
    });

    if (!response.ok) {
      const errText = await response.text();
      console.error('OpenRouter error', response.status, errText);
      res.status(502).json({ error: 'LLM request failed', details: errText.slice(0, 200) });
      return;
    }

    const data = await response.json();
    const content = data?.choices?.[0]?.message?.content?.trim() ?? '';

    if (!content) {
      res.status(502).json({ error: 'Empty response from LLM' });
      return;
    }

    res.status(200).setHeader('Content-Type', 'application/json').json({ content });
  } catch (err) {
    console.error('Copilot API error', err);
    res.status(500).json({ error: 'Internal server error', details: err.message });
  }
};
