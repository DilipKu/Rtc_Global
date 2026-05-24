import React, { useState } from 'react';
import styles from './GalleryPage.module.css';

// Fair images added back via public assets
const eventsData = [
  {
    id: 1,
    category: 'Fair',
    title: 'RTC Global Fair Showcase',
    image: '/fair-photo-1.jpg',
  },
  {
    id: 2,
    category: 'Fair',
    title: 'Trade Fair Highlights',
    image: '/fair-photo-2.jpg',
  },
];

const categories = ['All', 'Fair'];

const GalleryPage = () => {
  const [activeTab, setActiveTab] = useState('All');

  const filteredEvents = activeTab === 'All' 
    ? eventsData 
    : eventsData.filter(event => event.category === activeTab);

  return (
    <main className={styles.page}>
      <header className={styles.header}>
        <div className="container">
          <h1 className={styles.headerTitle}>Events & Highlights</h1>
          <p className={styles.headerSubtitle}>
            Showcasing our brand presence and wholesale journey through authentic moments
          </p>

          <div className={styles.filterTabs}>
            {categories.map(tab => (
              <button
                key={tab}
                className={`${styles.tab} ${activeTab === tab ? styles.activeTab : ''}`}
                onClick={() => setActiveTab(tab)}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>
      </header>

      <section className={styles.galleryContent}>
        <div className="container">
          <div className={styles.masonryGrid}>
            {filteredEvents.map((event) => (
              <div key={event.id} className={styles.masonryItem}>
                <div className={styles.imageOverlayContainer}>
                  <img 
                    src={event.image} 
                    alt={event.title} 
                    className={styles.galleryImg} 
                    loading="lazy"
                  />
                  <div className={styles.hoverOverlay}>
                    <p className={styles.eventLabel}>{event.category}</p>
                    <h3 className={styles.eventTitle}>{event.title}</h3>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
};

export default GalleryPage;

