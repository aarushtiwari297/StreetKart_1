// StreetKart - Centralized Mock Store & Browser-based Persistence Engine
// Phase 1: Temporary Browser Backend (Preserving 25 Lucknow Seed Vendors)
// Provides idempotent, safe persistence and future-compatible async signatures.

(function (window) {
  'use strict';

  // Storage Keys (versioned to avoid collision)
  const KEYS = {
    VENDORS: 'streetkart_vendors_data',
    DATASET_VERSION: 'streetkart_dataset_version',
    CURRENT_VENDOR_ID: 'streetkart_current_vendor_id',
    ORDERS: 'streetkart_orders_v1',
    USERS: 'streetkart_users_v1',
    FAVORITES: 'streetkart_favorites_v1'
  };

  const CURRENT_DATASET_VERSION = 'lucknow_v1';

  // Safe localStorage helper functions with JSON error handling
  function safeGet(key, fallback = null) {
    try {
      const val = localStorage.getItem(key);
      if (val === null || val === undefined) return fallback;
      return JSON.parse(val);
    } catch (e) {
      console.warn(`[StreetKartStore] Failed to parse key "${key}" from storage:`, e);
      return fallback;
    }
  }

  function safeSet(key, value) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
      return true;
    } catch (e) {
      console.error(`[StreetKartStore] Failed to write key "${key}" to storage:`, e);
      return false;
    }
  }

  /**
   * Initializes the vendor dataset idempotently.
   * Leverages the verified window.StreetKartData if available,
   * preserving user-created vendors and the 25 Lucknow seed vendors.
   */
  function initStore() {
    try {
      const existingVendors = safeGet(KEYS.VENDORS, null);
      const existingVersion = localStorage.getItem(KEYS.DATASET_VERSION);

      // If already populated and version matches, do not overwrite or mutate
      if (existingVersion === CURRENT_DATASET_VERSION && Array.isArray(existingVendors) && existingVendors.length >= 25) {
        return;
      }

      // If window.StreetKartData exists (from data/vendors.js), let its migration/seeding run
      if (window.StreetKartData && typeof window.StreetKartData.getVendors === 'function') {
        const loaded = window.StreetKartData.getVendors();
        if (Array.isArray(loaded) && loaded.length > 0) {
          // vendors.js has already initialized localStorage safely
          return;
        }
      }
    } catch (err) {
      console.warn('[StreetKartStore] Initialization check encountered an error:', err);
    }
  }

  // Run idempotent init
  initStore();

  const StreetKartStore = {
    KEYS,

    // =========================================================================
    // VENDOR CRUD & QUERY OPERATIONS (Async for Supabase forward-compatibility)
    // =========================================================================

    /**
     * Get all vendors, with optional filtering
     */
    async getVendors({ category = 'All', openOnly = false, searchQuery = '' } = {}) {
      if (window.StreetKartData && typeof window.StreetKartData.filterVendors === 'function') {
        return window.StreetKartData.filterVendors(category, openOnly, searchQuery);
      }
      const list = safeGet(KEYS.VENDORS, []);
      const q = (searchQuery || '').trim().toLowerCase();
      return list.filter(v => {
        const categoryMatch = category === 'All' || v.category === category;
        const openMatch = !openOnly || Boolean(v.isOpen);
        let searchMatch = true;
        if (q) {
          const inName = (v.name || '').toLowerCase().includes(q);
          const inLocality = (v.locality || '').toLowerCase().includes(q);
          const inCategory = (v.category || '').toLowerCase().includes(q);
          const inProducts = Array.isArray(v.products) && v.products.some(p => p.toLowerCase().includes(q));
          const inLandmark = (v.landmark || '').toLowerCase().includes(q);
          searchMatch = inName || inLocality || inCategory || inProducts || inLandmark;
        }
        return categoryMatch && openMatch && searchMatch;
      });
    },

    /**
     * Get single vendor by ID (handles both numeric and string IDs)
     */
    async getVendorById(id) {
      if (id === undefined || id === null) return null;
      if (window.StreetKartData && typeof window.StreetKartData.getVendorById === 'function') {
        return window.StreetKartData.getVendorById(id);
      }
      const list = safeGet(KEYS.VENDORS, []);
      return list.find(v => v.id === parseInt(id, 10) || String(v.id) === String(id)) || null;
    },

    /**
     * Update vendor open/closed availability status
     */
    async updateVendorStatus(id, isOpen) {
      if (window.StreetKartData && typeof window.StreetKartData.updateVendorAvailability === 'function') {
        return window.StreetKartData.updateVendorAvailability(id, isOpen);
      }
      const list = safeGet(KEYS.VENDORS, []);
      const idx = list.findIndex(v => v.id === parseInt(id, 10) || String(v.id) === String(id));
      if (idx !== -1) {
        list[idx].isOpen = Boolean(isOpen);
        list[idx].lastUpdated = new Date().toISOString();
        safeSet(KEYS.VENDORS, list);
        return list[idx];
      }
      return null;
    },

    /**
     * Update vendor profile fields (name, description, locality, landmark, category, products, priceRange, timings, imageUrl)
     */
    async updateVendorProfile(id, updates = {}) {
      const list = safeGet(KEYS.VENDORS, []);
      const idx = list.findIndex(v => v.id === parseInt(id, 10) || String(v.id) === String(id));
      if (idx === -1) return null;

      const current = list[idx];
      const updated = {
        ...current,
        name: updates.name !== undefined ? updates.name.trim() : current.name,
        description: updates.description !== undefined ? updates.description.trim() : current.description,
        locality: updates.locality !== undefined ? updates.locality.trim() : current.locality,
        landmark: updates.landmark !== undefined ? updates.landmark.trim() : current.landmark,
        category: updates.category !== undefined ? updates.category.trim() : current.category,
        products: Array.isArray(updates.products) 
          ? updates.products 
          : (typeof updates.products === 'string' ? updates.products.split(',').map(s => s.trim()).filter(Boolean) : current.products),
        priceRange: updates.priceRange !== undefined ? updates.priceRange.trim() : current.priceRange,
        timings: updates.timings !== undefined ? updates.timings.trim() : current.timings,
        imageUrl: updates.imageUrl !== undefined ? updates.imageUrl.trim() : current.imageUrl,
        lastUpdated: new Date().toISOString()
      };

      list[idx] = updated;
      safeSet(KEYS.VENDORS, list);
      return updated;
    },

    /**
     * Add a new menu item to a vendor's stall
     */
    async addMenuItem(vendorId, itemData) {
      const list = safeGet(KEYS.VENDORS, []);
      const idx = list.findIndex(v => v.id === parseInt(vendorId, 10) || String(v.id) === String(vendorId));
      if (idx === -1) return null;

      const vendor = list[idx];
      if (!Array.isArray(vendor.menuItems)) {
        vendor.menuItems = [];
      }

      const formattedPrice = String(itemData.price || '₹30').startsWith('₹') 
        ? String(itemData.price).trim() 
        : '₹' + String(itemData.price).trim();

      const newItem = {
        name: (itemData.name || 'New Item').trim(),
        price: formattedPrice,
        desc: (itemData.desc || 'Fresh daily prep at cart').trim(),
        available: itemData.available !== undefined ? Boolean(itemData.available) : true
      };

      vendor.menuItems.push(newItem);
      list[idx] = vendor;
      safeSet(KEYS.VENDORS, list);
      return vendor;
    },

    /**
     * Update an existing menu item by index
     */
    async updateMenuItem(vendorId, itemIndex, itemData) {
      const list = safeGet(KEYS.VENDORS, []);
      const idx = list.findIndex(v => v.id === parseInt(vendorId, 10) || String(v.id) === String(vendorId));
      if (idx === -1) return null;

      const vendor = list[idx];
      if (!Array.isArray(vendor.menuItems) || !vendor.menuItems[itemIndex]) {
        return null;
      }

      const currentItem = vendor.menuItems[itemIndex];
      const formattedPrice = itemData.price !== undefined 
        ? (String(itemData.price).startsWith('₹') ? String(itemData.price).trim() : '₹' + String(itemData.price).trim())
        : currentItem.price;

      vendor.menuItems[itemIndex] = {
        ...currentItem,
        name: itemData.name !== undefined ? itemData.name.trim() : currentItem.name,
        price: formattedPrice,
        desc: itemData.desc !== undefined ? itemData.desc.trim() : currentItem.desc,
        available: itemData.available !== undefined ? Boolean(itemData.available) : currentItem.available
      };

      list[idx] = vendor;
      safeSet(KEYS.VENDORS, list);
      return vendor;
    },

    /**
     * Delete a menu item by index
     */
    async deleteMenuItem(vendorId, itemIndex) {
      const list = safeGet(KEYS.VENDORS, []);
      const idx = list.findIndex(v => v.id === parseInt(vendorId, 10) || String(v.id) === String(vendorId));
      if (idx === -1) return null;

      const vendor = list[idx];
      if (!Array.isArray(vendor.menuItems) || !vendor.menuItems[itemIndex]) {
        return null;
      }

      vendor.menuItems.splice(itemIndex, 1);
      list[idx] = vendor;
      safeSet(KEYS.VENDORS, list);
      return vendor;
    },

    /**
     * Toggle in-stock availability of a specific menu item for a vendor
     */
    async toggleMenuItemStock(vendorId, itemIndexOrName, isAvailable) {
      const list = safeGet(KEYS.VENDORS, []);
      const idx = list.findIndex(v => v.id === parseInt(vendorId, 10) || String(v.id) === String(vendorId));
      if (idx === -1) return null;

      const vendor = list[idx];
      if (!Array.isArray(vendor.menuItems)) {
        vendor.menuItems = [];
      }

      if (typeof itemIndexOrName === 'number' && vendor.menuItems[itemIndexOrName]) {
        vendor.menuItems[itemIndexOrName].available = isAvailable !== undefined 
          ? Boolean(isAvailable) 
          : !Boolean(vendor.menuItems[itemIndexOrName].available);
      } else if (typeof itemIndexOrName === 'string') {
        const item = vendor.menuItems.find(m => m.name === itemIndexOrName);
        if (item) {
          item.available = isAvailable !== undefined ? Boolean(isAvailable) : !Boolean(item.available);
        }
      }

      list[idx] = vendor;
      safeSet(KEYS.VENDORS, list);
      return vendor;
    },

    /**
     * Create a new vendor profile from signup wizard
     */
    async createVendor(vendorData) {
      if (window.StreetKartData && typeof window.StreetKartData.createVendorProfile === 'function') {
        return window.StreetKartData.createVendorProfile(vendorData);
      }
      const list = safeGet(KEYS.VENDORS, []);
      const newId = list.length > 0 ? Math.max(...list.map(v => typeof v.id === 'number' ? v.id : 0)) + 1 : 26;

      const created = {
        id: newId,
        name: vendorData.vendorName || vendorData.name,
        category: vendorData.category || 'Other',
        locality: vendorData.locality || 'Hazratganj, Lucknow',
        landmark: vendorData.landmark || 'Near main market',
        products: Array.isArray(vendorData.products) ? vendorData.products : [],
        priceRange: vendorData.priceRange || '₹20-50',
        isOpen: vendorData.isOpen !== undefined ? Boolean(vendorData.isOpen) : true,
        rating: 5.0,
        reviewsCount: 1,
        distance: "100m",
        walkTime: "1 min",
        since: new Date().getFullYear().toString(),
        setupType: "Mobile Thela (Cart)",
        timings: vendorData.timings || "8:00 AM – 9:00 PM",
        verified: false,
        phone: vendorData.phone || "+91 522 000 0000",
        description: vendorData.description || "Authentic local street cart.",
        imageUrl: vendorData.imageUrl || "assets/logo-icon.svg",
        menuItems: []
      };

      list.unshift(created);
      safeSet(KEYS.VENDORS, list);
      localStorage.setItem(KEYS.CURRENT_VENDOR_ID, String(newId));
      return created;
    },

    // =========================================================================
    // ORDERS & RESERVATIONS OPERATIONS
    // =========================================================================

    /**
     * Create a new demo customer order / stall reservation
     */
    async createOrder({ customerId, customerName, vendorId, vendorName, items = [], totalAmount = 0, paymentMode = 'UPI at Cart', notes = '' }) {
      const orders = safeGet(KEYS.ORDERS, []);
      const orderId = 'SK-' + Math.floor(1000 + Math.random() * 9000);

      const newOrder = {
        id: orderId,
        customerId: customerId || 'guest',
        customerName: customerName || 'Guest Customer',
        vendorId: parseInt(vendorId, 10) || String(vendorId),
        vendorName: vendorName || 'Street Vendor',
        items: items.map(it => ({
          name: it.name,
          price: it.price,
          quantity: it.quantity || 1
        })),
        totalAmount: Number(totalAmount) || 0,
        paymentMode: paymentMode || 'UPI at Cart',
        notes: notes || '',
        status: 'Placed', // 'Placed' | 'Accepted' | 'Ready' | 'Completed' | 'Cancelled'
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };

      orders.unshift(newOrder);
      safeSet(KEYS.ORDERS, orders);
      return newOrder;
    },

    /**
     * Get orders for a specific customer
     */
    async getOrdersByCustomer(customerId) {
      const orders = safeGet(KEYS.ORDERS, []);
      if (!customerId) return [];
      return orders.filter(o => String(o.customerId) === String(customerId));
    },

    /**
     * Get orders for a specific vendor
     */
    async getOrdersByVendor(vendorId) {
      const orders = safeGet(KEYS.ORDERS, []);
      if (!vendorId) return [];
      return orders.filter(o => String(o.vendorId) === String(vendorId));
    },

    /**
     * Update order status (vendor marking order Ready / Completed)
     */
    async updateOrderStatus(orderId, newStatus) {
      const orders = safeGet(KEYS.ORDERS, []);
      const idx = orders.findIndex(o => o.id === orderId);
      if (idx !== -1) {
        orders[idx].status = newStatus;
        orders[idx].updatedAt = new Date().toISOString();
        safeSet(KEYS.ORDERS, orders);
        return orders[idx];
      }
      return null;
    },

    // =========================================================================
    // USER & PROFILE STORE
    // =========================================================================

    async getUsers() {
      return safeGet(KEYS.USERS, []);
    },

    async saveUser(userRecord) {
      const users = safeGet(KEYS.USERS, []);
      const idx = users.findIndex(u => u.email.toLowerCase() === userRecord.email.toLowerCase());
      if (idx !== -1) {
        users[idx] = { ...users[idx], ...userRecord, updatedAt: new Date().toISOString() };
      } else {
        users.push({ ...userRecord, createdAt: new Date().toISOString() });
      }
      safeSet(KEYS.USERS, users);
      return userRecord;
    },

    async getUserByEmail(email) {
      if (!email) return null;
      const users = safeGet(KEYS.USERS, []);
      return users.find(u => u.email.toLowerCase() === email.trim().toLowerCase()) || null;
    },

    // =========================================================================
    // CUSTOMER FAVORITES OPERATIONS
    // =========================================================================

    async getFavorites() {
      return safeGet(KEYS.FAVORITES, []);
    },

    async toggleFavorite(vendorId) {
      const favs = safeGet(KEYS.FAVORITES, []);
      const strId = String(vendorId);
      const exists = favs.includes(strId);
      let updated;
      if (exists) {
        updated = favs.filter(id => id !== strId);
      } else {
        updated = [...favs, strId];
      }
      safeSet(KEYS.FAVORITES, updated);
      return !exists;
    },

    async isFavorite(vendorId) {
      const favs = safeGet(KEYS.FAVORITES, []);
      return favs.includes(String(vendorId));
    }
  };

  // Expose globally
  window.StreetKartStore = StreetKartStore;

})(window);
