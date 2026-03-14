import { Icon } from '../../../../shared/icons/Icon';
import styles from './AboutSection.module.css';

export function CurrentFocus({ title, items }) {
  return (
    <div className={styles.focusSection}>
      <h2 className={styles.sectionTitle}>{title}</h2>
      <div className={styles.focusGrid}>
        {items.map(({ id, icon, color, text }) => (
          <div key={id} className={styles.focusItem}>
            <span className={styles.focusEmoji}><Icon name={icon} size={16} color={color} /></span>
            <span className={styles.focusText}>{text}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
