export const COPILOT = {
  TITLE: { en: 'COPILOT', es: 'COPILOT' },
  WORKSPACE_BADGE: 'Portfolio',
  WELCOME_HEADING: { en: 'Hi Josue, I\'m your assistant', es: 'Hola Josue, soy tu asistente' },
  WELCOME_BODY: {
    en: 'How can I help you build your portfolio today? I have context on your projects, skills, and experience.',
    es: '¿Cómo puedo ayudarte a construir tu portafolio hoy? Tengo contexto sobre tus proyectos, habilidades y experiencia.'
  },
  AVATAR_ICON: 'Sparkles',
  EDIT_ICON: 'SquarePen',
  SEND_ICON: 'Send',
  MESSAGES_LEFT_TEMPLATE: (count) => ({
    en: `${count} messages left`,
    es: `${count} mensajes restantes`
  }),
  DISCLAIMER: {
    en: 'AI-generated content may be incorrect.',
    es: 'El contenido generado por IA puede ser incorrecto.'
  },
  INPUT_PLACEHOLDER: { en: 'Ask Copilot...', es: 'Preguntar a Copilot...' },
  ARIA_LABEL: {
    EDIT: { en: 'Edit', es: 'Editar' },
    CLOSE: { en: 'Close', es: 'Cerrar' },
    SEND: { en: 'Send message', es: 'Enviar mensaje' },
  },
  LOADING: { en: 'Copilot is typing...', es: 'Copilot está escribiendo...' },
  NO_RESPONSE_FALLBACK: 'No response from the assistant.',
};

export const MAX_MESSAGES = 2;

export const COPILOT_MESSAGES_LEFT_KEY = 'portfolio-copilot-messages-left';

export const PREDEFINED_QUESTIONS = [
  { id: 'skills', label: { en: 'Summarize my technical skills', es: 'Resume mis habilidades técnicas' } },
  { id: 'projects', label: { en: 'Show my latest projects', es: 'Muestra mis últimos proyectos' } },
  { id: 'experience', label: { en: 'What is my professional focus?', es: '¿Cuál es mi enfoque profesional?' } },
];

export const QUESTION_PREFIX = '⚡';

export const ROLE = {
  USER: 'user',
  ASSISTANT: 'assistant',
};

export const ROLE_LABELS = {
  user: { en: 'You', es: 'Tú' },
  assistant: { en: 'Copilot', es: 'Copilot' },
};

export const API_ENDPOINT = '/api/copilot';

export const ERROR_FALLBACK = {
  REQUEST_FAILED: (status) => `Request failed (${status})`,
  NETWORK: 'Network error',
};

export const ICON_SIZE = {
  SMALL: 14,
  AVATAR: 24,
};
