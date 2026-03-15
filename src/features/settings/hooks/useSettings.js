import { useTheme } from '../../../store/ThemeContext';
import { useOverlay } from '../../../store/OverlayContext';
import { RESUME_URL } from '../../explorer/constants/explorer.constants';

export function useSettings() {
  const { theme, setTheme } = useTheme();
  const { toggleCommandPalette, toggleTerminal, toggleCopilot } = useOverlay();

  const handleQuickAction = (action) => {
    const actionMap = {
      toggleCommandPalette,
      toggleTerminal,
      toggleCopilot,
      downloadResume: () => {
        const link = document.createElement('a');
        link.href = RESUME_URL;
        link.download = 'Josue_Chaves_Resume.pdf';
        link.click();
      },
      fullscreen: () => {
        if (!document.fullscreenElement) document.documentElement.requestFullscreen();
        else document.exitFullscreen();
      },
    };
    actionMap[action]?.();
  };

  return { theme, setTheme, handleQuickAction };
}
