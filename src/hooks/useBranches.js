import { useState, useEffect } from 'react';
import { branchService } from '../services/branchService';

export const useBranches = () => {
  const [branches, setBranches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadBranches = async () => {
      try {
        setLoading(true);
        const data = await branchService.getBranches();
        if (data && data.length > 0) {
          const mapped = data.map(b => ({
            id: b._id || b.id,
            city: b.city || b.name,
            person: b.managerName || b.person || 'Branch Manager',
            address: typeof b.address === 'object' && b.address !== null
              ? [b.address.street, b.address.city, b.address.state, b.address.postalCode, b.address.country]
                  .filter(Boolean)
                  .join(', ')
              : b.address || '',
            phones: b.phones || b.phoneNumbers || (b.phone ? [b.phone] : (b.mobile ? [b.mobile] : [])),
            image: branchService.formatImageUrl(b.image_url || b.imageUrl || b.image),
            isHeadOffice: b.isHeadOffice || false,
            size: b.displaySize || 'normal' // large, tall, normal
          }));
          setBranches(mapped);
        } else {
          setBranches([]);
        }
      } catch (err) {
        console.warn('Branch API failed.', err);
        setBranches([]);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadBranches();
  }, []);

  return { branches, loading, error };
};
