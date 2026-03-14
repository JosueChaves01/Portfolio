import { createContext, useContext, useState } from 'react';
import { FILE_IDS } from '../features/explorer/constants/explorer.constants';

const IDEContext = createContext(null);

const INITIAL_OPEN_TABS = [FILE_IDS.HOME];
const INITIAL_ACTIVE_TAB = FILE_IDS.HOME;
const INITIAL_ACTIVE_PANEL = null;

export function IDEProvider({ children }) {
  const [openTabs, setOpenTabs] = useState(INITIAL_OPEN_TABS);
  const [activeTab, setActiveTab] = useState(INITIAL_ACTIVE_TAB);
  const [activePanel, setActivePanel] = useState(INITIAL_ACTIVE_PANEL);
  const [isTerminalOpen, setIsTerminalOpen] = useState(false);
  const [isCopilotOpen, setIsCopilotOpen] = useState(false);
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);
  const [terminalKey, setTerminalKey] = useState(0);

  const openTab = (fileId) => {
    if (!openTabs.includes(fileId)) {
      setOpenTabs((prev) => [...prev, fileId]);
    }
    setActiveTab(fileId);
  };

  const closeTab = (fileId) => {
    const remaining = openTabs.filter((id) => id !== fileId);
    setOpenTabs(remaining);
    if (activeTab === fileId) {
      setActiveTab(remaining.at(-1) ?? null);
    }
  };

  const togglePanel = (panelId) => {
    setActivePanel((prev) => (prev === panelId ? null : panelId));
  };

  const toggleTerminal = () => setIsTerminalOpen((prev) => !prev);
  const toggleCopilot = () => setIsCopilotOpen((prev) => !prev);
  const toggleCommandPalette = () => setIsCommandPaletteOpen((prev) => !prev);
  const newTerminal = () => {
    setTerminalKey((prev) => prev + 1);
    setIsTerminalOpen(true);
  };

  return (
    <IDEContext.Provider
      value={{
        openTabs,
        activeTab,
        activePanel,
        isTerminalOpen,
        isCopilotOpen,
        isCommandPaletteOpen,
        openTab,
        closeTab,
        togglePanel,
        toggleTerminal,
        toggleCopilot,
        toggleCommandPalette,
        terminalKey,
        newTerminal,
      }}
    >
      {children}
    </IDEContext.Provider>
  );
}

export const useIDE = () => {
  const ctx = useContext(IDEContext);
  if (!ctx) throw new Error('useIDE must be used inside IDEProvider');
  return ctx;
};
