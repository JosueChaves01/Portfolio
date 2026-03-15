import { useLanguage } from '../../../store/LanguageContext';
import { useOverlay } from '../../../store/OverlayContext';
import { useTerminal } from '../hooks/useTerminal';
import { TERMINAL } from '../constants/terminal.constants';
import { TerminalOutput } from './TerminalOutput';
import { TerminalInput } from './TerminalInput';
import styles from './Terminal.module.css';

export function Terminal() {
  const { t } = useLanguage();
  const { toggleTerminal } = useOverlay();
  const { lines, input, handleInputChange, handleSubmit, handleKeyDown } = useTerminal();

  return (
    <div className={styles.terminal}>
      <div className={styles.tabBar}>
        {TERMINAL.TAB_LABELS.map((label, index) => (
          <span key={t(label)} className={`${styles.tabLabel} ${index === 0 ? styles.activeTab : ''}`}>
            {t(label)}
          </span>
        ))}
        <button
          className={styles.closeBtn}
          onClick={toggleTerminal}
          aria-label={t({ en: 'Close terminal', es: 'Cerrar terminal' })}
        >
          ✕
        </button>
      </div>
      <TerminalOutput lines={[{ id: 'welcome', content: t(TERMINAL.WELCOME_MESSAGE) }, ...lines]} />

      <TerminalInput
        value={input}
        onChange={handleInputChange}
        onSubmit={handleSubmit}
        onKeyDown={handleKeyDown}
      />
    </div>
  );
}
