import { CURRENT_STACK } from '../../../../shared/data/recentWork';
import { useState, useEffect } from 'react';
import { AnimatePresence, motion as Motion, useReducedMotion } from 'framer-motion';
import { PROJECTS_DATA, PROJECT_CATEGORIES } from '../../projects/mocks/projects.mock';
import { useTabs } from '../../../../store/TabsContext';
import { useLanguage } from '../../../../store/LanguageContext';
import { FILE_IDS, RESUME_URL } from '../../../explorer/constants/explorer.constants';
import { Icon } from '../../../../shared/icons/Icon';
import { HeroCodeCard } from './HeroCodeCard';
import styles from './HomeCardDeck.module.css';

const CARD_LABELS = ['Hero Code', 'Live Presence', 'Tech Radar', 'Metrics', 'Quick CLI'];

const TECH_STACK_ITEMS = CURRENT_STACK;

const SPOTLIGHT_INTERVAL = 4500;

const DECK_SPRING = { type: 'spring', stiffness: 170, damping: 24, mass: 0.9 };

const DECK_STATES = {
  passed: { opacity: 0, y: -36, x: -24, scale: 0.94, rotate: -2.5, filter: 'blur(2px)' },
  queue: [
    { opacity: 1, y: 0, x: 0, scale: 1, rotate: 0, filter: 'blur(0px)' },
    { opacity: 0.55, y: 22, x: 0, scale: 0.95, rotate: 0, filter: 'blur(0px)' },
    { opacity: 0.25, y: 42, x: 0, scale: 0.9, rotate: 0, filter: 'blur(1px)' },
    { opacity: 0, y: 56, x: 0, scale: 0.86, rotate: 0, filter: 'blur(2px)' },
  ],
};

const METRICS = [
  { value: String(PROJECTS_DATA.length), label: { en: 'PROJECTS', es: 'PROYECTOS' }, icon: 'FolderGit2', color: '#38bdf8' },
  { value: String(PROJECTS_DATA.filter(({ live }) => live).length), label: { en: 'LIVE DEMOS', es: 'DEMOS EN VIVO' }, icon: 'Globe', color: '#facc15' },
  { value: String(new Set(PROJECTS_DATA.flatMap(({ tags }) => tags)).size), label: { en: 'TECHNOLOGIES', es: 'TECNOLOGÍAS' }, icon: 'Layers', color: '#c084fc' },
  { value: String(PROJECT_CATEGORIES.length), label: { en: 'AREAS', es: 'ÁREAS' }, icon: 'LayoutGrid', color: '#4ade80' },
];

