// Shared, dependency-free content for the UI and the portfolio assistant.
export const PROFILE = {
  role: { en: 'Full-Stack Developer', es: 'Desarrollador Full-Stack' },
  bio: {
    en: 'I build web applications that connect design with business operations: bookings and payments, AI assistants and automations, APIs, data and real-time systems. I study Computer Engineering at ITCR and use AI to develop, review and test with clear requirements.',
    es: 'Construyo aplicaciones web que conectan el diseño con la operación de un negocio: reservas y pagos, asistentes y automatizaciones con IA, APIs, datos y sistemas en tiempo real. Estudio Ingeniería en Computadores en el ITCR y uso IA para desarrollar, revisar y probar con requisitos claros.',
  },
  about: {
    en: 'I am Josué Chaves, a Computer Engineering student at ITCR and a full-stack developer in Costa Rica. I translate business requirements into interfaces, APIs and data workflows.\n\nIn White City Liberia, I worked on the public website and the operational flows behind it: quotes, price proposals, reservations, availability, payment integrations and administration. The project also involved multilingual content, mobile usability, SEO and deployment.\n\nI work with AI throughout development: I define requirements, iterate on design, review edge cases and validate changes through code review and tests. My GitHub projects complement this work with backend APIs, databases, computer vision and AI integrations.',
    es: 'Soy Josué Chaves, estudiante de Ingeniería en Computadores en el ITCR y desarrollador full-stack en Costa Rica. Traduzco requisitos de negocio en interfaces, APIs y flujos de datos.\n\nEn White City Liberia trabajé en el sitio público y en los procesos que lo hacen funcionar: cotizaciones, propuestas de precio, reservas, disponibilidad, integraciones de pago y administración. El proyecto también incluyó contenido multilingüe, usabilidad móvil, SEO y despliegue.\n\nTrabajo con IA durante el desarrollo: defino requisitos, itero sobre el diseño, reviso casos límite y valido los cambios con revisión de código y pruebas. Mis proyectos en GitHub complementan este trabajo con APIs backend, bases de datos, visión artificial e integraciones de IA.',
  },
};

export const WHITE_CITY = {
  id: 'whitecity-liberia',
  title: 'White City Liberia',
  live: 'https://www.whitecityliberia.com',
  status: { en: 'Published website · ongoing development', es: 'Sitio publicado · desarrollo continuo' },
  category: { en: 'FEATURED CASE · BUSINESS WEB APPLICATION', es: 'CASO PRINCIPAL · APLICACIÓN WEB DE NEGOCIO' },
  summary: {
    en: 'A web application for private transportation and vehicle rentals in Guanacaste, connecting the customer experience with daily business operations.',
    es: 'Aplicación web de transporte privado y renta de vehículos en Guanacaste que conecta la experiencia del cliente con la operación diaria del negocio.',
  },
  problem: {
    en: 'Turn a service request into a clear agreement: route, availability, price, payment and confirmation, with a shared history for the customer and the team.',
    es: 'Convertir una solicitud de servicio en un acuerdo claro: ruta, disponibilidad, precio, pago y confirmación, con un historial compartido entre el cliente y el equipo.',
  },
  contribution: {
    en: 'Full-stack development and product iteration, from requirements and UI/UX to business rules, database migrations, integrations, testing and deployment, supported by AI tools.',
    es: 'Desarrollo full-stack e iteración del producto: requisitos, UI/UX, reglas de negocio, migraciones, integraciones, pruebas y despliegue, con apoyo de herramientas de IA.',
  },
  paymentNote: {
    en: 'PayPal and ONVO integrations are implemented. Their availability depends on provider credentials and the business configuration.',
    es: 'Las integraciones con PayPal y ONVO están implementadas. Su disponibilidad depende de las credenciales de cada proveedor y de la configuración del negocio.',
  },
  stack: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Supabase', 'PostgreSQL', 'next-intl', 'PayPal', 'ONVO', 'Resend', 'Playwright', 'Vercel'],
  facts: [
    { value: 'EN / ES / FR', label: { en: 'Localized experience', es: 'Experiencia multilingüe' } },
    { value: '20%', label: { en: 'Deposit workflow', es: 'Flujo de anticipo' } },
    { value: 'E2E + SQL', label: { en: 'Flow and database tests', es: 'Pruebas de flujos y datos' } },
  ],
};

