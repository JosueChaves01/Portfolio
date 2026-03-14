export const STORAGE_KEY_THEME = 'portfolio-theme';

export const THEME_IDS = {
  TOTE_DARK: 'tote-dark',
  ROSE_PINE: 'rose-pine',
  TOKYO_NIGHT: 'tokyo-night',
  CATPPUCCIN: 'catppuccin',
  NORD: 'nord',
  GRUVBOX: 'gruvbox',
};

export const THEMES = [
  { id: THEME_IDS.TOTE_DARK, label: 'Tote Dark', color: '#6366f1' },

  { id: THEME_IDS.ROSE_PINE, label: 'Rosé Pine', color: '#eb6f92' },
  { id: THEME_IDS.TOKYO_NIGHT, label: 'Tokyo Night', color: '#7aa2f7' },
  { id: THEME_IDS.CATPPUCCIN, label: 'Catppuccin', color: '#cba6f7' },
  { id: THEME_IDS.NORD, label: 'Nord', color: '#81a1c1' },
  { id: THEME_IDS.GRUVBOX, label: 'Gruvbox', color: '#d79921' },
];

export const SETTINGS = {
  SECTION_THEME: 'COLOR THEME',
  SECTION_QUICK_ACTIONS: 'QUICK ACTIONS',
  SECTION_SHORTCUTS: 'KEYBOARD SHORTCUTS',
  FOOTER_VERSION: 'Portfolio · React + Vite',
  FOOTER_CREDIT: 'Made with AI by Josue Chaves',
};

export const QUICK_ACTIONS = [
  { id: 'command-palette', label: 'Command Palette', icon: 'Command', shortcut: 'Ctrl+P', action: 'toggleCommandPalette' },
  { id: 'toggle-terminal', label: 'Toggle Terminal', icon: 'Terminal', shortcut: 'Ctrl+`', action: 'toggleTerminal' },
  { id: 'copilot-chat', label: 'Copilot Chat', icon: 'Bot', shortcut: '', action: 'toggleCopilot' },
  { id: 'download-resume', label: 'Download Resume', icon: 'Download', shortcut: '', action: 'downloadResume' },
  { id: 'fullscreen', label: 'Toggle Fullscreen', icon: 'Maximize', shortcut: 'F11', action: 'fullscreen' },
];

export const KEYBOARD_SHORTCUTS_LIST = [
  { shortcut: 'Ctrl P', description: 'Go to file (command palette)' },
  { shortcut: 'Ctrl `', description: 'Toggle terminal' },
  { shortcut: 'Ctrl B', description: 'Toggle sidebar' },
  { shortcut: 'Esc', description: 'Close overlay' },
  { shortcut: '\u2191 / \u2193', description: 'Terminal history' },
];
