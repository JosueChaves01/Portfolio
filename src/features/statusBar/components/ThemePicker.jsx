import { THEMES, SETTINGS } from '../../settings/constants/settings.constants';
import { useLanguage } from '../../../store/LanguageContext';
import styles from './ThemePicker.module.css';

export function ThemePicker({ currentThemeId, onSelect }) {
  const { t } = useLanguage();
  return (
    <div className={styles.picker}>
      <p className={styles.title}>{t(SETTINGS.SECTION_THEME)}</p>
      {THEMES.map(({ id, label, color }) => (
        <button
          key={id}
          className={`${styles.option} ${id === currentThemeId ? styles.active : ''}`}
          onClick={() => onSelect(id)}
        >
          <span className={styles.dot} style={{ backgroundColor: color }} />
          {label}
          {id === currentThemeId && <span className={styles.check}>✓</span>}
        </button>
      ))}
    </div>
  );
}
