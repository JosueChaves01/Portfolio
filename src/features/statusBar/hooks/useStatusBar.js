import { useState, useEffect } from 'react';
import { useIDE } from '../../../store/IDEContext';
import { useTheme } from '../../../store/ThemeContext';
import { THEMES } from '../../settings/constants/settings.constants';
import { PANEL_IDS } from '../../activityBar/constants/activityBar.constants';
import { FILE_LANGUAGE_MAP } from '../constants/statusBar.constants';

const TIME_UPDATE_INTERVAL_MS = 60_000;

function formatTime(date) {
  return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false });
}

export function useStatusBar() {
  const { activeTab, togglePanel } = useIDE();
  const { theme } = useTheme();
  const [currentTime, setCurrentTime] = useState(() => formatTime(new Date()));

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(formatTime(new Date()));
    }, TIME_UPDATE_INTERVAL_MS);
    return () => clearInterval(interval);
  }, []);

  const language = FILE_LANGUAGE_MAP[activeTab] ?? '';
  const themeLabel = THEMES.find((t) => t.id === theme)?.label ?? theme;

  return { language, themeLabel, currentTime, togglePanel, SETTINGS_PANEL_ID: PANEL_IDS.SETTINGS };
}

