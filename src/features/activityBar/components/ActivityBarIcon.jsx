import { Icon } from '../../../shared/icons/Icon';
import styles from './ActivityBar.module.css';

export function ActivityBarIcon({ id, icon, label, isActive, onClick }) {
  return (
    <button
      className={`${styles.icon} ${isActive ? styles.active : ''}`}
      onClick={() => onClick(id)}
      title={label}
      aria-label={label}
      aria-pressed={isActive}
    >
      <Icon name={icon} size={20} />
    </button>
  );
}
