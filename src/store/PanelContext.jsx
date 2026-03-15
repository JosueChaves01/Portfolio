import { createContext, useContext, useState, useMemo, useCallback } from 'react';

const PanelContext = createContext(null);

const INITIAL_ACTIVE_PANEL = null;

export function PanelProvider({ children }) {
  const [activePanel, setActivePanel] = useState(INITIAL_ACTIVE_PANEL);

  const togglePanel = useCallback((panelId) => {
    setActivePanel((prev) => (prev === panelId ? null : panelId));
  }, []);

  const value = useMemo(() => ({
    activePanel,
    togglePanel,
  }), [activePanel, togglePanel]);

  return (
    <PanelContext.Provider value={value}>
      {children}
    </PanelContext.Provider>
  );
}

export const usePanel = () => {
  const ctx = useContext(PanelContext);
  if (!ctx) throw new Error('usePanel must be used inside PanelProvider');
  return ctx;
};
