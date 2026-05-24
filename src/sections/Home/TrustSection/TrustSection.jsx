import React from 'react';
import { Link } from 'react-router-dom';
import { brandConfig } from '../../../config/brandConfig';
import { ArrowUpRight } from 'lucide-react';
import styles from './TrustSection.module.css';

const stats = [
  { value: brandConfig.trust_stat_retailers, label: 'RETAILERS' },
  { value: brandConfig.trust_stat_cities, label: 'CITIES' },
  { value: brandConfig.trust_stat_orders, label: 'ORDERS' },
  { value: brandConfig.trust_stat_experience, label: 'YEARS EXP' },
];

const TrustSection = () => {
  return (
    <section className={`${styles.section} reveal`} aria-label="Company Leadership & Trust">
      {/* Immersive Cinematic Background */}
      <div className={styles.bgImageWrapper}>
        <img
          src="https://images.pexels.com/photos/4507154/pexels-photo-4507154.jpeg?auto=compress&cs=tinysrgb&w=1920&q=80"
          alt="Fashion logistics and distribution"
          className={styles.bgImage}
          loading="lazy"
        />
        <div className={styles.bgOverlay} aria-hidden="true" />
      </div>

      <div className={styles.container}>
        {/* Floating Glassmorphism Content Panel */}
        <div className={styles.glassPanel}>
          <div className={styles.eyebrowRow}>
            <span className={styles.eyebrowDot} />
            <span className={styles.eyebrow}>Why 500+ Retailers Choose Us</span>
          </div>
          
          <h2 className={styles.title}>
            Your Most Trusted <br />
            <span className={styles.titleItalic}>Wholesale Partner</span>
          </h2>
          
          <p className={styles.description}>
            Since {brandConfig.established_year}, we’ve engineered the supply chain for India’s top boutiques and resellers. Factory-direct pricing, curated trending designs, and zero-friction logistics.
          </p>

          {/* Minimal Editorial Stats */}
          <div className={styles.statsBar}>
            {stats.map(({ value, label }, idx) => (
              <React.Fragment key={label}>
                <div className={styles.statItem}>
                  <span className={styles.statValue}>{value}</span>
                  <span className={styles.statLabel}>{label}</span>
                </div>
                {idx < stats.length - 1 && <div className={styles.statDivider} />}
              </React.Fragment>
            ))}
          </div>

          <div className={styles.actionRow}>
            <Link to="/enquiry" className={styles.primaryBtn}>
              Partner With Us
              <ArrowUpRight size={18} strokeWidth={2.5} />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrustSection;
