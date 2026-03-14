import styles from './Tag.module.css';

export function Tag({ children, color }) {
  return (
    <span className={styles.tag} style={color ? { '--tag-color': color } : undefined}>
      {children}
    </span>
  );
}
