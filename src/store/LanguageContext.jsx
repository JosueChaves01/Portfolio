import { createContext, useContext, useEffect, useCallback, useMemo } from 'react';
import { useLocalStorage } from '../shared/hooks/useLocalStorage';

const LanguageContext = createContext(null);

const STORAGE_KEY = 'portfolio-language';

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useLocalStorage(STORAGE_KEY, 'en');

  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  const t = useCallback((translations) => {
    if (typeof translations === 'string') return translations;
    if (!translations) return '';
    return translations[language] || translations['en'] || '';
  }, [language]);

  const value = useMemo(() => ({ language, setLanguage, t }), [language, t]);

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export const useLanguage = () => {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error('useLanguage must be used inside LanguageProvider');
  return ctx;
};
