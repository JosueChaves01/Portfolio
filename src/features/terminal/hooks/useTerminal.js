import { useState, useCallback } from 'react';
import { useIDE } from '../../../store/IDEContext';
import {
  TERMINAL_COMMANDS,
  WHOAMI_OUTPUT,
  GIT_LOG_OUTPUT,
  PYTHON_VERSION_OUTPUT,
  LS_OUTPUT,
  PWD_OUTPUT,
  HELP_OUTPUT,
  FILE_NAME_TO_ID,
} from '../constants/terminal.constants';

import { useLanguage } from '../../../store/LanguageContext';

const UNKNOWN_COMMAND_MSG = (cmd) => ({
  en: `command not found: ${cmd}`,
  es: `comando no encontrado: ${cmd}`,
});

const OPEN_FILE_MSG = (name) => ({
  en: `Opening ${name} in editor...`,
  es: `Abriendo ${name} en el editor...`,
});

const CD_MSG = (dir) => ({
  en: `Navigated to ${dir}`,
  es: `Navegado a ${dir}`,
});

const PYTHON_INTERACTIVE_MSG = {
  en: 'Python interactive mode not available here.',
  es: 'El modo interactivo de Python no está disponible aquí.',
};

export function useTerminal() {
  const { t } = useLanguage();
  const { openTab } = useIDE();
  const [lines, setLines] = useState([]);
  const [history, setHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [input, setInput] = useState('');

  const appendLines = (newLines) => {
    setLines((prev) => [...prev, ...(Array.isArray(newLines) ? newLines : [newLines])]);
  };

  const processCommand = useCallback((rawInput) => {
    const trimmed = rawInput.trim();
    if (!trimmed) return;

    appendLines(`$ ${trimmed}`);
    setHistory((prev) => [trimmed, ...prev]);
    setHistoryIndex(-1);

    const [cmd, ...args] = trimmed.split(' ');
    const fullCmd = trimmed.toLowerCase();

    if (fullCmd === TERMINAL_COMMANDS.HELP) {
      appendLines(t(HELP_OUTPUT));
    } else if (fullCmd === TERMINAL_COMMANDS.LS) {
      appendLines(LS_OUTPUT);
    } else if (fullCmd === TERMINAL_COMMANDS.PWD) {
      appendLines(PWD_OUTPUT);
    } else if (fullCmd === TERMINAL_COMMANDS.CLEAR) {
      setLines([]);
    } else if (fullCmd === TERMINAL_COMMANDS.WHOAMI) {
      appendLines(t(WHOAMI_OUTPUT));
    } else if (fullCmd === TERMINAL_COMMANDS.DATE) {
      appendLines(new Date().toLocaleString());
    } else if (fullCmd === `${TERMINAL_COMMANDS.GIT} log`) {
      appendLines(GIT_LOG_OUTPUT);
    } else if (fullCmd === TERMINAL_COMMANDS.PYTHON_VERSION) {
      appendLines(PYTHON_VERSION_OUTPUT);
    } else if (fullCmd === TERMINAL_COMMANDS.PYTHON) {
      appendLines(t(PYTHON_INTERACTIVE_MSG));
    } else if (cmd === TERMINAL_COMMANDS.ECHO) {
      appendLines(args.join(' '));
    } else if (cmd === TERMINAL_COMMANDS.CD) {
      const target = args[0];
      if (!target || target === '~' || target === '/') {
        appendLines(t(CD_MSG('~')));
      } else {
        const fileId = FILE_NAME_TO_ID[target];
        if (fileId) {
          appendLines(t(CD_MSG(target)));
          openTab(fileId);
        } else {
          appendLines(t(CD_MSG(target)));
        }
      }
    } else if (cmd === TERMINAL_COMMANDS.CAT || cmd === TERMINAL_COMMANDS.OPEN) {

      const fileName = args[0];
      const fileId = FILE_NAME_TO_ID[fileName];
      if (fileId) {
        appendLines(t(OPEN_FILE_MSG(fileName)));
        openTab(fileId);
      } else {
        appendLines(t({
          en: `No such file: ${fileName}`,
          es: `No existe el archivo: ${fileName}`
        }));
      }
    } else {
      appendLines(t(UNKNOWN_COMMAND_MSG(trimmed)));
    }
  }, [openTab, t]);


  const handleInputChange = (value) => setInput(value);

  const handleSubmit = () => {
    processCommand(input);
    setInput('');
  };

  const handleKeyDown = (event) => {
    if (event.key === 'ArrowUp') {
      const nextIndex = Math.min(historyIndex + 1, history.length - 1);
      setHistoryIndex(nextIndex);
      setInput(history[nextIndex] ?? '');
    } else if (event.key === 'ArrowDown') {
      const nextIndex = Math.max(historyIndex - 1, -1);
      setHistoryIndex(nextIndex);
      setInput(nextIndex === -1 ? '' : history[nextIndex]);
    }
  };

  return { lines, input, handleInputChange, handleSubmit, handleKeyDown };
}
