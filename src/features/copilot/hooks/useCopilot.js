import { useState, useEffect } from 'react';
import { useOverlay } from '../../../store/OverlayContext';
import { getCookie, setCookie } from '../../../shared/utils/storage';
import {
  MAX_MESSAGES,
  COPILOT_COOKIE_KEYS,
  RESET_INTERVAL_MS,
  ROLE,
  API_ENDPOINT,
  COPILOT,
  ERROR_FALLBACK,
} from '../constants/copilot.constants';

function getInitialState() {
  const now = Date.now();
  const lastResetStr = getCookie(COPILOT_COOKIE_KEYS.LAST_RESET);
  const messagesLeftStr = getCookie(COPILOT_COOKIE_KEYS.MESSAGES_LEFT);

  const lastReset = lastResetStr ? parseInt(lastResetStr, 10) : 0;
  const isExpired = now - lastReset > RESET_INTERVAL_MS;

  if (isExpired || !lastResetStr) {
    return {
      count: MAX_MESSAGES,
      resetTime: now,
    };
  }

  const count = messagesLeftStr ? parseInt(messagesLeftStr, 10) : MAX_MESSAGES;
  return {
    count: Math.min(Math.max(0, count), MAX_MESSAGES),
    resetTime: lastReset,
  };
}

export function useCopilot() {
  const { toggleCopilot } = useOverlay();
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  
  const initialState = getInitialState();
  const [messagesLeft, setMessagesLeft] = useState(initialState.count);
  const [lastReset, setLastReset] = useState(initialState.resetTime);
  
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setCookie(COPILOT_COOKIE_KEYS.MESSAGES_LEFT, String(messagesLeft));
    setCookie(COPILOT_COOKIE_KEYS.LAST_RESET, String(lastReset));
  }, [messagesLeft, lastReset]);

  const sendMessage = async (text) => {
    if (!text.trim() || messagesLeft <= 0) return;

    // Double check reset inside sendMessage if the panel was open for a long time
    const now = Date.now();
    if (now - lastReset > RESET_INTERVAL_MS) {
      setMessagesLeft(MAX_MESSAGES);
      setLastReset(now);
      // Continue with the new limit
    }

    const userMsg = { id: `user-${Date.now()}`, role: ROLE.USER, content: text };
    setMessages((prev) => [...prev, userMsg]);
    setInputValue('');
    setError(null);
    setIsLoading(true);

    const history = messages.map((m) => ({ role: m.role, content: m.content }));

    try {
      const res = await fetch(API_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: text.trim(), history }),
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        setError(data?.error ?? ERROR_FALLBACK.REQUEST_FAILED(res.status));
        setIsLoading(false);
        return;
      }

      const content = data?.content ?? '';
      const assistantMsg = {
        id: `assistant-${Date.now()}`,
        role: ROLE.ASSISTANT,
        content: content || COPILOT.NO_RESPONSE_FALLBACK,
      };
      setMessages((prev) => [...prev, assistantMsg]);
      setMessagesLeft((prev) => prev - 1);
    } catch (err) {
      setError(err?.message ?? ERROR_FALLBACK.NETWORK);
    } finally {
      setIsLoading(false);
    }
  };

  const handlePredefinedQuestion = (label) => sendMessage(label);
  const handleSubmit = () => sendMessage(inputValue);

  return {
    messages,
    inputValue,
    setInputValue,
    messagesLeft,
    isLoading,
    error,
    handlePredefinedQuestion,
    handleSubmit,
    onClose: toggleCopilot,
  };
}
