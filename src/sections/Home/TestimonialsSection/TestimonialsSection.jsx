import React from 'react';
import { Star, Quote, Check } from 'lucide-react';
import { testimonials } from '../../../data/mockData';
import styles from './TestimonialsSection.module.css';

const StarRating = ({ rating }) => (
  <div className={styles.stars} aria-label={`${rating} out of 5 stars`}>
    {Array.from({ length: 5 }).map((_, i) => (
      <Star
        key={i}
        size={14}
        fill={i < rating ? 'var(--color-gold-500)' : 'none'}
        stroke={i < rating ? 'var(--color-gold-500)' : 'var(--text-muted)'}
        aria-hidden="true"
      />
    ))}
  </div>
);

const TestimonialsSection = () => {
  // Triple the testimonials for a perfectly seamless infinite loop
  const displayTestimonials = [...testimonials, ...testimonials, ...testimonials];

  return (
    <section className={`${styles.section} section-pad`} aria-label="Retailer testimonials">
      <div className={styles.container}>
        <div className={styles.header}>
          <div className="reveal">
            <span className={styles.eyebrow}>Global Trust</span>
            <h2 className={styles.title}>What Our Partners Say</h2>
            <p className={styles.subtitle}>Join 500+ successful retailers sourcing premium collections with ease.</p>
          </div>
        </div>

        <div className={styles.tickerContainer}>
          <div className={styles.tickerTrack}>
            {displayTestimonials.map((t, idx) => (
              <article key={`${t.id}-${idx}`} className={styles.card}>
                <div className={styles.cardHeader}>
                  <StarRating rating={t.rating} />
                  <Quote size={24} className={styles.quoteIcon} />
                </div>
                
                <p className={styles.review}>"{t.review}"</p>
                
                <div className={styles.footer}>
                  <div className={styles.avatarWrapper}>
                    <img src={t.avatar} alt={t.name} className={styles.avatar} />
                    <div className={styles.avatarBadge}>
                      <Check size={10} strokeWidth={4} />
                    </div>
                  </div>
                  <div>
                    <h4 className={styles.name}>{t.name}</h4>
                    <p className={styles.role}>{t.role}</p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
