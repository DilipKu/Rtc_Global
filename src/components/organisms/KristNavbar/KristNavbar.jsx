import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Phone, MessageSquare, ChevronDown, Menu, X, FileText } from 'lucide-react';
import { brandConfig } from '../../../config/brandConfig';
import { useCategories } from '../../../hooks/useCategories';
import styles from './KristNavbar.module.css';

const mainNavLinks = [
  { label: 'Home', href: '/' },
  { label: 'Collections', href: '/collections', hasDropdown: true },
  { label: 'Events', href: '/gallery' },
  { label: 'Branches', href: '/branches' },
  { label: 'About Us', href: '/about' },
  { label: 'Contact', href: '/contact' },
];

const secondaryLinks = [
  { label: 'T&C', href: '/terms' },
  { label: 'Privacy', href: '/privacy' },
];

const BrandLogo = () => (
  <Link to="/" className={styles.logoLink} aria-label={`${brandConfig.brand_name} Home`}>
    <img
      src="/rtc_logo.png"
      alt={brandConfig.brand_name}
      className={styles.logoImg}
    />
    <div className={styles.logoText}>
      <span className={styles.logoName}>RTC GLOBAL</span>
      <span className={styles.logoTagline}>APPARELS PVT. LTD.</span>
    </div>
  </Link>
);

const WhatsAppIcon = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
    <path d="M12 2C6.477 2 2 6.477 2 12c0 1.762.47 3.413 1.29 4.843L2 22l5.338-1.272A9.948 9.948 0 0012 22c5.523 0 10-4.477 10-10S17.523 2 12 2zm0 18c-1.614 0-3.12-.423-4.418-1.162l-.318-.188-3.165.754.786-3.077-.207-.327A7.94 7.94 0 014 12c0-4.411 3.589-8 8-8s8 3.589 8 8-3.589 8-8 8z" />
  </svg>
);

const KristNavbar = () => {
  const navigate = useNavigate();
  const { categories } = useCategories();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleInternalNavLink = (href) => (e) => {
    e.preventDefault();
    setIsMenuOpen(false);
    navigate(href, { state: { navTimestamp: Date.now() } });
  };

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isMenuOpen]);

  const phoneNumbers = brandConfig.phone_number.split(',').map(n => n.trim());

  return (
    <>
      <header className={`${styles.navbar} ${isScrolled ? styles.scrolled : ''}`} role="banner">
        <div className={styles.container}>
          {/* Logo */}
          <BrandLogo />

          {/* Desktop Navigation Group */}
          <div className={styles.navGroup}>
            <nav className={styles.desktopNav} aria-label="Main navigation">
              {mainNavLinks.map(({ label, href, hasDropdown }) => (
                <div key={label} className={hasDropdown ? styles.navItemDropdown : ''}>
                  <Link to={href} className={styles.navLink}>
                    {label}
                    {hasDropdown && <ChevronDown size={14} aria-hidden="true" className={styles.dropdownIcon} />}
                  </Link>
                  {hasDropdown && categories.length > 0 && (
                    <div className={styles.dropdownMenu}>
                      {categories.map((cat) => (
                        <a
                          key={cat.id}
                          href={`/collections?category=${cat.id}`}
                          className={styles.dropdownItem}
                          onClick={handleInternalNavLink(`/collections?category=${cat.id}`)}
                        >
                          {cat.name}
                        </a>
                      ))}
                      <Link to="/collections" className={styles.dropdownItem} style={{fontWeight: 'bold', borderTop: '1px solid #eee', marginTop: '5px', paddingTop: '8px'}}>
                        View All Collections
                      </Link>
                    </div>
                  )}
                </div>
              ))}
            </nav>

            <span className={styles.navSeparator} aria-hidden="true" />

            <nav className={styles.secondaryNav} aria-label="Secondary navigation">
              {secondaryLinks.map(({ label, href }) => (
                <Link key={label} to={href} className={styles.secondaryNavLink}>
                  {label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Actions */}
          <div className={styles.actions}>
            {/* Phone Icon */}
            <a href={`tel:${phoneNumbers[0]}`} className={styles.iconBtn} aria-label="Call us">
              <Phone size={18} />
            </a>
            
            {/* WhatsApp Icon */}
            <a
              href={brandConfig.whatsapp_chat_url}
              className={`${styles.iconBtn} ${styles.whatsappIconBtn}`}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Chat on WhatsApp"
            >
              <WhatsAppIcon size={18} />
            </a>

            {/* Bulk Enquiry CTA */}
            <Link to="/enquiry" className={styles.enquiryBtn} aria-label="Start bulk enquiry">
              <FileText size={16} />
              <span>Bulk Enquiry</span>
            </Link>

            <button
              className={styles.menuBtn}
              onClick={() => setIsMenuOpen(true)}
              aria-label="Open menu"
            >
              <Menu size={22} />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Overlay */}
      {isMenuOpen && (
        <div
          className={styles.overlay}
          onClick={() => setIsMenuOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Mobile Drawer */}
      <nav
        className={`${styles.mobileDrawer} ${isMenuOpen ? styles.drawerOpen : ''}`}
        aria-label="Mobile navigation"
      >
        <div className={styles.drawerHeader}>
          <BrandLogo />
          <button
            className={styles.closeBtn}
            onClick={() => setIsMenuOpen(false)}
            aria-label="Close menu"
          >
            <X size={22} />
          </button>
        </div>

        <ul className={styles.mobileLinks}>
          {mainNavLinks.map(({ label, href }) => (
            <li key={label}>
              <Link to={href} className={styles.mobileLink} onClick={() => setIsMenuOpen(false)}>
                {label}
              </Link>
            </li>
          ))}
          {/* T&C and Privacy inside mobile menu as small links */}
          <div className={styles.mobileSecondaryGroup}>
            {secondaryLinks.map(({ label, href }) => (
              <li key={label}>
                <Link to={href} className={styles.mobileSecondaryLink} onClick={() => setIsMenuOpen(false)}>
                  {label}
                </Link>
              </li>
            ))}
          </div>
        </ul>

        <div className={styles.mobileActions}>
          <a
            href={brandConfig.whatsapp_chat_url}
            className={styles.mobileWhatsapp}
            target="_blank"
            rel="noopener noreferrer"
          >
            <WhatsAppIcon size={18} />
            Chat on WhatsApp
          </a>
          <Link to="/enquiry" className={styles.mobileEnquiry}>
            <MessageSquare size={18} />
            Start Bulk Enquiry
          </Link>
        </div>

        <div className={styles.drawerContact}>
          <a href={`tel:${phoneNumbers[0]}`}>
            <Phone size={14} /> {phoneNumbers.join(', ')}
          </a>
        </div>
      </nav>
    </>
  );
};

export default KristNavbar;


