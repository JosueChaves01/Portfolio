import { BIO_TEXT, BIO_KEYWORDS } from '../constants/about.constants';
import styles from './AboutSection.module.css';

function highlightKeywords(text, keywords) {
  const pattern = new RegExp(`(${keywords.map((k) => k.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|')})`, 'gi');
  const parts = text.split(pattern);
  return parts.map((part, i) =>
    keywords.some((k) => k.toLowerCase() === part.toLowerCase())
      ? <strong key={i} className={styles.keyword}>{part}</strong>
      : part
  );
}

export function BioCard() {
  return (
    <div className={styles.bioCard}>
      <p className={styles.bioText}>{highlightKeywords(BIO_TEXT, BIO_KEYWORDS)}</p>
    </div>
  );
}
