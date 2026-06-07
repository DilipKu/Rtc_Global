import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Phone, MessageSquare, ShieldCheck, Truck, Package, Loader2 } from 'lucide-react';
import brandConfig from '../../config/brandConfig';
import { productService } from '../../services/productService';
import styles from './CollectionDetailPage.module.css';

const CollectionDetailPage = () => {
  const { id } = useParams();
  const [activeImage, setActiveImage] = useState(0);
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const data = await productService.getProductById(id);
        setProduct(data);
      } catch (err) {
        console.error("Failed to fetch product:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
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

  if (!product) {
    return (
      <main className={styles.page}>
        <div className="container" style={{ textAlign: 'center', padding: '100px 0' }}>
          <h2>Product Not Found</h2>
          <Link to="/collections">Back to Collections</Link>
        </div>
      </main>
    );
  }

  const images = product.images?.length > 0 ? product.images : [product.image];

  return (
    <main className={styles.page}>
      <div className="container">
        
        {/* Breadcrumb */}
        <nav className={styles.breadcrumb}>
          <Link to="/">Home</Link>
          <span className={styles.separator}>/</span>
          <Link to="/collections">Categories</Link>
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
              <Link to={`/enquiry?product=${encodeURIComponent(product.collection)}&sku=${product.sku || ''}&category=${encodeURIComponent(product.category)}&image=${encodeURIComponent(product.image)}`} className={styles.secondaryAction}>
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
