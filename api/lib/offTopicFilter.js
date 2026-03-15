/**
 * Off-topic filter for copilot: detects questions outside portfolio scope and returns a decline message.
 * Single responsibility: classify user message and provide localized decline text.
 */

import { DECLINE_MESSAGE } from './copilot.constants.js';

/** Patterns that indicate off-topic questions (date/time, generic code, general how-to). */
export const OFF_TOPIC_PATTERNS = [
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

/**
 * @param {string} text - User message
 * @returns {boolean}
 */
export function isOffTopic(text) {
  const t = text.trim().toLowerCase();
  return OFF_TOPIC_PATTERNS.some((p) => p.test(t));
}

/**
 * @param {string} text - User message
 * @returns {boolean}
 */
export function isSpanish(text) {
  return /\b(qu[eé]|c[oó]mo|d[ií]a|funci[oó]n|puedes|dame|gracias|hola|espa[nñ]ol)\b/i.test(text) || /[áéíóúñ¿¡]/.test(text);
}

/**
 * Returns the decline message in the appropriate language.
 * @param {string} text - User message (used to detect language)
 * @returns {string}
 */
export function getDeclineMessage(text) {
  return isSpanish(text) ? DECLINE_MESSAGE.es : DECLINE_MESSAGE.en;
}
