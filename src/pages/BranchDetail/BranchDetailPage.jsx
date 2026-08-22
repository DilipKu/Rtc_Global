import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { MapPin, Phone, Smartphone, Mail, User, Loader2 } from 'lucide-react';
import { useDynamicSeo } from '../../hooks/useDynamicSeo';
import api from '../../services/api';
import ProductCard from '../../components/molecules/ProductCard/ProductCard';
import styles from './BranchDetailPage.module.css';

const BranchDetailPage = () => {
  const { id } = useParams();
  const [branch, setBranch] = useState(null);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // We pass a dynamic SEO path if we want, or just fallback to generic
  const seoHelmet = useDynamicSeo('/branches');

  useEffect(() => {
    const fetchBranchData = async () => {
      try {
        setLoading(true);
        // 1. Fetch branch details
        const branchData = await api.get(`/branches/id/${id}`);
        setBranch(branchData);

        // 2. Fetch branch products
        if (branchData && branchData.id) {
          const productsData = await api.get(`/products?branch=${branchData.id}`);
          setProducts(productsData || []);
        }
      } catch (err) {
        console.error("Failed to fetch branch details:", err);
      } finally {
        setLoading(false);
      }
    };
    
    if (id) fetchBranchData();
  }, [id]);

  if (loading) {
    return (
      <main className={styles.page}>
        <div className="container" style={{ display: 'flex', justifyContent: 'center', padding: '100px 0' }}>
          <Loader2 className="animate-spin text-[#0B1A2F]" size={48} />
        </div>
      </main>
    );
  }

  if (!branch) {
    return (
      <main className={styles.page}>
        <div className="container" style={{ textAlign: 'center', padding: '100px 0' }}>
          <h2>Branch Not Found</h2>
          <Link to="/branches">Back to Branches</Link>
        </div>
      </main>
    );
  }

  const formatAddress = (addr) => {
    if (!addr) return '';
    if (typeof addr === 'string') return addr;
    const parts = [addr.street, addr.city, addr.state, addr.postalCode].filter(Boolean);
    return parts.join(', ');
  };

  const getSafeEmbedUrl = (inputStr) => {
    if (!inputStr) return null;
    if (inputStr.startsWith('http')) return inputStr;
    const srcMatch = inputStr.match(/src="([^"]+)"/);
    if (srcMatch && srcMatch[1]) {
      return srcMatch[1];
    }
    return inputStr;
  };

  const finalEmbedUrl = getSafeEmbedUrl(branch.embedMapUrl);

  return (
    <main className={styles.page}>
      {seoHelmet}
      
      {/* 1. BRANCH HEADER & PROFILE */}
      <header className={styles.header}>
        <div className="container">
          <div className={styles.branchBanner}>
            
            {/* LEFT CONTENT */}
            <div className={styles.bannerContent}>
              <h1 className={styles.bannerTitle}>
                Buy Top Apparel Of {branch.city || branch.name} From RTC Global Apparels. For More Details, Contact Our Branch Manager.
              </h1>
              
              <div className={styles.contactList}>
                {/* Manager Name */}
                {branch.manager && (
                  <div className={styles.contactItem}>
                    <User size={24} className={styles.contactIcon} />
                    <h2 className={styles.managerName}>{branch.manager}</h2>
                  </div>
                )}
                
                {/* Phone Numbers */}
                {branch.phoneNumbers && branch.phoneNumbers.length > 0 && (
                  <div className={styles.contactItem}>
                    <Smartphone size={24} className={styles.contactIcon} />
                    <div>
                      {branch.phoneNumbers.map((phone, idx) => (
                        <p key={idx} className={styles.contactTextRed}>{phone}</p>
                      ))}
                    </div>
                  </div>
                )}
                
                {/* Email */}
                {branch.email && (
                  <div className={styles.contactItem}>
                    <Mail size={24} className={styles.contactIcon} />
                    <p className={styles.contactTextRed}>{branch.email}</p>
                  </div>
                )}
                
                {/* Address */}
                <div className={styles.contactItem}>
                  <MapPin size={24} className={styles.contactIcon} />
                  <div>
                    <p className={styles.contactTextDark}>
                      {formatAddress(branch.address) || branch.city || 'Address not available'}
                    </p>
                    {branch.directionUrl && (
                      <a href={branch.directionUrl} target="_blank" rel="noopener noreferrer" className={styles.directionBtn}>
                        Get Directions
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* RIGHT IMAGE */}
            <div className={styles.profileImageWrapper}>
              {branch.imageUrl ? (
                <img src={branch.imageUrl} alt={branch.manager || branch.name} className={styles.profilePhoto} />
              ) : (
                <div className={styles.profilePlaceholder}>
                  {branch.manager ? branch.manager.charAt(0).toUpperCase() : 'B'}
                </div>
              )}
            </div>
            
          </div>
        </div>
      </header>

      <div className="container">
        {/* 2. EMBEDDED GOOGLE MAP */}
        {finalEmbedUrl && (
          <section className={styles.mapSection}>
            <div className={styles.mapWrapper}>
              <iframe 
                src={finalEmbedUrl} 
                className={styles.mapIframe}
                style={{ border: 0 }} 
                allowFullScreen="" 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
                title={`${branch.name} Location`}
              ></iframe>
            </div>
          </section>
        )}

        {/* 3. BRANCH PRODUCTS */}
        <section className={styles.productsSection}>
          <h2 className={styles.sectionTitle}>Available Collections at {branch.name}</h2>
          
          {products.length > 0 ? (
            <div className={styles.productsGrid}>
              {products.map((p) => (
                <ProductCard key={p.id} {...p} />
              ))}
            </div>
          ) : (
            <div className={styles.noProducts}>
              <p>No products are currently assigned to this branch.</p>
            </div>
          )}
        </section>
      </div>
    </main>
  );
};

export default BranchDetailPage;
