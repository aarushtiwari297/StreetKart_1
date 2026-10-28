const fs = require('fs');
const path = require('path');
const vm = require('vm');

class MockLocalStorage {
  constructor() { this.store = {}; }
  getItem(k) { return this.store[k] !== undefined ? this.store[k] : null; }
  setItem(k, v) { this.store[k] = String(v); }
  removeItem(k) { delete this.store[k]; }
  clear() { this.store = {}; }
}

function createEnv(initialPath = 'index.html') {
  const localStorage = new MockLocalStorage();
  const mockClassList = () => {
    const s = new Set();
    return {
      add: (c) => s.add(c),
      remove: (c) => s.delete(c),
      contains: (c) => s.has(c),
      toggle: (c) => s.has(c) ? s.delete(c) : s.add(c)
    };
  };

  const createMockElement = (tag, id = null, classes = []) => {
    const el = {
      tagName: tag.toUpperCase(),
      id,
      className: classes.join(' '),
      classList: mockClassList(),
      style: {},
      innerHTML: '',
      children: [],
      parentNode: null,
      getAttribute: (a) => el[a] || null,
      setAttribute: (a, v) => { el[a] = v; },
      querySelector: (selector) => {
        for (const child of el.children) {
          if (selector.includes(child.href)) return child;
          if (child.querySelector) {
            const found = child.querySelector(selector);
            if (found) return found;
          }
        }
        return null;
      },
      querySelectorAll: (selector) => {
        const results = [];
        for (const child of el.children) {
          if (selector.includes(child.tagName?.toLowerCase())) results.push(child);
          if (child.querySelectorAll) results.push(...child.querySelectorAll(selector));
        }
        return results;
      },
      closest: (sel) => el.parentNode || el,
      appendChild: (c) => { c.parentNode = el; el.children.push(c); return c; },
      insertBefore: (c, ref) => {
        c.parentNode = el;
        const idx = el.children.indexOf(ref);
        if (idx !== -1) el.children.splice(idx, 0, c);
        else el.children.push(c);
        return c;
      },
      remove: () => {
        if (el.parentNode && el.parentNode.children) {
          const idx = el.parentNode.children.indexOf(el);
          if (idx !== -1) el.parentNode.children.splice(idx, 1);
        }
      }
    };
    return el;
  };

  const menu = createMockElement('ul', null, ['navbar-menu']);
  const tabs = [
    { href: 'index.html', text: 'Home' },
    { href: 'browse.html', text: 'Browse Vendors' },
    { href: 'vendor-dashboard.html', text: 'My Stall' },
    { href: 'about.html', text: 'About' },
    { href: 'contact.html', text: 'Contact' },
    { href: 'vendor-signup.html', text: '+ Add Stall' }
  ];

  tabs.forEach(t => {
    const li = createMockElement('li');
    const a = createMockElement('a');
    a.href = t.href;
    a.textContent = t.text;
    li.appendChild(a);
    menu.appendChild(li);
  });

  const langLi = createMockElement('li');
  const langDiv = createMockElement('div', null, ['lang-switcher']);
  langLi.appendChild(langDiv);
  menu.appendChild(langLi);

  const mobileNav = createMockElement('nav', null, ['mobile-bottom-nav']);
  const heroContainer = createMockElement('div', 'homeHeroContainer', ['welcome-guest-hero']);
  heroContainer.innerHTML = '<!-- Initial Guest Role Selection HTML -->';

  const window = {
    location: {
      pathname: initialPath,
      search: '',
      origin: 'http://localhost:8080',
      href: 'http://localhost:8080/' + initialPath
    },
    localStorage,
    document: {
      createElement: (tag) => createMockElement(tag),
      getElementById: (id) => {
        if (id === 'homeHeroContainer') return heroContainer;
        return null;
      },
      querySelector: (sel) => {
        if (sel === '.navbar-menu') return menu;
        if (sel === '.mobile-bottom-nav') return mobileNav;
        if (sel === '#homeHeroContainer') return heroContainer;
        return null;
      },
      querySelectorAll: (sel) => {
        if (sel === '.navbar-menu') return [menu];
        if (sel === '.mobile-bottom-nav') return [mobileNav];
        return [];
      },
      body: createMockElement('body'),
      addEventListener: () => {}
    },
    setTimeout: (fn) => fn(),
    clearTimeout: () => {},
    addEventListener: () => {}
  };

  const context = vm.createContext({
    window,
    document: window.document,
    localStorage: window.localStorage,
    IntersectionObserver: class { observe() {} unobserve() {} disconnect() {} },
    setTimeout,
    clearTimeout,
    console
  });

  const vendorsCode = fs.readFileSync(path.join(__dirname, '..', 'data', 'vendors.js'), 'utf8');
  const storeCode = fs.readFileSync(path.join(__dirname, '..', 'scripts', 'mock-store.js'), 'utf8');
  const authCode = fs.readFileSync(path.join(__dirname, '..', 'scripts', 'mock-auth.js'), 'utf8');
  const mainCode = fs.readFileSync(path.join(__dirname, '..', 'scripts', 'main.js'), 'utf8');

  vm.runInContext(vendorsCode, context);
  vm.runInContext(storeCode, context);
  vm.runInContext(authCode, context);
  vm.runInContext(mainCode, context);

  return { window, menu, mobileNav, heroContainer };
}

