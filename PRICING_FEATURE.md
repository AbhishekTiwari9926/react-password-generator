# Pricing Feature Implementation Guide

## Overview
A comprehensive pricing system has been added to the PassKey password manager with three tiers: Free, Premium, and Enterprise. The feature includes plan management, upgrade modals, and daily password limits.

---

## 📦 New Components & Files

### 1. **PricingContext** (`src/context/PricingContext.jsx`)
Manages all pricing-related state and logic:

#### Features:
- **Plan Management**: Track current user plan (Free, Premium, Enterprise)
- **Daily Limits**: Enforces 5 passwords/day limit for Free plan
- **Plan Features**:
  - **Free**: ₹0, 5 passwords/day, basic features
  - **Premium**: ₹499/month, unlimited passwords, password history, dark mode
  - **Enterprise**: ₹999/month, all Premium features + team sharing, analytics

#### Key Functions:
- `subscribeToPlan(plan)` - Subscribe to a specific plan
- `canAddPassword()` - Check if user can add more passwords today
- `incrementPasswordCount()` - Track daily password additions
- `getRemainingPasswords()` - Get remaining passwords for Free plan users
- `resetDailyCounter()` - Reset counter at midnight

#### State Management:
```javascript
currentPlan       // 'free', 'premium', or 'enterprise'
passwordsAddedToday  // Counter for daily limits
lastPasswordAddDate  // Track date for daily reset
showUpgradeModal    // Control upgrade modal visibility
```

---

### 2. **PricingCard Component** (`src/components/PricingCard.jsx`)
Displays individual pricing plan cards with:

#### Features:
- Plan name, price, and features list
- Visual distinction (icons for Free/Premium/Enterprise)
- "Most Popular" badge for Premium plan
- "Current Plan" indicator for active plan
- Subscribe/Get Started buttons with hover effects
- Responsive grid layout (mobile-friendly)

#### Props:
```javascript
{
  plan: string,          // 'free', 'premium', 'enterprise'
  name: string,          // Display name
  price: string,         // Price with currency
  interval: string,      // '/month' or similar
  features: array,       // List of features
  isActive: boolean,     // Highlight if current plan
  onClick: function,     // Handle subscription
  isPopular: boolean     // Show popular badge
}
```

---

### 3. **UpgradeModal Component** (`src/components/UpgradeModal.jsx`)
Shows when Free plan users hit daily password limit:

#### Features:
- Alert notification about plan limit
- Shows remaining passwords available
- Displays Premium and Enterprise upgrade options
- Quick upgrade buttons with plan details
- Informative feature comparisons
- Modal closes after upgrade selection

#### Triggers When:
- User tries to add a 6th password on Free plan
- Shows remaining passwords available
- Offers upgrade path with feature highlights

---

### 4. **PricingSection Component** (`src/components/PricingSection.jsx`)
Collapsible sidebar widget for Dashboard:

#### Features:
- Expandable/collapsible interface
- Shows current plan at a glance
- Displays daily password counter for Free plan
- Grid layout of all 3 pricing plans
- Smooth animations and transitions

#### Location: Left sidebar in Dashboard

---

## 🔄 Integration Points

### Dashboard.jsx Updates:
1. **Imports**: Added usePricing hook and new components
2. **State Management**: Integrated pricing context
3. **Password Addition Logic**:
   ```javascript
   // Check limits before adding password
   if (!canAddPassword() && !editingEntry) {
     setShowUpgradeModal(true);
     return;
   }
   // Increment counter after successful addition
   incrementPasswordCount();
   ```
4. **UI Changes**:
   - Added PricingSection to sidebar
   - Integrated UpgradeModal in modals section
   - Toast notifications for upgrade prompts

### App.jsx Updates:
- Imports PricingProvider context

### main.jsx Updates:
- Wrapped App with PricingProvider
- Provider order: ToastProvider → PasswordManagerProvider → PricingProvider

---

## 💡 Usage Examples

### Check Password Limits:
```javascript
const { canAddPassword, getRemainingPasswords, currentPlan } = usePricing();

if (canAddPassword()) {
  // Safe to add password
  addPassword(data);
  incrementPasswordCount();
} else {
  // Show upgrade modal
  setShowUpgradeModal(true);
}
```

### Subscribe to Plan:
```javascript
const { subscribeToPlan } = usePricing();

// User clicks upgrade button
subscribeToPlan('premium');  // or 'enterprise'
```

