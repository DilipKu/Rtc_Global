import React from 'react';
import HeroSection from '../../sections/Home/HeroSection/HeroSection';
import BrandTrustSection from '../../sections/Home/BrandTrustSection/BrandTrustSection';
import CategorySection from '../../sections/Home/CategorySection/CategorySection';
import ValuePropositionSection from '../../sections/Home/ValuePropositionSection/ValuePropositionSection';
import BestsellerSection from '../../sections/Home/BestsellerSection/BestsellerSection';
import TrustSection from '../../sections/Home/TrustSection/TrustSection';
import TestimonialsSection from '../../sections/Home/TestimonialsSection/TestimonialsSection';
import InstagramSection from '../../sections/Home/InstagramSection/InstagramSection';

const HomePage = () => {
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
