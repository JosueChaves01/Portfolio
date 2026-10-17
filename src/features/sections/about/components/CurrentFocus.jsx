import { Icon } from '../../../../shared/icons/Icon';
import { useLanguage } from '../../../../store/LanguageContext';
import { useTiltEffect } from '../../../../shared/hooks/useTiltEffect';
import styles from './AboutSection.module.css';

export function CurrentFocus({ title, items }) {
  const { t } = useLanguage();
  const tiltRef = useTiltEffect({ maxTilt: 5, scale: 1.01 });

  return (
    <div className={styles.focusSection}>
      <div className={styles.focusCard} ref={tiltRef}>
        <div className={styles.focusSpotlight} />
        <div className={styles.focusCardContent}>
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
      </div>
    </div>
  );
}
