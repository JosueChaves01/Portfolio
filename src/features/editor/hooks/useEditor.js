import { lazy, useMemo } from 'react';
import { useTabs } from '../../../store/TabsContext';
import { SECTION_COMPONENT_MAP } from '../constants/editor.constants';

const SECTION_COMPONENTS = {
  home: lazy(() => import('../../sections/home/components/HomeSection').then(m => ({ default: m.HomeSection }))),
  about: lazy(() => import('../../sections/about/components/AboutSection').then(m => ({ default: m.AboutSection }))),
  projects: lazy(() => import('../../sections/projects/components/ProjectsSection').then(m => ({ default: m.ProjectsSection }))),
  skills: lazy(() => import('../../sections/skills/components/SkillsSection').then(m => ({ default: m.SkillsSection }))),
  experience: lazy(() => import('../../sections/experience/components/ExperienceSection').then(m => ({ default: m.ExperienceSection }))),
  contact: lazy(() => import('../../sections/contact/components/ContactSection').then(m => ({ default: m.ContactSection }))),
  readme: lazy(() => import('../../sections/readme/components/ReadmeSection').then(m => ({ default: m.ReadmeSection }))),
};

export function useEditor() {
  const { activeTab } = useTabs();

  const ActiveSection = useMemo(() => {
    const sectionKey = SECTION_COMPONENT_MAP[activeTab];
    return sectionKey ? SECTION_COMPONENTS[sectionKey] : null;
  }, [activeTab]);

  return { ActiveSection };
}
