import { Icon } from '../../../shared/icons/Icon';
import { useLanguage } from '../../../store/LanguageContext';
import { COPILOT, ICON_SIZE } from '../constants/copilot.constants';
import styles from './CopilotPanel.module.css';

const KEY_ENTER = 'Enter';

export function CopilotInput({ value, onChange, onSubmit, disabled }) {
  const { t } = useLanguage();

  const handleKeyDown = (e) => {
    if (e.key === KEY_ENTER && !e.shiftKey) {
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
        aria-label={t(COPILOT.ARIA_LABEL.SEND)}
      >
        <Icon name={COPILOT.SEND_ICON} size={ICON_SIZE.SMALL} />
      </button>
    </div>
  );
}

