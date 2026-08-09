import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDynamicSeo } from '../../hooks/useDynamicSeo';
import styles from './NotFoundPage.module.css';

const NotFoundPage = () => {
  const navigate = useNavigate();

  const seoHelmet = useDynamicSeo('/404');

  return (
    <main className={styles.page}>
      {seoHelmet}
      <div className={styles.container}>
        {/* Animated 404 */}
        <div className={styles.errorCode}>
          <span className={styles.digit}>4</span>
          <span className={styles.digitMiddle}>0</span>
          <span className={styles.digit}>4</span>
        </div>

        {/* Icon */}
        <div className={styles.iconWrapper}>
          <svg
            className={styles.icon}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
            <line x1="11" y1="8" x2="11" y2="11" />
            <line x1="11" y1="14" x2="11.01" y2="14" />
          </svg>
        </div>

        <h1 className={styles.title}>Page Not Found</h1>
        <p className={styles.subtitle}>
          Oops! The page you're looking for seems to have wandered off our shelves.
        </p>

        {/* Quick Links */}
        <div className={styles.quickLinks}>
          <p className={styles.quickLinksLabel}>Quick Links</p>
          <div className={styles.linksGrid}>
            <Link to="/" className={styles.linkCard}>
              <span className={styles.linkIcon}>🏠</span>
              <span>Home</span>
            </Link>
            <Link to="/collections" className={styles.linkCard}>
              <span className={styles.linkIcon}>👗</span>
              <span>Collections</span>
            </Link>
            <Link to="/about" className={styles.linkCard}>
              <span className={styles.linkIcon}>ℹ️</span>
              <span>About Us</span>
            </Link>
            <Link to="/contact" className={styles.linkCard}>
              <span className={styles.linkIcon}>📞</span>
              <span>Contact</span>
            </Link>
          </div>
        </div>

        {/* CTA Buttons */}
        <div className={styles.actions}>
          <button onClick={() => navigate(-1)} className={styles.btnSecondary}>
            ← Go Back
          </button>
          <Link to="/" className={styles.btnPrimary}>
            Back to Home
          </Link>
        </div>
      </div>

      {/* Background decoration */}
      <div className={styles.bgDecor1} aria-hidden="true" />
      <div className={styles.bgDecor2} aria-hidden="true" />
    </main>
  );
};

export default NotFoundPage;
