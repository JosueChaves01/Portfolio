import { useState } from 'react';
import { useLanguage } from '../../../store/LanguageContext';
import { useOverlay } from '../../../store/OverlayContext';
import { useTerminal } from '../hooks/useTerminal';
import { TERMINAL, LINE_TONES } from '../constants/terminal.constants';
import { TerminalOutput } from './TerminalOutput';
import { TerminalInput } from './TerminalInput';
import styles from './Terminal.module.css';

const QUICK_COMMANDS = ['help', 'projects', 'skills', 'galaxy', 'contact', 'resume'];

export function Terminal() {
  const { t } = useLanguage();
  const { toggleTerminal } = useOverlay();
  const [activeTab, setActiveTab] = useState('terminal');
  const {
    lines, outputLog, input, suggestions, handleInputChange, handleSubmit, handleKeyDown, pickSuggestion, runQuick,
  } = useTerminal();

  return (
    <div className={styles.terminal}>
      <div className={styles.tabBar} role="tablist">
        {TERMINAL.TABS.map(({ id, label }) => (
          <button
            key={id}
            type="button"
            role="tab"
            aria-selected={activeTab === id}
            className={`${styles.tabLabel} ${activeTab === id ? styles.activeTab : ''}`}
            onClick={() => setActiveTab(id)}
          >
            {t(label)}
            {id === 'output' && outputLog.length > 0 && <span className={styles.tabCount}>{outputLog.length}</span>}
          </button>
        ))}
        <button className={styles.closeBtn} onClick={toggleTerminal} aria-label={t(TERMINAL.CLOSE)}>
          ✕
        </button>
      </div>

      {activeTab === 'terminal' && (
        <>
          <TerminalOutput lines={[{ id: 'welcome', content: t(TERMINAL.WELCOME_MESSAGE), tone: LINE_TONES.MUTED }, ...lines]} />
          {suggestions.length > 0 && (
            <div className={styles.suggestions} aria-label={t(TERMINAL.SUGGESTIONS)}>
              {suggestions.map(({ value, label }) => (
                <button key={value} type="button" className={styles.suggestion} onClick={() => pickSuggestion(value)}>
                  {label}
                </button>
              ))}
            </div>
          )}
          <div className={styles.quickBar}>
            {QUICK_COMMANDS.map((command) => (
              <button key={command} type="button" className={styles.quickCommand} onClick={() => runQuick(command)}>
                {command}
              </button>
            ))}
          </div>
          <TerminalInput value={input} onChange={handleInputChange} onSubmit={handleSubmit} onKeyDown={handleKeyDown} />
        </>
      )}

      {activeTab === 'problems' && (
        <TerminalOutput lines={[{ id: 'problems', content: `✓ ${t(TERMINAL.NO_PROBLEMS)}`, tone: LINE_TONES.SUCCESS }]} />
      )}

      {activeTab === 'output' && (
        <TerminalOutput lines={outputLog.length ? outputLog : [{ id: 'no-output', content: t(TERMINAL.NO_OUTPUT), tone: LINE_TONES.MUTED }]} />
      )}
    </div>
  );
}
