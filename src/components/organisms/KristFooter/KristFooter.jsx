import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Phone, Mail, MapPin, MessageSquare } from 'lucide-react';
import { brandConfig } from '../../../config/brandConfig';
import styles from './KristFooter.module.css';

const WhatsAppIcon = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" style={{ color: 'inherit' }}>
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
    <path d="M12 2C6.477 2 2 6.477 2 12c0 1.762.47 3.413 1.29 4.843L2 22l5.338-1.272A9.948 9.948 0 0012 22c5.523 0 10-4.477 10-10S17.523 2 12 2zm0 18c-1.614 0-3.12-.423-4.418-1.162l-.318-.188-3.165.754.786-3.077-.207-.327A7.94 7.94 0 014 12c0-4.411 3.589-8 8-8s8 3.589 8 8-3.589 8-8 8z" />
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
  { label: "Women's Collection", href: '/collections?category=ladies' },
  { label: "Men's Collection", href: '/collections?category=men' },
  { label: "Kids Collection", href: '/collections?category=kids' },
  { label: "Sarees", href: '/collections?category=saree' },
  { label: "Blankets & Home", href: '/collections?category=blanket' },
  { label: "Ethnic Wear", href: '/collections?category=ethnic' },
];

const quickLinks = [
  { label: 'About Us', href: '/about' },
  { label: 'How It Works', href: '/how-it-works' },
  { label: 'Contact Us', href: '/contact' },
  { label: 'Terms & Conditions', href: '/terms' },
  { label: 'Privacy Policy', href: '/privacy' },
];

const BrandLogoFooter = () => (
  <div className={styles.logoWrapper}>
    <a href="/" aria-label={`${brandConfig.brand_name} Home`}>
      <img
        src="/rtc_logo.png"
        alt={brandConfig.brand_name}
        style={{ maxWidth: 200, height: 'auto', display: 'block' }}
      />
    </a>
  </div>
);

const KristFooter = () => {
  const navigate = useNavigate();

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
              <BrandLogoFooter />
              <p className={styles.brandDesc}>
                Factory-direct wholesale fashion supplier. Serving 500+ retailers across 10+ cities in India since 2019.
              </p>

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
                <a href={brandConfig.facebook_url} className={styles.socialLink} aria-label="Facebook" target="_blank" rel="noopener noreferrer">
                  <FacebookIcon size={15} />
                </a>
                <a href={brandConfig.instagram_url} className={styles.socialLink} aria-label="Instagram" target="_blank" rel="noopener noreferrer">
                  <InstagramIcon size={15} />
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
