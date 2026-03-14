import { PROJECTS } from '../constants/projects.constants';
import { PROJECTS_DATA } from '../mocks/projects.mock';
import { useLanguage } from '../../../../store/LanguageContext';
import { ProjectCard } from './ProjectCard';
import styles from './ProjectsSection.module.css';

export function ProjectsSection() {
  const { t } = useLanguage();

  return (
    <section className={styles.section}>
      <p className={styles.headerComment}>{t(PROJECTS.HEADER_COMMENT)}</p>
      <h1 className={styles.heading}>{t(PROJECTS.HEADING)}</h1>
      <p className={styles.subheading}>{t(PROJECTS.SUBHEADING)}</p>
      <div className={styles.grid}>
        {PROJECTS_DATA.map((project) => (
          <ProjectCard key={project.id} {...project} />
        ))}
      </div>
    </section>
  );
}

