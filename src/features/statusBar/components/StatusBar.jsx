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
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const hasErrors = STATUS_BAR.ERRORS !== '0';
  const hasWarnings = STATUS_BAR.WARNINGS !== '0';

  return (
    <footer className={styles.statusBar}>
      {isThemeSelectorOpen && (
        <ThemeSelector onClose={() => setIsThemeSelectorOpen(false)} />
      )}

      {/* Mobile: Critical info only */}
      <div className={styles.mobileIndicators}>
        {hasErrors && (
          <span className={`${styles.indicator} ${styles.error}`} title="Errors">
            <Icon name="CircleX" size={16} strokeWidth={2.5} className={styles.indicatorIcon} />
          </span>
        )}
        {hasWarnings && (
          <span className={`${styles.indicator} ${styles.warning}`} title="Warnings">
            <Icon name="TriangleAlert" size={16} strokeWidth={2.5} className={styles.indicatorIcon} />
          </span>
        )}
      </div>

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
          <span
            className={`${styles.item} ${styles.theme}`}
            onClick={() => setIsThemeSelectorOpen(!isThemeSelectorOpen)}
            title={t(STATUS_BAR.THEME_TITLE)}
            role="button"
            tabIndex={0}
          >
            <Icon name="Palette" size={14} strokeWidth={2.5} className={styles.icon} />
            <span className={styles.label}>{themeLabel}</span>
          </span>
          <span className={styles.separator}>•</span>
          <span className={styles.item}>
            <Icon name="Clock" size={14} strokeWidth={2.5} className={styles.icon} />
            <span className={styles.label}>{currentTime}</span>
          </span>
        </div>
      </div>

      {/* Mobile: More menu */}
      <div className={styles.mobileTime}>
        {currentTime}
      </div>

      <button
        className={styles.mobileMenuBtn}
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        aria-label="More options"
        title="More options"
      >
        <Icon name="MoreHorizontal" size={18} strokeWidth={2.5} />
      </button>

      {/* Mobile: Expandable menu */}
      {isMobileMenuOpen && (
        <div className={styles.mobileMenu}>
          <div className={styles.menuItem}>
            <span className={styles.menuLabel}>{language}</span>
          </div>
          <div className={styles.menuItem}>
            <span className={styles.menuLabel}>{t(STATUS_BAR.ENCODING)}</span>
          </div>
          <div className={styles.menuItem}>
            <span className={styles.menuLabel}>{t(STATUS_BAR.FORMATTER)}</span>
          </div>
          <button
            className={styles.menuItem}
            onClick={() => setIsThemeSelectorOpen(!isThemeSelectorOpen)}
          >
            <Icon name="Palette" size={14} strokeWidth={2.5} className={styles.icon} />
            <span className={styles.menuLabel}>{themeLabel}</span>
          </button>
        </div>
      )}
    </footer>
  );
}



