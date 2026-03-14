export const LANGUAGES = [
  { id: 'en', label: 'English', icon: '🇺🇸' },
  { id: 'es', label: 'Español', icon: '🇪🇸' },
];

export const SETTINGS = {
  SECTION_THEME: { en: 'COLOR THEME', es: 'TEMA DE COLOR' },
  SECTION_LANGUAGE: { en: 'LANGUAGE', es: 'IDIOMA' },
  SECTION_QUICK_ACTIONS: { en: 'QUICK ACTIONS', es: 'ACCIONES RÁPIDAS' },
  SECTION_SHORTCUTS: { en: 'KEYBOARD SHORTCUTS', es: 'ATAJOS DE TECLADO' },
  FOOTER_VERSION: { en: 'Portfolio · React + Vite', es: 'Portfolio · React + Vite' },
  FOOTER_CREDIT: { en: 'Made with AI by Josue Chaves', es: 'Hecho con IA por Josue Chaves' },
};

export const QUICK_ACTIONS = [
  { id: 'command-palette', label: { en: 'Command Palette', es: 'Paleta de Comandos' }, icon: 'Command', shortcut: 'Ctrl+P', action: 'toggleCommandPalette' },
  { id: 'toggle-terminal', label: { en: 'Toggle Terminal', es: 'Activar Terminal' }, icon: 'Terminal', shortcut: 'Ctrl+`', action: 'toggleTerminal' },
  { id: 'copilot-chat', label: { en: 'Copilot Chat', es: 'Copilot Chat' }, icon: 'Bot', shortcut: '', action: 'toggleCopilot' },
  { id: 'download-resume', label: { en: 'Download Resume', es: 'Descargar Curriculum' }, icon: 'Download', shortcut: '', action: 'downloadResume' },
  { id: 'fullscreen', label: { en: 'Toggle Fullscreen', es: 'Pantalla Completa' }, icon: 'Maximize', shortcut: 'F11', action: 'fullscreen' },
];

export const KEYBOARD_SHORTCUTS_LIST = [
  { shortcut: 'Ctrl P', description: { en: 'Go to file (command palette)', es: 'Ir al archivo (paleta de comandos)' } },
  { shortcut: 'Ctrl `', description: { en: 'Toggle terminal', es: 'Activar terminal' } },
  { shortcut: 'Ctrl B', description: { en: 'Toggle sidebar', es: 'Activar barra lateral' } },
  { shortcut: 'Esc', description: { en: 'Close overlay', es: 'Cerrar superposición' } },
  { shortcut: '\u2191 / \u2193', description: { en: 'Terminal history', es: 'Historial del terminal' } },
];

