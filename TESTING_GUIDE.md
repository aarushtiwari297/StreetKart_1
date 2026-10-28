# StreetKart UI/UX Testing Guide

## Quick Start
1. Open your browser and navigate to: `http://localhost:8000`
2. Follow the test scenarios below to see all enhancements

## Test Scenarios

### 🏠 Homepage (index.html)
**What to Look For:**
- [ ] Cards fade in with stagger effect as page loads
- [ ] Scroll down to stats section - numbers should count from 0 to target (500, 10000, 15)
- [ ] Navbar gets shadow and slight blur effect when scrolling
- [ ] "How It Works" cards animate in when scrolling
- [ ] All hover effects work smoothly

**How to Test:**
1. Load homepage
2. Wait 1-2 seconds to see initial animations
3. Scroll down slowly to trigger counter animations
4. Hover over cards to see lift effects

---

### 🔍 Browse Vendors (browse.html)
**What to Look For:**
- [ ] Skeleton screens appear first (gray shimmer effect)
- [ ] Vendor cards fade in with stagger animation after 0.5s
- [ ] "Open" badges have pulsing animation
- [ ] Cards lift on hover
- [ ] Search box filters vendors in real-time
- [ ] Empty state appears when no vendors match filters
- [ ] "Reset Filters" button shows toast notification

**How to Test:**
1. Click "Browse Vendors" in navigation
2. Observe skeleton loading
3. Wait for cards to appear
4. Type in search box (try "Sharma")
5. Click category filters
6. Toggle "Show Open Vendors Only"
7. Search for something that doesn't exist to see empty state
8. Click "Reset Filters" button

---

### 📖 About Page (about.html)
**What to Look For:**
- [ ] All cards animate in as you scroll
- [ ] Smooth stagger effect on problem/solution cards
- [ ] Solution cards have nice hover effects

**How to Test:**
1. Navigate to About page
2. Scroll down slowly
3. Watch cards animate in
4. Hover over cards

---

### 📧 Contact Page (contact.html)
**What to Look For:**
- [ ] Form fields have focus animations
- [ ] Email validation on blur (try invalid email)
- [ ] Submit button shows loading spinner
- [ ] Success toast notification appears
- [ ] Form resets after submission

**How to Test:**
1. Navigate to Contact page
2. Fill out form:
   - Name: "Test User"
   - Email: "test@example.com"
   - Subject: "Testing UI"
   - Message: "This looks great!"
3. Click "Send Message"
4. Watch for loading spinner on button
5. See success toast notification
6. Verify form clears

---

### 📝 Vendor Signup (vendor-signup.html)
**What to Look For:**
- [ ] Form validation works
- [ ] Submit button shows loading state
- [ ] Success toast appears
- [ ] Success overlay shows
- [ ] Redirects to dashboard

**How to Test:**
1. Navigate to Vendor Signup
2. Fill out form with test data
3. Submit and watch animations
4. See toast notification
5. Success overlay appears

---

### 📊 Vendor Dashboard (vendor-dashboard.html)
**What to Look For:**
- [ ] Status toggle shows toast notification
- [ ] "Open" badge pulses when active
- [ ] Smooth transitions

**How to Test:**
1. Navigate to dashboard (or get redirected from signup)
2. Toggle availability switch
3. See toast notification
4. Watch badge animation change

---

## Interactive Elements to Test

### Toast Notifications
Should appear in top-right corner with:
- ✅ Icon on left
- ✅ Title and message
- ✅ Close button (×)
- ✅ Auto-dismiss after 5 seconds
- ✅ Progress bar at bottom

### Scroll Effects
- ✅ Navbar shadow appears after scrolling 50px
- ✅ Elements animate when scrolling into view
- ✅ Smooth scroll behavior on anchor links

### Loading States
- ✅ Skeleton screens (shimmer effect)
- ✅ Button spinners (rotating circle)
- ✅ Smooth transitions

### Hover Effects
- ✅ Cards lift up slightly
- ✅ Buttons change color
- ✅ Cursor changes to pointer

---

## Browser Testing Checklist

### Desktop
- [ ] Chrome/Edge
- [ ] Firefox
- [ ] Safari

### Mobile (Responsive)
- [ ] Resize browser to mobile width (< 768px)
- [ ] Test mobile menu toggle
- [ ] Verify cards stack properly
- [ ] Check toast notifications fit screen

---

## Performance Check
- [ ] Animations are smooth (no jank)
- [ ] Page loads quickly
- [ ] No console errors
- [ ] Counters animate smoothly

---

## Accessibility Check
- [ ] Tab through interactive elements
- [ ] Focus rings are visible
- [ ] Forms can be submitted with Enter key
- [ ] All text is readable

---

## Common Issues & Solutions

**Issue:** Counters don't animate
- **Solution:** Scroll to stats section - they trigger on scroll

**Issue:** Skeleton screens don't show
- **Solution:** Refresh page - they show for 0.5s on load

**Issue:** Toast notifications don't appear
- **Solution:** Check browser console for errors

**Issue:** Animations are choppy
- **Solution:** Close other browser tabs, check CPU usage

---

## Next Steps After Testing

1. ✅ Verify all features work as expected
2. ✅ Test on different browsers
3. ✅ Test on mobile devices
4. ✅ Deploy to production when ready

## Need Help?
- Check the [walkthrough.md](file:///C:/Users/Acer/.gemini/antigravity/brain/3b141c04-54ba-4968-b8a6-e50b03a4120a/walkthrough.md) for detailed documentation
- Review the [implementation_plan.md](file:///C:/Users/Acer/.gemini/antigravity/brain/3b141c04-54ba-4968-b8a6-e50b03a4120a/implementation_plan.md) for technical details
