import { WHITE_CITY, RECENT_CAPABILITIES } from '../../../../shared/data/recentWork.js';

const pair = (en, es) => ({ en, es });
const group = (label, items) => ({ label, items });

const FRONTEND = pair('Frontend', 'Frontend');
const BACKEND = pair('Backend & data', 'Backend y datos');
const UI_LIBS = pair('UI & motion', 'UI y animación');
const QUALITY = pair('Quality & delivery', 'Calidad y entrega');
const INTEGRATIONS = pair('Integrations', 'Integraciones');

export const PROJECT_CATEGORIES = [
  { id: 'web', icon: 'Globe', label: pair('Web apps', 'Apps web') },
  { id: 'backend', icon: 'Server', label: pair('APIs & backend', 'APIs y backend') },
  { id: 'ai', icon: 'Sparkles', label: pair('AI & automation', 'IA y automatización') },
  { id: 'data', icon: 'Database', label: pair('Data & GIS', 'Datos y SIG') },
  { id: 'realtime', icon: 'Network', label: pair('Real-time & distributed', 'Tiempo real y distribuidos') },
  { id: 'desktop', icon: 'Monitor', label: pair('Desktop & academic', 'Escritorio y académicos') },
];

export const PROJECTS_DATA = [
  {
    id: 'como-caido-del-cielo', categories: ['web', 'backend', 'ai'], icon: 'Sunset', color: '#fb923c',
    category: pair('WEB EXPERIENCE · RESERVATIONS · SUPABASE', 'EXPERIENCIA WEB · RESERVAS · SUPABASE'),
    title: 'Como Caído del Cielo',
    description: pair(
      'Immersive website for an experiential destination in Nicoya, Guanacaste, with terrace reservations confirmed by email code, an admin dashboard and a chat assistant connected to n8n.',
      'Sitio inmersivo para un destino experiencial en Nicoya, Guanacaste, con reservas de terrazas confirmadas por código de correo, panel administrativo y un asistente de chat conectado a n8n.',
    ),
    github: 'https://github.com/JosueChaves01/ComoCaidoDelCielo', live: 'https://como-caido-del-cielo.vercel.app',
    image: 'https://raw.githubusercontent.com/JosueChaves01/ComoCaidoDelCielo/master/reservation_page.jpeg',
    tags: ['React', 'TypeScript', 'Tailwind CSS 4', 'Framer Motion', 'Supabase', 'Edge Functions', 'n8n', 'Vitest'],
    details: {
      summary: pair(
        'A narrative website that walks visitors through every space of the venue (terraces, food truck, events, private hall and lodging) and turns that interest into a reservation. Behind it there is a reservation flow with email verification, an admin area to manage content and a chat assistant that other sections can open with prefilled questions.',
        'Un sitio narrativo que recorre cada espacio del lugar (terrazas, food truck, eventos, salón privado y hospedaje) y convierte ese interés en una reserva. Detrás hay un flujo de reservas con verificación por correo, un área administrativa para gestionar el contenido y un asistente de chat que otras secciones abren con preguntas precargadas.',
      ),
      highlights: [
        pair('Reservations confirmed with a 6-digit code sent through Resend, valid for 20 minutes.', 'Reservas confirmadas con un código de 6 dígitos enviado con Resend, válido por 20 minutos.'),
        pair('Admin dashboard protected by roles, with Zod-validated forms for events, menu, terraces and admins.', 'Panel administrativo protegido por roles, con formularios validados con Zod para eventos, menú, terrazas y administradores.'),
        pair('Chat assistant backed by an n8n webhook with interactive widgets (date picker, guest counter, quick replies).', 'Asistente de chat respaldado por un webhook de n8n con widgets interactivos (selector de fecha, contador de invitados, respuestas rápidas).'),
      ],
      status: pair('In production on Vercel. It evolved from an earlier multi-page prototype built with a feature-sliced structure and spec-driven development.', 'En producción en Vercel. Evolucionó de un prototipo multipágina anterior construido con estructura por features y desarrollo guiado por especificaciones.'),
      stack: [
        group(FRONTEND, ['React 18.3', 'TypeScript', 'Vite 6', 'React Router 7', 'React Hook Form', 'Zod 4']),
        group(UI_LIBS, ['Tailwind CSS 4.1', 'shadcn/ui + Radix', 'Motion 12', 'Embla Carousel', 'Masonry gallery', 'Sonner']),
        group(BACKEND, ['Supabase Postgres + Auth', 'Edge Functions (Deno)', 'Row Level Security', 'Resend']),
        group(QUALITY, ['Vitest', 'Testing Library', 'jsdom', 'Vercel']),
      ],
      architecture: pair(
        'Single-page app with public routes, a reservation route and a protected admin area guarded by a useAdminGuard hook. Business rules live in pure, tested functions (phone validation, totals, working days, terrace availability). Content is centralized in data files as a single source of truth, and the server side runs on Supabase Edge Functions.',
        'SPA con rutas públicas, una ruta de reservas y un área administrativa protegida por un hook useAdminGuard. Las reglas de negocio viven en funciones puras y probadas (validación de teléfono, totales, días hábiles, disponibilidad de terrazas). El contenido se centraliza en archivos de datos como única fuente de verdad y el servidor corre en Supabase Edge Functions.',
      ),
      structure: `src/
├── app/components/     # narrative sections, chat, admin
├── lib/                # supabase client, error handler, zod schemas
├── utils/              # reservation-logic.ts (+ tests)
├── data/               # airbnbData.ts, terraceNarratives.ts
└── styles/theme.css    # design tokens
supabase/functions/
├── create-reservation   ├── verify-confirmation
├── check-brute-force    ├── send-profile-otp
└── manage-admin`,
      ui: pair(
        'Dark, warm palette with gold accents defined as Tailwind 4 tokens. Glassmorphism info cards, a navbar that changes on scroll, an animated mobile menu, a sticky image narrative, a masonry gallery and sunset video backgrounds. The copy speaks like an invitation instead of a catalog.',
        'Paleta oscura y cálida con acentos dorados definida como tokens de Tailwind 4. Tarjetas de información con glassmorphism, una barra de navegación que cambia al hacer scroll, menú móvil animado, narrativa con imágenes fijas, galería masonry y videos de atardecer de fondo. El texto habla como una invitación y no como un catálogo.',
      ),
      decisions: [
        pair('Edge function brute-force protection: 5 attempts per 15 minutes, then a 1-hour IP block.', 'Protección contra fuerza bruta en una edge function: 5 intentos cada 15 minutos y luego bloqueo de la IP por 1 hora.'),
        pair('The reservation ID is emailed and the address is masked in responses, so users can resume a booking safely.', 'El ID de la reserva se envía por correo y la dirección se enmascara en las respuestas, para retomar una reserva de forma segura.'),
        pair('Row Level Security and an admin role system instead of trusting the client.', 'Row Level Security y un sistema de roles administrativos en lugar de confiar en el cliente.'),
        pair('Sections open the chat through a CustomEvent with prefilled text, keeping components decoupled.', 'Las secciones abren el chat con un CustomEvent y texto precargado, manteniendo los componentes desacoplados.'),
        pair('Zod schemas validate every admin entity at the form boundary.', 'Esquemas Zod validan cada entidad administrativa en el borde del formulario.'),
      ],
    },
  },
  {
    id: 'tripflow-cr', categories: ['web', 'backend', 'ai'], icon: 'Map', color: '#38bdf8',
    category: pair('MVP · TRAVEL · AI AGENT', 'MVP · TURISMO · AGENTE DE IA'),
    title: 'TripFlow CR',
    description: pair(
      'Costa Rica travel platform MVP where an AI agent builds itineraries from real catalog records, which users can then book and pay for with Stripe. Includes a provider panel.',
      'MVP de plataforma de viajes por Costa Rica donde un agente de IA arma itinerarios con registros reales del catálogo, que luego se pueden reservar y pagar con Stripe. Incluye panel de proveedores.',
    ),
    github: 'https://github.com/JosueChaves01/tripflow-cr', live: 'https://tripflow-cr.vercel.app',
    tags: ['Next.js 16', 'React 19', 'TypeScript', 'Supabase', 'Stripe', 'n8n', 'Zustand', 'Zod'],
    details: {
      summary: pair(
        'Users register, chat with an AI agent that proposes an itinerary using real activities, hotels, restaurants and car rentals from the database, book the items and pay with Stripe. Providers manage their offer from their own dashboard.',
        'Los usuarios se registran, conversan con un agente de IA que propone un itinerario usando actividades, hoteles, restaurantes y autos reales de la base de datos, reservan los ítems y pagan con Stripe. Los proveedores gestionan su oferta desde su propio panel.',
      ),
      highlights: [
        pair('AI itinerary grounded in real catalog IDs, so every suggestion can be booked directly.', 'Itinerario con IA basado en IDs reales del catálogo, para que cada sugerencia se pueda reservar directamente.'),
        pair('Server Actions with Zod validation per feature.', 'Server Actions con validación Zod por feature.'),
        pair('Bilingual interface (EN / ES).', 'Interfaz bilingüe (EN / ES).'),
      ],
      status: pair('MVP deployed on Vercel. Payments run in Stripe test mode and some provider queries are still being refined.', 'MVP desplegado en Vercel. Los pagos corren en modo de prueba de Stripe y algunas consultas de proveedores todavía se están refinando.'),
      stack: [
        group(FRONTEND, ['Next.js 16 (App Router)', 'React 19', 'TypeScript 5', 'Zustand 5', 'React Hook Form + Zod 4', 'react-markdown']),
        group(UI_LIBS, ['Tailwind CSS 4', 'Tailwind Typography', 'clsx + tailwind-merge', 'lucide-react']),
        group(BACKEND, ['Supabase SSR auth', 'Postgres migrations + triggers', 'Server Actions', 'API routes']),
        group(INTEGRATIONS, ['Stripe + webhooks', 'n8n AI agent', 'Google Maps types']),
      ],
      architecture: pair(
        'Route groups separate authentication from the platform, and every domain lives in its own feature folder with its Server Actions. Shared UI primitives sit in one place and a single Zustand store is split into slices.',
        'Los route groups separan la autenticación de la plataforma y cada dominio vive en su propia carpeta de feature con sus Server Actions. Los componentes base de UI están centralizados y un único store de Zustand se divide en slices.',
      ),
      structure: `app/
├── (auth)/login, register
├── (platform)/dashboard, itinerary, booking, checkout
├── provider/dashboard
└── api/bookings, payments, chat/n8n, webhooks/stripe
src/features/
├── auth  ├── bookings  ├── catalog
├── itinerary  ├── payments  └── providers   # each with actions.ts`,
      ui: pair(
        'Custom UI primitives (Button, Input, Card, Badge, Modal, Spinner) built with Tailwind 4 and a cn() helper, without a component library. Detail pages for hotels, restaurants, cars and activities share a booking widget.',
        'Componentes base propios (Button, Input, Card, Badge, Modal, Spinner) construidos con Tailwind 4 y un helper cn(), sin librería de componentes. Las páginas de detalle de hoteles, restaurantes, autos y actividades comparten un widget de reserva.',
      ),
      decisions: [
        pair('The chat route injects a system prompt that forces the agent to query Supabase and return real UUIDs inside a structured block, which the app parses to enable booking.', 'La ruta del chat inyecta un prompt de sistema que obliga al agente a consultar Supabase y devolver UUIDs reales en un bloque estructurado, que la app interpreta para habilitar la reserva.'),
        pair('Cookie-based Supabase SSR auth with middleware protecting dashboard, itinerary, booking and checkout. Tokens never go to localStorage.', 'Autenticación SSR de Supabase con cookies y middleware que protege dashboard, itinerario, reservas y checkout. Los tokens nunca van a localStorage.'),
        pair('The Stripe webhook verifies the signature before confirming a booking on payment_intent.succeeded.', 'El webhook de Stripe verifica la firma antes de confirmar una reserva con payment_intent.succeeded.'),
        pair('Built with a documented multi-agent AI workflow (AGENTS.md) that fixes conventions such as Server Actions and RHF + Zod.', 'Construido con un flujo documentado de varios agentes de IA (AGENTS.md) que fija convenciones como Server Actions y RHF + Zod.'),
      ],
    },
  },
  {
    id: 'salon-bot', categories: ['ai', 'backend'], icon: 'Bot', color: '#4ade80',
    category: pair('AUTOMATION · WHATSAPP · LANGGRAPH', 'AUTOMATIZACIÓN · WHATSAPP · LANGGRAPH'),
    title: 'Salon Bot',
    description: pair(
      'WhatsApp assistant for a beauty salon that books, cancels and reschedules appointments, sells products and sends reminders, using rule-based NLP with an LLM fallback.',
      'Asistente de WhatsApp para un salón de belleza que agenda, cancela y reprograma citas, vende productos y envía recordatorios, usando NLP basado en reglas con respaldo de un LLM.',
    ),
    github: 'https://github.com/JosueChaves01/salon-bot', live: null,
    tags: ['Node.js', 'WhatsApp', 'LangGraph', 'OpenRouter', 'Express', 'node-cron', 'Docker', 'Railway'],
    details: {
      summary: pair(
        'A conversational assistant that handles the daily operation of a salon over WhatsApp: booking, checking, cancelling and rescheduling appointments, service and price information, product sales, reminders 15 minutes before each appointment and stylist notifications. It also serves a small web chat and an agenda dashboard.',
        'Un asistente conversacional que atiende la operación diaria de un salón por WhatsApp: agendar, consultar, cancelar y reprogramar citas, información de servicios y precios, venta de productos, recordatorios 15 minutos antes de cada cita y avisos a la estilista. También ofrece un chat web y un panel de agenda.',
      ),
      status: pair('Prototype deployed with Docker on Railway. Data is stored in JSON files, suited to a single instance.', 'Prototipo desplegado con Docker en Railway. Los datos se guardan en archivos JSON, pensado para una sola instancia.'),
      stack: [
        group(BACKEND, ['Node.js 22 (ESM)', 'Express 5', 'JSON file storage', 'node-cron']),
        group(INTEGRATIONS, ['whatsapp-web.js (Puppeteer)', 'LangGraph StateGraph', 'LangChain + OpenRouter']),
        group(QUALITY, ['Docker (system Chromium)', 'Railway', 'Nixpacks alternative']),
      ],
      architecture: pair(
        'Layered, hexagonal-style design: adapters for WhatsApp and web, an application layer with a LangGraph state graph and workflows for booking, cancellation and products, a domain layer with entities and an appointment service for slot generation, and infrastructure for storage, the LLM client and the reminder scheduler.',
        'Diseño por capas de estilo hexagonal: adaptadores para WhatsApp y web, una capa de aplicación con un grafo de estados de LangGraph y flujos de reserva, cancelación y productos, una capa de dominio con entidades y un servicio de citas que genera horarios, e infraestructura para almacenamiento, cliente del LLM y programador de recordatorios.',
      ),
      structure: `src/
├── adapters/        # whatsapp, web
├── application/     # salonGraph.js, workflows, intent router
├── domain/          # Appointment, Client, Order, Product, services
├── infrastructure/  # json db, OpenRouter client, cron scheduler
└── NLP/             # fuzzy matching, Spanish date parsing`,
      ui: pair('A plain HTML, CSS and JavaScript web chat and agenda dashboard, since the main interface is WhatsApp.', 'Un chat web y un panel de agenda en HTML, CSS y JavaScript simples, ya que la interfaz principal es WhatsApp.'),
      decisions: [
        pair('Hybrid intent detection: ordered keyword rules run first and an LLM classifier with JSON output is only the fallback, which keeps cost and latency low.', 'Detección de intención híbrida: primero corren reglas de palabras clave ordenadas y un clasificador LLM con salida JSON solo actúa como respaldo, manteniendo bajos el costo y la latencia.'),
        pair('Hand-written Levenshtein fuzzy matching and accent normalization for Spanish messages with typos.', 'Coincidencia difusa con Levenshtein propia y normalización de acentos para mensajes en español con errores.'),
        pair('A per-phone conversation graph with memory and a reset command.', 'Un grafo de conversación por número con memoria y un comando para reiniciar.'),
        pair('Reminders run every minute and store a flag so a message is never sent twice.', 'Los recordatorios corren cada minuto y guardan una marca para no enviar un mensaje dos veces.'),
        pair('The container installs system Chromium and clears stale browser locks before starting, so restarts on Railway recover cleanly.', 'El contenedor instala Chromium del sistema y limpia bloqueos viejos del navegador antes de iniciar, para que los reinicios en Railway se recuperen bien.'),
      ],
    },
  },
  {
    id: WHITE_CITY.id, categories: ['web', 'backend', 'data'], icon: 'Car', color: '#f8fafc',
    category: pair('BUSINESS WEB APP · BOOKINGS · PAYMENTS', 'APP WEB DE NEGOCIO · RESERVAS · PAGOS'),
    title: WHITE_CITY.title,
    description: WHITE_CITY.summary,
    github: null, live: WHITE_CITY.live,
    tags: WHITE_CITY.stack,
    details: {
      summary: WHITE_CITY.problem,
      highlights: RECENT_CAPABILITIES.map(({ evidence }) => evidence),
      status: WHITE_CITY.paymentNote,
      stack: [
        group(FRONTEND, ['Next.js', 'TypeScript', 'next-intl (EN / ES / FR)']),
        group(UI_LIBS, ['Tailwind CSS']),
        group(BACKEND, ['Supabase', 'PostgreSQL', 'SQL migrations', 'Zod']),
        group(INTEGRATIONS, ['PayPal', 'ONVO', 'Resend', 'Webhooks']),
        group(QUALITY, ['Playwright', 'PGlite', 'Vercel']),
      ],
      architecture: WHITE_CITY.contribution,
      ui: pair('Mobile-first booking forms, destination selectors and galleries, reviewed in English, Spanish and French with localized SEO metadata.', 'Formularios de reserva, selectores de destino y galerías pensados para móvil, revisados en inglés, español y francés con metadata SEO localizada.'),
      decisions: [
        pair('Quotes move through explicit states (proposal, acceptance, change request) with a shared history for the customer and the team.', 'Las cotizaciones avanzan por estados explícitos (propuesta, aceptación, solicitud de cambios) con un historial compartido entre el cliente y el equipo.'),
        pair('Full payment or a 20% deposit, with authenticated webhooks, reconciliation and explicit refund states.', 'Pago completo o anticipo del 20%, con webhooks autenticados, conciliación y estados explícitos de devolución.'),
        pair('Temporary holds, price versions and database constraints prevent overlapping bookings.', 'Apartados temporales, versiones de precio y restricciones en la base de datos evitan reservas solapadas.'),
        pair('Flows and SQL rules are covered by Playwright and database regression tests.', 'Los flujos y las reglas SQL están cubiertos con Playwright y pruebas de regresión de base de datos.'),
      ],
    },
  },
  {
    id: 'barber-control-api', categories: ['backend', 'data'], icon: 'Scissors', color: '#ec4899',
    category: pair('BACKEND · AUTH · APPOINTMENTS', 'BACKEND · AUTENTICACIÓN · CITAS'),
    title: 'BarberHub API',
    description: pair(
      'Multi-tenant REST API for barbershops with organizations, barbers, clients, appointments, notifications and Google Calendar sync, built as a layered TypeScript service.',
      'API REST multi-organización para barberías con organizaciones, barberos, clientes, citas, notificaciones y sincronización con Google Calendar, construida como un servicio TypeScript por capas.',
    ),
    github: 'https://github.com/JosueChaves01/barber-control-api', live: null,
    tags: ['TypeScript', 'Express', 'Prisma', 'PostgreSQL', 'JWT', 'Zod', 'Jest', 'Swagger'],
    details: {
      summary: pair(
        'A backend that centralizes barbershop management for several organizations. It handles users with local or Google sign-in, barbers, clients and appointments with explicit states, typed notifications and two-way calendar events.',
        'Un backend que centraliza la gestión de barberías para varias organizaciones. Maneja usuarios con acceso local o con Google, barberos, clientes y citas con estados explícitos, notificaciones tipadas y eventos de calendario.',
      ),
      status: pair('Backend only. Rate limiting is configured but disabled during development.', 'Solo backend. El rate limiting está configurado pero desactivado durante el desarrollo.'),
      stack: [
        group(BACKEND, ['Node 18 + TypeScript 5', 'Express 4', 'Prisma 5', 'PostgreSQL 15 (Docker)']),
        group(pair('Security', 'Seguridad'), ['JWT + refresh tokens', 'bcrypt', 'Helmet', 'CORS', 'Zod 3']),
        group(INTEGRATIONS, ['Google OAuth', 'Google Calendar API', 'Swagger / OpenAPI']),
        group(QUALITY, ['Jest + ts-jest', 'Supertest', 'Winston + Morgan', 'ESLint + Prettier']),
      ],
      architecture: pair(
        'Classic layered API: routes call controllers, controllers call services and services use repositories over Prisma. Cross-cutting concerns live in middleware (auth, authorization, validation, errors), and path aliases keep imports clean in both runtime and tests.',
        'API por capas clásica: las rutas llaman a controladores, los controladores a servicios y los servicios usan repositorios sobre Prisma. Las responsabilidades transversales viven en middleware (autenticación, autorización, validación, errores) y los path aliases mantienen limpios los imports en ejecución y en pruebas.',
      ),
      structure: `src/
├── routes/ → controllers/ → services/ → repositories/
├── middleware/   # auth, authorize, validate, errorHandler
├── validators/   # zod schema per domain
├── config/       # database, jwt, google, swagger
└── utils/        # errors, jwt, logger, password
prisma/schema.prisma   # User, Organization, Barber, Client, Appointment…`,
      decisions: [
        pair('Short-lived access tokens (15 min) with persisted refresh tokens (7 days).', 'Tokens de acceso de corta duración (15 min) con refresh tokens persistidos (7 días).'),
        pair('Role-based access with SUPERADMIN, ADMIN, BARBER and CLIENT through an authorizeRoles middleware.', 'Acceso por roles con SUPERADMIN, ADMIN, BARBER y CLIENT mediante un middleware authorizeRoles.'),
        pair('One Zod validation middleware covers body, query and params for every route.', 'Un solo middleware de validación con Zod cubre body, query y params en cada ruta.'),
        pair('Appointment states (pending, confirmed, completed, cancelled) modeled as enums in the schema.', 'Estados de cita (pendiente, confirmada, completada, cancelada) modelados como enums en el esquema.'),
        pair('API documentation served at /api-docs from an OpenAPI definition.', 'Documentación de la API servida en /api-docs desde una definición OpenAPI.'),
      ],
    },
  },
  {
    id: 'chess-vs-ia', categories: ['web', 'ai'], icon: 'Crown', color: '#10b981',
    category: pair('FRONTEND · REACT · GAME ENGINE', 'FRONTEND · REACT · MOTOR DE JUEGO'),
    title: 'Chess vs IA',
    description: pair(
      'Browser chess game against a client-side Stockfish engine running in a Web Worker, with difficulty levels, clock, move history and full game-end detection.',
      'Ajedrez en el navegador contra el motor Stockfish ejecutado en un Web Worker, con niveles de dificultad, reloj, historial de jugadas y detección completa del final de partida.',
    ),
    image: '/Chess.webp',
    github: 'https://github.com/JosueChaves01/Chess-vs-IA', live: 'https://chess-vs-ia.vercel.app/',
    tags: ['React 19', 'Redux Toolkit', 'Stockfish (WASM)', 'Web Workers', 'CSS Modules', 'Vite'],
    details: {
      summary: pair(
        'Play against another person on the same device or against Stockfish, entirely in the browser with no backend. It includes promotion, captured pieces, move history, a clock, resignation and detection of checkmate, stalemate and insufficient material.',
        'Se juega contra otra persona en el mismo dispositivo o contra Stockfish, todo en el navegador y sin backend. Incluye promoción, piezas capturadas, historial de jugadas, reloj, rendición y detección de jaque mate, ahogado y material insuficiente.',
      ),
      status: pair('Complete and deployed on Vercel.', 'Completo y desplegado en Vercel.'),
      stack: [
        group(FRONTEND, ['React 19', 'Redux Toolkit 2', 'react-redux 9', 'Vite 6']),
        group(pair('Engine', 'Motor'), ['Stockfish 16 (WASM)', 'Web Worker', 'UCI protocol']),
        group(UI_LIBS, ['CSS Modules', 'Custom font']),
      ],
      architecture: pair(
        'Feature folders for the board, game, header, history, start and summary screens. A Redux store with game, UI and AI slices plus selectors, custom hooks for the engine, timer and game end, and constants grouped by domain.',
        'Carpetas por feature para el tablero, la partida, el encabezado, el historial y las pantallas de inicio y resumen. Un store de Redux con slices de juego, UI e IA más selectores, hooks propios para el motor, el reloj y el final de partida, y constantes agrupadas por dominio.',
      ),
      structure: `src/
├── features/   # board, game, header, history, start, summary
├── store/      # game, ui, ai slices + selectors
├── hooks/      # useStockfish, useTimer, useGameEnd
├── constants/  # AI, ANIMATION, BOARD, GAME, PIECES
└── utils/chessUtils.js   # FEN generation`,
      ui: pair('Each feature owns its CSS Module, keeping board, panels and modals styled in isolation without a UI library.', 'Cada feature tiene su propio CSS Module, así el tablero, los paneles y los modales se estilizan de forma aislada sin librería de UI.'),
      decisions: [
        pair('Stockfish runs in a Web Worker and talks UCI, so the interface never blocks while the engine thinks.', 'Stockfish corre en un Web Worker y se comunica por UCI, así la interfaz nunca se bloquea mientras el motor piensa.'),
        pair('Difficulty maps to search depth: easy 3, medium 8, hard 15.', 'La dificultad se traduce en profundidad de búsqueda: fácil 3, medio 8, difícil 15.'),
        pair('Engine errors surface as state instead of failing silently.', 'Los errores del motor se muestran como estado en lugar de fallar en silencio.'),
      ],
    },
  },
  {
    id: 'roomiefy', categories: ['web', 'backend', 'realtime'], icon: 'Users', color: '#3b82f6',
    category: pair('TEAM PROJECT · REACT · AZURE', 'PROYECTO EN EQUIPO · REACT · AZURE'),
    title: 'Roomiefy',
    description: pair(
      'Team web app to find rooms and roommates, with listings, filters, profiles, chat and property publishing, backed by Azure services. I was the top contributor and also built its roommates microservice.',
      'App web en equipo para encontrar habitaciones y compañeros de cuarto, con publicaciones, filtros, perfiles, chat y publicación de propiedades, respaldada por servicios de Azure. Fui el mayor contribuidor y también construí su microservicio de roomies.',
    ),
    github: 'https://github.com/JosueChaves01/roomiefy', live: null,
    images: [
      'https://raw.githubusercontent.com/JosueChaves01/roomiefy/main/Screenshots/image-1.png',
      'https://raw.githubusercontent.com/JosueChaves01/roomiefy/main/Screenshots/image-2.png',
      'https://raw.githubusercontent.com/JosueChaves01/roomiefy/main/Screenshots/image-3.png',
    ],
    tags: ['React 19', 'Vite 7', 'Radix UI', 'Azure API Management', 'NestJS', 'Kafka', 'GitHub Actions'],
    details: {
      summary: pair(
        'A university software design project built by a team of four. The web app covers property listings with filters and pagination, roommate profiles, chat, publishing and editing properties, a profile page and a first-time welcome tour. A separate NestJS microservice handles the roommates domain.',
        'Un proyecto universitario de diseño de software hecho por un equipo de cuatro personas. La app web cubre publicaciones con filtros y paginación, perfiles de roomies, chat, publicación y edición de propiedades, página de perfil y un recorrido de bienvenida. Un microservicio NestJS separado maneja el dominio de roomies.',
      ),
      highlights: [
        pair('Top contributor of the team repository (51 commits).', 'Mayor contribuidor del repositorio del equipo (51 commits).'),
        pair('Continuous deployment to Azure Static Web Apps with GitHub Actions.', 'Despliegue continuo a Azure Static Web Apps con GitHub Actions.'),
      ],
      status: pair('Academic team project. The microservice is a scaffold with its infrastructure ready; wiring and tests were next.', 'Proyecto académico en equipo. El microservicio es una base con su infraestructura lista; lo siguiente era conectarlo y agregar pruebas.'),
      stack: [
        group(FRONTEND, ['React 19', 'Vite 7', 'React Router 7', 'Radix UI + Themes', 'date-fns', 'jwt-decode']),
        group(pair('Microservice', 'Microservicio'), ['NestJS 11', 'TypeORM + Postgres', 'KafkaJS', 'Debezium CDC', 'class-validator']),
        group(QUALITY, ['GitHub Actions', 'Azure Static Web Apps', 'Azure API Management', 'Azure Container Apps']),
      ],
      architecture: pair(
        'The frontend is organized in pages, components, an auth context that protects private routes and API services that go through Azure API Management. The roommates microservice follows hexagonal architecture: domain entities and ports, application use cases, and inbound REST plus outbound persistence and Kafka adapters.',
        'El frontend se organiza en páginas, componentes, un contexto de autenticación que protege las rutas privadas y servicios de API que pasan por Azure API Management. El microservicio de roomies sigue arquitectura hexagonal: entidades y puertos de dominio, casos de uso de aplicación y adaptadores de entrada REST y de salida a persistencia y Kafka.',
      ),
      structure: `roomiefy/src/
├── pages/      # Home, Roomies, PropertyDetail, Chat, Publish…
├── context/    # AuthContext (protected routes)
└── services/   # api.js, authenticatedApi.js → Azure APIM
RoomieMicroservice/src/
├── domain/              # entity, Email VO, events, ports
├── application/use-cases/
└── adapters/inbound/rest · outbound/typeorm · outbound/kafka`,
      ui: pair('Radix UI primitives with per-component CSS and a light/dark theme toggle. Filters are designed to work on mobile.', 'Primitivos de Radix UI con CSS por componente y cambio de tema claro/oscuro. Los filtros están pensados para funcionar en móvil.'),
      decisions: [
        pair('All requests go through Azure API Management, so the frontend never talks to services directly.', 'Todas las solicitudes pasan por Azure API Management, así el frontend nunca habla directamente con los servicios.'),
        pair('Domain events (RoomieCreated) are published to Kafka, and Debezium captures database changes.', 'Los eventos de dominio (RoomieCreated) se publican en Kafka y Debezium captura los cambios de la base de datos.'),
        pair('Multi-stage Docker image with a non-root user and a health check for Azure Container Apps.', 'Imagen Docker multietapa con usuario sin privilegios y health check para Azure Container Apps.'),
      ],
    },
  },
  {
    id: 'airbnb-nextjs-app', categories: ['web'], icon: 'House', color: '#ff5a5f',
    category: pair('NEXT.JS · LANDING · CONVERSION', 'NEXT.JS · LANDING · CONVERSIÓN'),
    title: 'Romántico Apartamento · Landing',
    description: pair(
      'Bilingual landing page for a real Airbnb listing in San Carlos, Costa Rica, with an Art Deco design system, motion, conversion tracking and a contact form.',
      'Landing bilingüe para un alojamiento real de Airbnb en San Carlos, Costa Rica, con un sistema de diseño Art Déco, animaciones, medición de conversiones y formulario de contacto.',
    ),
    image: 'https://raw.githubusercontent.com/JosueChaves01/airbnb-nextjs-app/main/public/assets/sala.webp',
    github: 'https://github.com/JosueChaves01/airbnb-nextjs-app', live: 'https://airbnb-nextjs-app-bice.vercel.app/',
    tags: ['Next.js 15', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 'Vercel Analytics', 'i18n'],
    details: {
      summary: pair(
        'A marketing page whose goal is to send visitors to the Airbnb booking. It presents the space, amenities, reviews, location and nearby places, and offers a sticky booking button, WhatsApp, phone and a contact form.',
        'Una página de marketing cuyo objetivo es llevar a los visitantes a reservar en Airbnb. Presenta el espacio, las comodidades, reseñas, ubicación y lugares cercanos, y ofrece un botón de reserva fijo, WhatsApp, teléfono y formulario de contacto.',
      ),
      status: pair('Live in production on Vercel.', 'En producción en Vercel.'),
      stack: [
        group(FRONTEND, ['Next.js 15 (App Router)', 'React 18', 'TypeScript 5', 'next/font']),
        group(UI_LIBS, ['Tailwind CSS 3.4', 'Framer Motion 11', 'Lightbox', 'WebP images']),
        group(INTEGRATIONS, ['Vercel Analytics', 'Speed Insights', 'Formspree']),
      ],
      architecture: pair(
        'One component per page section, reusable motion components (Reveal, CountUp, ScrollProgress) and all content stored as JSON files, so copy and photos can change without touching components.',
        'Un componente por sección de la página, componentes de animación reutilizables (Reveal, CountUp, ScrollProgress) y todo el contenido guardado en archivos JSON, para cambiar textos y fotos sin tocar componentes.',
      ),
      structure: `app/
├── sections/     # Hero, Highlights, Gallery, Amenities, Reviews,
│                 # Location, Discover, Contact, StickyBooking
├── components/   # motion/, ui/, deco/
└── lib/data/*.json   # content as data`,
      ui: pair(
        'An Art Deco design system expressed as Tailwind tokens (ink, gold, ivory, emerald, wine) mirrored as CSS variables, with Limelight, Bodoni Moda and Josefin Sans typography and decorative ornaments.',
        'Un sistema de diseño Art Déco expresado como tokens de Tailwind (tinta, oro, marfil, esmeralda, vino) reflejados como variables CSS, con tipografías Limelight, Bodoni Moda y Josefin Sans y ornamentos decorativos.',
      ),
      decisions: [
        pair('Typed conversion events for Airbnb clicks, contact submissions, WhatsApp and phone to measure what drives bookings.', 'Eventos de conversión tipados para clics a Airbnb, envíos de contacto, WhatsApp y teléfono, para medir qué genera reservas.'),
        pair('Animations respect the operating system reduced-motion preference.', 'Las animaciones respetan la preferencia de movimiento reducido del sistema operativo.'),
        pair('ES/EN switching through a t({ es, en }) helper that also updates the html lang attribute.', 'Cambio ES/EN con un helper t({ es, en }) que también actualiza el atributo lang del html.'),
      ],
    },
  },
  {
    id: 'josue-chat', categories: ['realtime', 'web'], icon: 'MessageSquare', color: '#06b6d4',
    category: pair('REAL-TIME · WEBRTC · WEBSOCKETS', 'TIEMPO REAL · WEBRTC · WEBSOCKETS'),
    title: 'Josue Chat · Client & Signaling Server',
    description: pair(
      'Discord-style chat with text channels, user list and peer-to-peer voice and video over WebRTC, backed by a WebSocket signaling server. Both deploy to Azure.',
      'Chat estilo Discord con canales de texto, lista de usuarios y voz y video entre pares con WebRTC, respaldado por un servidor de señalización con WebSockets. Ambos se despliegan en Azure.',
    ),
    github: 'https://github.com/JosueChaves01/client_chat', live: null,
    tags: ['JavaScript', 'WebRTC', 'WebSockets', 'Node.js', 'Event Bus', 'Azure', 'GitHub Actions'],
    details: {
      summary: pair(
        'A browser client without frameworks that offers text chat, channel switching, profiles and a voice/video channel. A separate Node.js server assigns user IDs, broadcasts presence and messages, and relays the WebRTC offer, answer and ICE candidates.',
        'Un cliente web sin frameworks que ofrece chat de texto, cambio de canales, perfiles y un canal de voz y video. Un servidor Node.js separado asigna IDs, difunde presencia y mensajes, y retransmite la oferta, respuesta y candidatos ICE de WebRTC.',
      ),
      highlights: [
        pair('Server repository: github.com/JosueChaves01/server_chat', 'Repositorio del servidor: github.com/JosueChaves01/server_chat'),
      ],
      stack: [
        group(FRONTEND, ['Vanilla JS (ES modules)', 'HTML + CSS per feature', 'WebRTC']),
        group(BACKEND, ['Node.js', 'ws 8', 'uuid', 'HTTP status endpoint']),
        group(QUALITY, ['GitHub Actions', 'Azure Web Apps']),
      ],
      architecture: pair(
        'The client is split into features (chat, voice, channels, profile, users), each with domain services and UI classes, plus an infrastructure layer for WebSockets and peer connections and a shared event bus. A composition root wires everything together.',
        'El cliente se divide en features (chat, voz, canales, perfil, usuarios), cada una con servicios de dominio y clases de UI, más una capa de infraestructura para WebSockets y conexiones entre pares y un bus de eventos compartido. Una raíz de composición conecta todo.',
      ),
      structure: `client_chat/src/
├── features/{chat,voice,channels,profile,users}/{domain,ui}
├── infrastructure/   # WebSocketManager, PeerConnectionManager,
│                     # WebRTCNegotiator, UserStore
├── shared/           # EventBus, config, logger
└── app.js            # composition root
server_chat/  server.js · signaling.js · httpServer.js`,
      decisions: [
        pair('Features communicate through a pub/sub event bus instead of importing each other.', 'Las features se comunican con un bus de eventos pub/sub en lugar de importarse entre sí.'),
        pair('Media handling is separated from WebRTC negotiation, with a queue for early ICE candidates.', 'El manejo de medios está separado de la negociación WebRTC, con una cola para candidatos ICE tempranos.'),
        pair('The server keeps connections alive with a 30-second ping/pong heartbeat.', 'El servidor mantiene las conexiones con un heartbeat ping/pong cada 30 segundos.'),
        pair('Configuration switches automatically between local ws:// and production wss://.', 'La configuración cambia automáticamente entre ws:// local y wss:// en producción.'),
      ],
    },
  },
  {
    id: 'sistema-distribuido', categories: ['realtime', 'backend'], icon: 'Network', color: '#a78bfa',
    category: pair('DISTRIBUTED SYSTEMS · PYTHON · RABBITMQ', 'SISTEMAS DISTRIBUIDOS · PYTHON · RABBITMQ'),
    title: 'Distributed Image Processing',
    description: pair(
      'Coordinator and workers on different machines process images through a RabbitMQ queue over a Tailscale network, with a React dashboard that shows workers, load and throughput.',
      'Un coordinador y workers en distintas máquinas procesan imágenes mediante una cola de RabbitMQ sobre una red Tailscale, con un dashboard en React que muestra workers, carga y rendimiento.',
    ),
    github: 'https://github.com/JosueChaves01/Sistema_Distribuido', live: null,
    tags: ['Python', 'FastAPI', 'RabbitMQ', 'Tailscale', 'React', 'Docker'],
    details: {
      summary: pair(
        'The coordinator receives image uploads, queues tasks and tracks registered workers with their resource reports. Workers consume tasks, process images and send results back, while the dashboard polls status, queue size and tasks per second. A second repository packages the system with Docker.',
        'El coordinador recibe imágenes, encola tareas y lleva el registro de los workers con sus reportes de recursos. Los workers consumen tareas, procesan imágenes y devuelven resultados, mientras el dashboard consulta el estado, el tamaño de la cola y las tareas por segundo. Un segundo repositorio empaqueta el sistema con Docker.',
      ),
      status: pair('Academic prototype that relies on manually configured network addresses.', 'Prototipo académico que depende de direcciones de red configuradas manualmente.'),
      stack: [
        group(BACKEND, ['Python', 'FastAPI + uvicorn', 'pika / aio_pika', 'psutil', 'Pillow']),
        group(FRONTEND, ['React 18', 'Vite']),
        group(QUALITY, ['RabbitMQ', 'Tailscale', 'Docker Compose']),
      ],
      architecture: pair('Master-worker architecture: one coordinator exposes registration, reporting, upload, results, queue size and throughput endpoints, and any number of workers consume from the shared queue.', 'Arquitectura maestro-worker: un coordinador expone endpoints de registro, reportes, subida, resultados, tamaño de cola y rendimiento, y cualquier cantidad de workers consume de la cola compartida.'),
      decisions: [
        pair('Workers report CPU and RAM in a background thread so the coordinator knows each node’s capacity.', 'Los workers reportan CPU y RAM en un hilo en segundo plano para que el coordinador conozca la capacidad de cada nodo.'),
        pair('Async consumers tune their prefetch count to the machine’s resources.', 'Los consumidores asíncronos ajustan su prefetch según los recursos de la máquina.'),
        pair('Tailscale creates a private network between machines in different locations.', 'Tailscale crea una red privada entre máquinas en distintas ubicaciones.'),
      ],
    },
  },
  {
    id: 'proyecto-habitacional', categories: ['web', 'data'], icon: 'Building2', color: '#22c55e',
    category: pair('FRONTEND · MAPS · REAL ESTATE', 'FRONTEND · MAPAS · BIENES RAÍCES'),
    title: 'Housing Projects Catalog',
    description: pair(
      'Catalog of housing projects and properties in Costa Rica with filters, galleries and Google Maps, plus an admin flow for construction companies to register projects.',
      'Catálogo de proyectos habitacionales y propiedades en Costa Rica con filtros, galerías y Google Maps, más un flujo administrativo para que constructoras registren sus proyectos.',
    ),
    github: 'https://github.com/JosueChaves01/Proyecto_Habitacional', live: 'https://josuechaves01.github.io/Proyecto_Habitacional/',
    tags: ['React', 'TypeScript', 'Vite', 'Google Maps API', 'shadcn/ui', 'GitHub Pages'],
    details: {
      summary: pair('Visitors browse projects and properties with filters, maps and galleries. Construction companies sign up as admins, register their company and manage projects and properties, including drawing a project area on the map.', 'Los visitantes exploran proyectos y propiedades con filtros, mapas y galerías. Las constructoras se registran como administradoras, registran su empresa y gestionan proyectos y propiedades, incluso dibujando el área del proyecto en el mapa.'),
      status: pair('Frontend prototype with mock data and browser storage; there is no backend yet.', 'Prototipo de frontend con datos de ejemplo y almacenamiento en el navegador; todavía no tiene backend.'),
      stack: [
        group(FRONTEND, ['React 18 + TypeScript', 'Vite 6 (SWC)', 'React Hook Form']),
        group(UI_LIBS, ['shadcn/ui + Radix', 'Motion', 'Embla Carousel', 'Recharts']),
        group(INTEGRATIONS, ['Google Maps (places, drawing, geometry)', 'GitHub Pages']),
      ],
      architecture: pair('Views for home, projects, project detail, property detail and map, admin and company registration components, typed property models and a GoogleMapsProvider that loads the Maps API once for the whole app.', 'Vistas de inicio, proyectos, detalle de proyecto, detalle de propiedad y mapa, componentes de administración y registro de empresas, modelos tipados de propiedades y un GoogleMapsProvider que carga la API de Maps una sola vez para toda la app.'),
      ui: pair('Price-based gradients inspired by Costa Rica: warm Guanacaste sunset tones for lower prices and forest and ocean greens for higher ones, plus decorative local elements.', 'Gradientes según el precio inspirados en Costa Rica: tonos cálidos de atardecer guanacasteco para precios bajos y verdes de bosque y océano para los altos, más elementos decorativos locales.'),
      decisions: [
        pair('Google Maps drawing tools let companies outline the area of each project.', 'Las herramientas de dibujo de Google Maps permiten a las constructoras delimitar el área de cada proyecto.'),
        pair('The maps provider skips loading when no API key is configured, so the app still works without it.', 'El proveedor de mapas no se carga si no hay una API key configurada, así la app sigue funcionando sin ella.'),
      ],
    },
  },
  {
    id: 'bd-geoespacial-itcr', categories: ['data'], icon: 'MapPin', color: '#8b5cf6',
    category: pair('DATABASE · GIS · POSTGIS', 'BASE DE DATOS · SIG · POSTGIS'),
    title: 'Geospatial Database ITCR',
    description: pair(
      'PostGIS database for ITCR that models classrooms as polygons along with courses, professors, students and schedules, with spatial queries and a QGIS project.',
      'Base de datos PostGIS para el ITCR que modela aulas como polígonos junto con cursos, profesores, estudiantes y horarios, con consultas espaciales y un proyecto de QGIS.',
    ),
    image: 'https://raw.githubusercontent.com/JosueChaves01/bd-geoespacial-itcr/main/entregables/modelo_logico.png',
    github: 'https://github.com/JosueChaves01/bd-geoespacial-itcr', live: null,
    tags: ['PostgreSQL', 'PostGIS', 'PLpgSQL', 'QGIS', 'Python'],
    details: {
      summary: pair('A course project that combines academic data with geometry: each classroom is a polygon, so the database can answer questions such as which classroom contains a given point or where a class takes place.', 'Un proyecto de curso que combina datos académicos con geometría: cada aula es un polígono, así la base de datos puede responder qué aula contiene un punto o dónde se imparte una clase.'),
      stack: [
        group(BACKEND, ['PostgreSQL', 'PostGIS', 'PLpgSQL functions']),
        group(pair('GIS & tooling', 'SIG y herramientas'), ['QGIS', 'draw.io model', 'Python export script']),
      ],
      architecture: pair('Numbered SQL scripts create the schema, load data, define query functions and add indexes, so the database can be rebuilt from scratch in order.', 'Scripts SQL numerados crean el esquema, cargan datos, definen funciones de consulta y agregan índices, para reconstruir la base de datos desde cero en orden.'),
      structure: `sql/
├── 01_create_tables.sql   # aulas.geom geometry(POLYGON, 4326)
├── 02_insert_data.sql
├── 03_consultas.sql       # ST_Contains, ST_Centroid
└── 04_indices.sql         # GiST spatial index
qgis/proyecto3.qgz`,
      decisions: [
        pair('A GiST spatial index on classroom geometry speeds up point-in-polygon lookups.', 'Un índice espacial GiST sobre la geometría de las aulas acelera las búsquedas de punto en polígono.'),
        pair('Spatial queries are wrapped in PLpgSQL functions for reuse.', 'Las consultas espaciales se encapsulan en funciones PLpgSQL para reutilizarlas.'),
        pair('Geometry uses SRID 4326 so it lines up with GPS coordinates.', 'La geometría usa SRID 4326 para coincidir con coordenadas GPS.'),
      ],
    },
  },
  {
    id: 'gestor-reparaciones-vehiculos', categories: ['web', 'backend'], icon: 'Wrench', color: '#f97316',
    category: pair('FULLSTACK · WORKSHOP MANAGEMENT', 'FULLSTACK · GESTIÓN DE TALLER'),
    title: 'Vehicle Repair Manager',
    description: pair(
      'Workshop management system for clients, vehicles, intake with a reception checklist, repair jobs and statistics, with a Supabase edge API built on Hono.',
      'Sistema de gestión para un taller mecánico con clientes, vehículos, ingreso con checklist de recepción, trabajos de reparación y estadísticas, con una API en Supabase construida con Hono.',
    ),
    github: 'https://github.com/JosueChaves01/GestorDeReparacionesDeVehiculos', live: null,
    tags: ['React', 'TypeScript', 'Supabase', 'Hono', 'shadcn/ui', 'Recharts'],
    details: {
      summary: pair('Built from a Figma design for vehicle intake. It covers registering clients and vehicles, a multi-step intake form, job states, search by license plate or order number and a statistics dashboard.', 'Construido a partir de un diseño de Figma para el ingreso de vehículos. Cubre el registro de clientes y vehículos, un formulario de ingreso por pasos, estados de los trabajos, búsqueda por placa o número de orden y un panel de estadísticas.'),
      status: pair('Prototype with technical documentation and a verification checklist in Spanish.', 'Prototipo con documentación técnica y checklist de verificación en español.'),
      stack: [
        group(FRONTEND, ['React 18 + TypeScript', 'Vite 6', 'React Hook Form']),
        group(UI_LIBS, ['shadcn/ui + Radix', 'Tailwind CSS 4', 'Recharts', 'Sonner']),
        group(BACKEND, ['Supabase Edge Function', 'Hono', 'Supabase KV store']),
      ],
      architecture: pair('A React interface with forms and views per entity talks to a single edge function that exposes REST endpoints for clients, vehicles, intakes, intake states, jobs and searches.', 'Una interfaz React con formularios y vistas por entidad se comunica con una sola edge function que expone endpoints REST de clientes, vehículos, ingresos, estados, trabajos y búsquedas.'),
      decisions: [
        pair('Hono keeps the edge API small while still offering clear routing.', 'Hono mantiene pequeña la API en el edge sin perder un enrutamiento claro.'),
        pair('Dedicated search endpoints by license plate and order number match how the workshop actually looks up jobs.', 'Endpoints dedicados de búsqueda por placa y número de orden, que coinciden con cómo el taller busca los trabajos.'),
      ],
    },
  },
  {
    id: 'face-attendance-emotion-alert', categories: ['ai', 'desktop'], icon: 'Camera', color: '#ef4444',
    category: pair('PYTHON · COMPUTER VISION · IOT', 'PYTHON · VISIÓN ARTIFICIAL · IOT'),
    title: 'Face Attendance & Emotion Alert',
    description: pair(
      'Webcam attendance system that recognizes students with Azure Face API and emails the teacher when it detects repeated signs of anger.',
      'Sistema de asistencia con cámara web que reconoce estudiantes con Azure Face API y avisa por correo al docente cuando detecta señales repetidas de enojo.',
    ),
    github: 'https://github.com/JosueChaves01/FaceAttendance_and_EmotionAlert', live: null,
    tags: ['Python', 'OpenCV', 'Azure Face API', 'Tkinter', 'SMTP'],
    details: {
      summary: pair('An IoT course project: the camera identifies enrolled students to record attendance, logs emotion readings and sends an alert when a student shows more than five strong anger readings.', 'Un proyecto de un curso de IoT: la cámara identifica a los estudiantes registrados para tomar asistencia, guarda lecturas de emociones y envía una alerta cuando un estudiante muestra más de cinco lecturas fuertes de enojo.'),
      status: pair('Academic prototype (2023). The emotion features of the cloud service it used have since been restricted by the provider.', 'Prototipo académico (2023). Las funciones de emociones del servicio en la nube que usaba fueron restringidas después por el proveedor.'),
      stack: [
        group(pair('Core', 'Base'), ['Python', 'OpenCV', 'Threading']),
        group(INTEGRATIONS, ['Azure Face API (person groups)', 'SMTP email']),
        group(UI_LIBS, ['Tkinter']),
      ],
      decisions: [
        pair('Capture and recognition run on separate threads so the interface stays responsive.', 'La captura y el reconocimiento corren en hilos separados para que la interfaz siga respondiendo.'),
        pair('An alert threshold (more than 5 readings above 0.7) avoids alarms from a single expression.', 'Un umbral de alerta (más de 5 lecturas sobre 0.7) evita alarmas por una sola expresión.'),
      ],
    },
  },
  {
    id: 'add-texto-image', categories: ['desktop'], icon: 'Image', color: '#06b6d4',
    category: pair('GO · DESKTOP · FYNE', 'GO · ESCRITORIO · FYNE'),
    title: 'AddTexto to Image',
    description: pair(
      'Go desktop app to add top and bottom text to an image with a chosen font, then save it or send it by email.',
      'App de escritorio en Go para añadir texto arriba y abajo de una imagen con la fuente elegida, y luego guardarla o enviarla por correo.',
    ),
    github: 'https://github.com/JosueChaves01/AddTextoToImage', live: null,
    tags: ['Go', 'Fyne', 'gg', 'Image Processing', 'SMTP'],
    details: {
      summary: pair('A small, complete desktop tool: pick an image, write the text, choose one of the bundled fonts, preview the result and export or email it.', 'Una herramienta de escritorio pequeña y completa: eliges una imagen, escribes el texto, seleccionas una de las fuentes incluidas, ves el resultado y lo exportas o lo envías por correo.'),
      stack: [
        group(pair('Core', 'Base'), ['Go 1.22', 'Fyne 2.4', 'fogleman/gg', 'imaging']),
        group(INTEGRATIONS, ['net/smtp', 'jordan-wright/email']),
      ],
      decisions: [
        pair('Font size adapts automatically to the image width so the text always fits.', 'El tamaño de la fuente se ajusta automáticamente al ancho de la imagen para que el texto siempre quepa.'),
        pair('Native open and save dialogs from Fyne keep the app cross-platform.', 'Los diálogos nativos de abrir y guardar de Fyne mantienen la app multiplataforma.'),
      ],
    },
  },
  {
    id: 'multiprocessing-padron', categories: ['desktop', 'data'], icon: 'Cpu', color: '#facc15',
    category: pair('C# · PARALLELISM · DATA', 'C# · PARALELISMO · DATOS'),
    title: 'Parallel Voter Registry Queries',
    description: pair(
      'C# console app that loads Costa Rica’s voter registry and runs a dozen statistical queries in parallel, measuring execution time.',
      'App de consola en C# que carga el padrón electoral de Costa Rica y ejecuta una docena de consultas estadísticas en paralelo, midiendo el tiempo de ejecución.',
    ),
    github: 'https://github.com/JosueChaves01/MultiProcessingProyect-2023', live: null,
    tags: ['C#', '.NET 7', 'Parallel.For', 'Multithreading'],
    details: {
      summary: pair('A Computer Architecture course project: search people by any field, count voters by province, canton or district, rank names and surnames and find expired IDs, all over millions of records.', 'Un proyecto del curso de Arquitectura de Computadores: buscar personas por cualquier campo, contar votantes por provincia, cantón o distrito, ordenar nombres y apellidos y encontrar cédulas vencidas, todo sobre millones de registros.'),
      stack: [group(pair('Core', 'Base'), ['C#', '.NET 7', 'Task Parallel Library', 'Stopwatch'])],
      decisions: [
        pair('Parallel.Invoke, Parallel.For and Parallel.ForEach with the degree of parallelism set to the processor count.', 'Parallel.Invoke, Parallel.For y Parallel.ForEach con el grado de paralelismo igual a la cantidad de procesadores.'),
        pair('Lock-based synchronization for shared counters, with timing to compare sequential and parallel runs.', 'Sincronización con lock para contadores compartidos, midiendo tiempos para comparar ejecuciones secuenciales y paralelas.'),
      ],
    },
  },
];