### Display Plan Info:
```javascript
const { currentPlan, passwordsAddedToday, planLimits } = usePricing();

console.log(`Current: ${currentPlan}`);
console.log(`Added today: ${passwordsAddedToday}/5`);
console.log(`Features:`, planLimits[currentPlan].features);
```

---

## 🎨 UI/UX Features

### Pricing Cards:
- **Color Scheme**:
  - Free: Gray gradient
  - Premium: Purple/Blue gradient with "Most Popular" badge
  - Enterprise: Gold/Amber gradient
- **Icons**: Trending Up (Free), Zap (Premium), Crown (Enterprise)
- **Responsive**: 1 column (mobile), 2 columns (tablet), 3 columns (desktop)
- **Premium Scale**: Slightly larger on desktop (md:scale-105)

### Upgrade Modal:
- Alert icon and clear messaging
- Shows remaining passwords
- Feature comparisons side-by-side
- Distinct CTA buttons for each plan
- Dark theme with gradient overlays

### PricingSection Sidebar:
- Collapsible for space efficiency
- Shows current plan and daily usage
- Expands to show full pricing table
- Sticky position in sidebar

---

## 📊 Daily Limit System

### How It Works:
1. **Initialization**: Free plan starts with 0/5 passwords per day
2. **Tracking**: Each password addition increments counter
3. **Reset**: Counter resets at midnight (checked on component mount/user activity)
4. **Premium/Enterprise**: No daily limits (returns Infinity)

### User Experience:
- Free users see "5/5 passwords added today" in sidebar
- 6th password attempt shows UpgradeModal
- Toast notification explains why upgrade is needed
- Remaining passwords shown in upgrade modal

---

## 🔒 Data Persistence

Currently, pricing plan is stored in context (session-based). For production:
- Save to localStorage/database
- Link with user authentication
- Track subscription dates
- Handle plan expiration/renewal

---

## 📝 Future Enhancements

1. **Payment Integration**: Connect Razorpay/Stripe for real payments
2. **Subscription Management**: Cancel/pause/upgrade plans
3. **Usage Analytics**: Track password additions, security scores
4. **Team Features**: Invite members, manage permissions
5. **Backup & Sync**: Cloud backup for Premium/Enterprise
6. **Advanced Security**: 2FA, biometric login for Premium
7. **Audit Logs**: Activity history for Enterprise

---

## ✅ Testing Checklist

- [ ] Free plan limits to 5 passwords/day
- [ ] Upgrade modal shows on 6th password attempt
- [ ] Subscribing to Premium/Enterprise removes limit
- [ ] Daily counter resets at midnight
- [ ] Plan status displays correctly in sidebar
- [ ] All pricing cards render correctly
- [ ] Responsive design works on all screen sizes
- [ ] Existing password functionality unchanged
- [ ] No console errors

---

## 🎯 Key Files Modified

| File | Changes |
|------|---------|
| `src/context/PricingContext.jsx` | ✨ New - Context management |
| `src/components/PricingCard.jsx` | ✨ New - Individual plan cards |
| `src/components/UpgradeModal.jsx` | ✨ New - Upgrade prompt modal |
| `src/components/PricingSection.jsx` | ✨ New - Sidebar widget |
| `src/components/Dashboard.jsx` | 🔄 Updated - Integrated pricing |
| `src/App.jsx` | 🔄 Updated - Import pricing context |
| `src/main.jsx` | 🔄 Updated - Wrapped with PricingProvider |

---

## 💰 Pricing Plans Summary

| Feature | Free | Premium | Enterprise |
|---------|------|---------|-----------|
| Price | ₹0 | ₹499/mo | ₹999/mo |
| Passwords/Day | 5 | ∞ | ∞ |
| Password History | ❌ | ✅ | ✅ |
| Dark Mode | ❌ | ✅ | ✅ |
| Advanced Search | ❌ | ✅ | ✅ |
| Team Sharing | ❌ | ❌ | ✅ |
| Analytics | ❌ | ❌ | ✅ |
| Support | Community | Email | Priority |

---

## 🚀 Getting Started

1. All components are fully integrated
2. Pricing section appears in Dashboard sidebar
3. Free plan automatically enforces 5 passwords/day limit
4. Upgrade modal triggers when limit is reached
5. Users can switch plans via pricing cards
6. All existing functionality preserved
