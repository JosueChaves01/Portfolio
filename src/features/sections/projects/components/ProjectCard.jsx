import { useLanguage } from '../../../../store/LanguageContext';
import { Icon } from '../../../../shared/icons/Icon';
import { Tag } from '../../../../shared/components/Tag/Tag';
import { ImageGallery } from './ImageGallery';
import { PROJECTS } from '../constants/projects.constants';
import styles from './ProjectsSection.module.css';

export function ProjectCard({ icon, color, category, title, description, github, live, tags, image, images }) {
  const { t } = useLanguage();

  return (
    <article className={styles.card}>
      <div className={styles.cardContent}>
        <div className={styles.cardHeader}>
          <span className={styles.cardEmoji}><Icon name={icon} size={20} color={color} /></span>
          <span className={styles.cardCategory}>{t(category)}</span>
          <div className={styles.cardLinks}>
            <a href={github} target="_blank" rel="noopener noreferrer" className={styles.link}>
              {PROJECTS.GITHUB_LABEL}
            </a>
            {live && (
              <a href={live} target="_blank" rel="noopener noreferrer" className={`${styles.link} ${styles.liveLink}`}>
                {PROJECTS.LIVE_LABEL}
              </a>
            )}
          </div>
        </div>
        <h3 className={styles.cardTitle}>{title}</h3>
        <div className={styles.cardBodyWrapper}>
          {images && images.length > 0 ? (
            <ImageGallery images={images} title={title} />
          ) : image ? (
            <div className={styles.cardImage}>
              <img src={image} alt={title} />
            </div>
          ) : null}
          <p className={styles.cardDescription}>{t(description)}</p>
        </div>
        <div className={styles.cardTags}>
          {tags.map((tag) => <Tag key={tag}>{tag}</Tag>)}
        </div>
      </div>
    </article>
  );
}

