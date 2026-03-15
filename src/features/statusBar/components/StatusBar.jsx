import { useState } from 'react';
import { useLanguage } from '../../../store/LanguageContext';
import { useStatusBar } from '../hooks/useStatusBar';
import { STATUS_BAR } from '../constants/statusBar.constants';
import { Icon } from '../../../shared/icons/Icon';
import { ThemeSelector } from './ThemeSelector';
import styles from './StatusBar.module.css';

export function StatusBar() {
  const { language, themeLabel, currentTime } = useStatusBar();
  const { t } = useLanguage();
  const [isThemeSelectorOpen, setIsThemeSelectorOpen] = useState(false);

  return (
    <footer className={styles.statusBar}>
      {isThemeSelectorOpen && (
        <ThemeSelector onClose={() => setIsThemeSelectorOpen(false)} />
      )}
      <div className={styles.left}>
        <span className={styles.item}>
          <Icon name="CircleX" size={12} color="#f87171" className={styles.icon} />
          {STATUS_BAR.ERRORS}
        </span>
        <span className={styles.item}>
          <Icon name="TriangleAlert" size={12} color="#fbbf24" className={styles.icon} />
          {STATUS_BAR.WARNINGS}
        </span>
        <span className={styles.item}>
          <Icon name="GitBranch" size={12} className={styles.icon} />
          {STATUS_BAR.GIT_BRANCH}
        </span>
        <span className={styles.item}>
          <Icon name="RefreshCw" size={12} className={styles.icon} />
          {STATUS_BAR.PROJECT_NAME}
        </span>
      </div>
      <div className={styles.right}>
        <span className={styles.item}>
          <Icon name="Cpu" size={12} className={styles.icon} />
          {t(STATUS_BAR.COPILOT_LABEL)}
        </span>
        <span className={styles.item}>{language}</span>
        <span className={styles.item}>{t(STATUS_BAR.ENCODING)}</span>
        <span className={styles.item}>{t(STATUS_BAR.FORMATTER)}</span>
        <span
          className={`${styles.item} ${styles.theme}`}
          onClick={() => setIsThemeSelectorOpen(!isThemeSelectorOpen)}
          title={t(STATUS_BAR.THEME_TITLE)}
        >
          <Icon name="Palette" size={12} className={styles.icon} />
          {themeLabel}
        </span>
        <span className={styles.item}>{currentTime}</span>
      </div>
    </footer>
  );
}



