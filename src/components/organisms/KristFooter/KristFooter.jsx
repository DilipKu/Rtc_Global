import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Phone, Mail, MapPin, MessageSquare, Youtube } from 'lucide-react';
import { brandConfig } from '../../../config/brandConfig';
import { useTheme } from '../../../context/ThemeContext';
import styles from './KristFooter.module.css';

const WhatsAppIcon = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 16 16" fill="currentColor" aria-hidden="true" style={{ color: 'inherit' }}>
    <path d="M13.601 2.326A7.854 7.854 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.933 7.933 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.898 7.898 0 0 0 13.6 2.326zM7.994 14.521a6.573 6.573 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.557 6.557 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592zm3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.729.729 0 0 0-.529.247c-.182.198-.691.677-.691 1.654 0 .977.71 1.916.81 2.049.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232z"/>
  </svg>
);

const FacebookIcon = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: 'inherit' }}>
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
  </svg>
);

const InstagramIcon = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: 'inherit' }}>
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
  </svg>
);

const collectionsLinks = [
  { label: "Women's Collection", href: '/wholesale-ladies-wear-suppliers' },
  { label: "Men's Collection", href: '/wholesale-mens-wear-suppliers' },
  { label: "Kids Collection", href: '/wholesale-kids-wear-suppliers' },
  { label: "Sarees", href: '/wholesale-saree-suppliers' },
  { label: "Blankets & Home", href: '/wholesale-blanket-suppliers' },
  { label: "Ethnic Wear", href: '/wholesale-ethnic-wear-suppliers' },
];

const quickLinks = [
  { label: 'About Us', href: '/about' },
  { label: 'How It Works', href: '/how-it-works' },
  { label: 'Contact Us', href: '/contact' },
  { label: 'Terms & Conditions', href: '/terms' },
  { label: 'Privacy Policy', href: '/privacy' },
];


const BrandLogoFooter = ({ isDark }) => (
  <div className={styles.logoWrapper}>
    <a href="/" aria-label={`${brandConfig.brand_name} Home`}>
      <img
        src={isDark ? "/logo-transparent.png" : "/logo-solid.png"}
        alt={brandConfig.brand_name}
        style={{ maxWidth: 140, height: 'auto', display: 'block' }}
      />
    </a>
  </div>
);


