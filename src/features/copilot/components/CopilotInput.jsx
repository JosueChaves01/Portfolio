import { Icon } from '../../../shared/icons/Icon';
import { COPILOT } from '../constants/copilot.constants';
import styles from './CopilotPanel.module.css';

export function CopilotInput({ value, onChange, onSubmit, disabled }) {
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
        placeholder={COPILOT.INPUT_PLACEHOLDER}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={handleKeyDown}
        disabled={disabled}
      />
      <button
        className={styles.sendBtn}
        onClick={onSubmit}
        disabled={disabled || !value.trim()}
        aria-label="Send message"
      >
        <Icon name={COPILOT.SEND_ICON} size={14} />
      </button>
    </div>
  );
}
