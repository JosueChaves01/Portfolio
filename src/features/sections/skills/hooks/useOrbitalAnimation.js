import { useEffect, useRef, useState, useCallback, useMemo } from 'react';

/**
 * Ultra-High-Performance Orbital Engine with Vector Icon Badges,
 * Full Space Utilization, 3D Scroll Layering, Smooth Zoom In/Out,
 * and Jitter-Free Hover/Select Telemetry Retention.
 */
export function useOrbitalAnimation({
  categories,
  resolveText,
  activeFilter = 'all',
  isPaused = false,
  speedMultiplier = 1.0,
  zoomLevel = 1.0,
  onZoomChange,
}) {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const nodeElsRef = useRef({});
  const rafRef = useRef(null);

  // Simulation parameters refs for RAF loop
  const activeFilterRef = useRef(activeFilter);
  const isPausedRef = useRef(isPaused);
  const speedRef = useRef(speedMultiplier);
  const targetZoomRef = useRef(zoomLevel);
  const onZoomChangeRef = useRef(onZoomChange);

  useEffect(() => {
    activeFilterRef.current = activeFilter;
  }, [activeFilter]);

  useEffect(() => {
    isPausedRef.current = isPaused;
  }, [isPaused]);

  useEffect(() => {
    speedRef.current = speedMultiplier;
  }, [speedMultiplier]);

  useEffect(() => {
    targetZoomRef.current = zoomLevel;
  }, [zoomLevel]);

  useEffect(() => {
    onZoomChangeRef.current = onZoomChange;
  }, [onZoomChange]);

  // Flatten skills with initial positions
  const flatNodes = useMemo(() => {
    const nodes = [];
    categories.forEach((cat) => {
      const orbitIdx = cat.orbitIndex;
      cat.skills.forEach((skill, skillIdx) => {
        const name = typeof skill.name === 'object' ? resolveText(skill.name) : skill.name;
        const categoryTitle = typeof cat.title === 'object' ? resolveText(cat.title) : cat.title;

        nodes.push({
          id: `${cat.id}-${skillIdx}`,
          categoryId: cat.id,
          categoryTitle,
          name,
          evidence: skill.evidence,
          color: skill.color,
          icon: skill.icon || 'Code',
          summary: skill.summary,
          concepts: skill.concepts || [],
          orbitIndex: orbitIdx,
          orbitColor: cat.orbitColor,
          angleOffset: (skillIdx / cat.skills.length) * Math.PI * 2,
          currentAngle: (skillIdx / cat.skills.length) * Math.PI * 2,
        });
      });
    });
    return nodes;
  }, [categories, resolveText]);

  const flatNodesRef = useRef(flatNodes);
  useEffect(() => {
    flatNodesRef.current = flatNodes;
  }, [flatNodes]);

  // Selected & hovered node state
  const [selectedNode, setSelectedNode] = useState(null);
  const [hoveredNode, setHoveredNode] = useState(null);
  // Default to first skill so the dossier is rich from the start and never empty/flickers
  const [lastActiveNode, setLastActiveNode] = useState(flatNodes[0] || null);

  const hoveredIdRef = useRef(null);
  const selectedIdRef = useRef(null);

  // Select / Pin toggle: Clicking an item locks it; clicking it again unlocks it
  const selectNode = useCallback((node) => {
    if (selectedIdRef.current === node.id) {
      selectedIdRef.current = null;
      setSelectedNode(null);
      // Keep lastActiveNode as this node so it never abruptly disappears
      setLastActiveNode(node);
    } else {
      selectedIdRef.current = node.id;
      setSelectedNode(node);
      setLastActiveNode(node);
    }
  }, []);

  const unselectNode = useCallback(() => {
    selectedIdRef.current = null;
    setSelectedNode(null);
  }, []);

  // Hover: updates hovered node and lastActiveNode (if not locked by a selection)
  const onNodeEnter = useCallback((node) => {
    hoveredIdRef.current = node.id;
    setHoveredNode(node);
    if (!selectedIdRef.current) {
      setLastActiveNode(node);
    }
  }, []);

  const onNodeLeave = useCallback((nodeId) => {
    // Only clear if the leaving element is the currently hovered element
    if (hoveredIdRef.current === nodeId) {
      hoveredIdRef.current = null;
      setHoveredNode(null);
      // NOTE: lastActiveNode is intentionally NOT cleared!
      // This eliminates any possibility of flickering or disappearance.
    }
  }, []);

  // Active node determination: selected takes priority, then hover, then last active
  const activeNodeId = (selectedNode || hoveredNode || lastActiveNode)?.id;
  const activeNode = flatNodes.find((node) => node.id === activeNodeId) || flatNodes[0] || null;

  // Main Canvas & GPU Animation Loop
  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext('2d');
    let width = 0;
    let height = 0;
    let centerX = 0;
    let centerY = 0;
    let dpr = 1;

    // Full-space radius parameters
    let baseRx = 0;
    let baseRy = 0;
    let gapX = 0;
    let gapY = 0;

    let coreRotation = 0;
    let pulseTime = 0;

    // Smooth Scroll Layering & Zoom interpolation state
    let targetScrollY = 0;
    let currentScrollY = 0;
    let currentZoom = targetZoomRef.current;

    const totalOrbits = categories.length;

    const resize = () => {
      const rect = container.getBoundingClientRect();
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = rect.width;
      height = rect.height;

      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      centerX = width / 2;
      centerY = height / 2;

      // Maximize available space: 92% of width & 88% of height
      const maxRx = width * 0.46;
      const maxRy = height * 0.44;
      baseRx = Math.max(45, width * 0.11);
      baseRy = Math.max(26, height * 0.11);
      gapX = (maxRx - baseRx) / Math.max(totalOrbits, 1);
      gapY = (maxRy - baseRy) / Math.max(totalOrbits, 1);
    };

    resize();
    window.addEventListener('resize', resize);

    // Scroll listener for multi-plane layering
    const scrollContainer = container.closest('[class*="editorArea"]') || window;

    const handleScroll = () => {
      if (scrollContainer === window) {
        targetScrollY = window.scrollY;
      } else {
        targetScrollY = scrollContainer.scrollTop;
      }
    };

    scrollContainer.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('scroll', handleScroll, { passive: true });

    handleScroll();
    currentScrollY = targetScrollY;

    // Interactive Wheel Zoom on the container
    const handleWheel = (e) => {
      // Zoom with wheel (prevent browser page scroll when over container if user spins wheel)
      if (Math.abs(e.deltaY) > 0) {
        e.preventDefault();
        const delta = e.deltaY > 0 ? -0.1 : 0.1;
        const newZoom = Math.min(1.8, Math.max(0.6, parseFloat((targetZoomRef.current + delta).toFixed(2))));
        targetZoomRef.current = newZoom;
        if (onZoomChangeRef.current) {
          onZoomChangeRef.current(newZoom);
        }
      }
    };

    container.addEventListener('wheel', handleWheel, { passive: false });

    // Canvas Background: Reticles & Grid
    const drawGrid = () => {
      ctx.save();
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.025)';
      ctx.lineWidth = 1;

      // Axes
      ctx.beginPath();
      ctx.moveTo(centerX - 40, centerY);
      ctx.lineTo(centerX + 40, centerY);
      ctx.moveTo(centerX, centerY - 40);
      ctx.lineTo(centerX, centerY + 40);
      ctx.stroke();

      // Viewport Corner brackets
      const corner = 18;
      const pad = 14;
      ctx.strokeStyle = 'rgba(129, 140, 248, 0.25)';

      // Top-Left
      ctx.beginPath();
      ctx.moveTo(pad, pad + corner);
      ctx.lineTo(pad, pad);
      ctx.lineTo(pad + corner, pad);
      ctx.stroke();

      // Top-Right
      ctx.beginPath();
      ctx.moveTo(width - pad - corner, pad);
      ctx.lineTo(width - pad, pad);
      ctx.lineTo(width - pad, pad + corner);
      ctx.stroke();

      // Bottom-Left
      ctx.beginPath();
      ctx.moveTo(pad, height - pad - corner);
      ctx.lineTo(pad, height - pad);
      ctx.lineTo(pad + corner, height - pad);
      ctx.stroke();

      // Bottom-Right
      ctx.beginPath();
      ctx.moveTo(width - pad - corner, height - pad);
      ctx.lineTo(width - pad, height - pad);
      ctx.lineTo(width - pad, height - pad - corner);
      ctx.stroke();

      ctx.restore();
    };

    // Canvas Gyro Reactor Core with Zoom Scaling
    const drawCoreReactor = (dt, coreCenterY, zoom) => {
      ctx.save();
      const coreR = Math.max(16, Math.min(width, height) * 0.044) * Math.min(1.3, Math.max(0.75, zoom));

      if (!isPausedRef.current) {
        coreRotation += dt * 0.0008 * speedRef.current;
      }

      // Outer atmospheric aura
      const auraGrad = ctx.createRadialGradient(
        centerX,
        coreCenterY,
        coreR * 0.2,
        centerX,
        coreCenterY,
        coreR * 4.2
      );
      const auraAlpha = 0.16 + Math.sin(pulseTime * 2) * 0.05;
      auraGrad.addColorStop(0, `rgba(129, 140, 248, ${auraAlpha})`);
      auraGrad.addColorStop(0.5, `rgba(99, 102, 241, ${auraAlpha * 0.3})`);
      auraGrad.addColorStop(1, 'rgba(129, 140, 248, 0)');

      ctx.beginPath();
      ctx.arc(centerX, coreCenterY, coreR * 4.2, 0, Math.PI * 2);
      ctx.fillStyle = auraGrad;
      ctx.fill();

      // Counter-rotating outer gyro ring
      ctx.save();
      ctx.translate(centerX, coreCenterY);
      ctx.rotate(-coreRotation * 1.4);
      ctx.beginPath();
      ctx.arc(0, 0, coreR * 1.8, 0, Math.PI * 2);
      ctx.strokeStyle = 'rgba(129, 140, 248, 0.28)';
      ctx.lineWidth = 1;
      ctx.setLineDash([4, 12]);
      ctx.stroke();

      for (let a = 0; a < Math.PI * 2; a += Math.PI / 4) {
        const tx = Math.cos(a) * (coreR * 1.8);
        const ty = Math.sin(a) * (coreR * 1.8);
        ctx.beginPath();
        ctx.arc(tx, ty, 1.5, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(199, 210, 254, 0.65)';
        ctx.fill();
      }
      ctx.restore();

      // Clockwise inner gyro ring
      ctx.save();
      ctx.translate(centerX, coreCenterY);
      ctx.rotate(coreRotation);
      ctx.beginPath();
      ctx.arc(0, 0, coreR * 1.3, 0, Math.PI * 2);
      ctx.strokeStyle = 'rgba(99, 102, 241, 0.4)';
      ctx.lineWidth = 1.2;
      ctx.setLineDash([14, 7]);
      ctx.stroke();
      ctx.restore();

      // Central core sphere
      const sphereGrad = ctx.createRadialGradient(
        centerX - coreR * 0.25,
        coreCenterY - coreR * 0.25,
        0,
        centerX,
        coreCenterY,
        coreR
      );
      sphereGrad.addColorStop(0, '#ffffff');
      sphereGrad.addColorStop(0.3, '#c7d2fe');
      sphereGrad.addColorStop(0.7, '#6366f1');
      sphereGrad.addColorStop(1, '#312e81');

      ctx.beginPath();
      ctx.arc(centerX, coreCenterY, coreR, 0, Math.PI * 2);
      ctx.fillStyle = sphereGrad;
      ctx.shadowColor = '#818cf8';
      ctx.shadowBlur = 15 + Math.sin(pulseTime * 3) * 5;
      ctx.fill();
      ctx.shadowBlur = 0;

      // Core Monogram Label
      ctx.font = '700 9px "JetBrains Mono", monospace';
      ctx.fillStyle = '#ffffff';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText('CORE', centerX, coreCenterY);

      ctx.restore();
    };

    // Canvas Orbit Rings with Scroll Layering & Zoom
    const drawOrbits = (elapsed, orbitParams) => {
      ctx.save();
      const activeCat = activeFilterRef.current;

      for (let i = 0; i < totalOrbits; i++) {
        const cat = categories[i];
        const { rx, ry, orbitCenterY } = orbitParams[i];
        const isTarget = activeCat === 'all' || activeCat === cat.id;
        const color = cat.orbitColor || '#818cf8';
        const alphaMul = isTarget ? 1.0 : 0.12;

        // Faint atmospheric glow ring
        ctx.beginPath();
        ctx.ellipse(centerX, orbitCenterY, rx, ry, 0, 0, Math.PI * 2);
        ctx.strokeStyle = color;
        ctx.lineWidth = isTarget && activeCat !== 'all' ? 3.5 : 2;
        ctx.globalAlpha = 0.05 * alphaMul;
        ctx.stroke();

        // Primary dashed orbit
        ctx.beginPath();
        ctx.ellipse(centerX, orbitCenterY, rx, ry, 0, 0, Math.PI * 2);
        ctx.lineWidth = isTarget && activeCat !== 'all' ? 1.5 : 1;
        ctx.setLineDash(isTarget && activeCat !== 'all' ? [6, 4] : [3, 8]);
        ctx.globalAlpha = (isTarget && activeCat !== 'all' ? 0.45 : 0.18) * alphaMul;
        ctx.stroke();
        ctx.setLineDash([]);
      }

      ctx.restore();
    };

    let lastTimestamp = performance.now();

    // Animation Loop
    const animate = (timestamp) => {
      const dt = Math.min(timestamp - lastTimestamp, 50);
      lastTimestamp = timestamp;

      pulseTime += dt * 0.001;

      // Exponential lerp smoothing for scroll layering & zoom
      currentScrollY += (targetScrollY - currentScrollY) * 0.08;
      currentZoom += (targetZoomRef.current - currentZoom) * 0.12;

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, width, height);

      // Compute scroll layering + zoom parameters for all 6 orbits
      const orbitParams = [];

      for (let i = 0; i < totalOrbits; i++) {
        const layerDepth = (i - (totalOrbits - 1) / 2);

        // Vertical layering parallax on scroll
        const layerOffsetY = layerDepth * (Math.sin(currentScrollY * 0.0028) * 24);

        // Perspective tilt modulation on scroll
        const tiltFactor = 1 + (layerDepth * 0.03) * Math.sin(currentScrollY * 0.0018);

        // Apply zoom multiplier smoothly
        const rx = (baseRx + gapX * (i + 1)) * currentZoom;
        const ry = (baseRy + gapY * (i + 1)) * tiltFactor * currentZoom;
        const orbitCenterY = centerY + layerOffsetY;

        orbitParams.push({ rx, ry, orbitCenterY, layerDepth });
      }

      // Draw Grid
      drawGrid();

      // Draw Orbit Bands with Layering & Zoom
      drawOrbits(timestamp, orbitParams);

      // Draw Core Reactor at center
      drawCoreReactor(dt, centerY, currentZoom);

      // GPU Transform Updates on HTML Icon Badges
      const activeCat = activeFilterRef.current;

      flatNodesRef.current.forEach((node) => {
        const el = nodeElsRef.current[node.id];
        if (!el) return;

        const orbitIdx = node.orbitIndex;
        const { rx, ry, orbitCenterY, layerDepth } = orbitParams[orbitIdx];

        const baseSpeed = 0.00016 * (1 + (totalOrbits - orbitIdx) * 0.16) * speedRef.current;

        const isCurrentHovered = hoveredIdRef.current === node.id;
        const isCurrentSelected = selectedIdRef.current === node.id;

        // FREEZE ANGLE completely if hovered or selected to prevent jitter
        if (!isPausedRef.current && !isCurrentHovered && !isCurrentSelected) {
          node.currentAngle += dt * baseSpeed;
        }

        // Slight scroll drift per layer
        const scrollDrift = layerDepth * (currentScrollY * 0.00015);
        const finalAngle = node.currentAngle + scrollDrift;

        const x = centerX + rx * Math.cos(finalAngle);
        const y = orbitCenterY + ry * Math.sin(finalAngle);

        // Perspective depth (back to front)
        const depth = Math.sin(finalAngle);
        const baseScale = (0.84 + 0.16 * ((1 - depth) / 2)) * Math.min(1.2, Math.max(0.8, currentZoom));
        // Keep scale stable to avoid bounding box jumping and flickering
        const finalScale = baseScale;

        // Category filter opacity
        const isTarget = activeCat === 'all' || activeCat === node.categoryId;
        const targetOpacity = isTarget
          ? ((isCurrentHovered || isCurrentSelected) ? 1.0 : (0.75 + 0.25 * ((1 - depth) / 2)))
          : 0.15;

        // Hardware-accelerated GPU transform
        el.style.transform = `translate3d(${x.toFixed(1)}px, ${y.toFixed(1)}px, 0) translate(-50%, -50%) scale(${finalScale.toFixed(2)})`;
        el.style.opacity = `${targetOpacity.toFixed(2)}`;
        el.style.pointerEvents = isTarget ? 'auto' : 'none';
      });

      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('resize', resize);
      scrollContainer.removeEventListener('scroll', handleScroll);
      window.removeEventListener('scroll', handleScroll);
      container.removeEventListener('wheel', handleWheel);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [categories]);

  return {
    canvasRef,
    containerRef,
    nodeElsRef,
    flatNodes,
    hoveredNode,
    selectedNode,
    activeNode,
    isPinned: Boolean(selectedNode),
    selectNode,
    unselectNode,
    onNodeEnter,
    onNodeLeave,
    totalSkills: flatNodes.length,
  };
}
