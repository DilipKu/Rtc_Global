import React from 'react';
import { brandConfig } from '../../config/brandConfig';
import styles from './PrivacyPolicy.module.css';

const PrivacyPolicy = () => {
  return (
    <main className={styles.page}>
      <header className={styles.header}>
        <div className="container">
          <h1 className={styles.title}>Privacy Policy</h1>
          <p className={styles.subtitle}>Effective Date: April 2026</p>
        </div>
      </header>

      <section className={styles.content}>
        <div className="container">
          <div className={styles.card}>
            <p className={styles.intro}>
              At {brandConfig.brand_name}, we value your trust and are committed to protecting your personal information. This Privacy Policy outlines how we collect, use, and safeguard your data when you interact with us.
            </p>

            <div className={styles.section}>
              <h2>1. Information We Collect</h2>
              <p>We may collect personal information that you provide to us, including but not limited to:</p>
              <ul>
                <li><strong>Name and Contact Details:</strong> Email address, phone number, and physical address.</li>
                <li><strong>Business Information:</strong> Company name, GST number for bulk orders.</li>
                <li><strong>Payment Information:</strong> Bank details or UPI IDs for transaction processing.</li>
                <li><strong>Order History:</strong> Your purchase history and garment preferences.</li>
              </ul>
            </div>

            <div className={styles.section}>
              <h2>2. How We Use Your Information</h2>
              <p>Your data is used to provide a seamless wholesale experience, specifically for:</p>
              <ul>
                <li>Processing and fulfilling your garment orders.</li>
                <li>Communicating order updates, invoices, and shipping details.</li>
                <li>Responding to your inquiries and providing customer support.</li>
                <li>Sending promotional offers or newsletters (only if you opt-in).</li>
                <li>Improving our products and services based on your feedback.</li>
              </ul>
            </div>

            <div className={styles.section}>
              <h2>3. Data Security</h2>
              <p>We implement strict security measures to ensure the safety of your personal information. Your data is stored in secured networks and is only accessible by a limited number of persons who have special access rights to such systems and are required to keep the information confidential.</p>
            </div>

            <div className={styles.section}>
              <h2>4. Sharing of Information</h2>
              <p>We do not sell, trade, or otherwise transfer your personal information to outside parties except in the following cases:</p>
              <ul>
                <li><strong>Service Providers:</strong> Logistics and shipping partners to deliver your orders.</li>
                <li><strong>Legal Requirements:</strong> If required by law or to protect our rights and safety.</li>
                <li><strong>Payment Gateways:</strong> To process secure financial transactions.</li>
              </ul>
            </div>

            <div className={styles.section}>
              <h2>5. Cookies</h2>
              <p>Our website may use "cookies" to enhance your experience. Cookies help us understand your preferences based on previous or current site activity, which enables us to provide you with improved services. You can choose to have your computer warn you each time a cookie is being sent, or you can choose to turn off all cookies through your browser settings.</p>
            </div>

            <div className={styles.section}>
              <h2>6. Your Rights</h2>
              <p>You have the following rights regarding your personal data:</p>
              <ul>
                <li>Request access to the personal data we hold about you.</li>
                <li>Request correction of any incorrect or incomplete information.</li>
                <li>Request deletion of your data, subject to legal, tax, or contractual obligations.</li>
              </ul>
            </div>

            <div className={styles.section}>
              <h2>7. Third-Party Links</h2>
              <p>Occasionally, we may include links to third-party websites. These sites have separate and independent privacy policies. We, therefore, have no responsibility or liability for the content and activities of these linked sites.</p>
            </div>

            <div className={styles.section}>
              <h2>8. Changes to this Policy</h2>
              <p>{brandConfig.brand_name} reserves the right to update this Privacy Policy at any time. Any changes will be posted on this page with an updated revision date.</p>
            </div>

            <div className={styles.section}>
              <h2>9. Contact Us</h2>
              <p>If you have any questions regarding this Privacy Policy, you may contact us using the information below:</p>
              <div className={styles.contactInfo}>
                <p><strong>{brandConfig.brand_name}</strong></p>
                <p><strong>Email:</strong> {brandConfig.email}</p>
                <p><strong>Phone:</strong> {brandConfig.phone_number}</p>
                <p><strong>Address:</strong> {brandConfig.business_address}</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default PrivacyPolicy;
