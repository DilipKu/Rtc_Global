import React, { useState } from 'react';
import styles from './GalleryPage.module.css';

// Event Image Imports
import eventImg2 from '../../assets/images/events/pic2.jpeg';
import eventImg3 from '../../assets/images/events/pic3.jpeg';
import eventImg4 from '../../assets/images/events/pic4.jpeg';
import eventImg6 from '../../assets/images/events/pic6.jpeg';
import eventImg7 from '../../assets/images/events/pic7.jpeg';
import eventImg8 from '../../assets/images/events/pic8.jpeg';
import eventImg10 from '../../assets/images/events/pic10.jpeg';
import eventImg12 from '../../assets/images/events/pic12.jpeg';
import eventImg13 from '../../assets/images/events/pic13.jpeg';
import eventImg14 from '../../assets/images/events/pic14.jpeg';
import eventImg16 from '../../assets/images/events/pic16.jpeg';
import eventImg17 from '../../assets/images/events/pic17.jpeg';
import eventImg18 from '../../assets/images/events/pic18.jpeg';
import eventImg20 from '../../assets/images/events/pic20.jpeg';
import eventImg22 from '../../assets/images/events/pic22.jpeg';
import eventImg23 from '../../assets/images/events/pic23.jpeg';

const eventsData = [
  { id: 2, category: 'Trade Shows', title: 'National Textile Expo', image: eventImg2 },
  { id: 3, category: 'Brand Events', title: 'Retailer Meetup', image: eventImg3 },
  { id: 4, category: 'Warehouse Visits', title: 'Inventory Preview', image: eventImg4 },
  
  { id: 6, category: 'Trade Shows', title: 'B2B Connect', image: eventImg6 },
  { id: 7, category: 'Warehouse Visits', title: 'Factory Visit', image: eventImg7 },
  { id: 8, category: 'Brand Events', title: 'Strategy Meet', image: eventImg8 },
  
  { id: 10, category: 'Trade Shows', title: 'Apparel Expo', image: eventImg10 },
  
  { id: 12, category: 'Trade Shows', title: 'Textile Mega Event', image: eventImg12 },
  { id: 13, category: 'Warehouse Visits', title: 'Stockroom Gallery', image: eventImg13 },
  { id: 14, category: 'Brand Events', title: 'Partnership Summit', image: eventImg14 },
  
  { id: 16, category: 'Trade Shows', title: 'Regional Expo', image: eventImg16 },
  { id: 17, category: 'Warehouse Visits', title: 'Bulk Dispatch Area', image: eventImg17 },
  { id: 18, category: 'Brand Events', title: 'Success Celebration', image: eventImg18 },
  
  { id: 20, category: 'Trade Shows', title: 'Global Garment Meet', image: eventImg20 },
  
  { id: 22, category: 'Trade Shows', title: 'Retail Convergence', image: eventImg22 },
  { id: 23, category: 'Brand Events', title: 'Strategic Roadmap 2026', image: eventImg23 },
];

const categories = ['All', 'Trade Shows', 'Warehouse Visits', 'Brand Events'];

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

