import { useId, useState } from 'react';
import { AnimatePresence, MotionConfig, motion as Motion } from 'framer-motion';
import { APPLIED_SKILLS } from '../mocks/appliedSkills.mock';
import { SOFT_SKILLS } from '../mocks/softSkills.mock';
import { SKILLS } from '../constants/skills.constants';
import { useLanguage } from '../../../../store/LanguageContext';
import { Icon } from '../../../../shared/icons/Icon';
import styles from './SkillsInAction.module.css';

const skills = [
  ...APPLIED_SKILLS.map((skill) => ({ ...skill, kind: 'technical' })),
  ...SOFT_SKILLS.map((skill) => ({ ...skill, kind: 'soft' })),
];

export function SkillsInAction() {
  const { t } = useLanguage();
  const [openId, setOpenId] = useState(null);
  const instanceId = useId();

  return (
    <MotionConfig reducedMotion="user">
      <ul className={styles.grid}>
        {skills.map(({ id, kind, icon, color, title, summary, inPractice, traits }) => {
          const isOpen = openId === id;
          const practiceId = `${instanceId}-${id}-practice`;

          return (
            <Motion.li
              key={id}
              className={styles.card}
              style={{ '--skill-color': color }}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.3 }}
              data-expanded={isOpen}
            >
              <div className={styles.cardHeader}>
                <span className={styles.iconWrap} aria-hidden="true">
                  <Icon name={icon} size={22} color={color} />
                </span>
                <span className={styles.kind}>
                  {t(kind === 'soft' ? SKILLS.SOFT_LABEL : SKILLS.TECHNICAL_LABEL)}
                </span>
              </div>
              <h2 className={styles.title}>{t(title)}</h2>
              <p className={styles.summary}>{t(summary)}</p>
              <ul className={styles.traits}>
                {traits.map((trait) => (
                  <li key={trait.en} className={styles.trait}>{t(trait)}</li>
                ))}
              </ul>
              <div id={practiceId}>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <Motion.div
                      className={styles.practice}
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <p className={styles.practiceLabel}>{t(SKILLS.IN_PRACTICE)}</p>
                      <p className={styles.example}>{t(inPractice)}</p>
                    </Motion.div>
                  )}
                </AnimatePresence>
              </div>
              <button
                type="button"
                className={styles.toggle}
                onClick={() => setOpenId(isOpen ? null : id)}
                aria-expanded={isOpen}
                aria-controls={practiceId}
                aria-label={`${t(isOpen ? SKILLS.COLLAPSE : SKILLS.EXPAND)}: ${t(title)}`}
              >
                {t(isOpen ? SKILLS.COLLAPSE : SKILLS.EXPAND)}
                <Motion.span animate={{ rotate: isOpen ? 180 : 0 }} className={styles.chevron} aria-hidden="true">
                  <Icon name="ChevronDown" size={14} />
                </Motion.span>
              </button>
            </Motion.li>
          );
        })}
      </ul>
    </MotionConfig>
  );
}
