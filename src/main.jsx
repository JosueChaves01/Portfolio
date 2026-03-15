import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Analytics } from '@vercel/analytics/react';

import { IDEProvider } from './store/IDEContext';
import { ThemeProvider } from './store/ThemeContext';
import { LanguageProvider } from './store/LanguageContext';
import { App } from './app/App';

import './styles/reset.css';
import './styles/tokens.css';
import './styles/base.css';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Analytics />
    <ThemeProvider>
      <LanguageProvider>
        <IDEProvider>
          <App />
        </IDEProvider>
      </LanguageProvider>
    </ThemeProvider>
  </StrictMode>
);

