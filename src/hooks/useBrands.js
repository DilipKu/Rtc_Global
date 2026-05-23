import { useState, useEffect } from "react";
import { brandService } from "../services/brandService";

export const useBrands = () => {
  const [brands, setBrands] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadBrands = async () => {
      try {
        setLoading(true);
        // Fetch only active brands from the API
        const raw = await brandService.getBrands();
        // API returns either a plain array or { items: [...], meta: {...} }
        const data = Array.isArray(raw) ? raw : (raw?.items || []);
        if (data && data.length > 0) {
          const mapped = data
            .filter((b) => b.isActive !== false) // only active brands
            .map((b) => ({
              id: b._id || b.id,
              slug: b.slug,
              src: b.logoUrl,   // ✅ correct field name from brand.schema.ts
              name: b.name,
            }));
          setBrands(mapped);
        } else {
          setBrands([]);
        }
      } catch (err) {
        console.error("Failed to load brands:", err);
        setError(err.message);
        setBrands([]);
      } finally {
        setLoading(false);
      }
    };

    loadBrands();
  }, []);

  return { brands, loading, error };
};
