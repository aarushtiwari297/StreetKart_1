// StreetKart - Main JavaScript Controller
// UI interactions, Stitch-to-code components, and dynamic data integration

// ===================================
// TOAST NOTIFICATION SYSTEM
// ===================================
const ToastManager = {
  container: null,

  init() {
    if (!this.container) {
      this.container = document.createElement('div');
      this.container.className = 'toast-container';
      document.body.appendChild(this.container);
    }
  },

  show(message, type = 'info', duration = 4000) {
    this.init();

    const icons = {
      success: '✓',
      error: '✕',
      warning: '⚠',
      info: 'ℹ'
    };

    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.innerHTML = `
      <div class="toast-icon">${icons[type]}</div>
      <div class="toast-content">
        <div class="toast-title">${type.charAt(0).toUpperCase() + type.slice(1)}</div>
        <p class="toast-message">${message}</p>
      </div>
      <button class="toast-close" onclick="this.parentElement.remove()" aria-label="Close notification">×</button>
    `;

    this.container.appendChild(toast);

    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateY(20px)';
      setTimeout(() => toast.remove(), 300);
    }, duration);
  },

  success(message) { this.show(message, 'success'); },
  error(message) { this.show(message, 'error'); },
  warning(message) { this.show(message, 'warning'); },
  info(message) { this.show(message, 'info'); }
};
window.ToastManager = ToastManager;

// ===================================
// SCROLL EFFECTS & NAVBAR
// ===================================
let lastScrollTop = 0;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  if (scrollTop > 30) {
    navbar?.classList.add('scrolled');
  } else {
    navbar?.classList.remove('scrolled');
  }
  lastScrollTop = scrollTop;
});

// ===================================
// COUNTER ANIMATIONS (HOMEPAGE STATS)
// ===================================
function animateCounter(element, target, duration = 1800) {
  const start = 0;
  const increment = target / (duration / 16);
  let current = start;

  const timer = setInterval(() => {
    current += increment;
    if (current >= target) {
      element.textContent = target.toLocaleString();
      clearInterval(timer);
    } else {
      element.textContent = Math.floor(current).toLocaleString();
    }
  }, 16);
}

// Intersection Observer for scroll-triggered animations
const observerOptions = {
  threshold: 0.15,
  rootMargin: '0px 0px -40px 0px'
};

const animateOnScroll = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('animate-fade-in-up');

      // Animate counters if they have data-count attribute
      if (entry.target.hasAttribute('data-count')) {
        const target = parseInt(entry.target.getAttribute('data-count'), 10);
        animateCounter(entry.target, target);
      }

      animateOnScroll.unobserve(entry.target);
    }
  });
}, observerOptions);

document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.stagger-item').forEach(el => {
    animateOnScroll.observe(el);
  });
});

// ===================================
// MOBILE MENU TOGGLE
// ===================================
document.addEventListener('DOMContentLoaded', function () {
  const navbarToggle = document.querySelector('.navbar-toggle');
  const navbarMenu = document.querySelector('.navbar-menu');

  if (navbarToggle && navbarMenu) {
    navbarToggle.addEventListener('click', function () {
      navbarMenu.classList.toggle('active');
    });

    document.addEventListener('click', (e) => {
      if (!navbarToggle.contains(e.target) && !navbarMenu.contains(e.target)) {
        navbarMenu.classList.remove('active');
      }
    });
  }
});

// ===================================
// FORM VALIDATIONS
// ===================================
function validateEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function validatePhone(phone) {
  return /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/.test(phone);
}

document.addEventListener('DOMContentLoaded', () => {
  const emailInputs = document.querySelectorAll('input[type="email"]');
  emailInputs.forEach(input => {
    input.addEventListener('blur', function () {
      if (this.value && !validateEmail(this.value)) {
        this.style.borderColor = 'var(--color-error)';
        ToastManager.error('Please enter a valid email address');
      } else {
        this.style.borderColor = '';
      }
    });
  });
});

// ===================================
// VENDOR SIGNUP FORM CONTROLLER
// ===================================
async function handleVendorSignup(event) {
  event.preventDefault();

  const form = event.target;
  const submitBtn = form.querySelector('button[type="submit"]');

  if (submitBtn) {
    submitBtn.classList.add('btn-loading');
    submitBtn.disabled = true;
  }

  // Gather values
  const vendorName = document.getElementById('vendorName')?.value || '';
  const category = document.getElementById('category')?.value || 'Other';
  const locality = document.getElementById('locality')?.value || '';
  const landmark = document.getElementById('landmark')?.value || '';
  const products = document.getElementById('products')?.value || '';
  const priceRange = document.getElementById('priceRange')?.value || '₹20-50';
  const isOpen = document.getElementById('isOpen') ? document.getElementById('isOpen').checked : true;

  const vendorPayload = {
    vendorName,
    category,
    locality,
    landmark,
    products,
    priceRange,
    isOpen
  };

  try {
    let created = null;
    if (window.StreetKartStore) {
      created = await window.StreetKartStore.createVendor(vendorPayload);
    } else if (window.StreetKartAPI) {
      created = await window.StreetKartAPI.createVendor(vendorPayload);
    } else if (window.StreetKartData) {
      created = window.StreetKartData.createVendorProfile(vendorPayload);
    }

    // Automatically establish or update vendor session in StreetKartAuth
    if (created && created.id && window.StreetKartAuth) {
      localStorage.setItem('streetkart_current_vendor_id', String(created.id));
      const currentUser = window.StreetKartAuth.getCurrentUser();
      if (!currentUser || currentUser.role !== 'vendor') {
        // Register an authentic demo session for the newly created vendor
        const ownerName = vendorName.split(' ')[0] + ' (Vendor)';
        const ownerEmail = `vendor_${created.id}@streetkart.in`;
        await window.StreetKartAuth.register({
          name: ownerName,
          email: ownerEmail,
          password: 'password123',
          role: 'vendor',
          vendorId: created.id,
          vendorName: created.name,
          locality: created.locality
        });
      }
    }

    if (submitBtn) {
      submitBtn.classList.remove('btn-loading');
      submitBtn.disabled = false;
    }

    ToastManager.success('बधाई हो! Stall created and published!');

    // Show success overlay modal
    const overlay = document.getElementById('successOverlay');
    if (overlay) {
      overlay.classList.add('active');
      setTimeout(() => {
        window.location.href = 'vendor-dashboard.html';
      }, 1800);
    } else {
      window.location.href = 'vendor-dashboard.html';
    }
  } catch (err) {
    if (submitBtn) {
      submitBtn.classList.remove('btn-loading');
      submitBtn.disabled = false;
    }
    ToastManager.error('Could not create profile. Please check fields.');
    console.error(err);
  }
}

// ===================================
// BROWSE PAGE - VENDOR FILTERING & SEARCH
// ===================================
let currentCategory = 'All';
let showOpenOnly = false;
let searchQuery = '';
let maxPriceFilter = null;

function filterVendorCards() {
  if (typeof filterVendors === 'function') {
    let filtered = filterVendors(currentCategory, showOpenOnly, searchQuery);
    
    // Apply optional under-50 price filter
    if (maxPriceFilter) {
      filtered = filtered.filter(v => {
        // If structured menuItems exist, match if stall offers any item at or under the filter ceiling
        if (Array.isArray(v.menuItems) && v.menuItems.length > 0) {
          return v.menuItems.some(item => {
            const pMatch = (item.price || '').match(/\d+/);
            return pMatch && parseInt(pMatch[0], 10) <= maxPriceFilter;
          });
        }
        // Fallback to minimum price extracted from priceRange
        const match = (v.priceRange || '').match(/\d+/);
        return match ? parseInt(match[0], 10) <= maxPriceFilter : true;
      });
    }
    renderVendorCards(filtered);
  }
}

function setCategory(category) {
  currentCategory = category;

  // Update active pill in category list
  document.querySelectorAll('.cat-pill').forEach(pill => {
    pill.classList.remove('active');
  });
  if (event && event.currentTarget) {
    event.currentTarget.classList.add('active');
  }

  filterVendorCards();
}

function toggleOpenOnly() {
  const toggle = document.getElementById('openOnlyToggle');
  showOpenOnly = toggle ? toggle.checked : !showOpenOnly;
  filterVendorCards();
}

function togglePriceFilter(priceLimit) {
  const btn = document.getElementById('filterUnder50Btn');
  if (maxPriceFilter === priceLimit) {
    maxPriceFilter = null;
    btn?.classList.remove('active');
    ToastManager.info('Price filter cleared');
  } else {
    maxPriceFilter = priceLimit;
    btn?.classList.add('active');
    ToastManager.info(`Showing stalls with items under ₹${priceLimit}`);
  }
  filterVendorCards();
}

// Search functionality listener
document.addEventListener('DOMContentLoaded', () => {
  const searchInput = document.getElementById('searchInput');
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      searchQuery = e.target.value.toLowerCase();
      filterVendorCards();
    });
  }
});

