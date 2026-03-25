import { useTabs } from '../../../store/TabsContext';

export function useTabBar() {
  const { openTabs, activeTab, openTab, closeTab } = useTabs();

  const handleTabClick = (fileId) => openTab(fileId);

  const handleTabClose = (fileId) => {
    closeTab(fileId);
  };

  return { openTabs, activeTab, handleTabClick, handleTabClose };
}
