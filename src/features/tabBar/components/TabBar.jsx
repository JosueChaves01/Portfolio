import { useTabBar } from '../hooks/useTabBar';
import { Tab } from './Tab';
import styles from './TabBar.module.css';

export function TabBar() {
  const { openTabs, activeTab, handleTabClick, handleTabClose } = useTabBar();

  return (
    <div className={styles.tabBar} role="tablist">
      {openTabs.map((fileId) => (
        <Tab
          key={fileId}
          fileId={fileId}
          isActive={fileId === activeTab}
          onClick={handleTabClick}
          onClose={handleTabClose}
        />
      ))}
    </div>
  );
}