// ===================================
// RENDER STITCH VENDOR CARDS
// ===================================
function renderVendorCards(vendorList) {
  const container = document.getElementById('vendorGrid');
  if (!container) return;

  if (!vendorList || vendorList.length === 0) {
    container.innerHTML = `
      <div class="empty-state" style="grid-column: 1/-1; background-color: var(--color-surface-container-lowest); border-radius: var(--radius-xl); border: 1px dashed var(--color-outline);">
        <div class="empty-state-icon">🔍</div>
        <h3 class="empty-state-title" style="font-weight: 800;">No stalls match your search</h3>
        <p class="empty-state-description">Try adjusting your category pills, distance radius, or search query</p>
        <button class="btn btn-primary" onclick="resetFilters()">Reset All Filters</button>
      </div>
    `;
    return;
  }

  container.innerHTML = vendorList.map((vendor, index) => `
    <article class="vendor-card-stitch stagger-item" style="animation-delay: ${index * 0.08}s">
      <div class="vendor-header-top">
        <div class="vendor-img-thumb">
          <img src="${vendor.imageUrl || 'assets/logo-icon.svg'}" alt="${vendor.name}" loading="lazy">
          ${vendor.verified ? `
            <div class="verified-dot-badge" title="Verified Local Vendor">
              <span class="material-symbols-outlined" style="font-size: 13px;">verified</span>
            </div>
          ` : ''}
        </div>
        <div style="flex: 1; min-width: 0;">
          <div style="display: flex; justify-content: space-between; align-items: flex-start; gap: 0.25rem;">
            <h3 style="font-size: 1.0625rem; font-weight: 700; margin: 0; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; color: var(--color-on-surface);">
              ${vendor.name}
            </h3>
            <span class="vendor-rating-chip">
              <span class="material-symbols-outlined" style="font-size: 12px; color: var(--color-tertiary);">star</span>
              <span>${vendor.rating || '4.8'}</span>
            </span>
          </div>
          <div style="display: flex; align-items: center; gap: 0.35rem; color: var(--color-on-surface-variant); font-size: 0.8125rem; margin-top: 0.25rem;">
            <span class="material-symbols-outlined" style="font-size: 15px; color: var(--color-secondary);">storefront</span>
            <span style="font-weight: 600; color: var(--color-secondary);">${vendor.category}</span>
            <span>•</span>
            <span style="white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">${vendor.locality}</span>
          </div>
          <div style="display: flex; align-items: center; gap: 0.5rem; margin-top: 0.4rem; flex-wrap: wrap;">
            <span class="${vendor.isOpen ? 'vendor-status-active' : 'vendor-status-closed'}">
              <span style="display: inline-block; width: 6px; height: 6px; border-radius: 50%; background-color: ${vendor.isOpen ? 'var(--color-primary)' : 'var(--color-outline)'}; ${vendor.isOpen ? 'animation: pulse 2s infinite;' : ''}"></span>
              <span>${vendor.isOpen ? 'Open Right Now' : 'Closed'}</span>
            </span>
            <span style="font-size: 0.6875rem; font-weight: 700; color: var(--color-primary); background: var(--color-primary-fixed); padding: 0.15rem 0.45rem; border-radius: var(--radius-full);">
              ${vendor.priceRange}
            </span>
          </div>
        </div>
      </div>

      <!-- Specialties Pill Tags -->
      <div class="vendor-products-tags">
        ${(vendor.products || []).slice(0, 3).map(p => `
          <span class="prod-tag">${p}</span>
        `).join('')}
        ${(vendor.products || []).length > 3 ? `<span class="prod-tag">+${vendor.products.length - 3} more</span>` : ''}
      </div>

      <!-- Action Footer -->
      <div class="vendor-card-actions">
        <a href="vendor-details.html?id=${vendor.id}" class="btn-walk-cart">
          <span class="material-symbols-outlined" style="font-size: 18px;">directions_walk</span>
          <span>Walk to Cart (${vendor.walkTime || '4 min'})</span>
        </a>
        <a href="tel:${vendor.phone || '+911234567890'}" class="btn-icon-call" aria-label="Call Vendor" title="Call Vendor">
          <span class="material-symbols-outlined" style="font-size: 18px;">call</span>
        </a>
      </div>
    </article>
  `).join('');

  // Re-observe newly rendered elements
  document.querySelectorAll('.stagger-item').forEach(el => {
    animateOnScroll.observe(el);
  });
}

function resetFilters() {
  currentCategory = 'All';
  showOpenOnly = false;
  searchQuery = '';
  maxPriceFilter = null;

  const searchInput = document.getElementById('searchInput');
  if (searchInput) searchInput.value = '';

  const openToggle = document.getElementById('openOnlyToggle');
  if (openToggle) openToggle.checked = false;

  const under50Btn = document.getElementById('filterUnder50Btn');
  if (under50Btn) under50Btn.classList.remove('active');

  document.querySelectorAll('.cat-pill').forEach((pill, index) => {
    pill.classList.toggle('active', index === 0);
  });

  filterVendorCards();
  ToastManager.info('All filters reset');
}

// ===================================
// INITIALIZE BROWSE PAGE
// ===================================
function initBrowsePage() {
  const urlParams = new URLSearchParams(window.location.search);
  const requestedCat = urlParams.get('cat');
  const requestedQuery = urlParams.get('q');

  if (requestedCat) {
    currentCategory = requestedCat;
  }
  if (requestedQuery) {
    searchQuery = requestedQuery.toLowerCase();
    const searchInput = document.getElementById('searchInput');
    if (searchInput) searchInput.value = requestedQuery;
  }

  const categories = typeof getCategories === 'function' ? getCategories() : ['All', 'Snacks', 'Vegetables', 'Tea', 'Flowers', 'Other'];
  const filterContainer = document.getElementById('categoryFilters');

  const catIcons = {
    'All': 'storefront',
    'Snacks': 'skillet',
    'Vegetables': 'eco',
    'Tea': 'coffee',
    'Flowers': 'local_florist',
    'Other': 'handyman'
  };

  if (filterContainer) {
    filterContainer.innerHTML = categories.map((cat) => `
      <button type="button" class="cat-pill ${cat === currentCategory ? 'active' : ''}" onclick="setCategory('${cat}')">
        <div class="cat-icon-box">
          <span class="material-symbols-outlined">${catIcons[cat] || 'category'}</span>
        </div>
        <div>
          <span style="font-size: 0.875rem; font-weight: 700; display: block;">${cat}</span>
          <span class="cat-count">Stalls</span>
        </div>
      </button>
    `).join('');
  }

  // Show skeleton shimmer loading
  const vendorGrid = document.getElementById('vendorGrid');
  if (vendorGrid) {
    vendorGrid.innerHTML = Array(6).fill(0).map(() => `
      <div class="skeleton skeleton-card" style="height: 220px; border-radius: var(--radius-xl);"></div>
    `).join('');

    setTimeout(() => {
      filterVendorCards();
    }, 350);
  }
}

