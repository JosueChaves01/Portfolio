import { useState, useCallback } from 'react';
import { useTabs } from '../../../store/TabsContext';
import { usePanel } from '../../../store/PanelContext';
import { useOverlay } from '../../../store/OverlayContext';
import { useLanguage } from '../../../store/LanguageContext';
import { PANEL_IDS } from '../../activityBar/constants/activityBar.constants';
import { RESUME_URL } from '../../explorer/constants/explorer.constants';

const GITHUB_URL = 'https://github.com/josuechaves01/portfolio';

function downloadResume() {
  const link = document.createElement('a');
  link.href = RESUME_URL;
  link.download = RESUME_URL.split('/').pop();
  link.click();
}

function isMobileDevice() {
  return window.matchMedia('(max-width: 768px)').matches;
}

export function useMenuBar() {
  const { language, setLanguage } = useLanguage();
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

    // Handle Explorer toggle on mobile devices
    if (action === 'togglePanel' && payload === PANEL_IDS.EXPLORER && isMobileDevice()) {
      const messages = {
        en: 'Explorer is not available on mobile devices',
        es: 'El Explorador no está disponible en dispositivos móviles',
      };
      alert(messages[language] || messages.en);
      return;
    }

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
  }, [closeMenu, language, openTab, togglePanel, toggleTerminal, toggleCopilot, toggleCommandPalette, newTerminal, setLanguage]);

  return { openMenuId, toggleMenu, closeMenu, dispatch };
}

