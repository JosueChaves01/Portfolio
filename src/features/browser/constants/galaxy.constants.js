export const GALAXY_TEXT = {
  FILE_NAME: 'galaxy.map',
  TITLE: { en: 'SKILLS NAVIGATOR', es: 'NAVEGADOR DE HABILIDADES' },
  SOFT_SYSTEM: { en: 'HUMAN CORE · SOFT SKILLS', es: 'NÚCLEO HUMANO · HABILIDADES BLANDAS' },
  SYSTEMS: { en: 'Star systems', es: 'Sistemas estelares' },
  WARP: { en: 'Warp to', es: 'Viajar a' },
  RESET: { en: 'Reset view', es: 'Restablecer vista' },
  FULLSCREEN: { en: 'Fullscreen', es: 'Pantalla completa' },
  EXIT_FULLSCREEN: { en: 'Exit fullscreen', es: 'Salir de pantalla completa' },
  NEAREST: { en: 'Nearest', es: 'Más cercano' },
  ENGAGE: { en: 'Click the map to take control', es: 'Haz clic en el mapa para tomar el control' },
  ENGAGED: { en: 'Flight control active · Esc to release', es: 'Control de vuelo activo · Esc para soltar' },
  HELP_KEYS: { en: 'WASD move · Q/E down/up · Shift boost', es: 'WASD mover · Q/E bajar/subir · Shift turbo' },
  HELP_MOUSE: { en: 'Drag to look · Scroll to fly · Click a planet', es: 'Arrastra para mirar · Scroll para volar · Clic en un planeta' },
  HELP_TOUCH: { en: 'Drag to look · Pinch to fly · Tap a planet', es: 'Arrastra para mirar · Pellizca para volar · Toca un planeta' },
  PRACTICAL: { en: 'PRACTICAL APPLICATIONS', es: 'APLICACIONES PRÁCTICAS' },
  TRAITS: { en: 'TRAITS', es: 'RASGOS' },
  IN_PRACTICE: { en: 'In practice', es: 'En la práctica' },
  CLOSE: { en: 'Close', es: 'Cerrar' },
  PLANETS: { en: 'planets', es: 'planetas' },
  PAD_FORWARD: { en: 'Fly forward', es: 'Avanzar' },
  PAD_BACK: { en: 'Fly back', es: 'Retroceder' },
  PAD_UP: { en: 'Fly up', es: 'Subir' },
  PAD_DOWN: { en: 'Fly down', es: 'Bajar' },
};

export const SOFT_SYSTEM_ID = 'soft';
export const SOFT_SYSTEM_COLOR = '#f472b6';

// Soft skills sit at the galactic core; technical categories orbit around it.
export const SYSTEM_POSITIONS = {
  [SOFT_SYSTEM_ID]: [0, 0, 0],
  frontend: [42, 6, -18],
  backend: [-40, -4, -26],
  databases: [26, -12, 38],
  delivery: [-34, 10, 34],
  github: [4, 16, -58],
};

export const CAMERA_HOME = { position: [0, 24, 74], lookAt: [0, 0, 0] };
export const CAMERA_FOV = 60;
export const WORLD_RADIUS = 190;

export const FLIGHT = {
  SPEED: 22,
  BOOST: 3,
  ACCELERATION: 6,
  LOOK_SENSITIVITY: 0.0035,
  WHEEL_FACTOR: 0.12,
  PINCH_FACTOR: 0.45,
  MAX_PITCH: Math.PI / 2 - 0.05,
  CLICK_TOLERANCE: 5,
  ARRIVE_DISTANCE: 0.25,
  TRAVEL_EASE: 2.8,
  TURN_EASE: 4,
};

export const ORBIT = {
  STAR_RADIUS: 1.6,
  PLANET_RADIUS: 0.55,
  FIRST_RADIUS: 4.5,
  RADIUS_STEP: 2.3,
  BASE_SPEED: 0.35,
  DUST_PER_SYSTEM: 260,
  DUST_SPREAD: 11,
};

export const KEY_BINDINGS = {
  KeyW: 'forward', ArrowUp: 'forward',
  KeyS: 'back', ArrowDown: 'back',
  KeyA: 'left', ArrowLeft: 'left',
  KeyD: 'right', ArrowRight: 'right',
  KeyE: 'up', Space: 'up',
  KeyQ: 'down', KeyC: 'down',
  ShiftLeft: 'boost', ShiftRight: 'boost',
};

export const BLACK_HOLE = {
  RADIUS: 3.4,
  EVENT_HORIZON: 8,
};
