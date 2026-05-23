import { Link } from 'react-router-dom';
import { Factory, TrendingUp, Package, Truck, Headphones, ShieldCheck } from 'lucide-react';
import { valuePropositions } from '../../../data/mockData';
import styles from './ValuePropositionSection.module.css';

const iconMap = { Factory, TrendingUp, Package, Truck, Headphones, ShieldCheck };

const ValuePropositionSection = () => {
  return (
    <section className={`${styles.section} section-pad`} aria-label="Why choose us for wholesale">
      <div className={styles.container}>
        <div className={`${styles.header} reveal`}>
          <span className={styles.eyebrow}>Our Advantage</span>
          <h2 className={styles.title}>Why Retailers Choose Us</h2>
          <p className={styles.subtitle}>
            Everything you need to build a thriving retail business — under one roof.
          </p>
        </div>

        <div className={styles.grid}>
          {valuePropositions.map(({ id, icon, title, description }, idx) => {
            const IconComponent = iconMap[icon];
            return (
              <div key={id} className={`${styles.card} reveal stagger-${(idx % 3) + 1}`}>
                <div className={styles.iconWrap}>
                  {IconComponent && <IconComponent size={28} aria-hidden="true" />}
                </div>
                <div className={styles.cardContent}>
                  <h3 className={styles.cardTitle}>{title}</h3>
                  <p className={styles.cardDesc}>{description}</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* CTA Row */}
        <div className={`${styles.ctaRow} reveal stagger-3`}>
          <Link to="/enquiry" className={styles.ctaPrimary}>
            Start Your Wholesale Journey →
          </Link>
          <button 
            onClick={() => alert("New Season Catalog is coming soon! Our sourcing team is currently finalizing the latest corporate and brand inventories. Please check back shortly or connect on WhatsApp for immediate product availability.")} 
            className={styles.ctaSecondary}
          >
            Browse Full Catalog
          </button>
        </div>
      </div>
    </section>
  );
};

export default ValuePropositionSection;
