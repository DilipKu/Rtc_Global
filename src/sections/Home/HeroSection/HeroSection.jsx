import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight, MapPin, Package, Zap,
  ChevronLeft, ChevronRight
} from 'lucide-react';
import styles from './HeroSection.module.css';
import { brandConfig } from '../../../config/brandConfig';

/* ── Stat cards data ── */
const stats = [
  { value: '800+',    label: 'Distribution Points', icon: MapPin  },
  { value: '25K+',   label: 'Orders Completed',     icon: Package },
  { value: '24–48h', label: 'Dispatch Time',        icon: Zap     },
];

/* ── Slides ── */
const slides = [
  {
    tagline:      'GLOBAL APPAREL SOURCING',
    heading:      'Enterprise\nFashion\nSourcing.',
    highlight:    'All Leading Brands',
    sub:          'A structured, transparent distribution network operating across 800+ District Headquarters in India.',
    image:        'https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=1600&q=80',
    accent:       '#D4A017',
  },
  {
    tagline:      'FACTORY-DIRECT INTEGRATION',
    heading:      'Scale Your\nRetail\nNetwork.',
    highlight:    'Direct Purchase Desk',
    sub:          'Get direct mobile contact channels to regional purchase managers to source high-margin inventories.',
    image:        'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1600&q=80',
    accent:       '#06B6D4',
  },
  {
    tagline:      'CENTRALIZED OPERATIONS',
    heading:      'Verified\nAccounts &\nDispatch.',
    highlight:    '100% Transparency',
    sub:          'Strict quality control on every cargo batch. Direct billing and dedicated accounts helpdesk.',
    image:        'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=1600&q=80',
    accent:       '#8B5CF6',
  },
];

