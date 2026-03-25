import { useState } from 'react';
import { Icon } from '../../../../shared/icons/Icon';
import styles from './ImageGallery.module.css';

export function ImageGallery({ images, title }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handlePrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const handleKeyDown = (e) => {
    if (e.key === 'ArrowLeft') handlePrevious();
    if (e.key === 'ArrowRight') handleNext();
    if (e.key === 'Escape') setIsModalOpen(false);
  };

  return (
    <div className={styles.galleryWrapper}>
      <div className={styles.gallery}>
        <div className={styles.imageContainer} onClick={() => setIsModalOpen(true)}>
          <img src={images[currentIndex]} alt={`${title} - ${currentIndex + 1}`} />
          <div className={styles.imageOverlay}>
            <Icon name="Maximize2" size={20} color="#ffffff" />
          </div>
        </div>

        {images.length > 1 && (
          <div className={styles.galleryControls}>
            <button onClick={handlePrevious} className={styles.navButton} aria-label="Imagen anterior">
              <Icon name="ChevronLeft" size={16} />
            </button>
            <div className={styles.indicators}>
              {images.map((_, index) => (
                <button
                  key={index}
                  className={`${styles.dot} ${index === currentIndex ? styles.active : ''}`}
                  onClick={() => setCurrentIndex(index)}
                  aria-label={`Ir a imagen ${index + 1}`}
                />
              ))}
            </div>
            <button onClick={handleNext} className={styles.navButton} aria-label="Siguiente imagen">
              <Icon name="ChevronRight" size={16} />
            </button>
          </div>
        )}
      </div>

      {isModalOpen && (
        <div
          className={styles.modal}
          onClick={() => setIsModalOpen(false)}
          onKeyDown={handleKeyDown}
          role="dialog"
          aria-modal="true"
          tabIndex={0}
        >
          <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <button
              className={styles.closeButton}
              onClick={() => setIsModalOpen(false)}
              aria-label="Cerrar"
            >
              <Icon name="X" size={20} />
            </button>

            <div className={styles.modalImage}>
              <img src={images[currentIndex]} alt={`${title} - ${currentIndex + 1}`} />
            </div>

            {images.length > 1 && (
              <div className={styles.modalControls}>
                <button onClick={handlePrevious} className={styles.modalNavButton} aria-label="Imagen anterior">
                  <Icon name="ChevronLeft" size={18} />
                </button>
                <span className={styles.counter}>
                  {currentIndex + 1} / {images.length}
                </span>
                <button onClick={handleNext} className={styles.modalNavButton} aria-label="Siguiente imagen">
                  <Icon name="ChevronRight" size={18} />
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
