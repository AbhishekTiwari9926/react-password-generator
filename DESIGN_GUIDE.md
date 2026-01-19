# Pass Key - Visual Design Guide

## 🎨 Design System Overview

This document outlines the complete visual design system for the Pass Key password manager.

---

## 📐 Color Palette

### Primary Gradient
```
From: #8B5CF6 (Purple-500)
To:   #3B82F6 (Blue-500)
Via:  #06B6D4 (Cyan-500)
```

### Secondary Colors
- **Green**: #10B981 (Success, Finance)
- **Red**: #EF4444 (Error, Weak)
- **Yellow**: #FBBF24 (Warning, Medium)
- **Orange**: #F97316 (Alerts, Settings)

### Neutral Colors
- **Dark Background**: #1C1917 (slate-950)
- **Medium Background**: #1E293B (slate-900)
- **Light Text**: #F1F5F9 (slate-100)
- **Muted Text**: #A1A1AA (gray-400)

---

## 🎯 Category Color Mapping

### Social Media Categories
```
Social Media     → Blue (Globe icon)
Facebook         → Blue-500
Instagram        → Pink-Purple gradient
Twitter/X        → Sky Blue
LinkedIn         → Dark Blue
GitHub           → Gray-900
```

### Service Categories
```
Email            → Red (Mail icon)
Banking          → Green (Dollar Sign icon)
Finance          → Emerald-Teal (Credit Card icon)
Work             → Purple (Briefcase icon)
Office           → Indigo (File Text icon)
Shopping         → Orange (Shopping Cart icon)
Personal         → Rose-Pink (Heart icon)
Other            → Gray (More icon)
```

---

## 🔲 Component Styling

### Cards
```
Border Radius: rounded-2xl, rounded-3xl
Padding: p-5, p-6
Background: bg-white/5, bg-white/10, bg-gradient-to-br
Border: border-white/10, border-white/20, border-white/30
Shadows: shadow-lg, shadow-2xl
Hover: border-white/30, shadow-lg with color tint
```

### Buttons
```
Primary:
  - Background: bg-gradient-to-r from-purple-500 to-blue-500
  - Hover: from-purple-600 to-blue-600
  - Padding: py-2.5, px-4
  - Border Radius: rounded-xl

Secondary:
  - Background: bg-white/10
  - Hover: bg-white/20
  - Padding: py-2.5, px-4
  - Border Radius: rounded-xl

Danger:
  - Background: from-red-500/40 to-rose-500/40
  - Hover: from-red-500/60 to-rose-500/60
  - Border: border-red-500/30
```

### Input Fields
```
Background: bg-white/10
Border: border-white/20
Focus: border-purple-400, ring-2, ring-purple-400/50
Border Radius: rounded-xl
Padding: px-4, py-2.5
Text Color: text-white
Placeholder: text-gray-400
```

### Icons
```
Size: w-4, w-5, w-6
Color: text-white, text-gray-300, text-{color}-300
Container: bg-gradient-to-br, rounded-full, p-2
```

---

## 🎬 Animations & Transitions

### Transitions
```
Default: transition-all 200ms
Colors: transition-colors 200ms
Buttons: hover:shadow-{color}/50
Cards: hover:border-white/30, hover:shadow-lg
```

### Hover States
```
Buttons: scale brightness and shadow changes
Cards: border brightens, shadow increases
Links: color changes smoothly
Icons: color transitions smoothly
```

### Backdrop Effects
```
Blur: backdrop-blur-xl, backdrop-blur-md
```

---

## 📏 Spacing System

### Padding
- Small: p-2, p-3
- Medium: p-4, p-5, p-6
- Large: p-8

### Margins
- Gap: gap-2, gap-3, gap-4
- Space-y: space-y-2, space-y-3, space-y-4

### Border Radius
- Small: rounded-lg
- Medium: rounded-xl
- Large: rounded-2xl, rounded-3xl

---

## 📱 Responsive Breakpoints

```
Mobile: < 640px
Tablet: 640px - 1024px
Desktop: > 1024px
```

Used with Tailwind's responsive prefixes:
- `sm:` for 640px+
- `md:` for 768px+
- `lg:` for 1024px+

---

## 🔐 Security-Focused Design

