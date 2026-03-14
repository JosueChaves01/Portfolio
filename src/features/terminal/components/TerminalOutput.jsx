import { useEffect, useRef } from 'react';
import styles from './Terminal.module.css';

export function TerminalOutput({ lines }) {
  const endRef = useRef(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [lines]);

  return (
    <div className={styles.output}>
      {lines.map((line, index) => (
        <div key={index} className={styles.outputLine}>
          {line}
        </div>
      ))}
      <div ref={endRef} />
    </div>
  );
}
