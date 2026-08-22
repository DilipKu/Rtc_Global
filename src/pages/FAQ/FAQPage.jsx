import React, { useState, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';
import { useDynamicSeo } from '../../hooks/useDynamicSeo';
import styles from './FAQPage.module.css';

const faqItems = [
  {
    question: 'What is the minimum order quantity (MOQ)?',
    answer: 'We offer flexible MOQ starting from 24 pieces per design, making wholesale accessible for small retailers. Larger orders receive better pricing.'
  },
  {
    question: 'Do you offer customization and private labeling?',
    answer: 'Yes! We provide custom manufacturing, private labeling, and design customization. Please connect via WhatsApp for details.'
  },
  {
    question: 'What are the payment terms?',
    answer: 'We accept 50% advance payment with order confirmation and balance before dispatch. GST invoices provided for all B2B transactions.'
  },
  {
    question: 'How long is the delivery time?',
    answer: 'Standard delivery is 7-14 days pan-India. Express delivery options available for urgent orders. Same-city pickup possible from our Delhi hub.'
  },
  {
    question: 'Do you provide samples?',
    answer: 'Yes, samples are available on demand. Sample charges may apply, which will be adjusted if you proceed with bulk orders.'
  },
  {
    question: 'What quality standards do you follow?',
    answer: 'All products undergo strict quality checks. We use premium fabrics and ensure superior stitching. Returns within 7 days if quality issues found.'
  }
];

const FAQItem = ({ question, answer, isOpen, onToggle }) => (
  <div className={styles.faqItem}>
    <button 
      className={styles.faqQuestion}
      onClick={onToggle}
      aria-expanded={isOpen}
    >
      <span>{question}</span>
      <ChevronDown size={18} className={`${styles.faqIcon} ${isOpen ? styles.faqIconOpen : ''}`} />
    </button>
    {isOpen && <div className={styles.faqAnswer}>{answer}</div>}
  </div>
);

const FAQPage = () => {
  const [openFAQIndex, setOpenFAQIndex] = useState(null);
  
  // Use a fallback SEO hook call if needed, or define standard metadata.
  // Assuming useDynamicSeo handles /faq or defaults.
  const seoHelmet = useDynamicSeo('/faq');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const toggleFAQ = (index) => {
    setOpenFAQIndex(openFAQIndex === index ? null : index);
  };

  return (
    <main className={styles.page}>
      {seoHelmet}
      <div className={styles.container}>
        <div className={styles.faqSection}>
          <h1 className={styles.faqTitle}>Frequently Asked Questions</h1>
          <p className={styles.faqSubtitle}>Find answers to our most common B2B wholesale enquiries.</p>
          <div className={styles.faqGrid}>
            {faqItems.map((item, index) => (
              <FAQItem
                key={index}
                question={item.question}
                answer={item.answer}
                isOpen={openFAQIndex === index}
                onToggle={() => toggleFAQ(index)}
              />
            ))}
          </div>
        </div>
      </div>
    </main>
  );
};

export default FAQPage;
