import { FILE_REGISTRY, FILE_TREE_ORDER, FILE_IDS } from '../../explorer/constants/explorer.constants';

export const TERMINAL = {
  PROMPT: 'josue@portfolio:~$',
  WELCOME_MESSAGE: { 
    en: "Welcome! Type 'help' to see available commands.", 
    es: "¡Bienvenido! Escribe 'help' para ver los comandos disponibles." 
  },
  TAB_LABELS: [
    { en: 'TERMINAL', es: 'TERMINAL' },
    { en: 'PROBLEMS', es: 'PROBLEMAS' },
    { en: 'OUTPUT', es: 'SALIDA' }
  ],
};

export const TERMINAL_COMMANDS = {
  HELP: 'help',
  LS: 'ls',
  PWD: 'pwd',
  CD: 'cd',
  CAT: 'cat',
  OPEN: 'open',
  WHOAMI: 'whoami',
  ECHO: 'echo',
  DATE: 'date',
  GIT_LOG: 'git log',
  PYTHON_VERSION: 'python --version',
  PYTHON: 'python',
  CLEAR: 'clear',
  GIT: 'git',
};

export const WHOAMI_OUTPUT = {
  en: [
    'Name:     Josue Chaves',
    'Title:    Computer Engineering Student',
    'Company:  @ ITCR (TEC)',
    'Roles:    Backend Engineer · GIS Dev · Distributed Systems',
    'Location: Costa Rica',
    'Email:    josuechaves.dev@gmail.com',
  ],
  es: [
    'Nombre:   Josué Chaves',
    'Título:   Estudiante de Ingeniería en Computadores',
    'Empresa:  @ ITCR (TEC)',
    'Roles:    Ingeniero Backend · Dev GIS · Sistemas Distribuidos',
    'Ubicación: Costa Rica',
    'Correo:   josuechaves.dev@gmail.com',
  ]
};

export const GIT_LOG_OUTPUT = [
  'commit a3f1c2e — feat: add BarberHub authentication API',
  'commit b7d4a1f — fix: optimize PostGIS geospatial queries',
  'commit c9e2d3b — feat: implement Chess AI with Web Workers',
  'commit d1f5a8c — refactor: improve Docker container orchestration',
  'commit e4b7c6d — feat: initial release of Roomiefy platform',
];

export const PYTHON_VERSION_OUTPUT = 'Python 3.11.4';

export const LS_OUTPUT = FILE_TREE_ORDER.map((id) => FILE_REGISTRY[id].name).join('  ');

export const PWD_OUTPUT = '/home/josue/portfolio';


export const HELP_OUTPUT = {
  en: [
    'Available commands:',
    '  help              — Show this help message',
    '  ls                — List project files',
    '  pwd               — Print working directory',
    '  cd <dir>          — Change directory',
    '  cat <file>        — Open file in editor',
    '  open <file>       — Alias for cat',
    '  whoami            — About Josue',
    '  echo <text>       — Print text',
    '  date              — Show current date & time',
    '  git log           — Show recent commits',
    '  python --version  — Show Python version',
    '  clear             — Clear terminal',
  ],
  es: [
    'Comandos disponibles:',
    '  help              — Muestra este mensaje de ayuda',
    '  ls                — Lista los archivos del proyecto',
    '  pwd               — Muestra el directorio de trabajo',
    '  cd <dir>          — Cambia de directorio',
    '  cat <file>        — Abre un archivo en el editor',
    '  open <file>       — Alias de cat',
    '  whoami            — Acerca de Josue',
    '  echo <text>       — Imprime texto',
    '  date              — Muestra la fecha y hora actual',
    '  git log           — Muestra los commits recientes',
    '  python --version  — Muestra la versión de Python',
    '  clear             — Limpia la terminal',
  ]
};



export const FILE_NAME_TO_ID = Object.fromEntries(
  Object.entries(FILE_REGISTRY).map(([id, file]) => [file.name, id])
);
