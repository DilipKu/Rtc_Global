import React from 'react';
import { Factory, TrendingUp, Package, Truck, Headphones, ShieldCheck } from 'lucide-react';
import { valuePropositions } from '../../../data/mockData';
import styles from './FeaturesSection.module.css';

const iconMap = { Factory, TrendingUp, Package, Truck, Headphones, ShieldCheck };

const FeaturesSection = () => {
  return (
    <section className={`${styles.section} reveal`} aria-label="Business advantages">
      <div className={styles.container}>
        {valuePropositions.map(({ id, icon, title, description }, idx) => {
          const IconComponent = iconMap[icon];
          return (
            <div key={id} className={`${styles.feature} reveal stagger-${(idx % 6) + 1}`}>
              {IconComponent && (
                <div className={styles.iconWrapper}>
                  <IconComponent size={24} aria-hidden="true" />
                </div>
              )}
              <div className={styles.text}>
                <h3 className={styles.featureTitle}>{title}</h3>
                <p className={styles.featureDesc}>{description}</p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default FeaturesSection;
