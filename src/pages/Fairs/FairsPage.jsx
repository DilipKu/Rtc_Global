import React, { useState, useEffect } from 'react';
import { supabase } from '../../config/supabaseClient';
import { ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import styles from './FairsPage.module.css';

const FairsPage = () => {
  const [fairs, setFairs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Set document title and SEO meta tags
    document.title = 'Garment Fairs & Events - RTC Global Apparels';

    const setMeta = (name, content, isProperty = false) => {
      const attr = isProperty ? 'property' : 'name';
      let element = document.querySelector(`meta[${attr}="${name}"]`);
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute(attr, name);
        document.head.appendChild(element);
      }
      element.setAttribute('content', content);
    };

    const setLink = (rel, href) => {
      let element = document.querySelector(`link[rel="${rel}"]`);
      if (!element) {
        element = document.createElement('link');
        element.setAttribute('rel', rel);
        document.head.appendChild(element);
      }
      element.setAttribute('href', href);
    };

    setMeta('description', 'Discover upcoming garment fairs showcasing wholesale apparel, trending collections, business networking, and sourcing opportunities across India.');
    setMeta('keywords', 'Wholesale Garment Sourcing & Distribution, Wholesale Western Wear Suppliers, Wholesale Ethnic Wear Suppliers, Wholesale Kurti Suppliers, Wholesale Saree Suppliers, Ladies Garment Wholesaler, Mens Garment Wholesaler, Kids Garment Wholesaler');
    
    setMeta('og:title', 'Garment Fairs & Events - RTC Global Apparels', true);
    setMeta('og:description', 'Discover upcoming garment fairs showcasing wholesale apparel, trending collections, business networking, and sourcing opportunities across India.', true);
    setMeta('og:type', 'website', true);
    setMeta('og:url', 'https://rtcglobalapparels.com/fairs', true);
    setMeta('og:image', 'https://rtcglobalapparels.com/logo-solid.png', true);
    setMeta('og:site_name', 'RTC Global Apparels Pvt Ltd', true);

    setMeta('twitter:card', 'summary_large_image');
    setMeta('twitter:title', 'Garment Fairs & Events - RTC Global Apparels');
    setMeta('twitter:description', 'Discover upcoming garment fairs showcasing wholesale apparel, trending collections, business networking, and sourcing opportunities across India.');
    setMeta('twitter:image', 'https://rtcglobalapparels.com/logo-solid.png');

    setLink('canonical', 'https://rtcglobalapparels.com/fairs');

    const fetchFairs = async () => {
      try {
        const { data, error } = await supabase
          .from('fairs')
          .select('*')
          .eq('is_active', true)
          .order('created_at', { ascending: false });
        
        if (!error && data) {
          setFairs(data);
        }
      } catch (e) {
        console.error("Failed to fetch fairs", e);
      } finally {
        setLoading(false);
      }
    };
    fetchFairs();
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className={styles.page}>
      {/* ── Header ── */}
      <header className={styles.header}>
        <div className="container">
          <div className={styles.breadcrumb}>
            <Link to="/">Home</Link>
            <ChevronRight size={12} className={styles.breadcrumbIcon} />
            <span>Garment Fairs & Events</span>
          </div>
          <h1 className={styles.headerTitle}>Garment Fairs & Events</h1>
          <p className={styles.headerSubtitle}>
            Join us at upcoming industry events to discover our latest collections and network with the team.
          </p>
        </div>
      </header>

      {/* ── Content ── */}
      <section className={styles.galleryContent}>
        <div className="container">
          {loading ? (
            <div className={styles.loadingState}>Loading events...</div>
          ) : fairs.length === 0 ? (
            <div className={styles.emptyState}>
              <h2>No upcoming events right now</h2>
              <p>Check back later for updates on where RTC Global Apparels will be exhibiting next.</p>
            </div>
          ) : (
            <div className={styles.masonryGrid}>
              {fairs.flatMap(fair => (fair.image_urls || []).map((url, idx) => (
                <div key={`${fair.id}-${idx}`} className={styles.masonryItem}>
                  <div className={styles.imageOverlayContainer}>
                    <img 
                      src={url} 
                      alt={fair.title} 
                      className={styles.galleryImg} 
                      loading="lazy"
                    />
                    <div className={styles.hoverOverlay}>
                      <p className={styles.eventLabel}>{fair.location || 'Garment Fair'}</p>
                      <h3 className={styles.eventTitle}>{fair.title}</h3>
                    </div>
                  </div>
                </div>
              )))}
            </div>
          )}
        </div>
      </section>
    </main>
  );
};

export default FairsPage;
