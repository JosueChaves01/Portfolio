import { useState } from 'react';
import { AnimatePresence, MotionConfig, motion as Motion } from 'framer-motion';
import { SOFT_SKILLS } from '../mocks/softSkills.mock';
import { SKILLS } from '../constants/skills.constants';
import { useLanguage } from '../../../../store/LanguageContext';
import { Icon } from '../../../../shared/icons/Icon';
import styles from './SoftSkills.module.css';

const listVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 28, scale: 0.96 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { type: 'spring', stiffness: 220, damping: 22 } },
};

const traitVariants = {
  hidden: { opacity: 0, x: -8 },
  visible: (index) => ({ opacity: 1, x: 0, transition: { delay: 0.35 + index * 0.08 } }),
};

export function SoftSkills() {
  const { t } = useLanguage();
  const [openId, setOpenId] = useState(null);

  return (
    <MotionConfig reducedMotion="user">
      <div className={styles.wrapper}>
        <Motion.div
          className={styles.header}
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
        >
          <p className={styles.fileComment}>{t(SKILLS.SOFT_COMMENT)}</p>
          <h2 className={styles.heading}>{t(SKILLS.SOFT_HEADING)}</h2>
          <p className={styles.code}>
            <span className={styles.keyword}>const</span> <span className={styles.variable}>softSkills</span> = <span className={styles.bracket}>[</span>
          </p>
        </Motion.div>

        <Motion.ul
          className={styles.grid}
          variants={listVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
        >
          {SOFT_SKILLS.map(({ id, icon, color, title, summary, inPractice, traits }, index) => {
            const isOpen = openId === id;
            return (
              <Motion.li key={id} className={styles.item} variants={cardVariants} layout>
                <Motion.button
                  type="button"
                  className={styles.card}
                  style={{ '--soft-color': color }}
                  onClick={() => setOpenId(isOpen ? null : id)}
                  aria-expanded={isOpen}
                  whileHover={{ y: -4 }}
                  whileTap={{ scale: 0.98 }}
                  layout
                >
                  <Motion.span
                    className={styles.glow}
                    aria-hidden="true"
                    animate={{ opacity: isOpen ? 0.9 : 0.35, scale: isOpen ? 1.15 : 1 }}
                    transition={{ duration: 0.4 }}
                  />
                  <span className={styles.cardHeader}>
                    <Motion.span
                      className={styles.iconWrap}
                      whileHover={{ rotate: [0, -12, 10, 0] }}
                      transition={{ duration: 0.5 }}
                    >
                      <Icon name={icon} size={22} color={color} />
                    </Motion.span>
                    <span className={styles.index}>{String(index).padStart(2, '0')}</span>
                  </span>
                  <span className={styles.title}>{t(title)}</span>
                  <span className={styles.summary}>{t(summary)}</span>

                  <span className={styles.traits}>
                    {traits.map((trait, traitIndex) => (
                      <Motion.span key={trait.en} className={styles.trait} custom={traitIndex} variants={traitVariants}>
                        {t(trait)}
                      </Motion.span>
                    ))}
                  </span>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <Motion.span
                        key="practice"
                        className={styles.practice}
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3, ease: 'easeOut' }}
                      >
                        <span className={styles.practiceLabel}>{t(SKILLS.SOFT_IN_PRACTICE)}</span>
                        {t(inPractice)}
                      </Motion.span>
                    )}
                  </AnimatePresence>

                  <span className={styles.toggle}>
                    {isOpen ? t(SKILLS.SOFT_COLLAPSE) : t(SKILLS.SOFT_EXPAND)}
                    <Motion.span animate={{ rotate: isOpen ? 180 : 0 }} className={styles.chevron}>
                      <Icon name="ChevronDown" size={14} />
                    </Motion.span>
                  </span>

                  <Motion.span
                    className={styles.underline}
                    aria-hidden="true"
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4 + index * 0.12, duration: 0.6, ease: 'easeOut' }}
                  />
                </Motion.button>
              </Motion.li>
            );
          })}
        </Motion.ul>

        <p className={`${styles.code} ${styles.closing}`}><span className={styles.bracket}>]</span>;</p>
      </div>
    </MotionConfig>
  );
}
