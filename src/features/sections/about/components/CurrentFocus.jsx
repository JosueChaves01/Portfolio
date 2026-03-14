import { Icon } from '../../../../shared/icons/Icon';
import { useLanguage } from '../../../../store/LanguageContext';
import styles from './AboutSection.module.css';

export function CurrentFocus({ title, items }) {
  const { t } = useLanguage();

  return (
    <div className={styles.focusSection}>
      <h2 className={styles.sectionTitle}>{t(title)}</h2>
      <div className={styles.focusGrid}>
        {items.map(({ id, icon, color, text }) => (
          <div key={id} className={styles.focusItem}>
            <span className={styles.focusEmoji}><Icon name={icon} size={16} color={color} /></span>
            <span className={styles.focusText}>{t(text)}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

