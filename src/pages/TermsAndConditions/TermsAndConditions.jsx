import React from 'react';
import { brandConfig } from '../../config/brandConfig';
import styles from './TermsAndConditions.module.css';

const TermsAndConditions = () => {
  return (
    <main className={styles.page}>
      <header className={styles.header}>
        <div className="container">
          <h1 className={styles.title}>Terms & Conditions</h1>
          <p className={styles.subtitle}>Last Updated: April 2026</p>
        </div>
      </header>

      <section className={styles.content}>
        <div className="container">
          <div className={styles.card}>
            <div className={styles.section}>
              <h2>1. Introduction</h2>
              <p>Welcome to {brandConfig.brand_name}. By purchasing our products or using our services, you agree to comply with and be bound by the following Terms & Conditions. Please read them carefully.</p>
            </div>

            <div className={styles.section}>
              <h2>2. Products</h2>
              <ul>
                <li>We specialise in the manufacturing and sale of garments including but not limited to apparel, uniforms, and custom clothing.</li>
                <li>Product images are for representation purposes only; actual products may slightly vary in color, size, or design.</li>
              </ul>
            </div>

            <div className={styles.section}>
              <h2>3. Pricing & Payment</h2>
              <ul>
                <li>All prices are listed in INR (₹) and are subject to change without prior notice.</li>
                <li>Full payment must be made at the time of order unless otherwise agreed.</li>
                <li>We accept payments via bank transfer, UPI, credit/debit cards, or other approved methods.</li>
              </ul>
            </div>

            <div className={styles.section}>
              <h2>4. Orders & Confirmation</h2>
              <ul>
                <li>Orders are confirmed only after successful payment or written confirmation.</li>
                <li>For bulk or custom orders, an advance payment may be required.</li>
                <li>Once confirmed, orders cannot be cancelled or modified without approval.</li>
              </ul>
            </div>

            <div className={styles.section}>
              <h2>5. Shipping & Delivery</h2>
              <ul>
                <li>Delivery timelines are estimates and may vary based on order size and location.</li>
                <li>We are not responsible for delays caused by logistics partners or unforeseen circumstances.</li>
                <li>Shipping charges (if applicable) will be communicated at the time of order.</li>
              </ul>
            </div>

            <div className={styles.section}>
              <h2>6. Returns & Exchanges</h2>
              <ul>
                <li>Returns are accepted only for defective or incorrect products.</li>
                <li>Customers must notify us within 3–7 days of delivery.</li>
                <li>Products must be unused, unwashed, and in original packaging.</li>
                <li>Custom-made or personalised items are non-returnable.</li>
              </ul>
            </div>

            <div className={styles.section}>
              <h2>7. Quality & Warranty</h2>
              <ul>
                <li>We ensure all products meet standard quality checks before dispatch.</li>
                <li>Minor variations in fabric or stitching are not considered defects.</li>
                <li>Any genuine quality issue will be resolved through replacement or repair.</li>
              </ul>
            </div>

            <div className={styles.section}>
              <h2>8. Custom Orders</h2>
              <ul>
                <li>Custom designs must be approved by the customer before production.</li>
                <li>We are not liable for errors in approved designs.</li>
                <li>Advance payments for custom orders are non-refundable.</li>
              </ul>
            </div>

            <div className={styles.section}>
              <h2>9. Intellectual Property</h2>
              <ul>
                <li>All designs, logos, and branding belong to {brandConfig.brand_name}.</li>
                <li>Unauthorized use, copying, or reproduction is strictly prohibited.</li>
              </ul>
            </div>

            <div className={styles.section}>
              <h2>10. Limitation of Liability</h2>
              <ul>
                <li>We shall not be liable for any indirect, incidental, or consequential damages arising from the use of our products.</li>
                <li>Our liability is limited to the value of the purchased product.</li>
              </ul>
            </div>

            <div className={styles.section}>
              <h2>11. Cancellation Policy</h2>
              <ul>
                <li>Orders can be cancelled within 24 hours of placement (if not processed).</li>
                <li>After processing, cancellation may not be possible or may incur charges.</li>
              </ul>
            </div>

            <div className={styles.section}>
              <h2>12. Privacy Policy</h2>
              <ul>
                <li>Customer information is kept confidential and used only for order processing and communication.</li>
                <li>We do not share personal data with third parties without consent.</li>
              </ul>
            </div>

            <div className={styles.section}>
              <h2>13. Governing Law</h2>
              <ul>
                <li>These Terms & Conditions are governed by the laws of India.</li>
                <li>Any disputes shall be subject to the jurisdiction of New Delhi courts.</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default TermsAndConditions;
