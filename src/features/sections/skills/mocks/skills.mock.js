const pair = (en, es) => ({ en, es });
const portfolio = pair('Experience across portfolio projects', 'Experiencia en los proyectos del portafolio');
const projects = (...names) => pair(`Applied in ${names.join(' · ')}`, `Aplicado en ${names.join(' · ')}`);
const whiteCity = projects('White City Liberia');
const skill = (name, icon, color, summary, concepts, evidence = portfolio) => ({ name, icon, color, summary, concepts, evidence });

export const SKILLS_CATEGORIES = [
  {
    id: 'frontend', title: pair('FRONTEND & EXPERIENCE', 'FRONTEND Y EXPERIENCIA'), orbitIndex: 0, orbitColor: '#08b5e6',
    skills: [
      skill('Next.js', 'Globe', '#38bdf8', pair('Landing pages, travel platforms and business applications built with App Router and reusable page sections.', 'Landing pages, plataformas de viajes y aplicaciones de negocio con App Router y secciones reutilizables.'), ['App Router', 'Route Handlers', 'Server Components', 'Metadata'], projects('TripFlow CR', 'Romántico Apartamento', 'White City Liberia')),
      skill('React', 'Atom', '#08b5e6', pair('Reusable components, hooks and shared state for catalogs, dashboards, forms and interactive games.', 'Componentes reutilizables, hooks y estado compartido para catálogos, paneles, formularios y juegos interactivos.'), ['Components', 'Hooks', 'State management', 'Form interactions'], projects('Roomiefy', 'Chess vs IA', 'Como Caído del Cielo', 'Vehicle Repair Manager')),
      skill('Tailwind CSS', 'Palette', '#22d3ee', pair('Consistent visual styles, responsive layouts and refinements to spacing, typography and shapes.', 'Estilos consistentes, layouts responsivos y ajustes de espaciado, tipografía y formas.'), ['Design tokens', 'Responsive layouts', 'UI consistency', 'Visual iteration'], projects('Como Caído del Cielo', 'TripFlow CR', 'Romántico Apartamento', 'White City Liberia')),
      skill('next-intl', 'Languages', '#facc15', pair('English, Spanish and French experiences with localized content and navigation.', 'Experiencias en inglés, español y francés con contenido y navegación localizados.'), ['EN / ES / FR', 'Localized routing', 'Translation checks', 'Locale-aware content'], whiteCity),
      skill(pair('Mobile UX', 'UX móvil'), 'Smartphone', '#ec4899', pair('Mobile navigation, property filters, booking forms and galleries adapted to small screens.', 'Navegación móvil, filtros de propiedades, formularios de reserva y galerías adaptados a pantallas pequeñas.'), [pair('Touch interactions', 'Interacción táctil'), pair('Form hierarchy', 'Jerarquía de formularios'), pair('Readable layouts', 'Layouts legibles')], projects('Roomiefy', 'Como Caído del Cielo', 'White City Liberia')),
    ],
  },
  {
    id: 'backend', title: pair('BACKEND & INTEGRATIONS', 'BACKEND E INTEGRACIONES'), orbitIndex: 1, orbitColor: '#4ade80',
    skills: [
      skill(pair('Payment APIs', 'APIs de pago'), 'CreditCard', '#4ade80', pair('PayPal and ONVO flows with deposits and refunds in White City; Stripe checkout in test mode for TripFlow CR.', 'Flujos de PayPal y ONVO con anticipos y devoluciones en White City; checkout de Stripe en modo de prueba para TripFlow CR.'), ['PayPal', 'ONVO', 'Stripe', pair('20% deposit', 'Anticipo del 20%'), pair('Reconciliation', 'Conciliación')], projects('White City Liberia', 'TripFlow CR')),
      skill('Webhooks', 'Webhook', '#c084fc', pair('Verify payment provider events and connect chat assistants to n8n workflows.', 'Verificar eventos de proveedores de pago y conectar asistentes de chat con flujos de n8n.'), [pair('Provider verification', 'Verificación del proveedor'), 'Idempotency', pair('Retries', 'Reintentos'), pair('Refund states', 'Estados de devolución')], projects('TripFlow CR', 'Como Caído del Cielo', 'White City Liberia')),
      skill('Zod', 'ShieldCheck', '#fb923c', pair('Validate admin forms, Server Actions and API requests with schemas for each business domain.', 'Validar formularios administrativos, Server Actions y solicitudes de API con esquemas por dominio de negocio.'), [pair('Input schemas', 'Esquemas de entrada'), pair('Server validation', 'Validación en servidor'), pair('Error handling', 'Manejo de errores')], projects('Como Caído del Cielo', 'TripFlow CR', 'BarberHub', 'White City Liberia')),
      skill('Resend', 'Mail', '#e5e7eb', pair('Transactional emails for reservation verification codes and secure links to customer quote history.', 'Correos transaccionales con códigos para verificar reservas y enlaces seguros al historial de cotizaciones.'), [pair('Transactional email', 'Correo transaccional'), pair('Private links', 'Enlaces privados'), pair('Localized notifications', 'Notificaciones localizadas')], projects('Como Caído del Cielo', 'White City Liberia')),
      skill('Node.js / Express', 'Server', '#22c55e', pair('REST APIs with authentication, roles and calendar integrations, plus web adapters for conversational assistants.', 'APIs REST con autenticación, roles e integraciones de calendario, además de adaptadores web para asistentes conversacionales.'), ['REST APIs', 'JWT', 'RBAC', 'Google Calendar'], projects('BarberHub', 'Salon Bot')),
    ],
  },
  {
    id: 'databases', title: pair('DATA & BUSINESS RULES', 'DATOS Y REGLAS DE NEGOCIO'), orbitIndex: 2, orbitColor: '#818cf8',
    skills: [
      skill('PostgreSQL', 'Database', '#818cf8', pair('Relational models and migrations for business applications, transactional booking rules and spatial queries with PostGIS.', 'Modelos relacionales y migraciones para aplicaciones de negocio, reglas transaccionales de reservas y consultas espaciales con PostGIS.'), ['SQL migrations', 'Transactions', 'Exclusion constraints', 'Version checks', 'PostGIS'], projects('BarberHub', 'TripFlow CR', 'Geospatial Database ITCR', 'White City Liberia')),
      skill('Supabase', 'Database', '#4ade80', pair('Authentication, application data and server functions for travel platforms, venue administration and workshop management.', 'Autenticación, datos y funciones de servidor para plataformas de viajes, administración de espacios y gestión de talleres.'), ['Auth', 'SQL RPC', 'Database migrations', 'Cron', 'Edge Functions'], projects('Como Caído del Cielo', 'TripFlow CR', 'Vehicle Repair Manager', 'White City Liberia')),
      skill(pair('Concurrency', 'Concurrencia'), 'GitMerge', '#facc15', pair('Booking consistency through temporary holds and versions, distributed task queues and synchronized counters in parallel queries.', 'Consistencia de reservas con apartados temporales y versiones, colas de tareas distribuidas y contadores sincronizados en consultas paralelas.'), [pair('Temporary holds', 'Apartados temporales'), pair('Resource locking', 'Bloqueo de recursos'), pair('Optimistic versioning', 'Versionado optimista'), 'Leases'], projects('White City Liberia', 'Distributed Image Processing', 'Parallel Voter Registry Queries')),
      skill('Prisma', 'Layers', '#38bdf8', pair('Typed data access and schema migrations in the BarberHub management API.', 'Acceso tipado a datos y migraciones de esquema en la API de gestión BarberHub.'), ['ORM', 'Schema', 'Migrations', 'PostgreSQL'], projects('BarberHub')),
    ],
  },
  {
    id: 'delivery', title: pair('QUALITY & DELIVERY', 'CALIDAD Y ENTREGA'), orbitIndex: 3, orbitColor: '#fb923c',
    skills: [
      skill('Playwright', 'ShieldCheck', '#4ade80', pair('Tests for quotes, payment flows, mobile interactions, SEO and consent; database tests with PGlite.', 'Pruebas de cotizaciones, pagos, interacción móvil, SEO y consentimiento; pruebas de base de datos con PGlite.'), ['E2E', 'Mobile interactions', 'SQL regression', 'PGlite'], whiteCity),
      skill('SEO', 'Search', '#38bdf8', pair('Localized metadata, canonical URLs, hreflang, sitemaps and structured data.', 'Metadata localizada, URLs canónicas, hreflang, sitemaps y datos estructurados.'), ['Metadata', 'Canonical', 'hreflang', 'JSON-LD'], whiteCity),
      skill('Vercel', 'Triangle', '#e5e7eb', pair('Deployments of React and Next.js applications, with environment configuration for their integrations.', 'Despliegues de aplicaciones React y Next.js, con configuración de entorno para sus integraciones.'), ['Deployments', 'Domains', 'Environment variables', 'Build validation'], projects('Como Caído del Cielo', 'TripFlow CR', 'Chess vs IA', 'Romántico Apartamento', 'White City Liberia')),
      skill('Git', 'GitBranch', '#fb923c', pair('Version control across feature development, fixes, reviews and releases.', 'Control de versiones durante desarrollo de funcionalidades, correcciones, revisiones y publicaciones.'), ['Commits', 'Branches', 'Diff review', 'GitHub']),
      skill(pair('AI-assisted development', 'Desarrollo con IA'), 'Sparkles', '#c084fc', pair('Define requirements, guide implementation, review edge cases and validate generated changes.', 'Definir requisitos, guiar la implementación, revisar casos límite y validar los cambios generados.'), [pair('Requirements', 'Requisitos'), pair('Code review', 'Revisión de código'), pair('UI iteration', 'Iteración de UI'), pair('Validation', 'Validación')], projects('TripFlow CR', 'White City Liberia')),
    ],
  },
  {
    id: 'github', title: pair('PROGRAMMING & GITHUB', 'PROGRAMACIÓN Y GITHUB'), orbitIndex: 4, orbitColor: '#a5b4fc',
    skills: [
      skill('TypeScript', 'FileCode', '#38bdf8', pair('Typed models for properties, vehicles, itineraries and API contracts across web applications.', 'Modelos tipados de propiedades, vehículos, itinerarios y contratos de API en aplicaciones web.'), ['Interfaces', 'Union types', 'API contracts', 'Type checking'], projects('Housing Projects Catalog', 'Vehicle Repair Manager', 'TripFlow CR', 'White City Liberia')),
      skill('JavaScript', 'Code2', '#facc15', pair('React applications, Node.js services and integration workflows across public projects.', 'Aplicaciones React, servicios Node.js y flujos de integración en proyectos públicos.'), ['Modules', 'Async / await', 'React', 'Node.js'], projects('Chess vs IA', 'Roomiefy', 'Salon Bot', 'Josue Chat')),
      skill('Python', 'Code', '#3b82f6', pair('Computer vision, distributed image processing and geospatial export scripts.', 'Visión artificial, procesamiento distribuido de imágenes y scripts de exportación de datos geoespaciales.'), ['OpenCV', 'Face recognition', 'QGIS', 'Geospatial data'], projects('Face Attendance & Emotion Alert', 'Distributed Image Processing', 'Geospatial Database ITCR')),
      skill('Go', 'Cpu', '#22d3ee', pair('Desktop image annotation application using the Fyne interface library.', 'Aplicación de escritorio para añadir texto a imágenes con la biblioteca Fyne.'), ['Fyne', 'Desktop UI', 'Image processing'], projects('AddTexto to Image')),
      skill('Docker', 'Box', '#60a5fa', pair('Container-based setup in backend and distributed systems projects.', 'Configuración con contenedores en proyectos backend y de sistemas distribuidos.'), ['Containers', 'Docker Compose', 'Backend setup'], projects('Salon Bot', 'Roomiefy', 'Distributed Image Processing')),
    ],
  },
];

export const ALSO_FAMILIAR_WITH = ['C++', 'C#', 'Java', 'Spring Boot', 'Redis', 'PostGIS', 'QGIS', 'OpenCV', 'Stockfish', 'Web Workers'];
