import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Phone, MessageSquare, ShieldCheck, Truck, Package } from 'lucide-react';
import { products } from '../../data/mockData';
import brandConfig from '../../config/brandConfig';
import styles from './CollectionDetailPage.module.css';

const CollectionDetailPage = () => {
  const { id } = useParams();
  const [activeImage, setActiveImage] = useState(0);

  // Find product or fallback to a default/first product
  const product = products.find(p => p.id === parseInt(id)) || products[0];

  const images = [
    product.image,
    // Add some dummy extra images based on the first one
    product.image.replace('?w=400', '?w=401'),
    product.image.replace('?w=400', '?w=402'),
  ];

  return (
    <main className={styles.page}>
      <div className="container">
        
        {/* Breadcrumb */}
        <nav className={styles.breadcrumb}>
          <Link to="/">Home</Link>
          <span className={styles.separator}>/</span>
          <Link to="/collections">Collections</Link>
          <span className={styles.separator}>/</span>
          <span className={styles.current}>{product.collection}</span>
        </nav>

        <div className={styles.productLayout}>
          
          {/* Gallery Section */}
          <div className={styles.gallerySection}>
            <div className={styles.mainImageWrapper}>
              <img src={images[activeImage]} alt={product.collection} className={styles.mainImage} />
              {product.badge && <span className={styles.badge}>{product.badge}</span>}
            </div>
            
            <div className={styles.thumbnailList}>
              {images.map((img, idx) => (
                <button 
                  key={idx} 
                  className={`${styles.thumbnailBtn} ${activeImage === idx ? styles.active : ''}`}
                  onClick={() => setActiveImage(idx)}
                >
                  <img src={img} alt={`Thumbnail ${idx+1}`} className={styles.thumbnail} />
                </button>
              ))}
            </div>
          </div>

          {/* Details Section */}
          <div className={styles.detailsSection}>
            <div className={styles.header}>
              <span className={styles.category}>{product.category}</span>
              <h1 className="heading-lg" style={{margin: '8px 0'}}>{product.collection}</h1>
            </div>

            <div className={styles.pricingBox}>
              <div className={styles.priceLabel}>Wholesale Price</div>
              <div className={styles.priceValue}>Contact for Quote</div>
            </div>

            <div className={styles.actions}>
              <a href={`tel:${brandConfig.phone_number}`} className={styles.primaryAction}>
                <Phone size={20} />
                Get Bulk Price
              </a>
              <Link to="/enquiry" className={styles.secondaryAction}>
                <MessageSquare size={20} />
                Enquire Now
              </Link>
            </div>
            
            <a 
              href={brandConfig.whatsapp_chat_url} 
              target="_blank" 
              rel="noopener noreferrer" 
              className={styles.whatsappAction}
            >
              Chat on WhatsApp for instant reply
            </a>

            <div className={styles.trustSignals}>
              <div className={styles.signal}>
                <ShieldCheck size={24} className={styles.signalIcon} />
                <span>100% Quality Checked</span>
              </div>
              <div className={styles.signal}>
                <Package size={24} className={styles.signalIcon} />
                <span>Secure Bulk Packaging</span>
              </div>
              <div className={styles.signal}>
                <Truck size={24} className={styles.signalIcon} />
                <span>Pan India Fast Delivery</span>
              </div>
            </div>

            <div className={styles.description}>
              <h3>Product Details</h3>
              <p>Premium quality collection tailored for boutique and retail stores. Manufactured with high attention to detail and standard export-quality stitching. Available across multiple sizes and color variations. Please contact us to get the complete catalog PDF for this collection.</p>
            </div>

          </div>
        </div>
      </div>
    </main>
  );
};

export default CollectionDetailPage;
