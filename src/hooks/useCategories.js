import { useState, useEffect } from 'react';
import { categoryService } from '../services/categoryService';

// Map raw category labels/names to more professional display names
const CATEGORY_DISPLAY_MAP = {
  'Ladies Collection': "Women's Collection",
  "Men's Wholesale": "Men's Collection",
  'Kids Bulk Buy': 'Kids Collection',
  'Saree Collection': 'Sarees',
  'Blanket Collection': 'Blankets & Home',
  'Ethnic Collection': 'Ethnic Wear',
};

export const useCategories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadCategories = async () => {
      try {
        setLoading(true);
        const raw = await categoryService.getCategories();
        // API returns either a plain array or { items: [...], meta: {...} }
        const data = Array.isArray(raw) ? raw : (raw?.items || []);
        if (data && data.length > 0) {
          const mapped = data.map(cat => {
            const rawLabel = cat.label || cat.name || '';
            const displayName = CATEGORY_DISPLAY_MAP[rawLabel] || rawLabel;
            return {
              id: cat._id || cat.id,
              name: displayName,
              label: rawLabel,
              tag: cat.tag || 'NEW',
              image: categoryService.formatImageUrl(cat.image),
              moq: cat.moq || 'Contact for MOQ'
            };
          });
          setCategories(mapped);
        } else {
          setCategories([]);
        }
      } catch (err) {
        console.warn('Category API failed.', err);
        setCategories([]);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadCategories();
  }, []);

  return { categories, loading, error };
};