// ===================================
// VENDOR DETAILS PAGE (STITCH SCREEN 60890030)
// ===================================
function loadVendorDetails() {
  const urlParams = new URLSearchParams(window.location.search);
  const vendorId = urlParams.get('id') || '1';
  const vendor = typeof getVendorById === 'function' ? getVendorById(vendorId) : null;
  const container = document.getElementById('vendorDetailsContent');

  if (!container) return;

  if (!vendor) {
    container.innerHTML = `
      <div class="empty-state" style="background-color: var(--color-surface-container-lowest); border-radius: var(--radius-xl); border: 1px solid var(--color-outline-variant);">
        <div class="empty-state-icon">😕</div>
        <h2 class="empty-state-title" style="font-weight: 800;">Stall Not Found</h2>
        <p class="empty-state-description">The vendor you are looking for is not listed or has moved.</p>
        <a href="browse.html" class="btn btn-primary">Browse All Nearby Stalls</a>
      </div>
    `;
    return;
  }

  const items = vendor.menuItems && vendor.menuItems.length > 0 
    ? vendor.menuItems 
    : (vendor.products || []).map(p => ({
        name: p,
        price: vendor.priceRange || '₹30',
        desc: 'Freshly prepared daily at cart'
      }));

  container.innerHTML = `
    <!-- Top Back Navigation -->
    <div style="margin-bottom: 1.25rem; display: flex; justify-content: space-between; align-items: center;" class="animate-fade-in-down">
      <a href="browse.html" style="color: var(--color-primary); font-weight: 700; display: inline-flex; align-items: center; gap: 0.35rem;">
        <span class="material-symbols-outlined">arrow_back</span>
        <span>Back to Browse</span>
      </a>
      <button class="btn btn-outline btn-sm" onclick="shareCurrentStall()" style="display: inline-flex; align-items: center; gap: 0.35rem;">
        <span class="material-symbols-outlined" style="font-size: 16px;">share</span>
        <span>Share Stall</span>
      </button>
    </div>

    <!-- Vendor Details Main Card -->
    <div style="max-width: 820px; margin: 0 auto; display: flex; flex-direction: column; gap: 1.5rem;" class="animate-scale-in">
      
      <!-- Stall Hero Image Banner (Stitch Screen 60890030) -->
      <div style="position: relative; width: 100%; border-radius: var(--radius-xl); overflow: hidden; background-color: var(--color-surface-container-high); box-shadow: var(--shadow-md);">
        <div style="width: 100%; height: 220px; background-size: cover; background-position: center; background-image: url('${vendor.imageUrl || 'assets/logo-icon.svg'}');">
        </div>
        <div style="position: absolute; inset: 0; background: linear-gradient(to top, rgba(27, 28, 25, 0.85) 0%, transparent 60%); display: flex; flex-direction: column; justify-content: flex-end; padding: 1.25rem; color: white;">
          <div style="display: flex; gap: 0.5rem; align-items: center; margin-bottom: 0.35rem;">
            <span style="font-size: 0.6875rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em; background: var(--color-primary); color: white; padding: 0.2rem 0.6rem; border-radius: var(--radius-full);">
              Verified Micro-Vendor
            </span>
            <span style="font-size: 0.6875rem; font-weight: 700; background: var(--color-secondary); color: white; padding: 0.2rem 0.6rem; border-radius: var(--radius-full);">
              Since ${vendor.since || '2011'}
            </span>
          </div>
          <p style="font-size: 0.8125rem; color: var(--color-primary-fixed); margin: 0; display: flex; align-items: center; gap: 0.35rem;">
            <span class="material-symbols-outlined" style="font-size: 15px;">verified</span>
            Awadh Vyapar Mandal Certified
          </p>
        </div>
      </div>

      <!-- Stall Title & Live Open Status Card -->
      <div class="card" style="border: 1px solid var(--color-outline-variant); border-radius: var(--radius-xl); padding: 1.5rem; background-color: var(--color-surface-container-lowest); box-shadow: var(--shadow-sm);">
        <div style="display: flex; justify-content: space-between; align-items: flex-start; gap: 1rem; flex-wrap: wrap;">
          <div>
            <div style="display: flex; gap: 0.5rem; align-items: center; margin-bottom: 0.35rem;">
              <span class="badge badge-primary">${vendor.category}</span>
              <span style="font-size: 0.75rem; font-weight: 700; background: var(--color-tertiary-fixed); color: var(--color-on-tertiary-fixed); padding: 0.15rem 0.5rem; border-radius: var(--radius-sm);">
                ★ ${vendor.rating || '4.9'} (${vendor.reviewsCount || 142} neighbours)
              </span>
            </div>
            <h1 style="font-size: 1.75rem; font-weight: 800; color: var(--color-on-surface); margin: 0 0 0.25rem 0;">
              ${vendor.name}
            </h1>
            <p style="font-size: 0.9375rem; color: var(--color-on-surface-variant); margin: 0; display: flex; align-items: center; gap: 0.35rem;">
              <span class="material-symbols-outlined" style="color: var(--color-secondary); font-size: 18px;">place</span>
              ${vendor.locality}
            </p>
          </div>

          <!-- Pulsing Open Pill -->
          <div style="text-align: right;">
            <span class="${vendor.isOpen ? 'vendor-status-active' : 'vendor-status-closed'}" style="font-size: 0.875rem; padding: 0.4rem 0.85rem;">
              <span style="width: 8px; height: 8px; border-radius: 50%; background-color: ${vendor.isOpen ? 'var(--color-primary)' : 'var(--color-outline)'}; display: inline-block; ${vendor.isOpen ? 'animation: pulse 2s infinite;' : ''}"></span>
              <span>${vendor.isOpen ? 'Open Right Now' : 'Currently Closed'}</span>
            </span>
            <span style="display: block; font-size: 0.6875rem; color: var(--color-on-surface-variant); margin-top: 0.25rem;">
              Updated 20m ago
            </span>
          </div>
        </div>

        <!-- Landmark Micro Strip -->
        <div style="display: flex; align-items: center; gap: 0.5rem; margin-top: 1rem; padding-top: 0.75rem; border-top: 1px solid var(--color-outline-variant); color: var(--color-on-surface-variant); font-size: 0.875rem;">
          <span class="material-symbols-outlined" style="color: var(--color-tertiary); font-size: 18px;">nature_people</span>
          <span><strong>Landmark:</strong> ${vendor.landmark || 'Near main market square'}</span>
        </div>
      </div>

      <!-- Key Quick Info Bar (4 tactile indicators from Stitch Screen 60890030) -->
      <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 0.75rem;">
        <div style="background-color: var(--color-surface-container-low); padding: 0.875rem 1rem; border-radius: var(--radius-lg); border: 1px solid var(--color-outline-variant); display: flex; align-items: center; gap: 0.75rem;">
          <div style="width: 2.5rem; height: 2.5rem; border-radius: var(--radius-md); background: var(--color-surface-container-highest); color: var(--color-primary); display: flex; align-items: center; justify-content: center; flex-shrink: 0;">
            <span class="material-symbols-outlined">payments</span>
          </div>
          <div>
            <span style="font-size: 0.6875rem; text-transform: uppercase; font-weight: 700; color: var(--color-on-surface-variant); display: block;">Price Range</span>
            <span style="font-size: 0.9375rem; font-weight: 700; color: var(--color-on-surface); display: block;">${vendor.priceRange}</span>
            <span style="font-size: 0.6875rem; color: var(--color-outline);">Budget-friendly</span>
          </div>
        </div>

        <div style="background-color: var(--color-surface-container-low); padding: 0.875rem 1rem; border-radius: var(--radius-lg); border: 1px solid var(--color-outline-variant); display: flex; align-items: center; gap: 0.75rem;">
          <div style="width: 2.5rem; height: 2.5rem; border-radius: var(--radius-md); background: var(--color-surface-container-highest); color: var(--color-secondary); display: flex; align-items: center; justify-content: center; flex-shrink: 0;">
            <span class="material-symbols-outlined">directions_walk</span>
          </div>
          <div>
            <span style="font-size: 0.6875rem; text-transform: uppercase; font-weight: 700; color: var(--color-on-surface-variant); display: block;">Proximity</span>
            <span style="font-size: 0.9375rem; font-weight: 700; color: var(--color-on-surface); display: block;">${vendor.distance || '350m'} Away</span>
            <span style="font-size: 0.6875rem; color: var(--color-outline);">~${vendor.walkTime || '4 min'} walk</span>
          </div>
        </div>

        <div style="background-color: var(--color-surface-container-low); padding: 0.875rem 1rem; border-radius: var(--radius-lg); border: 1px solid var(--color-outline-variant); display: flex; align-items: center; gap: 0.75rem;">
          <div style="width: 2.5rem; height: 2.5rem; border-radius: var(--radius-md); background: var(--color-surface-container-highest); color: var(--color-tertiary); display: flex; align-items: center; justify-content: center; flex-shrink: 0;">
            <span class="material-symbols-outlined">schedule</span>
          </div>
          <div>
            <span style="font-size: 0.6875rem; text-transform: uppercase; font-weight: 700; color: var(--color-on-surface-variant); display: block;">Daily Timings</span>
            <span style="font-size: 0.875rem; font-weight: 700; color: var(--color-on-surface); display: block;">${vendor.timings || '4:30 – 10:30 PM'}</span>
            <span style="font-size: 0.6875rem; color: var(--color-outline);">Mon – Sun</span>
          </div>
        </div>

        <div style="background-color: var(--color-surface-container-low); padding: 0.875rem 1rem; border-radius: var(--radius-lg); border: 1px solid var(--color-outline-variant); display: flex; align-items: center; gap: 0.75rem;">
          <div style="width: 2.5rem; height: 2.5rem; border-radius: var(--radius-md); background: var(--color-surface-container-highest); color: var(--color-primary); display: flex; align-items: center; justify-content: center; flex-shrink: 0;">
            <span class="material-symbols-outlined">storefront</span>
          </div>
          <div>
            <span style="font-size: 0.6875rem; text-transform: uppercase; font-weight: 700; color: var(--color-on-surface-variant); display: block;">Setup Type</span>
            <span style="font-size: 0.875rem; font-weight: 700; color: var(--color-on-surface); display: block;">${vendor.setupType || 'Handcart'}</span>
            <span style="font-size: 0.6875rem; color: var(--color-outline);">Mobile Thela</span>
          </div>
        </div>
      </div>

      <!-- Today's Available Items & Pricing (Tactile Daily Chalkboard) -->
      <div class="card" style="border: 1px solid var(--color-outline-variant); border-radius: var(--radius-xl); padding: 1.5rem; background-color: var(--color-surface-container-lowest); box-shadow: var(--shadow-sm);">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem;">
          <div style="display: flex; align-items: center; gap: 0.5rem;">
            <span style="width: 10px; height: 10px; border-radius: 50%; background-color: var(--color-secondary);"></span>
            <h2 style="font-size: 1.25rem; font-weight: 800; margin: 0; color: var(--color-on-surface);">
              Today's Fresh Prep (Menu & Pricing)
            </h2>
          </div>
          <span style="font-size: 0.6875rem; font-weight: 700; background: var(--color-tertiary-fixed); color: var(--color-on-tertiary-fixed); padding: 0.2rem 0.6rem; border-radius: var(--radius-sm);">
            Fresh Daily Stock
          </span>
        </div>

        <div style="display: flex; flex-direction: column; gap: 0.6rem; margin-bottom: 1.25rem;">
          ${items.map(item => `
            <div style="display: flex; justify-content: space-between; align-items: center; padding: 0.75rem 1rem; background-color: var(--color-surface-container-low); border-radius: var(--radius-md); border: 1px solid var(--color-outline-variant);">
              <div>
                <h3 style="font-size: 0.9375rem; font-weight: 700; margin: 0 0 0.15rem 0; color: var(--color-on-surface);">${item.name}</h3>
                <p style="font-size: 0.8125rem; color: var(--color-on-surface-variant); margin: 0;">${item.desc || 'Freshly made with authentic ingredients'}</p>
              </div>
              <span style="font-family: var(--font-heading); font-size: 1.125rem; font-weight: 800; color: var(--color-primary); flex-shrink: 0; margin-left: 0.75rem;">
                ${item.price}
              </span>
            </div>
          `).join('')}
        </div>

        <!-- Direct Stall Settlement Trust Notice -->
        <div style="background-color: var(--color-secondary-fixed); border-radius: var(--radius-md); padding: 0.85rem 1rem; display: flex; align-items: flex-start; gap: 0.75rem; border: 1px solid rgba(192, 74, 5, 0.2);">
          <span class="material-symbols-outlined" style="color: var(--color-secondary); font-size: 22px; flex-shrink: 0; margin-top: 0.1rem;">qr_code_scanner</span>
          <p style="font-size: 0.8125rem; color: var(--color-on-secondary-fixed); line-height: 1.5; margin: 0;">
            <strong>Direct Stall Settlement:</strong> Pay directly to ${vendor.name} via UPI QR or cash at the cart. No advance payment or app platform cut.
          </p>
        </div>
      </div>

      <!-- Cart Location & Directions Card with Dummy Lucknow Map -->
      <div class="card" style="border: 1px solid var(--color-outline-variant); border-radius: var(--radius-xl); padding: 1.5rem; background-color: var(--color-surface-container-lowest); box-shadow: var(--shadow-sm);">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem;">
          <div style="display: flex; align-items: center; gap: 0.5rem;">
            <span class="material-symbols-outlined" style="color: var(--color-secondary); font-size: 22px;">near_me</span>
            <h2 style="font-size: 1.25rem; font-weight: 800; margin: 0; color: var(--color-on-surface);">
              Cart Location & Spotting (Lucknow, UP)
            </h2>
          </div>
          <span style="font-size: 0.6875rem; font-weight: 700; background: var(--color-primary-fixed); color: var(--color-on-primary-fixed); padding: 0.2rem 0.6rem; border-radius: var(--radius-sm);">
            26.8467° N, 80.9462° E
          </span>
        </div>

        <!-- Dummy Lucknow Vector Map Visualizer -->
        <div style="position: relative; border-radius: var(--radius-lg); overflow: hidden; height: 180px; background: #1B2B20; margin-bottom: 1rem; box-shadow: var(--shadow-xs);">
          <svg viewBox="0 0 400 180" style="width: 100%; height: 100%; display: block;">
            <!-- Grid lines -->
            <path d="M 0 45 L 400 45 M 0 90 L 400 90 M 0 135 L 400 135 M 80 0 L 80 180 M 160 0 L 160 180 M 240 0 L 240 180 M 320 0 L 320 180" stroke="#24382A" stroke-width="1.5" />
            <!-- Gomti River Meander -->
            <path d="M -20 130 C 80 140, 140 70, 200 65 C 260 60, 320 90, 420 50" stroke="#457B67" stroke-width="16" fill="none" stroke-linecap="round" />
            <text x="210" y="55" fill="#80BBA3" font-size="9" font-family="'Plus Jakarta Sans', sans-serif" font-weight="700" letter-spacing="1">GOMTI RIVER</text>
            <!-- Arterial Lucknow Roads -->
            <path d="M 50 0 L 170 180 M 250 0 L 120 180 M 0 85 L 400 95" stroke="#2E4535" stroke-width="5" fill="none" />
            <!-- Walking path route from user to vendor -->
            <path d="M 80 140 Q 140 130, 180 105 T 230 85" stroke="#FFD54F" stroke-width="3" stroke-dasharray="4 4" fill="none" />
            <!-- User starting position -->
            <circle cx="80" cy="140" r="6" fill="#4285F4" stroke="white" stroke-width="2" />
            <text x="70" y="160" fill="#E0E0E0" font-size="9" font-family="'Plus Jakarta Sans', sans-serif" font-weight="700">You (~${vendor.walkTime || '4 min'} walk)</text>
            <!-- Vendor Stall Location Beacon -->
            <circle cx="230" cy="85" r="14" fill="rgba(192, 74, 5, 0.3)" />
            <circle cx="230" cy="85" r="7" fill="#C04A05" stroke="white" stroke-width="2" />
            <!-- Stall Name Tooltip -->
            <rect x="180" y="50" width="100" height="22" rx="4" fill="#C04A05" />
            <text x="230" y="65" fill="white" font-size="9.5" font-family="'Plus Jakarta Sans', sans-serif" font-weight="800" text-anchor="middle">📍 ${vendor.name}</text>
          </svg>
          <div style="position: absolute; bottom: 8px; right: 10px; background: rgba(0,0,0,0.65); padding: 3px 8px; border-radius: 4px; font-size: 10px; color: #E0E0E0;">
            🗺️ Dummy Map of ${vendor.locality}
          </div>
        </div>

        <!-- Walking Landmark Guidance -->
        <div style="background-color: var(--color-surface-container-low); border-radius: var(--radius-md); padding: 0.85rem 1rem; display: flex; align-items: flex-start; gap: 0.75rem; margin-bottom: 1.25rem;">
          <span class="material-symbols-outlined" style="color: var(--color-primary); font-size: 22px; flex-shrink: 0; margin-top: 0.1rem;">signpost</span>
          <div>
            <p style="font-size: 0.875rem; font-weight: 700; color: var(--color-on-surface); margin: 0 0 0.2rem 0;">How to spot the cart:</p>
            <p style="font-size: 0.8125rem; color: var(--color-on-surface-variant); margin: 0; line-height: 1.5;">
              ${vendor.landmark || 'Located near the main market entrance in ' + vendor.locality}
            </p>
          </div>
        </div>

        <!-- Action Triggers -->
        <div style="display: flex; gap: 0.75rem; flex-wrap: wrap;">
          <a href="https://maps.google.com/?q=${encodeURIComponent(vendor.locality)}" target="_blank" class="btn btn-primary" style="flex: 1; font-weight: 700; display: inline-flex; align-items: center; justify-content: center; gap: 0.4rem;">
            <span class="material-symbols-outlined" style="font-size: 18px;">assistant_navigation</span>
            <span>Get Walking Directions (Maps)</span>
          </a>
          <a href="tel:${vendor.phone || '+911234567890'}" class="btn btn-accent" style="font-weight: 700; display: inline-flex; align-items: center; justify-content: center; gap: 0.4rem;">
            <span class="material-symbols-outlined" style="font-size: 18px;">call</span>
            <span>Call Vendor</span>
          </a>
        </div>
      </div>

      <!-- Vendor Heritage & Story Card -->
      <div class="card" style="border: 1px solid var(--color-outline-variant); border-radius: var(--radius-xl); padding: 1.5rem; background-color: var(--color-surface-container-low); box-shadow: var(--shadow-xs);">
        <div style="display: flex; align-items: center; gap: 1rem; margin-bottom: 0.75rem;">
          <div style="width: 3.5rem; height: 3.5rem; border-radius: 50%; background-size: cover; background-position: center; flex-shrink: 0; box-shadow: var(--shadow-xs); background-image: url('https://lh3.googleusercontent.com/aida-public/AB6AXuARPVYcOLzvEZJOAXpG6WCYIbHoGLBfkcp5Ng8fv0lDQjShDq-gMKgEhmjbvnMartoxsGZx3G_8iEepa-QKDTkEq6dO0yuSak2TV548Cl-OKfBZfTh5-GqBTyQJlncquVHrT8XHTwdgYreU1rz5INeZikAEMlpKsByb3fXJ8mhuFDBmW-b3IPDueCTrVC3WlyxlLtMwtSD-jSyuWGUbJxQbFD29kx5YXbGvyL9ivt4');">
          </div>
          <div>
            <h3 style="font-size: 1.125rem; font-weight: 800; color: var(--color-on-surface); margin: 0;">
              Meet the Vendor Behind the Cart
            </h3>
            <p style="font-size: 0.8125rem; color: var(--color-secondary); font-weight: 700; margin: 0.15rem 0 0 0;">
              Local Artisan · Registered Street Hawker
            </p>
          </div>
        </div>
        <p style="font-size: 0.875rem; color: var(--color-on-surface-variant); line-height: 1.6; margin: 0 0 0.75rem 0;">
          ${vendor.description || 'Serving fresh produce and daily snacks to neighbourhood families with dedication, warmth, and honest prices.'}
        </p>
        <div style="display: flex; align-items: center; gap: 0.35rem; font-size: 0.8125rem; color: var(--color-primary); font-weight: 600;">
          <span class="material-symbols-outlined" style="font-size: 16px;">verified_user</span>
          <span>Registered under Hyperlocal Street Vendors Network</span>
        </div>
      </div>

      <!-- Community Radar Crowdsourced Feedback -->
      <div class="card" style="border: 1px solid var(--color-outline-variant); border-radius: var(--radius-xl); padding: 1.5rem; background-color: var(--color-surface-container-lowest); box-shadow: var(--shadow-xs);">
        <div style="display: flex; align-items: center; gap: 0.5rem; margin-bottom: 0.35rem;">
          <span class="material-symbols-outlined" style="color: var(--color-secondary); font-size: 22px;">groups</span>
          <h2 style="font-size: 1.125rem; font-weight: 800; margin: 0; color: var(--color-on-surface);">
            Neighbourhood Community Radar
          </h2>
        </div>
        <p style="font-size: 0.8125rem; color: var(--color-on-surface-variant); margin: 0 0 1rem 0;">
          Street food carts can shift or sell out early. Help fellow Indiranagar neighbours stay updated!
        </p>

        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 0.75rem;" id="communityRadarButtons">
          <button type="button" class="btn btn-outline" style="border-color: var(--color-primary); color: var(--color-primary); font-weight: 700; display: flex; align-items: center; justify-content: center; gap: 0.35rem;" onclick="submitRadarFeedback('here')">
            <span class="material-symbols-outlined" style="font-size: 18px;">thumb_up</span>
            <span>Still Here (14)</span>
          </button>
          <button type="button" class="btn btn-outline" style="font-weight: 700; display: flex; align-items: center; justify-content: center; gap: 0.35rem;" onclick="submitRadarFeedback('moved')">
            <span class="material-symbols-outlined" style="font-size: 18px;">wrong_location</span>
            <span>Moved / Sold Out</span>
          </button>
        </div>
        <div id="radarToast" style="display: none; margin-top: 0.75rem; padding: 0.5rem 0.75rem; background-color: var(--color-primary-fixed); color: var(--color-on-primary-fixed); border-radius: var(--radius-md); font-size: 0.8125rem; font-weight: 700; text-align: center;">
          Dhanyawaad! Your neighbourhood verification has been recorded.
        </div>
      </div>
    </div>
  `;
}

