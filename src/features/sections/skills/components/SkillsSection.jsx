import { SKILLS } from '../constants/skills.constants';
import { useLanguage } from '../../../../store/LanguageContext';
import { GalaxyLauncher } from './GalaxyLauncher';
import { SkillsInAction } from './SkillsInAction';
import styles from './SkillsSection.module.css';

export function SkillsSection() {
  const { t } = useLanguage();

  return (
    <section className={styles.section}>
      <div className={styles.headerBlock}>
        <p className={styles.headerComment}>{t(SKILLS.HEADER_COMMENT)}</p>
        <h1 className={styles.heading}>{t(SKILLS.HEADING)}</h1>
        <p className={styles.subheading}>{t(SKILLS.SUBHEADING)}</p>
      </div>

      <SkillsInAction />
      <GalaxyLauncher />
    </section>
  );
}
