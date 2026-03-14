import { ACTIVITY_ICONS_TOP, ACTIVITY_ICONS_BOTTOM } from '../constants/activityBar.constants';
import { useActivityBar } from '../hooks/useActivityBar';
import { ActivityBarIcon } from './ActivityBarIcon';
import styles from './ActivityBar.module.css';

export function ActivityBar({ onDownloadResume, onOpenSearch }) {
  const { activePanel, handleIconClick } = useActivityBar({ onDownloadResume, onOpenSearch });

  return (
    <aside className={styles.activityBar}>
      <div className={styles.topIcons}>
        {ACTIVITY_ICONS_TOP.map(({ id, icon, label }) => (
          <ActivityBarIcon
            key={id}
            id={id}
            icon={icon}
            label={label}
            isActive={activePanel === id}
            onClick={handleIconClick}
          />
        ))}
      </div>
      <div className={styles.bottomIcons}>
        {ACTIVITY_ICONS_BOTTOM.map(({ id, icon, label }) => (
          <ActivityBarIcon
            key={id}
            id={id}
            icon={icon}
            label={label}
            isActive={activePanel === id}
            onClick={handleIconClick}
          />
        ))}
      </div>
    </aside>
  );
}