function shareCurrentStall() {
  if (navigator.share) {
    navigator.share({
      title: document.title,
      text: 'Discover this street vendor on StreetKart!',
      url: window.location.href
    }).catch(() => {});
  } else {
    navigator.clipboard?.writeText(window.location.href);
    ToastManager.success('Stall link copied to clipboard!');
  }
}

function submitRadarFeedback(status) {
  const container = document.getElementById('communityRadarButtons');
  const toast = document.getElementById('radarToast');
  if (container) container.style.opacity = '0.6';
  if (toast) {
    toast.style.display = 'block';
    toast.textContent = status === 'here' 
      ? 'Dhanyawaad! Indiranagar neighbours now see cart as verified active.' 
      : 'Alert sent to nearby foodies. Thank you for keeping info updated!';
  }
  ToastManager.success('Neighbourhood verification recorded!');
}

// ===================================
// CONTACT FORM CONTROLLER
// ===================================
document.addEventListener('DOMContentLoaded', () => {
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
      e.preventDefault();

      const submitBtn = contactForm.querySelector('button[type="submit"]');
      if (submitBtn) {
        submitBtn.classList.add('btn-loading');
        submitBtn.disabled = true;
      }

      const name = contactForm.querySelector('input[name="name"]')?.value || '';
      const email = contactForm.querySelector('input[name="email"]')?.value || '';
      const subject = contactForm.querySelector('input[name="subject"]')?.value || '';
      const message = contactForm.querySelector('textarea[name="message"]')?.value || '';

      if (window.StreetKartAPI) {
        await window.StreetKartAPI.submitContactMessage({ name, email, subject, message });
      }

      setTimeout(() => {
        if (submitBtn) {
          submitBtn.classList.remove('btn-loading');
          submitBtn.disabled = false;
        }
        ToastManager.success('Thank you! Your message has been sent to the StreetKart team.');
        contactForm.reset();
      }, 700);
    });
  }
});

