import api from './api';

export const productService = {
  getProducts: async (params) => {
    const qs = new URLSearchParams(params).toString();
    const endpoint = qs ? `/products?${qs}` : '/products';
    return api.get(endpoint);
  },
  getProductById: async (id) => {
    return api.get(`/products/id/${id}`);
  },
  getProductBySku: async (sku) => {
    return api.get(`/products/sku/${sku}`);
  },
  formatImageUrl: (url) => api.formatImageUrl(url)
};

export default productService;
