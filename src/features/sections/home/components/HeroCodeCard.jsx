import { useState } from 'react';
import { useTiltEffect } from '../hooks/useTiltEffect';
import { Icon } from '../../../../shared/icons/Icon';
import styles from './HeroCodeCard.module.css';

const TABS = {
  DEV: 'developer.ts',
  STACK: 'techStack.json',
  LOG: 'activity.log',
};

const CODE_SNIPPETS = {
  [TABS.DEV]: `// developer.ts
interface Developer {
  name: string;
  role: string;
  location: string;
  status: 'Open to Work' | 'Building';
  focus: string[];
}

export const josue: Developer = {
  name: 'Josue Chaves',
  role: 'Full-Stack Developer',
  status: 'Open to Work',
  location: 'Costa Rica 🇨🇷',
  focus: ['Web Apps', 'APIs & Data', 'AI Automation', 'UI/UX']
};`,

  [TABS.STACK]: `{
  "languages": ["TypeScript", "JavaScript", "Python"],
  "frontend": ["Next.js", "React", "Tailwind CSS", "next-intl"],
  "backend": ["Route Handlers", "Node.js", "Express", "Zod"],
  "data": ["Supabase", "PostgreSQL", "Prisma"],
  "integrations": ["Stripe", "PayPal", "n8n", "LangGraph", "WebRTC"],
  "delivery": ["Playwright", "Vercel", "Git"]
}`,

  [TABS.LOG]: `// Recent activity across projects
web: bookings, quotes and immersive landing pages
ai: itinerary agent, WhatsApp assistant, chat widgets
backend: layered APIs, edge functions, webhooks
data: PostgreSQL, PostGIS and SQL business rules
realtime: WebRTC chat and distributed workers
workflow: requirements → AI-assisted implementation → review`,
};

export function HeroCodeCard() {
  const cardRef = useTiltEffect({ maxTilt: 10, scale: 1.02 });
  const [activeTab, setActiveTab] = useState(TABS.DEV);
  const [isRunning, setIsRunning] = useState(false);
  const [runOutput, setRunOutput] = useState(null);
  const [copied, setCopied] = useState(false);

  const handleRun = () => {
    setIsRunning(true);
    setRunOutput(null);
    setTimeout(() => {
      setIsRunning(false);
      setRunOutput('✓ Process exited with code 0. Status: Ready to collaborate! 🚀');
    }, 600);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(CODE_SNIPPETS[activeTab]);
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  };

  // Syntax highlighting renderer
  const renderHighlightedCode = (snippet) => {
    return snippet.split('\n').map((line, idx) => {
      // Highlight comments
      if (line.trim().startsWith('//')) {
        return (
          <div key={idx} className={styles.codeLine}>
            <span className={styles.lineNumber}>{idx + 1}</span>
            <span className={styles.tokenComment}>{line}</span>
          </div>
        );
      }

      // Highlight strings
      const parts = line.split(/('[^']*'|"[^"]*")/g);

      return (
        <div key={idx} className={styles.codeLine}>
          <span className={styles.lineNumber}>{idx + 1}</span>
          <span className={styles.lineContent}>
            {parts.map((part, pIdx) => {
              if (part.startsWith("'") || part.startsWith('"')) {
                return (
                  <span key={pIdx} className={styles.tokenString}>
                    {part}
                  </span>
                );
              }

              // Highlight key reserved words
              const words = part.split(/\b(const|export|interface|string|type|return|true|false)\b/g);
              return words.map((w, wIdx) => {
                if (['const', 'export', 'interface', 'type', 'return'].includes(w)) {
                  return (
                    <span key={wIdx} className={styles.tokenKeyword}>
                      {w}
                    </span>
                  );
                }
                if (['string', 'true', 'false'].includes(w)) {
                  return (
                    <span key={wIdx} className={styles.tokenType}>
                      {w}
                    </span>
                  );
                }
                if (w.includes(':') && !w.includes('//')) {
                  const [key, ...rest] = w.split(':');
                  return (
                    <span key={wIdx}>
                      <span className={styles.tokenProperty}>{key}</span>:
                      {rest.join(':')}
                    </span>
                  );
                }
                return <span key={wIdx}>{w}</span>;
              });
            })}
          </span>
        </div>
      );
    });
  };

  return (
    <div className={styles.cardPerspectiveContainer}>
      <div className={styles.codeCard} ref={cardRef}>
        {/* Spotlight dynamic border/glow */}
        <div className={styles.cardSpotlight} />

        {/* Window Topbar */}
        <div className={styles.topbar}>
          <div className={styles.windowControls} aria-hidden="true">
            <span className={`${styles.dot} ${styles.dotRed}`} />
            <span className={`${styles.dot} ${styles.dotYellow}`} />
            <span className={`${styles.dot} ${styles.dotGreen}`} />
          </div>

          <div className={styles.tabsList}>
            {Object.entries(TABS).map(([key, filename]) => (
              <button
                key={key}
                type="button"
                className={`${styles.tabBtn} ${activeTab === filename ? styles.tabActive : ''}`}
                onClick={() => setActiveTab(filename)}
              >
                <span className={styles.tabIcon}>
                  {filename.endsWith('.ts') && <Icon name="FileCode" size={13} color="#60a5fa" />}
                  {filename.endsWith('.json') && <Icon name="Braces" size={13} color="#facc15" />}
                  {filename.endsWith('.log') && <Icon name="Terminal" size={13} color="#4ade80" />}
                </span>
                <span className={styles.tabName}>{filename}</span>
              </button>
            ))}
          </div>

          <div className={styles.topbarActions}>
            <button
              type="button"
              className={`${styles.actionBtn} ${isRunning ? styles.running : ''}`}
              onClick={handleRun}
              title="Run Code"
              aria-label="Run Code"
            >
              <Icon name={isRunning ? "Loader2" : "Play"} size={13} className={isRunning ? styles.spinIcon : ''} />
              <span className={styles.btnLabel}>Run</span>
            </button>

            <button
              type="button"
              className={styles.actionBtn}
              onClick={handleCopy}
              title="Copy Code"
              aria-label="Copy Code"
            >
              <Icon name={copied ? "Check" : "Copy"} size={13} color={copied ? "#22c55e" : undefined} />
            </button>
          </div>
        </div>

        {/* Code Editor Body */}
        <div className={styles.codeBody}>
          <div className={styles.codeLinesWrapper}>
            {renderHighlightedCode(CODE_SNIPPETS[activeTab])}
          </div>

          {/* Interactive Output Drawer */}
          {runOutput && (
            <div className={styles.outputDrawer}>
              <div className={styles.outputHeader}>
                <span className={styles.outputLabel}>
                  <Icon name="Terminal" size={12} /> Console Output
                </span>
                <button
                  type="button"
                  className={styles.closeOutputBtn}
                  onClick={() => setRunOutput(null)}
                  aria-label="Close output"
                >
                  ✕
                </button>
              </div>
              <p className={styles.outputText}>{runOutput}</p>
            </div>
          )}
        </div>

        {/* Card Footer Status Line */}
        <div className={styles.cardFooter}>
          <div className={styles.footerLeft}>
            <span className={styles.statusPulseDot} />
            <span className={styles.footerText}>TypeScript 5.4 • UTF-8 • Prettier</span>
          </div>
          <span className={styles.footerBrand}>VS Code Live</span>
        </div>
      </div>
    </div>
  );
}
