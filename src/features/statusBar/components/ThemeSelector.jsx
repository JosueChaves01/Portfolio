import { useRef } from 'react';
import { THEMES } from '../../settings/constants/settings.constants';
import { useTheme } from '../../../store/ThemeContext';
import { useClickOutside } from '../../../shared/hooks/useClickOutside';
import styles from './ThemeSelector.module.css';

export function ThemeSelector({ onClose }) {
  const { theme, setTheme } = useTheme();
  const menuRef = useRef(null);

  useClickOutside(menuRef, onClose);

  const handleThemeSelect = (themeId) => {
    setTheme(themeId);
    onClose();
  };

  return (
    <div className={styles.selector} ref={menuRef}>
      <header className={styles.header}>COLOR THEME</header>
      <div className={styles.list}>
        {THEMES.map((t) => (
          <button
            key={t.id}
            className={`${styles.item} ${theme === t.id ? styles.active : ''}`}
            onClick={() => handleThemeSelect(t.id)}
          >
            <span className={styles.colorDot} style={{ backgroundColor: t.color }} />
            <span className={styles.label}>{t.label}</span>
            {theme === t.id && <span className={styles.check}>✓</span>}
          </button>
        ))}
      </div>
    </div>
  );
}
