import { useState, useEffect } from 'react';
import { productService } from '../services/productService';

export const useProducts = (params = {}) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const paramsString = JSON.stringify(params);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        setLoading(true);
        const raw = await productService.getProducts(params);
        // API returns either a plain array or { items: [...], meta: {...} }
        const data = Array.isArray(raw) ? raw : (raw?.items || []);
        if (data && data.length > 0) {
          const mapped = data.map(p => ({
            id: p._id || p.id,
            sku: p.sku || 'N/A',
            collection: p.name || p.collection,
            category: p.category?.name || p.category || 'Uncategorized',
            image: productService.formatImageUrl(p.images?.[0] || p.imageUrl || p.image),
            badge: p.badge || (p.isNew ? 'NEW' : p.isBestseller ? 'BESTSELLER' : null)
          }));
          setProducts(mapped);
        } else {
          setProducts([]);
        }
      } catch (err) {
        console.warn('Product API failed.', err);
        setProducts([]);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [paramsString]);

  return { products, loading, error };
};
