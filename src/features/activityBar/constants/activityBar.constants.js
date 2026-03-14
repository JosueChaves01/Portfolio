export const PANEL_IDS = {
  EXPLORER: 'explorer',
  SOURCE_CONTROL: 'sourceControl',
  SETTINGS: 'settings',
};

export const ACTIVITY_ICONS_TOP = [
  { id: PANEL_IDS.EXPLORER, icon: 'Files', label: { en: 'Explorer', es: 'Explorador' } },
  { id: 'search', icon: 'Search', label: { en: 'Search', es: 'Buscar' } },
  { id: PANEL_IDS.SOURCE_CONTROL, icon: 'GitBranch', label: { en: 'Source Control', es: 'Control de Código' } },
  { id: 'download', icon: 'Download', label: { en: 'Download Resume', es: 'Descargar Currículum' } },
  { id: 'copilot', icon: 'Sparkles', label: { en: 'Copilot Chat', es: 'Chat de Copilot' } },
];

export const ACTIVITY_ICONS_BOTTOM = [
  { id: PANEL_IDS.SETTINGS, icon: 'Settings', label: { en: 'Settings', es: 'Ajustes' } },
];
