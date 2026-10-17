import styles from './PortfolioBackground.module.css';

export function PortfolioBackground() {
  return (
    <div className={styles.backgroundContainer} aria-hidden="true">
      {/* Subtle IDE dot-grid overlay */}
      <div className={styles.dotGrid} />
    </div>
  );
}
