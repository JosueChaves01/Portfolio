import { useEffect, useRef } from 'react';

/**
 * 3D Tilt effect hook for cards without mouse-following background shader effects.
 * Updates CSS custom properties directly on the element via requestAnimationFrame
 * for high performance 60fps interaction without React re-renders.
 */
export function useTiltEffect({ maxTilt = 8, scale = 1.01, speed = 0.1 } = {}) {
  const elementRef = useRef(null);
  const stateRef = useRef({
    targetX: 0,
    targetY: 0,
    currentX: 0,
    currentY: 0,
    isHovered: false,
    rafId: null,
  });

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isTouchDevice = window.matchMedia('(hover: none) and (pointer: coarse)').matches;
    if (prefersReducedMotion || isTouchDevice) return;

    const el = elementRef.current;
    if (!el) return;

    const state = stateRef.current;

    const animate = () => {
      // Lerp tilt
      state.currentX += (state.targetX - state.currentX) * speed;
      state.currentY += (state.targetY - state.currentY) * speed;

      el.style.setProperty('--tilt-x', `${state.currentX.toFixed(2)}deg`);
      el.style.setProperty('--tilt-y', `${state.currentY.toFixed(2)}deg`);
      el.style.setProperty('--card-scale', state.isHovered ? `${scale}` : '1');
      el.style.setProperty('--spotlight-opacity', '0');

      state.rafId = requestAnimationFrame(animate);
    };

    state.rafId = requestAnimationFrame(animate);

    const handlePointerMove = (e) => {
      if (e.pointerType === 'touch') return;
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      state.isHovered = true;

      // Calculate tilt (-1 to 1 from center)
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const normalizedX = (x - centerX) / centerX;
      const normalizedY = (y - centerY) / centerY;

      // Invert Y for standard natural 3D tilt
      state.targetX = -normalizedY * maxTilt;
      state.targetY = normalizedX * maxTilt;
    };

    const handlePointerLeave = () => {
      state.targetX = 0;
      state.targetY = 0;
      state.isHovered = false;
    };

    el.addEventListener('pointermove', handlePointerMove, { passive: true });
    el.addEventListener('pointerleave', handlePointerLeave, { passive: true });

    return () => {
      if (state.rafId) cancelAnimationFrame(state.rafId);
      el.removeEventListener('pointermove', handlePointerMove);
      el.removeEventListener('pointerleave', handlePointerLeave);
    };
  }, [maxTilt, scale, speed]);

  return elementRef;
}
