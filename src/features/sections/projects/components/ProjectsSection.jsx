import { useCallback, useState } from 'react';
import { AnimatePresence, motion as Motion } from 'framer-motion';
import { PROJECT_FILTERS, PROJECTS } from '../constants/projects.constants';
import { PROJECTS_DATA } from '../mocks/projects.mock';
import { useLanguage } from '../../../../store/LanguageContext';
import { Icon } from '../../../../shared/icons/Icon';
import { useProjectFilters } from '../hooks/useProjectFilters';
import { ProjectCard } from './ProjectCard';
import { ProjectDetails } from './ProjectDetails';
import { ProjectFilters } from './ProjectFilters';
import styles from './ProjectsSection.module.css';

const itemMotion = {
  initial: { opacity: 0, y: 20, scale: 0.98 },
  animate: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.3, ease: 'easeOut' } },
  exit: { opacity: 0, scale: 0.96, transition: { duration: 0.15 } },
};

export function ProjectsSection() {
  const { t } = useLanguage();
  const [openProject, setOpenProject] = useState(null);
  const closeDetails = useCallback(() => setOpenProject(null), []);
  const filters = useProjectFilters(PROJECTS_DATA, t);

  return (
    <section className={styles.section}>
      <p className={styles.headerComment}>{t(PROJECTS.HEADER_COMMENT)}</p>
      <h1 className={styles.heading}>{t(PROJECTS.HEADING)}</h1>
      <p className={styles.subheading}>{t(PROJECTS.SUBHEADING)}</p>

      <ProjectFilters filters={filters} total={PROJECTS_DATA.length} />

      <Motion.div className={styles.grid} layout>
        <AnimatePresence mode="popLayout">
          {filters.filtered.map((project) => (
            <Motion.div key={project.id} className={styles.gridItem} layout {...itemMotion}>
              <ProjectCard {...project} onOpen={() => setOpenProject(project)} />
            </Motion.div>
          ))}
        </AnimatePresence>
      </Motion.div>

      <AnimatePresence>
        {filters.filtered.length === 0 && (
          <Motion.div className={styles.empty} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
            <Icon name="SearchX" size={28} />
            <strong>{t(PROJECT_FILTERS.EMPTY_TITLE)}</strong>
            <span>{t(PROJECT_FILTERS.EMPTY_HINT)}</span>
            <button type="button" onClick={filters.reset}>{t(PROJECT_FILTERS.RESET)}</button>
          </Motion.div>
        )}
      </AnimatePresence>

      <ProjectDetails project={openProject} onClose={closeDetails} />
    </section>
  );
}
