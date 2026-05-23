import { categories, products, branchLocations } from '../data/mockData';

const mockBrands = [
  { id: 'b1', name: 'Ascent Textiles', slug: 'ascent', logoUrl: 'https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?w=200&q=80', isActive: true },
  { id: 'b2', name: 'Apex Denim', slug: 'apex', logoUrl: 'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=200&q=80', isActive: true },
  { id: 'b3', name: 'Loom Craft', slug: 'loomcraft', logoUrl: 'https://images.unsplash.com/photo-1544816155-12df9643f363?w=200&q=80', isActive: true },
  { id: 'b4', name: 'Vellum Weaves', slug: 'vellum', logoUrl: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=200&q=80', isActive: true },
  { id: 'b5', name: 'ProTextile Solutions', slug: 'protextile', logoUrl: 'https://images.unsplash.com/photo-1601924994987-69e26d50dc26?w=200&q=80', isActive: true }
];

const mockSlides = [
  {
    imageUrl: 'https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=1600&q=80',
    tagline: 'GLOBAL APPAREL SOURCING',
    headingLine1: 'RTC GLOBAL',
    headingLine2: 'Textile Sourcing Network',
    highlight: 'All Leading Brands',
    subtext: 'A structured, transparent distribution network operating across 800+ District Headquarters in India.'
  },
  {
    imageUrl: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1600&q=80',
    tagline: 'FACTORY-DIRECT INTEGRATION',
    headingLine1: 'SCALE LOGISTICS',
    headingLine2: 'Optimized procurement MOQs',
    highlight: 'Direct Purchase Desk',
    subtext: 'Get direct mobile contact channels to regional purchase managers to source high-margin inventories.'
  },
  {
    imageUrl: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=1600&q=80',
    tagline: 'CENTRALIZED OPERATIONS',
    headingLine1: 'VERIFIED ACCOUNTING',
    headingLine2: 'Centralized audits & dispatch',
    highlight: '100% Transparency',
    subtext: 'Strict quality control runs on every cargo batch. Direct billing and dedicated accounts helpdesk.'
  }
];

export const api = {
  get: async (endpoint) => {
    // Delay slightly to simulate a natural smooth premium transition
    await new Promise((resolve) => setTimeout(resolve, 300));
    
    const cleanEndpoint = endpoint.split('?')[0];
    
    if (cleanEndpoint === '/hero/slides') {
      return mockSlides;
    }
    if (cleanEndpoint === '/brands') {
      return mockBrands;
    }
    if (cleanEndpoint === '/categories') {
      return categories;
    }
    if (cleanEndpoint === '/branches') {
      return branchLocations;
    }
    if (cleanEndpoint === '/products') {
      // Handle optional category filtering in query parameters
      const urlParams = new URLSearchParams(endpoint.split('?')[1] || '');
      const catId = urlParams.get('category');
      
      if (catId) {
        const foundCategory = categories.find(c => String(c.id) === String(catId));
        if (foundCategory) {
          return products.filter(p => p.category.toLowerCase().includes(foundCategory.label.toLowerCase()) || p.category.toLowerCase().includes(foundCategory.name.toLowerCase()));
        }
      }
      return products;
    }
    
    return [];
  },
  post: async (endpoint, data) => {
    await new Promise((resolve) => setTimeout(resolve, 800));
    console.log(`Mock API POST request to ${endpoint}:`, data);
    return { success: true, message: 'Enquiry submitted successfully' };
  },
  formatImageUrl: (url) => {
    if (!url) return '';
    return url; // Directly return URLs since we use high-quality external mockup assets
  }
};

export default api;
