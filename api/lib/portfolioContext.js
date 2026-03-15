/**
 * Portfolio knowledge base for Copilot RAG.
 * Plain text context built from about, projects, experience, and skills.
 * Used only by the serverless API (no dependency on src/).
 * Single responsibility: build and cache the portfolio context string.
 */

const SECTION_LABELS = {
  ABOUT: '--- ABOUT ---',
  PROJECTS: '--- PROJECTS ---',
  EXPERIENCE: '--- EXPERIENCE ---',
  SKILLS: '--- SKILLS ---',
  CONTACT: '--- CONTACT ---',
};

const about = {
  bioEn: `Josué Chaves is a Computer Engineering student passionate about software architecture, language design, and building robust systems. He enjoys exploring the principles behind well-designed software — from SOLID principles and design patterns to backend architecture and distributed systems. Currently focused on writing clean, maintainable code and understanding the deeper mechanics of how software works.`,
  bioEs: `Josué Chaves es un estudiante de Ingeniería en Computadores apasionado por la arquitectura de software, el diseño de lenguajes y la construcción de sistemas robustos. Disfruta explorando los principios detrás del software bien diseñado, desde los principios SOLID y patrones de diseño hasta la arquitectura backend y sistemas distribuidos. Actualmente se enfoca en escribir código limpio y mantenible, comprendiendo la mecánica profunda de cómo funciona el software.`,
  education: 'Technological Institute of Costa Rica (TEC), Costa Rica. Bachelor of Engineering in Computer Engineering. Period: 2022 – Present.',
  focus: ['Designing well-structured backend systems', 'Applying SOLID principles and design patterns in real projects', 'Building a workflow engine for assistant agents', 'Exploring software architecture and scalable system design', 'Thinking about how good abstractions simplify systems', 'Always learning, always refining'],
  talkAbout: ['Software Architecture', 'Design Patterns & SOLID', 'Backend & FullStack Development', 'Systems Design', 'Clean Code'],
};

const projects = [
  { title: 'BarberHub – Barber Management API', descEn: 'A centralized barber shop management system with Prisma ORM, TypeScript, and Docker. Features include authentication, authorization APIs, and database management.', tags: 'TypeScript, Prisma, Docker, PostgreSQL, REST API', github: 'https://github.com/JosueChaves01/barber-control-api' },
  { title: 'Roomiefy – Room Rental Platform', descEn: 'A comprehensive room rental software design project. Built with JavaScript, CSS, and HTML, featuring Azure integration and GitHub workflows for CI/CD.', tags: 'JavaScript, HTML5, CSS3, Azure, CI/CD', github: 'https://github.com/JosueChaves01/Roomiefy' },
  { title: 'Chess vs IA', descEn: 'Chess game developed in React using the Stockfish engine and Web Workers for high-performance AI integration without blocking the main UI thread.', tags: 'React, Stockfish, Web Workers, TailwindCSS', github: 'https://github.com/JosueChaves01/Chess-vs-IA', live: 'https://chess-vs-ia.vercel.app/' },
  { title: 'Proyecto Habitacional – Housing Management', descEn: 'A housing management platform with TypeScript and Vite, featuring responsive design and modern web practices.', tags: 'TypeScript, Vite, React, CSS, GitHub Pages', github: 'https://github.com/JosueChaves01/Proyecto_Habitacional', live: 'https://josuechaves01.github.io/Proyecto_Habitacional/' },
  { title: 'Geospatial Database ITCR – GIS Project', descEn: 'A geospatial database system for managing academic data with QGIS integration. Combines PLpgSQL and Python for spatial data management.', tags: 'PLpgSQL, Python, QGIS, PostGIS, Geospatial', github: 'https://github.com/JosueChaves01/bd-geoespacial-itcr' },
  { title: 'Face Attendance & Emotion Alert System', descEn: 'An intelligent system using computer vision to recognize student faces, track attendance automatically, and send alerts when detecting dangerous emotions.', tags: 'Python, OpenCV, Machine Learning, Face Recognition, Emotion Detection', github: 'https://github.com/JosueChaves01/FaceAttendance_and_EmotionAlert' },
  { title: 'AddTexto to Image – Go Desktop App', descEn: 'A desktop application built with Go using the Fyne GUI library. Allows users to add text to images and save or email the modified images.', tags: 'Go, Fyne, Desktop Application, Image Processing', github: 'https://github.com/JosueChaves01/AddTextoToImage' },
  { title: 'Client Chat – Real-time Chat Application', descEn: 'A real-time chat client with full-stack JavaScript architecture.', tags: 'JavaScript, Node.js, Socket.io, Real-time, Full Stack', github: 'https://github.com/JosueChaves01/client_chat' },
  { title: 'Gestor de Reparaciones de Vehículos', descEn: 'A vehicle repair management system created from Figma designs. Demonstrates design-to-code workflow with modern frontend practices.', tags: 'TypeScript, React, Figma Design, UI/UX', github: 'https://github.com/JosueChaves01/GestorDeReparacionesDeVehiculos' },
  { title: 'Airbnb Next.js Landing Page', descEn: 'A modern Airbnb landing page built with Next.js featuring internationalization (i18n) support, responsive design, and Vercel integration.', tags: 'Next.js, React, CSS, i18n, Vercel', github: 'https://github.com/JosueChaves01/airbnb-nextjs-app', live: 'https://airbnb-nextjs-app-bice.vercel.app/' },
];

