import api from './api';

export const branchService = {
  getBranches: async () => {
    return api.get('/branches');
  },
  formatImageUrl: (url) => api.formatImageUrl(url)
};

export default branchService;
