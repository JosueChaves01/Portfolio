import { Tag } from '../../../../shared/components/Tag/Tag';
import { EXPERIENCE } from '../constants/experience.constants';
import styles from './ExperienceSection.module.css';

export function TimelineItem({ isCurrent, period, title, company, description, tags }) {
  return (
    <div className={styles.timelineItem}>
      <div className={styles.timelineLeft}>
        <span className={`${styles.indicator} ${isCurrent ? styles.current : ''}`}>
          {isCurrent ? EXPERIENCE.CURRENT_INDICATOR : EXPERIENCE.PAST_INDICATOR}
        </span>
        <div className={styles.timelineLine} />
      </div>
      <div className={styles.timelineContent}>
        <span className={styles.period}>{period}</span>
        <h3 className={styles.title}>{title}</h3>
        <span className={styles.company}>{company}</span>
        <p className={styles.description}>{description}</p>
        <div className={styles.tags}>
          {tags.map((tag) => <Tag key={tag}>{tag}</Tag>)}
        </div>
      </div>
    </div>
  );
}
