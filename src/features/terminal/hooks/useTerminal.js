import { useState, useCallback } from 'react';
import { useTabs } from '../../../store/TabsContext';
import { useLanguage } from '../../../store/LanguageContext';
import { useTheme } from '../../../store/ThemeContext';
import { useOverlay } from '../../../store/OverlayContext';
import { RESUME_URL } from '../../explorer/constants/explorer.constants';
import { LINE_TONES } from '../constants/terminal.constants';
import { getCompletions, runCommand } from '../utils/terminalCommands';

let lineCounter = 0;
const toLine = ({ text, tone }) => ({ id: `line-${lineCounter += 1}`, content: text, tone });

function downloadResume() {
  const link = document.createElement('a');
  link.href = RESUME_URL;
  link.download = 'Josue_Chaves_Resume.pdf';
  link.click();
}

export function useTerminal() {
  const { t, language, setLanguage } = useLanguage();
  const { openTab } = useTabs();
  const { theme, setTheme } = useTheme();
  const { toggleTerminal, toggleCopilot, isCopilotOpen } = useOverlay();
  const [lines, setLines] = useState([]);
  const [outputLog, setOutputLog] = useState([]);
  const [history, setHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [input, setInput] = useState('');
  const [suggestions, setSuggestions] = useState([]);

  const log = useCallback((message) => {
    const time = new Date().toLocaleTimeString(language === 'es' ? 'es-CR' : 'en-US', { hour12: false });
    setOutputLog((previous) => [...previous, toLine({ text: `[${time}] ${message}` })]);
  }, [language]);

  const clear = useCallback(() => setLines([]), []);

  const processCommand = useCallback((rawInput) => {
    const trimmed = rawInput.trim();
    if (!trimmed) return;
    const nextHistory = [trimmed, ...history];
    setHistory(nextHistory);
    setHistoryIndex(-1);
    setSuggestions([]);

    const echoLine = toLine({ text: `$ ${trimmed}`, tone: LINE_TONES.COMMAND });
    const output = runCommand(trimmed, {
      t, language, setLanguage, theme, setTheme, openTab, toggleTerminal, toggleCopilot, isCopilotOpen,
      downloadResume, clear, log, history: nextHistory,
    });
    if (/^(clear|cls)$/i.test(trimmed)) return;
    setLines((previous) => [...previous, echoLine, ...output.map(toLine)]);
  }, [history, t, language, setLanguage, theme, setTheme, openTab, toggleTerminal, toggleCopilot, isCopilotOpen, clear, log]);

  const handleInputChange = (value) => {
    setInput(value);
    if (suggestions.length) setSuggestions([]);
  };

  const handleSubmit = () => {
    processCommand(input);
    setInput('');
  };

  const complete = () => {
    const options = getCompletions(input);
    if (options.length === 1) {
      setInput(options[0].value);
      setSuggestions([]);
    } else if (options.length > 1) {
      const labels = options.map(({ label }) => label);
      let prefix = labels[0];
      for (const label of labels) {
        while (!label.toLowerCase().startsWith(prefix.toLowerCase())) prefix = prefix.slice(0, -1);
      }
      const base = options[0].value.slice(0, options[0].value.length - options[0].label.length);
      if (`${base}${prefix}`.length > input.length) setInput(`${base}${prefix}`);
      setSuggestions(options);
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Tab') {
      event.preventDefault();
      complete();
    } else if (event.key === 'ArrowUp') {
      event.preventDefault();
      const nextIndex = Math.min(historyIndex + 1, history.length - 1);
      setHistoryIndex(nextIndex);
      setInput(history[nextIndex] ?? '');
    } else if (event.key === 'ArrowDown') {
      event.preventDefault();
      const nextIndex = Math.max(historyIndex - 1, -1);
      setHistoryIndex(nextIndex);
      setInput(nextIndex === -1 ? '' : history[nextIndex]);
    } else if (event.ctrlKey && event.key.toLowerCase() === 'l') {
      event.preventDefault();
      clear();
    } else if (event.ctrlKey && event.key.toLowerCase() === 'c') {
      if (window.getSelection()?.toString()) return;
      event.preventDefault();
      setLines((previous) => [...previous, toLine({ text: `$ ${input}^C`, tone: LINE_TONES.COMMAND })]);
      setInput('');
      setSuggestions([]);
    }
  };

  const pickSuggestion = (value) => {
    setInput(value);
    setSuggestions([]);
  };

  return {
    lines, outputLog, input, suggestions, handleInputChange, handleSubmit, handleKeyDown, pickSuggestion, runQuick: processCommand,
  };
}
