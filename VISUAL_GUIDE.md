# 🎨 Pricing Feature - Visual Guide

## UI Preview

### 1. Dashboard with Pricing Section

```
┌─────────────────────────────────────────────────────────────────────┐
│ PassKey          [Search.....................] [+Add] [⚙] [Exit]   │
└─────────────────────────────────────────────────────────────────────┘
│                                                                       │
│ ┌─────────────────────┐  ┌────────────────────────────────────────┐ │
│ │   LEFT SIDEBAR      │  │      MAIN CONTENT                      │ │
│ │                     │  │                                        │ │
│ │ ┌─────────────────┐ │  │ ┌──────────┐ ┌──────────┐              │ │
│ │ │💳 Pricing Plans │ │  │ │  Total   │ │  Weak    │              │ │
│ │ │Current: Free    │ │  │ │ Accounts │ │ Passwords│              │ │
│ │ │0/5 today ▼      │ │  │ │    8     │ │    2     │              │ │
│ │ └─────────────────┘ │  │ └──────────┘ └──────────┘              │ │
│ │                     │  │                                        │ │
│ │ ┌─────────────────┐ │  │ ┌────────────┐ ┌────────────┐          │ │
│ │ │ 🎯 Categories   │ │  │ │   Gmail    │ │  Facebook  │          │ │
│ │ │ All ✓           │ │  │ │  user@...  │ │ fb_user    │          │ │
│ │ │ Social Media    │ │  │ │ [Edit] [X] │ │ [Edit] [X] │          │ │
│ │ │ Email           │ │  │ └────────────┘ └────────────┘          │ │
│ │ │ Banking         │ │  │                                        │ │
│ │ │ Finance         │ │  │ ┌────────────┐ ┌────────────┐          │ │
│ │ │ Work            │ │  │ │  LinkedIn  │ │   GitHub   │          │ │
│ │ │ Office          │ │  │ │  linked... │ │ gh_user    │          │ │
│ │ │ Shopping        │ │  │ │ [Edit] [X] │ │ [Edit] [X] │          │ │
│ │ │ Personal        │ │  │ └────────────┘ └────────────┘          │ │
│ │ │ Other           │ │  │                                        │ │
│ │ │                 │ │  │                                        │ │
│ │ │ ⭐ Favorites     │ │  │                                        │ │
│ │ │ ⭐ Gmail        │ │  │                                        │ │
│ │ └─────────────────┘ │  │                                        │ │
│ │                     │  │                                        │ │
│ └─────────────────────┘  └────────────────────────────────────────┘ │
│                                                                       │
└─────────────────────────────────────────────────────────────────────┘
```

---

### 2. Expanded Pricing Section

```
┌─────────────────────────────────────────────────────┐
│💳 Pricing Plans                                     │
│Current: Free • 0/5 passwords added today      ▲     │
├─────────────────────────────────────────────────────┤
│                                                     │
│ ┌──────────┐  ┌──────────────┐  ┌──────────────┐   │
│ │  FREE    │  │  PREMIUM ⭐  │  │ ENTERPRISE 👑│   │
│ │          │  │              │  │              │   │
│ │   ₹0     │  │   ₹499       │  │    ₹999      │   │
│ │          │  │   /month     │  │    /month    │   │
│ │ [Get]    │  │ [Upgrade]    │  │ [Upgrade]    │   │
│ │          │  │              │  │              │   │
│ │ ✓ 5/day  │  │ ✓ Unlimited  │  │ ✓ Unlimited  │   │
│ │ ✓ Search │  │ ✓ History    │  │ ✓ History    │   │
│ │ ✓ Cats   │  │ ✓ Dark Mode  │  │ ✓ Dark Mode  │   │
│ │          │  │ ✓ Adv Search │  │ ✓ Adv Search │   │
│ │          │  │ ✓ Favorites  │  │ ✓ Favorites  │   │
│ │          │  │              │  │ ✓ Team Share │   │
│ │          │  │              │  │ ✓ Analytics  │   │
│ │          │  │              │  │ ✓ Priority   │   │
│ └──────────┘  └──────────────┘  └──────────────┘   │
│                                                     │
└─────────────────────────────────────────────────────┘
```

---

### 3. Upgrade Modal (When Limit Reached)

