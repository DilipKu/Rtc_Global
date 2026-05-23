import React, { useState } from 'react';
import { MessageCircle, Phone, FileText, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import { brandConfig } from '../../../config/brandConfig';
import styles from './FloatingCTA.module.css';

const FloatingCTA = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const primaryPhone = brandConfig.phone_number.split(',')[0].trim();

  return (
    <div 
      className={styles.fabContainer}
      onMouseEnter={() => setIsExpanded(true)}
      onMouseLeave={() => setIsExpanded(false)}
    >
      <div className={`${styles.fabMenu} ${isExpanded ? styles.expanded : ''}`}>
        
        {/* Enquiry (Internal Route) */}
        <Link
          to="/enquiry"
          className={`${styles.fabAction} ${styles.actionEnquiry}`}
          aria-label="Bulk Enquiry"
        >
          <FileText size={20} />
          <span className={styles.fabTooltip}>Enquiry</span>
        </Link>

        {/* Call */}
        <a
          href={`tel:${primaryPhone}`}
          className={`${styles.fabAction} ${styles.actionCall}`}
          aria-label="Call Us"
        >
          <Phone size={20} />
          <span className={styles.fabTooltip}>Call Support</span>
        </a>

        {/* WhatsApp */}
        <a
          href={brandConfig.whatsapp_chat_url}
          target="_blank"
          rel="noopener noreferrer"
          className={`${styles.fabAction} ${styles.actionWhatsapp}`}
          aria-label="WhatsApp"
        >
          <MessageCircle size={20} />
          <span className={styles.fabTooltip}>WhatsApp Order</span>
        </a>
      </div>
      
      {/* Main FAB Button */}
      <button 
        className={styles.fabMain}
        onClick={() => setIsExpanded(!isExpanded)}
        aria-label="Quick Actions"
      >
        <div className={`${styles.iconContainer} ${isExpanded ? styles.iconRotate : ''}`}>
          {isExpanded ? <X size={26} /> : <MessageCircle size={26} />}
        </div>
      </button>
    </div>
  );
};

export default FloatingCTA;