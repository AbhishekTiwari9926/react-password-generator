# 🏗️ Pricing Feature Architecture

## System Architecture Diagram

```
┌─────────────────────────────────────────────────────────────────┐
│                          App Root                               │
│                                                                   │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │              PricingProvider (Context)                  │  │
│  │  Manages:                                               │  │
│  │  • currentPlan (free/premium/enterprise)               │  │
│  │  • passwordsAddedToday (0-5 counter)                   │  │
│  │  • Daily limit logic                                    │  │
│  │  • Subscribe functions                                  │  │
│  └──────────────────────────────────────────────────────────┘  │
│         ↓                                                         │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │                  Dashboard Component                     │  │
│  │                                                           │  │
│  │  ┌───────────────────┐  ┌──────────────────────────┐   │  │
│  │  │   LEFT SIDEBAR    │  │    MAIN CONTENT AREA    │   │  │
│  │  │                   │  │                          │   │  │
│  │  │ ┌─────────────┐   │  │ • Password Cards        │   │  │
│  │  │ │  Pricing    │   │  │ • Stats                │   │  │
│  │  │ │  Section    │   │  │ • Filtered View        │   │  │
│  │  │ │ (Collapsible)   │  │                          │   │  │
│  │  │ └─────────────┘   │  │                          │   │  │
│  │  │ ┌─────────────┐   │  │                          │   │  │
│  │  │ │ Generator   │   │  │                          │   │  │
│  │  │ │ (Optional)  │   │  │                          │   │  │
│  │  │ └─────────────┘   │  │                          │   │  │
│  │  │ ┌─────────────┐   │  │                          │   │  │
│  │  │ │ Categories  │   │  │                          │   │  │
│  │  │ │ & Favorites │   │  │                          │   │  │
│  │  │ └─────────────┘   │  │                          │   │  │
│  │  └───────────────────┘  └──────────────────────────┘   │  │
│  │                                                           │  │
│  │  ┌───────────────────────────────────────────────────┐  │  │
│  │  │            Floating Modals                        │  │  │
│  │  │ • PasswordModal                                   │  │  │
│  │  │ • SettingsPanel                                   │  │  │
│  │  │ • UpgradeModal (NEW) ← Shows when limit reached   │  │  │
│  │  └───────────────────────────────────────────────────┘  │  │
│  └──────────────────────────────────────────────────────────┘  │
│                                                                   │
└─────────────────────────────────────────────────────────────────┘
```

---

## Component Dependency Tree

```
main.jsx
  └── App.jsx
        └── Dashboard.jsx
              ├── PricingSection.jsx ✨ NEW
              │     └── PricingCard.jsx ✨ NEW (×3 for plans)
              │
              ├── PasswordGenerator.jsx
              ├── PasswordCard.jsx
              ├── PasswordModal.jsx
              ├── SettingsPanel.jsx
              └── UpgradeModal.jsx ✨ NEW

PricingProvider ✨ NEW (Wraps all components)
  └── Provides: usePricing() hook
```

---

## Data Flow Diagram

```
┌─────────────────────────────────────────────────────────────┐
│                 User Interaction                             │
│                                                               │
│  1. User logs in                                             │
│     └─→ Assigned to Free Plan                               │
│         └─→ PricingProvider initializes                     │
│             └─→ currentPlan = 'free'                        │
│                 passwordsAddedToday = 0                     │
└─────────────────────────────────────────────────────────────┘
              ↓
┌─────────────────────────────────────────────────────────────┐
│           User Adds Passwords (Free Plan)                   │
│                                                               │
│  Each Addition:                                              │
│  1. Click "Add Password"                                     │
│  2. Dashboard calls handleAddPassword()                      │
│  3. Check: canAddPassword() ?                               │
│     ├─→ YES (< 5):  Add password + increment counter        │
│     └─→ NO (≥ 5):   Show UpgradeModal                      │
│  4. User sees toast notification                            │
└─────────────────────────────────────────────────────────────┘
              ↓
┌─────────────────────────────────────────────────────────────┐
│           Daily Counter Reset (Automatic)                   │
│                                                               │
│  Midnight Reset:                                             │
│  1. System detects date change                              │
│  2. Compares lastPasswordAddDate with today                │
│  3. If changed: Reset passwordsAddedToday = 0              │
│  4. User can add 5 more passwords                          │
└─────────────────────────────────────────────────────────────┘
              ↓
┌─────────────────────────────────────────────────────────────┐
│           Upgrade Flow                                       │
│                                                               │
│  1. UpgradeModal shows options                              │
│  2. User clicks "Premium" or "Enterprise"                   │
│  3. Call: subscribeToPlan('premium')                        │
│  4. Context updates:                                         │
│     ├─→ currentPlan = 'premium'                            │
│     ├─→ passwordsAddedToday = 0 (reset)                   │
│     └─→ Modal closes                                        │
│  5. User now has unlimited passwords                        │
└─────────────────────────────────────────────────────────────┘
```

