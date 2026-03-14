import { useTypewriter } from '../hooks/useTypewriter';
import { TYPEWRITER_PHRASES } from '../constants/home.constants';
import styles from './HomeSection.module.css';

export function TypewriterText() {
  const { displayText, isTyping } = useTypewriter(TYPEWRITER_PHRASES);

  return (
    <p className={styles.typewriter}>
      {displayText}
      <span className={`${styles.cursor} ${isTyping ? styles.blinking : ''}`}>|</span>
    </p>
  );
}
