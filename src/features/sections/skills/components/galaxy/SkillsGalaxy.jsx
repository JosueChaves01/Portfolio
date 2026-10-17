import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { AnimatePresence, motion as Motion, useReducedMotion } from 'framer-motion';
import { Vector3 } from 'three';
import { useLanguage } from '../../../../../store/LanguageContext';
import { Icon } from '../../../../../shared/icons/Icon';
import { SKILLS_CATEGORIES } from '../../mocks/skills.mock';
import { SOFT_SKILLS } from '../../mocks/softSkills.mock';
import { CAMERA_FOV, CAMERA_HOME, GALAXY_TEXT, SOFT_SYSTEM_COLOR, SOFT_SYSTEM_ID, SYSTEM_POSITIONS } from '../../constants/galaxy.constants';
import { FlyControls } from './FlyControls';
import { GalaxyScene } from './GalaxyScene';
import styles from './SkillsGalaxy.module.css';

const SYSTEM_VIEW_OFFSET = new Vector3(0, 9, 26);
const PLANET_VIEW_DISTANCE = 9;
const PAD_ACTIONS = [
  { action: 'up', icon: 'ChevronsUp', label: GALAXY_TEXT.PAD_UP },
  { action: 'forward', icon: 'ArrowUp', label: GALAXY_TEXT.PAD_FORWARD },
  { action: 'back', icon: 'ArrowDown', label: GALAXY_TEXT.PAD_BACK },
  { action: 'down', icon: 'ChevronsDown', label: GALAXY_TEXT.PAD_DOWN },
];

function useGalaxySystems(t) {
  return useMemo(() => {
    const resolve = (value) => (typeof value === 'string' ? value : t(value));
    const soft = {
      id: SOFT_SYSTEM_ID, kind: 'soft', color: SOFT_SYSTEM_COLOR, title: t(GALAXY_TEXT.SOFT_SYSTEM),
      planets: SOFT_SKILLS.map((skill) => ({
        id: `soft-${skill.id}`, kind: 'soft', name: t(skill.title), icon: skill.icon, color: skill.color,
        summary: t(skill.summary), concepts: skill.traits.map(resolve), inPractice: t(skill.inPractice),
      })),
    };
    const technical = SKILLS_CATEGORIES.map((category) => ({
      id: category.id, kind: 'technical', color: category.orbitColor, title: t(category.title),
      planets: category.skills.map((skill, index) => ({
        id: `${category.id}-${index}`, kind: 'technical', name: resolve(skill.name), icon: skill.icon, color: skill.color,
        summary: t(skill.summary), concepts: skill.concepts.map(resolve), evidence: t(skill.evidence),
      })),
    }));
    return [soft, ...technical].map((system) => {
      const position = SYSTEM_POSITIONS[system.id] || [0, 0, 0];
      return { ...system, position, vector: new Vector3(...position), planets: system.planets.map((planet) => ({ ...planet, systemTitle: system.title })) };
    });
  }, [t]);
}

