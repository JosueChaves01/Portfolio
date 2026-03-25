import { useState } from 'react';
import { Icon } from '../../../shared/icons/Icon';
import { useLanguage } from '../../../store/LanguageContext';
import { FILE_REGISTRY } from '../../explorer/constants/explorer.constants';
import styles from './TabBar.module.css';

export function Tab({ fileId, isActive, onClick, onClose }) {
  const { t } = useLanguage();
  const [isClosing, setIsClosing] = useState(false);
  const file = FILE_REGISTRY[fileId];
  if (!file) return null;

  const iconName = file.icon ?? 'FileDown';
  const iconColor = file.color;

  const handleCloseClick = (e) => {
    e.stopPropagation();
    setIsClosing(true);
  };

  const handleAnimationEnd = () => {
    if (isClosing) {
      onClose(fileId);
    }
  };

  return (
    <div
      className={`${styles.tab} ${isActive ? styles.active : ''} ${isClosing ? styles.closing : ''}`}
      onClick={() => onClick(fileId)}
      role="tab"
      aria-selected={isActive}
      onAnimationEnd={handleAnimationEnd}
    >
      <span className={styles.tabIcon}><Icon name={iconName} size={13} color={iconColor} /></span>
      <span className={styles.tabName}>{file.name}</span>
      <button
        className={styles.closeBtn}
        onClick={handleCloseClick}
        aria-label={t({ en: `Close ${file.name}`, es: `Cerrar ${file.name}` })}
      >
        ✕
      </button>
    </div>
  );
}