```
┌────────────────────────────────────────────────────┐
│ ⚠️ Plan Limit Reached                         [X]  │
├────────────────────────────────────────────────────┤
│                                                    │
│ You've reached your daily password limit on the   │
│ Free plan                                         │
│                                                    │
│ ┌──────────────────────────────────────────────┐  │
│ │ Free Plan: Limited to 5 passwords per day    │  │
│ │ You have 0 passwords remaining for today.    │  │
│ └──────────────────────────────────────────────┘  │
│                                                    │
│ Upgrade to unlock unlimited passwords:           │
│                                                    │
│ ⚡ PREMIUM PLAN                                   │
│    ₹499/month                                     │
│    • Unlimited passwords                          │
│    • Password history                             │
│    • Dark mode                                    │
│    • Advanced search                              │
│    [Upgrade to Premium]                           │
│                                                    │
│ 👑 ENTERPRISE PLAN                                │
│    ₹999/month                                     │
│    • All Premium features                         │
│    • Team sharing                                 │
│    • Analytics dashboard                          │
│    • Priority support                             │
│    [Upgrade to Enterprise]                        │
│                                                    │
└────────────────────────────────────────────────────┘
```

---

### 4. Pricing Card Details

#### Free Plan Card
```
┌──────────────────────┐
│  📈 Free             │
│                      │
│  ₹0                  │
│  Forever free        │
│                      │
│  [Get Started]       │
│                      │
│  ✓ Up to 5 password  │
│  ✓ Basic search      │
│  ✓ Categories        │
│                      │
└──────────────────────┘
```

#### Premium Plan Card (Most Popular)
```
┌─────────────────────────────┐
│        Most Popular ⭐      │
├─────────────────────────────┤
│  ⚡ Premium                 │
│                              │
│  ₹499 /month                │
│                              │
│  [Upgrade Now]              │
│                              │
│  ✓ Unlimited passwords       │
│  ✓ Password history          │
│  ✓ Dark mode                 │
│  ✓ Advanced search           │
│  ✓ Favorites                 │
│                              │
└─────────────────────────────┘
```

#### Enterprise Plan Card
```
┌──────────────────────┐
│  👑 Enterprise       │
│                      │
│  ₹999 /month         │
│                      │
│  [Upgrade Now]       │
│                      │
│  ✓ All Premium       │
│  ✓ Team sharing      │
│  ✓ Analytics         │
│  ✓ Priority support  │
│  ✓ Custom policies   │
│                      │
└──────────────────────┘
```

---

## Color Scheme

### Plan Colors

```
Free Plan
  Primary:    #6B7280 (Gray-500)
  Background: rgba(107, 114, 128, 0.1)
  Border:     rgba(255, 255, 255, 0.1)
  Icon:       📈 Trending Up

Premium Plan ⭐
  Primary:    #A78BFA (Purple-300)
  Secondary:  #60A5FA (Blue-300)
  Background: rgba(168, 139, 250, 0.2)
  Border:     rgba(168, 139, 250, 0.6)
  Icon:       ⚡ Zap
  Badge:      "Most Popular"

Enterprise Plan 👑
  Primary:    #FBBF24 (Amber-400)
  Secondary:  #F97316 (Orange-500)
  Background: rgba(251, 191, 36, 0.2)
  Border:     rgba(251, 191, 36, 0.6)
  Icon:       👑 Crown
```

---

## Typography

### Hierarchy

```
Pricing Section Header
  Font: Bold
  Size: 18px (1.125rem)
  Color: Gradient (Purple → Blue)
  Example: "💳 Pricing Plans"

Plan Name
  Font: Bold
  Size: 20px (1.25rem)
  Color: White
  Example: "Premium"

Price
  Font: Bold
  Size: 36px (2.25rem)
  Color: Gradient (Purple → Blue)
  Example: "₹499"

Price Interval
  Font: Medium
  Size: 14px (0.875rem)
  Color: Gray-400
  Example: "/month"

Feature List
  Font: Regular
  Size: 14px (0.875rem)
  Color: Gray-300
  Example: "✓ Unlimited passwords"

Button Text
  Font: Semibold
  Size: 16px (1rem)
  Color: White
  Example: "Upgrade Now"
```

---

## Responsive Breakpoints

### Mobile View (< 768px)

```
Full Width Layout
┌──────────────────────┐
│  Pricing Section     │
│  • Collapsible       │
│  • Full width        │
│  • Single card view  │
└──────────────────────┘

When Expanded:
┌──────────────────────┐
│  Free Card           │
├──────────────────────┤
│  Premium Card        │
├──────────────────────┤
│  Enterprise Card     │
└──────────────────────┘
```

### Tablet View (768px - 1024px)

