import { useTypewriter } from '../hooks/useTypewriter';
import { useLanguage } from '../../../../store/LanguageContext';
import { TYPEWRITER_PHRASES } from '../constants/home.constants';
import styles from './HomeSection.module.css';


export function TypewriterText() {
  const { t } = useLanguage();
  const translatedPhrases = TYPEWRITER_PHRASES.map(phrase => t(phrase));
  const { displayText, isTyping } = useTypewriter(translatedPhrases);

  return (
    <p className={styles.typewriter}>
      {displayText}
      <span className={`${styles.cursor} ${isTyping ? styles.blinking : ''}`}>|</span>
    </p>
  );
}

