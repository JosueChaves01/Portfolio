import { motion as Motion } from 'framer-motion';
import { TRAVEL_DURATION_MS } from '../constants/browser.constants';
import styles from './GalaxyBrowser.module.css';

const DURATION = TRAVEL_DURATION_MS / 1000;

/**
 * Full-viewport black hole: the event horizon swallows the screen, the accretion
 * ring spins faster as it closes, then everything expands to reveal the new window.
 */
export function BlackHoleTransition({ label }) {
  return (
    <Motion.div
      className={styles.travel}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.15 }}
      aria-live="polite"
    >
      <Motion.div
        className={styles.accretion}
        initial={{ scale: 0.2, rotate: 0, opacity: 0 }}
        animate={{ scale: [0.2, 1.4, 3.2], rotate: [0, 260, 720], opacity: [0, 1, 0] }}
        transition={{ duration: DURATION, ease: 'easeInOut', times: [0, 0.5, 1] }}
      />
      <Motion.div
        className={styles.horizon}
        initial={{ scale: 0 }}
        animate={{ scale: [0, 1, 1, 0] }}
        transition={{ duration: DURATION, ease: 'easeInOut', times: [0, 0.42, 0.58, 1] }}
      />
      <Motion.span
        className={styles.travelLabel}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: [0, 1, 1, 0], y: [8, 0, 0, -8] }}
        transition={{ duration: DURATION, times: [0, 0.3, 0.7, 1] }}
      >
        {label}
      </Motion.span>
    </Motion.div>
  );
}
