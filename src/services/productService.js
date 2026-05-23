import api from './api';

export const productService = {
  getProducts: async (params = {}) => {
    const query = new URLSearchParams(params).toString();
    return api.get(`/products${query ? `?${query}` : ''}`);
  },
  formatImageUrl: (url) => api.formatImageUrl(url)
};

export default productService;
