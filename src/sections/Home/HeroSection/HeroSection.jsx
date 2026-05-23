import React from 'react';
import { Link } from 'react-router-dom';
import {
  Truck, Users, Package, MapPin, Clock,
  ChevronLeft, ChevronRight
} from 'lucide-react';
import styles from './HeroSection.module.css';
import { brandConfig } from '../../../config/brandConfig';
import { useHeroSlides } from '../../../hooks/useHeroSlides';

/* ── Trust strip items ── */
const trustItems = [
  { Icon: Users,   value: brandConfig.trust_stat_retailers, label: brandConfig.trust_stat_retailers_label },
  { Icon: Package, value: brandConfig.trust_stat_orders,    label: brandConfig.trust_stat_orders_label },
  { Icon: MapPin,  value: brandConfig.trust_stat_coverage,  label: brandConfig.trust_stat_coverage_label },
  { Icon: Clock,   value: '24–48 Hrs',                      label: 'Dispatch Time' },
];

const HeroSection = () => {
  const {
    slides,
    current,
    loading,
    goTo,
    prev,
    next,
    onTouchStart,
    onTouchMove,
    onTouchEnd
  } = useHeroSlides();

  if (loading && slides.length === 0) {
    return (
      <div className={styles.loaderWrapper}>
        <div className="flex flex-col items-center gap-2">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#0B1A2F]"></div>
          <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">Syncing Visual Stream...</p>
        </div>
      </div>
    );
  }

  if (!loading && slides.length === 0) {
    return null;
  }

  return (
    <section
      className={styles.hero}
      aria-label="Hero banner"
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
    >
      {/* ── Background Slider ── */}
      <div className={styles.bgImageWrapper} aria-hidden="true">
        {slides.map((slide, idx) => (
          <div 
            key={idx} 
            className={`${styles.slideLayer} ${idx === current ? styles.slideLayerActive : ''}`}
          >
            {/* Blurry background fill */}
            <img 
              src={slide.image} 
              alt="" 
              className={styles.bgFill} 
            />
            {/* Main image */}
            <img
              src={slide.image}
              alt=""
              className={styles.mainImage}
            />
          </div>
        ))}
      </div>

      <div className={styles.gradientOverlay} aria-hidden="true" />
      <div className={styles.bgText} aria-hidden="true">WHOLESALE</div>

      {/* ── Main content ── */}
      <div className={styles.container}>
        {slides.length > 0 && (
          <div className={styles.content} key={current}>
            <div className={`${styles.taglineWrap} reveal`}>
              <span className={styles.tagline}>{slides[current].tagline}</span>
            </div>

            <h1 className={styles.heading} key={current}>
              <span className={`${styles.headingLine} ${styles.line1} reveal stagger-1`}>
                {slides[current].headingLine1}
              </span>
              <span className={`${styles.headingLine} ${styles.line2} reveal stagger-2`}>{slides[current].headingLine2}</span>
              <span className={`${styles.headingLine} ${styles.line3} reveal stagger-3`}>{slides[current].highlight}</span>
            </h1>

            <p className={`${styles.subtext} reveal stagger-4`}>{slides[current].subtext}</p>

            <div className={`${styles.ctaRow} reveal stagger-5`}>
              <Link to="/enquiry" className={styles.ctaPrimary} aria-label="Get bulk pricing">
                ENQUIRY NOW
              </Link>
              <Link to="/collections" className={styles.ctaSecondary} aria-label="View Collections">
                View Collections
              </Link>
            </div>

            <div className={styles.progressControls}>
              {slides.map((_, idx) => (
                <div 
                  key={idx} 
                  className={styles.progressWrap}
                  onClick={() => goTo(idx)}
                  role="button"
                  aria-label={`Go to slide ${idx + 1}`}
                >
                  <div className={`${styles.progressBar} ${idx === current ? styles.animating : ''} ${idx < current ? styles.filled : ''}`} />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <button className={`${styles.miniNavBtn} ${styles.miniNavBtnPrev}`} onClick={prev} aria-label="Previous slide">
        <ChevronLeft size={20} strokeWidth={1.5} aria-hidden="true" />
      </button>
      <button className={`${styles.miniNavBtn} ${styles.miniNavBtnNext}`} onClick={next} aria-label="Next slide">
        <ChevronRight size={20} strokeWidth={1.5} aria-hidden="true" />
      </button>

      <div className={styles.floatingBadge} aria-label="Orders dispatched within 24 to 48 hours">
        <span className={styles.badgePulse} aria-hidden="true" />
        <Truck size={16} className={styles.badgeIcon} aria-hidden="true" />
        <span>Dispatch in <strong>24–48 Hours</strong></span>
      </div>

      <div className={styles.trustStrip} aria-label="Key business statistics">
        <div className={styles.trustContainer}>
          {trustItems.map(({ Icon, value, label }, idx) => (
            <React.Fragment key={label}>
              <div className={styles.trustItem}>
                <Icon size={18} className={styles.trustIcon} aria-hidden="true" />
                <div className={styles.trustText}>
                  <span className={styles.trustValue}>{value}</span>
                  <span className={styles.trustLabel}>{label}</span>
                </div>
              </div>
              {idx < trustItems.length - 1 && (
                <span className={styles.trustDivider} aria-hidden="true" />
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
