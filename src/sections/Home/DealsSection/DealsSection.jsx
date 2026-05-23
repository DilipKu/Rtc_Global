import React from 'react';
import { Link } from 'react-router-dom';
import { Users, FileDown } from 'lucide-react';
import { brandConfig } from '../../../config/brandConfig';
import styles from './DealsSection.module.css';

const WhatsAppIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
    <path d="M12 2C6.477 2 2 6.477 2 12c0 1.762.47 3.413 1.29 4.843L2 22l5.338-1.272A9.948 9.948 0 0012 22c5.523 0 10-4.477 10-10S17.523 2 12 2zm0 18c-1.614 0-3.12-.423-4.418-1.162l-.318-.188-3.165.754.786-3.077-.207-.327A7.94 7.94 0 014 12c0-4.411 3.589-8 8-8s8 3.589 8 8-3.589 8-8 8z" />
  </svg>
);

const DealsSection = () => {
  return (
    <section className={`${styles.section} section-pad`} aria-label="Become a dealer">
      <div className={styles.container}>
        {/* Left column */}
        <div className={styles.content}>
          <span className={`${styles.badge} reveal`}>🤝 Partner With Us</span>
          <h2 className={`${styles.title} reveal stagger-1`}>
            Become an Authorised<br />
            <span className={styles.italicTitle}>Wholesale Dealer</span>
          </h2>
          <p className={`${styles.description} reveal stagger-2`}>
            Join our growing network of 500+ retail partners. Get exclusive access to early collections, priority stock allocation, and dedicated business support.
          </p>

          <ul className={`${styles.perks} reveal stagger-3`}>
            <li>✅ Early access to new collections</li>
            <li>✅ Priority stock & bulk discounts</li>
            <li>✅ Dedicated account manager</li>
            <li>✅ Flexible payment options</li>
          </ul>

          <div className={`${styles.ctaRow} reveal stagger-4`}>
            <Link to="/dealer-registration" className={styles.ctaPrimary}>
              <Users size={18} aria-hidden="true" />
              {brandConfig.cta_become_dealer}
            </Link>
            <a href={brandConfig.whatsapp_chat_url} className={styles.ctaWhatsapp} target="_blank" rel="noopener noreferrer">
              <WhatsAppIcon />
              Chat on WhatsApp
            </a>
          </div>

          <a href={brandConfig.catalog_download_url} className={`${styles.downloadLink} reveal stagger-4`}>
            <FileDown size={16} aria-hidden="true" />
            {brandConfig.cta_catalog}
          </a>
        </div>

        {/* Right image */}
        <div className={`${styles.imageArea} reveal`}>
          <div className={styles.imageFrame}>
            <img
              src="https://images.unsplash.com/photo-1731459285757-f391f962f523?w=700&q=80"
              alt="Wholesale fashion business partner"
              className={styles.dealImage}
              loading="lazy"
            />
            <div className={styles.overlay}>
              <div className={styles.overlayCard}>
                <p className={styles.overlayTitle}>👋 Join our network</p>
                <p className={styles.overlayValue}>500+ Happy Dealers</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DealsSection;
