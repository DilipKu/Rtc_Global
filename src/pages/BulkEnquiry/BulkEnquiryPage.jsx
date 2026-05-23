import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Send, CheckCircle, Package, Loader2 } from 'lucide-react';
import brandConfig from '../../config/brandConfig';
import { enquiryService } from '../../services/enquiryService';
import styles from './BulkEnquiryPage.module.css';

const BulkEnquiryPage = () => {
  const [searchParams] = useSearchParams();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    businessName: '',
    quantity: '',
    itemOfInterest: '',
    message: ''
  });

  // Auto-populate from URL
  useEffect(() => {
    const product = searchParams.get('product');
    const sku = searchParams.get('sku');
    if (product) {
      setFormData(prev => ({
        ...prev,
        itemOfInterest: product + (sku ? ` (SKU: ${sku})` : '')
      }));
    }
  }, [searchParams]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // 1. Submit to Backend API
      await enquiryService.submitEnquiry(formData);

      // 2. Format the message for WhatsApp
      const message = `*NEW ENQUIRY - RTC GLOBAL APPARELS*%0A%0A` +
        `*Name:* ${formData.name}%0A` +
        `*Business:* ${formData.businessName}%0A` +
        `*Phone:* ${formData.phone}%0A` +
        `*Product:* ${formData.itemOfInterest}%0A` +
        `*Quantity:* ${formData.quantity} pcs%0A` +
        `*Note:* ${formData.message}%0A%0A` +
        `_Sent via website form._`;

      // Split phone numbers to get the first primary contact
      const primaryPhone = brandConfig.phone_number.split(',')[0].trim().replace(/\D/g, '');
      const whatsappUrl = `https://wa.me/91${primaryPhone}?text=${message}`;

      // 3. Open WhatsApp
      window.open(whatsappUrl, '_blank');
      
      // 4. Show success state
      setIsSubmitted(true);
    } catch (err) {
      console.error('Failed to submit enquiry:', err);
      alert('Something went wrong. Please try again or contact us directly.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <main className={styles.page}>
         <section className={styles.successSection}>
            <div className={styles.successCard}>
               <CheckCircle size={64} className={styles.successIcon} />
               <h1 className="heading-lg">Enquiry Sent Successfully!</h1>
               <p>We've opened WhatsApp to connect you directly with our manager. If it didn't open, please click the button below.</p>
               <a href={`tel:${brandConfig.phone_number}`} className={styles.callBackBtn}>Call us for urgent enquiry</a>
               <button onClick={() => setIsSubmitted(false)} className={styles.resetBtn}>Send another enquiry</button>
            </div>
         </section>
      </main>
    )
  }

  return (
    <main className={styles.page}>
      <header className={styles.header}>
        <div className="container">
          <div className={styles.badge}>B2B Wholesale Portal</div>
          <h1 className="heading-xl">Bulk Purchase Enquiry</h1>
          <p className="text-body text-dim">Fill the details below and our account manager will reach out with a custom quote.</p>
        </div>
      </header>

      <section className={styles.content}>
        <div className="container">
          <div className={styles.formContainer}>
            
            {/* Left: Form */}
            <form onSubmit={handleSubmit} className={styles.form}>
              
              {formData.itemOfInterest && (
                <div className={styles.selectedProductBanner}>
                  <Package size={20} className={styles.packageIcon} />
                  <div>
                    <span className={styles.bannerLabel}>Enquiring for:</span>
                    <span className={styles.bannerValue}>{formData.itemOfInterest}</span>
                  </div>
                </div>
              )}

              <div className={styles.formGrid}>
                <div className={styles.formGroup}>
                  <label htmlFor="name">Full Name *</label>
                  <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required placeholder="Your Name" />
                </div>
                
                <div className={styles.formGroup}>
                  <label htmlFor="phone">Mobile Number *</label>
                  <input type="tel" id="phone" name="phone" value={formData.phone} onChange={handleChange} required placeholder="10-digit number" />
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="businessName">Business / Shop Name *</label>
                  <input type="text" id="businessName" name="businessName" value={formData.businessName} onChange={handleChange} required placeholder="e.g. Trends Fashion" />
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="quantity">Quantity (Approx) *</label>
                  <input type="number" id="quantity" name="quantity" value={formData.quantity} onChange={handleChange} required placeholder="MOQ: 50 Pieces" />
                </div>
              </div>

              {!formData.itemOfInterest && (
                <div className={styles.formGroup}>
                  <label htmlFor="itemOfInterest">Collection / Item of Interest</label>
                  <input type="text" id="itemOfInterest" name="itemOfInterest" value={formData.itemOfInterest} onChange={handleChange} placeholder="e.g. Summer Kurtis Collection" />
                </div>
              )}

              <div className={styles.formGroup}>
                <label htmlFor="message">Any Special Requirements?</label>
                <textarea id="message" name="message" value={formData.message} onChange={handleChange} rows="4" placeholder="Tell us about your requirements..." />
              </div>

              <div className={styles.formFooter}>
                <button type="submit" className={styles.submitBtn} disabled={isSubmitting}>
                  {isSubmitting ? <Loader2 size={18} className="animate-spin" /> : <Send size={18} />}
                  <span>{isSubmitting ? 'Submitting...' : 'Submit & Connect on WhatsApp'}</span>
                </button>
                <p className={styles.formDisclaimer}>Instant reply guaranteed within business hours (10 AM - 8 PM)</p>
              </div>
            </form>
            
            {/* Right: Info */}
            <div className={styles.infoCard}>
              <h3 className={styles.infoTitle}>Expert B2B Support</h3>
              <div className={styles.benefits}>
                <div className={styles.benefitItem}>
                  <div className={styles.benefitPoint}>01</div>
                  <div>
                    <h4>Factory-Direct Rates</h4>
                    <p>Cut out the middleman and get the best margins for your retail business.</p>
                  </div>
                </div>
                <div className={styles.benefitItem}>
                  <div className={styles.benefitPoint}>02</div>
                  <div>
                    <h4>Pan-India Logistics</h4>
                    <p>Reliable shipping with trusted partners like BlueDart and Delhivery.</p>
                  </div>
                </div>
                <div className={styles.benefitItem}>
                  <div className={styles.benefitPoint}>03</div>
                  <div>
                    <h4>Sample Available</h4>
                    <p>Enquire about sample sets before placing bulk container orders.</p>
                  </div>
                </div>
              </div>
              
              <div className={styles.contactFooter}>
                <p><strong>Hotline:</strong> {brandConfig.phone_number}</p>
                <p><strong>Email:</strong> {brandConfig.email}</p>
              </div>
            </div>

          </div>
        </div>
      </section>
    </main>
  );
};

export default BulkEnquiryPage;
