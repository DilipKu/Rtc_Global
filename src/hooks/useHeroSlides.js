import { useState, useEffect, useRef } from 'react';
import { supabase } from '../config/supabaseClient';

const INTERVAL_MS = 5000;

export const useHeroSlides = () => {
  const [slides, setSlides] = useState([]);
  const [current, setCurrent] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const touchStartX = useRef(0);
  const touchEndX   = useRef(0);
  
  const total = slides.length;

  useEffect(() => {
    const loadSlides = async () => {
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from('hero_slides')
          .select('*')
          .eq('is_active', true)
          .order('sort_order');
          
        if (error) throw error;
        
        if (data && data.length > 0) {
          const mappedSlides = data.map(s => ({
            image: s.image_url,
            video: s.video_url,
            tagline: s.tagline,
            headingLine1: s.heading_line_1,
            headingLine2: s.heading_line_2,
            highlight: s.highlight,
            subtext: s.subtext
          }));
          setSlides(mappedSlides);
        } else {
          setSlides([]);
        }
      } catch (err) {
        console.warn('Hero API failed.', err);
        setSlides([]);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadSlides();
  }, []);

  useEffect(() => {
    if (total <= 1) return;
    const timer = setInterval(() => {
      setCurrent(prev => (prev + 1) % total);
    }, INTERVAL_MS);
    return () => clearInterval(timer);
  }, [total]);

  const goTo = (idx) => setCurrent((idx + total) % total);
  const prev = () => goTo(current - 1);
  const next = () => goTo(current + 1);

  const onTouchStart = (e) => { touchStartX.current = e.touches[0].clientX; };
  const onTouchMove  = (e) => { touchEndX.current   = e.touches[0].clientX; };
  const onTouchEnd   = () => {
    const diff = touchStartX.current - touchEndX.current;
    if (Math.abs(diff) > 50) diff > 0 ? next() : prev();
  };

  return {
    slides,
    current,
    loading,
    error,
    total,
    goTo,
    prev,
    next,
    onTouchStart,
    onTouchMove,
    onTouchEnd
  };
};
