export const PANEL_IDS = {
  EXPLORER: 'explorer',
  SOURCE_CONTROL: 'sourceControl',
  SETTINGS: 'settings',
};

export const ACTIVITY_ICONS_TOP = [
  { id: PANEL_IDS.EXPLORER, icon: 'Files', label: 'Explorer' },
  { id: 'search', icon: 'Search', label: 'Search' },
  { id: PANEL_IDS.SOURCE_CONTROL, icon: 'GitBranch', label: 'Source Control' },
  { id: 'download', icon: 'Download', label: 'Download Resume' },
  { id: 'copilot', icon: 'Sparkles', label: 'Copilot Chat' },
];

export const ACTIVITY_ICONS_BOTTOM = [
  { id: PANEL_IDS.SETTINGS, icon: 'Settings', label: 'Settings' },
];
