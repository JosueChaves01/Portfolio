import { useEffect, useRef, useState, useCallback } from 'react';
import { usePanel } from '../store/PanelContext';
import { useOverlay } from '../store/OverlayContext';
import { useKeyboardShortcut } from '../shared/hooks/useKeyboardShortcut';
import { SHORTCUTS } from '../shared/constants/keyboard.constants';
import { PANEL_IDS } from '../features/activityBar/constants/activityBar.constants';
import { TitleBar } from '../features/titleBar/components/TitleBar';
import { MenuBar } from '../features/menuBar/components/MenuBar';
import { ActivityBar } from '../features/activityBar/components/ActivityBar';
import { ExplorerPanel } from '../features/explorer/components/ExplorerPanel';
import { SourceControlPanel } from '../features/sourceControl/components/SourceControlPanel';
import { SettingsPanel } from '../features/settings/components/SettingsPanel';
import { TabBar } from '../features/tabBar/components/TabBar';
import { Breadcrumb } from '../features/breadcrumb/components/Breadcrumb';
import { EditorArea } from '../features/editor/components/EditorArea';
import { Terminal } from '../features/terminal/components/Terminal';
import { CopilotPanel } from '../features/copilot';
import { CommandPalette } from '../features/commandPalette/components/CommandPalette';
import { StatusBar } from '../features/statusBar/components/StatusBar';
import { RESUME_URL } from '../features/explorer/constants/explorer.constants';

import styles from './App.module.css';

const PANEL_COMPONENT_MAP = {
  [PANEL_IDS.EXPLORER]: ExplorerPanel,
  [PANEL_IDS.SOURCE_CONTROL]: SourceControlPanel,
  [PANEL_IDS.SETTINGS]: SettingsPanel,
};

function downloadResume() {
  const link = document.createElement('a');
  link.href = RESUME_URL;
  link.download = 'Josue_Chaves_Resume.pdf';
  link.click();
}

export function App() {
  const { activePanel } = usePanel();
  const {
    isTerminalOpen,
    isCopilotOpen,
    isCommandPaletteOpen,
    terminalKey,
    toggleCommandPalette,
    toggleTerminal,
    toggleCopilot,
  } = useOverlay();

  useKeyboardShortcut(SHORTCUTS.COMMAND_PALETTE, toggleCommandPalette);
  useKeyboardShortcut(SHORTCUTS.TOGGLE_TERMINAL, toggleTerminal);
  useKeyboardShortcut(SHORTCUTS.TOGGLE_COPILOT, toggleCopilot);
  useKeyboardShortcut(SHORTCUTS.CLOSE, () => {
    if (isCommandPaletteOpen) toggleCommandPalette();
  });

  const [displayedPanel, setDisplayedPanel] = useState(null);
  const [isClosing, setIsClosing] = useState(false);
  const [panelKey, setPanelKey] = useState(0);
  const visibleRef = useRef(null);

  // Resize logic
  const [sidebarWidth, setSidebarWidth] = useState(260); // Default width
  const [isResizingSidebar, setIsResizingSidebar] = useState(false);

  const startResizingSidebar = useCallback(() => setIsResizingSidebar(true), []);
  const stopResizingSidebar = useCallback(() => setIsResizingSidebar(false), []);

  const resizeSidebar = useCallback((e) => {
    if (isResizingSidebar) {
      // The activity bar is roughly 48px wide.
      const newWidth = e.clientX - 48;
      if (newWidth >= 160 && newWidth <= 600) {
        setSidebarWidth(newWidth);
      }
    }
  }, [isResizingSidebar]);

  useEffect(() => {
    if (isResizingSidebar) {
      window.addEventListener('mousemove', resizeSidebar);
      window.addEventListener('mouseup', stopResizingSidebar);
    }
    return () => {
      window.removeEventListener('mousemove', resizeSidebar);
      window.removeEventListener('mouseup', stopResizingSidebar);
    };
  }, [isResizingSidebar, resizeSidebar, stopResizingSidebar]);

  useEffect(() => {
    const prev = visibleRef.current;
    if (activePanel === prev) return;

    if (activePanel === null) {
      setIsClosing(true);
      const t = setTimeout(() => {
        setDisplayedPanel(null);
        setIsClosing(false);
        visibleRef.current = null;
      }, 220);
      return () => { clearTimeout(t); setIsClosing(false); };
    }

    if (prev === null) {
      setDisplayedPanel(activePanel);
      visibleRef.current = activePanel;
      return;
    }

    // Switching panels
    setIsClosing(true);
    const t = setTimeout(() => {
      setIsClosing(false);
      setDisplayedPanel(activePanel);
      setPanelKey((k) => k + 1);
      visibleRef.current = activePanel;
    }, 220);
    return () => { clearTimeout(t); setIsClosing(false); };
  }, [activePanel]);

  const DisplayedPanelComponent = displayedPanel ? PANEL_COMPONENT_MAP[displayedPanel] : null;

  return (
    <div className={styles.ide}>
      <TitleBar onOpenCommandPalette={toggleCommandPalette} />
      <MenuBar />

      <div className={styles.workbench}>
        <ActivityBar
          onDownloadResume={downloadResume}
          onOpenSearch={toggleCommandPalette}
        />

        {DisplayedPanelComponent && (
          <div
            key={panelKey}
            className={`${styles.sidePanel} ${isClosing ? styles.sidePanelClosing : ''}`}
            style={{ '--dynamic-sidebar-width': `${sidebarWidth}px` }}
          >
            <DisplayedPanelComponent />
            <div 
              className={`${styles.sidebarResizer} ${isResizingSidebar ? styles.sidebarResizerActive : ''}`} 
              onMouseDown={startResizingSidebar} 
            />
          </div>
        )}

        <div className={styles.editorColumn}>
          <TabBar />
          <Breadcrumb />
          <div className={styles.editorBody}>
            <EditorArea />
            {isTerminalOpen && <Terminal key={terminalKey} />}
          </div>
        </div>

        {isCopilotOpen && <CopilotPanel />}
      </div>

      <StatusBar />

      {isCommandPaletteOpen && <CommandPalette />}
    </div>
  );
}
