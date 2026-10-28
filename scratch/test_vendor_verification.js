/**
 * Automated Test Suite for StreetKart Vendor Verification MVP
 * 
 * Verifies:
 * 1. Vendor onboarding fields and default 'pending' status + 'verified: false'.
 * 2. Unauthorized approval attempts are rejected with permission error.
 * 3. Authorized admin review can approve an application.
 * 4. Authorized admin review can reject an application with reason.
 * 5. Public discovery queries only expose approved vendors as verified.
 * 6. Truthful verification badging (no false claims of physical certification).
 * 7. Security audit: No service role keys exposed in client code.
 * 8. SQL migration file completeness.
 */

const fs = require('fs');
const path = require('path');

let testsPassed = 0;
let testsFailed = 0;

function assert(condition, testName, details = '') {
  if (condition) {
    console.log(`  PASS: ${testName}`);
    testsPassed++;
  } else {
    console.error(`  FAIL: ${testName} - ${details}`);
    testsFailed++;
  }
}

async function runTests() {
  console.log('====================================================');
  console.log('StreetKart Vendor Verification MVP Test Suite');
  console.log('====================================================\n');

  // ----------------------------------------------------
  // Test 1: Data Model & Seed Vendors
  // ----------------------------------------------------
  console.log('[Test Group 1: Data Model & Vendor Onboarding defaults]');
  try {
    // Mock window & localStorage for data/vendors.js & mock-store.js
    const mockStorage = {};
    global.window = {
      StreetKartData: null,
      StreetKartStore: null,
      StreetKartAuth: null,
      StreetKartAPI: null
    };
    global.localStorage = {
      getItem: (k) => mockStorage[k] || null,
      setItem: (k, v) => { mockStorage[k] = String(v); },
      removeItem: (k) => { delete mockStorage[k]; },
      clear: () => { Object.keys(mockStorage).forEach(k => delete mockStorage[k]); }
    };

    // Load vendors.js
    require('../data/vendors.js');
    const data = global.window.StreetKartData;
    assert(!!data, 'StreetKartData is exported to window');

    const seedVendors = data.getVendors();
    assert(seedVendors.length >= 25, 'Seed dataset contains at least 25 vendors', `Count: ${seedVendors.length}`);

    // Test createVendorProfile
    const newProfile = data.createVendorProfile({
      name: 'Gomti Nagar Litti Chokha',
      category: 'Street Food',
      cuisine: 'Bihari / UP Street Food',
      location: 'Patrakar Puram, Gomti Nagar',
      stallPhoto: 'https://images.unsplash.com/photo-example-litti'
    });

    assert(newProfile.verification_status === 'pending', 'Newly created vendor has verification_status = "pending"');
    assert(newProfile.verified === false, 'Newly created vendor has verified = false');
    assert(newProfile.imageUrl.includes('photo-example-litti') || newProfile.stallPhoto.includes('photo-example-litti'), 'Stall photo is captured properly');

  } catch (err) {
    assert(false, 'Data Model & Vendor Onboarding', err.message);
  }

  // ----------------------------------------------------
  // Test 2: Mock Store Verification Lifecycle & Access Control
  // ----------------------------------------------------
  console.log('\n[Test Group 2: Verification Lifecycle & Admin Authorization]');
  try {
    require('../scripts/mock-auth.js');
    require('../scripts/mock-store.js');

    const auth = global.window.StreetKartAuth;
    const store = global.window.StreetKartStore;

    assert(typeof auth.isAdmin === 'function', 'StreetKartAuth.isAdmin helper function exists');
    assert(typeof store.getPendingApplications === 'function', 'StreetKartStore.getPendingApplications exists');
    assert(typeof store.reviewVendorApplication === 'function', 'StreetKartStore.reviewVendorApplication exists');

    // Step A: Create a pending vendor
    const pendingVendor = await store.createVendor({
      name: 'Alambagh Chai Point',
      category: 'Beverages',
      cuisine: 'Tea & Snacks',
      location: 'Alambagh Chauraha, Lucknow',
      stallPhoto: 'https://images.unsplash.com/photo-chai'
    });

    assert(pendingVendor.verification_status === 'pending', 'Store creates vendor with verification_status = "pending"');
    assert(pendingVendor.verified === false, 'Store creates vendor with verified = false');

    // Step B: Attempt review while NOT logged in (or guest)
    auth.logout();
    let unauthorizedResult = null;
    try {
      unauthorizedResult = await store.reviewVendorApplication({
        vendorId: pendingVendor.id,
        status: 'approved'
      });
    } catch (e) {
      unauthorizedResult = { success: false, error: e.message };
    }

    assert(
      unauthorizedResult && unauthorizedResult.success === false && /denied|admin/i.test(unauthorizedResult.error),
      'Guest approval attempt is rejected with 403 / Access Denied error',
      JSON.stringify(unauthorizedResult)
    );

    // Step C: Attempt review as normal customer user
    auth.login('customer@streetkart.in', 'demo123');
    assert(auth.isAdmin() === false, 'Customer user is not an admin');

    let customerResult = await store.reviewVendorApplication({
      vendorId: pendingVendor.id,
      status: 'approved'
    });
    assert(
      customerResult && customerResult.success === false && /denied|admin/i.test(customerResult.error),
      'Customer approval attempt is rejected with 403 / Access Denied error',
      JSON.stringify(customerResult)
    );

    // Step D: Authorize as Admin and Approve
    auth.login('admin@streetkart.in', 'admin123');
    assert(auth.isAdmin() === true, 'Admin credentials authenticate with role: admin');

    let adminApproveResult = await store.reviewVendorApplication({
      vendorId: pendingVendor.id,
      status: 'approved'
    });
    assert(adminApproveResult && adminApproveResult.success === true, 'Admin approval succeeds');

    const approvedVendor = await store.getVendorById(pendingVendor.id);
    assert(approvedVendor.verification_status === 'approved', 'Approved vendor status is updated to "approved"');
    assert(approvedVendor.verified === true, 'Approved vendor verified flag is set to true');

    // Step E: Reject flow with mandatory reason
    const anotherVendor = await store.createVendor({
      name: 'Hazratganj Kulfi Cart',
      category: 'Desserts',
      cuisine: 'Traditional Kulfi',
      location: 'Hazratganj, Lucknow',
      stallPhoto: 'https://images.unsplash.com/photo-kulfi'
    });

    let rejectResult = await store.reviewVendorApplication({
      vendorId: anotherVendor.id,
      status: 'rejected',
      rejectionReason: 'Stall photo was blurry and location details were incomplete.'
    });
    assert(rejectResult && rejectResult.success === true, 'Admin rejection succeeds');

    const rejectedVendor = await store.getVendorById(anotherVendor.id);
    assert(rejectedVendor.verification_status === 'rejected', 'Rejected vendor status is updated to "rejected"');
    assert(rejectedVendor.verified === false, 'Rejected vendor verified flag remains false');
    assert(
      (rejectedVendor.rejection_reason && rejectedVendor.rejection_reason.includes('blurry')) ||
      (rejectedVendor.rejectionReason && rejectedVendor.rejectionReason.includes('blurry')),
      'Rejection reason is recorded'
    );

  } catch (err) {
    assert(false, 'Mock Store Lifecycle & Authorization', err.message);
  }

  // ----------------------------------------------------
  // Test 3: Public Discovery & Badge Truthfulness
  // ----------------------------------------------------
  console.log('\n[Test Group 3: Discovery Filter & Truthful Badging]');
  try {
    const store = global.window.StreetKartStore;

    // Create an unverified/pending vendor
    const unapproved = await store.createVendor({
      name: 'Unverified Momo Stall',
      category: 'Fast Food',
      cuisine: 'Tibetan',
      location: 'Indira Nagar',
      stallPhoto: 'https://images.unsplash.com/photo-momo'
    });

    // Verify that an unapproved vendor never returns verified: true
    const fetched = await store.getVendorById(unapproved.id);
    assert(fetched.verified === false, 'Unapproved vendor has verified === false');
    assert(fetched.verification_status === 'pending', 'Unapproved vendor has verification_status === "pending"');

    // Check main.js badge rendering logic
    const mainJsContent = fs.readFileSync(path.join(__dirname, '../scripts/main.js'), 'utf8');
    assert(
      mainJsContent.includes("vendor.verification_status === 'approved'") ||
      mainJsContent.includes("verification_status === 'approved'"),
      'main.js requires approved verification status before showing verified badge'
    );

    assert(
      mainJsContent.includes('Verified Listing (Digital Review)'),
      'main.js displays truthful "Verified Listing (Digital Review)" badge label'
    );

    assert(
      !mainJsContent.includes('Awadh Vyapar Mandal Certified'),
      'Removed misleading "Awadh Vyapar Mandal Certified" claim'
    );

  } catch (err) {
    assert(false, 'Discovery Filter & Truthful Badging', err.message);
  }

  // ----------------------------------------------------
  // Test 4: Security Audit - Key Exposure
  // ----------------------------------------------------
  console.log('\n[Test Group 4: Security Audit - No Service Role Key Exposure]');
  try {
    const jsFiles = [
      'scripts/main.js',
      'scripts/supabase-client.js',
      'scripts/mock-auth.js',
      'scripts/mock-store.js',
      'data/vendors.js',
      'admin-verification.html',
      'vendor-signup.html',
      'vendor-dashboard.html'
    ];

    let hasLeakedKey = false;
    jsFiles.forEach(file => {
      const fullPath = path.join(__dirname, '..', file);
      if (fs.existsSync(fullPath)) {
        const content = fs.readFileSync(fullPath, 'utf8');
        if (/service_role|serviceRole|supabase_secret_key/i.test(content)) {
          const lines = content.split('\n');
          lines.forEach((line, idx) => {
            if (/service_role|serviceRole/i.test(line) && !line.includes('NEVER') && !line.includes('warning') && !line.includes('Do not') && !line.includes('policy')) {
              console.warn(`    Warning pattern found in ${file}:${idx + 1}: ${line.trim()}`);
              hasLeakedKey = true;
            }
          });
        }
      }
    });

    assert(!hasLeakedKey, 'No active service-role secret keys found in frontend scripts');

  } catch (err) {
    assert(false, 'Security Audit', err.message);
  }

  // ----------------------------------------------------
  // Test 5: SQL Migration Verification
  // ----------------------------------------------------
  console.log('\n[Test Group 5: SQL Migration & RLS Security Rules]');
  try {
    const migrationPath = path.join(__dirname, '../supabase/migrations/20261028_vendor_verification.sql');
    assert(fs.existsSync(migrationPath), 'Migration file exists: 20261028_vendor_verification.sql');

    const sql = fs.readFileSync(migrationPath, 'utf8');

    // Verify status enum / check
    assert(sql.includes("verification_status IN ('pending', 'approved', 'rejected')"), 'SQL enforces verification_status CHECK constraint');

    // Verify admin table
    assert(sql.includes('CREATE TABLE IF NOT EXISTS public.admin_users'), 'SQL creates admin_users table');

    // Verify is_admin() SECURITY DEFINER function
    assert(sql.includes('CREATE OR REPLACE FUNCTION public.is_admin()') && sql.includes('SECURITY DEFINER'), 'SQL creates public.is_admin() SECURITY DEFINER function');

    // Verify RLS policy for public discovery
    assert(sql.includes("verification_status = 'approved'"), 'SQL RLS restricts public SELECT to approved vendors');

    // Verify RLS policy preventing non-admins from updating verification status
    assert(sql.includes('is_admin()'), 'SQL RLS uses is_admin() to restrict review operations');

    // Verify RPC for atomic review
    assert(sql.includes('review_vendor_application'), 'SQL includes review_vendor_application RPC function');

    // Verify Storage bucket creation & policy
    assert(sql.includes('stall-photos'), 'SQL configures stall-photos storage bucket');

  } catch (err) {
    assert(false, 'SQL Migration', err.message);
  }

  // ----------------------------------------------------
  // Test 6: Vendor UI & Admin Page Verification
  // ----------------------------------------------------
  console.log('\n[Test Group 6: Vendor UI & Admin Page Verification]');
  try {
    const signupHtml = fs.readFileSync(path.join(__dirname, '../vendor-signup.html'), 'utf8');
    assert(signupHtml.includes('stallPhotoFile') || signupHtml.includes('stall_photo'), 'vendor-signup.html contains stall photo input');
    assert(!signupHtml.includes('Aadhaar') && !signupHtml.includes('aadhaar'), 'vendor-signup.html does not require Aadhaar');

    const dashHtml = fs.readFileSync(path.join(__dirname, '../vendor-dashboard.html'), 'utf8');
    assert(dashHtml.includes('verificationStatusBadge') && dashHtml.includes('verificationNoticeStrip'), 'vendor-dashboard.html contains verification status badge and notice strip');

    const adminHtml = fs.readFileSync(path.join(__dirname, '../admin-verification.html'), 'utf8');
    assert(adminHtml.includes('reviewVendorApplication'), 'admin-verification.html contains reviewVendorApplication integration');
    assert(adminHtml.includes('photoLightboxModal'), 'admin-verification.html contains stall photo inspection modal');
    assert(adminHtml.includes('rejectModalBackdrop'), 'admin-verification.html contains structured rejection modal');

  } catch (err) {
    assert(false, 'Vendor UI & Admin Page Verification', err.message);
  }

  console.log('\n====================================================');
  console.log(`Results: ${testsPassed} passed, ${testsFailed} failed`);
  console.log('====================================================');

  if (testsFailed > 0) {
    process.exit(1);
  }
}

runTests();
