import styles from './CopilotPanel.module.css';

const ROLE_LABELS = { user: 'You', assistant: 'Copilot' };

export function CopilotMessage({ role, content }) {
  return (
    <div className={`${styles.message} ${styles[role]}`}>
      <span className={styles.messageRole}>{ROLE_LABELS[role]}</span>
      <p className={styles.messageContent}>{content}</p>
    </div>
  );
}
