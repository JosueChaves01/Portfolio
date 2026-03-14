import { FILE_IDS } from '../../explorer/constants/explorer.constants';

// Maps file IDs to their section component paths (lazy-loaded in EditorArea)
export const SECTION_COMPONENT_MAP = {
  [FILE_IDS.HOME]: 'home',
  [FILE_IDS.ABOUT]: 'about',
  [FILE_IDS.PROJECTS]: 'projects',
  [FILE_IDS.SKILLS]: 'skills',
  [FILE_IDS.EXPERIENCE]: 'experience',
  [FILE_IDS.CONTACT]: 'contact',
  [FILE_IDS.README]: 'readme',
};

export const EDITOR_PLACEHOLDER = 'No file open. Select a file from the Explorer.';
