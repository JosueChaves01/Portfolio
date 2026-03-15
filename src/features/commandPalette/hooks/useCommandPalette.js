import { useState, useMemo } from 'react';
import { useTabs } from '../../../store/TabsContext';
import { useOverlay } from '../../../store/OverlayContext';
import { useTheme } from '../../../store/ThemeContext';
import { PALETTE_COMMANDS, PALETTE_FILES } from '../constants/commandPalette.constants';

export function useCommandPalette() {
  const { openTab } = useTabs();
  const { toggleCopilot, toggleCommandPalette } = useOverlay();
  const { setTheme } = useTheme();
  const [query, setQuery] = useState('');

  const filteredFiles = useMemo(() => {
    if (!query) return PALETTE_FILES;
    const lower = query.toLowerCase();
    return PALETTE_FILES.filter((f) => f.name.toLowerCase().includes(lower));
  }, [query]);

  const filteredCommands = useMemo(() => {
    if (!query) return PALETTE_COMMANDS;
    const lower = query.toLowerCase();
    return PALETTE_COMMANDS.filter((c) => c.label.toLowerCase().includes(lower));
  }, [query]);

  const handleFileSelect = (fileId) => {
    openTab(fileId);
    toggleCommandPalette();
  };

  const handleCommandSelect = (action) => {
    if (action === 'toggleCopilot') {
      toggleCopilot();
    } else if (action.startsWith('setTheme:')) {
      const themeId = action.split(':')[1];
      setTheme(themeId);
    }
    toggleCommandPalette();
  };

  const handleClose = () => toggleCommandPalette();

  return {
    query,
    setQuery,
    filteredFiles,
    filteredCommands,
    handleFileSelect,
    handleCommandSelect,
    handleClose,
  };
}
