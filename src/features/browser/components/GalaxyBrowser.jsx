import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { AnimatePresence, motion as Motion, useReducedMotion } from 'framer-motion';
import { useLanguage } from '../../../store/LanguageContext';
import { useTabs } from '../../../store/TabsContext';
import { Icon } from '../../../shared/icons/Icon';
import { FILE_IDS } from '../../explorer/constants/explorer.constants';
import { GALAXY_TEXT } from '../constants/galaxy.constants';
import { BROWSER_TEXT, BROWSER_WINDOWS, TRAVEL_DURATION_MS } from '../constants/browser.constants';
import { buildSkillsUniverse } from '../universes/skillsUniverse';
import { buildProjectsUniverse } from '../universes/projectsUniverse';
import { GalaxyView } from './galaxy/GalaxyView';
import { BlackHoleTransition } from './BlackHoleTransition';
import styles from './GalaxyBrowser.module.css';

const WINDOWS = [
  { id: BROWSER_WINDOWS.SKILLS, icon: 'Sparkles', label: BROWSER_TEXT.WINDOW_SKILLS, section: FILE_IDS.SKILLS },
  { id: BROWSER_WINDOWS.PROJECTS, icon: 'FolderGit2', label: BROWSER_TEXT.WINDOW_PROJECTS, section: FILE_IDS.PROJECTS },
];

function supportsWebGL() {
  try {
    const canvas = document.createElement('canvas');
    return Boolean(canvas.getContext('webgl2') || canvas.getContext('webgl'));
  } catch {
    return false;
  }
}

/** A tab that hosts the 3D galaxies as browser windows; black holes jump between them. */
export function GalaxyBrowser() {
  const { t } = useLanguage();
  const { browserWindow, setBrowserWindow, openTab } = useTabs();
  const reducedMotion = useReducedMotion();
  const [hasWebGL] = useState(supportsWebGL);
  const [travelTarget, setTravelTarget] = useState(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const rootRef = useRef(null);
  const timersRef = useRef([]);

  const universes = useMemo(() => ({
    [BROWSER_WINDOWS.SKILLS]: buildSkillsUniverse(t),
    [BROWSER_WINDOWS.PROJECTS]: buildProjectsUniverse(t),
  }), [t]);

  const activeWindow = universes[browserWindow] ? browserWindow : BROWSER_WINDOWS.SKILLS;
  const universe = universes[activeWindow];

  useEffect(() => () => timersRef.current.forEach(clearTimeout), []);

  // Travel = black hole overlay closes in, the window swaps while the screen is dark, then it opens again.
  const travelTo = useCallback((target) => {
    if (!target || target === activeWindow || travelTarget) return;
    if (reducedMotion) {
      setBrowserWindow(target);
      return;
    }
    setTravelTarget(target);
    timersRef.current.push(
      setTimeout(() => setBrowserWindow(target), TRAVEL_DURATION_MS / 2),
      setTimeout(() => setTravelTarget(null), TRAVEL_DURATION_MS),
    );
  }, [activeWindow, travelTarget, reducedMotion, setBrowserWindow]);

  // Fullscreen covers the whole browser (window tabs included).
  const canUseNativeFullscreen = typeof document !== 'undefined' && document.fullscreenEnabled;

  useEffect(() => {
    const onChange = () => setIsFullscreen(document.fullscreenElement === rootRef.current);
    document.addEventListener('fullscreenchange', onChange);
    return () => document.removeEventListener('fullscreenchange', onChange);
  }, []);

  useEffect(() => {
    if (!isFullscreen || canUseNativeFullscreen) return undefined;
    const onKeyDown = (event) => { if (event.key === 'Escape') setIsFullscreen(false); };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [isFullscreen, canUseNativeFullscreen]);

  const toggleFullscreen = () => {
    if (isFullscreen && !document.fullscreenElement) {
      setIsFullscreen(false);
      return;
    }
    if (!canUseNativeFullscreen) {
      setIsFullscreen((value) => !value);
      return;
    }
    if (document.fullscreenElement) document.exitFullscreen();
    else rootRef.current?.requestFullscreen().catch(() => setIsFullscreen(true));
  };

  const fullscreenButton = (
    <button type="button" className={styles.chromeButton} onClick={toggleFullscreen} aria-pressed={isFullscreen}>
      <Icon name={isFullscreen ? 'Minimize2' : 'Maximize2'} size={13} />
      <span className={styles.chromeLabel}>{t(isFullscreen ? GALAXY_TEXT.EXIT_FULLSCREEN : GALAXY_TEXT.FULLSCREEN)}</span>
    </button>
  );

  return (
    <section ref={rootRef} className={`${styles.browser} ${isFullscreen ? styles.browserFullscreen : ''}`} aria-label={t(BROWSER_TEXT.TITLE)}>
      <div className={styles.chrome}>
        <span className={styles.dots} aria-hidden="true"><i /><i /><i /></span>
        <div className={styles.windowTabs} role="tablist">
          {WINDOWS.map(({ id, icon, label }) => (
            <button
              key={id}
              type="button"
              role="tab"
              aria-selected={activeWindow === id}
              className={`${styles.windowTab} ${activeWindow === id ? styles.windowTabActive : ''}`}
              onClick={() => travelTo(id)}
            >
              <Icon name={icon} size={13} />
              <span>{t(label)}</span>
              {activeWindow === id && <Motion.span layoutId="browser-window-indicator" className={styles.windowIndicator} />}
            </button>
          ))}
        </div>
        <span className={styles.address}>
          <Icon name="Orbit" size={12} /> galaxy://{activeWindow}
        </span>
      </div>

      <div className={styles.body}>
        {hasWebGL ? (
          <GalaxyView
            key={activeWindow}
            universe={universe}
            onPortal={travelTo}
            onOpenProject={() => openTab(FILE_IDS.PROJECTS)}
            toolbarExtra={fullscreenButton}
          />
        ) : (
          <div className={styles.fallback}>
            <Icon name="MonitorX" size={28} />
            <p>{t(BROWSER_TEXT.NO_WEBGL)}</p>
            <button type="button" onClick={() => openTab(WINDOWS.find(({ id }) => id === activeWindow).section)}>
              {t(BROWSER_TEXT.OPEN_SECTION)}
            </button>
          </div>
        )}

        <AnimatePresence>
          {travelTarget && <BlackHoleTransition key="travel" label={t(BROWSER_TEXT.TRAVELING)} />}
        </AnimatePresence>
      </div>
    </section>
  );
}
