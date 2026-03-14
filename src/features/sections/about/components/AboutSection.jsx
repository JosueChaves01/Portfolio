import { useLanguage } from '../../../../store/LanguageContext';
import {
  ABOUT, CURRENT_FOCUS_TITLE, CURRENT_FOCUS_ITEMS, EDUCATION_TITLE, EDUCATION_ITEMS, TALK_ABOUT_TITLE, TALK_ABOUT_ITEMS,
} from '../constants/about.constants';
import { BioCard } from './BioCard';
import { CurrentFocus } from './CurrentFocus';
import { Education } from './Education';
import styles from './AboutSection.module.css';

export function AboutSection() {
  const { t } = useLanguage();

  return (
    <section className={styles.section}>
      <p className={styles.headerComment}>{t(ABOUT.HEADER_COMMENT)}</p>
      
      <div className={styles.headingBlock}>
        <h2 className={styles.heading}>{t(ABOUT.HEADING)}</h2>
        <span className={styles.cursor}>_</span>
      </div>
      
      <p className={styles.subheading}>{t(ABOUT.SUBHEADING)}</p>

      <div className={styles.content}>
        <BioCard />

        <div className={styles.divider} />

        <div className={styles.grid}>
          <CurrentFocus title={CURRENT_FOCUS_TITLE} items={CURRENT_FOCUS_ITEMS} />
          <Education title={EDUCATION_TITLE} items={EDUCATION_ITEMS} />
          <CurrentFocus title={TALK_ABOUT_TITLE} items={TALK_ABOUT_ITEMS} />
        </div>
      </div>
    </section>
  );
}


