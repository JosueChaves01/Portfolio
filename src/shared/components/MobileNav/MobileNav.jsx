import { useTabs } from '../../../store/TabsContext';
import { useLanguage } from '../../../store/LanguageContext';
import { FILE_IDS } from '../../../features/explorer/constants/explorer.constants';
import { Icon } from '../../icons/Icon';
import styles from './MobileNav.module.css';

const NAV_ITEMS = [
  {
    id: FILE_IDS.HOME,
    icon: 'Home',
    label: { en: 'Home', es: 'Inicio' },
  },
  {
    id: FILE_IDS.PROJECTS,
    icon: 'FolderGit2',
    label: { en: 'Projects', es: 'Proyectos' },
  },
  {
    id: FILE_IDS.SKILLS,
    icon: 'Cpu',
    label: { en: 'Skills', es: 'Skills' },
  },
  {
    id: FILE_IDS.EXPERIENCE,
    icon: 'Briefcase',
    label: { en: 'Exp', es: 'Exp' },
  },
  {
    id: FILE_IDS.CONTACT,
    icon: 'Mail',
    label: { en: 'Contact', es: 'Contacto' },
  },
];

export function MobileNav() {
  const { activeTab, openTab } = useTabs();
  const { t } = useLanguage();

  return (
    <nav className={styles.mobileNav} aria-label="Mobile Navigation">
      {NAV_ITEMS.map(({ id, icon, label }) => {
        const isActive = activeTab === id;
        return (
          <button
            key={id}
            type="button"
            className={`${styles.navItem} ${isActive ? styles.active : ''}`}
            onClick={() => openTab(id)}
            aria-current={isActive ? 'page' : undefined}
            aria-label={t(label)}
          >
            <div className={styles.iconWrapper}>
              <Icon name={icon} size={18} className={styles.navIcon} />
              {isActive && <span className={styles.activeDot} />}
            </div>
            <span className={styles.navLabel}>{t(label)}</span>
          </button>
        );
      })}
    </nav>
  );
}
