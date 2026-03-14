export const KEYBOARD_KEYS = {
  ESCAPE: 'Escape',
  ENTER: 'Enter',
  ARROW_UP: 'ArrowUp',
  ARROW_DOWN: 'ArrowDown',
  P: 'p',
  B: 'b',
  C: 'c',
  BACKTICK: '`',
  F11: 'F11',
};

export const KEYBOARD_MODIFIERS = {
  CTRL: 'ctrlKey',
  SHIFT: 'shiftKey',
  ALT: 'altKey',
};

export const SHORTCUTS = {
  COMMAND_PALETTE: { key: KEYBOARD_KEYS.P, ctrl: true },
  TOGGLE_SIDEBAR: { key: KEYBOARD_KEYS.B, ctrl: true },
  TOGGLE_TERMINAL: { key: KEYBOARD_KEYS.BACKTICK, ctrl: true },
  TOGGLE_COPILOT: { key: KEYBOARD_KEYS.C, ctrl: true, shift: true },
  FULLSCREEN: { key: KEYBOARD_KEYS.F11 },
  CLOSE: { key: KEYBOARD_KEYS.ESCAPE },
};
