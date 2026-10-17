import { FILE_IDS } from '../../explorer/constants/explorer.constants';
import { THEMES, LANGUAGES } from '../../settings/constants/settings.constants';
import { PROJECTS_DATA } from '../../sections/projects/mocks/projects.mock';
import { SKILLS_CATEGORIES } from '../../sections/skills/mocks/skills.mock';
import { SOFT_SKILLS } from '../../sections/skills/mocks/softSkills.mock';
import { EXPERIENCE_ITEMS } from '../../sections/experience/mocks/experience.mock';
import { CURRENT_STACK, PROFILE } from '../../../shared/data/recentWork';
import {
  COMMAND_ALIASES, COMMAND_SPECS, CONTACT_INFO, FILE_ALIASES, FILE_NAME_TO_ID, FILE_NAMES, LINE_TONES, PWD_OUTPUT,
} from '../constants/terminal.constants';

const line = (text, tone) => ({ text, tone });
const resolve = (t, value) => (typeof value === 'string' ? value : t(value));
const normalize = (value) => value.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[^a-z0-9]+/g, '-');

export const COMMAND_NAMES = COMMAND_SPECS.map(({ name }) => name);
const PROJECT_IDS = PROJECTS_DATA.map(({ id }) => id);
const THEME_KEYS = THEMES.map(({ id }) => id);

function levenshtein(a, b) {
  const row = Array.from({ length: b.length + 1 }, (_, index) => index);
  for (let i = 1; i <= a.length; i += 1) {
    let previous = row[0];
    row[0] = i;
    for (let j = 1; j <= b.length; j += 1) {
      const current = row[j];
      row[j] = Math.min(row[j] + 1, row[j - 1] + 1, previous + (a[i - 1] === b[j - 1] ? 0 : 1));
      previous = current;
    }
  }
  return row[b.length];
}

function closest(input, candidates) {
  let best = null;
  let bestDistance = Infinity;
  for (const candidate of candidates) {
    const distance = levenshtein(input, candidate);
    if (distance < bestDistance) { best = candidate; bestDistance = distance; }
  }
  return bestDistance <= Math.max(2, Math.floor(input.length / 3)) ? best : null;
}

function findTheme(query) {
  const key = normalize(query);
  return THEMES.find(({ id, label }) => normalize(id) === key || normalize(label) === key || normalize(label).startsWith(key));
}

function resolveFile(query) {
  const key = query.toLowerCase();
  return FILE_NAME_TO_ID[key] || FILE_ALIASES[key] || null;
}

