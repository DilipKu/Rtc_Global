import React, { useState } from 'react';
import { Store, CheckCircle, ArrowRight, MessageSquare, PhoneCall } from 'lucide-react';
import brandConfig from '../../config/brandConfig';
import styles from './DealerRegistrationPage.module.css';

const DealerRegistrationPage = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    shopName: '',
    location: '',
    phone: '',
    gstin: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // 1. Format WhatsApp message
    const message = `*DEALER REGISTRATION - RTC GLOBAL APPARELS*%0A%0A` +
      `*Owner:* ${formData.name}%0A` +
      `*Shop Name:* ${formData.shopName}%0A` +
      `*Location:* ${formData.location}%0A` +
      `*Phone:* ${formData.phone}%0A` +
      `*GSTIN:* ${formData.gstin || 'Not Provided'}%0A%0A` +
      `_Requesting to become an authorized dealer._`;

    const cleanPhone = brandConfig.phone_number.split(',')[0].trim().replace(/\D/g, '');
    const whatsappUrl = `https://wa.me/${cleanPhone}?text=${message}`;

    // 2. Open WhatsApp
    window.open(whatsappUrl, '_blank');
    
    // 3. Set success state
    setIsSubmitted(true);
  };

  if (isSubmitted) {
    return (
      <main className={styles.page}>
         <section className={styles.successWrapper}>
            <div className={styles.successCard}>
               <div className={styles.successIconBox}>
                  <CheckCircle size={48} />
               </div>
               <h1 className="heading-lg">Registration Received!</h1>
               <p>Your details have been shared with our onboarding team via WhatsApp. We will verify your business and get in touch shortly.</p>
               <div className={styles.successActions}>
                 <a href={`tel:${brandConfig.phone_number}`} className={styles.callBtn}>
                    <PhoneCall size={18} />
                    Call for Immediate Approval
                 </a>
                 <button onClick={() => setIsSubmitted(false)} className={styles.backBtn}>Back to Form</button>
               </div>
            </div>
         </section>
      </main>
    );
  }

  return (
    <main className={styles.page}>
      <header className={styles.header}>
        <div className="container">
          <div className={styles.headerAccent}>Partnership Opportunity</div>
          <h1 className="heading-xl">Become an Authorised Dealer</h1>
          <p className="text-body text-dim">Join our network of 500+ successful retailers across India and elevate your business.</p>
        </div>
      </header>

      <section className={styles.content}>
        <div className="container">
          <div className={styles.layout}>
            {/* Form Section */}
            <div className={styles.formSection}>
              <div className={styles.formCard}>
                <div className={styles.formCardHeader}>
                   <Store size={24} className={styles.cardIcon} />
                   <div>
                     <h2 className="heading-md">Dealer Registration</h2>
                     <p className="text-xs text-dim">Fill in your business details to get started.</p>
                   </div>
                </div>
                
                <form onSubmit={handleSubmit} className={styles.form}>
                  <div className={styles.formGroup}>
                    <label htmlFor="name">Owner Name *</label>
                    <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required placeholder="Enter full name" />
                  </div>
                  
                  <div className={styles.formGroup}>
                    <label htmlFor="shopName">Shop / Business Name *</label>
                    <input type="text" id="shopName" name="shopName" value={formData.shopName} onChange={handleChange} required placeholder="e.g. Apex Apparel Hub" />
                  </div>

                  <div className={styles.formGroup}>
                    <label htmlFor="location">City & State *</label>
                    <input type="text" id="location" name="location" value={formData.location} onChange={handleChange} required placeholder="e.g. Jaipur, Rajasthan"/>
                  </div>

                  <div className={styles.formGroup}>
                    <label htmlFor="phone">Mobile Number (WhatsApp) *</label>
                    <input type="tel" id="phone" name="phone" value={formData.phone} onChange={handleChange} required placeholder="10-digit number" />
                  </div>
                  
                  <div className={styles.formGroup}>
                    <label htmlFor="gstin">GSTIN (Optional)</label>
                    <input type="text" id="gstin" name="gstin" value={formData.gstin} onChange={handleChange} placeholder="For B2B invoice benefits" />
                  </div>

                  <button type="submit" className={styles.submitBtn}>
                    <MessageSquare size={18} />
                    <span>Register via WhatsApp</span>
                    <ArrowRight size={18} />
                  </button>
                  <p className={styles.formNote}>Submitting will connect you directly with our dealer manager on WhatsApp.</p>
                </form>
              </div>
            </div>

            {/* Benefits Section */}
            <div className={styles.benefitsSection}>
              <h2 className="heading-md" style={{marginBottom: '32px'}}>Dealer Privileges</h2>
              
              <div className={styles.benefitsGrid}>
                <div className={styles.benefitItem}>
                  <div className={styles.benefitIconWrapper}>
                    <CheckCircle size={20} />
                  </div>
                  <div>
                    <h3 className="heading-xs">Priority Dispatch</h3>
                    <p className="text-sm text-dim">Orders dispatched within 24 hours of confirmation.</p>
                  </div>
                </div>

                <div className={styles.benefitItem}>
                  <div className={styles.benefitIconWrapper}>
                    <CheckCircle size={20} />
                  </div>
                  <div>
                    <h3 className="heading-xs">Credit Facility</h3>
                    <p className="text-sm text-dim">Available up to 30 days credit after initial successful orders.</p>
                  </div>
                </div>

                <div className={styles.benefitItem}>
                  <div className={styles.benefitIconWrapper}>
                    <CheckCircle size={20} />
                  </div>
                  <div>
                    <h3 className="heading-xs">Early Collection Access</h3>
                    <p className="text-sm text-dim">See and book new designs before they hit the market.</p>
                  </div>
                </div>

                <div className={styles.benefitItem}>
                  <div className={styles.benefitIconWrapper}>
                    <CheckCircle size={20} />
                  </div>
                  <div>
                    <h3 className="heading-xs">Dedicated Manager</h3>
                    <p className="text-sm text-dim">Direct line to a manager for inventory and query support.</p>
                  </div>
                </div>
              </div>

              <div className={styles.statsCard}>
                 <div className={styles.stat}>
                    <span className={styles.statNum}>500+</span>
                    <span className={styles.statLabel}>Active Dealers</span>
                 </div>
                 <div className={styles.stat}>
                    <span className={styles.statNum}>25+</span>
                    <span className={styles.statLabel}>States Covered</span>
                 </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default DealerRegistrationPage;