export function HomeCardDeck({
  activeCardIndex = 0,
  onNext,
  onPrev,
  onGoTo,
  totalCards = 5,
  isScrollDriven = false,
}) {
  const { openTab } = useTabs();
  const { t } = useLanguage();
  const [localTime, setLocalTime] = useState('');
  const [activeCommand, setActiveCommand] = useState(null);
  const [spotlightIndex, setSpotlightIndex] = useState(0);
  const spotlight = PROJECTS_DATA[spotlightIndex];

  // Cycle through every project so no single one is presented as the headline.
  useEffect(() => {
    const interval = setInterval(() => setSpotlightIndex((index) => (index + 1) % PROJECTS_DATA.length), SPOTLIGHT_INTERVAL);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const options = {
        timeZone: 'America/Costa_Rica',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true,
      };
      setLocalTime(new Intl.DateTimeFormat('en-US', options).format(now));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleCommandRun = (cmd, targetTab, isDownload = false) => {
    setActiveCommand(cmd);
    setTimeout(() => {
      setActiveCommand(null);
      if (isDownload) {
        const link = document.createElement('a');
        link.href = RESUME_URL;
        link.download = 'Josue_Chaves_Resume.pdf';
        link.click();
      } else if (targetTab) {
        openTab(targetTab);
      }
    }, 450);
  };

  const reduceMotion = useReducedMotion();

  // Stacked deck: the active card sits in front, the next two peek behind it and
  // cards already visited lift away. Positions are relative to the active card,
  // so the stack never depends on fixed pixel offsets or card heights.
  const getDeckState = (cardIndex) => {
    const offset = cardIndex - activeCardIndex;
    if (offset < 0) return { ...DECK_STATES.passed, zIndex: 0 };
    const state = DECK_STATES.queue[Math.min(offset, DECK_STATES.queue.length - 1)];
    return { ...state, zIndex: totalCards - offset };
  };

  const renderSlot = (cardIndex, content) => {
    const isActive = cardIndex === activeCardIndex;
    if (!isScrollDriven) {
      return (
        <Motion.div
          key={cardIndex}
          className={styles.flowCardSlot}
          data-home-card-index={cardIndex}
          initial={reduceMotion ? false : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ type: 'spring', stiffness: 180, damping: 24 }}
        >
          {content}
        </Motion.div>
      );
    }
    const { zIndex, ...target } = getDeckState(cardIndex);
    return (
      <Motion.div
        key={cardIndex}
        className={styles.stageCardSlot}
        data-home-card-index={cardIndex}
        style={{ zIndex, pointerEvents: isActive ? 'auto' : 'none' }}
        aria-hidden={!isActive}
        inert={!isActive}
        initial={false}
        animate={target}
        transition={reduceMotion ? { duration: 0 } : DECK_SPRING}
      >
        {content}
      </Motion.div>
    );
  };

  return (
    <div className={`${styles.deckContainer} ${!isScrollDriven ? styles.deckInFlow : ''}`} aria-label="Interactive Card Stream">
      {/* Control Bar / Stepper Pill */}
      <div className={styles.deckControlBar} data-home-card-controls>
        <div className={styles.deckStepperPill}>
          <button
            type="button"
            className={styles.stepperArrow}
            onClick={onPrev}
            onMouseDown={(event) => event.preventDefault()}
            disabled={activeCardIndex === 0}
            aria-label="Previous card"
          >
            <Icon name="ChevronLeft" size={14} />
          </button>

          <div className={styles.stepperDots}>
            {CARD_LABELS.map((name, i) => (
              <button
                key={name}
                type="button"
                className={`${styles.stepperDot} ${i === activeCardIndex ? styles.dotActive : ''}`}
                onClick={() => onGoTo?.(i)}
                title={`Card ${i + 1}: ${name}`}
                aria-label={`Go to Card ${i + 1}: ${name}`}
                aria-current={i === activeCardIndex ? 'step' : undefined}
              >
                <span className={styles.dotNumber}>{i + 1}</span>
                <span className={styles.dotLabel}>{name}</span>
              </button>
            ))}
          </div>

          <button
            type="button"
            className={styles.stepperArrow}
            onClick={onNext}
            onMouseDown={(event) => event.preventDefault()}
            disabled={activeCardIndex >= totalCards - 1}
            aria-label="Next card"
          >
            <Icon name="ChevronRight" size={14} />
          </button>
        </div>

        <span className={styles.cardCounter}>
          {activeCardIndex + 1} / {totalCards}
        </span>
      </div>

      {/* Stacked deck (scroll-driven) or a plain list of cards (in-flow layouts) */}
      <div className={isScrollDriven ? styles.deckUnifiedStage : styles.deckFlowList}>
        {/* CARD 0: Hero Code Card */}
        {renderSlot(0, (
          <HeroCodeCard />
        ))}

        {/* CARD 1: Project spotlight */}
        {renderSlot(1, (
          <div className={styles.bentoContentCard}>
            <div className={styles.cardHeader}>
              <div className={styles.statusIndicator}>
                <span className={styles.pulseDot} />
                <span className={styles.statusText}>{t({ en: 'PROJECT SPOTLIGHT', es: 'PROYECTOS EN ROTACIÓN' })}</span>
              </div>
              <span className={styles.badgeLocation}>
                <Icon name="MapPin" size={12} /> Costa Rica (UTC-6)
              </span>
            </div>

            <AnimatePresence mode="wait">
              <Motion.div
                key={spotlight.id}
                role="link"
                tabIndex={0}
                className={styles.presenceBody}
                onClick={() => openTab(FILE_IDS.PROJECTS)}
                onKeyDown={(event) => { if (event.key === 'Enter') openTab(FILE_IDS.PROJECTS); }}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                style={{ cursor: 'pointer' }}
              >
                <h3 className={styles.presenceTitle}>{spotlight.title}</h3>
                <p className={styles.presenceSubtitle}>{t(spotlight.description)}</p>

                <div className={styles.liveActivityBox}>
                  <div className={styles.activityHeader}>
                    <Icon name={spotlight.icon} size={14} color={spotlight.color} />
                    <span className={styles.activityBranch}>{spotlightIndex + 1}/{PROJECTS_DATA.length}</span>
                    <span className={styles.activityTime}>{localTime || 'San José, CR'}</span>
                  </div>
                  <div className={styles.activityCommit}>
                    <code>{spotlight.tags.slice(0, 4).join(' · ')}</code>
                  </div>
                </div>

                {spotlight.details?.decisions?.[0] && (
                  <p className={styles.spotlightDecision}>
                    <span>{t({ en: 'Key decision', es: 'Decisión clave' })}</span>
                    {t(spotlight.details.decisions[0])}
                  </p>
                )}

                <div className={styles.spotlightFooter}>
                  <span className={styles.spotlightProgress} aria-hidden="true">
                    <Motion.span
                      key={spotlight.id}
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      transition={{ duration: SPOTLIGHT_INTERVAL / 1000, ease: 'linear' }}
                    />
                  </span>
                  <span className={styles.spotlightLink}>
                    {t({ en: 'View all projects', es: 'Ver todos los proyectos' })} <Icon name="ArrowRight" size={12} />
                  </span>
                </div>
              </Motion.div>
            </AnimatePresence>
          </div>
        ))}

        {/* CARD 2: Tech Radar */}
        {renderSlot(2, (
          <div className={styles.bentoContentCard}>
            <div className={styles.cardHeader}>
              <span className={styles.cardLabel}>
                <Icon name="Cpu" size={14} /> TECH RADAR
              </span>
              <span className={styles.cardHint}>{t({ en: 'Explore applied skills', es: 'Explora habilidades aplicadas' })}</span>
            </div>

            <p className={styles.stackDesc}>
              {t({ en: 'Tools I use across my projects:', es: 'Herramientas que uso en mis proyectos:' })}
            </p>

            <div className={styles.techPillsGrid}>
              {TECH_STACK_ITEMS.map(({ name, color, icon }) => (
                <button
                  key={name}
                  type="button"
                  className={styles.techPill}
                  style={{ '--pill-color': color }}
                  onClick={(e) => {
                    e.stopPropagation();
                    openTab(FILE_IDS.SKILLS);
                  }}
                  title={`Learn more about ${name}`}
                >
                  <Icon name={icon} size={13} color={color} />
                  <span>{name}</span>
                </button>
              ))}
            </div>
          </div>
        ))}

        {/* CARD 3: Portfolio metrics */}
        {renderSlot(3, (
          <div className={styles.bentoContentCard}>
            <div className={styles.cardHeader}>
              <span className={styles.cardLabel}>
                <Icon name="Activity" size={14} /> {t({ en: 'PORTFOLIO AT A GLANCE', es: 'EL PORTAFOLIO EN DATOS' })}
              </span>
            </div>

            <div className={styles.metricsGrid}>
              {METRICS.map(({ value, label, icon, color }) => (
                <div key={label.en} className={styles.metricItem}>
                  <div className={styles.metricIconBox} style={{ color }}>
                    <Icon name={icon} size={16} />
                  </div>
                  <div className={styles.metricContent}>
                    <span className={styles.metricValue} style={{ color }}>
                      {value}
                    </span>
                    <span className={styles.metricLabel}>{t(label)}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}

        {/* CARD 4: Quick CLI Commands */}
        {renderSlot(4, (
          <div className={styles.bentoContentCard}>
            <div className={styles.cardHeader}>
              <span className={styles.cardLabel}>
                <Icon name="Terminal" size={14} /> QUICK COMMANDS
              </span>
              <span className={styles.cliPrompt}>~/portfolio $</span>
            </div>

            <p className={styles.cliDesc}>
              Execute rapid actions directly via simulated terminal chips:
            </p>

            <div className={styles.commandChipsList}>
              <button
                type="button"
                className={`${styles.cliChip} ${activeCommand === 'projects' ? styles.chipExecuting : ''}`}
                onClick={(e) => {
                  e.stopPropagation();
                  handleCommandRun('projects', FILE_IDS.PROJECTS);
                }}
              >
                <span className={styles.chipPrefix}>$</span>
                <span className={styles.chipText}>npx view-projects</span>
                <Icon name="ArrowRight" size={12} className={styles.chipArrow} />
              </button>

              <button
                type="button"
                className={`${styles.cliChip} ${activeCommand === 'about' ? styles.chipExecuting : ''}`}
                onClick={(e) => {
                  e.stopPropagation();
                  handleCommandRun('about', FILE_IDS.ABOUT);
                }}
              >
                <span className={styles.chipPrefix}>$</span>
                <span className={styles.chipText}>cat about.html</span>
                <Icon name="ArrowRight" size={12} className={styles.chipArrow} />
              </button>

              <button
                type="button"
                className={`${styles.cliChip} ${activeCommand === 'contact' ? styles.chipExecuting : ''}`}
                onClick={(e) => {
                  e.stopPropagation();
                  handleCommandRun('contact', FILE_IDS.CONTACT);
                }}
              >
                <span className={styles.chipPrefix}>$</span>
                <span className={styles.chipText}>ping contact.css</span>
                <Icon name="ArrowRight" size={12} className={styles.chipArrow} />
              </button>

              <button
                type="button"
                className={`${styles.cliChip} ${activeCommand === 'resume' ? styles.chipExecuting : ''}`}
                onClick={(e) => {
                  e.stopPropagation();
                  handleCommandRun('resume', null, true);
                }}
              >
                <span className={styles.chipPrefix}>$</span>
                <span className={styles.chipText}>curl -O resume.pdf</span>
                <Icon name="Download" size={12} className={styles.chipArrow} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