// ===================================
// LUCKNOW LOCATION POPUP CONTROLLER
// ===================================
const LucknowLocationManager = {
  activeLocality: localStorage.getItem('streetkart_user_locality') || 'Lucknow, UP',

  init() {
    this.updateTopBarLabels();
    this.injectModal();
    this.bindButtons();
  },

  updateTopBarLabels() {
    const label = this.activeLocality;
    document.querySelectorAll('.location-context-btn').forEach(btn => {
      // Find span containing location text or create it
      const textSpan = btn.querySelector('span:not(.material-symbols-outlined)') || btn.querySelector('span');
      if (textSpan) {
        textSpan.textContent = label;
      }
    });
  },

  injectModal() {
    if (document.getElementById('lucknowLocationModalBackdrop')) return;

    const backdrop = document.createElement('div');
    backdrop.id = 'lucknowLocationModalBackdrop';
    backdrop.className = 'location-modal-backdrop';
    backdrop.innerHTML = `
      <div class="location-modal animate-scale-in" role="dialog" aria-modal="true" aria-labelledby="locModalTitle">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.75rem;">
          <div style="display: flex; align-items: center; gap: 0.5rem;">
            <div style="width: 2.25rem; height: 2.25rem; border-radius: 50%; background: var(--color-primary-fixed); color: var(--color-primary); display: flex; align-items: center; justify-content: center;">
              <span class="material-symbols-outlined" style="font-size: 20px;">location_city</span>
            </div>
            <div>
              <h2 id="locModalTitle" style="font-size: 1.25rem; font-weight: 800; margin: 0; color: var(--color-on-surface);">
                Select Zone in Lucknow, UP
              </h2>
              <span style="font-size: 0.75rem; color: var(--color-on-surface-variant);">Hyperlocal street vendor discovery</span>
            </div>
          </div>
          <button type="button" class="btn-icon" onclick="LucknowLocationManager.close()" style="background: none; border: none; font-size: 1.5rem; cursor: pointer; color: var(--color-on-surface-variant);">&times;</button>
        </div>

        <p style="font-size: 0.875rem; color: var(--color-on-surface-variant); margin-bottom: 1.25rem; line-height: 1.5;">
          Choose your neighbourhood or explore all 25 live pushcarts across Lucknow:
        </p>

        <div class="location-zone-grid">
          <div class="location-zone-card ${this.activeLocality === 'Lucknow, UP' ? 'active' : ''}" onclick="LucknowLocationManager.select('Lucknow, UP')">
            <span class="material-symbols-outlined" style="color: var(--color-primary); font-size: 22px;">travel_explore</span>
            <div>
              <strong style="display: block; font-size: 0.9375rem; color: var(--color-on-surface);">All Lucknow, UP</strong>
              <small style="color: var(--color-on-surface-variant); font-size: 0.75rem;">All 25 Verified Stalls</small>
            </div>
          </div>

          <div class="location-zone-card ${this.activeLocality.includes('Hazratganj') ? 'active' : ''}" onclick="LucknowLocationManager.select('Hazratganj, Lucknow, UP')">
            <span class="material-symbols-outlined" style="color: var(--color-secondary); font-size: 22px;">storefront</span>
            <div>
              <strong style="display: block; font-size: 0.9375rem; color: var(--color-on-surface);">Hazratganj</strong>
              <small style="color: var(--color-on-surface-variant); font-size: 0.75rem;">Chaat, Kulfi, Kulhad Kafe</small>
            </div>
          </div>

          <div class="location-zone-card ${this.activeLocality.includes('Chowk') ? 'active' : ''}" onclick="LucknowLocationManager.select('Chowk, Lucknow, UP')">
            <span class="material-symbols-outlined" style="color: var(--color-secondary); font-size: 22px;">temple_hindu</span>
            <div>
              <strong style="display: block; font-size: 0.9375rem; color: var(--color-on-surface);">Chowk (Old City)</strong>
              <small style="color: var(--color-on-surface-variant); font-size: 0.75rem;">Makhan Malai, Sabzi, Chikan</small>
            </div>
          </div>

          <div class="location-zone-card ${this.activeLocality.includes('Aminabad') ? 'active' : ''}" onclick="LucknowLocationManager.select('Aminabad, Lucknow, UP')">
            <span class="material-symbols-outlined" style="color: var(--color-primary); font-size: 22px;">shopping_bag</span>
            <div>
              <strong style="display: block; font-size: 0.9375rem; color: var(--color-on-surface);">Aminabad</strong>
              <small style="color: var(--color-on-surface-variant); font-size: 0.75rem;">Dahi Gujiya, Zafrani Chai</small>
            </div>
          </div>

          <div class="location-zone-card ${this.activeLocality.includes('Gomti Nagar') ? 'active' : ''}" onclick="LucknowLocationManager.select('Gomti Nagar, Lucknow, UP')">
            <span class="material-symbols-outlined" style="color: var(--color-secondary); font-size: 22px;">apartment</span>
            <div>
              <strong style="display: block; font-size: 0.9375rem; color: var(--color-on-surface);">Gomti Nagar</strong>
              <small style="color: var(--color-on-surface-variant); font-size: 0.75rem;">5-Pani Batashe, Tandoori Tea</small>
            </div>
          </div>

          <div class="location-zone-card ${this.activeLocality.includes('Alambagh') ? 'active' : ''}" onclick="LucknowLocationManager.select('Alambagh, Lucknow, UP')">
            <span class="material-symbols-outlined" style="color: var(--color-primary); font-size: 22px;">tram</span>
            <div>
              <strong style="display: block; font-size: 0.9375rem; color: var(--color-on-surface);">Alambagh</strong>
              <small style="color: var(--color-on-surface-variant); font-size: 0.75rem;">Tikki Kiosk, Metro Station Chai</small>
            </div>
          </div>

          <div class="location-zone-card ${this.activeLocality.includes('Indira Nagar') ? 'active' : ''}" onclick="LucknowLocationManager.select('Indira Nagar, Lucknow, UP')">
            <span class="material-symbols-outlined" style="color: var(--color-tertiary); font-size: 22px;">nature_people</span>
            <div>
              <strong style="display: block; font-size: 0.9375rem; color: var(--color-on-surface);">Indira Nagar</strong>
              <small style="color: var(--color-on-surface-variant); font-size: 0.75rem;">Bhootnath Mandir, Matar Kulcha</small>
            </div>
          </div>
        </div>

        <div style="margin-top: 1.5rem; text-align: center;">
          <button type="button" class="btn btn-primary" style="width: 100%; border-radius: var(--radius-full);" onclick="LucknowLocationManager.close()">
            Confirm Lucknow Location
          </button>
        </div>
      </div>
    `;

    backdrop.addEventListener('click', (e) => {
      if (e.target === backdrop) LucknowLocationManager.close();
    });

    document.body.appendChild(backdrop);
  },

  bindButtons() {
    document.querySelectorAll('.location-context-btn').forEach(btn => {
      btn.onclick = (e) => {
        e.preventDefault();
        LucknowLocationManager.open();
      };
      btn.title = "Click to change Lucknow discovery zone";
    });
  },

  open() {
    const backdrop = document.getElementById('lucknowLocationModalBackdrop');
    if (backdrop) backdrop.classList.add('active');
  },

  close() {
    const backdrop = document.getElementById('lucknowLocationModalBackdrop');
    if (backdrop) backdrop.classList.remove('active');
  },

  select(localityName) {
    this.activeLocality = localityName;
    localStorage.setItem('streetkart_user_locality', localityName);
    this.updateTopBarLabels();
    this.close();

    if (window.ToastManager) {
      ToastManager.success(`📍 Discovery zone set to: ${localityName}`);
    }

    // If on browse.html, filter immediately
    if (window.location.pathname.includes('browse.html')) {
      const searchInput = document.getElementById('searchInput');
      const query = localityName === 'Lucknow, UP' ? '' : localityName.split(',')[0].trim();
      if (searchInput) searchInput.value = query;
      searchQuery = query.toLowerCase();
      filterVendorCards();
    } else {
      // If user selected a specific zone from home, redirect to browse with query
      if (localityName !== 'Lucknow, UP') {
        const zone = localityName.split(',')[0].trim();
        setTimeout(() => {
          window.location.href = `browse.html?q=${encodeURIComponent(zone)}`;
        }, 350);
      }
    }
  }
};

document.addEventListener('DOMContentLoaded', () => {
  LucknowLocationManager.init();
});