```
Grid: 2 Columns
┌────────────────┬────────────────┐
│  Free Card     │  Premium Card  │
├────────────────┼────────────────┤
│  Enterprise Card (spans 2)      │
└─────────────────────────────────┘
```

### Desktop View (> 1024px)

```
Grid: 3 Columns
┌────────────────┬──────────────────────┬────────────────┐
│  Free Card     │  Premium Card        │ Enterprise Card│
│                │  (Slightly larger)   │                │
│                │  Most Popular Badge  │                │
└────────────────┴──────────────────────┴────────────────┘
```

---

## Animation States

### Pricing Section Expand/Collapse
```
Initial (Collapsed):
  Height: Auto
  Max-height: 60px
  Opacity: 1

Expanded:
  Height: Auto
  Max-height: 800px
  Opacity: 1
  Cards: Fade in (0.3s)

Duration: 0.3s ease-in-out
```

### Card Hover Effects
```
On Hover:
  Scale: 1.02 (slight zoom)
  Border Color: Brighter
  Shadow: Added/Enhanced
  Duration: 0.3s

Premium Card (Desktop):
  Base Scale: 1.05 (slightly larger)
  Hover Scale: 1.07
```

### Button States
```
Normal:
  Background: Gradient
  Shadow: Light
  Cursor: Pointer

Hover:
  Background: Darker gradient
  Shadow: Larger
  Transform: Slight scale

Active/Clicked:
  Background: Solid color
  Opacity: 0.8

Disabled (Current Plan):
  Background: Green with opacity
  Cursor: Default
  Shadow: None
  Text: "Current Plan"
```

---

## Icon Usage

```
Free Plan:
  📈 TrendingUp (from lucide-react)
  Size: 24px (w-6 h-6)
  Color: Gray-300

Premium Plan:
  ⚡ Zap (from lucide-react)
  Size: 24px (w-6 h-6)
  Color: Purple-300

Enterprise Plan:
  👑 Crown (from lucide-react)
  Size: 24px (w-6 h-6)
  Color: Amber-400

Feature Checkmarks:
  ✓ Check (from lucide-react)
  Size: 20px (w-5 h-5)
  Color: Plan-specific (Blue/Purple/Amber)

Collapse/Expand:
  ▼ ChevronDown (from lucide-react)
  ▲ ChevronUp (from lucide-react)
  Size: 20px (w-5 h-5)
  Color: Gray-400
```

---

## spacing & Layout

### Pricing Section Padding
```
Container Padding:    1.5rem (24px)
Card Padding:         2rem (32px)
Feature Gap:          1rem (16px)
Button Padding:       0.75rem 1rem (12px 16px)
Modal Padding:        2rem (32px)
```

### Grid Gaps
```
Mobile:   1rem (16px) - 1.5rem (24px)
Tablet:   1.5rem (24px)
Desktop:  1.5rem (24px)
```

---

## Accessibility Features

```
Keyboard Navigation:
  • Tab: Navigate buttons
  • Enter: Activate button
  • Esc: Close modal

ARIA Labels:
  • Button roles
  • Modal role="dialog"
  • Semantic HTML

Color Contrast:
  • Text on background: ≥ 4.5:1
  • UI components: ≥ 3:1

Font Size:
  • Minimum: 14px
  • Readable on all screens

Touch Targets:
  • Minimum: 44px × 44px
```

---

## Interactive Examples

### User Adds 6th Password

```
Step 1: Click "Add"
  Dashboard → handleAddPassword()

Step 2: Check Limit
  canAddPassword() → false

Step 3: Show Modal
  setShowUpgradeModal(true)
  ↓
  ┌────────────────────────────────────┐
  │ ⚠️ Plan Limit Reached               │
  │ You have 0 passwords remaining      │
  │                                     │
  │ [Upgrade to Premium]  [Upgrade...]  │
  └────────────────────────────────────┘

Step 4: Click Upgrade
  subscribeToPlan('premium')
  ↓
  Modal closes
  Plan changes to Premium
  ✅ Can now add unlimited passwords
```

---

## Dark Mode Implementation

All components use Tailwind dark mode classes:

```
Light Mode (not default, but supported):
  Text: Gray-900 → White (dark)
  BG: White → Slate-950 (dark)
  Border: Gray-200 → White/10 (dark)

Dark Mode (Default):
  bg-slate-950        Main background
  bg-white/5          Card backgrounds
  text-white          Main text
  text-gray-300       Secondary text
  border-white/10     Border color
  border-white/20     Hover border
```

---

*Visual Guide Created: January 20, 2026*
