import { useEffect } from 'react';

/**
 * Calls callback when a click occurs outside the given ref element.
 * @param {React.RefObject} ref
 * @param {() => void} callback
 */
export function useClickOutside(ref, callback) {
  useEffect(() => {
    const handleClick = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        callback();
      }
    };

    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [ref, callback]);
}
