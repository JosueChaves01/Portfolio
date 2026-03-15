import { createContext, useContext, useState, useMemo, useCallback } from 'react';
import { FILE_IDS } from '../features/explorer/constants/explorer.constants';

const TabsContext = createContext(null);

const INITIAL_OPEN_TABS = [FILE_IDS.HOME];
const INITIAL_ACTIVE_TAB = FILE_IDS.HOME;

export function TabsProvider({ children }) {
  const [openTabs, setOpenTabs] = useState(INITIAL_OPEN_TABS);
  const [activeTab, setActiveTab] = useState(INITIAL_ACTIVE_TAB);

  const openTab = useCallback((fileId) => {
    if (!openTabs.includes(fileId)) {
      setOpenTabs((prev) => [...prev, fileId]);
    }
    setActiveTab(fileId);
  }, [openTabs]);

  const closeTab = useCallback((fileId) => {
    const remaining = openTabs.filter((id) => id !== fileId);
    setOpenTabs(remaining);
    if (activeTab === fileId) {
      setActiveTab(remaining.at(-1) ?? null);
    }
  }, [openTabs, activeTab]);

  const value = useMemo(() => ({
    openTabs,
    activeTab,
    openTab,
    closeTab,
  }), [openTabs, activeTab, openTab, closeTab]);

  return (
    <TabsContext.Provider value={value}>
      {children}
    </TabsContext.Provider>
  );
}

export const useTabs = () => {
  const ctx = useContext(TabsContext);
  if (!ctx) throw new Error('useTabs must be used inside TabsProvider');
  return ctx;
};
