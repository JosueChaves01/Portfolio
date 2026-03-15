import { useIDE } from '../store/IDEContext';
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
import { CopilotPanel } from '../features/copilot/components/CopilotPanel';
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
  const {
    activePanel,
    isTerminalOpen,
    isCopilotOpen,
    isCommandPaletteOpen,
    terminalKey,
    toggleCommandPalette,
    toggleTerminal,
    toggleCopilot,
  } = useIDE();

  useKeyboardShortcut(SHORTCUTS.COMMAND_PALETTE, toggleCommandPalette);
  useKeyboardShortcut(SHORTCUTS.TOGGLE_TERMINAL, toggleTerminal);
  useKeyboardShortcut(SHORTCUTS.TOGGLE_COPILOT, toggleCopilot);
  useKeyboardShortcut(SHORTCUTS.CLOSE, () => {
    if (isCommandPaletteOpen) toggleCommandPalette();
  });

  const ActivePanel = activePanel ? PANEL_COMPONENT_MAP[activePanel] : null;

  return (
    <div className={styles.ide}>
      <TitleBar onOpenCommandPalette={toggleCommandPalette} />
      <MenuBar />

      <div className={styles.workbench}>
        <ActivityBar
          onDownloadResume={downloadResume}
          onOpenSearch={toggleCommandPalette}
        />

        {ActivePanel && (
          <div className={styles.sidePanel}>
            <ActivePanel />
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
