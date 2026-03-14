import { useLanguage } from '../../../../store/LanguageContext';
import { SkillBar } from './SkillBar';
import styles from './SkillsSection.module.css';

export function SkillCategory({ title, skills }) {
  const { t } = useLanguage();

  return (
    <div className={styles.category}>
      <h3 className={styles.categoryTitle}>{t(title)}</h3>
      <div className={styles.skillList}>
        {skills.map(({ name, percent, color }) => (
          <SkillBar key={t(name)} name={t(name)} percent={percent} color={color} />
        ))}
      </div>
    </div>
  );
}

