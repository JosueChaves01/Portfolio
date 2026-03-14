import { Icon } from '../../../shared/icons/Icon';
import { useSettings } from '../hooks/useSettings';
import { useLanguage } from '../../../store/LanguageContext';
import {
  THEMES, SETTINGS, QUICK_ACTIONS, KEYBOARD_SHORTCUTS_LIST, LANGUAGES,
} from '../constants/settings.constants';
import styles from './SettingsPanel.module.css';

export function SettingsPanel() {
  const { theme, setTheme, handleQuickAction } = useSettings();
  const { language, setLanguage, t } = useLanguage();

  return (
    <div className={styles.panel}>
      <section className={styles.section}>
        <h3 className={styles.sectionTitle}>{t(SETTINGS.SECTION_THEME)}</h3>
        <div className={styles.themeList}>
          {THEMES.map(({ id, label, color }) => (
            <button
              key={id}
              className={`${styles.themeOption} ${theme === id ? styles.active : ''}`}
              onClick={() => setTheme(id)}
            >
              <span className={styles.themeColor} style={{ backgroundColor: color }} />
              <span className={styles.themeLabel}>{label}</span>
              {theme === id && <span className={styles.check}>✓</span>}
            </button>
          ))}
        </div>
      </section>

      <section className={styles.section}>
        <h3 className={styles.sectionTitle}>{t(SETTINGS.SECTION_LANGUAGE)}</h3>
        <div className={styles.languageList}>
          {LANGUAGES.map(({ id, label, icon }) => (
            <button
              key={id}
              className={`${styles.themeOption} ${language === id ? styles.active : ''}`}
              onClick={() => setLanguage(id)}
            >
              <span className={styles.languageIcon}>{icon}</span>
              <span className={styles.themeLabel}>{label}</span>
              {language === id && <span className={styles.check}>✓</span>}
            </button>
          ))}
        </div>
      </section>

      <section className={styles.section}>
        <h3 className={styles.sectionTitle}>{t(SETTINGS.SECTION_QUICK_ACTIONS)}</h3>
        <div className={styles.actionList}>
          {QUICK_ACTIONS.map(({ id, label, icon, shortcut, action }) => (
            <button key={id} className={styles.actionItem} onClick={() => handleQuickAction(action)}>
              <span className={styles.actionIcon}><Icon name={icon} size={14} /></span>
              <span className={styles.actionLabel}>{t(label)}</span>
              {shortcut && <span className={styles.shortcut}>{shortcut}</span>}
            </button>
          ))}
        </div>
      </section>

      <section className={styles.section}>
        <h3 className={styles.sectionTitle}>{t(SETTINGS.SECTION_SHORTCUTS)}</h3>
        <div className={styles.shortcutList}>
          {KEYBOARD_SHORTCUTS_LIST.map(({ shortcut, description }) => (
            <div key={shortcut} className={styles.shortcutRow}>
              <code className={styles.shortcutKey}>{shortcut}</code>
              <span className={styles.shortcutDesc}>{t(description)}</span>
            </div>
          ))}
        </div>
      </section>

      <footer className={styles.footer}>
        <p className={styles.footerText}>{t(SETTINGS.FOOTER_VERSION)}</p>
        <p className={styles.footerText}>{t(SETTINGS.FOOTER_CREDIT)}</p>
      </footer>
    </div>
  );
}

