import React, { useState, useEffect } from 'react';
import { MapPin, Phone, Mail, Send, MessageCircle, AlertCircle, CheckCircle } from 'lucide-react';
import { supabase } from '../../config/supabaseClient';
import brandConfig from '../../config/brandConfig';
import { accountsDirectory } from '../../data/mockData';
import styles from './ContactPage.module.css';

const ContactPage = () => {
  const [formData, setFormData] = useState({ name: '', phone: '', firmName: '', address: '', gst: '', message: '' });
  const [isSuccess, setIsSuccess] = useState(false);

  const [contactData, setContactData] = useState({
    phone_number: brandConfig.phone_number,
    whatsapp_number: brandConfig.whatsapp_number,
    email: brandConfig.email,
    business_address: brandConfig.business_address,
    business_hours: brandConfig.business_hours
  });

  useEffect(() => {
    const fetchContactData = async () => {
      try {
        const { data } = await supabase
          .from('dynamic_pages')
          .select('content')
          .eq('page_key', 'contact')
          .single();
          
        if (data && data.content) {
          setContactData(prev => ({ ...prev, ...data.content }));
        }
      } catch (err) {
        console.error("Failed to fetch contact data", err);
      }
    };
    fetchContactData();
  }, []);

  const phoneNumbers = contactData.phone_number.split(',').map(n => n.trim());
  const primaryPhone = phoneNumbers[0];

  const handleChange = (e) => setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // 1. Format WhatsApp message
    const message = `*NEW CONTACT ENQUIRY - RTC GLOBAL APPARELS*%0A%0A` +
      `*Name:* ${formData.name}%0A` +
      `*Firm:* ${formData.firmName}%0A` +
      `*Address:* ${formData.address}%0A` +
      `*GST:* ${formData.gst}%0A` +
      `*Phone:* ${formData.phone}%0A` +
      `*Message:* ${formData.message}%0A%0A` +
      `_Sent via website contact form._`;

    // Connect to corporate primary desk
    const cleanPhone = primaryPhone.replace(/\D/g, '');
    const whatsappUrl = `https://wa.me/91${cleanPhone}?text=${message}`;

    // 2. Open WhatsApp
    window.open(whatsappUrl, '_blank');
    
    // 3. Success state
    setIsSuccess(true);
  };

  const getWhatsappLink = (phone, name) => {
    const cleanPhone = phone.replace(/\D/g, '');
    const fullPhone = cleanPhone.startsWith('91') && cleanPhone.length > 10 ? cleanPhone : `91${cleanPhone}`;
    const text = encodeURIComponent(`Hello ${name}, I am a partner of RTC Global Apparels connecting regarding B2B accounts/billing query.`);
    return `https://wa.me/${fullPhone}?text=${text}`;
  };

  if (isSuccess) {
    return (
      <main className={styles.page}>
         <section className={styles.successWrapper}>
            <div className={styles.successCard}>
               <CheckCircle size={56} className={styles.successIcon} />
               <h1>Query Generated Successfully</h1>
               <p>We've prepared your details and opened WhatsApp to connect with our corporate desk. You can also contact us directly using the phone line below.</p>
               <div className={styles.successActions}>
                 <a href={`tel:${primaryPhone}`} className={styles.callBtn}>Call Primary Corporate Line</a>
                 <button onClick={() => setIsSuccess(false)} className={styles.backBtn}>Back to Contact</button>
               </div>
            </div>
         </section>
      </main>
    );
  }

  return (
    <main className={styles.page}>
      {/* 1. HERO SECTION */}
      <header className={styles.header}>
        <div className="container">
          <h1 className={`${styles.title} reveal`}>Corporate Support & Sourcing</h1>
          <p className={`${styles.subtitle} reveal stagger-1`}>
            Reach out to our B2B sales desk, regional purchase managers, or billing department.
          </p>
        </div>
      </header>

      <section className={styles.content}>
        <div className="container">
          
          {/* 2. QUICK CONTACT ACTIONS */}
          <div className={`${styles.quickActions} reveal stagger-2`}>
            <a href={`tel:${primaryPhone}`} className={styles.quickCard}>
              <div className={styles.quickIconWrapper}><Phone size={20} /></div>
              <h3 className={styles.quickTitle}>Central Hotline</h3>
              <p className={styles.quickText}>{primaryPhone}</p>
            </a>
            
            <a 
              href={brandConfig.whatsapp_chat_url} 
              target="_blank" 
              rel="noopener noreferrer" 
              className={`${styles.quickCard} ${styles.whatsappCard}`}
            >
              <div className={`${styles.quickIconWrapper} ${styles.whatsappIconWrapper}`}>
                <MessageCircle size={20} />
              </div>
              <h3 className={styles.quickTitle}>WhatsApp Sourcing</h3>
              <p className={styles.quickText}>Instant Corporate Response</p>
            </a>
            
            <a href={`mailto:${contactData.email}`} className={styles.quickCard}>
              <div className={styles.quickIconWrapper}><Mail size={20} /></div>
              <h3 className={styles.quickTitle}>Email Desk</h3>
              <p className={styles.quickText}>{contactData.email}</p>
            </a>
          </div>

          <div className={`${styles.layout} reveal stagger-3`}>
            
            {/* 3. MAIN CONTACT INFO (LEFT) */}
            <div className={styles.infoSection}>
              <div className={styles.infoHighlight}>
                <h2 className={styles.sectionHeading}>Headquarters</h2>
                <p className={styles.infoDesc}>
                  Connect directly with the RTC Global Apparels corporate headquarters in Delhi, or route your query to the appropriate purchase desk in your region.
                </p>
              </div>

              <div className={styles.infoCardList}>
                <div className={styles.infoCard}>
                  <div className={styles.infoIcon}><MapPin size={18} /></div>
                  <div className={styles.infoCardContent}>
                    <h3 className={styles.infoCardLabel}>Corporate Address</h3>
                    <p className={styles.infoCardValue}>{contactData.business_address}</p>
                  </div>
                </div>

                <div className={styles.infoCard}>
                  <div className={styles.infoIcon}><Phone size={18} /></div>
                  <div className={styles.infoCardContent}>
                    <h3 className={styles.infoCardLabel}>Hotlines</h3>
                    <p className={styles.infoCardValue}>{contactData.phone_number}</p>
                  </div>
                </div>

                <div className={styles.infoCard}>
                  <div className={styles.infoIcon}><Mail size={18} /></div>
                  <div className={styles.infoCardContent}>
                    <h3 className={styles.infoCardLabel}>Email Inbox</h3>
                    <p className={styles.infoCardValue}>{contactData.email}</p>
                  </div>
                </div>

                {/* Highly Dominant WhatsApp Info Card */}
                <div className={`${styles.infoCard} ${styles.infoCardWhatsapp}`}>
                  <div className={styles.infoIconWhatsapp}><MessageCircle size={18} /></div>
                  <div className={styles.infoCardContent}>
                    <h3 className={styles.infoCardLabel}>B2B WhatsApp</h3>
                    <p className={styles.infoCardValue}>Send direct procurement enquiries to our central helpdesk</p>
                    <a 
                      href={brandConfig.whatsapp_chat_url} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className={styles.infoWhatsappLink}
                    >
                      +91 98185 98651
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* 4. CONTACT FORM (RIGHT) */}
            <div className={styles.formSection}>
              <div className={styles.formCard}>
                <h2 className={styles.formHeading}>Sourcing Enquiry Form</h2>
                <div className={styles.formHelper}>
                  <AlertCircle size={14} />
                  <span>Enquiries will launch a WhatsApp chat with the central desk</span>
                </div>

                <form onSubmit={handleSubmit} className={styles.form}>
                  <div className={styles.inputGroup}>
                    <input 
                      type="text" 
                      id="name" 
                      name="name" 
                      value={formData.name} 
                      onChange={handleChange} 
                      placeholder=" " 
                      className={styles.inputField}
                      required 
                    />
                    <label htmlFor="name" className={styles.floatingLabel}>Contact Name</label>
                  </div>
                  
                  <div className={styles.inputGroup}>
                    <input 
                      type="tel" 
                      id="phone" 
                      name="phone" 
                      value={formData.phone} 
                      onChange={handleChange} 
                      placeholder=" " 
                      className={styles.inputField}
                      required 
                    />
                    <label htmlFor="phone" className={styles.floatingLabel}>Phone Number</label>
                  </div>

                  <div className={styles.inputGroup}>
                    <input 
                      type="text" 
                      id="firmName" 
                      name="firmName" 
                      value={formData.firmName} 
                      onChange={handleChange} 
                      placeholder=" " 
                      className={styles.inputField}
                      required 
                    />
                    <label htmlFor="firmName" className={styles.floatingLabel}>Firm / Retail Store Name</label>
                  </div>

                  <div className={styles.inputGroup}>
                    <input 
                      type="text" 
                      id="address" 
                      name="address" 
                      value={formData.address} 
                      onChange={handleChange} 
                      placeholder=" " 
                      className={styles.inputField}
                      required 
                    />
                    <label htmlFor="address" className={styles.floatingLabel}>City & State</label>
                  </div>

                  <div className={styles.inputGroup}>
                    <input 
                      type="text" 
                      id="gst" 
                      name="gst" 
                      value={formData.gst} 
                      onChange={handleChange} 
                      placeholder=" " 
                      className={styles.inputField}
                    />
                    <label htmlFor="gst" className={styles.floatingLabel}>GSTIN (Optional)</label>
                  </div>
                  
                  <div className={styles.inputGroup}>
                    <textarea 
                      id="message" 
                      name="message" 
                      value={formData.message} 
                      onChange={handleChange} 
                      placeholder=" " 
                      rows="4"
                      className={`${styles.inputField} ${styles.textareaField}`}
                      required 
                    />
                    <label htmlFor="message" className={styles.floatingLabel}>Wholesale Sourcing Requirements</label>
                  </div>
                  
                  <button type="submit" className={styles.submitBtn}>
                    <Send size={16} /> 
                    <span>Submit & Open WhatsApp</span>
                  </button>
                </form>
              </div>
            </div>

          </div>

          {/* 5. ACCOUNTS & BILLING TEAM DIRECTORY */}
          <div className={styles.accountsSection}>
            <h2 className={styles.accountsHeading}>Accounts & Billing Departments</h2>
            <p className={styles.accountsSubtext}>
              Direct communication desks for billing status, payment verification, ledger reports, and accounts reconciliation.
            </p>
            <div className={styles.accountsGrid}>
              {accountsDirectory.map((acc, idx) => (
                <div key={idx} className={styles.accountsCard}>
                  <div className={styles.accountsCardHeader}>
                    <h3 className={styles.accountsName}>{acc.name}</h3>
                    <span className={styles.accountsRole}>Central Billing Desk</span>
                  </div>
                  <div className={styles.accountsPhoneRow}>
                    <Phone size={13} />
                    <span>+91 {acc.mobile}</span>
                  </div>
                  <div className={styles.accountsActions}>
                    <a href={`tel:${acc.mobile}`} className={styles.accountsCallBtn}>Call</a>
                    <a 
                      href={getWhatsappLink(acc.mobile, acc.name)} 
                      className={styles.accountsWaBtn}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      WhatsApp
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>
    </main>
  );
};

export default ContactPage;
