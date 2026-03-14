import { FILE_IDS } from '../../explorer/constants/explorer.constants';
import { PANEL_IDS } from '../../activityBar/constants/activityBar.constants';

export const MENU_ITEM_IDS = {
  FILE:     'file',
  EDIT:     'edit',
  VIEW:     'view',
  GO:       'go',
  RUN:      'run',
  TERMINAL: 'terminal',
  HELP:     'help',
  COPILOT:  'copilot',
};

export const MENU_ITEMS = [
  {
    id: MENU_ITEM_IDS.FILE,
    label: { en: 'File', es: 'Archivo' },
    items: [
      { id: 'open-file', label: { en: 'Open File...', es: 'Abrir archivo...' }, action: 'toggleCommandPalette', shortcut: 'Ctrl+P' },
      { type: 'separator' },
      { id: 'download-resume', label: { en: 'Download Resume', es: 'Descargar currículum' }, action: 'downloadResume' },
    ],
  },
  {
    id: MENU_ITEM_IDS.EDIT,
    label: { en: 'Edit', es: 'Editar' },
    items: [
      { id: 'copy-url', label: { en: 'Copy Page URL', es: 'Copiar URL de la página' }, action: 'copyPageUrl' },
    ],
  },
  {
    id: MENU_ITEM_IDS.VIEW,
    label: { en: 'View', es: 'Ver' },
    items: [
      { id: 'view-explorer', label: { en: 'Explorer', es: 'Explorador' }, action: 'togglePanel', payload: PANEL_IDS.EXPLORER },
      { id: 'view-source-ctrl', label: { en: 'Source Control', es: 'Control de código' }, action: 'togglePanel', payload: PANEL_IDS.SOURCE_CONTROL },
      { type: 'separator' },
      { id: 'view-terminal', label: { en: 'Terminal', es: 'Terminal' }, action: 'toggleTerminal', shortcut: 'Ctrl+`' },
      { id: 'view-copilot', label: { en: 'Copilot Chat', es: 'Chat de Copilot' }, action: 'toggleCopilot' },
      { type: 'separator' },
      { id: 'view-palette', label: { en: 'Command Palette', es: 'Paleta de Comandos' }, action: 'toggleCommandPalette', shortcut: 'Ctrl+P' },
      { type: 'separator' },
      { id: 'view-settings', label: { en: 'Settings', es: 'Ajustes' }, action: 'togglePanel', payload: PANEL_IDS.SETTINGS },
    ],
  },
  {
    id: MENU_ITEM_IDS.GO,
    label: { en: 'Go', es: 'Ir a' },
    items: [
      { id: 'go-to-file', label: { en: 'Go to File...', es: 'Ir al archivo...' }, action: 'toggleCommandPalette', shortcut: 'Ctrl+P' },
      { type: 'separator' },
      { id: 'go-home', label: 'home.tsx', action: 'openTab', payload: FILE_IDS.HOME },
      { id: 'go-about', label: 'about.html', action: 'openTab', payload: FILE_IDS.ABOUT },
      { id: 'go-projects', label: 'projects.js', action: 'openTab', payload: FILE_IDS.PROJECTS },
      { id: 'go-skills', label: 'skills.json', action: 'openTab', payload: FILE_IDS.SKILLS },
      { id: 'go-experience', label: 'experience.ts', action: 'openTab', payload: FILE_IDS.EXPERIENCE },
      { id: 'go-contact', label: 'contact.css', action: 'openTab', payload: FILE_IDS.CONTACT },
      { id: 'go-readme', label: 'README.md', action: 'openTab', payload: FILE_IDS.README },
    ],
  },
  {
    id: MENU_ITEM_IDS.RUN,
    label: { en: 'Run', es: 'Ejecutar' },
    items: [
      { id: 'run-new-terminal', label: { en: 'New Terminal', es: 'Nueva terminal' }, action: 'newTerminal' },
    ],
  },
  {
    id: MENU_ITEM_IDS.TERMINAL,
    label: { en: 'Terminal', es: 'Terminal' },
    items: [
      { id: 'terminal-new', label: { en: 'New Terminal', es: 'Nueva terminal' }, action: 'newTerminal' },
    ],
  },
  {
    id: MENU_ITEM_IDS.HELP,
    label: { en: 'Help', es: 'Ayuda' },
    items: [
      { id: 'help-shortcuts', label: { en: 'Keyboard Shortcuts', es: 'Atajos de teclado' }, action: 'togglePanel', payload: PANEL_IDS.SETTINGS },
      { type: 'separator' },
      { id: 'lang-en', label: 'English (US)', action: 'setLanguage', payload: 'en' },
      { id: 'lang-es', label: 'Español (ES)', action: 'setLanguage', payload: 'es' },
      { type: 'separator' },
      { id: 'help-github', label: { en: 'View Source on GitHub', es: 'Ver fuente en GitHub' }, action: 'openGitHub' },
      { type: 'separator' },
      { id: 'help-about', label: { en: 'About', es: 'Acerca de' }, action: 'openTab', payload: FILE_IDS.README },
    ],
  },
  {
    id: MENU_ITEM_IDS.COPILOT,
    label: { en: 'Copilot', es: 'Copilot' },
    items: [
      { id: 'copilot-open', label: { en: 'Open Copilot Chat', es: 'Abrir chat de Copilot' }, action: 'toggleCopilot' },
    ],
  },
];

