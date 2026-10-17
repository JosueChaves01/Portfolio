import { useCallback, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { AnimatePresence, motion as Motion } from 'framer-motion';
import { useLanguage } from '../../../store/LanguageContext';
import { useTabs } from '../../../store/TabsContext';
import { Icon } from '../../../shared/icons/Icon';
import { FILE_IDS, FILE_REGISTRY, FILE_TREE_ORDER } from '../../explorer/constants/explorer.constants';
import { NEW_TAB_MENU } from '../constants/tabBar.constants';
import styles from './TabBar.module.css';

const PAGE_IDS = FILE_TREE_ORDER.filter((id) => !FILE_REGISTRY[id].isDownload);
const MENU_WIDTH = 280;

/** "+" button at the end of the tab bar: open any page or the 3D galaxy browser. */
export function NewTabMenu() {
  const { t } = useLanguage();
  const { openTab, openBrowser, openTabs } = useTabs();
  const [position, setPosition] = useState(null);
  const buttonRef = useRef(null);
  const menuRef = useRef(null);
  const isOpen = Boolean(position);

  const close = useCallback(() => setPosition(null), []);

  const toggle = () => {
    if (isOpen) {
      close();
      return;
    }
    // The tab bar scrolls horizontally, so the menu is portaled and positioned from the button.
    const rect = buttonRef.current.getBoundingClientRect();
    setPosition({ top: rect.bottom + 4, left: Math.max(8, Math.min(rect.left, window.innerWidth - MENU_WIDTH - 8)) });
  };

  useEffect(() => {
    if (!isOpen) return undefined;
    const onPointerDown = (event) => {
      if (!menuRef.current?.contains(event.target) && !buttonRef.current?.contains(event.target)) close();
    };
    const onKeyDown = (event) => { if (event.key === 'Escape') close(); };
    window.addEventListener('pointerdown', onPointerDown);
    window.addEventListener('keydown', onKeyDown);
    window.addEventListener('resize', close);
    return () => {
      window.removeEventListener('pointerdown', onPointerDown);
      window.removeEventListener('keydown', onKeyDown);
      window.removeEventListener('resize', close);
    };
  }, [isOpen, close]);

  const choose = (action) => {
    action();
    close();
  };

  return (
    <>
      <button
        ref={buttonRef}
        type="button"
        className={styles.newTabButton}
        onClick={toggle}
        aria-haspopup="menu"
        aria-expanded={isOpen}
        aria-label={t(NEW_TAB_MENU.BUTTON)}
        title={t(NEW_TAB_MENU.BUTTON)}
      >
        <Icon name="Plus" size={15} />
      </button>

      {createPortal(
        <AnimatePresence>
          {isOpen && (
            <Motion.div
              ref={menuRef}
              role="menu"
              className={styles.newTabMenu}
              style={{ top: position.top, left: position.left, width: MENU_WIDTH }}
              initial={{ opacity: 0, y: -6, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -6, scale: 0.98 }}
              transition={{ duration: 0.15 }}
            >
              <span className={styles.menuSection}>{t(NEW_TAB_MENU.BROWSER_SECTION)}</span>
              <button type="button" role="menuitem" className={`${styles.menuItem} ${styles.menuItemFeatured}`} onClick={() => choose(() => openBrowser('skills'))}>
                <Icon name="Orbit" size={15} color="#c084fc" />
                <span className={styles.menuText}>
                  <strong>{t(NEW_TAB_MENU.BROWSER_SKILLS)}</strong>
                  <small>{t(NEW_TAB_MENU.BROWSER_HINT)}</small>
                </span>
              </button>
              <button type="button" role="menuitem" className={styles.menuItem} onClick={() => choose(() => openBrowser('projects'))}>
                <Icon name="FolderGit2" size={15} color="#fb923c" />
                <span className={styles.menuText}><strong>{t(NEW_TAB_MENU.BROWSER_PROJECTS)}</strong></span>
              </button>

              <span className={styles.menuSection}>{t(NEW_TAB_MENU.PAGES_SECTION)}</span>
              {PAGE_IDS.map((id) => {
                const file = FILE_REGISTRY[id];
                return (
                  <button key={id} type="button" role="menuitem" className={styles.menuItem} onClick={() => choose(() => openTab(id))}>
                    <Icon name={file.icon} size={14} color={file.color} />
                    <span className={styles.menuText}><strong>{file.name}</strong></span>
                    {openTabs.includes(id) && <span className={styles.menuOpenDot} aria-label={t(NEW_TAB_MENU.ALREADY_OPEN)} />}
                  </button>
                );
              })}
              {openTabs.includes(FILE_IDS.BROWSER) && <span className={styles.menuFootnote}>{t(NEW_TAB_MENU.BROWSER_OPEN_NOTE)}</span>}
            </Motion.div>
          )}
        </AnimatePresence>,
        document.body,
      )}
    </>
  );
}
