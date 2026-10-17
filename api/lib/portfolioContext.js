/** Shared portfolio data keeps the assistant aligned with the visible sections. */
import { PROFILE, WHITE_CITY, RECENT_CAPABILITIES } from '../../src/shared/data/recentWork.js';
import { PROJECTS_DATA } from '../../src/features/sections/projects/mocks/projects.mock.js';
import { EXPERIENCE_ITEMS } from '../../src/features/sections/experience/mocks/experience.mock.js';
import { SKILLS_CATEGORIES, ALSO_FAMILIAR_WITH } from '../../src/features/sections/skills/mocks/skills.mock.js';
import { SOFT_SKILLS } from '../../src/features/sections/skills/mocks/softSkills.mock.js';

const english = (value) => typeof value === 'string' ? value : value?.en || '';

function buildPortfolioContext() {
  return [
    '--- ABOUT ---',
    `Name: Josué Chaves. Role: ${english(PROFILE.role)}. Location: Costa Rica.`,
    `Self-description (EN): ${PROFILE.about.en}`,
    `Self-description (ES): ${PROFILE.about.es}`,
    'Education: Computer Engineering student at Technological Institute of Costa Rica (TEC), 2022 – Present. Degree in progress.',
    '',
    '--- PROJECT DETAIL: WHITE CITY LIBERIA (one of several projects; do not present it as the main or only project) ---',
    `${WHITE_CITY.title}: ${english(WHITE_CITY.summary)}`,
    `Status: ${english(WHITE_CITY.status)}. Live: ${WHITE_CITY.live}`,
    `Challenge: ${english(WHITE_CITY.problem)}`,
    `Contribution: ${english(WHITE_CITY.contribution)}`,
    `Technologies: ${WHITE_CITY.stack.join(', ')}`,
    `Payment integration scope: ${english(WHITE_CITY.paymentNote)}`,
    'Do not imply that every integration or local improvement is enabled in production. No revenue, conversion, test coverage, seniority or years of professional experience are asserted.',
    '',
    '--- RECENT APPLIED SKILLS ---',
    ...RECENT_CAPABILITIES.map((item) => `${english(item.title)}: ${english(item.summary)} Evidence in White City: ${english(item.evidence)}`),
    '',
    '--- ALL PROJECTS (treat them with equal weight) ---',
    ...PROJECTS_DATA.map((project) => `${project.title}: ${english(project.description)} Technologies: ${project.tags.join(', ')}.${project.details?.architecture ? ` Architecture: ${english(project.details.architecture)}` : ''}${project.details?.decisions?.length ? ` Key decisions: ${project.details.decisions.map(english).join(' ')}` : ''} GitHub: ${project.github}${project.live ? `. Live: ${project.live}` : ''}`),
    '',
    '--- EXPERIENCE ---',
    ...EXPERIENCE_ITEMS.map((item) => `${english(item.period)} – ${english(item.role || item.title)} @ ${item.company}. ${english(item.description)}`),
    '',
    '--- TOOLKIT ---',
    ...SKILLS_CATEGORIES.map((category) => `${english(category.title)}: ${category.skills.map((item) => `${english(item.name)} (${english(item.evidence)})`).join(', ')}`),
    `Also familiar with: ${ALSO_FAMILIAR_WITH.join(', ')}`,
    `Soft skills: ${SOFT_SKILLS.map((item) => `${english(item.title)} (${english(item.inPractice)})`).join('; ')}`,
    '',
    '--- CONTACT ---',
    'Email: josuechaves.dev@gmail.com. GitHub: https://github.com/JosueChaves01. LinkedIn: https://www.linkedin.com/in/josue-chaves-465ba823a/. YouTube: https://www.youtube.com/@josue.chaves9270. Instagram: https://www.instagram.com/josue_chaves__/.',
  ].join('\n');
}

let cachedContext;
export function getPortfolioContext() {
  return cachedContext ??= buildPortfolioContext();
}
