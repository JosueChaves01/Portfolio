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
    label: 'File',
    items: [
      { id: 'open-file',       label: 'Open File...',    action: 'toggleCommandPalette', shortcut: 'Ctrl+P' },
      { type: 'separator' },
      { id: 'download-resume', label: 'Download Resume', action: 'downloadResume' },
    ],
  },
  {
    id: MENU_ITEM_IDS.EDIT,
    label: 'Edit',
    items: [
      { id: 'copy-url', label: 'Copy Page URL', action: 'copyPageUrl' },
    ],
  },
  {
    id: MENU_ITEM_IDS.VIEW,
    label: 'View',
    items: [
      { id: 'view-explorer',    label: 'Explorer',        action: 'togglePanel', payload: PANEL_IDS.EXPLORER },
      { id: 'view-source-ctrl', label: 'Source Control',  action: 'togglePanel', payload: PANEL_IDS.SOURCE_CONTROL },
      { type: 'separator' },
      { id: 'view-terminal',    label: 'Terminal',        action: 'toggleTerminal', shortcut: 'Ctrl+`' },
      { id: 'view-copilot',     label: 'Copilot Chat',    action: 'toggleCopilot' },
      { type: 'separator' },
      { id: 'view-palette',     label: 'Command Palette', action: 'toggleCommandPalette', shortcut: 'Ctrl+P' },
      { type: 'separator' },
      { id: 'view-settings',    label: 'Settings',        action: 'togglePanel', payload: PANEL_IDS.SETTINGS },
    ],
  },
  {
    id: MENU_ITEM_IDS.GO,
    label: 'Go',
    items: [
      { id: 'go-to-file',    label: 'Go to File...',  action: 'toggleCommandPalette', shortcut: 'Ctrl+P' },
      { type: 'separator' },
      { id: 'go-home',       label: 'home.tsx',       action: 'openTab', payload: FILE_IDS.HOME },
      { id: 'go-about',      label: 'about.html',     action: 'openTab', payload: FILE_IDS.ABOUT },
      { id: 'go-projects',   label: 'projects.js',    action: 'openTab', payload: FILE_IDS.PROJECTS },
      { id: 'go-skills',     label: 'skills.json',    action: 'openTab', payload: FILE_IDS.SKILLS },
      { id: 'go-experience', label: 'experience.ts',  action: 'openTab', payload: FILE_IDS.EXPERIENCE },
      { id: 'go-contact',    label: 'contact.css',    action: 'openTab', payload: FILE_IDS.CONTACT },
      { id: 'go-readme',     label: 'README.md',      action: 'openTab', payload: FILE_IDS.README },
    ],
  },
  {
    id: MENU_ITEM_IDS.RUN,
    label: 'Run',
    items: [
      { id: 'run-new-terminal', label: 'New Terminal', action: 'newTerminal' },
    ],
  },
  {
    id: MENU_ITEM_IDS.TERMINAL,
    label: 'Terminal',
    items: [
      { id: 'terminal-new', label: 'New Terminal', action: 'newTerminal' },
    ],
  },
  {
    id: MENU_ITEM_IDS.HELP,
    label: { en: 'Help', es: 'Ayuda' },
    items: [
      { id: 'help-shortcuts', label: { en: 'Keyboard Shortcuts', es: 'Atajos de Teclado' }, action: 'togglePanel', payload: PANEL_IDS.SETTINGS },
      { type: 'separator' },
      { id: 'lang-en', label: 'English (US)', action: 'setLanguage', payload: 'en' },
      { id: 'lang-es', label: 'Español (ES)', action: 'setLanguage', payload: 'es' },
      { type: 'separator' },
      { id: 'help-github', label: { en: 'View Source on GitHub', es: 'Ver Código en GitHub' }, action: 'openGitHub' },
      { type: 'separator' },
      { id: 'help-about', label: { en: 'About', es: 'Acerca de' }, action: 'openTab', payload: FILE_IDS.README },
    ],
  },

  {
    id: MENU_ITEM_IDS.COPILOT,
    label: 'Copilot',
    items: [
      { id: 'copilot-open', label: 'Open Copilot Chat', action: 'toggleCopilot' },
    ],
  },
];