---

## PricingContext API

```javascript
╔════════════════════════════════════════════════════════════╗
║            usePricing() Hook API                           ║
╚════════════════════════════════════════════════════════════╝

STATE:
  • currentPlan: 'free' | 'premium' | 'enterprise'
  • passwordsAddedToday: number (0-5 for free, ignored for others)
  • lastPasswordAddDate: string (MM/DD/YYYY)
  • showUpgradeModal: boolean

FUNCTIONS:
  • subscribeToPlan(plan: string) → void
    Changes user's plan immediately
    
  • canAddPassword() → boolean
    Returns true if user can add another password
    
  • incrementPasswordCount() → void
    Increments daily counter after password added
    
  • getRemainingPasswords() → number
    Returns remaining passwords for today
    (Infinity for Premium/Enterprise)
    
  • resetDailyCounter() → void
    Resets counter when date changes

PLAN LIMITS:
  planLimits.free = {
    name: 'Free',
    price: '₹0',
    passwordsPerDay: 5,
    features: ['Up to 5 passwords', ...]
  }
  planLimits.premium = {
    name: 'Premium',
    price: '₹499',
    interval: '/month',
    features: ['Unlimited passwords', ...]
  }
  planLimits.enterprise = {
    name: 'Enterprise',
    price: '₹999',
    interval: '/month',
    features: ['All Premium features', ...]
  }
```

---

## State Management Flow

```
PricingContext
  │
  ├─── currentPlan ────┬─→ PricingSection (displays current)
  │                     ├─→ PricingCard (highlights active)
  │                     └─→ Dashboard (check permissions)
  │
  ├─── passwordsAddedToday ─┬─→ PricingSection (show "X/5")
  │                          └─→ UpgradeModal (show remaining)
  │
  ├─── lastPasswordAddDate ──→ Auto-reset logic (midnight)
  │
  └─── showUpgradeModal ──→ UpgradeModal (control visibility)
```

---

## UI Component Hierarchy

```
Dashboard
├── Header
│   ├── Logo
│   ├── Search Bar
│   └── Action Buttons
│
├── Main Grid (2 columns)
│   │
│   ├─ Left Sidebar (1/4 width)
│   │   │
│   │   ├─ PricingSection ✨
│   │   │   │ (Collapsible)
│   │   │   ├─ Current Plan Badge
│   │   │   ├─ Daily Counter
│   │   │   └─ 3× PricingCard ✨
│   │   │       ├─ Free Card
│   │   │       ├─ Premium Card (Popular)
│   │   │       └─ Enterprise Card
│   │   │
│   │   ├─ PasswordGenerator (Optional)
│   │   │
│   │   └─ Categories & Favorites
│   │
│   └─ Main Content (3/4 width)
│       ├─ Stats Cards
│       └─ Password Cards Grid
│
└─ Modals Layer
    ├─ PasswordModal
    ├─ SettingsPanel
    └─ UpgradeModal ✨
        ├─ Alert Header
        ├─ Plan Comparison
        └─ Upgrade Buttons
```

---

## Feature Integration Points

