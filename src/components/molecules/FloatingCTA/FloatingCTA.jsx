import React, { useState, useEffect } from 'react';
import { brandConfig } from '../../../config/brandConfig';
import styles from './FloatingCTA.module.css';

const WhatsAppIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
    <path d="M12 2C6.477 2 2 6.477 2 12c0 1.762.47 3.413 1.29 4.843L2 22l5.338-1.272A9.948 9.948 0 0012 22c5.523 0 10-4.477 10-10S17.523 2 12 2zm0 18c-1.614 0-3.12-.423-4.418-1.162l-.318-.188-3.165.754.786-3.077-.207-.327A7.94 7.94 0 014 12c0-4.411 3.589-8 8-8s8 3.589 8 8-3.589 8-8 8z" />
  </svg>
);

const FloatingCTA = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => setVisible(window.scrollY > 300);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className={`${styles.wrapper} ${visible ? styles.visible : ''}`} aria-live="polite">
      {/* Enquiry button */}
      <a
        href="/enquiry"
        className={styles.enquiryFloat}
        aria-label="Start bulk enquiry"
      >
        <span className={styles.enquiryLabel}>Bulk Enquiry</span>
      </a>

      {/* WhatsApp button */}
      <a
        href={brandConfig.whatsapp_chat_url}
        className={styles.waFloat}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
      >
        <WhatsAppIcon />
        <span className={styles.waPulse} aria-hidden="true" />
      </a>
    </div>
  );
};

export default FloatingCTA;
