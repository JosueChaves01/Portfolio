/**
 * Builds the copilot system prompt by combining base prompt and portfolio context.
 * Single responsibility: prompt assembly only.
 */

import { SYSTEM_PROMPT_BASE, CONTEXT_HEADER } from './copilot.constants.js';

/**
 * @param {string} portfolioContext - Full portfolio context string from getPortfolioContext()
 * @returns {string}
 */
export function buildSystemPrompt(portfolioContext) {
  return `${SYSTEM_PROMPT_BASE}\n\n${CONTEXT_HEADER}\n\n${portfolioContext}`;
}
