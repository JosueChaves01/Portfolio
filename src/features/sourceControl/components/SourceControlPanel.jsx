import { useLanguage } from '../../../store/LanguageContext';
import { SOURCE_CONTROL, GIT_STATS } from '../constants/sourceControl.constants';
import styles from './SourceControlPanel.module.css';

export function SourceControlPanel() {
  const { t } = useLanguage();

  return (
    <div className={styles.panel}>
      <div className={styles.header}>
        <span className={styles.title}>{t(SOURCE_CONTROL.TITLE)}</span>
      </div>
      <div className={styles.body}>
        <div className={styles.branch}>{SOURCE_CONTROL.BRANCH}</div>
        <div className={styles.status}>{t(SOURCE_CONTROL.STATUS)}</div>
        <div className={styles.stats}>
          {GIT_STATS.map(({ label, count }) => (
            <div key={t(label)} className={styles.stat}>
              <span className={styles.statCount}>{count}</span>
              <span className={styles.statLabel}>{t(label)}</span>
            </div>
          ))}
        </div>
        <a
          href={SOURCE_CONTROL.GITHUB_URL}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.githubLink}
        >
          {t(SOURCE_CONTROL.GITHUB_LABEL)}
        </a>
      </div>
    </div>
  );
}

