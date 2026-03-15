import { useTabs } from '../../../store/TabsContext';
import { useLanguage } from '../../../store/LanguageContext';
import { EXPLORER, FILE_TREE_ORDER } from '../constants/explorer.constants';

import { FileTreeItem } from './FileTreeItem';
import styles from './ExplorerPanel.module.css';

export function ExplorerPanel() {
  const { activeTab, openTab } = useTabs();
  const { t } = useLanguage();

  return (
    <div className={styles.explorerPanel}>
      <div className={styles.rootHeader}>
        <span className={styles.rootLabel}>{t(EXPLORER.ROOT_LABEL)}</span>
        <span className={styles.gitBadge}>{EXPLORER.GIT_BADGE}</span>
      </div>

      <div className={styles.fileTree}>
        {FILE_TREE_ORDER.map((fileId) => (
          <FileTreeItem
            key={fileId}
            fileId={fileId}
            isActive={activeTab === fileId}
            onOpen={openTab}
          />
        ))}
      </div>
    </div>
  );
}
