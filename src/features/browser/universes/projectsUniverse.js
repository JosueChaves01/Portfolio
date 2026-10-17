import { Vector3 } from 'three';
import { PROJECT_CATEGORIES, PROJECTS_DATA } from '../../sections/projects/mocks/projects.mock';
import { BROWSER_TEXT, BROWSER_WINDOWS } from '../constants/browser.constants';

const CATEGORY_COLORS = {
  web: '#38bdf8', backend: '#4ade80', ai: '#c084fc', data: '#818cf8', realtime: '#22d3ee', desktop: '#fb923c',
};
const RING_RADIUS = 46;
const RING_HEIGHTS = [8, -6, 12, -10, 4, -2];
const PROJECTS_TITLE = { en: 'PROJECTS NAVIGATOR', es: 'NAVEGADOR DE PROYECTOS' };

/** Each project category is a star system orbiting a central black hole; projects are planets. */
export function buildProjectsUniverse(t) {
  const systems = PROJECT_CATEGORIES.map((category, index) => {
    const angle = (index / PROJECT_CATEGORIES.length) * Math.PI * 2;
    const position = [Math.cos(angle) * RING_RADIUS, RING_HEIGHTS[index % RING_HEIGHTS.length], Math.sin(angle) * RING_RADIUS];
    const title = t(category.label).toUpperCase();
    return {
      id: category.id,
      color: CATEGORY_COLORS[category.id] || '#a5b4fc',
      title,
      position,
      vector: new Vector3(...position),
      planets: PROJECTS_DATA
        .filter(({ categories }) => categories?.[0] === category.id)
        .map((project) => ({
          id: `project-${project.id}`,
          kind: 'project',
          name: project.title,
          icon: project.icon,
          color: project.color,
          systemTitle: title,
          summary: t(project.description),
          concepts: project.tags,
          decisions: (project.details?.decisions || []).slice(0, 3).map((decision) => t(decision)),
          github: project.github,
          live: project.live,
        })),
    };
  }).filter(({ planets }) => planets.length > 0);

  return {
    id: BROWSER_WINDOWS.PROJECTS,
    fileName: 'projects.galaxy',
    title: t(PROJECTS_TITLE),
    systems,
    hub: [0, 0, 0],
    cameraHome: { position: [0, 22, 68], lookAt: [0, 0, 0] },
    portal: { position: [0, 0, 0], target: BROWSER_WINDOWS.SKILLS, label: t(BROWSER_TEXT.PORTAL_TO_SKILLS) },
  };
}
