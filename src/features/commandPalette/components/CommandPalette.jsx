import { useRef, useEffect } from 'react';
import { useLanguage } from '../../../store/LanguageContext';
import { Icon } from '../../../shared/icons/Icon';
import { useClickOutside } from '../../../shared/hooks/useClickOutside';
import { useCommandPalette } from '../hooks/useCommandPalette';
import { COMMAND_PALETTE } from '../constants/commandPalette.constants';
import { useOverlay } from '../../../store/OverlayContext';
import styles from './CommandPalette.module.css';

export function CommandPalette() {
  const { t } = useLanguage();
  const ref = useRef(null);
  const resultsRef = useRef(null);
  const { commandPaletteMode } = useOverlay();
  const {
    query, setQuery, filteredFiles, filteredCommands,
    handleFileSelect, handleCommandSelect, handleClose,
  } = useCommandPalette();

  useClickOutside(ref, handleClose);

  useEffect(() => {
    if (commandPaletteMode === 'files' && resultsRef.current) {
      const timer = setTimeout(() => {
        if (resultsRef.current) {
          resultsRef.current.scrollTo({
            top: resultsRef.current.scrollHeight,
            behavior: 'smooth'
          });
        }
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [commandPaletteMode]);

  return (
    <div className={styles.overlay}>
      <div className={styles.palette} ref={ref}>
        <div className={styles.searchRow}>
          <input
            className={styles.searchInput}
            placeholder={t(COMMAND_PALETTE.PLACEHOLDER)}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            autoFocus
          />
          <button className={styles.escBtn} onClick={handleClose}>
            {COMMAND_PALETTE.CLOSE_LABEL}
          </button>
        </div>

        <div className={styles.results} ref={resultsRef}>
          {filteredCommands.length > 0 && (
            <section>
              <div className={styles.sectionLabel}>{t(COMMAND_PALETTE.SECTION_COMMANDS)}</div>
              {filteredCommands.map((cmd) => (
                <button
                  key={cmd.id}
                  className={styles.resultItem}
                  onClick={() => handleCommandSelect(cmd.action)}
                >
                  <span className={styles.resultName}>{t(cmd.label)}</span>
                  <span className={styles.resultShortcut}>{cmd.shortcut}</span>
                </button>
              ))}
            </section>
          )}

          {filteredFiles.length > 0 && (
            <section>
              <div className={styles.sectionLabel}>{t(COMMAND_PALETTE.SECTION_FILES)}</div>
              {filteredFiles.map((file) => (
                <button
                  key={file.id}
                  className={styles.resultItem}
                  onClick={() => handleFileSelect(file.id)}
                >
                  <span className={styles.fileIcon}><Icon name={file.icon} size={13} color={file.color} /></span>
                  <span className={styles.resultName}>{file.name}</span>
                  <span className={styles.resultDirectory}>{file.directory}</span>
                </button>
              ))}
            </section>
          )}
        </div>

        <div className={styles.tip}>{t(COMMAND_PALETTE.TIP)}</div>
      </div>
    </div>
  );
}

