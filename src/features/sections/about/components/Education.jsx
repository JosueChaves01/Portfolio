import { Icon } from '../../../../shared/icons/Icon';
import { useLanguage } from '../../../../store/LanguageContext';
import { useTiltEffect } from '../../../../shared/hooks/useTiltEffect';
import styles from './AboutSection.module.css';

export function Education({ title, items }) {
  const { t } = useLanguage();
  const tiltRef = useTiltEffect({ maxTilt: 5, scale: 1.01 });

  return (
    <div className={styles.educationSection}>
      <div className={styles.focusCard} ref={tiltRef}>
        <div className={styles.focusSpotlight} />
        <div className={styles.focusCardContent}>
          <h2 className={styles.sectionTitle}>{t(title)}</h2>
          <div className={styles.educationList}>
            {items.map(({ id, icon, color, institution, university, degree, minor, gpa, grades, period }) => (
              <div key={id} className={styles.educationCard}>
                <div className={styles.eduHeader}>
                  <span className={styles.eduIcon}><Icon name={icon} size={18} color={color} /></span>
                  <div className={styles.eduInfo}>
                    <strong className={styles.eduInstitution}>{t(institution)}</strong>
                    {university && <span className={styles.eduUniversity}>{university}</span>}
                  </div>
                  <span className={styles.eduPeriod}>{period}</span>
                </div>
                <p className={styles.eduDegree}>{t(degree)}</p>
                {minor && <p className={styles.eduMinor}>{t(minor)}</p>}
                {gpa && <p className={styles.eduGpa}>GPA: <strong>{gpa}</strong></p>}
                {grades && <p className={styles.eduGrades}>{t(grades)}</p>}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
