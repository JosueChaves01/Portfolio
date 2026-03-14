import { useIDE } from '../../../store/IDEContext';
import { useTerminal } from '../hooks/useTerminal';
import { TERMINAL } from '../constants/terminal.constants';
import { TerminalOutput } from './TerminalOutput';
import { TerminalInput } from './TerminalInput';
import styles from './Terminal.module.css';

export function Terminal() {
  const { toggleTerminal } = useIDE();
  const { lines, input, handleInputChange, handleSubmit, handleKeyDown } = useTerminal();

  return (
    <div className={styles.terminal}>
      <div className={styles.tabBar}>
        {TERMINAL.TAB_LABELS.map((label, index) => (
          <span key={label} className={`${styles.tabLabel} ${index === 0 ? styles.activeTab : ''}`}>
            {label}
          </span>
        ))}
        <button className={styles.closeBtn} onClick={toggleTerminal} aria-label="Close terminal">
          ✕
        </button>
      </div>
      <TerminalOutput lines={[TERMINAL.WELCOME_MESSAGE, ...lines]} />
      <TerminalInput
        value={input}
        onChange={handleInputChange}
        onSubmit={handleSubmit}
        onKeyDown={handleKeyDown}
      />
    </div>
  );
}
