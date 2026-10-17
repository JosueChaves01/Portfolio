import { Vector3 } from 'three';
import { SKILLS_CATEGORIES } from '../../sections/skills/mocks/skills.mock';
import { SOFT_SKILLS } from '../../sections/skills/mocks/softSkills.mock';
import { GALAXY_TEXT, SOFT_SYSTEM_COLOR, SOFT_SYSTEM_ID, SYSTEM_POSITIONS } from '../constants/galaxy.constants';
import { BROWSER_TEXT, BROWSER_WINDOWS } from '../constants/browser.constants';

const SKILLS_PORTAL_POSITION = [64, -2, 24];

/** Soft skills form the core; each technical category is a star system around it. */
export function buildSkillsUniverse(t) {
  const resolve = (value) => (typeof value === 'string' ? value : t(value));
  const soft = {
    id: SOFT_SYSTEM_ID, color: SOFT_SYSTEM_COLOR, title: t(GALAXY_TEXT.SOFT_SYSTEM),
    planets: SOFT_SKILLS.map((skill) => ({
      id: `soft-${skill.id}`, kind: 'soft', name: t(skill.title), icon: skill.icon, color: skill.color,
      summary: t(skill.summary), concepts: skill.traits.map(resolve), inPractice: t(skill.inPractice),
    })),
  };
  const technical = SKILLS_CATEGORIES.map((category) => ({
    id: category.id, color: category.orbitColor, title: t(category.title),
    planets: category.skills.map((skill, index) => ({
      id: `${category.id}-${index}`, kind: 'technical', name: resolve(skill.name), icon: skill.icon, color: skill.color,
      summary: t(skill.summary), concepts: skill.concepts.map(resolve), evidence: t(skill.evidence),
    })),
  }));
  const systems = [soft, ...technical].map((system) => {
    const position = SYSTEM_POSITIONS[system.id] || [0, 0, 0];
    return { ...system, position, vector: new Vector3(...position), planets: system.planets.map((planet) => ({ ...planet, systemTitle: system.title })) };
  });

  return {
    id: BROWSER_WINDOWS.SKILLS,
    fileName: 'skills.galaxy',
    title: t(GALAXY_TEXT.TITLE),
    systems,
    hub: systems[0].position,
    cameraHome: { position: [0, 24, 74], lookAt: [0, 0, 0] },
    portal: { position: SKILLS_PORTAL_POSITION, target: BROWSER_WINDOWS.PROJECTS, label: t(BROWSER_TEXT.PORTAL_TO_PROJECTS) },
  };
}
