import { useLanguage } from '../../../store/LanguageContext';
import styles from './MenuDropdown.module.css';

export function MenuDropdown({ items, onSelect }) {
  const { t } = useLanguage();

  return (
    <div className={styles.dropdown}>
      {items.map((item, i) => {
        if (item.type === 'separator') {
          return <hr key={`sep-${i}`} className={styles.separator} />;
        }
        return (
          <button
            key={item.id}
            className={styles.item}
            onClick={() => onSelect(item.action, item.payload)}
          >
            <span className={styles.label}>{t(item.label)}</span>
            {item.shortcut && <span className={styles.shortcut}>{item.shortcut}</span>}
          </button>
        );
      })}
    </div>
  );
}

