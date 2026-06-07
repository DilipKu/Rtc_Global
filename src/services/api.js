import { supabase } from '../config/supabaseClient';

export const api = {
  get: async (endpoint) => {
    try {
      const cleanEndpoint = endpoint.split('?')[0];
      
      if (cleanEndpoint === '/hero/slides') {
        const { data, error } = await supabase.from('hero_slides').select('*').eq('is_active', true).order('sort_order');
        if (error) throw error;
        // Transform snake_case to camelCase
        return data.map(slide => ({
          ...slide,
          imageUrl: slide.image_url,
          headingLine1: slide.heading_line_1,
          headingLine2: slide.heading_line_2,
          sortOrder: slide.sort_order
        }));
      }
      
      if (cleanEndpoint === '/brands') {
        const { data, error } = await supabase.from('brands').select('*').eq('is_active', true).eq('is_deleted', false).order('sort_order');
        if (error) throw error;
        return data.map(b => ({ ...b, logoUrl: b.logo_url }));
      }
      
      if (cleanEndpoint === '/categories') {
        const { data, error } = await supabase.from('categories').select('*').eq('is_active', true);
        if (error) throw error;
        return data.map(c => ({ id: c.id, name: c.name, slug: c.slug, label: c.name, image: c.image_url }));
      }
      
      if (cleanEndpoint === '/branches') {
        const { data, error } = await supabase.from('branches').select('*').eq('is_active', true).eq('is_deleted', false);
        if (error) throw error;
        return data.map(b => ({ ...b, phoneNumbers: b.phone_numbers, imageUrl: b.image_url }));
      }
      
      if (cleanEndpoint === '/products') {
        let query = supabase.from('products').select('*, brand:brands(name, slug), category:categories(name, slug)').eq('is_active', true).eq('is_deleted', false);
        
        const urlParams = new URLSearchParams(endpoint.split('?')[1] || '');
        const catId = urlParams.get('category');
        
        if (catId) {
          query = query.eq('category_id', catId);
        }
        
        const { data, error } = await query;
        if (error) throw error;
        
        return data.map(p => ({
          id: p.id,
          sku: p.sku || p.slug,
          name: p.name,
          collection: p.name,
          slug: p.slug,
          price: p.price,
          category: p.category?.name || 'Uncategorized',
          brand: p.brand?.name || 'Unknown',
          images: p.images || [],
          image: (p.images && p.images.length > 0) ? p.images[0] : '',
          tag: p.tag === 'NONE' ? null : p.tag,
          badge: p.tag === 'BEST_SELLER' ? 'Best Seller' : (p.tag === 'NEW' ? 'New Arrival' : (p.tag === 'HOT' ? 'Hot' : '')),
          isNewArrival: p.tag === 'NEW',
          isBestSeller: p.tag === 'BEST_SELLER'
        }));
      }

      if (cleanEndpoint.startsWith('/products/id/')) {
        const id = cleanEndpoint.split('/').pop();
        const { data, error } = await supabase.from('products').select('*, brand:brands(name, slug), category:categories(name, slug)').eq('id', id).single();
        if (error) throw error;
        
        return {
          id: data.id,
          sku: data.sku || data.slug,
          name: data.name,
          collection: data.name,
          slug: data.slug,
          price: data.price,
          category: data.category?.name || 'Uncategorized',
          brand: data.brand?.name || 'Unknown',
          images: data.images || [],
          image: (data.images && data.images.length > 0) ? data.images[0] : '',
          tag: data.tag === 'NONE' ? null : data.tag,
          badge: data.tag === 'BEST_SELLER' ? 'Best Seller' : (data.tag === 'NEW' ? 'New Arrival' : (data.tag === 'HOT' ? 'Hot' : '')),
          isNewArrival: data.tag === 'NEW',
          isBestSeller: data.tag === 'BEST_SELLER'
        };
      }

      if (cleanEndpoint.startsWith('/products/sku/')) {
        const sku = cleanEndpoint.split('/').pop();
        const { data, error } = await supabase.from('products').select('*, brand:brands(name, slug), category:categories(name, slug)').eq('sku', sku).single();
        if (error) throw error;
        
        return {
          id: data.id,
          sku: data.sku || data.slug,
          name: data.name,
          collection: data.name,
          slug: data.slug,
          price: data.price,
          category: data.category?.name || 'Uncategorized',
          brand: data.brand?.name || 'Unknown',
          images: data.images || [],
          image: (data.images && data.images.length > 0) ? data.images[0] : '',
          tag: data.tag === 'NONE' ? null : data.tag,
          badge: data.tag === 'BEST_SELLER' ? 'Best Seller' : (data.tag === 'NEW' ? 'New Arrival' : (data.tag === 'HOT' ? 'Hot' : '')),
          isNewArrival: data.tag === 'NEW',
          isBestSeller: data.tag === 'BEST_SELLER'
        };
      }
      
      return [];
    } catch (err) {
      console.error(`API Fetch Error [${endpoint}]:`, err);
      return [];
    }
  },
  post: async (endpoint, data) => {
    try {
      if (endpoint === '/enquiries') {
        const { error } = await supabase.from('enquiries').insert([data]);
        if (error) throw error;
        return { success: true, message: 'Enquiry submitted successfully' };
      }
      return { success: false, message: 'Endpoint not supported' };
    } catch (err) {
      console.error(`API POST Error [${endpoint}]:`, err);
      return { success: false, message: 'Failed to submit enquiry. Please try again.' };
    }
  },
  formatImageUrl: (url) => {
    if (!url) return '';
    return url;
  }
};

export default api;
