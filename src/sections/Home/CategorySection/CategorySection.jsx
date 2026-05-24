import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import CategoryCard from '../../../components/molecules/CategoryCard/CategoryCard';
import { useCategories } from '../../../hooks/useCategories';
import styles from './CategorySection.module.css';

const CategorySection = () => {
  const { categories, loading } = useCategories();
  const trackRef = useRef(null);

  const scroll = (direction) => {
    if (!trackRef.current) return;
    const itemWidth = trackRef.current.querySelector('[class]')?.offsetWidth || 260;
    trackRef.current.scrollBy({
      left: direction === 'next' ? itemWidth + 24 : -(itemWidth + 24),
      behavior: 'smooth',
    });
  };

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
    <section className={styles.section} aria-label="Shop by wholesale categories">
      <div className={styles.container}>
        <div className={styles.header}>
          <div className={styles.headerLeft}>
            <span className={styles.eyebrow}>Our Catalogue</span>
            <h2 className={styles.title}>Shop by Category</h2>
            <p className={styles.subtitle}>Bulk collections across all major fashion verticals — tailored for retailers.</p>
          </div>
          <div className={styles.headerRight}>
            <Link to="/collections" className={styles.viewAllLink}>
              View All Categories <ArrowRight size={15} />
            </Link>
            <div className={styles.navButtons}>
              <button
                className={styles.navBtn}
                onClick={() => scroll('prev')}
                aria-label="Previous categories"
              >
                <ArrowLeft size={18} />
              </button>
              <button
                className={`${styles.navBtn} ${styles.navBtnActive}`}
                onClick={() => scroll('next')}
                aria-label="Next categories"
              >
                <ArrowRight size={18} />
              </button>
            </div>
          </div>
        </div>

        <div className={styles.track} ref={trackRef}>
          {categories.map((cat) => (
            <CategoryCard
              key={cat.id}
              name={cat.name}
              label={cat.label}
              tag={cat.tag}
              image={cat.image}
              moq={cat.moq}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategorySection;