// ==========================================================================
// SHARED AUTHENTICATION UI & NAVBAR STATE CONTROLLER (Phase 2)
// ==========================================================================
const StreetKartAuthUI = {
  currentTab: 'login', // 'login' | 'register'

  init() {
    this.injectModal();
    this.updateNavbar();
    this.bindEvents();
    this.checkFlashMessage();
  },

  setFlashMessage(message, type = 'success') {
    try {
      sessionStorage.setItem('streetkart_flash_msg', JSON.stringify({ message, type }));
    } catch (e) {}
  },

  checkFlashMessage() {
    try {
      const raw = sessionStorage.getItem('streetkart_flash_msg');
      if (raw) {
        sessionStorage.removeItem('streetkart_flash_msg');
        const data = JSON.parse(raw);
        if (data && data.message) {
          setTimeout(() => {
            const tm = window.ToastManager || (typeof ToastManager !== 'undefined' ? ToastManager : null);
            if (tm) {
              tm[data.type || 'success'](data.message);
            }
          }, 350);
        }
      }
    } catch (e) {}
  },

  getPersonalizedWelcome(user, action = 'login') {
    if (!user) return 'Welcome to StreetKart!';
    const name = user.name || 'there';
    const isVendor = user.role === 'vendor';

    if (action === 'register') {
      return isVendor
        ? `Hello ${name}! Welcome to StreetKart. Your Vendor stall is ready.`
        : `Hello ${name}! Welcome to StreetKart! Your Customer account is ready.`;
    }
    if (action === 'demo') {
      return isVendor
        ? `Hello ${name}! Signed in as Demo Vendor.`
        : `Hello ${name}! Signed in as Demo Customer.`;
    }
    // Standard login
    return isVendor
      ? `Hello ${name}! Welcome to your Stall Dashboard.`
      : `Hello ${name}! Welcome back to StreetKart.`;
  },

  injectModal() {
    if (document.getElementById('streetkartAuthModalBackdrop')) return;

    const backdrop = document.createElement('div');
    backdrop.id = 'streetkartAuthModalBackdrop';
    backdrop.className = 'location-modal-backdrop';
    backdrop.innerHTML = `
      <div class="location-modal animate-scale-in" role="dialog" aria-modal="true" aria-labelledby="authModalTitle" style="max-width: 440px;">
        <!-- Header -->
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.25rem;">
          <div style="display: flex; align-items: center; gap: 0.6rem;">
            <div style="width: 2.25rem; height: 2.25rem; border-radius: 50%; background: var(--color-primary-fixed); color: var(--color-primary); display: flex; align-items: center; justify-content: center; font-size: 18px;">
              🛍️
            </div>
            <div>
              <h2 id="authModalTitle" style="font-size: 1.25rem; font-weight: 800; margin: 0; color: var(--color-on-surface);">
                StreetKart Demo Access
              </h2>
              <span style="font-size: 0.75rem; color: var(--color-on-surface-variant);">Prototype Browser Authentication</span>
            </div>
          </div>
          <button type="button" class="btn-icon" onclick="StreetKartAuthUI.close()" style="background: none; border: none; font-size: 1.5rem; cursor: pointer; color: var(--color-on-surface-variant); line-height: 1;" aria-label="Close modal">&times;</button>
        </div>

        <!-- One-Click Demo Quick Logins -->
        <div class="demo-account-box">
          <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 0.35rem;">
            <span style="font-size: 0.75rem; font-weight: 800; text-transform: uppercase; letter-spacing: 0.05em; color: var(--color-primary);">⚡ One-Click Demo Access</span>
            <span style="font-size: 0.6875rem; color: var(--color-on-surface-variant);">No password needed</span>
          </div>
          
          <button type="button" class="demo-chip-btn" onclick="StreetKartAuthUI.quickDemoLogin('vendor')">
            <div style="display: flex; align-items: center; gap: 0.6rem;">
              <span style="font-size: 18px;">👨‍🍳</span>
              <div>
                <strong style="font-size: 0.8125rem; color: var(--color-on-surface); display: block;">Awadh Chaat Master</strong>
                <small style="font-size: 0.6875rem; color: var(--color-on-surface-variant);">Vendor (Awadh Chaat Corner, ID #1)</small>
              </div>
            </div>
            <span class="material-symbols-outlined" style="font-size: 16px; color: var(--color-primary);">login</span>
          </button>

          <button type="button" class="demo-chip-btn" onclick="StreetKartAuthUI.quickDemoLogin('customer')">
            <div style="display: flex; align-items: center; gap: 0.6rem;">
              <span style="font-size: 18px;">🛍️</span>
              <div>
                <strong style="font-size: 0.8125rem; color: var(--color-on-surface); display: block;">Amitabh Verma</strong>
                <small style="font-size: 0.6875rem; color: var(--color-on-surface-variant);">Customer (Hazratganj, Lucknow)</small>
              </div>
            </div>
            <span class="material-symbols-outlined" style="font-size: 16px; color: var(--color-primary);">login</span>
          </button>
        </div>

        <!-- Tabs: Email Sign In vs Register -->
        <div class="auth-tabs">
          <button type="button" class="auth-tab-btn active" id="authTabLogin" onclick="StreetKartAuthUI.switchTab('login')">Sign In</button>
          <button type="button" class="auth-tab-btn" id="authTabRegister" onclick="StreetKartAuthUI.switchTab('register')">Register New</button>
        </div>

        <!-- Alert Banner -->
        <div id="authAlertBanner" style="display: none; padding: 0.65rem 0.85rem; border-radius: var(--radius-md); font-size: 0.8125rem; margin-bottom: 1rem;"></div>

        <!-- Login Form -->
        <form id="authLoginForm" onsubmit="StreetKartAuthUI.handleLogin(event)">
          <div style="margin-bottom: 0.85rem;">
            <label style="display: block; font-size: 0.75rem; font-weight: 700; color: var(--color-on-surface-variant); margin-bottom: 0.25rem;">Email Address</label>
            <input type="email" id="authLoginEmail" required placeholder="vendor@streetkart.in or customer@streetkart.in" style="width: 100%; padding: 0.65rem 0.85rem; border: 1.5px solid var(--color-outline-variant); border-radius: var(--radius-md); font-size: 0.875rem; background: var(--color-surface); color: var(--color-on-surface);">
          </div>
          <div style="margin-bottom: 1.25rem;">
            <label style="display: block; font-size: 0.75rem; font-weight: 700; color: var(--color-on-surface-variant); margin-bottom: 0.25rem;">Password</label>
            <input type="password" id="authLoginPassword" required placeholder="lucknow123" style="width: 100%; padding: 0.65rem 0.85rem; border: 1.5px solid var(--color-outline-variant); border-radius: var(--radius-md); font-size: 0.875rem; background: var(--color-surface); color: var(--color-on-surface);">
          </div>
          <button type="submit" class="btn btn-primary" style="width: 100%; justify-content: center; padding: 0.75rem;">
            Sign In to StreetKart
          </button>
        </form>

        <!-- Register Form -->
        <form id="authRegisterForm" style="display: none;" onsubmit="StreetKartAuthUI.handleRegister(event)">
          <div style="margin-bottom: 0.75rem;">
            <label style="display: block; font-size: 0.75rem; font-weight: 700; color: var(--color-on-surface-variant); margin-bottom: 0.25rem;">Full Name</label>
            <input type="text" id="authRegName" required placeholder="e.g. Priya Sharma" style="width: 100%; padding: 0.65rem 0.85rem; border: 1.5px solid var(--color-outline-variant); border-radius: var(--radius-md); font-size: 0.875rem; background: var(--color-surface); color: var(--color-on-surface);">
          </div>
          <div style="margin-bottom: 0.75rem;">
            <label style="display: block; font-size: 0.75rem; font-weight: 700; color: var(--color-on-surface-variant); margin-bottom: 0.25rem;">Email Address</label>
            <input type="email" id="authRegEmail" required placeholder="priya@example.com" style="width: 100%; padding: 0.65rem 0.85rem; border: 1.5px solid var(--color-outline-variant); border-radius: var(--radius-md); font-size: 0.875rem; background: var(--color-surface); color: var(--color-on-surface);">
          </div>
          <div style="margin-bottom: 0.75rem;">
            <label style="display: block; font-size: 0.75rem; font-weight: 700; color: var(--color-on-surface-variant); margin-bottom: 0.25rem;">Password</label>
            <input type="password" id="authRegPassword" required minlength="6" placeholder="At least 6 characters" style="width: 100%; padding: 0.65rem 0.85rem; border: 1.5px solid var(--color-outline-variant); border-radius: var(--radius-md); font-size: 0.875rem; background: var(--color-surface); color: var(--color-on-surface);">
          </div>
          <div style="margin-bottom: 1.25rem;">
            <label style="display: block; font-size: 0.75rem; font-weight: 700; color: var(--color-on-surface-variant); margin-bottom: 0.25rem;">I am joining StreetKart as:</label>
            <div class="role-radio-group">
              <label class="role-radio-label active" id="roleLabelCustomer">
                <input type="radio" name="authRoleRadio" value="customer" checked onchange="StreetKartAuthUI.handleRoleRadioChange('customer')">
                <div style="display: flex; align-items: center; gap: 0.35rem;">
                  <span style="font-size: 16px;">🛍️</span>
                  <strong style="font-size: 0.8125rem; color: var(--color-on-surface);">Customer</strong>
                </div>
                <small style="font-size: 0.6875rem; color: var(--color-on-surface-variant);">Browse & discover carts</small>
              </label>

              <label class="role-radio-label" id="roleLabelVendor">
                <input type="radio" name="authRoleRadio" value="vendor" onchange="StreetKartAuthUI.handleRoleRadioChange('vendor')">
                <div style="display: flex; align-items: center; gap: 0.35rem;">
                  <span style="font-size: 16px;">👨‍🍳</span>
                  <strong style="font-size: 0.8125rem; color: var(--color-on-surface);">Street Vendor</strong>
                </div>
                <small style="font-size: 0.6875rem; color: var(--color-on-surface-variant);">Manage stall & menu</small>
              </label>
            </div>
            <!-- Hidden fallback input for compatibility -->
            <input type="hidden" id="authRegRole" value="customer">
          </div>
          <button type="submit" class="btn btn-primary" style="width: 100%; justify-content: center; padding: 0.75rem;">
            Create Account & Sign In
          </button>
        </form>

        <div style="margin-top: 1rem; text-align: center; font-size: 0.6875rem; color: var(--color-on-surface-variant);">
          🔒 Temporary browser session. Passwords simulated for demo evaluation.
        </div>
      </div>
    `;

    document.body.appendChild(backdrop);
  },

  handleRoleRadioChange(selectedRole) {
    const roleInput = document.getElementById('authRegRole');
    if (roleInput) roleInput.value = selectedRole;

    const labelCustomer = document.getElementById('roleLabelCustomer');
    const labelVendor = document.getElementById('roleLabelVendor');

    if (selectedRole === 'customer') {
      labelCustomer?.classList.add('active');
      labelVendor?.classList.remove('active');
    } else {
      labelVendor?.classList.add('active');
      labelCustomer?.classList.remove('active');
    }
  },

  open(requestedReturnUrl = null) {
    if (requestedReturnUrl) {
      this.pendingReturnUrl = requestedReturnUrl;
    }
    this.injectModal();
    const backdrop = document.getElementById('streetkartAuthModalBackdrop');
    if (backdrop) {
      backdrop.classList.add('active');
      this.clearAlert();
    }
  },

  openForRole(role) {
    this.open();
    if (role === 'vendor') {
      this.handleRoleRadioChange('vendor');
      const vendorRadio = document.querySelector('input[name="authRoleRadio"][value="vendor"]');
      if (vendorRadio) vendorRadio.checked = true;
      const emailInput = document.getElementById('authLoginEmail');
      if (emailInput && !emailInput.value) emailInput.placeholder = 'vendor@streetkart.in';
    } else {
      this.handleRoleRadioChange('customer');
      const customerRadio = document.querySelector('input[name="authRoleRadio"][value="customer"]');
      if (customerRadio) customerRadio.checked = true;
      const emailInput = document.getElementById('authLoginEmail');
      if (emailInput && !emailInput.value) emailInput.placeholder = 'customer@streetkart.in';
    }
  },

  close() {
    const backdrop = document.getElementById('streetkartAuthModalBackdrop');
    if (backdrop) backdrop.classList.remove('active');
  },

  switchTab(tab) {
    this.currentTab = tab;
    this.clearAlert();
    const tabLogin = document.getElementById('authTabLogin');
    const tabRegister = document.getElementById('authTabRegister');
    const formLogin = document.getElementById('authLoginForm');
    const formRegister = document.getElementById('authRegisterForm');

    if (tab === 'login') {
      tabLogin?.classList.add('active');
      tabRegister?.classList.remove('active');
      if (formLogin) formLogin.style.display = 'block';
      if (formRegister) formRegister.style.display = 'none';
    } else {
      tabRegister?.classList.add('active');
      tabLogin?.classList.remove('active');
      if (formLogin) formLogin.style.display = 'none';
      if (formRegister) formRegister.style.display = 'block';
    }
  },

  showAlert(message, type = 'error') {
    const banner = document.getElementById('authAlertBanner');
    if (!banner) return;
    banner.style.display = 'block';
    if (type === 'error') {
      banner.style.backgroundColor = 'rgba(186, 26, 26, 0.12)';
      banner.style.color = '#ba1a1a';
      banner.style.border = '1px solid rgba(186, 26, 26, 0.25)';
    } else {
      banner.style.backgroundColor = 'rgba(46, 125, 50, 0.12)';
      banner.style.color = '#2e7d32';
      banner.style.border = '1px solid rgba(46, 125, 50, 0.25)';
    }
    banner.textContent = message;
  },

  clearAlert() {
    const banner = document.getElementById('authAlertBanner');
    if (banner) {
      banner.style.display = 'none';
      banner.textContent = '';
    }
  },

  async handleLogin(e) {
    e.preventDefault();
    this.clearAlert();
    if (!window.StreetKartAuth) return;

    const email = document.getElementById('authLoginEmail')?.value;
    const password = document.getElementById('authLoginPassword')?.value;

    const res = await window.StreetKartAuth.login(email, password);
    if (res.success) {
      this.close();
      this.updateNavbar();
      const welcomeMsg = this.getPersonalizedWelcome(res.user, 'login');
      this.setFlashMessage(welcomeMsg, 'success');
      if (window.ToastManager) {
        ToastManager.success(welcomeMsg);
      }
      this.postLoginNavigate(res.user);
    } else {
      this.showAlert(res.error || 'Login failed. Please check your credentials.');
    }
  },

  quickDemoLogin(role) {
    if (!window.StreetKartAuth) return;
    const res = window.StreetKartAuth.loginAsDemo(role);
    if (res.success) {
      this.close();
      this.updateNavbar();
      const welcomeMsg = this.getPersonalizedWelcome(res.user, 'demo');
      this.setFlashMessage(welcomeMsg, 'success');
      if (window.ToastManager) {
        ToastManager.success(welcomeMsg);
      }
      this.postLoginNavigate(res.user);
    }
  },

  async handleRegister(e) {
    e.preventDefault();
    this.clearAlert();
    if (!window.StreetKartAuth) return;

    const name = document.getElementById('authRegName')?.value;
    const email = document.getElementById('authRegEmail')?.value;
    const password = document.getElementById('authRegPassword')?.value;
    const role = document.querySelector('input[name="authRoleRadio"]:checked')?.value || document.getElementById('authRegRole')?.value || 'customer';

    if (!name || !email || !password) {
      this.showAlert('Please fill in all required fields.');
      return;
    }

    const res = await window.StreetKartAuth.register({ name, email, password, role });
    if (res.success) {
      this.close();
      this.updateNavbar();
      const welcomeMsg = this.getPersonalizedWelcome(res.user, 'register');
      this.setFlashMessage(welcomeMsg, 'success');
      if (window.ToastManager) {
        ToastManager.success(welcomeMsg);
      }
      this.postLoginNavigate(res.user);
    } else {
      this.showAlert(res.error || 'Registration failed.');
    }
  },

  postLoginNavigate(user) {
    // If a specific return URL was requested and is authorized for this role, go there
    if (this.pendingReturnUrl) {
      const target = this.pendingReturnUrl;
      this.pendingReturnUrl = null;
      if (StreetKartRouteGuard.isRouteAllowedForRole(target, user.role)) {
        window.location.href = target;
        return;
      }
    }

    // Role-based default destination:
    // Vendor -> vendor-dashboard.html
    // Customer on landing or vendor page -> browse.html
    const currentPath = window.location.pathname.toLowerCase();
    if (user.role === 'vendor') {
      if (!currentPath.includes('vendor-dashboard.html')) {
        setTimeout(() => {
          window.location.href = 'vendor-dashboard.html';
        }, 300);
      }
    } else if (user.role === 'customer') {
      if (currentPath.includes('vendor-dashboard.html') || currentPath.includes('vendor-signup.html')) {
        setTimeout(() => {
          window.location.href = 'browse.html';
        }, 300);
      }
    }
  },

  logout() {
    if (window.StreetKartAuth) {
      window.StreetKartAuth.logout();
      this.updateNavbar();
      if (window.ToastManager) {
        ToastManager.info('You have been signed out.');
      }
      // If currently on a vendor or protected customer route, navigate back to index.html safely
      const path = window.location.pathname.toLowerCase();
      if (path.includes('vendor-dashboard.html') || path.includes('vendor-signup.html') || path.includes('browse.html') || path.includes('vendor-details.html')) {
        setTimeout(() => {
          window.location.href = 'index.html';
        }, 200);
      }
    }
  },

  toggleUserDropdown(e) {
    if (e) e.stopPropagation();
    const dropdown = document.getElementById('authUserDropdownMenu');
    if (dropdown) dropdown.classList.toggle('active');
  },

  updateHero() {
    const user = window.StreetKartAuth ? window.StreetKartAuth.getCurrentUser() : null;
    const role = user ? user.role : 'guest';

    // 1. Update legacy heroActionButtons if present
    const heroActions = document.getElementById('heroActionButtons');
    if (heroActions) {
      if (role === 'vendor') {
        heroActions.innerHTML = `
          <a href="vendor-dashboard.html" class="btn btn-accent btn-md" style="font-weight: 700; display: inline-flex; align-items: center; gap: 0.4rem; box-shadow: var(--shadow-sm);">
            <span class="material-symbols-outlined" style="font-size: 19px;">storefront</span>
            <span>Open My Stall Dashboard →</span>
          </a>
          <a href="vendor-details.html?id=${user.vendorId || 1}" class="btn btn-outline-light btn-md" style="font-weight: 600; display: inline-flex; align-items: center; gap: 0.4rem;">
            <span class="material-symbols-outlined" style="font-size: 19px;">visibility</span>
            <span>View Public Stall Preview</span>
          </a>
        `;
      } else if (role === 'customer') {
        heroActions.innerHTML = `
          <a href="browse.html" class="btn btn-accent btn-md" style="font-weight: 700; display: inline-flex; align-items: center; gap: 0.4rem; box-shadow: var(--shadow-sm);">
            <span class="material-symbols-outlined" style="font-size: 19px;">explore</span>
            <span>Explore All 25 Stalls →</span>
          </a>
          <span style="display: inline-flex; align-items: center; gap: 0.4rem; font-size: 0.8125rem; font-weight: 700; background: rgba(255, 255, 255, 0.15); color: white; padding: 0.45rem 0.85rem; border-radius: var(--radius-full);">
            <span>🛍️ Signed in as ${user.name}</span>
          </span>
        `;
      } else {
        heroActions.innerHTML = `
          <a href="browse.html" class="btn btn-accent btn-md" style="font-weight: 700; display: inline-flex; align-items: center; gap: 0.4rem; box-shadow: var(--shadow-sm);">
            <span class="material-symbols-outlined" style="font-size: 19px;">storefront</span>
            <span>Continue as Guest →</span>
          </a>
          <button type="button" class="btn btn-outline-light btn-md" style="font-weight: 600; display: inline-flex; align-items: center; gap: 0.4rem;" onclick="StreetKartAuthUI.open()">
            <span class="material-symbols-outlined" style="font-size: 19px;">account_circle</span>
            <span>Sign In / Sign Up</span>
          </button>
        `;
      }
    }

    // 2. Update clean homeHeroContainer on landing page if present
    const heroContainer = document.getElementById('homeHeroContainer');
    if (heroContainer) {
      if (!this._defaultHomeHeroHTML && role === 'guest') {
        this._defaultHomeHeroHTML = heroContainer.innerHTML;
      }

      if (role === 'vendor') {
        heroContainer.innerHTML = `
          <div style="max-width: 680px; margin: 1.5rem auto 2.5rem auto; text-align: center; background: var(--color-surface); border: 2px solid var(--color-secondary); border-radius: var(--radius-2xl); padding: 2.5rem 2rem; box-shadow: var(--shadow-md);">
            <div style="width: 64px; height: 64px; border-radius: 50%; background: rgba(230, 126, 34, 0.15); display: flex; align-items: center; justify-content: center; font-size: 32px; margin: 0 auto 1rem auto;">
              👨‍🍳
            </div>
            <div style="display: inline-block; font-size: 0.75rem; font-weight: 800; text-transform: uppercase; letter-spacing: 0.05em; color: var(--color-secondary); background: rgba(230, 126, 34, 0.15); padding: 0.25rem 0.75rem; border-radius: var(--radius-full); margin-bottom: 0.75rem;">
              Vendor Session Active
            </div>
            <h2 style="font-size: 2rem; font-weight: 800; color: var(--color-on-surface); margin: 0 0 0.5rem 0;">
              Hello ${user.name}! 👋
            </h2>
            <p style="font-size: 1rem; color: var(--color-on-surface-variant); margin-bottom: 2rem; line-height: 1.6;">
              You are signed in as a verified Street Vendor. Access your stall dashboard to manage inventory, update operational status, and handle incoming customer orders.
            </p>
            <div style="display: flex; gap: 0.85rem; justify-content: center; flex-wrap: wrap;">
              <a href="vendor-dashboard.html" class="btn btn-secondary btn-lg" style="font-weight: 700; display: inline-flex; align-items: center; gap: 0.5rem; background-color: var(--color-secondary); color: white; border: none; border-radius: var(--radius-xl); padding: 0.85rem 1.75rem;">
                <span class="material-symbols-outlined">storefront</span>
                <span>Open My Stall Dashboard →</span>
              </a>
              <a href="vendor-details.html?id=${user.vendorId || 1}" class="btn btn-outline btn-lg" style="font-weight: 600; display: inline-flex; align-items: center; gap: 0.5rem; border-radius: var(--radius-xl); padding: 0.85rem 1.5rem; color: var(--color-secondary); border-color: rgba(230, 126, 34, 0.4);">
                <span class="material-symbols-outlined">visibility</span>
                <span>View Public Stall Preview</span>
              </a>
            </div>
            <div style="margin-top: 1.5rem; border-top: 1px solid var(--color-outline-variant); padding-top: 1rem;">
              <button type="button" class="btn btn-sm" onclick="StreetKartAuthUI.logout()" style="background: none; border: none; color: var(--color-on-surface-variant); font-weight: 600; cursor: pointer;">
                Sign Out of ${user.name}
              </button>
            </div>
          </div>
        `;
      } else if (role === 'customer') {
        heroContainer.innerHTML = `
          <div style="max-width: 680px; margin: 1.5rem auto 2.5rem auto; text-align: center; background: var(--color-surface); border: 2px solid var(--color-primary); border-radius: var(--radius-2xl); padding: 2.5rem 2rem; box-shadow: var(--shadow-md);">
            <div style="width: 64px; height: 64px; border-radius: 50%; background: var(--color-primary-fixed); display: flex; align-items: center; justify-content: center; font-size: 32px; margin: 0 auto 1rem auto;">
              🛍️
            </div>
            <div style="display: inline-block; font-size: 0.75rem; font-weight: 800; text-transform: uppercase; letter-spacing: 0.05em; color: var(--color-primary); background: var(--color-primary-fixed); padding: 0.25rem 0.75rem; border-radius: var(--radius-full); margin-bottom: 0.75rem;">
              Customer Session Active
            </div>
            <h2 style="font-size: 2rem; font-weight: 800; color: var(--color-on-surface); margin: 0 0 0.5rem 0;">
              Hello ${user.name}! 👋
            </h2>
            <p style="font-size: 1rem; color: var(--color-on-surface-variant); margin-bottom: 2rem; line-height: 1.6;">
              You are signed in as a Customer. Discover 25 verified street food carts and artisans in Lucknow, check live availability, and reserve signature delicacies.
            </p>
            <div style="display: flex; gap: 0.85rem; justify-content: center; flex-wrap: wrap;">
              <a href="browse.html" class="btn btn-primary btn-lg" style="font-weight: 700; display: inline-flex; align-items: center; gap: 0.5rem; border-radius: var(--radius-xl); padding: 0.85rem 1.75rem;">
                <span class="material-symbols-outlined">explore</span>
                <span>Explore All 25 Stalls →</span>
              </a>
            </div>
            <div style="margin-top: 1.5rem; border-top: 1px solid var(--color-outline-variant); padding-top: 1rem;">
              <button type="button" class="btn btn-sm" onclick="StreetKartAuthUI.logout()" style="background: none; border: none; color: var(--color-on-surface-variant); font-weight: 600; cursor: pointer;">
                Sign Out of ${user.name}
              </button>
            </div>
          </div>
        `;
      } else if (role === 'guest' && this._defaultHomeHeroHTML) {
        heroContainer.innerHTML = this._defaultHomeHeroHTML;
      }
    }
  },

  updateNavbar() {
    this.updateHero();
    const navbarMenus = document.querySelectorAll('.navbar-menu');
    if (!navbarMenus.length) return;

    const user = window.StreetKartAuth ? window.StreetKartAuth.getCurrentUser() : null;
    const role = user ? user.role : 'guest';

    // 1. Role-aware visibility filtering for existing top navigation links
    navbarMenus.forEach(menu => {
      const browseLink = menu.querySelector('a[href="browse.html"]');
      const myStallLink = menu.querySelector('a[href="vendor-dashboard.html"]');
      const addStallLink = menu.querySelector('a[href="vendor-signup.html"]');
      const homeLink = menu.querySelector('a[href="index.html"]');
      const aboutLink = menu.querySelector('a[href="about.html"]');
      const contactLink = menu.querySelector('a[href="contact.html"]');

      const isLanding = window.location.pathname.toLowerCase().includes('index.html') || 
                        window.location.pathname.endsWith('/') || 
                        window.location.pathname === '';

      if (role === 'guest') {
        // GUEST: No vendor management tabs
        if (myStallLink) myStallLink.closest('li').style.display = 'none';
        if (addStallLink) addStallLink.closest('li').style.display = 'none';

        if (isLanding) {
          // On first appearance landing page, hide ALL tab options for a clean, minimal page!
          if (homeLink) homeLink.closest('li').style.display = 'none';
          if (browseLink) browseLink.closest('li').style.display = 'none';
          if (aboutLink) aboutLink.closest('li').style.display = 'none';
          if (contactLink) contactLink.closest('li').style.display = 'none';
        } else {
          // On secondary pages (browse, about, contact), provide clean guest navigation
          if (homeLink) homeLink.closest('li').style.display = '';
          if (browseLink) browseLink.closest('li').style.display = '';
          if (aboutLink) aboutLink.closest('li').style.display = '';
          if (contactLink) contactLink.closest('li').style.display = '';
        }
      } else if (role === 'customer') {
        // CUSTOMER: Show Customer-relevant tabs
        if (homeLink) homeLink.closest('li').style.display = '';
        if (browseLink) browseLink.closest('li').style.display = '';
        if (aboutLink) aboutLink.closest('li').style.display = '';
        if (contactLink) contactLink.closest('li').style.display = '';
        if (myStallLink) myStallLink.closest('li').style.display = 'none';
        if (addStallLink) addStallLink.closest('li').style.display = 'none';
      } else if (role === 'vendor') {
        // VENDOR: Show Vendor-relevant tabs
        if (homeLink) homeLink.closest('li').style.display = '';
        if (myStallLink) myStallLink.closest('li').style.display = '';
        if (addStallLink) addStallLink.closest('li').style.display = '';
        if (aboutLink) aboutLink.closest('li').style.display = '';
        if (contactLink) contactLink.closest('li').style.display = '';
        if (browseLink) browseLink.closest('li').style.display = 'none';
      }

      // Find or create the auth item container
      let authItem = menu.querySelector('.auth-nav-item');
      if (!authItem) {
        authItem = document.createElement('li');
        authItem.className = 'auth-nav-item';
        const langItem = menu.querySelector('.lang-switcher')?.closest('li');
        if (langItem) {
          menu.insertBefore(authItem, langItem);
        } else {
          menu.appendChild(authItem);
        }
      }

      if (!user) {
        // GUEST STATE: Clean Sign In / Sign Up option
        authItem.innerHTML = `
          <button type="button" class="auth-btn-login" onclick="StreetKartAuthUI.open()" style="font-weight: 700; background-color: var(--color-primary); color: white; border: none; padding: 0.5rem 1.15rem; border-radius: var(--radius-full); box-shadow: var(--shadow-sm);">
            <span class="material-symbols-outlined" style="font-size: 16px;">lock_open</span>
            <span>Sign In / Sign Up</span>
          </button>
        `;
      } else {
        // LOGGED-IN STATE (Customer or Vendor)
        const isVendor = user.role === 'vendor';
        const roleLabel = isVendor ? 'Vendor' : 'Customer';
        const roleClass = isVendor ? 'vendor' : 'customer';

        const roleDestinationLink = isVendor 
          ? `<a href="vendor-dashboard.html" class="auth-dropdown-item">
              <span class="material-symbols-outlined" style="font-size: 18px; color: var(--color-primary);">storefront</span>
              <span>My Stall Dashboard</span>
             </a>`
          : `<a href="browse.html" class="auth-dropdown-item">
              <span class="material-symbols-outlined" style="font-size: 18px; color: var(--color-primary);">explore</span>
              <span>Browse All Stalls</span>
             </a>`;

        authItem.innerHTML = `
          <div class="auth-user-badge" onclick="StreetKartAuthUI.toggleUserDropdown(event)" title="Signed in as ${user.name} (${roleLabel})">
            <div class="auth-avatar-chip">${user.avatar || (isVendor ? '👨‍🍳' : '🛍️')}</div>
            <div class="auth-user-info">
              <span class="auth-user-name">${user.name}</span>
              <span class="auth-user-role ${roleClass}">${roleLabel}</span>
            </div>
            <span class="material-symbols-outlined" style="font-size: 14px; color: var(--color-outline);">arrow_drop_down</span>

            <div class="auth-dropdown-menu" id="authUserDropdownMenu">
              <div style="padding: 0.4rem 0.85rem; border-bottom: 1px solid var(--color-outline-variant); margin-bottom: 0.25rem;">
                <strong style="font-size: 0.8125rem; display: block; color: var(--color-on-surface);">${user.name}</strong>
                <small style="font-size: 0.6875rem; color: var(--color-on-surface-variant); word-break: break-all;">${user.email}</small>
              </div>

              ${roleDestinationLink}

              ${isVendor && user.vendorId ? `
                <a href="vendor-details.html?id=${user.vendorId}" class="auth-dropdown-item">
                  <span class="material-symbols-outlined" style="font-size: 18px;">visibility</span>
                  <span>View Public Stall</span>
                </a>
              ` : ''}

              <div class="auth-dropdown-divider"></div>

              <button type="button" class="auth-dropdown-item logout" onclick="StreetKartAuthUI.logout()">
                <span class="material-symbols-outlined" style="font-size: 18px;">logout</span>
                <span>Sign Out</span>
              </button>
            </div>
          </div>
        `;
      }
    });

    // 2. Role-aware visibility for mobile bottom navigation links
    const mobileBottomNavs = document.querySelectorAll('.mobile-bottom-nav');
    mobileBottomNavs.forEach(nav => {
      const isLanding = window.location.pathname.toLowerCase().includes('index.html') || 
                        window.location.pathname.endsWith('/') || 
                        window.location.pathname === '';
      if (role === 'guest' && isLanding) {
        nav.style.display = 'none';
      } else {
        nav.style.display = '';
        const browseLink = nav.querySelector('a[href="browse.html"]');
        if (browseLink) browseLink.style.display = role === 'vendor' ? 'none' : '';

        const stallLink = nav.querySelector('a[href="vendor-dashboard.html"]');
        if (stallLink) stallLink.style.display = role === 'vendor' ? '' : 'none';

        const addStallLink = nav.querySelector('a[href="vendor-signup.html"]');
        if (addStallLink) addStallLink.style.display = role === 'vendor' ? '' : 'none';

        // Find or create mobile auth link
        let mobileAuth = nav.querySelector('.mobile-nav-auth');
        if (!mobileAuth) {
          mobileAuth = document.createElement('a');
          mobileAuth.className = 'mobile-nav-link mobile-nav-auth';
          mobileAuth.href = '#';
          nav.appendChild(mobileAuth);
        }

        if (!user) {
          mobileAuth.innerHTML = `
            <span class="material-symbols-outlined">account_circle</span>
            <span>Sign In</span>
          `;
          mobileAuth.onclick = (e) => {
            e.preventDefault();
            StreetKartAuthUI.open();
          };
        } else {
          mobileAuth.innerHTML = `
            <span class="material-symbols-outlined">${role === 'vendor' ? 'storefront' : 'person'}</span>
            <span>${user.name.split(' ')[0]}</span>
          `;
          mobileAuth.onclick = (e) => {
            e.preventDefault();
            StreetKartAuthUI.toggleUserDropdown(e);
          };
        }
      }
    });

    // 3. Update customer personalized greeting on browse page if present
    const custGreeting = document.getElementById('customerPersonalizedGreeting');
    if (custGreeting) {
      if (user && role === 'customer') {
        custGreeting.style.display = 'block';
        custGreeting.innerHTML = `
          <div style="display: inline-flex; align-items: center; gap: 0.5rem; background: var(--color-primary-fixed); color: var(--color-primary); padding: 0.4rem 1rem; border-radius: var(--radius-full); font-size: 0.875rem; font-weight: 700; box-shadow: var(--shadow-xs);">
            <span>🛍️</span>
            <span>Hello ${user.name}! Showing verified street stalls near you in Lucknow.</span>
          </div>
        `;
      } else {
        custGreeting.style.display = 'none';
      }
    }
  },

  bindEvents() {
    // Close dropdown on outside click
    document.addEventListener('click', (e) => {
      const badge = e.target.closest('.auth-user-badge');
      if (!badge) {
        document.querySelectorAll('.auth-dropdown-menu.active').forEach(m => m.classList.remove('active'));
      }
    });

    // Close modal on Escape
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        this.close();
      }
    });
  }
};

