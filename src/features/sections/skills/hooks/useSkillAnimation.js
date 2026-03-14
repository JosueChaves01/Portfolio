import { useState, useEffect, useRef } from 'react';

/**
 * Animates skill bars to their target percent when the element enters the viewport.
 * @returns {{ containerRef: React.RefObject, animatedPercent: number }}
 */
export function useSkillAnimation(targetPercent) {
  const containerRef = useRef(null);
  const [animatedPercent, setAnimatedPercent] = useState(0);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setAnimatedPercent(targetPercent);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );

    if (containerRef.current) observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, [targetPercent]);

  return { containerRef, animatedPercent };
}
