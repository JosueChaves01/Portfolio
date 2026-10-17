const whiteCity = { en: 'Applied in White City Liberia', es: 'Aplicado en White City Liberia' };
const github = { en: 'GitHub project experience', es: 'Experiencia en proyectos de GitHub' };
const pair = (en, es) => ({ en, es });
const skill = (name, icon, color, summary, concepts, evidence = whiteCity) => ({ name, icon, color, summary, concepts, evidence });

export const SKILLS_CATEGORIES = [
  {
    id: 'frontend', title: pair('FRONTEND & EXPERIENCE', 'FRONTEND Y EXPERIENCIA'), orbitIndex: 0, orbitColor: '#08b5e6',
    skills: [
      skill('Next.js', 'Globe', '#38bdf8', pair('Public and administrative pages built with App Router, localized routes and server-side APIs.', 'Páginas públicas y administrativas con App Router, rutas localizadas y APIs del servidor.'), ['App Router', 'Route Handlers', 'Server Components', 'Metadata']),
      skill('React', 'Atom', '#08b5e6', pair('Reusable components and hooks for forms, galleries, selectors and administrative workflows.', 'Componentes y hooks reutilizables para formularios, galerías, selectores y flujos administrativos.'), ['Components', 'Hooks', 'State management', 'Form interactions']),
      skill('Tailwind CSS', 'Palette', '#22d3ee', pair('Consistent visual styles, responsive layouts and refinements to spacing, typography and shapes.', 'Estilos consistentes, layouts responsivos y ajustes de espaciado, tipografía y formas.'), ['Design tokens', 'Responsive layouts', 'UI consistency', 'Visual iteration']),
      skill('next-intl', 'Languages', '#facc15', pair('English, Spanish and French experiences with localized content and navigation.', 'Experiencias en inglés, español y francés con contenido y navegación localizados.'), ['EN / ES / FR', 'Localized routing', 'Translation checks', 'Locale-aware content']),
      skill(pair('Mobile UX', 'UX móvil'), 'Smartphone', '#ec4899', pair('Booking forms, destination selectors and gallery controls reviewed on mobile.', 'Formularios de reserva, selectores de destinos y controles de galería revisados en móvil.'), [pair('Touch interactions', 'Interacción táctil'), pair('Form hierarchy', 'Jerarquía de formularios'), pair('Readable layouts', 'Layouts legibles')]),
    ],
  },
  {
    id: 'backend', title: pair('BACKEND & INTEGRATIONS', 'BACKEND E INTEGRACIONES'), orbitIndex: 1, orbitColor: '#4ade80',
    skills: [
      skill(pair('Payment APIs', 'APIs de pago'), 'CreditCard', '#4ade80', pair('PayPal and ONVO integration with full payments, deposits and explicit refund states.', 'Integración de PayPal y ONVO con pagos completos, anticipos y estados explícitos de devolución.'), ['PayPal', 'ONVO', pair('20% deposit', 'Anticipo del 20%'), pair('Reconciliation', 'Conciliación')]),
      skill('Webhooks', 'Webhook', '#c084fc', pair('Authenticate provider events and handle repeated, delayed or interrupted operations.', 'Autenticar eventos de proveedores y manejar operaciones repetidas, tardías o interrumpidas.'), [pair('Provider verification', 'Verificación del proveedor'), 'Idempotency', pair('Retries', 'Reintentos'), pair('Refund states', 'Estados de devolución')]),
      skill('Zod', 'ShieldCheck', '#fb923c', pair('Validate quote, booking and partner request inputs at the API boundary.', 'Validar datos de cotizaciones, reservas y alianzas al recibir solicitudes en la API.'), [pair('Input schemas', 'Esquemas de entrada'), pair('Server validation', 'Validación en servidor'), pair('Error handling', 'Manejo de errores')]),
      skill('Resend', 'Mail', '#e5e7eb', pair('Transactional emails and secure links to customer quote history.', 'Correos transaccionales y enlaces seguros al historial de cotizaciones del cliente.'), [pair('Transactional email', 'Correo transaccional'), pair('Private links', 'Enlaces privados'), pair('Localized notifications', 'Notificaciones localizadas')]),
      skill('Node.js / Express', 'Server', '#22c55e', pair('BarberHub API with authentication, role-based access, appointments and Google Calendar integration.', 'API BarberHub con autenticación, acceso por roles, citas e integración con Google Calendar.'), ['REST APIs', 'JWT', 'RBAC', 'Google Calendar'], github),
    ],
  },
  {
    id: 'databases', title: pair('DATA & BUSINESS RULES', 'DATOS Y REGLAS DE NEGOCIO'), orbitIndex: 2, orbitColor: '#818cf8',
    skills: [
      skill('PostgreSQL', 'Database', '#818cf8', pair('Migrations and transactional reservation logic with protection against overlapping bookings.', 'Migraciones y lógica transaccional de reservas con protección ante solapamientos.'), ['SQL migrations', 'Transactions', 'Exclusion constraints', 'Version checks']),
      skill('Supabase', 'Database', '#4ade80', pair('Application data, authentication, SQL procedures and scheduled payment reconciliation.', 'Datos de la aplicación, autenticación, procedimientos SQL y conciliación programada de pagos.'), ['Auth', 'SQL RPC', 'Database migrations', 'Cron']),
      skill(pair('Concurrency', 'Concurrencia'), 'GitMerge', '#facc15', pair('Temporary holds, price versions and operation leases keep booking and payment transitions consistent.', 'Apartados temporales, versiones de precios y leases para mantener consistentes reservas y pagos.'), [pair('Temporary holds', 'Apartados temporales'), pair('Resource locking', 'Bloqueo de recursos'), pair('Optimistic versioning', 'Versionado optimista'), 'Leases']),
      skill('Prisma', 'Layers', '#38bdf8', pair('Typed data access and schema migrations in the BarberHub management API.', 'Acceso tipado a datos y migraciones de esquema en la API de gestión BarberHub.'), ['ORM', 'Schema', 'Migrations', 'PostgreSQL'], github),
    ],
  },
  {
    id: 'delivery', title: pair('QUALITY & DELIVERY', 'CALIDAD Y ENTREGA'), orbitIndex: 3, orbitColor: '#fb923c',
    skills: [
      skill('Playwright', 'ShieldCheck', '#4ade80', pair('Tests for quotes, payment flows, mobile interactions, SEO and consent; database tests with PGlite.', 'Pruebas de cotizaciones, pagos, interacción móvil, SEO y consentimiento; pruebas de base de datos con PGlite.'), ['E2E', 'Mobile interactions', 'SQL regression', 'PGlite']),
      skill('SEO', 'Search', '#38bdf8', pair('Localized metadata, canonical URLs, hreflang, sitemaps and structured data.', 'Metadata localizada, URLs canónicas, hreflang, sitemaps y datos estructurados.'), ['Metadata', 'Canonical', 'hreflang', 'JSON-LD']),
      skill('Vercel', 'Triangle', '#e5e7eb', pair('Application deployment with domain configuration and environment variables for integrations.', 'Despliegue de la aplicación con dominio y variables de entorno para integraciones.'), ['Deployments', 'Domains', 'Environment variables', 'Build validation']),
      skill('Git', 'GitBranch', '#fb923c', pair('Version control across feature development, fixes, reviews and releases.', 'Control de versiones durante desarrollo de funcionalidades, correcciones, revisiones y publicaciones.'), ['Commits', 'Branches', 'Diff review', 'GitHub']),
      skill(pair('AI-assisted development', 'Desarrollo con IA'), 'Sparkles', '#c084fc', pair('Define requirements, guide implementation, review edge cases and validate generated changes.', 'Definir requisitos, guiar la implementación, revisar casos límite y validar los cambios generados.'), [pair('Requirements', 'Requisitos'), pair('Code review', 'Revisión de código'), pair('UI iteration', 'Iteración de UI'), pair('Validation', 'Validación')]),
    ],
  },
  {
    id: 'github', title: pair('PROGRAMMING & GITHUB', 'PROGRAMACIÓN Y GITHUB'), orbitIndex: 4, orbitColor: '#a5b4fc',
    skills: [
      skill('TypeScript', 'FileCode', '#38bdf8', pair('Typed interfaces for booking, quote, payment and API data across the application.', 'Interfaces tipadas para reservas, cotizaciones, pagos y datos de la API.'), ['Interfaces', 'Union types', 'API contracts', 'Type checking']),
      skill('JavaScript', 'Code2', '#facc15', pair('React applications, Node.js services and integration workflows across public projects.', 'Aplicaciones React, servicios Node.js y flujos de integración en proyectos públicos.'), ['Modules', 'Async / await', 'React', 'Node.js'], github),
      skill('Python', 'Code', '#3b82f6', pair('Computer vision and geospatial projects using OpenCV, face recognition and QGIS.', 'Proyectos de visión artificial y datos geoespaciales con OpenCV, reconocimiento facial y QGIS.'), ['OpenCV', 'Face recognition', 'QGIS', 'Geospatial data'], github),
      skill('Go', 'Cpu', '#22d3ee', pair('Desktop image annotation application using the Fyne interface library.', 'Aplicación de escritorio para añadir texto a imágenes con la biblioteca Fyne.'), ['Fyne', 'Desktop UI', 'Image processing'], github),
      skill('Docker', 'Box', '#60a5fa', pair('Container-based setup in backend and distributed systems projects.', 'Configuración con contenedores en proyectos backend y de sistemas distribuidos.'), ['Containers', 'Docker Compose', 'Backend setup'], github),
    ],
  },
];

export const ALSO_FAMILIAR_WITH = ['C++', 'C#', 'Java', 'Spring Boot', 'Redis', 'PostGIS', 'QGIS', 'OpenCV', 'Stockfish', 'Web Workers'];
