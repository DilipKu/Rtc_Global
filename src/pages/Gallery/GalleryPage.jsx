import React, { useState } from 'react';
import styles from './GalleryPage.module.css';

// Import local images
import event1 from '../../assets/images/event1.png';
import event2 from '../../assets/images/event2.png';

// Gallery dummy images
const eventsData = [
  {
    id: 'e1',
    category: 'Garment Fair',
    title: 'Garment Fair Event 1',
    image: event1,
  },
  {
    id: 'e2',
    category: 'Garment Fair',
    title: 'Garment Fair Event 2',
    image: event2,
  },
  {
    id: 1,
    category: 'Garment Fair',
    title: 'RTC Global Gallery Showcase',
    image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&q=80',
  },
  {
    id: 2,
    category: 'Garment Fair',
    title: 'Wholesale Highlights',
    image: 'https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=800&q=80',
  },
  {
    id: 3,
    category: 'Garment Fair',
    title: 'Store Front',
    image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800&q=80',
  },
  {
    id: 4,
    category: 'Garment Fair',
    title: 'Fashion Hub',
    image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=800&q=80',
  }
];

const categories = ['All', 'Garment Fair'];

const GalleryPage = () => {
  const [activeTab, setActiveTab] = useState('All');

  const filteredEvents = activeTab === 'All' 
    ? eventsData 
    : eventsData.filter(event => event.category === activeTab);

  return (
    <main className={styles.page}>
      <header className={styles.header}>
        <div className="container">
          <h1 className={styles.headerTitle}>Garment Fair & Events</h1>
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

