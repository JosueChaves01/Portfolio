import { STATS } from '../constants/home.constants';
import styles from './HomeSection.module.css';
import { useLanguage } from '../../../../store/LanguageContext';

export function StatsCard() {
  const { t } = useLanguage();
  return (
    <div className={styles.statsCard}>
      {STATS.map(({ value, label }) => (
        <div key={value} className={styles.statItem}>
          <span className={styles.statValue}>{value}</span>
          <span className={styles.statLabel}>{t(label)}</span>
        </div>
      ))}
    </div>
  );
}
