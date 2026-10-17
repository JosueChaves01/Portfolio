import { PROFILE, PROJECT_SIGNALS } from '../../../../shared/data/recentWork';

export const HOME = {
  HEADER_COMMENT: { en: '// hello world !! Welcome to my portfolio', es: '// hola mundo !! Bienvenido a mi portafolio' },
  NAME_FIRST: 'Josue',
  NAME_LAST: 'Chaves',
  BIO: PROFILE.bio,
  BIO_KEYWORDS: ['ITCR', 'business operations', 'operación de un negocio', 'AI assistants and automations', 'asistentes y automatizaciones con IA', 'real-time systems', 'sistemas en tiempo real'],
  STATUS: { en: 'Open to work & collaborations', es: 'Abierto a trabajo y colaboraciones' },
};

export const ROLE_BADGES = [
  { id: 'fullstack', label: PROFILE.role, dotColor: '#3b82f6' },
  { id: 'product', label: { en: 'Product & UI/UX', es: 'Producto y UI/UX' }, dotColor: '#facc15' },
  { id: 'ai', label: { en: 'AI-assisted Development', es: 'Desarrollo con IA' }, dotColor: '#22c55e' },
];

export const TYPEWRITER_PHRASES = [
  { en: 'Computer Engineering Student @ ITCR', es: 'Estudiante de Ingeniería en Computadores @ ITCR' },
  { en: 'Shipping web apps, APIs and AI automations', es: 'Creando apps web, APIs y automatizaciones con IA' },
  { en: 'Connecting quotes, bookings and payments', es: 'Conectando cotizaciones, reservas y pagos' },
  { en: 'Designing multilingual mobile experiences', es: 'Diseñando experiencias móviles multilingües' },
  { en: 'Developing with AI, validating with tests', es: 'Desarrollando con IA, validando con pruebas' },
];



export const TYPEWRITER_SPEED_MS = 60;
export const TYPEWRITER_DELETE_SPEED_MS = 30;
export const TYPEWRITER_PAUSE_MS = 2000;

export const ACTION_BUTTONS = [
  { id: 'projects', icon: 'FolderOpen', label: { en: 'View my work', es: 'Ver mi trabajo' }, variant: 'primary', targetTab: 'projects' },
  { id: 'skills', icon: 'Workflow', label: { en: 'Applied skills', es: 'Habilidades aplicadas' }, variant: 'secondary', targetTab: 'skills' },
  { id: 'contact', icon: 'Mail', label: { en: 'Contact', es: 'Contacto' }, variant: 'secondary', targetTab: 'contact' },
];

export const STATS = PROJECT_SIGNALS;

export const SOCIAL_LINKS = [
  { id: 'github', label: 'GitHub', icon: 'Github', color: '#8B949E', url: 'https://github.com/josuechaves01' },
  { id: 'linkedin', label: 'LinkedIn', icon: 'Linkedin', color: '#0A66C2', url: 'https://www.linkedin.com/in/josue-chaves-465ba823a/' },
  { id: 'instagram', label: 'Instagram', icon: 'Instagram', color: '#E4405F', url: 'https://www.instagram.com/josue_chaves__/' },
  { id: 'email', label: 'Email', icon: 'Mail', color: '#EA4335', url: 'mailto:josuechaves.dev@gmail.com' },
  { id: 'youtube', label: 'YouTube', icon: 'Youtube', color: '#FF0000', url: 'https://www.youtube.com/@josue.chaves9270' },
];
