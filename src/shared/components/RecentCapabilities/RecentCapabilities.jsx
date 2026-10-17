import { RECENT_CAPABILITIES } from '../../data/recentWork';
import { useLanguage } from '../../../store/LanguageContext';
import { Icon } from '../../icons/Icon';
import { Tag } from '../Tag/Tag';
import styles from './RecentCapabilities.module.css';

export function RecentCapabilities() {
  const { t } = useLanguage();

  return (
    <div className={styles.grid}>
      {RECENT_CAPABILITIES.map(({ id, icon, color, title, summary, evidence, tags }) => (
        <article key={id} className={styles.card} style={{ '--capability-color': color }}>
          <div className={styles.cardHeader}>
            <Icon name={icon} size={20} color={color} />
            <h3>{t(title)}</h3>
          </div>
          <p className={styles.summary}>{t(summary)}</p>
          <p className={styles.evidence}>
            <strong>{t({ en: 'In White City', es: 'En White City' })}</strong>
            {t(evidence)}
          </p>
          <div className={styles.tags}>
            {tags.map((tag) => <Tag key={tag}>{tag}</Tag>)}
          </div>
        </article>
      ))}
    </div>
  );
}
