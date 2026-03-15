import { useState, useCallback } from 'react';
import { useTabs } from '../../../store/TabsContext';
import { usePanel } from '../../../store/PanelContext';
import { useOverlay } from '../../../store/OverlayContext';
import { useLanguage } from '../../../store/LanguageContext';
import { RESUME_URL } from '../../explorer/constants/explorer.constants';

const GITHUB_URL = 'https://github.com/josuechaves01/portfolio';

function downloadResume() {
  const link = document.createElement('a');
  link.href = RESUME_URL;
  link.download = RESUME_URL.split('/').pop();
  link.click();
}

export function useMenuBar() {
  const { setLanguage } = useLanguage();
  const [openMenuId, setOpenMenuId] = useState(null);

  const { openTab } = useTabs();
  const { togglePanel } = usePanel();
  const {
    toggleTerminal,
    toggleCopilot,
    toggleCommandPalette,
    newTerminal,
  } = useOverlay();

  const toggleMenu = (id) => setOpenMenuId((prev) => (prev === id ? null : id));
  const closeMenu = useCallback(() => setOpenMenuId(null), []);

  const dispatch = useCallback((action, payload) => {
    closeMenu();

    const actionHandlers = {
      setLanguage,
      toggleCommandPalette,
      downloadResume,
      copyPageUrl: () => navigator.clipboard.writeText(window.location.href),
      togglePanel,
      toggleTerminal,
      toggleCopilot,
      newTerminal,
      openTab,
      openGitHub: () => window.open(GITHUB_URL, '_blank', 'noopener,noreferrer'),
    };

    const handler = actionHandlers[action];
    if (handler) {
      handler(payload);
    }
  }, [closeMenu, openTab, togglePanel, toggleTerminal, toggleCopilot, toggleCommandPalette, newTerminal, setLanguage]);

  return { openMenuId, toggleMenu, closeMenu, dispatch };
}

