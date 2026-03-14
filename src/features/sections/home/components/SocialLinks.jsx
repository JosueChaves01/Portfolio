import { Icon } from '../../../../shared/icons/Icon';
import { SOCIAL_LINKS } from '../constants/home.constants';
import styles from './HomeSection.module.css';

export function SocialLinks() {
  return (
    <div className={styles.socialLinks}>
      {SOCIAL_LINKS.map(({ id, label, icon, color, url }) => (
        <a
          key={id}
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.socialBtn}
          aria-label={label}
        >
          <span className={styles.socialIcon}><Icon name={icon} size={15} color={color} /></span>
          <span className={styles.socialLabel}>{label}</span>
        </a>
      ))}
    </div>
  );
}
