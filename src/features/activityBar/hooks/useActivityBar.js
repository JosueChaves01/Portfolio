import { usePanel } from '../../../store/PanelContext';
import { useOverlay } from '../../../store/OverlayContext';

export function useActivityBar({ onDownloadResume, onOpenSearch }) {
  const { activePanel, togglePanel } = usePanel();
  const { toggleCopilot } = useOverlay();

  const handleIconClick = (id) => {
    if (id === 'download') {
      onDownloadResume?.();
      return;
    }
    if (id === 'search') {
      onOpenSearch?.();
      return;
    }
    if (id === 'copilot') {
      toggleCopilot();
      return;
    }
    togglePanel(id);
  };

  return { activePanel, handleIconClick };
}
