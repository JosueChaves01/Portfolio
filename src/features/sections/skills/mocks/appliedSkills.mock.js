const pair = (en, es) => ({ en, es });

export const APPLIED_SKILLS = [
  {
    id: 'product', icon: 'Workflow', color: '#38bdf8',
    title: pair('Product & business workflows', 'Producto y flujos de negocio'),
    summary: pair('Turn requirements into clear journeys for customers and the people running a business.', 'Convertir requisitos en recorridos claros para clientes y para quienes operan un negocio.'),
    inPractice: pair('Verified reservations in Como Caído del Cielo, travel itineraries in the TripFlow CR MVP and step-by-step vehicle intake in Vehicle Repair Manager.', 'Reservas verificadas en Como Caído del Cielo, itinerarios en el MVP de TripFlow CR e ingreso de vehículos por pasos en Vehicle Repair Manager.'),
    traits: [pair('Requirements', 'Requisitos'), pair('Business rules', 'Reglas de negocio'), pair('User journeys', 'Recorridos de usuario')],
  },
  {
    id: 'integrations', icon: 'Webhook', color: '#4ade80',
    title: pair('APIs & integrations', 'APIs e integraciones'),
    summary: pair('Connect services through defined contracts, input validation and explicit operation states.', 'Conectar servicios mediante contratos definidos, validación de datos y estados explícitos de operación.'),
    inPractice: pair('Roles and Google Calendar in BarberHub API, WebSocket signaling in Josue Chat and payment integrations in White City Liberia and TripFlow CR, where Stripe runs in test mode.', 'Roles y Google Calendar en BarberHub API, señalización WebSocket en Josue Chat e integraciones de pago en White City Liberia y TripFlow CR, donde Stripe funciona en modo de prueba.'),
    traits: [pair('API contracts', 'Contratos de API'), pair('Authentication', 'Autenticación'), pair('External services', 'Servicios externos')],
  },
  {
    id: 'data', icon: 'Database', color: '#c084fc',
    title: pair('Data & concurrency', 'Datos y concurrencia'),
    summary: pair('Model information and coordinate operations to keep shared data consistent.', 'Modelar información y coordinar operaciones para mantener consistentes los datos compartidos.'),
    inPractice: pair('Spatial queries in Geospatial Database ITCR, booking constraints in White City Liberia, RabbitMQ workers in Distributed Image Processing and synchronized parallel queries in C#.', 'Consultas espaciales en Geospatial Database ITCR, restricciones de reservas en White City Liberia, workers con RabbitMQ en Distributed Image Processing y consultas paralelas sincronizadas en C#.'),
    traits: [pair('Data modeling', 'Modelado de datos'), pair('SQL queries', 'Consultas SQL'), pair('Concurrent operations', 'Operaciones concurrentes')],
  },
  {
    id: 'interfaces', icon: 'Smartphone', color: '#facc15',
    title: pair('Interfaces & user experience', 'Interfaces y experiencia de usuario'),
    summary: pair('Build reusable interfaces that make navigation, forms and interactions easier to understand.', 'Construir interfaces reutilizables que faciliten entender la navegación, los formularios y las interacciones.'),
    inPractice: pair('Mobile filters in Roomiefy, bilingual content and reduced-motion support in Romántico Apartamento, maps in Housing Projects Catalog and a non-blocking chess engine in Chess vs IA.', 'Filtros móviles en Roomiefy, contenido bilingüe y movimiento reducido en Romántico Apartamento, mapas en Housing Projects Catalog y un motor de ajedrez que no bloquea la interfaz en Chess vs IA.'),
    traits: [pair('Reusable components', 'Componentes reutilizables'), pair('Responsive design', 'Diseño responsivo'), pair('Interaction design', 'Diseño de interacción')],
  },
  {
    id: 'delivery', icon: 'ShieldCheck', color: '#fb923c',
    title: pair('Quality & delivery', 'Calidad y entrega'),
    summary: pair('Validate business rules and integrations, then prepare applications for deployment.', 'Validar reglas de negocio e integraciones y preparar las aplicaciones para su despliegue.'),
    inPractice: pair('Vitest and Testing Library in Como Caído del Cielo, Jest and Supertest in BarberHub API, Playwright and SQL tests in White City Liberia, and Azure delivery with GitHub Actions in Roomiefy.', 'Vitest y Testing Library en Como Caído del Cielo, Jest y Supertest en BarberHub API, Playwright y pruebas SQL en White City Liberia, y despliegue en Azure con GitHub Actions en Roomiefy.'),
    traits: [pair('Automated tests', 'Pruebas automatizadas'), pair('Code review', 'Revisión de código'), pair('Deployment', 'Despliegue')],
  },
  {
    id: 'automation', icon: 'Sparkles', color: '#a5b4fc',
    title: pair('AI & automation', 'IA y automatización'),
    summary: pair('Connect conversational assistants to useful actions and evaluate AI output against clear requirements.', 'Conectar asistentes conversacionales con acciones útiles y evaluar los resultados de IA con requisitos claros.'),
    inPractice: pair('n8n assistants in Como Caído del Cielo and TripFlow CR; rule-based intent detection, an LLM fallback and scheduled reminders in the Salon Bot prototype.', 'Asistentes con n8n en Como Caído del Cielo y TripFlow CR; detección de intención por reglas, respaldo de un LLM y recordatorios programados en el prototipo Salon Bot.'),
    traits: [pair('Conversational flows', 'Flujos conversacionales'), pair('Workflow automation', 'Automatización de procesos'), pair('AI-assisted development', 'Desarrollo con IA')],
  },
];
