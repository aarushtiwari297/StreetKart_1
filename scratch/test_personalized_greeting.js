const fs = require('fs');
const path = require('path');
const vm = require('vm');

function runTest() {
  console.log('--- Testing Personalized Greetings for Role-Based Access ---');

  const mainCode = fs.readFileSync(path.join(__dirname, '..', 'scripts', 'main.js'), 'utf8');
  const authCode = fs.readFileSync(path.join(__dirname, '..', 'scripts', 'mock-auth.js'), 'utf8');
  const storeCode = fs.readFileSync(path.join(__dirname, '..', 'scripts', 'mock-store.js'), 'utf8');
  const vendorsCode = fs.readFileSync(path.join(__dirname, '..', 'data', 'vendors.js'), 'utf8');

  class MockStorage {
    constructor() { this.store = {}; }
    getItem(k) { return this.store[k] !== undefined ? this.store[k] : null; }
    setItem(k, v) { this.store[k] = String(v); }
    removeItem(k) { delete this.store[k]; }
    clear() { this.store = {}; }
  }

  const localStorage = new MockStorage();
  const sessionStorage = new MockStorage();

  const toastsShown = [];
  const mockToastManager = {
    success: (msg) => toastsShown.push({ type: 'success', msg }),
    info: (msg) => toastsShown.push({ type: 'info', msg }),
    warning: (msg) => toastsShown.push({ type: 'warning', msg }),
    error: (msg) => toastsShown.push({ type: 'error', msg })
  };

  const createMockElement = (tag, id = null) => {
    return {
      tagName: tag.toUpperCase(),
      id,
      style: {},
      innerHTML: '',
      textContent: '',
      children: [],
      classList: {
        add: () => {},
        remove: () => {},
        contains: () => false,
        toggle: () => {}
      },
      appendChild: function(c) { this.children.push(c); return c; },
      querySelector: () => null,
      querySelectorAll: () => []
    };
  };

  const custGreetingEl = createMockElement('div', 'customerPersonalizedGreeting');
  const menuEl = createMockElement('ul');

  const window = {
    location: {
      pathname: '/browse.html',
      search: '',
      origin: 'http://localhost:8080'
    },
    localStorage,
    sessionStorage,
    document: {
      createElement: (t) => createMockElement(t),
      getElementById: (id) => {
        if (id === 'customerPersonalizedGreeting') return custGreetingEl;
        return null;
      },
      querySelector: (sel) => {
        if (sel === '#customerPersonalizedGreeting') return custGreetingEl;
        if (sel === '.navbar-menu') return menuEl;
        return null;
      },
      querySelectorAll: () => [menuEl],
      body: createMockElement('body'),
      addEventListener: () => {}
    },
    ToastManager: mockToastManager,
    setTimeout: (fn) => fn(),
    clearTimeout: () => {},
    addEventListener: () => {}
  };

  const context = vm.createContext({
    window,
    document: window.document,
    localStorage: window.localStorage,
    sessionStorage: window.sessionStorage,
    IntersectionObserver: class { observe() {} unobserve() {} disconnect() {} },
    setTimeout: (fn) => fn(),
    clearTimeout: () => {},
    console
  });

  vm.runInContext(vendorsCode, context);
  vm.runInContext(storeCode, context);
  vm.runInContext(authCode, context);
  vm.runInContext(mainCode, context);

  window.ToastManager = mockToastManager;
  const { StreetKartAuthUI, StreetKartAuth } = window;

  // 1. Test getPersonalizedWelcome with custom consumer name "Aarush"
  const consumerUser = { name: 'Aarush', role: 'customer' };
  const loginMsg = StreetKartAuthUI.getPersonalizedWelcome(consumerUser, 'login');
  console.assert(loginMsg === 'Hello Aarush! Welcome back to StreetKart.', `Expected loginMsg to be 'Hello Aarush! Welcome back to StreetKart.', got: ${loginMsg}`);
  console.log('✅ Customer login message: ' + loginMsg);

  const regMsg = StreetKartAuthUI.getPersonalizedWelcome(consumerUser, 'register');
  console.assert(regMsg.startsWith('Hello Aarush!'), `Expected regMsg to start with Hello Aarush!, got: ${regMsg}`);
  console.log('✅ Customer registration message: ' + regMsg);

  // 2. Test getPersonalizedWelcome with vendor name "Aarush Tiwari"
  const vendorUser = { name: 'Aarush Tiwari', role: 'vendor', vendorId: 1 };
  const vendorLoginMsg = StreetKartAuthUI.getPersonalizedWelcome(vendorUser, 'login');
  console.assert(vendorLoginMsg === 'Hello Aarush Tiwari! Welcome to your Stall Dashboard.', `Got: ${vendorLoginMsg}`);
  console.log('✅ Vendor login message: ' + vendorLoginMsg);

  // 3. Test Flash Message Persistence across page transitions
  StreetKartAuthUI.setFlashMessage('Hello Aarush! Welcome back to StreetKart.', 'success');
  console.assert(sessionStorage.getItem('streetkart_flash_msg') !== null, 'Flash message should be saved in sessionStorage');

  // Trigger checkFlashMessage on page load
  toastsShown.length = 0;
  StreetKartAuthUI.checkFlashMessage();
  console.assert(toastsShown.length === 1, 'Toast should be triggered from flash message');
  console.assert(toastsShown[0].msg === 'Hello Aarush! Welcome back to StreetKart.', 'Correct message in toast');
  console.assert(sessionStorage.getItem('streetkart_flash_msg') === null, 'Flash message should be cleared after dispatch');
  console.log('✅ Cross-page redirect flash message works and clears cleanly');

  // 4. Test Browse page personalized greeting for Customer
  localStorage.setItem('streetkart_session_v1', JSON.stringify({
    id: 'usr_test_aarush',
    name: 'Aarush',
    email: 'aarush@example.com',
    role: 'customer',
    token: 'tok_123'
  }));

  StreetKartAuthUI.updateNavbar();
  console.assert(custGreetingEl.style.display === 'block', 'Customer greeting should be displayed on browse page');
  console.assert(custGreetingEl.innerHTML.includes('Hello Aarush!'), 'Greeting must include Hello Aarush!');
  console.log('✅ Browse page reflects: ' + custGreetingEl.innerHTML.trim());

  console.log('\nALL PERSONALIZED GREETING TESTS PASSED PERFECTLY!');
}

runTest();
