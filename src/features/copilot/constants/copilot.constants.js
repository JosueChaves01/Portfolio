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
  MESSAGES_LEFT_TEMPLATE: (count) => ({
    en: `${count} messages left`,
    es: `${count} mensajes restantes`
  }),
  DISCLAIMER: {
    en: 'AI-generated content may be incorrect.',
    es: 'El contenido generado por IA puede ser incorrecto.'
  },
  INPUT_PLACEHOLDER: { en: 'Ask Copilot...', es: 'Preguntar a Copilot...' },
};

export const MAX_MESSAGES = 2;

export const PREDEFINED_QUESTIONS = [
  { id: 'skills', label: { en: 'Summarize my technical skills', es: 'Resume mis habilidades técnicas' } },
  { id: 'projects', label: { en: 'Show my latest projects', es: 'Muestra mis últimos proyectos' } },
  { id: 'experience', label: { en: 'What is my professional focus?', es: '¿Cuál es mi enfoque profesional?' } },
];

export const QUESTION_PREFIX = '⚡';

export const SYSTEM_PROMPT = `You are the AI assistant for Josue Chaves, a Junior Software Developer from Costa Rica. 
You are embedded in his IDE-style portfolio.
Your goal is to help visitors understand Josue's background, projects (BarberHub, Roomiefy, Chess vs IA), and technical expertise (Node.js, TypeScript, PostgreSQL, Docker, AI Agents).
Always be professional, concise, and helpful. 
Respond in the language the user is chatting in (English or Spanish).
Josue is a Computer Engineering student at ITCR.`;
