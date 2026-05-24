import React from 'react';
import { Factory, TrendingUp, Package, Truck, Headphones, ShieldCheck, ArrowUpRight } from 'lucide-react';
import { valuePropositions } from '../../../data/mockData';
import styles from './FeaturesSection.module.css';

const iconMap = { Factory, TrendingUp, Package, Truck, Headphones, ShieldCheck };

/* ── We define the grid spans for a 6-item zigzag bento layout ── */
const getBentoClass = (index) => {
  switch (index) {
    case 0: return styles.span2;
    case 1: return styles.span1;
    case 2: return styles.span1;
    case 3: return styles.span2;
    case 4: return styles.span2;
    case 5: return styles.span1;
    default: return styles.span1;
  }
};

const FeaturesSection = () => {
  return (
    <section className={`${styles.section} reveal`} aria-label="Core Capabilities">
      {/* Background Ambience */}
      <div className={styles.bgGlow} aria-hidden="true" />
      <div className={styles.bgNoise} aria-hidden="true" />

      <div className={styles.container}>


        {/* ── Bento Grid ── */}
        <div className={styles.bentoGrid}>
          {valuePropositions.map(({ id, icon, title, description }, idx) => {
            const IconComponent = iconMap[icon];
            const bentoClass = getBentoClass(idx);

            return (
              <div key={id} className={`${styles.featureCard} ${bentoClass} reveal stagger-${(idx % 6) + 1}`}>
                {/* Internal gradient mesh for the card */}
                <div className={styles.cardGlow} />

                <div className={styles.cardContent}>
                  <div className={styles.cardHeader}>
                    {IconComponent && (
                      <div className={styles.iconWrapper}>
                        <IconComponent size={22} strokeWidth={1.75} className={styles.icon} aria-hidden="true" />
                      </div>
                    )}
                    <span className={styles.cardNumber}>0{idx + 1}</span>
                  </div>

                  <div className={styles.textWrap}>
                    <h3 className={styles.featureTitle}>{title}</h3>
                    <p className={styles.featureDesc}>{description}</p>
                  </div>
                </div>

                {/* Hover Interaction Arrow */}
                <div className={styles.actionArrow}>
                  <ArrowUpRight size={18} />
                </div>
                
                {/* Glowing Border Ring on Hover */}
                <div className={styles.cardBorder} />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
