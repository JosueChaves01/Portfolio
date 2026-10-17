import { PROFILE, RECENT_CAPABILITIES } from '../../../../shared/data/recentWork';

export const ABOUT = {
  HEADER_COMMENT: { en: '<-- about.html - Josue Chaves -->', es: '<-- about.html - Josue Chaves -->' },
  HEADING: { en: 'About Me', es: 'Acerca de Mí' },
  SUBHEADING: { en: '// who I am · what I build · how I think', es: '// quién soy · qué construyo · cómo pienso' },
};

export const BIO_TEXT = PROFILE.about;

export const BIO_KEYWORDS = ['Josué Chaves', 'Computer Engineering', 'Ingeniería en Computadores', 'software architecture', 'arquitectura de software', 'SOLID', 'design patterns', 'clean code'];

export const CURRENT_FOCUS_TITLE = { en: 'CURRENT FOCUS', es: 'ENFOQUE ACTUAL' };

export const CURRENT_FOCUS_ITEMS = RECENT_CAPABILITIES.map(({ id, icon, color, title }) => ({ id, icon, color, text: title }));

export const EDUCATION_TITLE = { en: 'EDUCATION', es: 'EDUCACIÓN' };

export const EDUCATION_ITEMS = [
  {
    id: 'edu1',
    icon: 'GraduationCap',
    color: '#3b82f6',
    institution: { en: 'Technological Institute of Costa Rica (TEC)', es: 'Instituto Tecnológico de Costa Rica (TEC)' },
    university: 'Costa Rica',
    degree: { en: 'Bachelor of Engineering in Computer Engineering', es: 'Bachillerato en Ingeniería en Computadores' },
    period: '2022 – Present',
  },
];

export const TALK_ABOUT_TITLE = { en: 'TALK TO ME ABOUT', es: 'HABLEMOS DE' };

export const TALK_ABOUT_ITEMS = [
  { id: 'ta1', icon: 'Blocks', color: '#6366f1', text: { en: 'Software Architecture', es: 'Arquitectura de Software' } },
  { id: 'ta2', icon: 'CreditCard', color: '#22c55e', text: { en: 'Bookings & Payment Integrations', es: 'Reservas e Integraciones de Pago' } },
  { id: 'ta3', icon: 'Server', color: '#f59e0b', text: { en: 'Backend & FullStack Development', es: 'Desarrollo Backend y FullStack' } },
  { id: 'ta4', icon: 'Smartphone', color: '#3b82f6', text: { en: 'UI/UX & Multilingual Websites', es: 'UI/UX y Sitios Multilingües' } },
  { id: 'ta5', icon: 'Sparkles', color: '#a855f7', text: { en: 'AI-assisted Development', es: 'Desarrollo con Apoyo de IA' } },
];


