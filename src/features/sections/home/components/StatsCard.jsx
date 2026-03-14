import { STATS } from '../constants/home.constants';
import styles from './HomeSection.module.css';

export function StatsCard() {
  return (
    <div className={styles.statsCard}>
      {STATS.map(({ value, label }) => (
        <div key={label} className={styles.statItem}>
          <span className={styles.statValue}>{value}</span>
          <span className={styles.statLabel}>{label}</span>
        </div>
      ))}
    </div>
  );
}
