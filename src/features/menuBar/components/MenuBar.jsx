import { useRef, useEffect } from 'react';
import { MENU_ITEMS, MENU_ITEM_IDS } from '../constants/menuBar.constants';
import { useMenuBar } from '../hooks/useMenuBar';
import { useLanguage } from '../../../store/LanguageContext';
import { MenuDropdown } from './MenuDropdown';
import styles from './MenuBar.module.css';


export function MenuBar() {
  const { openMenuId, toggleMenu, closeMenu, dispatch } = useMenuBar();
  const { t } = useLanguage();
  const navRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (navRef.current && !navRef.current.contains(e.target)) closeMenu();
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [closeMenu]);

  return (
    <nav className={styles.menuBar} ref={navRef}>
      {MENU_ITEMS.map(({ id, label, items }) => (
        <div key={id} className={styles.menuGroup}>
          <button
            className={`${styles.menuItem} ${id === MENU_ITEM_IDS.COPILOT ? styles.copilot : ''} ${openMenuId === id ? styles.active : ''}`}
            onClick={() => toggleMenu(id)}
          >
            {t(label)}
          </button>
          {openMenuId === id && (
            <MenuDropdown items={items} onSelect={dispatch} />
          )}
        </div>
      ))}
    </nav>
  );
}

