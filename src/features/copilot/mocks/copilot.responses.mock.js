import { CURRENT_STACK, PROFILE } from '../../../shared/data/recentWork';
import { PROJECTS_DATA } from '../../sections/projects/mocks/projects.mock';

export const MOCK_RESPONSES = {
  q1: PROFILE.bio.en,
  q2: `Josue has ${PROJECTS_DATA.length} projects across web apps, APIs, AI automation, data and real-time systems, including ${PROJECTS_DATA.slice(0, 6).map(({ title }) => title).join(', ')}. Use the filters in the Projects section to explore them.`,
  q3: `Recent project experience includes full-stack web applications with bookings and payments, AI assistants and automations, layered APIs, geospatial databases and real-time systems. Josue is also a Computer Engineering student at ITCR.`,
  q4: `Current toolkit: ${CURRENT_STACK.map(({ name }) => name).join(', ')}. Demonstrated skills include business workflows, payment APIs, SQL concurrency rules, multilingual mobile UX, automated validation and AI-assisted development.`,
  q5: `Contact Josue: josuechaves.dev@gmail.com · GitHub: github.com/JosueChaves01 · LinkedIn: linkedin.com/in/josue-chaves-465ba823a/`,
  q6: `Explore Josue's GitHub projects, connect on LinkedIn or get in touch to collaborate on a web application.`,
  default: `I can tell you about Josue's projects, applied skills, project experience and contact information.`,
};