const experience = [
  { company: 'ITCR (TEC)', role: 'Computer Engineering Student', period: '2021 – Present', description: 'Focused on backend development, databases, and software architecture. Developed high-impact academic projects including BarberHub API, Geospatial ITCR, and Vision ML System.' },
  { company: 'BarberHub', role: 'Full-Stack Developer (Project)', period: '2024', description: 'Led the development of a centralized management API for barber shops. Implemented a robust backend with Prisma ORM and TypeScript, scalable data architecture and Docker.' },
  { company: 'Geospatial ITCR', role: 'GIS Database Developer (Project)', period: '2023', description: 'Developed a comprehensive geospatial database system for academic management. Engineered complex spatial queries using PLpgSQL and Python scripts for QGIS.' },
  { company: 'AI Research Project', role: 'Computer Vision Developer (Project)', period: '2023', description: 'Architected an automated student attendance system using real-time face recognition and emotion analysis for safety alerts in educational environments.' },
  { company: 'Distributed systems', role: 'Systems Engineer (Project)', period: '2023', description: 'Designed high-performance multiprocessing solutions and distributed system architectures using C# and Python.' },
];

const skills = {
  languages: ['JavaScript', 'TypeScript', 'Python', 'Java', 'Go', 'C++', 'C#', 'SQL'],
  backend: ['Node.js', 'Express', 'Spring Boot', 'Prisma'],
  frontend: ['React', 'Next.js', 'TailwindCSS', 'Responsive Design'],
  databases: ['PostgreSQL', 'Redis', 'MongoDB', 'Docker'],
  tools: ['Git', 'Microservices', 'Linux', 'REST APIs'],
  analytics: ['SQL Analytics', 'Dimensional Modeling', 'Star Schema Design', 'Snowflake', 'Databricks'],
};
const alsoFamiliar = 'C++, C#, Go, Node.js, Express, Spring Boot, Prisma, Docker, Redis, PostgreSQL, MongoDB, React, Next.js, TailwindCSS, Git, Linux, Microservices, REST APIs, SQL Analytics, Snowflake, Databricks, Jupyter, Pandas, NumPy, Matplotlib, Figma, JIRA';

const contact = {
  email: 'josuechaves.dev@gmail.com',
  github: 'https://github.com/josuechaves01',
  linkedin: 'https://www.linkedin.com/in/josue-chaves-465ba823a/',
  youtube: 'youtube.com/@josue.chaves9270',
  instagram: 'instagram.com/josue_chaves__',
};

function buildPortfolioContext() {
  const sections = [
    SECTION_LABELS.ABOUT,
    `Bio (EN): ${about.bioEn}`,
    `Bio (ES): ${about.bioEs}`,
    `Education: ${about.education}`,
    `Current focus: ${about.focus.join('; ')}`,
    `Talk about: ${about.talkAbout.join(', ')}`,
    '',
    SECTION_LABELS.PROJECTS,
    ...projects.map((p) => {
      let line = `${p.title}: ${p.descEn} Technologies: ${p.tags}. GitHub: ${p.github}`;
      if (p.live) line += ` Live: ${p.live}`;
      return line;
    }),
    '',
    SECTION_LABELS.EXPERIENCE,
    ...experience.map((e) => `${e.period} – ${e.role} @ ${e.company}. ${e.description}`),
    '',
    SECTION_LABELS.SKILLS,
    `Languages: ${skills.languages.join(', ')}`,
    `Backend: ${skills.backend.join(', ')}`,
    `Frontend: ${skills.frontend.join(', ')}`,
    `Databases & Infra: ${skills.databases.join(', ')}`,
    `Tools: ${skills.tools.join(', ')}`,
    `Data Analytics: ${skills.analytics.join(', ')}`,
    `Also familiar with: ${alsoFamiliar}`,
    '',
    SECTION_LABELS.CONTACT,
    `Email: ${contact.email}. GitHub: ${contact.github}. LinkedIn: ${contact.linkedin}. YouTube: ${contact.youtube}. Instagram: ${contact.instagram}.`,
  ];
  return sections.join('\n');
}

let cachedContext = null;

/**
 * Returns the full portfolio context string for RAG injection into the system prompt.
 * @returns {string}
 */
function getPortfolioContext() {
  if (!cachedContext) cachedContext = buildPortfolioContext();
  return cachedContext;
}

export { getPortfolioContext };
