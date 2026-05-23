import React from 'react';
import { Link } from 'react-router-dom';
import { brandConfig } from '../../../config/brandConfig';
import styles from './TrustSection.module.css';

const stats = [
  { value: brandConfig.trust_stat_retailers, label: brandConfig.trust_stat_retailers_label, desc: 'Boutiques & shops across India', icon: '🏪' },
  { value: brandConfig.trust_stat_cities, label: brandConfig.trust_stat_cities_label, desc: 'Active delivery locations', icon: '📍' },
  { value: brandConfig.trust_stat_orders, label: brandConfig.trust_stat_orders_label, desc: 'Successfully fulfilled', icon: '📦' },
  { value: brandConfig.trust_stat_experience, label: brandConfig.trust_stat_experience_label, desc: 'In wholesale fashion supply', icon: '🏆' },
];

const TrustSection = () => {
  return (
    <section className={`${styles.section} section-pad`} aria-label="Why retailers trust us">
      <div className={styles.container}>
        {/* Left: Image collage */}
        <div className={`${styles.imageCol} reveal`}>
          <div className={styles.imageGrid}>
            <div className={styles.imgWrap} data-size="tall">
              <img
                src="https://images.pexels.com/photos/4507154/pexels-photo-4507154.jpeg?auto=compress&cs=tinysrgb&w=500"
                alt="Wholesale fashion warehouse"
                className={styles.gridImg}
                loading="lazy"
              />
            </div>
            <div className={styles.imgCol2}>
              <div className={`${styles.imgWrap} reveal stagger-1`}>
                <img
                  src="https://images.pexels.com/photos/8584606/pexels-photo-8584606.jpeg"
                  alt="Bulk packaging and dispatch"
                  className={styles.gridImg}
                  loading="lazy"
                />
              </div>
              <div className={`${styles.imgWrap} reveal stagger-2`}>
                <img
                  src="https://images.pexels.com/photos/31452289/pexels-photo-31452289.jpeg?auto=compress&cs=tinysrgb&w=400"
                  alt="Retail store clothing display"
                  className={styles.gridImg}
                  loading="lazy"
                />
              </div>
            </div>
          </div>

          {/* Floating badge */}
          <div className={`${styles.floatBadge} reveal stagger-3`}>
            <span className={styles.floatIcon}>✅</span>
            <div>
              <p className={styles.floatTitle}>Quality Verified</p>
              <p className={styles.floatSub}>Every piece inspected</p>
            </div>
          </div>
        </div>

        {/* Right: Stats + Text */}
        <div className={styles.contentCol}>
          <span className={`${styles.eyebrow} reveal`}>Why 500+ Retailers Choose Us</span>
          <h2 className={`${styles.title} reveal stagger-1`}>
            Your Most Trusted<br />
            <span className={styles.italicTitle}>Wholesale Partner</span>
          </h2>
          <p className={`${styles.desc} reveal stagger-2`}>
            Since {brandConfig.established_year}, we've been the go-to wholesale supply partner for retailers, boutique owners, and resellers across India. Factory-direct pricing, trending designs, and reliable delivery — every time.
          </p>

          {/* Stats grid */}
          <div className={`${styles.statsGrid} reveal stagger-3`}>
            {stats.map(({ value, label, desc, icon }) => (
              <div key={label} className={styles.statCard}>
                <div className={styles.statHeader}>
                  <span className={styles.statIcon}>{icon}</span>
                  <span className={styles.statValue}>{value}</span>
                </div>
                <span className={styles.statLabel}>{label}</span>
                <span className={styles.statDesc}>{desc}</span>
              </div>
            ))}
          </div>

          {/* CTAs */}
          <div className={`${styles.ctaContainer} reveal stagger-4`} style={{ display: 'flex', gap: '16px', marginTop: '32px' }}>
            <Link to="/enquiry" className={styles.ctaPrimaryBtn}>
              Start Journey
            </Link>
            <Link to="/collections" className={styles.ctaSecondaryBtn}>
              Browse Catalog
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrustSection;
