import React from 'react';
import { Link } from 'react-router-dom';
import { Search, ShoppingCart, CreditCard, Truck } from 'lucide-react';
import styles from './HowItWorksPage.module.css';

const steps = [
  {
    icon: Search,
    title: '1. Browse Collections',
    description: 'Explore our latest catalog of premium wholesale fashion. Filter by categories, check MOQ, and view product details.'
  },
  {
    icon: ShoppingCart,
    title: '2. Request Bulk Quote',
    description: 'Found what you need? Add items to your enquiry or connect directly via WhatsApp to get the best factory-direct pricing.'
  },
  {
    icon: CreditCard,
    title: '3. Confirm & Pay',
    description: 'Once pricing is agreed, we will send a formal invoice. Make the payment securely via bank transfer or UPI to confirm your order.'
  },
  {
    icon: Truck,
    title: '4. Fast Delivery',
    description: 'Your order is carefully packed and dispatched through our trusted logistics partners within 24-48 hours. Tracking details provided.'
  }
];

const HowItWorksPage = () => {
  return (
    <main className={styles.page}>
      <header className={styles.header}>
        <div className="container">
          <h1 className="heading-xl">How It Works</h1>
          <p className="text-body text-dim">A simple, transparent process to order bulk fashion for your store.</p>
        </div>
      </header>

      <section className={styles.content}>
        <div className="container">
          <div className={styles.stepsGrid}>
            {steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <div key={index} className={styles.stepCard}>
                  <div className={styles.iconWrapper}>
                    <Icon size={32} />
                  </div>
                  <h3 className="heading-sm">{step.title}</h3>
                  <p className="text-body text-dim">{step.description}</p>
                </div>
              );
            })}
          </div>

          <div className={styles.ctaSection}>
            <h2 className="heading-md" style={{marginBottom: '16px'}}>Ready to restock your store?</h2>
            <Link to="/collections" className={styles.ctaBtn}>
              Browse Catalog
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
};

export default HowItWorksPage;
