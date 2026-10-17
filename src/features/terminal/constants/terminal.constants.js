import { FILE_REGISTRY, FILE_TREE_ORDER } from '../../explorer/constants/explorer.constants';

export const TERMINAL = {
  PROMPT: 'josue@portfolio:~$',
  WELCOME_MESSAGE: {
    en: "Welcome! Type 'help' to see available commands. Tab autocompletes, ↑/↓ browses history.",
    es: "¡Bienvenido! Escribe 'help' para ver los comandos. Tab autocompleta y ↑/↓ recorre el historial.",
  },
  TABS: [
    { id: 'terminal', label: { en: 'TERMINAL', es: 'TERMINAL' } },
    { id: 'problems', label: { en: 'PROBLEMS', es: 'PROBLEMAS' } },
    { id: 'output', label: { en: 'OUTPUT', es: 'SALIDA' } },
  ],
  NO_PROBLEMS: { en: 'No problems have been detected in the workspace.', es: 'No se detectaron problemas en el espacio de trabajo.' },
  NO_OUTPUT: { en: 'Actions triggered from the terminal will be logged here.', es: 'Aquí se registran las acciones ejecutadas desde la terminal.' },
  CLOSE: { en: 'Close terminal', es: 'Cerrar terminal' },
  INPUT_LABEL: { en: 'Terminal input', es: 'Entrada de terminal' },
  SUGGESTIONS: { en: 'Suggestions', es: 'Sugerencias' },
};

export const LINE_TONES = {
  COMMAND: 'command',
  ERROR: 'error',
  SUCCESS: 'success',
  MUTED: 'muted',
  ACCENT: 'accent',
};

export const PWD_OUTPUT = '/home/josue/portfolio';

export const FILE_NAMES = FILE_TREE_ORDER.map((id) => FILE_REGISTRY[id].name);

export const FILE_NAME_TO_ID = Object.fromEntries(
  Object.entries(FILE_REGISTRY).map(([id, file]) => [file.name.toLowerCase(), id]),
);

// Directory-style aliases so `cd projects` works as well as `cd projects.js`.
export const FILE_ALIASES = Object.fromEntries(
  Object.entries(FILE_REGISTRY).map(([id, file]) => [file.name.split('.')[0].toLowerCase(), id]),
);

export const CONTACT_INFO = {
  email: 'josuechaves.dev@gmail.com',
  github: 'https://github.com/JosueChaves01',
  linkedin: 'https://www.linkedin.com/in/josue-chaves-465ba823a/',
  website: 'https://josuechaves.vercel.app',
};

export const COMMAND_SPECS = [
  { name: 'help', usage: 'help', description: { en: 'Show available commands', es: 'Muestra los comandos disponibles' } },
  { name: 'whoami', usage: 'whoami', description: { en: 'About Josue', es: 'Acerca de Josue' } },
  { name: 'neofetch', usage: 'neofetch', description: { en: 'Profile summary', es: 'Resumen del perfil' } },
  { name: 'projects', usage: 'projects [id]', description: { en: 'List projects or show one in detail', es: 'Lista proyectos o muestra uno en detalle' } },
  { name: 'skills', usage: 'skills [--soft]', description: { en: 'Technical or soft skills', es: 'Habilidades técnicas o blandas' } },
  { name: 'galaxy', usage: 'galaxy', description: { en: 'Open the 3D skills map', es: 'Abre el mapa 3D de habilidades' } },
  { name: 'experience', usage: 'experience', description: { en: 'Experience timeline', es: 'Línea de experiencia' } },
  { name: 'contact', usage: 'contact', description: { en: 'Contact channels', es: 'Canales de contacto' } },
  { name: 'resume', usage: 'resume', description: { en: 'Download the resume (PDF)', es: 'Descarga el currículum (PDF)' } },
  { name: 'ls', usage: 'ls', description: { en: 'List portfolio files', es: 'Lista los archivos del portafolio' } },
  { name: 'open', usage: 'open <file>', description: { en: 'Open a file in the editor (alias: cat, cd)', es: 'Abre un archivo en el editor (alias: cat, cd)' } },
  { name: 'theme', usage: 'theme [name]', description: { en: 'List or change the color theme', es: 'Lista o cambia el tema de color' } },
  { name: 'lang', usage: 'lang <en|es>', description: { en: 'Switch language', es: 'Cambia el idioma' } },
  { name: 'copilot', usage: 'copilot', description: { en: 'Open the AI assistant', es: 'Abre el asistente de IA' } },
  { name: 'git', usage: 'git log', description: { en: 'Recent project activity', es: 'Actividad reciente de proyectos' } },
  { name: 'history', usage: 'history', description: { en: 'Commands used in this session', es: 'Comandos usados en esta sesión' } },
  { name: 'pwd', usage: 'pwd', description: { en: 'Print working directory', es: 'Muestra el directorio actual' } },
  { name: 'echo', usage: 'echo <text>', description: { en: 'Print text', es: 'Imprime texto' } },
  { name: 'date', usage: 'date', description: { en: 'Current date and time', es: 'Fecha y hora actual' } },
  { name: 'clear', usage: 'clear', description: { en: 'Clear the terminal (Ctrl+L)', es: 'Limpia la terminal (Ctrl+L)' } },
  { name: 'exit', usage: 'exit', description: { en: 'Close the terminal', es: 'Cierra la terminal' } },
];

export const COMMAND_ALIASES = { cat: 'open', cd: 'open', '?': 'help', cls: 'clear', cv: 'resume', about: 'whoami' };
