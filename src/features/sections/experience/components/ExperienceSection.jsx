import { EXPERIENCE } from '../constants/experience.constants';
import { EXPERIENCE_ITEMS } from '../mocks/experience.mock';
import { useLanguage } from '../../../../store/LanguageContext';
import { TimelineItem } from './TimelineItem';
import styles from './ExperienceSection.module.css';

export function ExperienceSection() {
  const { t } = useLanguage();

  return (
    <section className={styles.section}>
      <p className={styles.headerComment}>{t(EXPERIENCE.HEADER_COMMENT)}</p>
      <h1 className={styles.heading}>{t(EXPERIENCE.HEADING)}</h1>
      <p className={styles.subheading}>{t(EXPERIENCE.SUBHEADING)}</p>
      <div className={styles.timeline}>
        {EXPERIENCE_ITEMS.map((entry) => (
          <TimelineItem key={entry.id} {...entry} />
        ))}
      </div>
    </section>
  );
}

