import { useLanguage } from '../../../../store/LanguageContext';
import { Icon } from '../../../../shared/icons/Icon';
import { Tag } from '../../../../shared/components/Tag/Tag';
import { ImageGallery } from './ImageGallery';
import { PROJECTS } from '../constants/projects.constants';
import { useTiltEffect } from '../../../../shared/hooks/useTiltEffect';
import styles from './ProjectsSection.module.css';

export function ProjectCard({ icon, color, category, title, description, github, live, tags, image, images, details, onOpen }) {
  const { t } = useLanguage();
  const tiltRef = useTiltEffect({ maxTilt: 6, scale: 1.01 });

  return (
    <article className={styles.card} ref={tiltRef}>
      {/* Cursor-following spotlight */}
      <div className={styles.cardSpotlight} />

      <div className={styles.cardContent}>
        <div className={styles.cardHeader}>
          <span className={styles.cardEmoji}><Icon name={icon} size={20} color={color} /></span>
          <span className={styles.cardCategory}>{t(category)}</span>
          <div className={styles.cardLinks}>
            {github && (
              <a href={github} target="_blank" rel="noopener noreferrer" className={styles.link}>
                {PROJECTS.GITHUB_LABEL}
              </a>
            )}
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
        {details && (
          <button type="button" className={styles.detailsButton} style={{ '--project-color': color }} onClick={onOpen}>
            <Icon name="FileSearch" size={14} />
            <span>{t(PROJECTS.OPEN_DETAILS)}</span>
            {details.decisions?.length > 0 && (
              <span className={styles.detailsMeta}>{details.decisions.length} {t(PROJECTS.DECISIONS_COUNT)}</span>
            )}
            <Icon name="ArrowRight" size={14} className={styles.detailsArrow} />
          </button>
        )}
      </div>
    </article>
  );
}
