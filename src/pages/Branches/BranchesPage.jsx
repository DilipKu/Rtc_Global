import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Phone, ChevronRight, User, Globe, Grid, Map as MapIcon, Search, Send, Loader2 } from 'lucide-react';
import styles from './BranchesPage.module.css';
import { useBranches } from '../../hooks/useBranches';

const REGIONS = [
  { id: 'all', name: 'All India' },
  { id: 'ncr', name: 'Delhi NCR' },
  { id: 'north', name: 'North India' },
  { id: 'south', name: 'South India' },
  { id: 'west', name: 'West India' },
  { id: 'east', name: 'East India' }
];

// Helper to determine region on the fly
const getBranchRegion = (cityName) => {
  const name = cityName.toLowerCase();
  if (name.includes('gandhi') || name.includes('chandni') || name.includes('tank') || name.includes('jafrabad')) {
    return 'ncr';
  }
  if (name.includes('ludhiana') || name.includes('kanpur') || name.includes('jaipur') || name.includes('amroha')) {
    return 'north';
  }
  if (name.includes('bengaluru') || name.includes('tirupur') || name.includes('erode')) {
    return 'south';
  }
  if (name.includes('mumbai') || name.includes('surat') || name.includes('ahmedabad') || name.includes('nagpur') || name.includes('indore') || name.includes('ulhas')) {
    return 'west';
  }
  if (name.includes('kolkata')) {
    return 'east';
  }
  return 'north';
};

