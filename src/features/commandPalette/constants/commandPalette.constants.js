import { FILE_IDS, FILE_REGISTRY } from '../../explorer/constants/explorer.constants';
import { THEMES } from '../../settings/constants/settings.constants';

export const COMMAND_PALETTE = {
  PLACEHOLDER: { 
    en: '> Go to file or run command...', 
    es: '> Ir a archivo o ejecutar comando...' 
  },
  CLOSE_LABEL: 'Esc',
  SECTION_COMMANDS: { en: 'COMMANDS', es: 'COMANDOS' },
  SECTION_FILES: { en: 'FILES', es: 'ARCHIVOS' },
  TIP: { 
    en: 'Tip: type "copilot" to open AI chat', 
    es: 'Sugerencia: escribe "copilot" para abrir el chat de IA' 
  },
};

export const PALETTE_COMMANDS = [
  {
    id: 'open-copilot',
    label: { en: "Open Josue's Copilot", es: "Abrir Copilot de Josue" },
    shortcut: 'Ctrl+Shift+C',
    action: 'toggleCopilot',
  },
  ...THEMES.map((theme) => ({
    id: `theme-${theme.id}`,
    label: { 
      en: `Color Theme: ${theme.label.en || theme.label}`, 
      es: `Tema de Color: ${theme.label.es || theme.label}` 
    },
    action: `setTheme:${theme.id}`,
  })),
];



export const PALETTE_FILES = [
  { id: FILE_IDS.HOME, directory: 'src/' },
  { id: FILE_IDS.ABOUT, directory: 'src/' },
  { id: FILE_IDS.PROJECTS, directory: 'src/' },
  { id: FILE_IDS.SKILLS, directory: 'data/' },
  { id: FILE_IDS.EXPERIENCE, directory: 'src/' },
  { id: FILE_IDS.CONTACT, directory: 'src/' },
  { id: FILE_IDS.README, directory: './' },
].map(({ id, directory }) => ({
  id,
  name: FILE_REGISTRY[id].name,
  icon: FILE_REGISTRY[id].icon,
  color: FILE_REGISTRY[id].color,
  directory,
}));
