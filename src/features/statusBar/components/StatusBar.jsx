import { useCallback, useEffect, useRef, useState } from 'react';
import { useLanguage } from '../../../store/LanguageContext';
import { useStatusBar } from '../hooks/useStatusBar';
import { STATUS_BAR } from '../constants/statusBar.constants';
import { Icon } from '../../../shared/icons/Icon';
import { useClickOutside } from '../../../shared/hooks/useClickOutside';
import { ThemeSelector } from './ThemeSelector';
import styles from './StatusBar.module.css';

export function StatusBar() {
  const { language, themeLabel, currentTime } = useStatusBar();
  const { t } = useLanguage();
  const [isThemeSelectorOpen, setIsThemeSelectorOpen] = useState(false);
  const footerRef = useRef(null);

  const closeThemeSelector = useCallback(() => setIsThemeSelectorOpen(false), []);
  const toggleThemeSelector = () => setIsThemeSelectorOpen((open) => !open);

  // Outside clicks are measured against the whole footer so the trigger can toggle the menu.
  useClickOutside(footerRef, closeThemeSelector);

  useEffect(() => {
    if (!isThemeSelectorOpen) return undefined;
    const onKeyDown = (event) => { if (event.key === 'Escape') closeThemeSelector(); };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [isThemeSelectorOpen, closeThemeSelector]);

  const hasErrors = STATUS_BAR.ERRORS !== '0';
  const hasWarnings = STATUS_BAR.WARNINGS !== '0';

  const themeButton = (className) => (
    <button
      type="button"
      className={className}
      onClick={toggleThemeSelector}
      title={t(STATUS_BAR.THEME_TITLE)}
      aria-expanded={isThemeSelectorOpen}
    >
      <Icon name="Palette" size={14} strokeWidth={2.5} className={styles.icon} />
      <span className={styles.label}>{themeLabel}</span>
    </button>
  );

  return (
    <footer className={styles.statusBar} ref={footerRef}>
      {isThemeSelectorOpen && <ThemeSelector onClose={closeThemeSelector} />}

      {/* Desktop layout */}
      <div className={styles.desktopContainer}>
        <div className={styles.left}>
          <span className={styles.item}>
            <Icon name="CircleX" size={14} strokeWidth={2.5} color="#f87171" className={styles.icon} />
            <span className={styles.label}>{STATUS_BAR.ERRORS}</span>
          </span>
          <span className={styles.separator}>•</span>
          <span className={styles.item}>
            <Icon name="TriangleAlert" size={14} strokeWidth={2.5} color="#fbbf24" className={styles.icon} />
            <span className={styles.label}>{STATUS_BAR.WARNINGS}</span>
          </span>
          <span className={styles.separator}>•</span>
          <span className={styles.item}>
            <Icon name="GitBranch" size={14} strokeWidth={2.5} className={styles.icon} />
            <span className={styles.label}>{STATUS_BAR.GIT_BRANCH}</span>
          </span>
          <span className={styles.separator}>•</span>
          <span className={styles.item}>
            <Icon name="RefreshCw" size={14} strokeWidth={2.5} className={styles.icon} />
            <span className={styles.label}>{STATUS_BAR.PROJECT_NAME}</span>
          </span>
        </div>

        <div className={styles.right}>
          <span className={styles.item}>
            <Icon name="Cpu" size={14} strokeWidth={2.5} className={styles.icon} />
            <span className={styles.label}>{t(STATUS_BAR.COPILOT_LABEL)}</span>
          </span>
          <span className={styles.separator}>•</span>
          <span className={styles.item}>
            <span className={styles.label}>{language}</span>
          </span>
          <span className={styles.separator}>•</span>
          <span className={styles.item}>
            <span className={styles.label}>{t(STATUS_BAR.ENCODING)}</span>
          </span>
          <span className={styles.separator}>•</span>
          <span className={styles.item}>
            <span className={styles.label}>{t(STATUS_BAR.FORMATTER)}</span>
          </span>
          <span className={styles.separator}>•</span>
          {themeButton(`${styles.item} ${styles.theme}`)}
          <span className={styles.separator}>•</span>
          <span className={styles.item}>
            <Icon name="Clock" size={14} strokeWidth={2.5} className={styles.icon} />
            <span className={styles.label}>{currentTime}</span>
          </span>
        </div>
      </div>

      {/* Mobile layout: branch, problems, theme and time, with the theme always one tap away */}
      <div className={styles.mobileContainer}>
        <span className={styles.mobileItem}>
          <Icon name="GitBranch" size={13} strokeWidth={2.5} className={styles.icon} />
          {STATUS_BAR.GIT_BRANCH}
        </span>
        {hasErrors && (
          <span className={`${styles.mobileItem} ${styles.error}`} title="Errors">
            <Icon name="CircleX" size={13} strokeWidth={2.5} />
            {STATUS_BAR.ERRORS}
          </span>
        )}
        {hasWarnings && (
          <span className={`${styles.mobileItem} ${styles.warning}`} title="Warnings">
            <Icon name="TriangleAlert" size={13} strokeWidth={2.5} />
            {STATUS_BAR.WARNINGS}
          </span>
        )}
        <span className={styles.mobileSpacer} />
        {themeButton(`${styles.mobileItem} ${styles.mobileTheme}`)}
        <span className={styles.mobileItem}>
          <Icon name="Clock" size={13} strokeWidth={2.5} className={styles.icon} />
          {currentTime}
        </span>
      </div>
    </footer>
  );
}
