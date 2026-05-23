import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useBrands } from '../../../hooks/useBrands';
import styles from './BrandTrustSection.module.css';

const BrandTrustSection = () => {
  const navigate = useNavigate();
  const { brands, loading } = useBrands();
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);
  const intervalRef = useRef(null);

  const pageCount = Math.ceil(brands.length / 2);

  const prev = () => setCurrent((c) => (c - 1 + pageCount) % pageCount);
  const next = () => setCurrent((c) => (c + 1) % pageCount);

  // ── Auto-scroll every 3 seconds, pause on hover ──
  // ALL hooks must be before any early return (Rules of Hooks)
  useEffect(() => {
    if (paused || pageCount <= 1) return;
    intervalRef.current = setInterval(() => {
      setCurrent((c) => (c + 1) % pageCount);
    }, 3000);
    return () => clearInterval(intervalRef.current);
  }, [paused, pageCount]);

  const handleBrandClick = (brand) => {
    navigate(`/collections?brand=${encodeURIComponent(brand.slug)}&brandName=${encodeURIComponent(brand.name)}`);
  };

  const handlePrev = () => {
    clearInterval(intervalRef.current);
    prev();
  };
  const handleNext = () => {
    clearInterval(intervalRef.current);
    next();
  };

  // Early return AFTER all hooks
  if (loading || brands.length === 0) {
    return null;
  }

  const visibleBrands = brands.slice(current * 2, current * 2 + 2);

  return (
    <section className={styles.section} aria-label="Brands that trust us">
      <div className={styles.container}>
        <div className={styles.header}>
          <div className={styles.trustStats}>
            <span>NATIONWIDE RETAIL PARTNERS</span>
          </div>
          <h2 className={styles.title}>Trusted Wholesale Network</h2>
          <p className={styles.subtitle}>Our partners represent the elite multi-brand outlets of India.</p>
        </div>

        {/* Flat 2-brand slider with arrows */}
        <div
          className={styles.sliderWrapper}
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <button
            className={`${styles.arrowBtn} ${styles.arrowLeft}`}
            onClick={handlePrev}
            aria-label="Previous brands"
          >
            &#8592;
          </button>

          <div className={styles.sliderTrack}>
            {visibleBrands.map((logo) => (
              <div
                key={logo.id}
                className={styles.logoCard}
                onClick={() => handleBrandClick(logo)}
                role="button"
                tabIndex={0}
                aria-label={`View ${logo.name} products`}
                onKeyDown={(e) => e.key === 'Enter' && handleBrandClick(logo)}
              >
                <img
                  src={logo.src}
                  alt={logo.name}
                  className={styles.logoImg}
                  loading="lazy"
                />
              </div>
            ))}
          </div>

          <button
            className={`${styles.arrowBtn} ${styles.arrowRight}`}
            onClick={handleNext}
            aria-label="Next brands"
          >
            &#8594;
          </button>
        </div>

        {/* Dot indicators */}
        {pageCount > 1 && (
          <div className={styles.dots}>
            {Array.from({ length: pageCount }).map((_, i) => (
              <button
                key={i}
                className={`${styles.dot} ${i === current ? styles.dotActive : ''}`}
                onClick={() => setCurrent(i)}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default BrandTrustSection;
