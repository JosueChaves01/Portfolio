import styles from './Panel.module.css';

export function Panel({ children, className = '', title, onClose }) {
  return (
    <aside className={`${styles.panel} ${className}`}>
      {title && (
        <header className={styles.header}>
          <span className={styles.title}>{title}</span>
          {onClose && (
            <button className={styles.closeButton} onClick={onClose} aria-label="Close panel">
              ✕
            </button>
          )}
        </header>
      )}
      <div className={styles.body}>{children}</div>
    </aside>
  );
}
