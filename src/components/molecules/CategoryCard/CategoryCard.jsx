import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import styles from './CategoryCard.module.css';

const CategoryCard = ({ name, label, tag, image, moq }) => {
  const tagClass =
    tag === 'Best Seller' ? styles.tagBestseller :
    tag === 'New Arrival' ? styles.tagNew :
    styles.tagBulk;

  return (
    <div className={`${styles.card} reveal`}>
      <div className={styles.imageWrapper}>
        <img src={image} alt={name} className={styles.image} loading="lazy" />
        <div className={styles.overlay}>
          <div className={styles.overlayContent}>
            <span className={styles.overlaySubtitle}>Wholesale Collection</span>
            <h3 className={styles.overlayTitle}>{name}</h3>
            {moq && <span className={styles.moqInfo}>Starting from {moq} MOQ</span>}
            <Link 
              to="/collections" 
              className={styles.overlayBtn}
            >
              Explore Collection <ArrowRight size={16} />
            </Link>
          </div>
        </div>
        {tag && <span className={`${styles.tag} ${tagClass}`}>{tag}</span>}
      </div>
      <div className={styles.footerLabel}>
        <span className={styles.labelName}>{name}</span>
        <ArrowRight size={14} className={styles.footerArrow} />
      </div>
    </div>
  );
};

export default CategoryCard;
