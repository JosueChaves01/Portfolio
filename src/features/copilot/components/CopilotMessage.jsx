import { useLanguage } from '../../../store/LanguageContext';
import { ROLE_LABELS } from '../constants/copilot.constants';
import styles from './CopilotPanel.module.css';

export function CopilotMessage({ role, content }) {
  const { t } = useLanguage();
  const label = ROLE_LABELS[role] ? t(ROLE_LABELS[role]) : role;

  return (
    <div className={`${styles.message} ${styles[role]}`}>
      <span className={styles.messageRole}>{label}</span>
      <p className={styles.messageContent}>{content}</p>
    </div>
  );
}
