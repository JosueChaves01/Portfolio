const pair = (en, es) => ({ en, es });

export const SOFT_SKILLS = [
  {
    id: 'introspection', icon: 'ScanEye', color: '#c084fc',
    title: pair('Introspection', 'Introspección'),
    summary: pair('I review how I work after each iteration and adjust before repeating mistakes.', 'Reviso cómo trabajo después de cada iteración y ajusto antes de repetir errores.'),
    inPractice: pair('Reviewing iterations on interfaces, APIs and automations: what worked, what slowed me down and what to adjust in the next project.', 'Revisar iteraciones de interfaces, APIs y automatizaciones: qué funcionó, qué me frenó y qué ajustar en el siguiente proyecto.'),
    traits: [pair('Self-review', 'Autoevaluación'), pair('Continuous learning', 'Aprendizaje continuo'), pair('Ownership', 'Responsabilidad')],
  },
  {
    id: 'analytical', icon: 'ChartNetwork', color: '#38bdf8',
    title: pair('Analytical thinking', 'Pensamiento analítico'),
    summary: pair('I break problems into states, rules and edge cases before writing code.', 'Descompongo los problemas en estados, reglas y casos límite antes de escribir código.'),
    inPractice: pair('Breaking down appointment states in BarberHub API, booking workflows in TripFlow CR and game-end conditions in Chess vs IA into explicit rules.', 'Descomponer los estados de citas en BarberHub API, los flujos de reservas en TripFlow CR y las condiciones de final de partida en Chess vs IA en reglas explícitas.'),
    traits: [pair('Problem decomposition', 'Descomposición de problemas'), pair('Edge cases', 'Casos límite'), pair('Data-driven decisions', 'Decisiones con datos')],
  },
  {
    id: 'conflict-resolution', icon: 'Handshake', color: '#4ade80',
    title: pair('Conflict resolution', 'Resolución de conflictos'),
    summary: pair('I look for the shared goal behind disagreements and turn them into concrete agreements.', 'Busco el objetivo común detrás de los desacuerdos y los convierto en acuerdos concretos.'),
    inPractice: pair('Comparing options with clear trade-offs when aligning requirements, interfaces and services in personal and team projects.', 'Comparar opciones con ventajas y costos claros al alinear requisitos, interfaces y servicios en proyectos personales y de equipo.'),
    traits: [pair('Active listening', 'Escucha activa'), pair('Negotiation', 'Negociación'), pair('Clear agreements', 'Acuerdos claros')],
  },
  {
    id: 'emotional-intelligence', icon: 'HeartHandshake', color: '#f472b6',
    title: pair('Emotional intelligence', 'Inteligencia emocional'),
    summary: pair('I stay calm under pressure and adapt how I communicate to each person.', 'Mantengo la calma bajo presión y adapto mi forma de comunicar a cada persona.'),
    inPractice: pair('Explaining technical decisions in plain language, listening to feedback and adapting communication throughout each project.', 'Explicar decisiones técnicas en lenguaje sencillo, escuchar la retroalimentación y adaptar la comunicación durante cada proyecto.'),
    traits: [pair('Empathy', 'Empatía'), pair('Self-regulation', 'Autorregulación'), pair('Feedback', 'Retroalimentación')],
  },
];
