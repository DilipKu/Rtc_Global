import React, { useState, useEffect } from 'react';
import { supabase } from '../../config/supabaseClient';
import { ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import styles from './FairsPage.module.css';

const FairsPage = () => {
  const [fairs, setFairs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
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
