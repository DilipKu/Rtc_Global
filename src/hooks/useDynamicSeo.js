import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useSeoContext } from '../context/SeoContext';

export const useDynamicSeo = (routeIdentifier, fallbackConfig = {}) => {
  const { seoRules, loading } = useSeoContext();
  
  // Try to find the exact route
  let config = seoRules[routeIdentifier];

  // If loading, or no exact match, fallback to what's provided or default
  if (!config) {
    config = {
      title: fallbackConfig.title || 'RTC Global Apparels',
      description: fallbackConfig.description || 'Premium wholesale apparel.',
      keywords: fallbackConfig.keywords || '',
      canonical: fallbackConfig.canonical || null
    };
  }

  const ogImage = 'https://rtcglobalapparels.com/logo-solid.png';
  const canonicalUrl = config.canonical || `https://rtcglobalapparels.com${routeIdentifier.startsWith('/') ? routeIdentifier : `/${routeIdentifier}`}`;

  const helmetComponent = (
    <Helmet>
      <title>{config.title}</title>
      <meta name="description" content={config.description} />
      {config.keywords && <meta name="keywords" content={config.keywords} />}
      
      <meta property="og:title" content={config.title} />
      <meta property="og:description" content={config.description} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:site_name" content="RTC Global Apparels Pvt Ltd" />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={config.title} />
      <meta name="twitter:description" content={config.description} />
      <meta name="twitter:image" content={ogImage} />

      <link rel="canonical" href={canonicalUrl} />
    </Helmet>
  );

  return helmetComponent;
};
