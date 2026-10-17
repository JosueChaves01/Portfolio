import { SKILLS } from '../constants/skills.constants';
import { useLanguage } from '../../../../store/LanguageContext';
import { SkillsMap } from './SkillsMap';
import { SoftSkills } from './SoftSkills';
import { RecentCapabilities } from '../../../../shared/components/RecentCapabilities/RecentCapabilities';
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

      <RecentCapabilities />
      <h2 className={styles.toolkitHeading}>{t({ en: 'Explore my skills galaxy', es: 'Explora mi galaxia de habilidades' })}</h2>
      <SkillsMap />
      <SoftSkills />
    </section>
  );
}
