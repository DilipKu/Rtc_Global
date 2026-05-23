import api from './api';

/**
 * Hero Service
 * Handles fetching of dynamic hero carousel data from the backend.
 */
export const heroService = {
  /**
   * Fetches all active hero slides.
   * @returns {Promise<any[]>}
   */
  getSlides: async () => {
    return api.get('/hero/slides');
  },

  /**
   * Helper to format image URLs
   * @param {string} url 
   * @returns {string}
   */
  formatImageUrl: (url) => api.formatImageUrl(url)
};

export default heroService;
