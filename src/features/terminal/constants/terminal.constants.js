import { FILE_REGISTRY, FILE_TREE_ORDER, FILE_IDS } from '../../explorer/constants/explorer.constants';

export const TERMINAL = {
  PROMPT: 'aahana@portfolio:~$',
  WELCOME_MESSAGE: "Welcome! Type 'help' to see available commands.",
  TAB_LABELS: ['TERMINAL', 'PROBLEMS', 'OUTPUT'],
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

export const WHOAMI_OUTPUT = [
  'Name:     Aahana Bobade',
  'Title:    Junior Software Developer',
  'Company:  @ EduVanceAI',
  'Roles:    Backend Engineer · AI/ML Dev · Data Scientist',
  'Location: India',
  'Email:    aahanabobade@gmail.com',
];

export const GIT_LOG_OUTPUT = [
  'commit a3f1c2e — feat: add RAG pipeline integration',
  'commit b7d4a1f — fix: optimize PostgreSQL queries',
  'commit c9e2d3b — feat: implement GraphRAG with Neo4j',
  'commit d1f5a8c — refactor: modularize FastAPI routers',
  'commit e4b7c6d — feat: deploy portfolio v3.0',
];

export const PYTHON_VERSION_OUTPUT = 'Python 3.11.4';

export const LS_OUTPUT = FILE_TREE_ORDER.map((id) => FILE_REGISTRY[id].name).join('  ');

export const PWD_OUTPUT = '/home/aahana/portfolio';

export const HELP_OUTPUT = [
  'Available commands:',
  '  help              — Show this help message',
  '  ls                — List project files',
  '  pwd               — Print working directory',
  '  cd <dir>          — Change directory',
  '  cat <file>        — Open file in editor',
  '  open <file>       — Alias for cat',
  '  whoami            — About Aahana',
  '  echo <text>       — Print text',
  '  date              — Show current date & time',
  '  git log           — Show recent commits',
  '  python --version  — Show Python version',
  '  clear             — Clear terminal',
];

export const FILE_NAME_TO_ID = Object.fromEntries(
  Object.entries(FILE_REGISTRY).map(([id, file]) => [file.name, id])
);
