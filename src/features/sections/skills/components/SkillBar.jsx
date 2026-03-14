import { useSkillAnimation } from '../hooks/useSkillAnimation';
import styles from './SkillsSection.module.css';

export function SkillBar({ name, percent, color }) {
  const { containerRef, animatedPercent } = useSkillAnimation(percent);

  return (
    <div className={styles.skillRow} ref={containerRef}>
      <span className={styles.skillName}>{name}</span>
      <div className={styles.barTrack}>
        <div
          className={styles.barFill}
          style={{ 
            width: `${animatedPercent}%`,
            backgroundColor: color || 'var(--color-accent)'
          }}
        />
      </div>
      <span 
        className={styles.skillPercent}
        style={color ? { color } : undefined}
      >
        {percent}%
      </span>
    </div>
  );
}

