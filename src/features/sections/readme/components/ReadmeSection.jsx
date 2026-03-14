import { Icon } from '../../../../shared/icons/Icon';
import { useLanguage } from '../../../../store/LanguageContext';
import { README, ROLE_TAGS, ABOUT_BULLETS, STACK_CATEGORIES, CONNECT_LINKS } from '../constants/readme.constants';
import { Tag } from '../../../../shared/components/Tag/Tag';
import styles from './ReadmeSection.module.css';

export function ReadmeSection() {
  const { t } = useLanguage();

  return (
    <article className={styles.readme}>
      <h1 className={styles.h1}>{README.HEADING}</h1>
      <p className={styles.subtitle}>{t(README.SUBTITLE)}</p>

      <div className={styles.roleTags}>
        {ROLE_TAGS.map(({ icon, color, label }, i) => (
          <span
            key={i}
            className={styles.roleTag}
            style={{
              borderColor: color,
              backgroundColor: `${color}15`,
              color: color
            }}
          >
            <Icon name={icon} size={12} color={color} /> {t(label)}
          </span>
        ))}
      </div>

      <hr className={styles.divider} />

      <h2 className={styles.h2}>{t({ en: 'About', es: 'Acerca de' })}</h2>
      <ul className={styles.list}>
        {ABOUT_BULLETS.map(({ icon, color, text }, i) => (
          <li key={i} className={styles.listItem}>
            <Icon name={icon} size={14} color={color} /> {t(text)}
          </li>
        ))}
      </ul>

      <hr className={styles.divider} />

      <h2 className={styles.h2}>{t({ en: 'Stack', es: 'Tecnologías' })}</h2>
      {STACK_CATEGORIES.map(({ title, items }, i) => (
        <div key={i} className={styles.stackRow}>
          <strong className={styles.stackLabel}>{t(title)}:</strong>
          <div className={styles.stackTags}>
            {items.map((tag) => <Tag key={tag}>{tag}</Tag>)}
          </div>
        </div>
      ))}

      <hr className={styles.divider} />

      <h2 className={styles.h2}>{t({ en: 'Connect', es: 'Conectar' })}</h2>
      <div className={styles.connectLinks}>
        {CONNECT_LINKS.map(({ label, url }) => (
          <a key={label} href={url} target="_blank" rel="noopener noreferrer" className={styles.link}>
            {label}
          </a>
        ))}
      </div>

      <hr className={styles.divider} />
      <p className={styles.footer}>{t(README.FOOTER)}</p>
    </article>
  );
}

