import styles from './Badge.module.css';

export function Badge({ children, dot, dotColor }) {
  return (
    <span className={styles.badge}>
      {dot && (
        <span
          className={styles.dot}
          style={dotColor ? { backgroundColor: dotColor } : undefined}
        />
      )}
      {children}
    </span>
  );
}
