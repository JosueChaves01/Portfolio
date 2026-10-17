import { useRef } from 'react';

/**
 * Disabled mouse parallax hook to prevent background shader/movement effects.
 * Preserves ref attachment without adding window mouse listeners.
 */
export function useInteractiveParallax() {
  const containerRef = useRef(null);
  return containerRef;
}
