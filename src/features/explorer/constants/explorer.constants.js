export const FILE_IDS = {
  HOME: 'home',
  ABOUT: 'about',
  PROJECTS: 'projects',
  SKILLS: 'skills',
  EXPERIENCE: 'experience',
  CONTACT: 'contact',
  README: 'readme',
  RESUME: 'resume',
};

export const FILE_REGISTRY = {
  [FILE_IDS.HOME]: { name: 'home.tsx', extension: 'tsx', icon: 'Atom', color: '#61DAFB', isDownload: false },
  [FILE_IDS.ABOUT]: { name: 'about.html', extension: 'html', icon: 'Globe', color: '#E34F26', isDownload: false },
  [FILE_IDS.PROJECTS]: { name: 'projects.js', extension: 'js', icon: 'FileCode', color: '#F7DF1E', isDownload: false },
  [FILE_IDS.SKILLS]: { name: 'skills.json', extension: 'json', icon: 'Braces', color: '#CBCB41', isDownload: false },
  [FILE_IDS.EXPERIENCE]: { name: 'experience.ts', extension: 'ts', icon: 'FileCode', color: '#3178C6', isDownload: false },
  [FILE_IDS.CONTACT]: { name: 'contact.css', extension: 'css', icon: 'Palette', color: '#9B59B6', isDownload: false },
  [FILE_IDS.README]: { name: 'README.md', extension: 'md', icon: 'FileText', color: '#8B949E', isDownload: false },
  [FILE_IDS.RESUME]: { name: 'Josue_Chaves_Resume.pdf', extension: 'pdf', icon: 'FileDown', color: '#FF4444', isDownload: true },
};

export const FILE_TREE_ORDER = [
  FILE_IDS.HOME,
  FILE_IDS.ABOUT,
  FILE_IDS.PROJECTS,
  FILE_IDS.SKILLS,
  FILE_IDS.EXPERIENCE,
  FILE_IDS.CONTACT,
  FILE_IDS.README,
  FILE_IDS.RESUME,
];

export const EXPLORER = {
  ROOT_LABEL: { en: 'PORTFOLIO', es: 'PORTAFOLIO' },
  GIT_BADGE: '↑1 ✦3',
};


export const RESUME_URL = '/Josue_Chaves_Resume.pdf';
