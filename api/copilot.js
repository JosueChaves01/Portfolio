/**
 * Copilot API handler. Single responsibility: validate request, delegate to filter/prompt/LLM, send response.
 */

import { getPortfolioContext } from './lib/portfolioContext.js';
import { isOffTopic, getDeclineMessage } from './lib/offTopicFilter.js';
import { buildSystemPrompt } from './lib/buildCopilotPrompt.js';
import {
  OPENROUTER_URL,
  OPENROUTER_MODEL,
  MAX_TOKENS,
  HISTORY_MESSAGES_LIMIT,
  HTTP_METHOD_POST,
  CONTENT_TYPE_JSON,
  HEADER_AUTHORIZATION,
  HEADER_REFERER,
} from './lib/copilot.constants.js';

const ENV_KEY_OPENROUTER = 'OPENROUTER_API_KEY';
const SLICE_ERROR_DETAILS = 200;

export default async function handler(req, res) {
  if (req.method !== HTTP_METHOD_POST) {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  const apiKey = process.env[ENV_KEY_OPENROUTER];
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
    const content = getDeclineMessage(trimmedMessage);
    res.status(200).setHeader('Content-Type', CONTENT_TYPE_JSON).json({ content });
    return;
  }

  const portfolioContext = getPortfolioContext();
  const systemPrompt = buildSystemPrompt(portfolioContext);

  const messages = [
    { role: 'system', content: systemPrompt },
    ...history.slice(-HISTORY_MESSAGES_LIMIT).map((m) => ({ role: m.role, content: m.content })),
    { role: 'user', content: trimmedMessage },
  ];

  try {
    const response = await fetch(OPENROUTER_URL, {
      method: HTTP_METHOD_POST,
      headers: {
        'Content-Type': CONTENT_TYPE_JSON,
        [HEADER_AUTHORIZATION]: `Bearer ${apiKey}`,
        [HEADER_REFERER]: req.headers.origin || req.headers.referer || '',
      },
      body: JSON.stringify({
        model: OPENROUTER_MODEL,
        messages,
        max_tokens: MAX_TOKENS,
      }),
    });

    if (!response.ok) {
      const errText = await response.text();
      console.error('OpenRouter error', response.status, errText);
      res.status(502).json({ error: 'LLM request failed', details: errText.slice(0, SLICE_ERROR_DETAILS) });
      return;
    }

    const data = await response.json();
    const content = data?.choices?.[0]?.message?.content?.trim() ?? '';

    if (!content) {
      res.status(502).json({ error: 'Empty response from LLM' });
      return;
    }

    res.status(200).setHeader('Content-Type', CONTENT_TYPE_JSON).json({ content });
  } catch (err) {
    console.error('Copilot API error', err);
    res.status(500).json({ error: 'Internal server error', details: err.message });
  }
}
