import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { AnimatePresence, motion as Motion, useReducedMotion } from 'framer-motion';
import { Vector3 } from 'three';
import { useLanguage } from '../../../../store/LanguageContext';
import { Icon } from '../../../../shared/icons/Icon';
import { CAMERA_FOV, GALAXY_TEXT } from '../../constants/galaxy.constants';
import { BROWSER_TEXT } from '../../constants/browser.constants';
import { FlyControls } from './FlyControls';
import { GalaxyScene } from './GalaxyScene';
import { LabelsPortalContext } from './labelsPortal';
import styles from './GalaxyView.module.css';

const SYSTEM_VIEW_OFFSET = new Vector3(0, 9, 26);
const PLANET_VIEW_DISTANCE = 9;
const PAD_ACTIONS = [
  { action: 'up', icon: 'ChevronsUp', label: GALAXY_TEXT.PAD_UP },
  { action: 'forward', icon: 'ArrowUp', label: GALAXY_TEXT.PAD_FORWARD },
  { action: 'back', icon: 'ArrowDown', label: GALAXY_TEXT.PAD_BACK },
  { action: 'down', icon: 'ChevronsDown', label: GALAXY_TEXT.PAD_DOWN },
];

/** Free-flight 3D map for one universe (skills or projects) of the galaxy browser. */
export function GalaxyView({ universe, onPortal, onOpenProject, toolbarExtra }) {
  const { t } = useLanguage();
  const { systems, cameraHome } = universe;
  const reducedMotion = useReducedMotion();
  const [selected, setSelected] = useState(null);
  const [engaged, setEngaged] = useState(false);
  const engagedRef = useRef(false);
  const inputRef = useRef(new Set());
  const flyTargetRef = useRef(null);
  const frameRef = useRef(null);
  const labelsRef = useRef(null);
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
    flyTo(new Vector3(...cameraHome.position), new Vector3(...cameraHome.lookAt));
  };

  const pressPad = (action, pressed) => {
    if (pressed) {
      flyTargetRef.current = null;
      inputRef.current.add(action);
    } else {
      inputRef.current.delete(action);
    }
  };

  const totalPlanets = systems.reduce((sum, { planets }) => sum + planets.length, 0);

  return (
    <div className={styles.cockpit}>
      <div className={styles.toolbar}>
        <span className={styles.fileTab}><Icon name="Orbit" size={13} /> {universe.fileName}</span>
        <span className={styles.toolbarTitle}>{universe.title} <span className={styles.muted}>// {systems.length} · {totalPlanets} {t(GALAXY_TEXT.PLANETS)}</span></span>
        <button type="button" className={styles.toolbarButton} onClick={resetView}>
          <Icon name="LocateFixed" size={13} /> <span className={styles.toolbarLabel}>{t(GALAXY_TEXT.RESET)}</span>
        </button>
        {toolbarExtra}
      </div>

      <div ref={frameRef} className={`${styles.viewport} ${engaged ? styles.viewportEngaged : ''}`}>
        <Canvas
          camera={{ position: cameraHome.position, fov: CAMERA_FOV, near: 0.1, far: 600 }}
          dpr={[1, 2]}
          gl={{ antialias: true }}
          onCreated={({ camera }) => camera.lookAt(...cameraHome.lookAt)}
        >
          <LabelsPortalContext.Provider value={labelsRef}>
            <FlyControls
              engagedRef={engagedRef}
              inputRef={inputRef}
              flyTargetRef={flyTargetRef}
              systems={systems}
              onTelemetry={updateTelemetry}
              onEngage={engage}
              reducedMotion={reducedMotion}
            />
            <GalaxyScene
              systems={systems}
              hub={universe.hub}
              portal={universe.portal}
              onPortal={onPortal}
              paused={Boolean(selected) || reducedMotion}
              selectedId={selected?.id}
              onSelect={selectPlanet}
              onSelectSystem={warpToSystem}
            />
          </LabelsPortalContext.Provider>
        </Canvas>

        <div ref={labelsRef} className={styles.labelsLayer} aria-hidden="true" />
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
              {selected.decisions?.length > 0 && (
                <>
                  <span className={styles.panelTitle}>{t(BROWSER_TEXT.DECISIONS)}</span>
                  <ul className={styles.decisionList}>
                    {selected.decisions.map((decision) => <li key={decision}>{decision}</li>)}
                  </ul>
                </>
              )}
              <span className={styles.panelTitle}>
                {t(selected.kind === 'soft' ? GALAXY_TEXT.TRAITS : selected.kind === 'project' ? BROWSER_TEXT.STACK : GALAXY_TEXT.PRACTICAL)}
              </span>
              <div className={styles.concepts}>
                {selected.concepts.map((concept, index) => (
                  <Motion.span key={concept} className={styles.concept} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 + index * 0.05 }}>
                    ✓ {concept}
                  </Motion.span>
                ))}
              </div>
              {selected.kind === 'project' && (
                <div className={styles.dossierLinks}>
                  {selected.github && <a href={selected.github} target="_blank" rel="noopener noreferrer">GitHub ↗</a>}
                  {selected.live && <a href={selected.live} target="_blank" rel="noopener noreferrer">Live ↗</a>}
                  {onOpenProject && (
                    <button type="button" onClick={onOpenProject}>
                      {t(BROWSER_TEXT.CASE_STUDY)} <Icon name="ArrowRight" size={12} />
                    </button>
                  )}
                </div>
              )}
            </Motion.aside>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
