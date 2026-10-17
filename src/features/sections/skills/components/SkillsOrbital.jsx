import { useState, useCallback } from 'react';
import { useLanguage } from '../../../../store/LanguageContext';
import { useOrbitalAnimation } from '../hooks/useOrbitalAnimation';
import { SKILLS_CATEGORIES } from '../mocks/skills.mock';
import { Icon } from '../../../../shared/icons/Icon';
import styles from './SkillsOrbital.module.css';

const SPEED_OPTIONS = [
  { label: '0.5x', value: 0.5 },
  { label: '1.0x', value: 1.0 },
  { label: '1.5x', value: 1.5 },
];

export function SkillsOrbital() {
  const { t } = useLanguage();

  const [activeFilter, setActiveFilter] = useState('all');
  const [isPaused, setIsPaused] = useState(false);
  const [speedIndex, setSpeedIndex] = useState(1);
  const [zoomLevel, setZoomLevel] = useState(1.0);

  const resolveText = useCallback(
    (val) => (typeof val === 'object' ? t(val) : val),
    [t]
  );

  const {
    canvasRef,
    containerRef,
    nodeElsRef,
    flatNodes,
    hoveredNode,
    selectedNode,
    activeNode,
    isPinned,
    selectNode,
    unselectNode,
    onNodeEnter,
    onNodeLeave,
    totalSkills,
  } = useOrbitalAnimation({
    categories: SKILLS_CATEGORIES,
    resolveText,
    activeFilter,
    isPaused,
    speedMultiplier: SPEED_OPTIONS[speedIndex].value,
    zoomLevel,
    onZoomChange: setZoomLevel,
  });

  const togglePause = () => setIsPaused((prev) => !prev);
  const cycleSpeed = () => setSpeedIndex((prev) => (prev + 1) % SPEED_OPTIONS.length);

  const zoomIn = () => setZoomLevel((z) => Math.min(1.8, parseFloat((z + 0.15).toFixed(2))));
  const zoomOut = () => setZoomLevel((z) => Math.max(0.6, parseFloat((z - 0.15).toFixed(2))));
  const resetZoom = () => setZoomLevel(1.0);

  return (
    <div className={styles.orbitalCockpit}>
      {/* ─── Cockpit Top Bar ────────────────────────────────────────────── */}
      <div className={styles.hudToolbar}>
        <div className={styles.statusIndicator}>
          <span className={styles.statusPulseDot} />
          <span className={styles.statusText}>
            {t({ en: 'APPLIED TOOLKIT', es: 'HERRAMIENTAS APLICADAS' })} <span className={styles.statusDivider}>//</span> {totalSkills}
          </span>
        </div>

        {/* Right Tools: Zoom + Play/Pause + Speed */}
        <div className={styles.toolbarRight}>
          {/* Zoom In / Zoom Out Controls */}
          <div className={styles.zoomControlGroup}>
            <button
              type="button"
              className={styles.zoomBtn}
              onClick={zoomOut}
              disabled={zoomLevel <= 0.6}
              title="Zoom Out (-)"
              aria-label="Zoom Out"
            >
              <Icon name="Minus" size={12} />
            </button>
            <button
              type="button"
              className={styles.zoomLevelBtn}
              onClick={resetZoom}
              title="Reset Zoom (100%)"
              aria-label="Reset Zoom"
            >
              <span>{Math.round(zoomLevel * 100)}%</span>
            </button>
            <button
              type="button"
              className={styles.zoomBtn}
              onClick={zoomIn}
              disabled={zoomLevel >= 1.8}
              title="Zoom In (+)"
              aria-label="Zoom In"
            >
              <Icon name="Plus" size={12} />
            </button>
          </div>

          <div className={styles.controlButtons}>
            <button
              type="button"
              className={`${styles.ctrlBtn} ${isPaused ? styles.ctrlBtnActive : ''}`}
              onClick={togglePause}
              title={isPaused ? 'Resume simulation' : 'Pause simulation'}
              aria-label={isPaused ? 'Resume simulation' : 'Pause simulation'}
            >
              <Icon name={isPaused ? 'Play' : 'Pause'} size={13} />
              <span>{t(isPaused ? { en: 'RESUME', es: 'REANUDAR' } : { en: 'PAUSE', es: 'PAUSAR' })}</span>
            </button>

            <button
              type="button"
              className={styles.ctrlBtn}
              onClick={cycleSpeed}
              title="Cycle orbital speed"
              aria-label="Cycle orbital speed"
            >
              <Icon name="Zap" size={13} />
              <span>{SPEED_OPTIONS[speedIndex].label}</span>
            </button>
          </div>
        </div>
      </div>

      {/* ─── Category Filter Chips ──────────────────────────────────────── */}
      <div className={styles.filterBar}>
        <button
          type="button"
          className={`${styles.filterChip} ${activeFilter === 'all' ? styles.filterChipActive : ''}`}
          onClick={() => setActiveFilter('all')}
          aria-pressed={activeFilter === 'all'}
        >
          <span className={styles.filterDot} style={{ backgroundColor: 'var(--color-accent)' }} />
          <span>{t({ en: 'ALL TOOLS', es: 'TODAS' })}</span>
        </button>

        {SKILLS_CATEGORIES.map((cat) => {
          const isActive = activeFilter === cat.id;
          return (
            <button
              key={cat.id}
              type="button"
              className={`${styles.filterChip} ${isActive ? styles.filterChipActive : ''}`}
              style={{
                '--chip-color': cat.orbitColor,
              }}
              onClick={() => setActiveFilter(cat.id)}
              aria-pressed={isActive}
            >
              <span
                className={styles.filterDot}
                style={{ backgroundColor: cat.orbitColor }}
              />
              <span>{t(cat.title)}</span>
              <span className={styles.filterCount}>{cat.skills.length}</span>
            </button>
          );
        })}
      </div>

      <label className={styles.toolPicker}>
        <span>{t({ en: 'Explore a tool', es: 'Explorar una herramienta' })}</span>
        <select
          value={activeNode?.id || ''}
          onChange={(event) => {
            const node = flatNodes.find(({ id }) => id === event.target.value);
            if (node) {
              setActiveFilter(node.categoryId);
              selectNode(node);
            }
          }}
        >
          {SKILLS_CATEGORIES.map((category) => (
            <optgroup key={category.id} label={t(category.title)}>
              {flatNodes.filter(({ categoryId }) => categoryId === category.id).map((node) => (
                <option key={node.id} value={node.id}>{node.name}</option>
              ))}
            </optgroup>
          ))}
        </select>
      </label>

      {/* ─── Cosmic Viewport: Canvas + Orbiting Icon Badges ─────────────── */}
      <div className={styles.viewportFrame} ref={containerRef}>
        {/* Reticle Viewport Markings */}
        <div className={styles.reticleTopLeft}>+</div>
        <div className={styles.reticleTopRight}>+</div>
        <div className={styles.reticleBottomLeft}>+</div>
        <div className={styles.reticleBottomRight}>+</div>

        {/* Viewport Coordinates Header */}
        <div className={styles.viewportHeader}>
          <span className={styles.viewportTitle}>{t({ en: 'SELECT A TOOL TO EXPLORE ITS USE', es: 'SELECCIONA UNA HERRAMIENTA PARA EXPLORAR SU USO' })}</span>
          <span className={styles.viewportMode}>
            {isPinned ? `[LOCKED: ${activeNode.name}]` : isPaused ? '[SIMULATION FROZEN]' : `[ZOOM: ${Math.round(zoomLevel * 100)}%]`}
          </span>
        </div>

        {/* Background Orbit Trails & Gyro Reactor */}
        <canvas className={styles.viewportCanvas} ref={canvasRef} />

        {/* Orbiting HTML Icon Badges (GPU-Accelerated & Anti-Flicker) */}
        <div className={styles.nodesLayer}>
          {flatNodes.map((node) => {
            const isSelected = selectedNode?.id === node.id;
            const isHovered = hoveredNode?.id === node.id;

            return (
              <button
                key={node.id}
                ref={(el) => {
                  if (el) nodeElsRef.current[node.id] = el;
                }}
                type="button"
                className={`${styles.iconBadge} ${isSelected ? styles.badgeSelected : ''} ${isHovered ? styles.badgeHovered : ''}`}
                style={{
                  '--badge-color': node.color,
                  '--badge-color-glow': `${node.color}55`,
                  zIndex: isSelected ? 1200 : isHovered ? 1100 : 50,
                }}
                onClick={() => selectNode(node)}
                onPointerEnter={() => onNodeEnter(node)}
                onPointerLeave={() => onNodeLeave(node.id)}
                title={`${node.name} — ${t(node.evidence)}`}
                aria-label={node.name}
                aria-pressed={isSelected}
              >
                <span className={styles.badgeIconContainer}>
                  <Icon name={node.icon} size={17} color={node.color} />
                </span>
                <span className={styles.badgeLabel}>{node.name}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* ─── Detailed Telemetry & Concepts Dossier (Always Retained) ────── */}
      <div
        className={`${styles.dossierPanel} ${activeNode ? styles.dossierActive : ''}`}
        style={{
          '--dossier-accent': activeNode?.color || 'var(--color-accent)',
        }}
      >
        {activeNode && (
          <div className={styles.dossierContent}>
            {/* Header: Icon + Name + Category + Evidence */}
            <div className={styles.dossierHeader}>
              <div className={styles.dossierMainInfo}>
                <div
                  className={styles.dossierIconBox}
                  style={{
                    backgroundColor: `${activeNode.color}15`,
                    borderColor: `${activeNode.color}44`,
                    boxShadow: `0 0 16px ${activeNode.color}33`,
                  }}
                >
                  <Icon name={activeNode.icon} size={24} color={activeNode.color} />
                </div>

                <div className={styles.dossierTitleCol}>
                  <div className={styles.dossierCategory}>
                    <span
                      className={styles.dossierCategoryDot}
                      style={{ backgroundColor: activeNode.color }}
                    />
                    <span>{activeNode.categoryTitle}</span>
                  </div>
                  <h2 className={styles.dossierName}>{activeNode.name}</h2>
                </div>
              </div>

              <div className={styles.dossierActions}>
                <div className={styles.percentageBadgeCol}>
                  <span
                    className={styles.tierPill}
                    style={{
                      color: activeNode.color,
                      borderColor: `${activeNode.color}44`,
                      backgroundColor: `${activeNode.color}15`,
                    }}
                  >
                    {t(activeNode.evidence)}
                  </span>
                </div>

                {isPinned ? (
                  <button
                    type="button"
                    className={styles.unpinBtn}
                    onClick={unselectNode}
                    title="Unlock telemetry"
                  >
                    <Icon name="X" size={12} /> UNLOCK
                  </button>
                ) : (
                  <span className={styles.previewTag}>
                    <span className={styles.previewPulseDot} /> PREVIEW
                  </span>
                )}
              </div>
            </div>

            {/* Summary Statement */}
            {activeNode.summary && (
              <p className={styles.dossierSummary}>
                {resolveText(activeNode.summary)}
              </p>
            )}

            {/* Practical applications */}
            {activeNode.concepts && activeNode.concepts.length > 0 && (
              <div className={styles.conceptsBlock}>
                <div className={styles.conceptsHeader}>
                  <Icon name="CheckCircle2" size={13} color={activeNode.color} />
                  <span className={styles.conceptsTitle}>
                    {t({
                      en: 'PRACTICAL APPLICATIONS',
                      es: 'APLICACIONES PRÁCTICAS',
                    })}
                  </span>
                </div>

                <div className={styles.conceptsGrid}>
                  {activeNode.concepts.map((concept, idx) => (
                    <div key={idx} className={styles.conceptChip}>
                      <span
                        className={styles.conceptCheck}
                        style={{ color: activeNode.color }}
                      >
                        ✓
                      </span>
                      <span className={styles.conceptText}>
                        {resolveText(concept)}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
