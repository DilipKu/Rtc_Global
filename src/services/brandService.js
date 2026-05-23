import api from './api';

export const brandService = {
  getBrands: async () => {
    return api.get('/brands');
  },
  formatImageUrl: (url) => api.formatImageUrl(url)
};

export default brandService;