/* ── Animated counter hook ── */
const useCounter = (target, duration = 1200) => {
  const [count, setCount] = useState(target);
  const started = useRef(false);

  useEffect(() => {
    if (started.current) return;
    started.current = true;
    // Skip animation for range values like '24–48h' or non-numeric strings
    if (/[–\-]/.test(target) || !/\d+/.test(target)) { setCount(target); return; }
    const numericTarget = parseInt(target.replace(/\D/g, ''), 10);
    if (!numericTarget) { setCount(target); return; }
    const suffix = target.replace(/[\d,]/g, '');
    let startTime = null;
    const step = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.floor(eased * numericTarget);
      setCount(current.toLocaleString() + suffix);
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [target, duration]);

  return count;
};

const StatCard = ({ stat }) => {
  const Icon = stat.icon;
  const animated = useCounter(stat.value, 1400);
  return (
    <div className={styles.statCard}>
      <div className={styles.statIconWrap}>
        <Icon size={16} className={styles.statIcon} />
      </div>
      <div className={styles.statBody}>
        <span className={styles.statValue}>{animated}</span>
        <span className={styles.statLabel}>{stat.label}</span>
      </div>
    </div>
  );
};

const HeroSection = () => {
  const [current, setCurrent] = useState(0);
  const [prev, setPrev] = useState(null);
  const [transitioning, setTransitioning] = useState(false);
  const [touchStart, setTouchStart] = useState(null);
  const intervalRef = useRef(null);

  const goTo = (idx) => {
    if (transitioning || idx === current) return;
    setPrev(current);
    setTransitioning(true);
    setTimeout(() => {
      setCurrent(idx);
      setPrev(null);
      setTransitioning(false);
    }, 700);
  };

  const goPrev = () => goTo((current - 1 + slides.length) % slides.length);
  const goNext = () => goTo((current + 1) % slides.length);

  const resetInterval = () => {
    clearInterval(intervalRef.current);
    intervalRef.current = setInterval(goNext, 5500);
  };

  useEffect(() => {
    resetInterval();
    return () => clearInterval(intervalRef.current);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [current]);

  const handleTouchStart = (e) => setTouchStart(e.touches[0].clientX);
  const handleTouchEnd = (e) => {
    if (!touchStart) return;
    const delta = touchStart - e.changedTouches[0].clientX;
    if (Math.abs(delta) > 50) { delta > 0 ? goNext() : goPrev(); }
    setTouchStart(null);
  };

  const slide = slides[current];

  return (
    <section
      className={styles.hero}
      aria-label="Hero banner"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* ── Cinematic Background ── */}
      <div className={styles.bgWrap} aria-hidden="true">
        {slides.map((s, idx) => (
          <div
            key={idx}
            className={`${styles.bgSlide} ${idx === current ? styles.bgActive : ''} ${idx === prev ? styles.bgPrev : ''}`}
          >
            <img src={s.image} alt="" className={styles.bgImg} loading={idx === 0 ? 'eager' : 'lazy'} />
          </div>
        ))}
        {/* Dark gradient layers */}
        <div className={styles.bgGradLeft} />
        <div className={styles.bgGradBottom} />
        {/* Colour accent glow */}
        <div className={styles.bgAccentGlow} style={{ '--accent': slide.accent }} />
      </div>

      {/* ── Main layout ── */}
      <div className={styles.layout}>

        {/* LEFT: Content panel */}
        <div className={styles.leftPanel}>

          {/* Eyebrow tagline */}
          <div className={styles.taglineRow} key={`tag-${current}`}>
            <span className={styles.taglineDot} style={{ background: slide.accent }} />
            <span className={styles.tagline}>{slide.tagline}</span>
          </div>

          {/* Main heading */}
          <h1 className={styles.heading} key={`h-${current}`}>
            {slide.heading.split('\n').map((line, i) => (
              <span
                key={i}
                className={styles.headingLine}
                style={{ animationDelay: `${i * 0.1 + 0.05}s` }}
              >
                {line}
              </span>
            ))}
            <span
              className={styles.headingAccent}
              style={{ '--accent': slide.accent, animationDelay: '0.35s' }}
            >
              {slide.highlight}
            </span>
          </h1>

          {/* Subtext */}
          <p className={styles.subtext} key={`sub-${current}`}>
            {slide.sub}
          </p>

          {/* CTA buttons */}
          <div className={styles.ctaRow} key={`cta-${current}`}>
            <Link to="/enquiry" className={styles.ctaPrimary}>
              <span>Start B2B Enquiry</span>
              <ArrowRight size={16} className={styles.ctaArrow} />
            </Link>
            <Link to="/collections" className={styles.ctaGhost}>
              <span>View Collections</span>
              <ArrowRight size={14} className={styles.ctaArrowGhost} />
            </Link>
          </div>

          {/* Trust badges row */}
          <div className={styles.trustRow}>
            {['Pan India Network', 'MOQ from 50 pcs', 'Verified Accounts'].map((t) => (
              <span key={t} className={styles.trustPill}>{t}</span>
            ))}
          </div>
        </div>

        {/* RIGHT: Stats panel — absolutely anchored to right edge */}
        <div className={styles.rightPanel}>
          {/* Floating stat cards */}
          <div className={styles.statsStack}>
            {stats.map((s) => (
              <StatCard key={s.label} stat={s} />
            ))}
          </div>

          {/* Live orders badge */}
          <div className={styles.dispatchBadge}>
            <span className={styles.pulseDot} />
            <span>Live Orders Active</span>
          </div>
        </div>
      </div>

      {/* ── Slide controls ── */}
      <div className={styles.controls}>
        <button className={styles.arrowBtn} onClick={() => { goPrev(); resetInterval(); }} aria-label="Previous slide">
          <ChevronLeft size={18} />
        </button>
        <div className={styles.dotsRow}>
          {slides.map((_, idx) => (
            <button
              key={idx}
              className={`${styles.dot} ${idx === current ? styles.dotActive : ''}`}
              onClick={() => { goTo(idx); resetInterval(); }}
              aria-label={`Go to slide ${idx + 1}`}
            >
              <span className={styles.dotFill} />
            </button>
          ))}
        </div>
        <button className={styles.arrowBtn} onClick={() => { goNext(); resetInterval(); }} aria-label="Next slide">
          <ChevronRight size={18} />
        </button>
      </div>

      {/* ── Bottom trust bar (minimal, non-duplicate) ── */}
      <div className={styles.trustBar} aria-label="Trust indicators">
        {['Verified B2B Platform', 'Pan India Network', 'MOQ from 50 pcs', '24–48h Dispatch'].map((t, idx, arr) => (
          <React.Fragment key={t}>
            <span className={styles.trustBarItem}>{t}</span>
            {idx < arr.length - 1 && <span className={styles.trustBarDot} aria-hidden="true" />}
          </React.Fragment>
        ))}
      </div>
    </section>
  );
};

export default HeroSection;