```
1. PASSWORD ADDITION
   ├─ User clicks "Add"
   ├─ Dashboard.handleAddPassword()
   ├─ Check: usePricing.canAddPassword()
   ├─ If false: Show UpgradeModal
   ├─ If true: Add + incrementPasswordCount()
   └─ Show success toast

2. PRICING DISPLAY
   ├─ Dashboard mounts
   ├─ PricingSection renders in sidebar
   ├─ Show current plan + usage counter
   ├─ Expandable to show all 3 plans
   └─ Each card clickable to subscribe

3. DAILY RESET
   ├─ PricingContext on mount
   ├─ Compare date with today
   ├─ If different: Reset counter
   ├─ resetDailyCounter() runs
   └─ Ready for new day's quota

4. UPGRADE FLOW
   ├─ User hits password limit
   ├─ UpgradeModal appears
   ├─ Click upgrade button
   ├─ subscribeToPlan() called
   ├─ Plan changes immediately
   └─ Modal closes
```

---

## File Organization

```
src/
├── components/
│   ├── Dashboard.jsx         (Updated: pricing integration)
│   ├── Login.jsx
│   ├── PasswordCard.jsx
│   ├── PasswordGenerator.jsx
│   ├── PasswordModal.jsx
│   ├── SettingsPanel.jsx
│   ├── PassKeyLogo.jsx
│   │
│   ├── PricingCard.jsx        ✨ NEW
│   ├── PricingSection.jsx     ✨ NEW
│   └── UpgradeModal.jsx       ✨ NEW
│
├── context/
│   ├── PasswordManagerContext.jsx
│   ├── ToastContext.jsx
│   └── PricingContext.jsx     ✨ NEW
│
├── utils/
│   ├── encryption.js
│   ├── passwordGenerator.js
│   └── categoryIcons.jsx
│
├── App.jsx                    (Updated: import pricing)
├── main.jsx                   (Updated: provider wrapper)
├── App.css
├── index.css
└── main.jsx
```

---

## Request/Response Flow

```
┌─ User Action
│
├─ PricingContext Check
│  └─ Validates against plan limits
│
├─ Dashboard Component Update
│  └─ Updates UI based on context
│
├─ Modal System
│  ├─ UpgradeModal (if limit reached)
│  └─ PasswordModal (for adding/editing)
│
└─ Toast Notification
   └─ Feedback to user

Example Flow (Adding 6th Password):
  
  Click "Add" Button
        ↓
  handleAddPassword()
        ↓
  Check: canAddPassword()
        ↓ Returns FALSE
        ↓
  setShowUpgradeModal(true)
        ↓
  UpgradeModal displays
        ↓
  User clicks "Premium" button
        ↓
  subscribeToPlan('premium')
        ↓
  Context updates currentPlan
        ↓
  Modal closes
        ↓
  Toast shows success
```

---

## Mobile Responsiveness

```
Mobile (<768px)
  ├─ Single column layout
  ├─ PricingSection takes full width
  ├─ Cards stack vertically
  └─ Modal full-screen with padding

Tablet (768px-1024px)
  ├─ 2-column grid
  ├─ Sidebar adjusts width
  ├─ Cards in 2 columns
  └─ Modal centered with max-width

Desktop (>1024px)
  ├─ 4-column grid (1 sidebar + 3 content)
  ├─ Sidebar sticky
  ├─ Cards in 3 columns
  ├─ Premium scaled up (md:scale-105)
  └─ Modal max-width 2xl
```

---

## Error Handling Flow

```
Try to add password
  ├─ Check canAddPassword()
  │  ├─ If error: Log and show fallback
  │  └─ Proceed or block
  │
  ├─ Add to state
  │  ├─ If error: Show error toast
  │  └─ Success: Continue
  │
  ├─ Increment counter
  │  ├─ If error: Silently fail (already added)
  │  └─ Success: Update UI
  │
  └─ Show result toast
     ├─ Success message
     ├─ Warning if near limit
     └─ Error if failed
```

---

*Diagram created January 20, 2026*
