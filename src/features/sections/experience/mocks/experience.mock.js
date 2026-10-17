import { WHITE_CITY, RECENT_CAPABILITIES } from '../../../../shared/data/recentWork.js';

export const EXPERIENCE_ITEMS = [
  {
    id: 'whitecity-liberia', company: 'White City Liberia', isCurrent: true,
    role: { en: 'Full-Stack Developer · Web Project', es: 'Desarrollador Full-Stack · Proyecto Web' },
    period: { en: '2026 · Ongoing project', es: '2026 · Proyecto en desarrollo' },
    description: WHITE_CITY.contribution,
    projects: RECENT_CAPABILITIES.filter(({ id }) => ['product', 'data', 'experience'].includes(id)).map(({ title, evidence }) => ({ name: title, contribution: evidence })),
    tags: ['Next.js', 'TypeScript', 'Supabase', 'Payments', 'UI/UX', 'Playwright', 'Vercel', 'AI-assisted development'],
  },
  {
    id: 'itcr-academic',
    company: 'ITCR (TEC)',
    role: { en: 'Computer Engineering Student', es: 'Estudiante de Ingeniería en Computadores' },
    period: { en: '2022 – Present', es: '2022 – Actualidad' },
    description: {
      en: 'Academic projects in backend development, databases, computer vision and distributed systems.',
      es: 'Proyectos académicos de desarrollo backend, bases de datos, visión artificial y sistemas distribuidos.'
    },
    projects: [
      {
        name: 'BarberHub API',
        contribution: {
          en: 'Built a barber management API using Node.js, Prisma and PostgreSQL.',
          es: 'Construí una API de gestión de barberías con Node.js, Prisma y PostgreSQL.'
        }
      },
      {
        name: 'Geospatial ITCR',
        contribution: {
          en: 'Engineered a specialized database system with PLpgSQL and QGIS integration for institutional spatial data.',
          es: 'Diseñé un sistema de base de datos especializado con integración de PLpgSQL y QGIS para datos espaciales institucionales.'
        }
      },
      {
        name: 'Vision ML System',
        contribution: {
          en: 'Developed an experimental attendance and facial-expression analysis project with Python and OpenCV.',
          es: 'Desarrollé un proyecto experimental de asistencia y análisis de expresiones faciales con Python y OpenCV.'
        }
      },
    ],
  },
  {
    id: 'barberhub-dev',
    company: 'BarberHub',
    role: { en: 'Full-Stack Developer (Project)', es: 'Desarrollador Full-Stack (Proyecto)' },
    period: '2024',
    description: {
      en: 'Developed an API for organizations, roles and appointments, using Express, TypeScript, Prisma and PostgreSQL. Added validation, API documentation and Google Calendar integration.',
      es: 'Desarrollé una API de organizaciones, roles y citas con Express, TypeScript, Prisma y PostgreSQL. Incluí validación, documentación de endpoints e integración con Google Calendar.'
    },
    projects: [],
  },
  {
    id: 'gis-itcr',
    period: '2023',
    title: { en: 'Geospatial Database Developer · Project', es: 'Desarrollador de Bases de Datos Geoespaciales · Proyecto' },
    company: 'Geospatial ITCR',
    description: {
      en: 'Developed a geospatial database project with spatial queries in PLpgSQL and visualization using Python and QGIS.',
      es: 'Desarrollé un proyecto de bases de datos geoespaciales con consultas en PLpgSQL y visualización mediante Python y QGIS.',
    },
    tags: ['PLpgSQL', 'Python', 'PostGIS', 'QGIS', 'Spatial Data'],
  },
  {
    id: 'vision-ml',
    isCurrent: false,
    period: '2023',
    title: { en: 'Computer Vision Developer · Project', es: 'Desarrollador de Visión Artificial · Proyecto' },
    company: 'FaceAttendance & EmotionAlert',
    description: {
      en: 'Experimental project combining face recognition for attendance with facial-expression analysis using Python and OpenCV.',
      es: 'Proyecto experimental que combina reconocimiento facial para asistencia y análisis de expresiones faciales con Python y OpenCV.',
    },
    tags: ['Python', 'OpenCV', 'Face Recognition', 'Machine Learning', 'Emotion Detection'],
  },
  {
    id: 'distributed-systems',
    isCurrent: false,
    period: '2023',
    title: { en: 'Distributed Systems Developer · Project', es: 'Desarrollador de Sistemas Distribuidos · Proyecto' },
    company: 'Distributed Systems',
    description: {
      en: 'Academic projects exploring multiprocessing, distributed communication and data processing with C# and Python.',
      es: 'Proyectos académicos de multiprocesamiento, comunicación distribuida y procesamiento de datos con C# y Python.',
    },
    tags: ['C#', 'Python', 'Multiprocessing', 'Distributed Systems'],
  },
];

