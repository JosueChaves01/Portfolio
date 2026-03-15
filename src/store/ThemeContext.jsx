import { createContext, useContext, useEffect, useState, useMemo } from 'react';
import { THEME_IDS, STORAGE_KEY_THEME } from '../features/settings/constants/settings.constants';

const ThemeContext = createContext(null);

const DEFAULT_THEME = THEME_IDS.TOTE_DARK;


export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(
    () => localStorage.getItem(STORAGE_KEY_THEME) ?? DEFAULT_THEME
  );

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem(STORAGE_KEY_THEME, theme);
  }, [theme]);

  const value = useMemo(() => ({ theme, setTheme }), [theme]);

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error('useTheme must be used inside ThemeProvider');
  return ctx;
};
