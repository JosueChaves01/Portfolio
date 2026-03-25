import { createContext, useContext, useState, useMemo, useCallback } from 'react';

const OverlayContext = createContext(null);

export function OverlayProvider({ children }) {
  const [isTerminalOpen, setIsTerminalOpen] = useState(false);
  const [isCopilotOpen, setIsCopilotOpen] = useState(false);
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);
  const [commandPaletteMode, setCommandPaletteMode] = useState(null);
  const [terminalKey, setTerminalKey] = useState(0);

  const toggleTerminal = useCallback(() => setIsTerminalOpen((prev) => !prev), []);
  const toggleCopilot = useCallback(() => setIsCopilotOpen((prev) => !prev), []);
  const toggleCommandPalette = useCallback((mode) => {
    setCommandPaletteMode(typeof mode === 'string' ? mode : null);
    setIsCommandPaletteOpen((prev) => !prev);
  }, []);
  
  const newTerminal = useCallback(() => {
    setTerminalKey((prev) => prev + 1);
    setIsTerminalOpen(true);
  }, []);

  const value = useMemo(() => ({
    isTerminalOpen,
    isCopilotOpen,
    isCommandPaletteOpen,
    commandPaletteMode,
    terminalKey,
    toggleTerminal,
    toggleCopilot,
    toggleCommandPalette,
    newTerminal,
  }), [isTerminalOpen, isCopilotOpen, isCommandPaletteOpen, commandPaletteMode, terminalKey, toggleTerminal, toggleCopilot, toggleCommandPalette, newTerminal]);

  return (
    <OverlayContext.Provider value={value}>
      {children}
    </OverlayContext.Provider>
  );
}

export const useOverlay = () => {
  const ctx = useContext(OverlayContext);
  if (!ctx) throw new Error('useOverlay must be used inside OverlayProvider');
  return ctx;
};
