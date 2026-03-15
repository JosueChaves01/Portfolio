import { useState } from 'react';
import { useOverlay } from '../../../store/OverlayContext';
import { MAX_MESSAGES, PREDEFINED_QUESTIONS } from '../constants/copilot.constants';
import { MOCK_RESPONSES } from '../mocks/copilot.responses.mock.js';

const ROLE = { USER: 'user', ASSISTANT: 'assistant' };

export function useCopilot() {
  const { toggleCopilot } = useOverlay();
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [messagesLeft, setMessagesLeft] = useState(MAX_MESSAGES);

  const getResponse = (text) => {
    const lower = text.toLowerCase();
    const matched = PREDEFINED_QUESTIONS.find((q) => lower.includes(q.id.slice(1)));
    return matched ? MOCK_RESPONSES[matched.id] : MOCK_RESPONSES.default;
  };

  const sendMessage = (text) => {
    if (!text.trim() || messagesLeft <= 0) return;

    const userMsg = { id: `user-${Date.now()}`, role: ROLE.USER, content: text };
    const assistantMsg = { id: `assistant-${Date.now()}`, role: ROLE.ASSISTANT, content: getResponse(text) };

    setMessages((prev) => [...prev, userMsg, assistantMsg]);
    setMessagesLeft((prev) => prev - 1);
    setInputValue('');
  };

  const handlePredefinedQuestion = (label) => sendMessage(label);
  const handleSubmit = () => sendMessage(inputValue);

  return {
    messages,
    inputValue,
    setInputValue,
    messagesLeft,
    handlePredefinedQuestion,
    handleSubmit,
    onClose: toggleCopilot,
  };
}