// ==========================================================================
// CENTRALIZED ROUTE & PERMISSION GUARD (Phase 4: Clean Guest & Role Separation)
// ==========================================================================
const StreetKartRouteGuard = {
  // Access Policy definition
  ROUTES: {
    // Public routes accessible to everyone (Guests, Customers, Vendors)
    PUBLIC: ['index.html', 'about.html', 'contact.html', 'browse.html', 'vendor-details.html'],
    // Vendor-only management routes
    VENDOR: ['vendor-dashboard.html', 'vendor-signup.html']
  },

  isRouteAllowedForRole(pathOrUrl, role) {
    const cleanPath = (pathOrUrl || '').toLowerCase();

    // Guest:
    // Can access Public routes AND consumer browsing (browse.html, vendor-details.html)
    // CANNOT access Vendor-only management routes (vendor-dashboard.html, vendor-signup.html)
    if (!role || role === 'guest') {
      if (cleanPath.includes('vendor-dashboard.html') || cleanPath.includes('vendor-signup.html')) {
        return false;
      }
      return true;
    }

    // Customer:
    // Can access Public routes, browse.html, vendor-details.html
    // CANNOT access Vendor-only management routes (vendor-dashboard.html, vendor-signup.html)
    if (role === 'customer') {
      if (cleanPath.includes('vendor-dashboard.html') || cleanPath.includes('vendor-signup.html')) {
        return false;
      }
      return true;
    }

    // Vendor:
    // Can access Vendor dashboard, stall management, vendor details, public pages
    // Redirected away from customer-only browse.html to their stall dashboard
    if (role === 'vendor') {
      if (cleanPath.includes('browse.html')) {
        return false;
      }
      return true;
    }

    return true;
  },

  enforcePageGuard() {
    const user = window.StreetKartAuth ? window.StreetKartAuth.getCurrentUser() : null;
    const role = user ? user.role : 'guest';
    const currentPath = window.location.pathname.toLowerCase();

    // A. Vendor attempting to open browse.html directly -> redirect to stall dashboard
    if (role === 'vendor' && currentPath.includes('browse.html')) {
      if (window.ToastManager) {
        ToastManager.info('Vendors are routed to their Stall Dashboard.');
      }
      setTimeout(() => {
        window.location.href = 'vendor-dashboard.html';
      }, 100);
      return;
    }

    // B. Customer attempting to open vendor-dashboard.html or vendor-signup.html directly
    if (role === 'customer') {
      if (currentPath.includes('vendor-dashboard.html') || currentPath.includes('vendor-signup.html')) {
        if (window.ToastManager) {
          ToastManager.warning('Stall management is reserved for Street Vendors.');
        }
        setTimeout(() => {
          window.location.href = 'browse.html';
        }, 100);
        return;
      }
    }

    // C. Guest attempting to access private Vendor management pages directly
    if (role === 'guest') {
      if (currentPath.includes('vendor-dashboard.html')) {
        window.location.href = 'index.html?auth=login&returnUrl=vendor-dashboard.html';
        return;
      }
      if (currentPath.includes('vendor-signup.html')) {
        window.location.href = 'index.html?auth=login&returnUrl=vendor-signup.html';
        return;
      }
      // Note: browse.html and vendor-details.html are completely allowed for guests!
    }

    // D. Auto-prompt login modal when arriving at landing page with pending auth / returnUrl
    if (currentPath.includes('index.html') || currentPath.endsWith('/') || currentPath === '') {
      const urlParams = new URLSearchParams(window.location.search);
      if (urlParams.get('auth') === 'login' || urlParams.get('login') === '1') {
        const returnUrl = urlParams.get('returnUrl') || 'vendor-dashboard.html';
        setTimeout(() => {
          if (window.StreetKartAuthUI) {
            StreetKartAuthUI.open(returnUrl);
            if (window.ToastManager) {
              if (returnUrl.includes('vendor')) {
                ToastManager.info('Please sign in or use Demo Vendor to access Stall Management.');
              } else {
                ToastManager.info('Please sign in or register to continue.');
              }
            }
          }
        }, 300);
      }
    }
  }
};

window.StreetKartAuthUI = StreetKartAuthUI;
window.StreetKartRouteGuard = StreetKartRouteGuard;

document.addEventListener('DOMContentLoaded', () => {
  StreetKartAuthUI.init();
  StreetKartRouteGuard.enforcePageGuard();
});



