// StreetKart - Supabase Integration Client & Resilient Data Adapter
// Phase: Vendor Verification MVP (Secure Admin Authorization & Fallback Engine)
// NOTE: Only anonymous client credentials are used; service-role keys are NEVER exposed to the frontend.

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
    /**
     * Check whether live Supabase backend is active
     */
    isSupabaseActive() {
      return Boolean(client);
    },

    /**
     * Get backend operational mode
     * @returns {'supabase' | 'local_demonstration'}
     */
    getBackendMode() {
      return client ? 'supabase' : 'local_demonstration';
    },

    getClient() {
      return client;
    },

    /**
     * Verify if the currently logged in user has administrative privileges.
     * Enforced securely via Supabase admin_users table and RLS when live,
     * or via StreetKartAuth admin role in demonstration mode.
     */
    async checkIsAdmin() {
      if (client) {
        try {
          const { data: { user } } = await client.auth.getUser();
          if (!user) return false;

          const { data, error } = await client
            .from('admin_users')
            .select('user_id')
            .eq('user_id', user.id);

          if (error) {
            console.warn('[StreetKartAPI] admin_users query returned error (RLS enforced):', error.message);
            return false;
          }
          return Boolean(data && data.length > 0);
        } catch (e) {
          console.warn('[StreetKartAPI] checkIsAdmin error:', e);
          return false;
        }
      }

      // Demonstration mode check
      if (window.StreetKartAuth && typeof window.StreetKartAuth.getCurrentUser === 'function') {
        const currentUser = window.StreetKartAuth.getCurrentUser();
        return Boolean(currentUser && currentUser.role === 'admin');
      }
      return false;
    },

    /**
     * Upload a stall photo to Supabase Storage or convert to data URL in fallback mode
     */
    async uploadStallPhoto(file) {
      if (client && file instanceof File) {
        try {
          const cleanName = file.name.replace(/[^a-zA-Z0-9.]/g, '_');
          const filePath = `stall_${Date.now()}_${cleanName}`;
          const { error: uploadError } = await client.storage
            .from('stall-photos')
            .upload(filePath, file, { cacheControl: '3600', upsert: true });

          if (uploadError) throw uploadError;

          const { data } = client.storage.from('stall-photos').getPublicUrl(filePath);
          if (data && data.publicUrl) {
            return { success: true, url: data.publicUrl };
          }
        } catch (err) {
          console.warn('[StreetKartAPI] Supabase storage upload failed, using fallback data URL:', err);
        }
      }

      // Fallback: Read as data URL for local storage
      if (file instanceof File) {
        return new Promise((resolve) => {
          const reader = new FileReader();
          reader.onload = (e) => resolve({ success: true, url: e.target.result });
          reader.onerror = () => resolve({ success: false, url: 'assets/logo-icon.svg' });
          reader.readAsDataURL(file);
        });
      }

      // String URL provided
      if (typeof file === 'string' && file.trim()) {
        return { success: true, url: file.trim() };
      }

      return { success: true, url: 'assets/logo-icon.svg' };
    },

    /**
     * Fetch vendors matching category, open status, and search query.
     * Enforces that only approved listings appear in public discovery.
     */
    async getVendors({ category = 'All', openOnly = false, searchQuery = '' } = {}) {
      if (client) {
        try {
          // In Supabase, RLS policy "Public can view approved vendors" automatically filters to verification_status = 'approved'
          let query = client.from('vendors').select('*').eq('verification_status', 'approved');
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
          if (data && Array.isArray(data)) return data;
        } catch (e) {
          console.warn('[StreetKartAPI] Supabase query failed, falling back to local dataset:', e);
        }
      }

      // Resilient local fallback
      if (window.StreetKartStore && typeof window.StreetKartStore.getVendors === 'function') {
        return window.StreetKartStore.getVendors({ category, openOnly, searchQuery });
      }
      if (window.StreetKartData && typeof window.StreetKartData.filterVendors === 'function') {
        return window.StreetKartData.filterVendors(category, openOnly, searchQuery);
      }
      return [];
    },

    /**
     * Get a specific vendor by ID
     */
    async getVendorById(id) {
      if (client) {
        try {
          const { data, error } = await client.from('vendors').select('*').eq('id', id).single();
          if (!error && data) return data;
        } catch (e) {
          console.warn('[StreetKartAPI] Supabase getVendorById failed, using local fallback:', e);
        }
      }

      if (window.StreetKartStore && typeof window.StreetKartStore.getVendorById === 'function') {
        return window.StreetKartStore.getVendorById(id);
      }
      if (window.StreetKartData && typeof window.StreetKartData.getVendorById === 'function') {
        return window.StreetKartData.getVendorById(id);
      }
      return null;
    },

    /**
     * Create a new vendor profile / onboarding application.
     * Newly created vendors are ALWAYS set to verification_status = 'pending' and verified = false.
     */
    async createVendor(vendorData) {
      const payload = {
        name: vendorData.vendorName || vendorData.name,
        category: vendorData.category || 'Other',
        locality: vendorData.locality,
        landmark: vendorData.landmark || '',
        description: vendorData.description || 'Authentic street vendor stall',
        price_range: vendorData.priceRange || '₹20-50',
        products: Array.isArray(vendorData.products) 
          ? vendorData.products 
          : (typeof vendorData.products === 'string' ? vendorData.products.split(',').map(s => s.trim()).filter(Boolean) : []),
        is_open: vendorData.isOpen !== undefined ? Boolean(vendorData.isOpen) : true,
        image_url: vendorData.imageUrl || vendorData.stallPhoto || 'assets/logo-icon.svg',
        verification_status: 'pending',
        verified: false,
        created_at: new Date().toISOString()
      };

      if (client) {
        try {
          const { data, error } = await client.from('vendors').insert([payload]).select();
          if (error) throw error;
          if (data && data[0]) {
            localStorage.setItem('streetkart_current_vendor_id', String(data[0].id));
            return data[0];
          }
        } catch (e) {
          console.warn('[StreetKartAPI] Supabase createVendor failed, using local store:', e);
        }
      }

      if (window.StreetKartStore && typeof window.StreetKartStore.createVendor === 'function') {
        return window.StreetKartStore.createVendor(vendorData);
      }
      if (window.StreetKartData && typeof window.StreetKartData.createVendorProfile === 'function') {
        return window.StreetKartData.createVendorProfile(vendorData);
      }
      return payload;
    },

    /**
     * Get list of pending vendor applications for administrator review
     */
    async getPendingApplications() {
      if (client) {
        try {
          const { data, error } = await client
            .from('vendors')
            .select('*')
            .eq('verification_status', 'pending')
            .order('created_at', { ascending: false });

          if (error) throw error;
          return data || [];
        } catch (err) {
          console.warn('[StreetKartAPI] Supabase getPendingApplications error (may be blocked by RLS):', err);
          return [];
        }
      }

      if (window.StreetKartStore && typeof window.StreetKartStore.getPendingApplications === 'function') {
        return window.StreetKartStore.getPendingApplications();
      }
      return [];
    },

    /**
     * Review a vendor application (Approve or Reject).
     * Enforced strictly by PostgreSQL RPC review_vendor_application with admin authorization.
     */
    async reviewVendorApplication({ vendorId, status, rejectionReason = null }) {
      if (status !== 'approved' && status !== 'rejected') {
        return { success: false, error: 'Invalid review status. Must be "approved" or "rejected".' };
      }

      if (client) {
        try {
          const { data, error } = await client.rpc('review_vendor_application', {
            vendor_id: parseInt(vendorId, 10),
            new_status: status,
            rejection_notes: rejectionReason
          });

          if (error) {
            console.error('[StreetKartAPI] Supabase review_vendor_application error:', error);
            return { success: false, error: error.message };
          }
          return { success: true, data };
        } catch (err) {
          console.error('[StreetKartAPI] reviewVendorApplication RPC invocation failed:', err);
          return { success: false, error: err.message };
        }
      }

      // Demonstration mode fallback (strictly checks admin role)
      if (window.StreetKartStore && typeof window.StreetKartStore.reviewVendorApplication === 'function') {
        const isAdmin = await this.checkIsAdmin();
        if (!isAdmin) {
          return {
            success: false,
            error: 'Access Denied: Only authorized administrators can review vendor applications.'
          };
        }
        return window.StreetKartStore.reviewVendorApplication({ vendorId, status, rejectionReason });
      }

      return { success: false, error: 'Storage engine not available' };
    },

    /**
     * Update vendor availability status (Open / Closed)
     */
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
          console.warn('[StreetKartAPI] Supabase updateVendorStatus failed, updating local store:', e);
        }
      }

      if (window.StreetKartStore && typeof window.StreetKartStore.updateVendorStatus === 'function') {
        return window.StreetKartStore.updateVendorStatus(id, isOpen);
      }
      return window.StreetKartData.updateVendorAvailability(id, isOpen);
    },

    /**
     * Submit contact message
     */
    async submitContactMessage(messageData) {
      if (client) {
        try {
          const { data, error } = await client.from('contact_messages').insert([messageData]);
          if (!error) return { success: true, data };
        } catch (e) {
          console.warn('[StreetKartAPI] Supabase contact submission failed:', e);
        }
      }
      return { success: true, fallback: true };
    }
  };

  window.StreetKartAPI = StreetKartAPI;
})(window);
