import { Icon } from '../../../shared/icons/Icon';
import { FILE_IDS, FILE_REGISTRY, RESUME_URL } from '../constants/explorer.constants';
import styles from './ExplorerPanel.module.css';

export function FileTreeItem({ fileId, isActive, onOpen }) {
  const file = FILE_REGISTRY[fileId];
  if (!file) return null;

  const handleClick = () => {
    if (fileId === FILE_IDS.RESUME) {
      const link = document.createElement('a');
      link.href = RESUME_URL;
      link.download = file.name;
      link.click();
      return;
    }
    onOpen(fileId);
  };

  return (
    <button
      className={`${styles.fileItem} ${isActive ? styles.active : ''}`}
      onClick={handleClick}
      aria-label={`Open ${file.name}`}
    >
      <span className={styles.fileIcon}><Icon name={file.icon} size={14} color={file.color} /></span>
      <span className={styles.fileName}>{file.name}</span>
      {fileId === FILE_IDS.RESUME && <span className={styles.downloadIndicator}>↓</span>}
    </button>
  );
}
