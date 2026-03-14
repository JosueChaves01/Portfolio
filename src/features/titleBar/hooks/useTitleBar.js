import { useCallback } from 'react';

export function useTitleBar({ onOpenCommandPalette }) {
  const handleFullscreen = useCallback(() => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
  }, []);

  return { handleFullscreen, handleTitleClick: onOpenCommandPalette };
}
