import { motion as Motion, useReducedMotion } from 'framer-motion';
import { useLanguage } from '../../../../store/LanguageContext';
import { useTabs } from '../../../../store/TabsContext';
import { Icon } from '../../../../shared/icons/Icon';
import { SKILLS_CATEGORIES } from '../mocks/skills.mock';
import { SKILLS } from '../constants/skills.constants';
import styles from './GalaxyLauncher.module.css';

const ORBITS = [
  { size: 46, duration: 9, color: '#38bdf8' },
  { size: 70, duration: 14, color: '#4ade80' },
  { size: 94, duration: 20, color: '#c084fc' },
];

/** Entry point from Skills into the 3D galaxy browser. */
export function GalaxyLauncher() {
  const { t } = useLanguage();
  const { openBrowser } = useTabs();
  const reduceMotion = useReducedMotion();
  const totalSkills = SKILLS_CATEGORIES.reduce((sum, { skills }) => sum + skills.length, 0);

  return (
    <Motion.article
      className={styles.launcher}
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
    >
      <div className={styles.preview} aria-hidden="true">
        <span className={styles.core} />
        {ORBITS.map(({ size, duration, color }, index) => (
          <Motion.span
            key={size}
            className={styles.orbit}
            style={{ width: `${size}%`, height: `${size}%` }}
            animate={reduceMotion ? undefined : { rotate: index % 2 ? -360 : 360 }}
            transition={{ duration, repeat: Infinity, ease: 'linear' }}
          >
            <i style={{ background: color, boxShadow: `0 0 10px ${color}` }} />
          </Motion.span>
        ))}
        <span className={styles.blackHole} />
      </div>

      <div className={styles.content}>
        <p className={styles.eyebrow}>{t(SKILLS.LAUNCHER_EYEBROW)}</p>
        <h2 className={styles.title}>{t(SKILLS.LAUNCHER_TITLE)}</h2>
        <p className={styles.text}>{t(SKILLS.LAUNCHER_TEXT)}</p>
        <p className={styles.meta}>
          {SKILLS_CATEGORIES.length} {t(SKILLS.LAUNCHER_SYSTEMS)} · {totalSkills} {t(SKILLS.LAUNCHER_PLANETS)}
        </p>
        <div className={styles.actions}>
          <Motion.button type="button" className={styles.primary} onClick={() => openBrowser('skills')} whileHover={{ y: -2 }} whileTap={{ scale: 0.97 }}>
            <Icon name="Orbit" size={15} /> {t(SKILLS.LAUNCHER_OPEN)}
          </Motion.button>
          <Motion.button type="button" className={styles.secondary} onClick={() => openBrowser('projects')} whileHover={{ y: -2 }} whileTap={{ scale: 0.97 }}>
            <Icon name="FolderGit2" size={15} /> {t(SKILLS.LAUNCHER_PROJECTS)}
          </Motion.button>
        </div>
      </div>
    </Motion.article>
  );
}
