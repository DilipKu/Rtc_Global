import React, { useEffect } from 'react';
import HeroSection from '../../sections/Home/HeroSection/HeroSection';
import BrandTrustSection from '../../sections/Home/BrandTrustSection/BrandTrustSection';
import CategorySection from '../../sections/Home/CategorySection/CategorySection';
import ValuePropositionSection from '../../sections/Home/ValuePropositionSection/ValuePropositionSection';
import BestsellerSection from '../../sections/Home/BestsellerSection/BestsellerSection';
import TrustSection from '../../sections/Home/TrustSection/TrustSection';
import TestimonialsSection from '../../sections/Home/TestimonialsSection/TestimonialsSection';
import InstagramSection from '../../sections/Home/InstagramSection/InstagramSection';

const HomePage = () => {
  useEffect(() => {
    // Set document title
    document.title = 'B2B Wholesale Garment Sourcing & Distribution in India - RTC Global Apparels';

    const setMeta = (name, content, isProperty = false) => {
      const attr = isProperty ? 'property' : 'name';
      let element = document.querySelector(`meta[${attr}="${name}"]`);
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute(attr, name);
        document.head.appendChild(element);
      }
      element.setAttribute('content', content);
    };

    const setLink = (rel, href) => {
      let element = document.querySelector(`link[rel="${rel}"]`);
      if (!element) {
        element = document.createElement('link');
        element.setAttribute('rel', rel);
        document.head.appendChild(element);
      }
      element.setAttribute('href', href);
    };

    // Standard Meta Tags
    setMeta('description', 'RTC Global Apparels is a trusted wholesale garment supplier in India offering quality apparel, bulk clothing solutions, and reliable B2B distribution.');
    setMeta('keywords', 'Wholesale Garment Sourcing & Distribution, Wholesale Western Wear Suppliers, Wholesale Ethnic Wear Suppliers, Wholesale Kurti Suppliers, Wholesale Saree Suppliers, Ladies Garment Wholesaler, Mens Garment Wholesaler, Kids Garment Wholesaler');
    setMeta('author', 'RTC Global Apparels Pvt Ltd');
    setMeta('subject', 'B2B Wholesale Garment Sourcing & Distribution in India - RTC Global Apparels');
    
    // Geo Tags
    setMeta('geo.region', 'IN');
    setMeta('state', 'Delhi');
    setMeta('city', 'New Delhi');
    setMeta('geo.position', '#');
    setMeta('address', 'X/2210, Gali No. 10, Kailash Nagar, Gandhi Nagar, Delhi-110031');
    
    // Additional SEO / Robot Tags
    setMeta('expires', 'never');
    setMeta('language', 'english');
    setMeta('rating', 'general');
    setMeta('document-type', 'Public');
    setMeta('distribution', 'Global');
    setMeta('allow-search', 'yes');
    setMeta('audience', 'all');
    setMeta('robots', 'index, follow');
    setMeta('googlebot', 'index, follow');
    setMeta('bingbot', 'index, follow');
    setMeta('YahooSeeker', 'index, follow');
    setMeta('msnbot', 'index, follow');
    setMeta('format-detection', 'telephone=no');

    // Open Graph (OG) Tags
    setMeta('og:title', 'B2B Wholesale Garment Sourcing & Distribution in India - RTC Global Apparels', true);
    setMeta('og:description', 'RTC Global Apparels is a trusted wholesale garment supplier in India offering quality apparel, bulk clothing solutions, and reliable B2B distribution.', true);
    setMeta('og:type', 'website', true);
    setMeta('og:url', 'https://rtcglobalapparels.com/', true);
    setMeta('og:image', 'https://rtcglobalapparels.com/logo-solid.png', true);
    setMeta('og:site_name', 'RTC Global Apparels Pvt Ltd', true);
    setMeta('og:locale', 'en_IN', true);

    // Twitter Card Tags
    setMeta('twitter:card', 'summary_large_image');
    setMeta('twitter:title', 'B2B Wholesale Garment Sourcing & Distribution in India - RTC Global Apparels');
    setMeta('twitter:description', 'RTC Global Apparels is a trusted wholesale garment supplier in India offering quality apparel, bulk clothing solutions, and reliable B2B distribution.');
    setMeta('twitter:image', 'https://rtcglobalapparels.com/logo-solid.png');

    // Canonical Tag
    setLink('canonical', 'https://rtcglobalapparels.com/');
  }, []);

  return (
    <div>
      <HeroSection />
      <BrandTrustSection />

      <CategorySection />
      <BestsellerSection />
      <ValuePropositionSection />
      <TrustSection />
      {/* <DealsSection /> */}
      <TestimonialsSection />
      <InstagramSection />
    </div>
  );
};

export default HomePage;
