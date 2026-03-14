import { useIDE } from '../../../store/IDEContext';

export function useTabBar() {
  const { openTabs, activeTab, openTab, closeTab } = useIDE();

  const handleTabClick = (fileId) => openTab(fileId);

  const handleTabClose = (event, fileId) => {
    event.stopPropagation();
    closeTab(fileId);
  };

  return { openTabs, activeTab, handleTabClick, handleTabClose };
}
