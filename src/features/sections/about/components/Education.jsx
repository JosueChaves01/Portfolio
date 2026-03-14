import { Icon } from '../../../../shared/icons/Icon';
import styles from './AboutSection.module.css';

export function Education({ title, items }) {
  return (
    <div className={styles.educationSection}>
      <h2 className={styles.sectionTitle}>{title}</h2>
      <div className={styles.educationList}>
        {items.map(({ id, icon, color, institution, university, degree, minor, gpa, grades, period }) => (
          <div key={id} className={styles.educationCard}>
            <div className={styles.eduHeader}>
              <span className={styles.eduIcon}><Icon name={icon} size={18} color={color} /></span>
              <div className={styles.eduInfo}>
                <strong className={styles.eduInstitution}>{institution}</strong>
                {university && <span className={styles.eduUniversity}>{university}</span>}
              </div>
              <span className={styles.eduPeriod}>{period}</span>
            </div>
            <p className={styles.eduDegree}>{degree}</p>
            {minor && <p className={styles.eduMinor}>{minor}</p>}
            {gpa && <p className={styles.eduGpa}>GPA: <strong>{gpa}</strong></p>}
            {grades && <p className={styles.eduGrades}>{grades}</p>}
          </div>
        ))}
      </div>
    </div>
  );
}
