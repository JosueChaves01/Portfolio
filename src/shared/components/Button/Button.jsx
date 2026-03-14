import styles from './Button.module.css';

const VARIANTS = {
  PRIMARY: 'primary',
  SECONDARY: 'secondary',
  GHOST: 'ghost',
};

export function Button({ children, variant = VARIANTS.PRIMARY, onClick, className = '', ...props }) {
  return (
    <button
      className={`${styles.button} ${styles[variant]} ${className}`}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
}

Button.VARIANTS = VARIANTS;
