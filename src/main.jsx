import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Analytics } from '@vercel/analytics/react';
import { injectSpeedInsights } from '@vercel/speed-insights';

import { TabsProvider } from './store/TabsContext';
import { PanelProvider } from './store/PanelContext';
import { OverlayProvider } from './store/OverlayContext';
import { ThemeProvider } from './store/ThemeContext';
import { LanguageProvider } from './store/LanguageContext';
import { App } from './app/App';

import './styles/reset.css';
import './styles/tokens.css';
import './styles/base.css';

injectSpeedInsights();

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Analytics />
    <ThemeProvider>
      <LanguageProvider>
        <TabsProvider>
          <PanelProvider>
            <OverlayProvider>
              <App />
            </OverlayProvider>
          </PanelProvider>
        </TabsProvider>
      </LanguageProvider>
    </ThemeProvider>
  </StrictMode>
);

