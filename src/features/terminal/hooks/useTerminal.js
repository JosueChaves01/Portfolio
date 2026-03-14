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

const UNKNOWN_COMMAND_MSG = (cmd) => `command not found: ${cmd}`;
const OPEN_FILE_MSG = (name) => `Opening ${name} in editor...`;
const CD_MSG = (dir) => `Navigated to ${dir}`;
const PYTHON_INTERACTIVE_MSG = 'Python interactive mode not available here.';

export function useTerminal() {
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
      appendLines(HELP_OUTPUT);
    } else if (fullCmd === TERMINAL_COMMANDS.LS) {
      appendLines(LS_OUTPUT);
    } else if (fullCmd === TERMINAL_COMMANDS.PWD) {
      appendLines(PWD_OUTPUT);
    } else if (fullCmd === TERMINAL_COMMANDS.CLEAR) {
      setLines([]);
    } else if (fullCmd === TERMINAL_COMMANDS.WHOAMI) {
      appendLines(WHOAMI_OUTPUT);
    } else if (fullCmd === TERMINAL_COMMANDS.DATE) {
      appendLines(new Date().toString());
    } else if (fullCmd === `${TERMINAL_COMMANDS.GIT} log`) {
      appendLines(GIT_LOG_OUTPUT);
    } else if (fullCmd === TERMINAL_COMMANDS.PYTHON_VERSION) {
      appendLines(PYTHON_VERSION_OUTPUT);
    } else if (fullCmd === TERMINAL_COMMANDS.PYTHON) {
      appendLines(PYTHON_INTERACTIVE_MSG);
    } else if (cmd === TERMINAL_COMMANDS.ECHO) {
      appendLines(args.join(' '));
    } else if (cmd === TERMINAL_COMMANDS.CD) {
      appendLines(CD_MSG(args[0] ?? '~'));
    } else if (cmd === TERMINAL_COMMANDS.CAT || cmd === TERMINAL_COMMANDS.OPEN) {
      const fileName = args[0];
      const fileId = FILE_NAME_TO_ID[fileName];
      if (fileId) {
        appendLines(OPEN_FILE_MSG(fileName));
        openTab(fileId);
      } else {
        appendLines(`No such file: ${fileName}`);
      }
    } else {
      appendLines(UNKNOWN_COMMAND_MSG(trimmed));
    }
  }, [openTab]);

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
