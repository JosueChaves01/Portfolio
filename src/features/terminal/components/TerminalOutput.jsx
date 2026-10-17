import { useEffect, useRef } from 'react';
import styles from './Terminal.module.css';

const TONE_CLASS = {
  command: styles.toneCommand,
  error: styles.toneError,
  success: styles.toneSuccess,
  muted: styles.toneMuted,
  accent: styles.toneAccent,
};

export function TerminalOutput({ lines }) {
  const endRef = useRef(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }, [lines]);

  return (
    <div className={styles.output} role="log" aria-live="polite">
      {lines.map((line) => (
        <div key={line.id} className={`${styles.outputLine} ${TONE_CLASS[line.tone] || ''}`}>
          {line.content}
        </div>
      ))}
      <div ref={endRef} />
    </div>
  );
}
