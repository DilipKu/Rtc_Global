import { useState, useEffect } from 'react';
import { categoryService } from '../services/categoryService';

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
          const mapped = data.map(cat => ({
            id: cat._id || cat.id,
            name: cat.name,
            label: cat.label || cat.name,
            tag: cat.tag || 'NEW',
            image: categoryService.formatImageUrl(cat.image),
            moq: cat.moq || 'Contact for MOQ'
          }));
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