const COMMANDS = {
  help: ({ t }) => [
    line(t({ en: 'Available commands:', es: 'Comandos disponibles:' }), LINE_TONES.ACCENT),
    ...COMMAND_SPECS.map(({ usage, description }) => line(`  ${usage.padEnd(18)} ${t(description)}`)),
    line(t({ en: 'Aliases: cat/cd → open · cv → resume · about → whoami · cls → clear', es: 'Alias: cat/cd → open · cv → resume · about → whoami · cls → clear' }), LINE_TONES.MUTED),
  ],

  whoami: ({ t }) => [
    line('Josué Chaves', LINE_TONES.ACCENT),
    line(`${t({ en: 'Role', es: 'Rol' })}:      ${t(PROFILE.role)} · ${t({ en: 'Computer Engineering student @ ITCR', es: 'Estudiante de Ingeniería en Computadores @ ITCR' })}`),
    line(`${t({ en: 'Projects', es: 'Proyectos' })}:  ${PROJECTS_DATA.length} · ${t({ en: 'web, APIs, AI, data and systems', es: 'web, APIs, IA, datos y sistemas' })}`),
    line(`${t({ en: 'Location', es: 'Ubicación' })}: Costa Rica`),
    line(`Email:     ${CONTACT_INFO.email}`),
    line(t(PROFILE.bio), LINE_TONES.MUTED),
  ],

  neofetch: ({ t, language }) => {
    const technical = SKILLS_CATEGORIES.reduce((sum, { skills }) => sum + skills.length, 0);
    const art = ['   ╭──────╮ ', '   │ </>  │ ', '   ╰──┬┬──╯ ', '   ───┴┴─── '];
    const info = [
      'josue@portfolio',
      '───────────────',
      `${t({ en: 'Role', es: 'Rol' })}: ${t(PROFILE.role)}`,
      `${t({ en: 'Projects', es: 'Proyectos' })}: ${PROJECTS_DATA.length}`,
      `${t({ en: 'Skills', es: 'Habilidades' })}: ${technical} ${t({ en: 'technical', es: 'técnicas' })} · ${SOFT_SKILLS.length} ${t({ en: 'soft', es: 'blandas' })}`,
      `Stack: ${CURRENT_STACK.slice(0, 5).map(({ name }) => name).join(', ')}`,
      `${t({ en: 'Locale', es: 'Idioma' })}: ${language.toUpperCase()} · Costa Rica`,
    ];
    return info.map((text, index) => line(`${art[index] || ' '.repeat(art[0].length)}  ${text}`, index === 0 ? LINE_TONES.ACCENT : undefined));
  },

  projects: ({ t, args, openTab }) => {
    const query = args[0]?.toLowerCase();
    if (!query) {
      return [
        line(t({ en: `${PROJECTS_DATA.length} projects · run "projects <id>" for details`, es: `${PROJECTS_DATA.length} proyectos · usa "projects <id>" para ver detalles` }), LINE_TONES.ACCENT),
        ...PROJECTS_DATA.map(({ id, title }) => line(`  ${id.padEnd(30)} ${title}`)),
      ];
    }
    const project = PROJECTS_DATA.find(({ id }) => id === query) || PROJECTS_DATA.find(({ id, title }) => id.includes(query) || title.toLowerCase().includes(query));
    if (!project) {
      const suggestion = closest(query, PROJECT_IDS);
      return [line(t({ en: `Project not found: ${query}`, es: `Proyecto no encontrado: ${query}` }), LINE_TONES.ERROR),
        ...(suggestion ? [line(t({ en: `Did you mean "projects ${suggestion}"?`, es: `¿Quisiste decir "projects ${suggestion}"?` }), LINE_TONES.MUTED)] : [])];
    }
    openTab(FILE_IDS.PROJECTS);
    const { details } = project;
    return [
      line(project.title, LINE_TONES.ACCENT),
      line(t(project.category), LINE_TONES.MUTED),
      line(t(project.description)),
      line(`Stack: ${project.tags.join(', ')}`),
      ...(details?.decisions?.length ? [line(t({ en: 'Key decisions:', es: 'Decisiones clave:' }), LINE_TONES.ACCENT), ...details.decisions.map((decision) => line(`  • ${t(decision)}`))] : []),
      line(`GitHub: ${project.github}${project.live ? ` · Live: ${project.live}` : ''}`, LINE_TONES.MUTED),
    ];
  },

  skills: ({ t, args }) => {
    if (args[0] === '--soft' || args[0] === '-s') {
      return [
        line(t({ en: 'Soft skills', es: 'Habilidades blandas' }), LINE_TONES.ACCENT),
        ...SOFT_SKILLS.flatMap(({ title, summary }) => [line(`  ${t(title)}`), line(`    ${t(summary)}`, LINE_TONES.MUTED)]),
      ];
    }
    return [
      ...SKILLS_CATEGORIES.flatMap(({ title, skills }) => [
        line(t(title), LINE_TONES.ACCENT),
        line(`  ${skills.map(({ name }) => resolve(t, name)).join(' · ')}`),
      ]),
      line(t({ en: 'Tip: "skills --soft" for soft skills, "galaxy" for the 3D map.', es: 'Tip: "skills --soft" para habilidades blandas, "galaxy" para el mapa 3D.' }), LINE_TONES.MUTED),
    ];
  },

  galaxy: ({ t, openTab, log }) => {
    openTab(FILE_IDS.BROWSER);
    log(t({ en: 'Opened skills galaxy', es: 'Se abrió la galaxia de habilidades' }));
    return [line(t({ en: 'Opening the skills galaxy… click the map, then fly with WASD.', es: 'Abriendo la galaxia de habilidades… haz clic en el mapa y vuela con WASD.' }), LINE_TONES.SUCCESS)];
  },

  experience: ({ t, openTab }) => {
    openTab(FILE_IDS.EXPERIENCE);
    return EXPERIENCE_ITEMS.map((item) => line(`  ${resolve(t, item.period).padEnd(26)} ${resolve(t, item.role || item.title)} @ ${item.company}`));
  },

  contact: ({ t }) => [
    line(t({ en: 'Let’s talk:', es: 'Hablemos:' }), LINE_TONES.ACCENT),
    line(`  Email     ${CONTACT_INFO.email}`),
    line(`  GitHub    ${CONTACT_INFO.github}`),
    line(`  LinkedIn  ${CONTACT_INFO.linkedin}`),
    line(`  Web       ${CONTACT_INFO.website}`),
  ],

  resume: ({ t, downloadResume, log }) => {
    downloadResume();
    log(t({ en: 'Downloaded resume', es: 'Se descargó el currículum' }));
    return [line(t({ en: 'Downloading Josue_Chaves_Resume.pdf…', es: 'Descargando Josue_Chaves_Resume.pdf…' }), LINE_TONES.SUCCESS)];
  },

  ls: () => [line(FILE_NAMES.join('  '))],

  pwd: () => [line(PWD_OUTPUT)],

  open: ({ t, args, openTab, downloadResume, log }) => {
    const target = args[0];
    if (!target || target === '~' || target === '/' || target === '.') return [line(PWD_OUTPUT, LINE_TONES.MUTED)];
    const fileId = resolveFile(target);
    if (!fileId) {
      const suggestion = closest(target.toLowerCase(), FILE_NAMES.map((name) => name.toLowerCase()));
      return [line(t({ en: `No such file: ${target}`, es: `No existe el archivo: ${target}` }), LINE_TONES.ERROR),
        ...(suggestion ? [line(t({ en: `Did you mean "${suggestion}"?`, es: `¿Quisiste decir "${suggestion}"?` }), LINE_TONES.MUTED)] : [])];
    }
    if (fileId === FILE_IDS.RESUME) {
      downloadResume();
      log(t({ en: 'Downloaded resume', es: 'Se descargó el currículum' }));
      return [line(t({ en: 'Downloading resume…', es: 'Descargando currículum…' }), LINE_TONES.SUCCESS)];
    }
    openTab(fileId);
    log(t({ en: `Opened ${target}`, es: `Se abrió ${target}` }));
    return [line(t({ en: `Opening ${target} in the editor…`, es: `Abriendo ${target} en el editor…` }), LINE_TONES.SUCCESS)];
  },

  theme: ({ t, args, theme, setTheme, log }) => {
    if (!args.length) {
      return [
        line(t({ en: 'Themes ("theme <name>" to switch):', es: 'Temas ("theme <nombre>" para cambiar):' }), LINE_TONES.ACCENT),
        ...THEMES.map(({ id, label }) => line(`  ${id === theme ? '●' : '○'} ${id.padEnd(14)} ${label}`)),
      ];
    }
    const match = findTheme(args.join(' '));
    if (!match) return [line(t({ en: `Unknown theme: ${args.join(' ')}`, es: `Tema desconocido: ${args.join(' ')}` }), LINE_TONES.ERROR)];
    setTheme(match.id);
    log(t({ en: `Theme changed to ${match.label}`, es: `Tema cambiado a ${match.label}` }));
    return [line(t({ en: `Theme set to ${match.label}`, es: `Tema cambiado a ${match.label}` }), LINE_TONES.SUCCESS)];
  },

  lang: ({ t, args, setLanguage, log }) => {
    const target = args[0]?.toLowerCase();
    const match = LANGUAGES.find(({ id }) => id === target);
    if (!match) return [line(t({ en: 'Usage: lang <en|es>', es: 'Uso: lang <en|es>' }), LINE_TONES.ERROR)];
    setLanguage(match.id);
    log(`Language → ${match.label}`);
    return [line(`${match.icon} ${match.label}`, LINE_TONES.SUCCESS)];
  },

  copilot: ({ t, toggleCopilot, isCopilotOpen }) => {
    if (!isCopilotOpen) toggleCopilot();
    return [line(t({ en: 'Copilot is open. Ask it about projects, skills or experience.', es: 'Copilot está abierto. Pregúntale sobre proyectos, habilidades o experiencia.' }), LINE_TONES.SUCCESS)];
  },

  git: ({ t, args }) => {
    if (args[0] !== 'log') return [line(t({ en: 'Only "git log" is available here.', es: 'Aquí solo está disponible "git log".' }), LINE_TONES.MUTED)];
    const entries = PROJECTS_DATA.slice(0, 7).map(({ id, title, category }) => ({ id, title, summary: category }));
    return entries.flatMap(({ id, title, summary }) => [
      line(`* ${id}`, LINE_TONES.ACCENT),
      line(`  ${title} — ${resolve(t, summary)}`, LINE_TONES.MUTED),
    ]);
  },

  history: ({ history }) => (history.length ? [...history].reverse().map((entry, index) => line(`  ${String(index + 1).padStart(3)}  ${entry}`)) : []),

  echo: ({ args }) => [line(args.join(' '))],

  date: ({ language }) => [line(new Date().toLocaleString(language === 'es' ? 'es-CR' : 'en-US', { timeZone: 'America/Costa_Rica', dateStyle: 'full', timeStyle: 'medium' }))],

  clear: ({ clear }) => { clear(); return []; },

  exit: ({ toggleTerminal }) => { toggleTerminal(); return []; },
};

