import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { useCategories } from '../../../hooks/useCategories';
import styles from './CategorySection.module.css';

const CategorySection = () => {
  const { categories, loading } = useCategories();

  if (loading && categories.length === 0) {
    return (
      <div className={styles.loaderWrapper}>
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#0B1A2F]"></div>
      </div>
    );
  }

  if (!loading && categories.length === 0) {
    return null;
  }

  return (
    <section className={`${styles.section} reveal`} aria-label="Luxury Catalogue">
      <div className={styles.container}>
        {/* ── Section Header ── */}
        <div className={styles.header}>
          <div className={styles.headerLeft}>
            <div className={styles.eyebrowRow}>
              <span className={styles.eyebrowDot} />
              <span className={styles.eyebrow}>THE COLLECTION</span>
            </div>
            <h2 className={styles.title}>Shop by Category</h2>
          </div>
          <div className={styles.headerRight}>
            <Link to="/collections" className={styles.viewAllLink}>
              View All Collections
              <ArrowUpRight size={16} strokeWidth={2} />
            </Link>
          </div>
        </div>

        {/* ── Bento Grid ── */}
        <div className={styles.bentoGrid}>
          {categories.slice(0, 6).map((cat, idx) => {
            const isHero = idx === 0;
            return (
              <Link 
                to="/collections" 
                key={cat.id} 
                className={`${styles.categoryCard} ${isHero ? styles.cardHero : ''} reveal stagger-${(idx % 6) + 1}`}
              >
                {/* Cinematic Image */}
                <img src={cat.image} alt={cat.name} className={styles.image} loading="lazy" />
                
                {/* Gradient Overlay for Text Contrast */}
                <div className={styles.overlay} />

                {/* Floating Top Badges */}
                <div className={styles.topBadges}>
                  <span className={styles.moqBadge}>MOQ: {cat.moq}</span>
                  {cat.tag && (
                    <span className={`${styles.tagBadge} ${cat.tag === 'Best Seller' ? styles.tagGold : ''}`}>
                      {cat.tag}
                    </span>
                  )}
                </div>

                {/* Bottom Content */}
                <div className={styles.bottomContent}>
                  <div className={styles.textWrap}>
                    <h3 className={styles.categoryTitle}>{cat.name}</h3>
                    <span className={styles.categoryLabel}>{cat.label}</span>
                  </div>
                  <div className={styles.actionCircle}>
                    <ArrowUpRight size={20} className={styles.actionIcon} />
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default CategorySection;
