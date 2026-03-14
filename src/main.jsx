import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import { IDEProvider } from './store/IDEContext';
import { ThemeProvider } from './store/ThemeContext';
import { App } from './app/App';

import './styles/reset.css';
import './styles/tokens.css';
import './styles/base.css';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemeProvider>
      <IDEProvider>
        <App />
      </IDEProvider>
    </ThemeProvider>
  </StrictMode>
);
