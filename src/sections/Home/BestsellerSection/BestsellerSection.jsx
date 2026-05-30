import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import ProductCard from '../../../components/molecules/ProductCard/ProductCard';
import { useProducts } from '../../../hooks/useProducts';
import styles from './BestsellerSection.module.css';

const BestsellerSection = () => {
  const { products, loading } = useProducts({ limit: 8, isBestseller: true });

  if (loading && products.length === 0) {
    return (
      <div className={styles.loaderWrapper}>
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#0B1A2F]"></div>
      </div>
    );
  }

  if (!loading && products.length === 0) {
    return null;
  }

  return (
    <section className={`${styles.section} section-pad`} aria-label="Featured wholesale collections">
      <div className={styles.container}>
        <div className={styles.header}>
          <div className="reveal">
            <span className={styles.eyebrow}>Trending Now</span>
            <h2 className={styles.title}>Featured Collections</h2>
            <p className={styles.subtitle}>
              Curated bestsellers and new arrivals — handpicked for retail and boutique buyers.
            </p>
          </div>
          <Link to="/collections" className={`${styles.viewAll} reveal stagger-1`}>
            View All Categories <ArrowRight size={18} />
          </Link>
        </div>

        <div className={styles.grid}>
          {products.map((product, idx) => (
            <div key={product.id} className={`reveal stagger-${(idx % 4) + 1}`} style={{position: 'relative'}}>
              <Link 
                to={`/enquiry?product=${encodeURIComponent(product.collection)}&sku=${product.sku}&category=${encodeURIComponent(product.category)}&image=${encodeURIComponent(product.image)}`} 
                style={{position: 'absolute', inset: 0, zIndex: 10}} 
                aria-label={`Enquiry for ${product.collection}`}
              />
              <ProductCard
                sku={product.sku}
                collection={product.collection}
                category={product.category}
                image={product.image}
                badge={product.badge}
              />
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className={`${styles.bottomCta} reveal stagger-4`}>
          <div className={styles.ctaContent}>
            <p className={styles.ctaText}>Looking for a specific style or custom bulk order?</p>
            <Link to="/enquiry" className={styles.ctaBtn}>
              <span>Send Bulk Enquiry</span>
              <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BestsellerSection;
