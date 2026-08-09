import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '../config/supabaseClient';

const SeoContext = createContext();

export const SeoProvider = ({ children }) => {
  const [seoRules, setSeoRules] = useState({});
  const [loading, setLoading] = useState(true);

  const fetchSeoRules = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase.from('seo_settings').select('*');
      if (error) throw error;

      if (data) {
        // Map rules to a dictionary by route_identifier for quick O(1) lookups
        const rulesMap = data.reduce((acc, rule) => {
          acc[rule.route_identifier] = rule;
          return acc;
        }, {});
        setSeoRules(rulesMap);
      }
    } catch (error) {
      console.error('Error fetching SEO rules:', error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSeoRules();
  }, []);

  // Expose a method to refresh rules if they are updated in the admin panel
  const refreshSeo = () => {
    fetchSeoRules();
  };

  return (
    <SeoContext.Provider value={{ seoRules, loading, refreshSeo }}>
      {children}
    </SeoContext.Provider>
  );
};

export const useSeoContext = () => useContext(SeoContext);
