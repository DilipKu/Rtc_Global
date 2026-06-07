import { supabase } from '../config/supabaseClient';

export const uploadService = {
  /**
   * Uploads an image file to the 'rtc-images' bucket
   * @param {File} file 
   * @param {string} folder (optional) e.g., 'products', 'brands'
   * @returns {Promise<string>} The public URL of the uploaded image
   */
  uploadImage: async (file, folder = 'general') => {
    if (!file) return null;

    const fileExt = file.name.split('.').pop();
    const fileName = `${folder}/${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;

    const { error } = await supabase.storage
      .from('rtc-images')
      .upload(fileName, file, {
        cacheControl: '3600',
        upsert: false
      });

    if (error) {
      console.error('Upload Error:', error);
      throw error;
    }

    const { data } = supabase.storage
      .from('rtc-images')
      .getPublicUrl(fileName);

    return data.publicUrl;
  }
};

export default uploadService;
