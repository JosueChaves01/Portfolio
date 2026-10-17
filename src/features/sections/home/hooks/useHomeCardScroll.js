import { useState, useRef, useEffect, useCallback } from 'react';

const MIN_STREAM_WIDTH = 1080;
const MIN_STREAM_HEIGHT = 560;

function getScrollParent(node) {
  for (let parent = node.parentElement; parent; parent = parent.parentElement) {
    if (/(auto|scroll)/.test(window.getComputedStyle(parent).overflowY)) return parent;
  }
  return window;
}

function getScrollViewport(parent) {
  if (parent === window) {
    return { top: 0, height: window.innerHeight, scrollTop: window.scrollY };
  }
  const style = window.getComputedStyle(parent);
  const paddingTop = parseFloat(style.paddingTop) || 0;
  const paddingBottom = parseFloat(style.paddingBottom) || 0;
  return {
    top: parent.getBoundingClientRect().top + parent.clientTop + paddingTop,
    height: parent.clientHeight - paddingTop - paddingBottom,
    scrollTop: parent.scrollTop,
  };
}

/** Keep card navigation and scrolling in the editor's coordinate system. */
export function useHomeCardScroll({ totalCards = 5 } = {}) {
  const [activeCardIndex, setActiveCardIndex] = useState(0);
  const [isScrollDriven, setIsScrollDriven] = useState(false);
  const trackRef = useRef(null);
  const layoutRef = useRef({ isScrollDriven: false });
  const lastIndex = Math.max(0, totalCards - 1);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const scrollParent = getScrollParent(track);
    const stage = track.querySelector('[data-home-stage]');
    const motionPreference = window.matchMedia('(prefers-reduced-motion: reduce)');
    let frameId = 0;

    const update = () => {
      frameId = 0;
      const viewport = getScrollViewport(scrollParent);
      const scrollDriven = track.clientWidth >= MIN_STREAM_WIDTH
        && viewport.height >= MIN_STREAM_HEIGHT && !motionPreference.matches;
      const step = viewport.height * 0.9;
      layoutRef.current = { isScrollDriven: scrollDriven };
      setIsScrollDriven(scrollDriven);
      track.style.setProperty('--home-scroll-step', `${step}px`);
      track.style.setProperty('--home-scroll-steps', String(lastIndex));
      track.style.setProperty('--home-viewport-height', `${viewport.height}px`);
      track.style.setProperty('--home-stage-height', `${stage.getBoundingClientRect().height}px`);
      const toolbar = track.querySelector('[data-home-card-controls]');
      const lastCard = track.querySelector(`[data-home-card-index="${lastIndex}"]`);
      const tail = Math.max(0, viewport.height - lastCard.getBoundingClientRect().height
        - toolbar.getBoundingClientRect().height - 16);
      track.style.setProperty('--home-deck-tail', `${tail}px`);

      let nextIndex = 0;
      if (scrollDriven) {
        const distance = viewport.top - track.getBoundingClientRect().top;
        // Allow for rounded browser scroll offsets at a card boundary.
        nextIndex = Math.floor((Math.max(0, distance) + 1) / step);
      } else {
        const anchor = viewport.top + toolbar.getBoundingClientRect().height + 16;
        for (const card of track.querySelectorAll('[data-home-card-index]')) {
          if (card.getBoundingClientRect().top <= anchor + 1) {
            nextIndex = Number(card.dataset.homeCardIndex);
          }
        }
      }
      setActiveCardIndex(Math.min(lastIndex, nextIndex));
    };

    const scheduleUpdate = () => {
      if (!frameId) frameId = window.requestAnimationFrame(update);
    };
    const observer = new ResizeObserver(scheduleUpdate);
    observer.observe(track);
    observer.observe(stage);
    if (scrollParent !== window) observer.observe(scrollParent);
    scrollParent.addEventListener('scroll', scheduleUpdate, { passive: true });
    window.addEventListener('resize', scheduleUpdate);
    motionPreference.addEventListener('change', scheduleUpdate);
    scheduleUpdate();
    return () => {
      window.cancelAnimationFrame(frameId);
      observer.disconnect();
      scrollParent.removeEventListener('scroll', scheduleUpdate);
      window.removeEventListener('resize', scheduleUpdate);
      motionPreference.removeEventListener('change', scheduleUpdate);
    };
  }, [lastIndex]);

  const goToCard = useCallback((targetIndex) => {
    const track = trackRef.current;
    if (!track) return;
    const index = Math.min(Math.max(targetIndex, 0), lastIndex);
    const scrollParent = getScrollParent(track);
    const viewport = getScrollViewport(scrollParent);
    let targetTop;
    if (layoutRef.current.isScrollDriven) {
      const trackStart = viewport.scrollTop + track.getBoundingClientRect().top - viewport.top;
      targetTop = trackStart + index * viewport.height * 0.9;
    } else {
      const card = track.querySelector(`[data-home-card-index="${index}"]`);
      const toolbar = track.querySelector('[data-home-card-controls]');
      targetTop = viewport.scrollTop + card.getBoundingClientRect().top
        - viewport.top - toolbar.getBoundingClientRect().height - 16;
    }
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    scrollParent.scrollTo({ top: Math.max(0, targetTop), behavior: reducedMotion ? 'auto' : 'smooth' });
  }, [lastIndex]);

  const nextCard = useCallback(() => goToCard(activeCardIndex + 1), [activeCardIndex, goToCard]);
  const prevCard = useCallback(() => goToCard(activeCardIndex - 1), [activeCardIndex, goToCard]);

  return {
    activeCardIndex,
    isCompleted: activeCardIndex >= lastIndex,
    isScrollDriven,
    goToCard,
    nextCard,
    prevCard,
    trackRef,
    totalCards,
  };
}

