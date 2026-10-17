import { useEffect, useRef, useState } from 'react';

/**
 * Hook that provides stagger-in animation classes triggered by IntersectionObserver.
 * Returns a ref to attach to the container, and a function to get stagger class names.
 * 
 * @param {Object} options
 * @param {number} options.baseDelay - Base delay between stagger items (ms). Default: 60
 * @param {number} options.threshold - IntersectionObserver threshold. Default: 0.1
 * @returns {{ containerRef: React.RefObject, isVisible: boolean, getStaggerStyle: (index: number) => object }}
 */
export function useStaggerAnimation({ baseDelay = 60, threshold = 0.1 } = {}) {
  const containerRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      setIsVisible(true);
      return;
    }

    const el = containerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  const getStaggerStyle = (index) => ({
    opacity: isVisible ? 1 : 0,
    transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
    transition: `opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1) ${index * baseDelay}ms, transform 0.6s cubic-bezier(0.16, 1, 0.3, 1) ${index * baseDelay}ms`,
  });

  return { containerRef, isVisible, getStaggerStyle };
}
