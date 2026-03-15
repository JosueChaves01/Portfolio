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

  const appendLines = useCallback((newLines) => {
    const toAppend = (Array.isArray(newLines) ? newLines : [newLines]).map((line) => ({
      id: `line-${Date.now()}-${crypto.randomUUID()}`,
      content: line,
    }));
    setLines((prev) => [...prev, ...toAppend]);
  }, []);

  const handleCd = useCallback((args) => {
    const target = args[0];
    if (!target || target === '~' || target === '/') {
      appendLines(t(CD_MSG('~')));
    } else {
      const fileId = FILE_NAME_TO_ID[target];
      appendLines(t(CD_MSG(target)));
      if (fileId) {
        openTab(fileId);
      }
    }
  }, [appendLines, t, openTab]);

  const handleOpen = useCallback((args) => {
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
  }, [appendLines, t, openTab]);

  const processCommand = useCallback((rawInput) => {
    const trimmed = rawInput.trim();
    if (!trimmed) return;

    appendLines(`$ ${trimmed}`);
    setHistory((prev) => [trimmed, ...prev]);
    setHistoryIndex(-1);

    const [cmd, ...args] = trimmed.split(' ');
    const fullCmd = trimmed.toLowerCase();

    const commandMap = {
      [TERMINAL_COMMANDS.HELP]: () => appendLines(t(HELP_OUTPUT)),
      [TERMINAL_COMMANDS.LS]: () => appendLines(LS_OUTPUT),
      [TERMINAL_COMMANDS.PWD]: () => appendLines(PWD_OUTPUT),
      [TERMINAL_COMMANDS.CLEAR]: () => setLines([]),
      [TERMINAL_COMMANDS.WHOAMI]: () => appendLines(t(WHOAMI_OUTPUT)),
      [TERMINAL_COMMANDS.DATE]: () => appendLines(new Date().toLocaleString()),
      [`${TERMINAL_COMMANDS.GIT} log`]: () => appendLines(GIT_LOG_OUTPUT),
      [TERMINAL_COMMANDS.PYTHON_VERSION]: () => appendLines(PYTHON_VERSION_OUTPUT),
      [TERMINAL_COMMANDS.PYTHON]: () => appendLines(t(PYTHON_INTERACTIVE_MSG)),
      [TERMINAL_COMMANDS.ECHO]: () => appendLines(args.join(' ')),
      [TERMINAL_COMMANDS.CD]: () => handleCd(args),
      [TERMINAL_COMMANDS.CAT]: () => handleOpen(args),
      [TERMINAL_COMMANDS.OPEN]: () => handleOpen(args),
    };

    const handler = commandMap[fullCmd] || commandMap[cmd];
    if (handler) {
      handler();
    } else {
      appendLines(t(UNKNOWN_COMMAND_MSG(trimmed)));
    }
  }, [appendLines, t, handleCd, handleOpen, setLines]);


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
