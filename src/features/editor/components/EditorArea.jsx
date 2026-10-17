import { Suspense } from 'react';
import { useEditor } from '../hooks/useEditor';
import { EDITOR_PLACEHOLDER } from '../constants/editor.constants';
import { PortfolioBackground } from '../../../shared/components/PortfolioBackground/PortfolioBackground';
import styles from './EditorArea.module.css';

export function EditorArea() {
  const { ActiveSection } = useEditor();

  return (
    <main className={styles.editorArea}>
      <PortfolioBackground />
      <div className={styles.content}>
        {ActiveSection ? (
          <Suspense fallback={<div className={styles.loading}>Loading…</div>}>
            <ActiveSection />
          </Suspense>
        ) : (
          <p className={styles.placeholder}>{EDITOR_PLACEHOLDER}</p>
        )}
      </div>
    </main>
  );
}
