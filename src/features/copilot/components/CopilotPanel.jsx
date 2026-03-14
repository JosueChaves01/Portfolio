import { Icon } from '../../../shared/icons/Icon';
import { useCopilot } from '../hooks/useCopilot';
import {
  COPILOT, PREDEFINED_QUESTIONS, QUESTION_PREFIX,
} from '../constants/copilot.constants';
import { CopilotMessage } from './CopilotMessage';
import { CopilotInput } from './CopilotInput';
import styles from './CopilotPanel.module.css';

export function CopilotPanel() {
  const {
    messages, inputValue, setInputValue, messagesLeft,
    handlePredefinedQuestion, handleSubmit, onClose,
  } = useCopilot();

  const isExhausted = messagesLeft <= 0;

  return (
    <aside className={styles.panel}>
      <header className={styles.header}>
        <span className={styles.title}>{COPILOT.TITLE}</span>
        <div className={styles.headerActions}>
          <button className={styles.iconBtn} aria-label="Edit">
            <Icon name={COPILOT.EDIT_ICON} size={14} />
          </button>
          <button className={styles.iconBtn} onClick={onClose} aria-label="Close">✕</button>
        </div>
      </header>

      <div className={styles.workspaceBadge}>{COPILOT.WORKSPACE_BADGE}</div>

      <div className={styles.body}>
        {messages.length === 0 ? (
          <div className={styles.welcome}>
            <div className={styles.avatar}>
              <Icon name={COPILOT.AVATAR_ICON} size={24} />
            </div>
            <h3 className={styles.welcomeHeading}>{COPILOT.WELCOME_HEADING}</h3>
            <p className={styles.welcomeBody}>{COPILOT.WELCOME_BODY}</p>
            <div className={styles.predefinedGrid}>
              {PREDEFINED_QUESTIONS.map(({ id, label }) => (
                <button
                  key={id}
                  className={styles.predefinedBtn}
                  onClick={() => handlePredefinedQuestion(label)}
                >
                  {QUESTION_PREFIX} {label}
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div className={styles.messageList}>
            {messages.map((msg, i) => (
              <CopilotMessage key={i} role={msg.role} content={msg.content} />
            ))}
          </div>
        )}
      </div>

      <footer className={styles.footer}>
        <CopilotInput
          value={inputValue}
          onChange={setInputValue}
          onSubmit={handleSubmit}
          disabled={isExhausted}
        />
        <div className={styles.footerMeta}>
          <span className={styles.messagesLeft}>
            {COPILOT.MESSAGES_LEFT_TEMPLATE(messagesLeft)}
          </span>
          <span className={styles.disclaimer}>{COPILOT.DISCLAIMER}</span>
        </div>
      </footer>
    </aside>
  );
}