### Visual Indicators
```
Strong Password   → Green gradient
Medium Password   → Blue gradient
Weak Password     → Yellow gradient
Very Weak         → Red gradient
```

### Trust Elements
```
Encryption Icon   → Lock symbol
Checkmarks        → ✓ symbols
Shields           → For security features
Badges            → For status indicators
```

---

## ♿ Accessibility Features

### Contrast Ratios
- Text on backgrounds: 4.5:1 or higher
- Large text: 3:1 or higher

### Focus States
- Ring: ring-2, ring-purple-400/50
- Border: border-purple-400
- Visible outline on all interactive elements

### Color Independence
- Not relying only on color for information
- Using icons + colors for category identification
- Text labels for all buttons

---

## 🎨 Logo Design

### Pass Key Logo
- **Shape**: Shield + Key combination
- **Colors**: Purple to Blue gradient
- **Style**: Minimal, flat, modern SaaS
- **Sizes**: sm (24px), md (40px), lg (48px), xl (64px)

### Usage
```jsx
import { PassKeyLogo, PassKeyLogoText } from './components/PassKeyLogo';

// Logo only
<PassKeyLogo size="md" />

// Logo with text
<PassKeyLogoText size="md" showText={true} />
```

---

## 📊 Typography

### Font Weights
- Regular: font-normal (400)
- Medium: font-medium (500)
- Semibold: font-semibold (600)
- Bold: font-bold (700)

### Font Sizes
- xs: 12px
- sm: 14px
- base: 16px
- lg: 18px
- xl: 20px
- 2xl: 24px
- 3xl: 30px
- 4xl: 36px

### Font Colors
- Primary: text-white
- Secondary: text-gray-300
- Tertiary: text-gray-400
- Muted: text-gray-500

---

## 🌈 Gradient Combinations

### Default Combinations
```
Purple → Blue:        from-purple-500 to-blue-500
Blue → Cyan:          from-blue-500 to-cyan-500
Purple → Cyan:        from-purple-400 to-cyan-400
Green → Emerald:      from-green-500 to-emerald-500
Yellow → Amber:       from-yellow-500 to-amber-500
Orange → Amber:       from-orange-500 to-amber-500
Red → Rose:           from-red-500 to-rose-500
Cyan → Blue:          from-cyan-500 to-blue-500
```

### Opacity Variations
- 10%: for very subtle backgrounds
- 15%: for slightly stronger backgrounds
- 20%: for card backgrounds
- 30%: for hover states
- 40%: for password card backgrounds
- 50%: for borders and thin elements

---

## 🚀 Component Library

### Available Components
1. **PassKeyLogo** - Logo component
2. **CategoryIcon** - Category icon with gradient
3. **Dashboard** - Main dashboard view
4. **PasswordCard** - Individual password display
5. **PasswordModal** - Add/edit password form
6. **PasswordGenerator** - Generate passwords
7. **SettingsPanel** - App settings
8. **Login** - Authentication page

### Utilities
1. **getCategoryIcon()** - Get icon and color for category
2. **CategoryIcon** - Component wrapper for icons

---

## 🎯 Design Principles

1. **Clarity** - Information is clear and easy to understand
2. **Security** - Visual design reinforces security/trust
3. **Consistency** - Colors, spacing, and components are consistent
4. **Accessibility** - WCAG AA compliant
5. **Modern** - Contemporary design with gradients and glass morphism
6. **Responsive** - Works on all screen sizes
7. **Performance** - Minimal animations, optimized

---

## 📝 Best Practices

### When Adding New Features
1. Use existing color palette
2. Maintain spacing consistency
3. Follow button styling patterns
4. Use gradient where appropriate
5. Test accessibility
6. Ensure mobile responsiveness

### Icon Usage
1. Use consistent size (w-4, w-5, w-6)
2. Use consistent colors
3. Pair with text labels
4. Use icon + gradient in badges

### Color Usage
1. Primary: Purple-Blue gradient
2. Success: Green
3. Warning: Yellow
4. Error: Red
5. Info: Cyan/Blue

---

## 🔗 Resource Files

- **Logo**: `src/components/PassKeyLogo.jsx`
- **Icons**: `src/utils/categoryIcons.jsx`
- **Components**: `src/components/*.jsx`
- **Utilities**: `src/utils/*.js`

---

This design guide ensures consistency and quality across the entire Pass Key application.
