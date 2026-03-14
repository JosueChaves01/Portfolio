import { Icon } from '../../../shared/icons/Icon';
import { FILE_REGISTRY } from '../../explorer/constants/explorer.constants';
import styles from './TabBar.module.css';

export function Tab({ fileId, isActive, onClick, onClose }) {
  const file = FILE_REGISTRY[fileId];
  if (!file) return null;

  const iconName = file.icon ?? 'FileDown';
  const iconColor = file.color;

  return (
    <div
      className={`${styles.tab} ${isActive ? styles.active : ''}`}
      onClick={() => onClick(fileId)}
      role="tab"
      aria-selected={isActive}
    >
      <span className={styles.tabIcon}><Icon name={iconName} size={13} color={iconColor} /></span>
      <span className={styles.tabName}>{file.name}</span>
      <button
        className={styles.closeBtn}
        onClick={(e) => onClose(e, fileId)}
        aria-label={`Close ${file.name}`}
      >
        ✕
      </button>
    </div>
  );
}
