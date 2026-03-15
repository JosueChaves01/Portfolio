import { useLanguage } from '../../../../store/LanguageContext';
import { BIO_TEXT, BIO_KEYWORDS } from '../constants/about.constants';
import styles from './AboutSection.module.css';

function highlightKeywords(text, keywords) {
  if (!text) return '';
  const pattern = new RegExp(`(${keywords.map((k) => k.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|')})`, 'gi');
  const parts = text.split(pattern);
  return parts.map((part, i) =>
    keywords.some((k) => k.toLowerCase() === part.toLowerCase())
      ? <strong key={`keyword-${part}-${crypto.randomUUID()}`} className={styles.keyword}>{part}</strong>
      : part
  );
}

export function BioCard() {
  const { t } = useLanguage();
  return (
    <div className={styles.bioCard}>
      <p className={styles.bioText}>{highlightKeywords(t(BIO_TEXT), BIO_KEYWORDS)}</p>
    </div>
  );
}

