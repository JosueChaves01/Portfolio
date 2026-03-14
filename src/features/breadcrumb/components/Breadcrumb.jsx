import { useIDE } from '../../../store/IDEContext';
import { BREADCRUMB_PATHS, BREADCRUMB_SEPARATOR } from '../constants/breadcrumb.constants';
import styles from './Breadcrumb.module.css';

export function Breadcrumb() {
  const { activeTab } = useIDE();
  const segments = activeTab ? BREADCRUMB_PATHS[activeTab] ?? [] : [];

  return (
    <div className={styles.breadcrumb}>
      {segments.map((segment, index) => (
        <span key={index} className={styles.segmentWrapper}>
          <span className={`${styles.segment} ${index === segments.length - 1 ? styles.active : ''}`}>
            {segment}
          </span>
          {index < segments.length - 1 && (
            <span className={styles.separator}>{BREADCRUMB_SEPARATOR}</span>
          )}
        </span>
      ))}
    </div>
  );
}