/** Parses one input line and returns the lines to print. Side effects go through ctx. */
export function runCommand(rawInput, ctx) {
  const [rawName, ...args] = rawInput.trim().split(/\s+/);
  const name = rawName.toLowerCase();
  const command = COMMANDS[COMMAND_ALIASES[name] || name];
  if (command) return command({ ...ctx, args });

  const suggestion = closest(name, [...COMMAND_NAMES, ...Object.keys(COMMAND_ALIASES)]);
  return [
    line(ctx.t({ en: `command not found: ${rawName}`, es: `comando no encontrado: ${rawName}` }), LINE_TONES.ERROR),
    line(suggestion
      ? ctx.t({ en: `Did you mean "${suggestion}"? Type "help" for all commands.`, es: `¿Quisiste decir "${suggestion}"? Escribe "help" para ver todos.` })
      : ctx.t({ en: 'Type "help" for all commands.', es: 'Escribe "help" para ver todos los comandos.' }), LINE_TONES.MUTED),
  ];
}

/** Returns completion candidates for the current input (command names, then arguments). */
export function getCompletions(input) {
  const endsWithSpace = /\s$/.test(input);
  const parts = input.trimStart().split(/\s+/);
  if (parts.length <= 1 && !endsWithSpace) {
    const prefix = (parts[0] || '').toLowerCase();
    return COMMAND_NAMES.filter((name) => name.startsWith(prefix)).map((name) => ({ value: `${name} `, label: name }));
  }
  const command = COMMAND_ALIASES[parts[0].toLowerCase()] || parts[0].toLowerCase();
  const prefix = endsWithSpace ? '' : parts.at(-1).toLowerCase();
  const head = endsWithSpace ? input : input.slice(0, input.length - parts.at(-1).length);
  const options = {
    open: FILE_NAMES,
    projects: PROJECT_IDS,
    theme: THEME_KEYS,
    lang: LANGUAGES.map(({ id }) => id),
    skills: ['--soft'],
    git: ['log'],
  }[command] || [];
  return options.filter((option) => option.toLowerCase().startsWith(prefix)).map((option) => ({ value: `${head}${option}`, label: option }));
}
