import { getPortfolioContext } from './lib/portfolioContext.js';

const SYSTEM_PROMPT_BASE = `You are the AI assistant for Josue Chaves, a Junior Software Developer from Costa Rica. You are embedded in his IDE-style portfolio. Your goal is to help visitors understand Josue's background, projects, and technical expertise. Always be professional, concise, and helpful. Respond in the language the user is chatting in (English or Spanish). Josue is a Computer Engineering student at ITCR.`;

const OPENROUTER_URL = 'https://openrouter.ai/api/v1/chat/completions';
const OPENROUTER_MODEL = 'stepfun/step-3.5-flash:free';

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

  const portfolioContext = getPortfolioContext();
  const systemPrompt = `${SYSTEM_PROMPT_BASE}\n\nContext about Josue's portfolio (use this to answer questions):\n\n${portfolioContext}`;

  const messages = [
    { role: 'system', content: systemPrompt },
    ...history.slice(-10).map((m) => ({ role: m.role, content: m.content })),
    { role: 'user', content: message.trim() },
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
