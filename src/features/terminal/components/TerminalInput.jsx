import { useRef, useEffect } from 'react';
import { useLanguage } from '../../../store/LanguageContext';
import { TERMINAL } from '../constants/terminal.constants';
import styles from './Terminal.module.css';

export function TerminalInput({ value, onChange, onSubmit, onKeyDown }) {
  const { t } = useLanguage();
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleKeyDown = (event) => {
    onKeyDown(event);
    if (event.key === 'Enter') {
      event.preventDefault();
      onSubmit();
    }
  };

  return (
    <div className={styles.inputRow}>
      <span className={styles.prompt}>{TERMINAL.PROMPT}</span>
      <input
        ref={inputRef}
        className={styles.input}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={handleKeyDown}
        autoComplete="off"
        spellCheck={false}
        aria-label={t({ en: 'Terminal input', es: 'Entrada de terminal' })}
      />
    </div>
  );
}