export default function SkillsGalaxy() {
  const { t } = useLanguage();
  const systems = useGalaxySystems(t);
  const reducedMotion = useReducedMotion();
  const [selected, setSelected] = useState(null);
  const [engaged, setEngaged] = useState(false);
  const engagedRef = useRef(false);
  const inputRef = useRef(new Set());
  const flyTargetRef = useRef(null);
  const frameRef = useRef(null);
  const cockpitRef = useRef(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const isTouch = useMemo(() => typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches, []);

  const setEngagedState = useCallback((value) => {
    engagedRef.current = value;
    setEngaged(value);
    if (!value) inputRef.current.clear();
  }, []);

  const engage = useCallback(() => setEngagedState(true), [setEngagedState]);

  useEffect(() => {
    const onKeyDown = (event) => { if (event.key === 'Escape') setEngagedState(false); };
    const onPointerDown = (event) => { if (frameRef.current && !frameRef.current.contains(event.target)) setEngagedState(false); };
    window.addEventListener('keydown', onKeyDown);
    window.addEventListener('pointerdown', onPointerDown);
    return () => {
      window.removeEventListener('keydown', onKeyDown);
      window.removeEventListener('pointerdown', onPointerDown);
    };
  }, [setEngagedState]);

  // Telemetry is written straight to the DOM so the 3D scene never re-renders for it.
  const coordsRef = useRef(null);
  const nearestRef = useRef(null);
  const nearestLabel = t(GALAXY_TEXT.NEAREST);
  const updateTelemetry = useCallback(({ coords, nearest }) => {
    if (coordsRef.current) coordsRef.current.textContent = coords;
    if (nearestRef.current) nearestRef.current.textContent = nearest ? `${nearestLabel}: ${nearest}` : '';
  }, [nearestLabel]);

  const flyTo = (position, lookAt) => {
    flyTargetRef.current = { position: position.clone(), lookAt: lookAt.clone() };
  };

  const warpToSystem = (system) => {
    setSelected(null);
    flyTo(system.vector.clone().add(SYSTEM_VIEW_OFFSET), system.vector);
  };

  const selectPlanet = (planet, mesh) => {
    const planetPosition = new Vector3();
    mesh.getWorldPosition(planetPosition);
    const system = systems.find(({ planets }) => planets.some(({ id }) => id === planet.id));
    const outward = planetPosition.clone().sub(system.vector).normalize();
    const viewPoint = planetPosition.clone().addScaledVector(outward, PLANET_VIEW_DISTANCE).add(new Vector3(0, 1.6, 0));
    setSelected(planet);
    flyTo(viewPoint, planetPosition);
  };

  const resetView = () => {
    setSelected(null);
    flyTo(new Vector3(...CAMERA_HOME.position), new Vector3(...CAMERA_HOME.lookAt));
  };

  const pressPad = (action, pressed) => {
    if (pressed) {
      flyTargetRef.current = null;
      inputRef.current.add(action);
    } else {
      inputRef.current.delete(action);
    }
  };

  // Native fullscreen where available; otherwise (e.g. iOS Safari) expand the map over the page.
  const canUseNativeFullscreen = typeof document !== 'undefined' && document.fullscreenEnabled;

  useEffect(() => {
    const onChange = () => setIsFullscreen(document.fullscreenElement === cockpitRef.current);
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
    else cockpitRef.current?.requestFullscreen().catch(() => setIsFullscreen(true));
  };

  const totalPlanets = systems.reduce((sum, { planets }) => sum + planets.length, 0);

  return (
    <div ref={cockpitRef} className={`${styles.cockpit} ${isFullscreen ? styles.cockpitFullscreen : ''}`}>
      <div className={styles.toolbar}>
        <span className={styles.fileTab}><Icon name="Orbit" size={13} /> {GALAXY_TEXT.FILE_NAME}</span>
        <span className={styles.toolbarTitle}>{t(GALAXY_TEXT.TITLE)} <span className={styles.muted}>// {systems.length} · {totalPlanets} {t(GALAXY_TEXT.PLANETS)}</span></span>
        <button type="button" className={styles.toolbarButton} onClick={resetView}>
          <Icon name="LocateFixed" size={13} /> <span className={styles.toolbarLabel}>{t(GALAXY_TEXT.RESET)}</span>
        </button>
        <button
          type="button"
          className={styles.toolbarButton}
          onClick={toggleFullscreen}
          aria-pressed={isFullscreen}
          title={t(isFullscreen ? GALAXY_TEXT.EXIT_FULLSCREEN : GALAXY_TEXT.FULLSCREEN)}
        >
          <Icon name={isFullscreen ? 'Minimize2' : 'Maximize2'} size={13} />
          <span className={styles.toolbarLabel}>{t(isFullscreen ? GALAXY_TEXT.EXIT_FULLSCREEN : GALAXY_TEXT.FULLSCREEN)}</span>
        </button>
      </div>

      <div ref={frameRef} className={`${styles.viewport} ${engaged ? styles.viewportEngaged : ''}`}>
        <Canvas camera={{ position: CAMERA_HOME.position, fov: CAMERA_FOV, near: 0.1, far: 600 }} dpr={[1, 2]} gl={{ antialias: true }}>
          <FlyControls
            engagedRef={engagedRef}
            inputRef={inputRef}
            flyTargetRef={flyTargetRef}
            systems={systems}
            onTelemetry={updateTelemetry}
            onEngage={engage}
            reducedMotion={reducedMotion}
          />
          <GalaxyScene systems={systems} paused={Boolean(selected) || reducedMotion} selectedId={selected?.id} onSelect={selectPlanet} onSelectSystem={warpToSystem} />
        </Canvas>

        <div className={styles.reticle} aria-hidden="true">+</div>

        <div className={styles.hudTop}>
          <span className={`${styles.engageHint} ${engaged ? styles.engageHintActive : ''}`}>
            <span className={styles.pulseDot} />
            {t(engaged ? GALAXY_TEXT.ENGAGED : GALAXY_TEXT.ENGAGE)}
          </span>
          <span className={styles.telemetry}>
            <span ref={coordsRef} />
            <span ref={nearestRef} className={styles.muted} />
          </span>
        </div>

        <Motion.nav className={styles.systemList} aria-label={t(GALAXY_TEXT.SYSTEMS)} initial="hidden" animate="visible" variants={{ visible: { transition: { staggerChildren: 0.06 } } }}>
          <span className={styles.panelTitle}>{t(GALAXY_TEXT.SYSTEMS)}</span>
          {systems.map((system) => (
            <Motion.button
              key={system.id}
              type="button"
              className={styles.systemButton}
              style={{ '--system-color': system.color }}
              onClick={() => warpToSystem(system)}
              title={`${t(GALAXY_TEXT.WARP)} ${system.title}`}
              variants={{ hidden: { opacity: 0, x: -12 }, visible: { opacity: 1, x: 0 } }}
              whileHover={{ x: 4 }}
            >
              <span className={styles.systemDot} />
              <span className={styles.systemName}>{system.title}</span>
              <span className={styles.systemCount}>{system.planets.length}</span>
            </Motion.button>
          ))}
        </Motion.nav>

        <div className={styles.help}>
          {!isTouch && <span>{t(GALAXY_TEXT.HELP_KEYS)}</span>}
          <span>{t(isTouch ? GALAXY_TEXT.HELP_TOUCH : GALAXY_TEXT.HELP_MOUSE)}</span>
        </div>

        <div className={styles.pad}>
          {PAD_ACTIONS.map(({ action, icon, label }) => (
            <button
              key={action}
              type="button"
              className={styles.padButton}
              aria-label={t(label)}
              onPointerDown={(event) => { event.preventDefault(); pressPad(action, true); }}
              onPointerUp={() => pressPad(action, false)}
              onPointerLeave={() => pressPad(action, false)}
              onPointerCancel={() => pressPad(action, false)}
              onContextMenu={(event) => event.preventDefault()}
            >
              <Icon name={icon} size={16} />
            </button>
          ))}
        </div>

        <AnimatePresence>
          {selected && (
            <Motion.aside
              key={selected.id}
              className={styles.dossier}
              style={{ '--dossier-color': selected.color }}
              initial={{ opacity: 0, x: 40, scale: 0.97 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 40, scale: 0.97 }}
              transition={{ type: 'spring', stiffness: 260, damping: 26 }}
            >
              <div className={styles.dossierHeader}>
                <span className={styles.dossierIcon}><Icon name={selected.icon} size={22} color={selected.color} /></span>
                <div className={styles.dossierTitles}>
                  <span className={styles.dossierCategory}>{selected.systemTitle}</span>
                  <h3 className={styles.dossierName}>{selected.name}</h3>
                </div>
                <button type="button" className={styles.closeButton} onClick={() => setSelected(null)} aria-label={t(GALAXY_TEXT.CLOSE)}>
                  <Icon name="X" size={14} />
                </button>
              </div>
              {selected.evidence && <span className={styles.evidence}>{selected.evidence}</span>}
              <p className={styles.dossierSummary}>{selected.summary}</p>
              {selected.inPractice && (
                <p className={styles.dossierPractice}>
                  <strong>{t(GALAXY_TEXT.IN_PRACTICE)}</strong>
                  {selected.inPractice}
                </p>
              )}
              <span className={styles.panelTitle}>{t(selected.kind === 'soft' ? GALAXY_TEXT.TRAITS : GALAXY_TEXT.PRACTICAL)}</span>
              <div className={styles.concepts}>
                {selected.concepts.map((concept, index) => (
                  <Motion.span key={concept} className={styles.concept} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 + index * 0.05 }}>
                    ✓ {concept}
                  </Motion.span>
                ))}
              </div>
            </Motion.aside>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
