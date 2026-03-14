import { useState, useEffect, useRef } from 'react';
import {
  TYPEWRITER_SPEED_MS,
  TYPEWRITER_DELETE_SPEED_MS,
  TYPEWRITER_PAUSE_MS,
} from '../constants/home.constants';

const STATE = { TYPING: 'typing', PAUSING: 'pausing', DELETING: 'deleting' };

export function useTypewriter(phrases) {
  const [displayText, setDisplayText] = useState('');
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [typingState, setTypingState] = useState(STATE.TYPING);
  const timeoutRef = useRef(null);

  useEffect(() => {
    const currentPhrase = phrases[phraseIndex];

    if (typingState === STATE.TYPING) {
      if (charIndex < currentPhrase.length) {
        timeoutRef.current = setTimeout(() => {
          setDisplayText(currentPhrase.slice(0, charIndex + 1));
          setCharIndex((i) => i + 1);
        }, TYPEWRITER_SPEED_MS);
      } else {
        timeoutRef.current = setTimeout(() => setTypingState(STATE.PAUSING), TYPEWRITER_PAUSE_MS);
      }
    } else if (typingState === STATE.PAUSING) {
      setTypingState(STATE.DELETING);
    } else if (typingState === STATE.DELETING) {
      if (charIndex > 0) {
        timeoutRef.current = setTimeout(() => {
          setDisplayText(currentPhrase.slice(0, charIndex - 1));
          setCharIndex((i) => i - 1);
        }, TYPEWRITER_DELETE_SPEED_MS);
      } else {
        setPhraseIndex((i) => (i + 1) % phrases.length);
        setTypingState(STATE.TYPING);
      }
    }

    return () => clearTimeout(timeoutRef.current);
  }, [charIndex, typingState, phraseIndex, phrases]);

  return { displayText, isTyping: typingState === STATE.TYPING };
}
