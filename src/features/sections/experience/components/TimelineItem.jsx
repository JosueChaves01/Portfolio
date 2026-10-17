import { useLanguage } from '../../../../store/LanguageContext';
import { Tag } from '../../../../shared/components/Tag/Tag';
import { EXPERIENCE } from '../constants/experience.constants';
import { useTiltEffect } from '../../../../shared/hooks/useTiltEffect';
import styles from './ExperienceSection.module.css';

export function TimelineItem({ period, role, title, company, description, projects, tags = [], isCurrent }) {
  const { t } = useLanguage();
  const tiltRef = useTiltEffect({ maxTilt: 5, scale: 1.01 });

  const indicator = isCurrent ? EXPERIENCE.CURRENT_INDICATOR : EXPERIENCE.PAST_INDICATOR;

  return (
    <div className={styles.timelineItem}>
      <div className={styles.timelineLeft}>
        <span className={`${styles.indicator} ${isCurrent ? styles.current : ''}`}>
          {indicator}
        </span>
        <div className={styles.timelineLine} />
      </div>

      {/* Glassmorphic content card with tilt */}
      <div className={styles.timelineCard} ref={tiltRef}>
        <div className={styles.cardSpotlight} />

        <div className={styles.timelineContent}>
          <span className={styles.period}>{t(period)}</span>
          <h3 className={styles.title}>{t(role || title)}</h3>
          <span className={styles.company}>{company}</span>
          <p className={styles.description}>{t(description)}</p>

          {projects?.length > 0 && (
            <div className={styles.projects}>
              {projects.map((proj) => (
                <div key={t(proj.name)} className={styles.project}>
                  <span className={styles.projectName}>{t(proj.name)}:</span>
                  <span className={styles.projectContribution}>{t(proj.contribution)}</span>
                </div>
              ))}
            </div>
          )}

          {tags?.length > 0 && (
            <div className={styles.tags}>
              {tags.map((tag) => <Tag key={tag}>{tag}</Tag>)}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
