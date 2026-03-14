import { useLanguage } from '../../../../store/LanguageContext';
import { CONTACT, SOCIAL_LINKS } from '../constants/contact.constants';
import { SocialCard } from './SocialCard';
import { ContactForm } from './ContactForm';
import styles from './ContactSection.module.css';

export function ContactSection() {
  const { t } = useLanguage();

  return (
    <section className={styles.section}>
      <p className={styles.headerComment}>{t(CONTACT.HEADER_COMMENT)}</p>
      <h1 className={styles.heading}>{t(CONTACT.HEADING)}</h1>
      <p className={styles.subheading}>{t(CONTACT.SUBHEADING)}</p>

      <div className={styles.layout}>
        <div className={styles.leftCol}>
          <h2 className={styles.colTitle}>{t(CONTACT.FIND_ME_TITLE)}</h2>
          <div className={styles.socialList}>
            {SOCIAL_LINKS.map((link) => (
              <SocialCard key={link.id} {...link} platform={t(link.label)} />
            ))}
          </div>
        </div>
        <div className={styles.rightCol}>
          <h2 className={styles.colTitle}>{t(CONTACT.MESSAGE_TITLE)}</h2>
          <ContactForm />
        </div>
      </div>
    </section>
  );
}

