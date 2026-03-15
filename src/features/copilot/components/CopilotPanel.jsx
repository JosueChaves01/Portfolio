import { Icon } from '../../../shared/icons/Icon';
import { useLanguage } from '../../../store/LanguageContext';
import { useCopilot } from '../hooks/useCopilot';
import {
  COPILOT,
  PREDEFINED_QUESTIONS,
  QUESTION_PREFIX,
  ICON_SIZE,
} from '../constants/copilot.constants';
import { CopilotMessage } from './CopilotMessage';
import { CopilotInput } from './CopilotInput';
import styles from './CopilotPanel.module.css';

export function CopilotPanel() {
  const { t } = useLanguage();
  const {
    messages,
    inputValue,
    setInputValue,
    messagesLeft,
    isLoading,
    error,
    handlePredefinedQuestion,
    handleSubmit,
    onClose,
  } = useCopilot();

  const isExhausted = messagesLeft <= 0;
  const isDisabled = isExhausted || isLoading;

  return (
    <aside className={styles.panel}>
      <header className={styles.header}>
        <span className={styles.title}>{t(COPILOT.TITLE)}</span>
        <div className={styles.headerActions}>
          <button className={styles.iconBtn} aria-label={t(COPILOT.ARIA_LABEL.EDIT)}>
            <Icon name={COPILOT.EDIT_ICON} size={ICON_SIZE.SMALL} />
          </button>
          <button className={styles.iconBtn} onClick={onClose} aria-label={t(COPILOT.ARIA_LABEL.CLOSE)}>
            ✕
          </button>
        </div>
      </header>

      <div className={styles.workspaceBadge}>{COPILOT.WORKSPACE_BADGE}</div>

      <div className={styles.body}>
        {messages.length === 0 ? (
          <div className={styles.welcome}>
            <div className={styles.avatar}>
              <Icon name={COPILOT.AVATAR_ICON} size={ICON_SIZE.AVATAR} />
            </div>
            <h3 className={styles.welcomeHeading}>{t(COPILOT.WELCOME_HEADING)}</h3>
            <p className={styles.welcomeBody}>{t(COPILOT.WELCOME_BODY)}</p>
            <div className={styles.predefinedGrid}>
              {PREDEFINED_QUESTIONS.map(({ id, label }) => (
                <button
                  key={id}
                  className={styles.predefinedBtn}
                  onClick={() => handlePredefinedQuestion(t(label))}
                  disabled={isLoading}
                >
                  {QUESTION_PREFIX} {t(label)}
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div className={styles.messageList}>
            {messages.map((msg) => (
              <CopilotMessage key={msg.id} role={msg.role} content={msg.content} />
            ))}
            {isLoading && (
              <div className={styles.loadingRow}>
                <span className={styles.loadingText}>{t(COPILOT.LOADING)}</span>
              </div>
            )}
            {error && (
              <div className={styles.errorRow}>
                <span className={styles.errorText}>{error}</span>
              </div>
            )}
          </div>
        )}
      </div>

      <footer className={styles.footer}>
        <CopilotInput
          value={inputValue}
          onChange={setInputValue}
          onSubmit={handleSubmit}
          disabled={isDisabled}
        />
        <div className={styles.footerMeta}>
          <span className={styles.messagesLeft}>{t(COPILOT.MESSAGES_LEFT_TEMPLATE(messagesLeft))}</span>
          <span className={styles.disclaimer}>{t(COPILOT.DISCLAIMER)}</span>
        </div>
      </footer>
    </aside>
  );
}

