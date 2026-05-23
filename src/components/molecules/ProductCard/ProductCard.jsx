import React from 'react';
import { useNavigate } from 'react-router-dom';
import { MessageSquare, Phone } from 'lucide-react';
import styles from './ProductCard.module.css';
import brandConfig from '../../../config/brandConfig';

const BADGE_CONFIG = {
  'Best Seller':    { cls: 'badgeBestseller', emoji: '⭐' },
  'New Arrival':    { cls: 'badgeNew',        emoji: '✨' },
  'Hot':            { cls: 'badgeHot',        emoji: '🔥' },
  'Bulk Available': { cls: 'badgeBulk',       emoji: '📦' },
};

const ProductCard = ({
  sku,
  collection,
  category,
  image,
  badge,
}) => {
  const navigate = useNavigate();
  const badgeCfg = badge ? BADGE_CONFIG[badge] : null;

  const handleEnquiryNavigation = (e) => {
    e.preventDefault();
    e.stopPropagation();
    navigate(`/enquiry?product=${encodeURIComponent(collection)}&sku=${sku}`);
  };

  return (
    <article className={`${styles.card} reveal`} aria-label={`${collection} – ${category}`}>
      <div className={styles.imageWrapper}>
        <img
          src={image}
          alt={`${collection} wholesale collection`}
          className={styles.image}
          loading="lazy"
        />
        
        {/* Secondary Image Placeholder / Overlay */}
        <div className={styles.imageOverlay} />

        {/* Action Buttons on Hover */}
        <div className={styles.hoverActions}>
          <button
            className={styles.actionBtn}
            onClick={handleEnquiryNavigation}
            aria-label="Enquiry Now"
          >
            <MessageSquare size={18} />
            <span>Enquire Now</span>
          </button>
          <a
            href={`tel:${brandConfig.phone_number}`}
            className={styles.actionBtnSecondary}
            aria-label="Get Price"
            onClick={(e) => e.stopPropagation()}
          >
            <Phone size={18} />
            <span>Get Price</span>
          </a>
        </div>

        {/* Badge */}
        {badgeCfg && (
          <span className={`${styles.badge} ${styles[badgeCfg.cls]}`}>
            {badgeCfg.emoji} {badge}
          </span>
        )}
      </div>

      <div className={styles.info}>
        <div className={styles.categoryRow}>
          <span className={styles.category}>{category}</span>
        </div>
        <h3 className={styles.name}>{collection}</h3>
        
        <div className={styles.pricingSection}>
          <div className={styles.priceLabel}>Wholesale Price</div>
          <div className={styles.priceValue}>Contact for Quote</div>
        </div>

        <button 
          className={styles.fullEnquiryBtn}
          onClick={handleEnquiryNavigation}
        >
          Send Enquiry
        </button>
      </div>
    </article>
  );
};

export default ProductCard;
