import { Icon } from '../../../shared/icons/Icon';
import { useLanguage } from '../../../store/LanguageContext';
import { COPILOT } from '../constants/copilot.constants';
import styles from './CopilotPanel.module.css';

export function CopilotInput({ value, onChange, onSubmit, disabled }) {
  const { t } = useLanguage();

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      onSubmit();
    }
  };

  return (
    <div className={styles.inputRow}>
      <input
        className={styles.chatInput}
        placeholder={t(COPILOT.INPUT_PLACEHOLDER)}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={handleKeyDown}
        disabled={disabled}
      />
      <button
        className={styles.sendBtn}
        onClick={onSubmit}
        disabled={disabled || !value.trim()}
        aria-label={t({ en: 'Send message', es: 'Enviar mensaje' })}
      >
        <Icon name={COPILOT.SEND_ICON || 'Send'} size={14} />
      </button>
    </div>
  );
}

