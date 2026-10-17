const pair = (en, es) => ({ en, es });

export const SOFT_SKILLS = [
  {
    id: 'introspection', icon: 'ScanEye', color: '#c084fc',
    title: pair('Introspection', 'Introspección'),
    summary: pair('I review how I work after each iteration and adjust before repeating mistakes.', 'Reviso cómo trabajo después de cada iteración y ajusto antes de repetir errores.'),
    inPractice: pair('Short retrospectives on my own changes: what worked, what slowed me down and what to change next.', 'Retrospectivas cortas sobre mis propios cambios: qué funcionó, qué me frenó y qué cambiar después.'),
    traits: [pair('Self-review', 'Autoevaluación'), pair('Continuous learning', 'Aprendizaje continuo'), pair('Ownership', 'Responsabilidad')],
  },
  {
    id: 'analytical', icon: 'ChartNetwork', color: '#38bdf8',
    title: pair('Analytical thinking', 'Pensamiento analítico'),
    summary: pair('I break problems into states, rules and edge cases before writing code.', 'Descompongo los problemas en estados, reglas y casos límite antes de escribir código.'),
    inPractice: pair('Mapping quote, booking and payment states in White City Liberia to find inconsistent transitions early.', 'Mapear los estados de cotizaciones, reservas y pagos en White City Liberia para detectar transiciones inconsistentes a tiempo.'),
    traits: [pair('Problem decomposition', 'Descomposición de problemas'), pair('Edge cases', 'Casos límite'), pair('Data-driven decisions', 'Decisiones con datos')],
  },
  {
    id: 'conflict-resolution', icon: 'Handshake', color: '#4ade80',
    title: pair('Conflict resolution', 'Resolución de conflictos'),
    summary: pair('I look for the shared goal behind disagreements and turn them into concrete agreements.', 'Busco el objetivo común detrás de los desacuerdos y los convierto en acuerdos concretos.'),
    inPractice: pair('Aligning business needs with technical constraints by proposing options with clear trade-offs.', 'Alinear necesidades del negocio con restricciones técnicas proponiendo opciones con ventajas y costos claros.'),
    traits: [pair('Active listening', 'Escucha activa'), pair('Negotiation', 'Negociación'), pair('Clear agreements', 'Acuerdos claros')],
  },
  {
    id: 'emotional-intelligence', icon: 'HeartHandshake', color: '#f472b6',
    title: pair('Emotional intelligence', 'Inteligencia emocional'),
    summary: pair('I stay calm under pressure and adapt how I communicate to each person.', 'Mantengo la calma bajo presión y adapto mi forma de comunicar a cada persona.'),
    inPractice: pair('Explaining technical decisions in plain language to clients and receiving feedback without taking it personally.', 'Explicar decisiones técnicas en lenguaje sencillo a clientes y recibir retroalimentación sin tomarla como algo personal.'),
    traits: [pair('Empathy', 'Empatía'), pair('Self-regulation', 'Autorregulación'), pair('Feedback', 'Retroalimentación')],
  },
];
