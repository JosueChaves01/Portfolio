import { SKILLS } from '../constants/skills.constants';
import { SKILLS_CATEGORIES, ALSO_FAMILIAR_WITH } from '../mocks/skills.mock';
import { useLanguage } from '../../../../store/LanguageContext';
import { SkillCategory } from './SkillCategory';
import { Tag } from '../../../../shared/components/Tag/Tag';
import styles from './SkillsSection.module.css';

export function SkillsSection() {
  const { t } = useLanguage();
  const leftCols = SKILLS_CATEGORIES.filter((c) => c.column === 'left');
  const rightCols = SKILLS_CATEGORIES.filter((c) => c.column === 'right');

  return (
    <section className={styles.section}>
      <p className={styles.headerComment}>{t(SKILLS.HEADER_COMMENT)}</p>
      <h1 className={styles.heading}>{t(SKILLS.HEADING)}</h1>
      <p className={styles.subheading}>{t(SKILLS.SUBHEADING)}</p>

      <div className={styles.dashboard}>
        <div className={styles.column}>
          {leftCols.map((cat) => <SkillCategory key={cat.id} {...cat} />)}
        </div>
        <div className={styles.column}>
          {rightCols.map((cat) => <SkillCategory key={cat.id} {...cat} />)}
        </div>
      </div>

      <div className={styles.alsoSection}>
        <h3 className={styles.alsoTitle}>{t(SKILLS.ALSO_FAMILIAR_TITLE).toUpperCase()}</h3>
        <div className={styles.alsoTags}>
          {ALSO_FAMILIAR_WITH.map((tag) => <Tag key={tag}>{tag}</Tag>)}
        </div>
      </div>
    </section>
  );
}

