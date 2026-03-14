import { FILE_IDS, FILE_REGISTRY } from '../../explorer/constants/explorer.constants';
import { THEMES } from '../../settings/constants/settings.constants';

export const COMMAND_PALETTE = {
  PLACEHOLDER: '> Go to file or run command...',
  CLOSE_LABEL: 'Esc',
  SECTION_COMMANDS: 'COMMANDS',
  SECTION_FILES: 'FILES',
  TIP: 'Tip: type "copilot" to open AI chat',
};

export const PALETTE_COMMANDS = [
  {
    id: 'open-copilot',
    label: "Open Josue's Copilot",

    shortcut: 'Ctrl+Shift+C',
    action: 'toggleCopilot',
  },
  ...THEMES.map((theme) => ({
    id: `theme-${theme.id}`,
    label: `Color Theme: ${theme.label}`,
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