export const RECENT_CAPABILITIES = [
  {
    id: 'product', icon: 'Workflow', color: '#38bdf8',
    title: { en: 'Business workflows', es: 'Flujos de negocio' },
    summary: { en: 'Translate operational needs into a usable product for customers and administrators.', es: 'Traducir necesidades operativas en un producto usable para clientes y administradores.' },
    evidence: { en: 'Quotes with price proposals, acceptance, change requests and a shared status history.', es: 'Cotizaciones con propuestas de precio, aceptación, solicitud de cambios e historial de estados.' },
    tags: ['Product thinking', 'UX', 'State workflows'],
  },
  {
    id: 'payments', icon: 'CreditCard', color: '#4ade80',
    title: { en: 'Payment integrations', es: 'Integraciones de pago' },
    summary: { en: 'Connect external providers and handle payment states beyond a successful checkout.', es: 'Conectar proveedores externos y manejar los estados de pago más allá del checkout exitoso.' },
    evidence: { en: 'PayPal and ONVO, full payment or 20% deposit, authenticated webhooks, reconciliation and refund states.', es: 'PayPal y ONVO, pago completo o anticipo del 20%, webhooks autenticados, conciliación y estados de devolución.' },
    tags: ['APIs', 'Webhooks', 'Idempotency'],
  },
  {
    id: 'data', icon: 'Database', color: '#c084fc',
    title: { en: 'Availability & data integrity', es: 'Disponibilidad e integridad' },
    summary: { en: 'Design database rules that keep reservations and operations consistent.', es: 'Diseñar reglas en la base de datos que mantengan consistentes las reservas y la operación.' },
    evidence: { en: 'Temporary holds, SQL transactions, overlapping reservation protection and version checks for concurrent edits.', es: 'Apartados temporales, transacciones SQL, protección ante reservas solapadas y versiones para cambios concurrentes.' },
    tags: ['PostgreSQL', 'Supabase', 'Concurrency'],
  },
  {
    id: 'experience', icon: 'Smartphone', color: '#facc15',
    title: { en: 'UI/UX & multilingual delivery', es: 'UI/UX y experiencia multilingüe' },
    summary: { en: 'Refine visual design and make complex forms understandable on mobile.', es: 'Refinar el diseño visual y hacer comprensibles los formularios complejos en móvil.' },
    evidence: { en: 'Responsive layouts, clearer booking forms, destination selectors, galleries and content in English, Spanish and French.', es: 'Layouts responsivos, formularios de reserva más claros, selectores de destinos, galerías y contenido en inglés, español y francés.' },
    tags: ['Tailwind CSS', 'next-intl', 'Responsive design'],
  },
  {
    id: 'delivery', icon: 'ShieldCheck', color: '#fb923c',
    title: { en: 'Validation & delivery', es: 'Validación y entrega' },
    summary: { en: 'Review edge cases and validate changes before releasing them.', es: 'Revisar casos límite y validar los cambios antes de publicarlos.' },
    evidence: { en: 'Playwright tests for payments, quotes, mobile interactions and consent; SQL migration tests, SEO checks and Vercel deployment.', es: 'Pruebas Playwright de pagos, cotizaciones, interacción móvil y consentimientos; pruebas de migraciones SQL, revisiones SEO y despliegue en Vercel.' },
    tags: ['Playwright', 'SEO', 'Vercel'],
  },
  {
    id: 'ai', icon: 'Sparkles', color: '#a5b4fc',
    title: { en: 'AI-assisted development', es: 'Desarrollo con apoyo de IA' },
    summary: { en: 'Guide AI tools with explicit requirements and evaluate their output through iteration and validation.', es: 'Guiar herramientas de IA con requisitos explícitos y evaluar sus resultados mediante iteración y validación.' },
    evidence: { en: 'Iterative UI reviews, payment-flow audits, bug reproduction, test-driven corrections and visual asset direction.', es: 'Revisiones iterativas de UI, auditorías del flujo de pagos, reproducción de errores, correcciones validadas con pruebas y dirección de recursos visuales.' },
    tags: ['Requirements', 'Code review', 'Iteration'],
  },
];

export const CURRENT_STACK = [
  { name: 'Next.js', color: '#facc15', icon: 'Globe' },
  { name: 'TypeScript', color: '#38bdf8', icon: 'FileCode' },
  { name: 'React', color: '#08b5e6', icon: 'Atom' },
  { name: 'Tailwind CSS', color: '#22d3ee', icon: 'Palette' },
  { name: 'Supabase', color: '#4ade80', icon: 'Database' },
  { name: 'PostgreSQL', color: '#818cf8', icon: 'Database' },
  { name: 'Playwright', color: '#f472b6', icon: 'ShieldCheck' },
  { name: 'Vercel', color: '#e5e7eb', icon: 'Triangle' },
];

export const PROJECT_SIGNALS = [
  { value: 'WEB', label: { en: 'PUBLISHED PROJECT', es: 'PROYECTO PUBLICADO' }, icon: 'Globe', color: '#38bdf8' },
  { value: '3', label: { en: 'SITE LANGUAGES', es: 'IDIOMAS DEL SITIO' }, icon: 'Languages', color: '#facc15' },
  { value: 'API', label: { en: 'PAYMENT INTEGRATIONS', es: 'INTEGRACIONES DE PAGO' }, icon: 'CreditCard', color: '#c084fc' },
  { value: 'QA', label: { en: 'AUTOMATED TESTS', es: 'PRUEBAS AUTOMATIZADAS' }, icon: 'ShieldCheck', color: '#4ade80' },
];
