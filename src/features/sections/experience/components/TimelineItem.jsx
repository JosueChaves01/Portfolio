import { useLanguage } from '../../../../store/LanguageContext';
import { Tag } from '../../../../shared/components/Tag/Tag';
import { EXPERIENCE } from '../constants/experience.constants';
import styles from './ExperienceSection.module.css';

export function TimelineItem({ period, role, company, description, projects, tags = [] }) {
  const { t } = useLanguage();

  return (
    <div className={styles.timelineItem}>
      <div className={styles.timelineLeft}>
        <span className={styles.indicator}>{EXPERIENCE.PAST_INDICATOR}</span>
        <div className={styles.timelineLine} />
      </div>
      <div className={styles.timelineContent}>
        <span className={styles.period}>{period}</span>
        <h3 className={styles.title}>{t(role)}</h3>
        <span className={styles.company}>{company}</span>
        <p className={styles.description}>{t(description)}</p>

        {projects && projects.length > 0 && (
          <div className={styles.projects}>
            {projects.map((proj, i) => (
              <div key={i} className={styles.project}>
                <span className={styles.projectName}>{proj.name}:</span>
                <span className={styles.projectContribution}>{t(proj.contribution)}</span>
              </div>
            ))}
          </div>
        )}

        {tags && tags.length > 0 && (
          <div className={styles.tags}>
            {tags.map((tag) => <Tag key={tag}>{tag}</Tag>)}
          </div>
        )}
      </div>
    </div>
  );
}

