import { useState, useEffect } from "react";
import { brandService } from "../services/brandService";

export const useBrands = () => {
  const [brands, setBrands] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBrands = async () => {
      try {
        setLoading(true);
        const data = await brandService.getBrands();
        setBrands(data || []);
      } catch (err) {
        console.error("Failed to fetch brands", err);
        setError(err.message);
        setBrands([]);
      } finally {
        setLoading(false);
      }
    };

    fetchBrands();
  }, []);

  return { brands, loading, error };
};
