import { Icon } from '../../../../shared/icons/Icon';
import styles from './ContactSection.module.css';

const EXTERNAL_ICON = '↗';

export function SocialCard({ platform, display, url, icon, color }) {
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className={styles.socialCard}
    >
      <span className={styles.socialIcon}><Icon name={icon} size={18} color={color} /></span>
      <div className={styles.socialInfo}>
        <span className={styles.socialPlatform}>{platform}</span>
        <span className={styles.socialDisplay}>{display}</span>
      </div>
      <span className={styles.externalIcon}>{EXTERNAL_ICON}</span>
    </a>
  );
}
