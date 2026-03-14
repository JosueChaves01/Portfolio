import { Icon } from '../../../../shared/icons/Icon';
import { README, ROLE_TAGS, ABOUT_BULLETS, STACK_CATEGORIES, CONNECT_LINKS } from '../constants/readme.constants';
import { Tag } from '../../../../shared/components/Tag/Tag';
import styles from './ReadmeSection.module.css';

export function ReadmeSection() {
  return (
    <article className={styles.readme}>
      <h1 className={styles.h1}>{README.HEADING}</h1>
      <p className={styles.subtitle}>{README.SUBTITLE}</p>

      <div className={styles.roleTags}>
        {ROLE_TAGS.map(({ id, icon, color, label }) => (
          <span 
            key={id} 
            className={styles.roleTag}
            style={{ 
              borderColor: color,
              backgroundColor: `${color}15`,
              color: color
            }}
          >
            <Icon name={icon} size={12} color={color} /> {label}
          </span>
        ))}
      </div>


      <hr className={styles.divider} />

      <h2 className={styles.h2}>About</h2>
      <ul className={styles.list}>
        {ABOUT_BULLETS.map(({ icon, color, text }) => (
          <li key={text} className={styles.listItem}>
            <Icon name={icon} size={14} color={color} /> {text}
          </li>
        ))}
      </ul>

      <hr className={styles.divider} />

      <h2 className={styles.h2}>Stack</h2>
      {STACK_CATEGORIES.map(({ label, tags }) => (
        <div key={label} className={styles.stackRow}>
          <strong className={styles.stackLabel}>{label}:</strong>
          <div className={styles.stackTags}>

            {tags.map((tag) => <Tag key={tag}>{tag}</Tag>)}
          </div>
        </div>
      ))}

      <hr className={styles.divider} />

      <h2 className={styles.h2}>Connect</h2>
      <div className={styles.connectLinks}>
        {CONNECT_LINKS.map(({ label, url }) => (
          <a key={label} href={url} target="_blank" rel="noopener noreferrer" className={styles.link}>
            {label}
          </a>
        ))}
      </div>

      <hr className={styles.divider} />
      <p className={styles.footer}>{README.FOOTER}</p>
    </article>
  );
}
