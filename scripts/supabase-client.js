// StreetKart - Supabase Integration Client & Resilient Data Adapter
// Seamlessly delegates to Supabase when credentials exist, with fallback to local store

(function (window) {
  'use strict';

  // Read config from window, localStorage, or meta tags
  const SUPABASE_URL = window.SUPABASE_URL || localStorage.getItem('streetkart_supabase_url') || '';
  const SUPABASE_ANON_KEY = window.SUPABASE_ANON_KEY || localStorage.getItem('streetkart_supabase_key') || '';

  let client = null;

  if (window.supabase && SUPABASE_URL && SUPABASE_ANON_KEY) {
    try {
      client = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
      console.log('StreetKart: Supabase client initialized successfully.');
    } catch (err) {
      console.warn('StreetKart: Could not initialize Supabase client, using fallback adapter.', err);
    }
  }

  const StreetKartAPI = {
    isSupabaseActive() {
      return Boolean(client);
    },

    getClient() {
      return client;
    },

    // Fetch vendors matching category, open status, and search query
    async getVendors({ category = 'All', openOnly = false, searchQuery = '' } = {}) {
      if (client) {
        try {
          let query = client.from('vendors').select('*');
          if (category && category !== 'All') {
            query = query.eq('category', category);
          }
          if (openOnly) {
            query = query.eq('is_open', true);
          }
          if (searchQuery) {
            query = query.or(`name.ilike.%${searchQuery}%,locality.ilike.%${searchQuery}%,category.ilike.%${searchQuery}%`);
          }
          const { data, error } = await query;
          if (error) throw error;
          if (data && data.length > 0) return data;
        } catch (e) {
          console.warn('Supabase query failed, falling back to local dataset', e);
        }
      }
      // Resilient local fallback
      return window.StreetKartData.filterVendors(category, openOnly, searchQuery);
    },

    // Get a specific vendor by ID
    async getVendorById(id) {
      if (client) {
        try {
          const { data, error } = await client.from('vendors').select('*').eq('id', id).single();
          if (!error && data) return data;
        } catch (e) {
          console.warn('Supabase getVendorById failed, using local fallback', e);
        }
      }
      return window.StreetKartData.getVendorById(id);
    },

    // Create a new vendor profile
    async createVendor(vendorData) {
      if (client) {
        try {
          const payload = {
            name: vendorData.vendorName || vendorData.name,
            category: vendorData.category || 'Other',
            locality: vendorData.locality,
            description: vendorData.description || 'Authentic street vendor',
            price_range: vendorData.priceRange || '₹20-50',
            products: Array.isArray(vendorData.products) 
              ? vendorData.products 
              : (typeof vendorData.products === 'string' ? vendorData.products.split(',').map(s => s.trim()) : []),
            is_open: vendorData.isOpen !== undefined ? Boolean(vendorData.isOpen) : true
          };
          const { data, error } = await client.from('vendors').insert([payload]).select();
          if (error) throw error;
          if (data && data[0]) {
            localStorage.setItem('streetkart_current_vendor_id', String(data[0].id));
            return data[0];
          }
        } catch (e) {
          console.warn('Supabase createVendor failed, using local store', e);
        }
      }
      return window.StreetKartData.createVendorProfile(vendorData);
    },

    // Update vendor availability status (Open / Closed)
    async updateVendorStatus(id, isOpen) {
      if (client) {
        try {
          const { data, error } = await client
            .from('vendors')
            .update({ is_open: Boolean(isOpen), updated_at: new Date().toISOString() })
            .eq('id', id)
            .select();
          if (error) throw error;
          if (data && data[0]) return data[0];
        } catch (e) {
          console.warn('Supabase updateVendorStatus failed, updating local store', e);
        }
      }
      return window.StreetKartData.updateVendorAvailability(id, isOpen);
    },

    // Submit contact message
    async submitContactMessage(messageData) {
      if (client) {
        try {
          const { data, error } = await client.from('contact_messages').insert([messageData]);
          if (!error) return { success: true, data };
        } catch (e) {
          console.warn('Supabase contact submission failed', e);
        }
      }
      return { success: true, fallback: true };
    }
  };

  window.StreetKartAPI = StreetKartAPI;
})(window);
