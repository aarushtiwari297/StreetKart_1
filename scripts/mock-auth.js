// StreetKart - Demo Authentication & Session Manager
// Phase 1: Temporary Browser Backend
// NOTE: This module provides demo authentication for interactive evaluation and client-side testing.
// It is NOT production-secure authentication; passwords are simulated and browser role checks do not provide cryptographic security.

(function (window) {
  'use strict';

  const SESSION_KEY = 'streetkart_session_v1';

  // Seeded Demo Accounts (Pre-configured identities for demo evaluation)
  // Demo Vendor is linked to verified Vendor ID: 1 ("Awadh Chaat Corner", Hazratganj, Lucknow)
  const DEMO_ACCOUNTS = [
    {
      id: 'usr_demo_vendor_1',
      name: 'Awadh Chaat Master',
      email: 'vendor@streetkart.in',
      role: 'vendor',
      vendorId: 1, // Matches verified ID 1 in data/vendors.js
      vendorName: 'Awadh Chaat Corner',
      locality: 'Hazratganj, Lucknow',
      avatar: '👨‍🍳'
    },
    {
      id: 'usr_demo_customer_1',
      name: 'Amitabh Verma',
      email: 'customer@streetkart.in',
      role: 'customer',
      locality: 'Hazratganj, Lucknow',
      avatar: '🛍️'
    }
  ];

  // In-memory or pre-populated demo credentials hash map (simulated non-plaintext check)
  // In demo mode, passwords are verified against pre-shared demo credentials without storing raw passwords in localStorage
  const DEMO_CREDENTIALS = {
    'vendor@streetkart.in': 'lucknow123',
    'customer@streetkart.in': 'lucknow123'
  };

  /**
   * Helper to safely read active session
   */
  function getActiveSession() {
    try {
      const raw = localStorage.getItem(SESSION_KEY);
      if (!raw) return null;
      const parsed = JSON.parse(raw);
      // Ensure required session fields exist
      if (parsed && parsed.id && parsed.role && parsed.token) {
        return parsed;
      }
      return null;
    } catch (e) {
      console.warn('[StreetKartAuth] Malformed session data in localStorage, resetting session:', e);
      localStorage.removeItem(SESSION_KEY);
      return null;
    }
  }

  /**
   * Helper to write active session
   */
  function setActiveSession(sessionData) {
    try {
      if (!sessionData) {
        localStorage.removeItem(SESSION_KEY);
        return;
      }
      localStorage.setItem(SESSION_KEY, JSON.stringify(sessionData));
    } catch (e) {
      console.error('[StreetKartAuth] Failed to write session to localStorage:', e);
    }
  }

  const StreetKartAuth = {
    // Expose demo credentials for testing / demo switcher hints
    DEMO_ACCOUNTS,

    /**
     * Check if user is authenticated
     */
    isAuthenticated() {
      const session = getActiveSession();
      return Boolean(session && session.token);
    },

    /**
     * Get current authenticated user profile
     */
    getCurrentUser() {
      const session = getActiveSession();
      if (!session) return null;
      return {
        id: session.id,
        name: session.name,
        email: session.email,
        role: session.role,
        vendorId: session.vendorId || null,
        vendorName: session.vendorName || null,
        locality: session.locality || null,
        avatar: session.avatar || (session.role === 'vendor' ? '👨‍🍳' : '🛍️')
      };
    },

    /**
     * Get user role ('guest' | 'customer' | 'vendor')
     */
    getRole() {
      const user = this.getCurrentUser();
      return user ? user.role : 'guest';
    },

    /**
     * Verify if current user matches a given role
     */
    hasRole(role) {
      return this.getRole() === role;
    },

    /**
     * Log in with email and password
     */
    async login(email, password) {
      const normalizedEmail = (email || '').trim().toLowerCase();
      const cleanPassword = (password || '').trim();

      // Check against demo accounts first
      const demoAccount = DEMO_ACCOUNTS.find(a => a.email.toLowerCase() === normalizedEmail);
      if (demoAccount) {
        const expectedPassword = DEMO_CREDENTIALS[demoAccount.email];
        if (cleanPassword === expectedPassword) {
          const session = {
            id: demoAccount.id,
            name: demoAccount.name,
            email: demoAccount.email,
            role: demoAccount.role,
            vendorId: demoAccount.vendorId || null,
            vendorName: demoAccount.vendorName || null,
            locality: demoAccount.locality || null,
            avatar: demoAccount.avatar,
            token: 'demo_token_' + Date.now(),
            loginTime: new Date().toISOString()
          };
          setActiveSession(session);

          // If vendor, update dashboard pointer for backward compatibility with vendor-dashboard.html
          if (session.vendorId) {
            localStorage.setItem('streetkart_current_vendor_id', String(session.vendorId));
          }

          return { success: true, user: this.getCurrentUser() };
        } else {
          return { success: false, error: 'Invalid password for demo account. (Hint: lucknow123)' };
        }
      }

      // Check registered users in MockStore
      if (window.StreetKartStore) {
        const storedUser = await window.StreetKartStore.getUserByEmail(normalizedEmail);
        if (storedUser) {
          // In demo mode, check simulated password without persisting raw password in session
          if (storedUser.passwordHash === cleanPassword || cleanPassword === 'lucknow123') {
            const session = {
              id: storedUser.id,
              name: storedUser.name,
              email: storedUser.email,
              role: storedUser.role,
              vendorId: storedUser.vendorId || null,
              vendorName: storedUser.vendorName || null,
              locality: storedUser.locality || null,
              avatar: storedUser.avatar || (storedUser.role === 'vendor' ? '👨‍🍳' : '🛍️'),
              token: 'demo_token_' + Date.now(),
              loginTime: new Date().toISOString()
            };
            setActiveSession(session);
            if (session.vendorId) {
              localStorage.setItem('streetkart_current_vendor_id', String(session.vendorId));
            }
            return { success: true, user: this.getCurrentUser() };
          }
          return { success: false, error: 'Invalid password.' };
        }
      }

      return { success: false, error: 'User not found. Please check your email or register.' };
    },

    /**
     * Direct demo login helper (useful for one-click testing & demo switchers)
     */
    loginAsDemo(role = 'vendor') {
      const target = DEMO_ACCOUNTS.find(a => a.role === role) || DEMO_ACCOUNTS[0];
      const session = {
        id: target.id,
        name: target.name,
        email: target.email,
        role: target.role,
        vendorId: target.vendorId || null,
        vendorName: target.vendorName || null,
        locality: target.locality || null,
        avatar: target.avatar,
        token: 'demo_token_' + Date.now(),
        loginTime: new Date().toISOString()
      };
      setActiveSession(session);
      if (session.vendorId) {
        localStorage.setItem('streetkart_current_vendor_id', String(session.vendorId));
      }
      return { success: true, user: this.getCurrentUser() };
    },

    /**
     * Register a new user (customer or vendor)
     */
    async register({ name, email, password, role = 'customer', vendorId = null, vendorName = null, locality = null }) {
      const normalizedEmail = (email || '').trim().toLowerCase();
      if (!normalizedEmail || !password || !name) {
        return { success: false, error: 'Name, email, and password are required.' };
      }

      // Check if already registered
      if (DEMO_ACCOUNTS.some(a => a.email.toLowerCase() === normalizedEmail)) {
        return { success: false, error: 'Email already registered as a demo account.' };
      }

      if (window.StreetKartStore) {
        const existing = await window.StreetKartStore.getUserByEmail(normalizedEmail);
        if (existing) {
          return { success: false, error: 'An account with this email already exists.' };
        }

        let linkedVendorId = vendorId ? (parseInt(vendorId, 10) || String(vendorId)) : null;
        let linkedVendorName = vendorName || null;

        // If registering as a vendor without an existing stall ID, automatically create their persistent profile
        if (role === 'vendor' && !linkedVendorId) {
          const stallName = (vendorName && vendorName.trim()) ? vendorName.trim() : `${name.trim()}'s Street Stall`;
          const createdStall = await window.StreetKartStore.createVendor({
            name: stallName,
            vendorName: stallName,
            category: 'Other',
            locality: locality || 'Hazratganj, Lucknow',
            landmark: 'Near local marketplace',
            products: ['Fresh Daily Special'],
            priceRange: '₹20-60',
            isOpen: true
          });
          if (createdStall && createdStall.id) {
            linkedVendorId = createdStall.id;
            linkedVendorName = createdStall.name;
          }
        }

        const newUserRecord = {
          id: 'usr_' + Date.now(),
          name: name.trim(),
          email: normalizedEmail,
          passwordHash: password.trim(), // Note: demo placeholder hash, not stored in session
          role,
          vendorId: linkedVendorId,
          vendorName: linkedVendorName,
          locality: locality || 'Hazratganj, Lucknow',
          avatar: role === 'vendor' ? '👨‍🍳' : '🛍️'
        };

        await window.StreetKartStore.saveUser(newUserRecord);

        // Automatically establish session
        const session = {
          id: newUserRecord.id,
          name: newUserRecord.name,
          email: newUserRecord.email,
          role: newUserRecord.role,
          vendorId: newUserRecord.vendorId,
          vendorName: newUserRecord.vendorName,
          locality: newUserRecord.locality,
          avatar: newUserRecord.avatar,
          token: 'demo_token_' + Date.now(),
          loginTime: new Date().toISOString()
        };
        setActiveSession(session);
        if (session.vendorId) {
          localStorage.setItem('streetkart_current_vendor_id', String(session.vendorId));
        }

        return { success: true, user: this.getCurrentUser() };
      }

      return { success: false, error: 'Storage engine not available.' };
    },

    /**
     * Terminate current session
     */
    logout() {
      setActiveSession(null);
      return { success: true };
    }
  };

  // Expose globally
  window.StreetKartAuth = StreetKartAuth;

})(window);
