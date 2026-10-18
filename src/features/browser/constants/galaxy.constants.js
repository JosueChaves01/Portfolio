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

export const VIEW_MODES = {
  FREE: 'free',
  SHIP: 'ship',
};

export const SHIP_TEXT = {
  MODE_FREE: { en: 'Free camera', es: 'Cámara libre' },
  MODE_SHIP: { en: 'Starship', es: 'Nave' },
  VIEW: { en: 'View', es: 'Vista' },
  SPEED: { en: 'Speed', es: 'Velocidad' },
  THRUST: { en: 'Thrust', es: 'Empuje' },
  BOOST: { en: 'BOOST', es: 'TURBO' },
  GRAVITY: { en: 'Gravity well detected', es: 'Pozo gravitatorio detectado' },
  SCAN: { en: 'Scan', es: 'Escanear' },
  HELP_KEYS: { en: 'W thrust · S brake · A/D yaw · Q/E roll · R/V pitch · Shift boost · Space stop', es: 'W empuje · S frenar · A/D girar · Q/E rotar · R/V cabecear · Shift turbo · Espacio detener' },
  HELP_MOUSE: { en: 'Drag to steer · Click a planet or press F near one to scan it', es: 'Arrastra para dirigir · Clic en un planeta o F cerca de uno para escanearlo' },
  HELP_TOUCH: { en: 'Drag to steer · Use the pad to thrust and brake', es: 'Arrastra para dirigir · Usa los botones para acelerar y frenar' },
  PAD_THRUST: { en: 'Thrust', es: 'Acelerar' },
  PAD_BRAKE: { en: 'Brake', es: 'Frenar' },
  PAD_BOOST: { en: 'Boost', es: 'Turbo' },
  PAD_SCAN: { en: 'Scan nearby planet', es: 'Escanear planeta cercano' },
};

// Arcade-ish Newtonian flight: thrust adds velocity, there is very little drag,
// and the ship keeps drifting until you brake (like No Man's Sky's space flight).
export const SHIP = {
  THRUST: 26,
  BOOST_MULTIPLIER: 2.6,
  BRAKE: 34,
  LINEAR_DAMPING: 0.12,
  MAX_SPEED: 42,
  MAX_BOOST_SPEED: 110,
  YAW_ACCEL: 4.2,
  PITCH_ACCEL: 4.2,
  ROLL_ACCEL: 5,
  ANGULAR_DAMPING: 3.4,
  MOUSE_STEER: 0.006,
  MAX_STEER: 1.6,
  BANK_FACTOR: 0.55,
  CHASE_OFFSET: [0, 1.9, 7.2],
  CHASE_LOOK_AHEAD: 12,
  CHASE_STIFFNESS: 6,
  FOV_MIN: 60,
  FOV_MAX: 82,
  GRAVITY_RANGE: 34,
  GRAVITY_STRENGTH: 260,
  STAR_COLLISION: 3.2,
  SCAN_RANGE: 7,
  TRAIL_POINTS: 90,
  SPAWN_DISTANCE: 10,
};

export const SHIP_KEY_BINDINGS = {
  KeyW: 'thrust', ArrowUp: 'thrust',
  KeyS: 'brake', ArrowDown: 'brake',
  KeyA: 'yawLeft', ArrowLeft: 'yawLeft',
  KeyD: 'yawRight', ArrowRight: 'yawRight',
  KeyQ: 'rollLeft',
  KeyE: 'rollRight',
  KeyR: 'pitchUp',
  KeyF: 'scan',
  KeyV: 'pitchDown',
  ShiftLeft: 'boost', ShiftRight: 'boost',
  Space: 'stop',
};
