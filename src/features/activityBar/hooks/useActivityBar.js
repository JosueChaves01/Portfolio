import { useIDE } from '../../../store/IDEContext';

export function useActivityBar({ onDownloadResume, onOpenSearch }) {
  const { activePanel, togglePanel, toggleCopilot } = useIDE();

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
