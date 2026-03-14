export const EXPERIENCE_ITEMS = [
  {
    id: 'itcr-academic',
    company: 'ITCR (TEC)',
    role: { en: 'Computer Engineering Student', es: 'Estudiante de Ingeniería en Computadores' },
    period: '2021 – Present',
    description: {
      en: 'Focused on backend development, databases, and software architecture. Developed high-impact academic projects using robust engineering principles.',
      es: 'Enfocado en desarrollo backend, bases de datos y arquitectura de software. Desarrollé proyectos académicos de alto impacto utilizando principios de ingeniería robustos.'
    },
    projects: [
      {
        name: 'BarberHub API',
        contribution: {
          en: 'Built a scalable barber management API using Node.js, Prisma, and PostgreSQL.',
          es: 'Construí una API de gestión de barberías escalable usando Node.js, Prisma y PostgreSQL.'
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
          en: 'Implemented a Computer Vision system for student registration and emotion detection using Python and OpenCV.',
          es: 'Implementé un sistema de Visión Artificial para el registro de estudiantes y detección de emociones usando Python y OpenCV.'
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
      en: 'Led the development of a centralized management API for barber shops. Implemented a robust backend with Prisma ORM and TypeScript, ensuring scalable data architecture and containerized deployment with Docker.',
      es: 'Lideré el desarrollo de una API de gestión centralizada para barberías. Implementé un backend robusto con Prisma ORM y TypeScript, asegurando una arquitectura de datos escalable y despliegue en contenedores con Docker.'
    },
    projects: [],
  },
  {
    id: 'gis-itcr',
    period: '2023',
    title: 'GIS Database Developer (Project)',
    company: '@ Geospatial ITCR',
    description: 'Developed a comprehensive geospatial database system for academic management. Engineered complex spatial queries using PLpgSQL and integrated Python scripts for data visualization in QGIS.',
    tags: ['PLpgSQL', 'Python', 'PostGIS', 'QGIS', 'Spatial Data'],
  },
  {
    id: 'vision-ml',
    isCurrent: false,
    period: '2023',
    title: 'Computer Vision Developer (Project)',
    company: '@ AI Research Project',
    description: 'Architected an automated student attendance system using real-time face recognition. Integrated emotion analysis to monitor student engagement and trigger safety alerts in educational environments.',
    tags: ['Python', 'OpenCV', 'Face Recognition', 'Machine Learning', 'Emotion Detection'],
  },
  {
    id: 'distributed-systems',
    isCurrent: false,
    period: '2023',
    title: 'Systems Engineer (Project)',
    company: '@ Distributed systems',
    description: 'Designed and implemented high-performance multiprocessing solutions for complex data processing. Developed distributed system architectures using C# and Python to optimize resource utilization.',
    tags: ['C#', 'Python', 'Multiprocessing', 'Distributed Systems'],
  },
];

