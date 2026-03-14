import { SkillBar } from './SkillBar';
import styles from './SkillsSection.module.css';

export function SkillCategory({ title, skills }) {
  return (
    <div className={styles.category}>
      <h3 className={styles.categoryTitle}>{title}</h3>
      <div className={styles.skillList}>
        {skills.map(({ name, percent, color }) => (
          <SkillBar key={name} name={name} percent={percent} color={color} />
        ))}

      </div>
    </div>
  );
}
