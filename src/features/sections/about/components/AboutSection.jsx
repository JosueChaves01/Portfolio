import { ABOUT, CURRENT_FOCUS_ITEMS, CURRENT_FOCUS_TITLE, EDUCATION_ITEMS, EDUCATION_TITLE, TALK_ABOUT_ITEMS, TALK_ABOUT_TITLE } from '../constants/about.constants';
import { BioCard } from './BioCard';
import { CurrentFocus } from './CurrentFocus';
import { Education } from './Education';
import styles from './AboutSection.module.css';

export function AboutSection() {
  return (
    <section className={styles.section}>
      <p className={styles.headerComment}>{ABOUT.HEADER_COMMENT}</p>

      <div className={styles.headingBlock}>
        <h1 className={styles.heading}>{ABOUT.HEADING}</h1>
        <span className={styles.cursor} aria-hidden="true">█</span>
      </div>
      <p className={styles.subheading}>{ABOUT.SUBHEADING}</p>

      <BioCard />

      <CurrentFocus title={CURRENT_FOCUS_TITLE} items={CURRENT_FOCUS_ITEMS} />

      <Education title={EDUCATION_TITLE} items={EDUCATION_ITEMS} />

      <CurrentFocus title={TALK_ABOUT_TITLE} items={TALK_ABOUT_ITEMS} />
    </section>
  );
}

