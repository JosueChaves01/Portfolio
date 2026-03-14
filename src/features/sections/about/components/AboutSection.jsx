import { useLanguage } from '../../../../store/LanguageContext';
import { Icon } from '../../../../shared/icons/Icon';
import {
  ABOUT, BIO_TEXT, CURRENT_FOCUS_TITLE, CURRENT_FOCUS_ITEMS, EDUCATION_TITLE, EDUCATION_ITEMS, TALK_ABOUT_TITLE, TALK_ABOUT_ITEMS,
} from '../constants/about.constants';
import styles from './AboutSection.module.css';

export function AboutSection() {
  const { t } = useLanguage();

  return (
    <section className={styles.section}>
      <p className={styles.headerComment}>{t(ABOUT.HEADER_COMMENT)}</p>
      <h2 className={styles.heading}>{t(ABOUT.HEADING)}</h2>
      <p className={styles.subheading}>{t(ABOUT.SUBHEADING)}</p>

      <div className={styles.content}>
        <div className={styles.bio}>
          <p className={styles.bioText}>{t(BIO_TEXT)}</p>
        </div>

        <div className={styles.divider} />

        <div className={styles.grid}>
          <section className={styles.gridSection}>
            <h3 className={styles.gridTitle}>{t(CURRENT_FOCUS_TITLE)}</h3>
            <div className={styles.focusList}>
              {CURRENT_FOCUS_ITEMS.map(({ id, icon, color, text }) => (
                <div key={id} className={styles.focusItem}>
                  <Icon name={icon} size={14} color={color} />
                  <span>{t(text)}</span>
                </div>
              ))}
            </div>
          </section>

          <section className={styles.gridSection}>
            <h3 className={styles.gridTitle}>{t(EDUCATION_TITLE)}</h3>
            <div className={styles.eduList}>
              {EDUCATION_ITEMS.map(({ id, institution, university, degree, period }) => (
                <div key={id} className={styles.eduItem}>
                  <h4 className={styles.eduInstitution}>{t(institution)}</h4>
                  <p className={styles.eduDetails}>{university} • {t(degree)}</p>
                  <p className={styles.eduPeriod}>{period}</p>
                </div>
              ))}
            </div>
          </section>

          <section className={styles.gridSection}>
            <h3 className={styles.gridTitle}>{t(TALK_ABOUT_TITLE)}</h3>
            <div className={styles.talkList}>
              {TALK_ABOUT_ITEMS.map(({ id, icon, color, text }) => (
                <div key={id} className={styles.talkItem}>
                  <Icon name={icon} size={14} color={color} />
                  <span>{t(text)}</span>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </section>
  );
}
