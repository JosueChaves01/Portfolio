import { useState, useCallback } from 'react';
import { useIDE } from '../../../store/IDEContext';
import { useLanguage } from '../../../store/LanguageContext';
import { RESUME_URL } from '../../explorer/constants/explorer.constants';
import { SOCIAL_LINKS } from '../../sections/home/constants/home.constants';

const GITHUB_URL = SOCIAL_LINKS.find((l) => l.id === 'github')?.url ?? '#';

function downloadResume() {
  const link = document.createElement('a');
  link.href = RESUME_URL;
  link.download = RESUME_URL.split('/').pop();
  link.click();
}

export function useMenuBar() {
  const { setLanguage } = useLanguage();
  const [openMenuId, setOpenMenuId] = useState(null);
  const {
    openTab,
    togglePanel,
    toggleTerminal,
    toggleCopilot,
    toggleCommandPalette,
    newTerminal,
  } = useIDE();

  const toggleMenu = (id) => setOpenMenuId((prev) => (prev === id ? null : id));
  const closeMenu = useCallback(() => setOpenMenuId(null), []);

  const dispatch = useCallback((action, payload) => {
    closeMenu();
    switch (action) {
      case 'setLanguage':           setLanguage(payload); break;
      case 'toggleCommandPalette': toggleCommandPalette(); break;
      case 'downloadResume':       downloadResume();       break;
      case 'copyPageUrl':          navigator.clipboard.writeText(window.location.href); break;
      case 'togglePanel':          togglePanel(payload);   break;
      case 'toggleTerminal':       toggleTerminal();       break;
      case 'toggleCopilot':        toggleCopilot();        break;
      case 'newTerminal':          newTerminal();          break;
      case 'openTab':              openTab(payload);       break;
      case 'openGitHub':           window.open(GITHUB_URL, '_blank', 'noopener,noreferrer'); break;
    }
  }, [closeMenu, openTab, togglePanel, toggleTerminal, toggleCopilot, toggleCommandPalette, newTerminal, setLanguage]);

  return { openMenuId, toggleMenu, closeMenu, dispatch };
}

