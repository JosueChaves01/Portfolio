import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/react';
import { TabsProvider } from './store/TabsContext';
import { PanelProvider } from './store/PanelContext';
import { OverlayProvider } from './store/OverlayContext';
import { ThemeProvider } from './store/ThemeContext';
import { LanguageProvider } from './store/LanguageContext';
import { App } from './app/App';

import './styles/reset.css';
import './styles/tokens.css';
import './styles/base.css';



createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Analytics />
    <SpeedInsights />
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

