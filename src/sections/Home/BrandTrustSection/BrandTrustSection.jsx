import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useBrands } from '../../../hooks/useBrands';
import { ArrowUpRight, Star, Sparkles, Zap } from 'lucide-react';
import styles from './BrandTrustSection.module.css';

/* ── Premium badge config for each card slot ── */
const BADGES = ['Premium Partner', 'Top Seller', 'Exclusive Brand', 'New Collection', 'Luxury Brand'];

/* ── Accent colours cycling across cards ── */
const ACCENTS = ['#D4A017', '#06B6D4', '#8B5CF6', '#10B981', '#F59E0B'];

const BrandTrustSection = () => {
  const navigate = useNavigate();
  const { brands, loading } = useBrands();
  const trackRef = useRef(null);
  const [paused, setPaused] = useState(false);

  if (loading || brands.length === 0) return null;

  /* Duplicate brands so the seamless loop works across all viewport widths */
  const loopBrands = [...brands, ...brands, ...brands];

  const handleClick = (brand) => {
    navigate(`/collections?brand=${encodeURIComponent(brand.slug)}&brandName=${encodeURIComponent(brand.name)}`);
  };

  return (
    <section className={styles.section} aria-label="Brand partners showcase">

      {/* ── Section Header ── */}
      <div className={styles.header}>
        <div className={styles.eyebrowRow}>
          <span className={styles.eyebrowDot} />
          <span className={styles.eyebrow}>BRAND PARTNERSHIPS</span>
        </div>
        <h2 className={styles.title}>
          Trusted Wholesale<br />
          <span className={styles.titleAccent}>Network</span>
        </h2>
        <p className={styles.subtitle}>
          Curated partnerships with India's most sought-after wholesale brands — sourced, verified, and delivered.
        </p>
        <div className={styles.accentLine} />
      </div>

      {/* ── Infinite Marquee Carousel ── */}
      <div
        className={styles.marqueeOuter}
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        aria-label="Scrolling brand showcase"
      >
        {/* Left and right fade edges */}
        <div className={styles.fadeLeft}  aria-hidden="true" />
        <div className={styles.fadeRight} aria-hidden="true" />

        <div
          ref={trackRef}
          className={`${styles.marqueeTrack} ${paused ? styles.marqueePaused : ''}`}
          aria-live="off"
        >
          {loopBrands.map((brand, idx) => {
            const accent = ACCENTS[idx % ACCENTS.length];
            const badge  = BADGES[idx % BADGES.length];
            return (
              <div
                key={`${brand.id}-${idx}`}
                className={styles.brandCard}
                onClick={() => handleClick(brand)}
                role="button"
                tabIndex={0}
                aria-label={`View ${brand.name} collections`}
                onKeyDown={(e) => e.key === 'Enter' && handleClick(brand)}
                style={{ '--accent': accent }}
              >
                {/* Background image */}
                <div className={styles.cardBg}>
                  <img
                    src={brand.logoUrl}
                    alt={brand.name}
                    className={styles.cardImg}
                    loading="lazy"
                  />
                  <div className={styles.cardOverlay} />
                  <div className={styles.cardGlow} />
                </div>

                {/* Badge */}
                <span className={styles.cardBadge} style={{ borderColor: `${accent}40`, color: accent }}>
                  <Star size={9} fill={accent} />
                  {badge}
                </span>

                {/* Brand name */}
                <div className={styles.cardFooter}>
                  <span className={styles.cardName}>{brand.name}</span>
                  <span className={styles.cardAction}>
                    <ArrowUpRight size={13} />
                  </span>
                </div>

                {/* Hover accent border */}
                <div className={styles.cardBorder} />
              </div>
            );
          })}
        </div>
      </div>

      {/* ── Bottom Trust Metrics ── */}
      <div className={styles.metricsRow}>
        <div className={styles.metric}>
          <Sparkles size={14} className={styles.metricIcon} />
          <span className={styles.metricValue}>800+</span>
          <span className={styles.metricLabel}>Retail Partners</span>
        </div>
        <div className={styles.metricDivider} />
        <div className={styles.metric}>
          <Zap size={14} className={styles.metricIcon} />
          <span className={styles.metricValue}>25K+</span>
          <span className={styles.metricLabel}>Orders Fulfilled</span>
        </div>
        <div className={styles.metricDivider} />
        <div className={styles.metric}>
          <Star size={14} className={styles.metricIcon} fill="currentColor" />
          <span className={styles.metricValue}>11+</span>
          <span className={styles.metricLabel}>Years Network</span>
        </div>
      </div>
    </section>
  );
};

export default BrandTrustSection;
