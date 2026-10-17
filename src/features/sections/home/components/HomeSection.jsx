import { motion as Motion, useReducedMotion } from 'framer-motion';
import { useTabs } from '../../../../store/TabsContext';
import { useLanguage } from '../../../../store/LanguageContext';
import { Icon } from '../../../../shared/icons/Icon';
import { HOME, ROLE_BADGES, ACTION_BUTTONS } from '../constants/home.constants';
import { TypewriterText } from './TypewriterText';
import { RoleBadge } from './RoleBadge';
import { HomeCardDeck } from './HomeCardDeck';
import { SocialLinks } from './SocialLinks';
import { Button } from '../../../../shared/components/Button/Button';
import { useHomeCardScroll } from '../hooks/useHomeCardScroll';
import styles from './HomeSection.module.css';

const introVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.09, delayChildren: 0.05 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 22, filter: 'blur(6px)' },
  visible: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { type: 'spring', stiffness: 160, damping: 20 } },
};

const nameVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.045 } },
};

const letterVariants = {
  hidden: { opacity: 0, y: '70%', rotateX: -70 },
  visible: { opacity: 1, y: '0%', rotateX: 0, transition: { type: 'spring', stiffness: 260, damping: 18 } },
};

const actionsVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

const popVariants = {
  hidden: { opacity: 0, y: 12, scale: 0.95 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { type: 'spring', stiffness: 300, damping: 22 } },
};

const SPATIAL_BADGES = [
  { icon: 'Globe', color: '#facc15', label: { en: 'Live demos on Vercel', es: 'Demos en vivo en Vercel' } },
  { icon: 'Layers', color: '#38bdf8', label: { en: 'Web, APIs & data', es: 'Web, APIs y datos' } },
  { icon: 'Sparkles', color: '#c084fc', label: { en: 'AI-assisted development', es: 'Desarrollo con IA' } },
];

function AnimatedName({ text, className }) {
  return (
    <Motion.h1 className={className} data-text={text} aria-label={text} variants={nameVariants}>
      {[...text].map((letter, index) => (
        <Motion.span key={`${letter}-${index}`} className={styles.nameLetter} variants={letterVariants} aria-hidden="true">
          {letter}
        </Motion.span>
      ))}
    </Motion.h1>
  );
}

export function HomeSection() {
  const { openTab } = useTabs();
  const { t } = useLanguage();
  const reduceMotion = useReducedMotion();

  const {
    activeCardIndex,
    isScrollDriven,
    goToCard,
    nextCard,
    prevCard,
    trackRef,
    totalCards,
  } = useHomeCardScroll({ totalCards: 5 });

  return (
    <div className={styles.scrollTrack} ref={trackRef} data-scroll-driven={isScrollDriven}>
      <section className={styles.stickyStage} data-home-stage>
        <div className={styles.heroSplit}>
          {/* Left Column: Static Hero Content & Personal Information */}
          <Motion.div className={styles.heroIntro} variants={introVariants} initial={reduceMotion ? false : 'hidden'} animate="visible">
            {/* Status Pill with Pulsing Dot */}
            <Motion.div className={styles.statusPill} variants={itemVariants}>
              <span className={styles.statusDot} />
              <span>{t(HOME.STATUS)}</span>
            </Motion.div>

            <Motion.p className={styles.headerComment} variants={itemVariants}>
              {t(HOME.HEADER_COMMENT)}
            </Motion.p>

            <Motion.div className={styles.nameBlock} variants={nameVariants}>
              <AnimatedName text={HOME.NAME_FIRST} className={styles.nameFirst} />
              <AnimatedName text={HOME.NAME_LAST} className={styles.nameLast} />
            </Motion.div>

            <Motion.div className={styles.badges} variants={actionsVariants}>
              {ROLE_BADGES.map(({ id, label, dotColor }) => (
                <Motion.span key={id} className={styles.badgeMotion} variants={popVariants} whileHover={{ y: -3 }}>
                  <RoleBadge label={t(label)} dotColor={dotColor} />
                </Motion.span>
              ))}
            </Motion.div>

            <Motion.div className={styles.terminalPromptWrap} variants={itemVariants}>
              <span className={styles.terminalPromptIcon}>$&gt;</span>
              <TypewriterText />
            </Motion.div>

            <Motion.p className={styles.bio} variants={itemVariants}>
              {t(HOME.BIO)
                .split(new RegExp(`(${HOME.BIO_KEYWORDS.join('|')})`, 'gi'))
                .map((part, i) => HOME.BIO_KEYWORDS.some((keyword) => keyword.toLowerCase() === part.toLowerCase())
                  ? <strong key={`bio-part-${i}`} className={styles.highlight}>{part}</strong>
                  : part)}
            </Motion.p>

            {/* Spatial Micro-Badges */}
            <Motion.div className={styles.floatingBadges} variants={actionsVariants}>
              {SPATIAL_BADGES.map(({ icon, color, label }, index) => (
                <Motion.span key={label.en} className={styles.badgeMotion} variants={popVariants} whileHover={{ y: -3, scale: 1.04 }}>
                  <Motion.span
                    className={styles.spatialBadge}
                    animate={reduceMotion ? undefined : { y: [0, -3, 0] }}
                    transition={{ duration: 3.2, repeat: Infinity, ease: 'easeInOut', delay: 1 + index * 0.4 }}
                  >
                    <Icon name={icon} size={13} color={color} /> {t(label)}
                  </Motion.span>
                </Motion.span>
              ))}
            </Motion.div>

            {/* Calls to action and social links, always reachable */}
            <Motion.div className={styles.actions} variants={actionsVariants}>
              {ACTION_BUTTONS.map(({ id, icon, label, variant, targetTab }) => (
                <Motion.span key={id} variants={popVariants} whileHover={{ y: -2 }} whileTap={{ scale: 0.96 }}>
                  <Button variant={variant} onClick={() => openTab(targetTab)}>
                    <Icon name={icon} size={14} /> {t(label)}
                  </Button>
                </Motion.span>
              ))}
            </Motion.div>

            <Motion.div className={styles.socialWrapper} variants={itemVariants}>
              <SocialLinks />
            </Motion.div>
          </Motion.div>

          {/* Right Column: Interactive Sequential Card Stream */}
          <Motion.div
            className={styles.heroDeckCol}
            initial={reduceMotion ? false : { opacity: 0, x: 40, rotateY: -8 }}
            animate={{ opacity: 1, x: 0, rotateY: 0 }}
            transition={{ type: 'spring', stiffness: 120, damping: 20, delay: 0.35 }}
          >
            <HomeCardDeck
              activeCardIndex={activeCardIndex}
              onNext={nextCard}
              onPrev={prevCard}
              onGoTo={goToCard}
              totalCards={totalCards}
              isScrollDriven={isScrollDriven}
            />
          </Motion.div>
        </div>
      </section>
    </div>
  );
}
