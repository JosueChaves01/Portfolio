import { PROJECTS } from '../constants/projects.constants';
import { PROJECTS_DATA } from '../mocks/projects.mock';
import { ProjectCard } from './ProjectCard';
import styles from './ProjectsSection.module.css';

export function ProjectsSection() {
  return (
    <section className={styles.section}>
      <p className={styles.headerComment}>{PROJECTS.HEADER_COMMENT}</p>
      <h1 className={styles.heading}>{PROJECTS.HEADING}</h1>
      <p className={styles.subheading}>{PROJECTS.SUBHEADING}</p>
      <div className={styles.grid}>
        {PROJECTS_DATA.map((project) => (
          <ProjectCard key={project.id} {...project} />
        ))}
      </div>
    </section>
  );
}
