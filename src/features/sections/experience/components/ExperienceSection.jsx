import { EXPERIENCE } from '../constants/experience.constants';
import { EXPERIENCE_DATA } from '../mocks/experience.mock';
import { TimelineItem } from './TimelineItem';
import styles from './ExperienceSection.module.css';

export function ExperienceSection() {
  return (
    <section className={styles.section}>
      <p className={styles.headerComment}>{EXPERIENCE.HEADER_COMMENT}</p>
      <h1 className={styles.heading}>{EXPERIENCE.HEADING}</h1>
      <p className={styles.subheading}>{EXPERIENCE.SUBHEADING}</p>
      <div className={styles.timeline}>
        {EXPERIENCE_DATA.map((entry) => (
          <TimelineItem key={entry.id} {...entry} />
        ))}
      </div>
    </section>
  );
}
