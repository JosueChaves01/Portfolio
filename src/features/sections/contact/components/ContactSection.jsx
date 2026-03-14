import { CONTACT, SOCIAL_CARDS } from '../constants/contact.constants';
import { SocialCard } from './SocialCard';
import { ContactForm } from './ContactForm';
import styles from './ContactSection.module.css';

export function ContactSection() {
  return (
    <section className={styles.section}>
      <p className={styles.headerComment}>{CONTACT.HEADER_COMMENT}</p>
      <h1 className={styles.heading}>{CONTACT.HEADING}</h1>
      <p className={styles.subheading}>{CONTACT.SUBHEADING}</p>

      <div className={styles.layout}>
        <div className={styles.leftCol}>
          <h2 className={styles.colTitle}>{CONTACT.FIND_ME_TITLE}</h2>
          <div className={styles.socialList}>
            {SOCIAL_CARDS.map((card) => <SocialCard key={card.id} {...card} />)}
          </div>
        </div>
        <div className={styles.rightCol}>
          <h2 className={styles.colTitle}>{CONTACT.MESSAGE_TITLE}</h2>
          <ContactForm />
        </div>
      </div>
    </section>
  );
}