function runTest() {
  console.log('--- Testing Minimal Landing Page for Guest ---');
  const { window, menu, mobileNav } = createEnv('index.html');

  window.StreetKartAuthUI.init();
  window.StreetKartAuthUI.updateNavbar();

  const home = menu.querySelector('a[href="index.html"]')?.closest('li');
  const browse = menu.querySelector('a[href="browse.html"]')?.closest('li');
  const myStall = menu.querySelector('a[href="vendor-dashboard.html"]')?.closest('li');
  const about = menu.querySelector('a[href="about.html"]')?.closest('li');
  const contact = menu.querySelector('a[href="contact.html"]')?.closest('li');
  const addStall = menu.querySelector('a[href="vendor-signup.html"]')?.closest('li');

  console.assert(home.style.display === 'none', 'Home tab should be hidden for guest on landing');
  console.assert(browse.style.display === 'none', 'Browse tab should be hidden for guest on landing');
  console.assert(myStall.style.display === 'none', 'My Stall tab should be hidden for guest on landing');
  console.assert(about.style.display === 'none', 'About tab should be hidden for guest on landing');
  console.assert(contact.style.display === 'none', 'Contact tab should be hidden for guest on landing');
  console.assert(addStall.style.display === 'none', 'Add Stall tab should be hidden for guest on landing');
  console.assert(mobileNav.style.display === 'none', 'Mobile bottom nav should be hidden on landing for guest');

  console.log('✅ Guest landing navbar verified: 0 tab options, clean Sign In / Sign Up only');

  // Customer login
  window.StreetKartAuthUI.quickDemoLogin('customer');
  console.assert(home.style.display === '', 'Home tab should appear for logged-in Customer');
  console.assert(browse.style.display === '', 'Browse tab should appear for logged-in Customer');
  console.assert(myStall.style.display === 'none', 'My Stall tab should remain hidden for Customer');
  console.log('✅ Logged-in Customer sees Customer tabs');

  // Vendor login
  window.StreetKartAuthUI.quickDemoLogin('vendor');
  console.assert(home.style.display === '', 'Home tab should appear for logged-in Vendor');
  console.assert(browse.style.display === 'none', 'Browse tab should be hidden for Vendor');
  console.assert(myStall.style.display === '', 'My Stall tab should appear for logged-in Vendor');
  console.log('✅ Logged-in Vendor sees Vendor tabs');

  // Logout
  window.StreetKartAuthUI.logout();
  console.assert(home.style.display === 'none', 'Home tab should be hidden after logout on landing');
  console.assert(browse.style.display === 'none', 'Browse tab should be hidden after logout on landing');
  console.log('✅ Logout restores minimal clean guest state on landing');

  console.log('\nALL MINIMAL LANDING TESTS PASSED PERFECTLY!');
}

runTest();
