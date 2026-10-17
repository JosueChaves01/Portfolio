import { CURRENT_STACK, PROJECT_SIGNALS, WHITE_CITY } from '../../../../shared/data/recentWork';
import { useState, useEffect } from 'react';
import { useTabs } from '../../../../store/TabsContext';
import { useLanguage } from '../../../../store/LanguageContext';
import { FILE_IDS, RESUME_URL } from '../../../explorer/constants/explorer.constants';
import { Icon } from '../../../../shared/icons/Icon';
import { useTiltEffect } from '../hooks/useTiltEffect';
import styles from './HomeBentoGrid.module.css';

const TECH_STACK_ITEMS = CURRENT_STACK;

const METRICS = PROJECT_SIGNALS;

export function HomeBentoGrid() {
  const { openTab } = useTabs();
  const { t } = useLanguage();
  const [localTime, setLocalTime] = useState('');
  const [activeCommand, setActiveCommand] = useState(null);

  // Tilt effects for bento cards
  const card1Ref = useTiltEffect({ maxTilt: 6, scale: 1.01 });
  const card2Ref = useTiltEffect({ maxTilt: 6, scale: 1.01 });
  const card3Ref = useTiltEffect({ maxTilt: 6, scale: 1.01 });
  const card4Ref = useTiltEffect({ maxTilt: 6, scale: 1.01 });

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      // Costa Rica is UTC-6
      const options = { timeZone: 'America/Costa_Rica', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true };
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

  return (
    <section className={styles.bentoSection} aria-label="Highlights & Activity">
      <div className={styles.bentoGrid}>
        {/* CARD 1: LIVE PRESENCE & ACTIVITY */}
        <div className={`${styles.bentoCard} ${styles.cardPresence}`} ref={card1Ref}>
          <div className={styles.cardSpotlight} />
          
          <div className={styles.cardHeader}>
            <div className={styles.statusIndicator}>
              <span className={styles.pulseDot} />
              <span className={styles.statusText}>{t({ en: 'LATEST PROJECT', es: 'PROYECTO RECIENTE' })}</span>
            </div>
            <span className={styles.badgeLocation}>
              <Icon name="MapPin" size={12} /> Costa Rica (UTC-6)
            </span>
          </div>

          <div className={styles.presenceBody}>
            <h3 className={styles.presenceTitle}>
              White City Liberia
            </h3>
            <p className={styles.presenceSubtitle}>
              {t(WHITE_CITY.summary)}
            </p>

            <div className={styles.liveActivityBox}>
              <div className={styles.activityHeader}>
                <Icon name="GitCommit" size={14} color="#38bdf8" />
                <span className={styles.activityBranch}>main</span>
                <span className={styles.activityTime}>{localTime || 'San José, CR'}</span>
              </div>
              <div className={styles.activityCommit}>
                <code>git commit -m "Elevate architecture with modern 3D UI"</code>
              </div>
            </div>
          </div>
        </div>

        {/* CARD 2: TECH STACK ORBIT */}
        <div className={`${styles.bentoCard} ${styles.cardStack}`} ref={card2Ref}>
          <div className={styles.cardSpotlight} />
          
          <div className={styles.cardHeader}>
            <span className={styles.cardLabel}>
              <Icon name="Cpu" size={14} /> TECH RADAR
            </span>
            <span className={styles.cardHint}>{t({ en: 'Explore applied skills', es: 'Explora habilidades aplicadas' })}</span>
          </div>

          <p className={styles.stackDesc}>
            {t({ en: 'Tools used in White City Liberia:', es: 'Herramientas usadas en White City Liberia:' })}
          </p>

          <div className={styles.techPillsGrid}>
            {TECH_STACK_ITEMS.map(({ name, color, icon }) => (
              <button
                key={name}
                type="button"
                className={styles.techPill}
                style={{ '--pill-color': color }}
                onClick={() => openTab(FILE_IDS.SKILLS)}
                title={`Learn more about ${name}`}
              >
                <Icon name={icon} size={13} color={color} />
                <span>{name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* CARD 3: METRICS & IMPACT */}
        <div className={`${styles.bentoCard} ${styles.cardMetrics}`} ref={card3Ref}>
          <div className={styles.cardSpotlight} />

          <div className={styles.cardHeader}>
            <span className={styles.cardLabel}>
              <Icon name="Activity" size={14} /> {t({ en: 'PROJECT AT A GLANCE', es: 'EL PROYECTO EN DATOS' })}
            </span>
          </div>

          <div className={styles.metricsGrid}>
            {METRICS.map(({ value, label, icon, color }) => (
              <div key={value} className={styles.metricItem}>
                <div className={styles.metricIconBox} style={{ color }}>
                  <Icon name={icon} size={16} />
                </div>
                <div className={styles.metricContent}>
                  <span className={styles.metricValue} style={{ color }}>{value}</span>
                  <span className={styles.metricLabel}>{t(label)}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CARD 4: INTERACTIVE CLI COMMANDS */}
        <div className={`${styles.bentoCard} ${styles.cardCli}`} ref={card4Ref}>
          <div className={styles.cardSpotlight} />

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
              onClick={() => handleCommandRun('projects', FILE_IDS.PROJECTS)}
            >
              <span className={styles.chipPrefix}>$</span>
              <span className={styles.chipText}>npx view-projects</span>
              <Icon name="ArrowRight" size={12} className={styles.chipArrow} />
            </button>

            <button
              type="button"
              className={`${styles.cliChip} ${activeCommand === 'about' ? styles.chipExecuting : ''}`}
              onClick={() => handleCommandRun('about', FILE_IDS.ABOUT)}
            >
              <span className={styles.chipPrefix}>$</span>
              <span className={styles.chipText}>cat about.html</span>
              <Icon name="ArrowRight" size={12} className={styles.chipArrow} />
            </button>

            <button
              type="button"
              className={`${styles.cliChip} ${activeCommand === 'contact' ? styles.chipExecuting : ''}`}
              onClick={() => handleCommandRun('contact', FILE_IDS.CONTACT)}
            >
              <span className={styles.chipPrefix}>$</span>
              <span className={styles.chipText}>ping contact.css</span>
              <Icon name="ArrowRight" size={12} className={styles.chipArrow} />
            </button>

            <button
              type="button"
              className={`${styles.cliChip} ${activeCommand === 'resume' ? styles.chipExecuting : ''}`}
              onClick={() => handleCommandRun('resume', null, true)}
            >
              <span className={styles.chipPrefix}>$</span>
              <span className={styles.chipText}>curl -O resume.pdf</span>
              <Icon name="Download" size={12} className={styles.chipArrow} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

