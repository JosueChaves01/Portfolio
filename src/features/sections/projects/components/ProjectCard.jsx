import { Icon } from '../../../../shared/icons/Icon';
import { Tag } from '../../../../shared/components/Tag/Tag';
import { PROJECTS } from '../constants/projects.constants';
import styles from './ProjectsSection.module.css';

export function ProjectCard({ icon, color, category, title, description, github, live, tags }) {
  return (
    <article className={styles.card}>
      <div className={styles.cardHeader}>
        <span className={styles.cardEmoji}><Icon name={icon} size={20} color={color} /></span>
        <span className={styles.cardCategory}>{category}</span>
        <div className={styles.cardLinks}>
          <a href={github} target="_blank" rel="noopener noreferrer" className={styles.link}>
            {PROJECTS.GITHUB_LABEL}
          </a>
          {live && (
            <a href={live} target="_blank" rel="noopener noreferrer" className={`${styles.link} ${styles.liveLink}`}>
              {PROJECTS.LIVE_LABEL}
            </a>
          )}
        </div>
      </div>
      <h3 className={styles.cardTitle}>{title}</h3>
      <p className={styles.cardDescription}>{description}</p>
      <div className={styles.cardTags}>
        {tags.map((tag) => <Tag key={tag}>{tag}</Tag>)}
      </div>
    </article>
  );
}
