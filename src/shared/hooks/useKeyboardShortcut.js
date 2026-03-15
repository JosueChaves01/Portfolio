import { useEffect } from 'react';

/**
 * Attaches a keydown listener for a specific keyboard shortcut.
 * @param {{ key: string, ctrl?: boolean, shift?: boolean, alt?: boolean }} shortcut
 * @param {() => void} callback
 * @param {boolean} [enabled=true]
 */
export function useKeyboardShortcut(shortcut, callback, enabled = true) {
  useEffect(() => {
    if (!enabled) return;

    const handleKeyDown = (event) => {
      const matchesKey = event.key === shortcut.key;
      const matchesCtrl = shortcut.ctrl ? event.ctrlKey : !event.ctrlKey || !shortcut.ctrl;
      const matchesShift = shortcut.shift ? event.shiftKey : !shortcut.shift || !event.shiftKey;
      const matchesAlt = shortcut.alt ? event.altKey : !shortcut.alt || !event.altKey;

      const isExactMatch = matchesKey && matchesCtrl && matchesShift && matchesAlt;

      if (isExactMatch) {
        event.preventDefault();
        callback();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [shortcut, callback, enabled]);
}
