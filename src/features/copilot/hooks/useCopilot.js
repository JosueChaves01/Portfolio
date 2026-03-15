import { useState, useEffect } from 'react';
import { useOverlay } from '../../../store/OverlayContext';
import { MAX_MESSAGES, COPILOT_MESSAGES_LEFT_KEY, PREDEFINED_QUESTIONS } from '../constants/copilot.constants';

const ROLE = { USER: 'user', ASSISTANT: 'assistant' };

function getInitialMessagesLeft() {
  try {
    const stored = localStorage.getItem(COPILOT_MESSAGES_LEFT_KEY);
    if (stored == null) return MAX_MESSAGES;
    const n = parseInt(stored, 10);
    if (!Number.isInteger(n) || n < 0 || n > MAX_MESSAGES) return MAX_MESSAGES;
    return n;
  } catch {
    return MAX_MESSAGES;
  }
}

export function useCopilot() {
  const { toggleCopilot } = useOverlay();
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [messagesLeft, setMessagesLeft] = useState(getInitialMessagesLeft);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    localStorage.setItem(COPILOT_MESSAGES_LEFT_KEY, String(messagesLeft));
  }, [messagesLeft]);

  const sendMessage = async (text) => {
    if (!text.trim() || messagesLeft <= 0) return;

    const userMsg = { id: `user-${Date.now()}`, role: ROLE.USER, content: text };
    setMessages((prev) => [...prev, userMsg]);
    setInputValue('');
    setError(null);
    setIsLoading(true);

    const history = messages.map((m) => ({ role: m.role, content: m.content }));

    try {
      const res = await fetch('/api/copilot', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: text.trim(), history }),
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        setError(data?.error ?? `Request failed (${res.status})`);
        setIsLoading(false);
        return;
      }

      const content = data?.content ?? '';
      const assistantMsg = {
        id: `assistant-${Date.now()}`,
        role: ROLE.ASSISTANT,
        content: content || 'No response from the assistant.',
      };
      setMessages((prev) => [...prev, assistantMsg]);
      setMessagesLeft((prev) => prev - 1);
    } catch (err) {
      setError(err?.message ?? 'Network error');
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
