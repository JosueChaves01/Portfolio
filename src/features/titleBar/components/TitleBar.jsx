import { TITLE_BAR, WINDOW_CONTROLS } from '../constants/titleBar.constants';
import { useTitleBar } from '../hooks/useTitleBar';
import { Icon } from '../../../shared/icons/Icon';
import styles from './TitleBar.module.css';

export function TitleBar({ onOpenCommandPalette }) {
  const { handleFullscreen, handleTitleClick } = useTitleBar({ onOpenCommandPalette });

  return (
    <header className={styles.titleBar}>
      <div className={styles.windowControls}>
        {Object.values(WINDOW_CONTROLS).map(({ label, color }) => (
          <button
            key={label}
            className={styles.windowButton}
            style={{ backgroundColor: color }}
            aria-label={label}
            onClick={label === WINDOW_CONTROLS.FULLSCREEN.label ? handleFullscreen : undefined}
          />
        ))}
      </div>

      <button className={styles.titleArea} onClick={handleTitleClick}>
        <span className={styles.searchIcon}>
          <Icon name={TITLE_BAR.SEARCH_ICON} size={14} />
        </span>
        <span className={styles.title}>{TITLE_BAR.TITLE}</span>
        <span className={styles.shortcutBadge}>{TITLE_BAR.SHORTCUT_BADGE}</span>
      </button>
    </header>
  );
}