const KristFooter = () => {
  const navigate = useNavigate();
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const handleCatalogClick = (e) => {
    e.preventDefault();
    alert("New Season Catalog is coming soon! Our design team is currently finalizing the latest ethnic and western collections. Please check back shortly or connect on WhatsApp for immediate product availability.");
  };

  const handleInternalFooterLink = (href) => (e) => {
    e.preventDefault();
    navigate(href, { state: { navTimestamp: Date.now() } });
  };

  return (
    <footer className={styles.footer}>
      {/* Top CTA Strip */}
      <div className={styles.ctaStrip}>
        <div className={styles.stripContainer}>
          <div className={styles.stripText}>
            <h3 className={styles.stripTitle}>Start Your Wholesale Journey Today</h3>
            <p className={styles.stripSub}>Low MOQ · Factory Prices · Pan India Delivery</p>
          </div>
          <div className={styles.stripActions}>
            <Link to="/enquiry" className={styles.stripPrimary}>
              <MessageSquare size={16} />
              Send Bulk Enquiry
            </Link>
            <a href={brandConfig.whatsapp_chat_url} className={styles.stripWhatsapp} target="_blank" rel="noopener noreferrer">
              <WhatsAppIcon size={16} />
              {brandConfig.cta_secondary}
            </a>
          </div>
        </div>
      </div>

      {/* Main footer */}
      <div className={styles.main}>
        <div className={styles.container}>
          <div className={styles.grid}>
            {/* Brand column */}
            <div className={styles.brandCol}>
              <BrandLogoFooter isDark={isDark} />

              <ul className={styles.contactList}>
                <li>
                  <Phone size={14} aria-hidden="true" />
                  <a href={`tel:${brandConfig.phone_number}`}>{brandConfig.phone_number}</a>
                </li>
                <li>
                  <WhatsAppIcon size={14} />
                  <a href={brandConfig.whatsapp_chat_url} target="_blank" rel="noopener noreferrer">
                    WhatsApp: {brandConfig.whatsapp_number}
                  </a>
                </li>
                <li>
                  <Mail size={14} aria-hidden="true" />
                  <a href={`mailto:${brandConfig.email}`}>{brandConfig.email}</a>
                </li>
                <li>
                  <MapPin size={14} aria-hidden="true" />
                  <address>{brandConfig.business_address}</address>
                </li>
              </ul>

              {/* {brandConfig.gst_number && (
                <p className={styles.gst}>GST: {brandConfig.gst_number}</p>
              )} */}

              <div className={styles.socialLinks}>
                <a href={brandConfig.facebook_url} className={`${styles.socialLink} ${styles.socialFacebook}`} aria-label="Facebook" target="_blank" rel="noopener noreferrer">
                  <FacebookIcon size={15} />
                </a>
                <a href={brandConfig.instagram_url} className={`${styles.socialLink} ${styles.socialInstagram}`} aria-label="Instagram" target="_blank" rel="noopener noreferrer">
                  <InstagramIcon size={15} />
                </a>
                <a href={brandConfig.youtube_url || '#'} className={`${styles.socialLink} ${styles.socialYoutube}`} aria-label="YouTube" target="_blank" rel="noopener noreferrer">
                  <Youtube size={15} />
                </a>
                <a href={brandConfig.whatsapp_chat_url} className={`${styles.socialLink} ${styles.socialWhatsapp}`} aria-label="WhatsApp" target="_blank" rel="noopener noreferrer">
                  <WhatsAppIcon size={15} />
                </a>
              </div>
            </div>

            {/* Categories */}
            <div className={styles.linksCol}>
              <h3 className={styles.colTitle}>Categories</h3>
              <ul className={styles.linkList}>
                {collectionsLinks.map(({ label, href }) => (
                  <li key={label}>
                    {href.startsWith('/') ? (
                      <a href={href} className={styles.link} onClick={handleInternalFooterLink(href)}>{label}</a>
                    ) : (
                      <a href={href} className={styles.link}>{label}</a>
                    )}
                  </li>
                ))}
              </ul>
            </div>

            {/* Quick Links */}
            <div className={styles.linksCol}>
              <h3 className={styles.colTitle}>Quick Links</h3>
              <ul className={styles.linkList}>
                {quickLinks.map(({ label, href }) => (
                  <li key={label}>
                    {label === 'Download Catalog' ? (
                      <button onClick={handleCatalogClick} className={styles.link}>{label}</button>
                    ) : href.startsWith('/') ? (
                      <Link to={href} className={styles.link}>{label}</Link>
                    ) : (
                      <a href={href} className={styles.link} target="_blank" rel="noopener noreferrer">{label}</a>
                    )}
                  </li>
                ))}
              </ul>
            </div>

            {/* Enquiry / Catalog */}
            <div className={styles.enquiryCol}>
              <h3 className={styles.colTitle}>Get in Touch</h3>
              <p className={styles.enquiryText}>
                Connect with our B2B sales team for bulk enquiries and custom manufacturing orders.
              </p>


              <div className={styles.businessHours}>
                <p className={styles.hoursLabel}>Business Hours</p>
                <p className={styles.hoursValue}>{brandConfig.business_hours}</p>
              </div>
            </div>
          </div>
        </div>
      </div>


      {/* Bottom bar */}
      <div className={styles.bottomBar}>
        <div className={styles.bottomContainer}>
          <p className={styles.copyright}>
            © {new Date().getFullYear()} {brandConfig.brand_name}. All rights reserved.
          </p>
          <p className={styles.poweredBy}>
            Wholesale B2B Platform · Factory Direct Fashion
          </p>
        </div>
      </div>
    </footer>
  );
};

export default KristFooter;