const BranchesPage = () => {
  const { branches, loading } = useBranches();
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'map'
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRegion, setSelectedRegion] = useState('all');

  if (loading && branches.length === 0) {
    return (
      <div className={styles.loaderWrapper} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '60vh' }}>
        <Loader2 className="animate-spin" size={48} style={{ color: 'var(--color-gold-500)' }} />
      </div>
    );
  }

  // Filter branches based on region and search query
  const filteredBranches = branches.filter((loc) => {
    const region = getBranchRegion(loc.city);
    const matchesRegion = selectedRegion === 'all' || region === selectedRegion;
    
    const query = searchQuery.toLowerCase();
    const matchesSearch = 
      loc.city.toLowerCase().includes(query) ||
      loc.person.toLowerCase().includes(query) ||
      loc.address.toLowerCase().includes(query);
      
    return matchesRegion && matchesSearch;
  });

  const getWhatsappLink = (phone, city) => {
    if (!phone) return '#';
    // Strip non-numbers, default to Indian code 91 if not present
    const cleanPhone = phone.replace(/\D/g, '');
    if (!cleanPhone) return '#';
    const fullPhone = cleanPhone.startsWith('91') && cleanPhone.length > 10 ? cleanPhone : `91${cleanPhone}`;
    const text = encodeURIComponent(`Hello, I am a B2B retailer looking to connect with RTC Global Apparels regarding wholesale orders in ${city || ''}.`);
    return `https://wa.me/${fullPhone}?text=${text}`;
  };

  return (
    <main className={styles.page}>
      {/* 🔝 1. Hero Section */}
      <section className={styles.hero}>
        <div className={styles.container}>
          <div className={styles.breadcrumb}>
            <Link to="/">Home</Link>
            <ChevronRight size={12} className={styles.breadcrumbIcon} />
            <span>Regional Desks</span>
          </div>
          <h1 className={styles.heroTitle}>B2B Purchase Desk Network</h1>
          <p className={styles.heroSubtitle}>
            Direct communication channels to our regional purchase managers and procurement centers across India.
          </p>

          {/* Controls: Search, Regions & View Toggle */}
          <div className={styles.controlsRow}>
            <div className={styles.searchWrap}>
              <Search size={18} className={styles.searchIcon} />
              <input
                type="text"
                placeholder="Search by city, manager, or address..."
                className={styles.searchInput}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <div className={styles.filterWrapper}>
              {REGIONS.map((reg) => (
                <button
                  key={reg.id}
                  className={`${styles.filterBtn} ${selectedRegion === reg.id ? styles.activeFilter : ''}`}
                  onClick={() => setSelectedRegion(reg.id)}
                >
                  {reg.name}
                </button>
              ))}
            </div>

            <div className={styles.viewToggle}>
              <button 
                className={`${styles.toggleBtn} ${viewMode === 'grid' ? styles.activeToggle : ''}`}
                onClick={() => setViewMode('grid')}
              >
                <Grid size={14} />
                <span>Grid view</span>
              </button>
              <button 
                className={`${styles.toggleBtn} ${viewMode === 'map' ? styles.activeToggle : ''}`}
                onClick={() => setViewMode('map')}
              >
                <MapIcon size={14} />
                <span>Map placement</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 🏙️ 2. Main Content Area */}
      <section className={styles.contentSection}>
        <div className={styles.container}>
          
          {viewMode === 'grid' ? (
            filteredBranches.length > 0 ? (
              <div className={styles.masonryGrid}>
                {filteredBranches.map((loc, index) => (
                  <div 
                    key={loc.id} 
                    className={`
                      ${styles.branchCard} 
                      ${loc.isHeadOffice ? styles.headOfficeCard : ''}
                      reveal
                    `}
                    style={{ animationDelay: `${index * 0.05}s` }}
                  >
                    {/* Background Image & Elite Overlay */}
                    <div className={styles.cardBg}>
                      <img src={loc.image} alt={loc.city} className={styles.cityImg} />
                      <div className={styles.bgOverlay} />
                    </div>

                    {/* Content */}
                    <div className={styles.cardContent}>
                      {loc.isHeadOffice && (
                        <span className={styles.hoBadge}>
                          <Globe size={11} style={{ marginRight: '6px' }} />
                          NCR HEAD OFFICE
                        </span>
                      )}
                      
                      <h2 className={styles.cityName}>{loc.city}</h2>
                      
                      <div className={styles.personRow}>
                         <User size={16} className={styles.accentIcon} />
                         <span className={styles.personName}>{loc.person}</span>
                      </div>

                      <div className={styles.bottomDetails}>
                        <div className={styles.detailItem}>
                          <MapPin size={16} className={styles.detailIcon} />
                          <span className={styles.addressText}>{loc.address}</span>
                        </div>
                        <div className={styles.detailItem}>
                          <Phone size={16} className={styles.detailIcon} />
                          <span className={styles.phoneText}>{loc.phones.join(' / ')}</span>
                        </div>
                      </div>

                      {/* Direct WhatsApp Call Actions */}
                      <div className={styles.actionRow}>
                        <a href={`tel:${loc.phones[0]}`} className={styles.cardCallBtn}>
                          <Phone size={12} />
                          Call Desk
                        </a>
                        <a 
                          href={getWhatsappLink(loc.phones[0], loc.city)} 
                          className={styles.cardWaBtn}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <Send size={12} />
                          WhatsApp
                        </a>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div style={{ textAlignment: 'center', padding: '60px 0', color: 'var(--text-secondary)' }}>
                <p>No regional desks match your search query or region filter.</p>
              </div>
            )
          ) : (
            <div className={styles.mapContainer}>
              <div className={styles.mapPlaceholder}>
                <div className={styles.mapInner}>
                  <MapIcon size={44} className={styles.mapIcon} />
                  <h3>Interactive Map Integration</h3>
                  <p>RTC Global Apparels points cover over 800+ District Headquarters. Google Maps API geolocation is loaded on demand.</p>
                  <button onClick={() => setViewMode('grid')} className={styles.backToGrid}>Return to grid view</button>
                </div>
              </div>
            </div>
          )}

        </div>
      </section>

      {/* 🚀 3. Luxury CTA Section */}
      <section className={styles.ctaBanner}>
        <div className={styles.container}>
            <div className={styles.ctaBox}>
                <div className={styles.ctaContent}>
                  <div className={styles.ctaHeader}>
                    <Globe size={28} className={styles.ctaIcon} />
                    <h2>Nationwide Sourcing Network</h2>
                  </div>
                  <p>
                    RTC Global Apparels operates active purchase points covering 800+ district headquarters across India. Connect with our central desk for dedicated sourcing contracts.
                  </p>
                  <div className={styles.ctaActions}>
                    <Link to="/contact" className={styles.primaryCta}>Accounts Desk Contacts</Link>
                    <a href="tel:9818598651" className={styles.secondaryCta}>Call Corporate Office</a>
                  </div>
                </div>
                <div className={styles.ctaImage}>
                   <img src="https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=1200&q=80" alt="Logistics Network" />
                </div>
            </div>
        </div>
      </section>
    </main>
  );
};

export default BranchesPage;
