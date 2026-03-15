import { createContext, useContext, useEffect } from 'react';
import { THEME_IDS, STORAGE_KEY_THEME } from '../features/settings/constants/settings.constants';
import { useLocalStorage } from '../shared/hooks/useLocalStorage';

const ThemeContext = createContext(null);

const DEFAULT_THEME = THEME_IDS.TOTE_DARK;

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useLocalStorage(STORAGE_KEY_THEME, DEFAULT_THEME);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error('useTheme must be used inside ThemeProvider');
  return ctx;
};
