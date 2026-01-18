# VaultKey - Comprehensive Password Manager

A modern, secure, and user-friendly password manager built with React, featuring end-to-end encryption, beautiful UI with glassmorphism design, and extensive password management capabilities.

## 🎯 Features

### Core Functionality

#### Master Password System
- **Single Master Password**: Securely authenticate with a strong master password
- **Strong Password Validation**: 
  - Minimum 12 characters
  - Mix of uppercase and lowercase letters
  - Numbers and symbols required
- **Master Password Change**: Update your master password with automatic re-encryption of all stored passwords

#### Password Storage
- **Multiple Credentials**: Store usernames, passwords, URLs, and notes for any service
- **Smart Categories**: Organize passwords by category (Social Media, Banking, Email, Shopping, Work, Personal, Other)
- **Metadata Tracking**: Automatic timestamps for creation and modification
- **Rich Notes Section**: Add security questions, recovery info, or additional notes

#### Password Security
- **Client-Side Encryption**: All passwords encrypted locally using AES encryption (via crypto-js)
- **Strength Indicator**: Visual password strength meter with color-coded feedback
- **Duplicate Detection**: Automatic detection of reused passwords
- **Weak Password Warnings**: Alerts for passwords below recommended standards

#### Password Generator
- **Customizable Length**: Generate passwords from 8 to 64 characters
- **Flexible Options**:
  - Include/exclude uppercase letters
  - Include/exclude lowercase letters
  - Include/exclude numbers
  - Include/exclude symbols
  - Exclude ambiguous characters (i, l, 1, L, o, 0, O)
- **Batch Generation**: Generate multiple passwords at once
- **Visual Feedback**: Password strength indicator for each generated password
- **One-Click Selection**: Use generated passwords directly in password forms

### User Interface

#### Visual Design
- **Dark Mode**: Modern dark theme optimized for eye comfort
- **Glassmorphism**: Frosted glass effect with backdrop blur
- **Gradient Backgrounds**: Beautiful gradient transitions
- **Smooth Animations**: Professional animations and transitions
- **Responsive Design**: Works seamlessly on desktop and tablet devices

#### Dashboard
- **Statistics Dashboard**: View total accounts, weak passwords, and duplicates at a glance
- **Search Functionality**: Real-time search across platform names, usernames, and notes
- **Category Filtering**: Quick filter by password category
- **Favorites**: Star passwords for quick access
- **Sidebar Navigation**: Easy category and favorite access

#### Password Cards
- **Compact Display**: Clean card layout for each password entry
- **One-Click Copy**: Copy usernames and passwords with a single click
- **Password Visibility Toggle**: Show/hide passwords with eye icon
- **Website Links**: Direct links to associated websites
- **Edit/Delete Actions**: Easy password management

### Security Features

#### Data Protection
- **In-Memory Storage**: All data stored in React state (no localStorage/sessionStorage)
- **No Server Communication**: Completely client-side application
- **Encryption at Rest**: All passwords encrypted with master password key
- **Session Security**: Auto-lock after period of inactivity

#### Activity Tracking
- **Inactivity Timer**: Configurable auto-lock after 5-60 minutes of inactivity
- **Activity Detection**: Monitors mouse, keyboard, scroll, and touch interactions
- **Secure Logout**: Automatic session termination and memory clearing

### Advanced Features

#### Import/Export
- **Encrypted Backup**: Export all passwords in encrypted JSON format
- **Backup Restore**: Import previously exported backups
- **Date-Stamped Files**: Automatic naming with backup date
- **Security Warning**: Clear notifications about backup security

#### Password History
- **Modification Tracking**: See when passwords were created and last modified
- **Metadata Preservation**: All password metadata preserved during updates

#### UI/UX Enhancements
- **Toast Notifications**: Real-time feedback for all user actions
- **Form Validation**: Helpful error messages for invalid inputs
- **Empty States**: Guidance when no passwords exist
- **Micro-interactions**: Hover effects and visual feedback
- **Accessibility**: Keyboard navigation and focus management

## 🛠️ Tech Stack

### Frontend Framework
- **React 19**: Modern React with functional components and hooks
- **Vite**: Fast build tool and development server

### Styling
- **Tailwind CSS**: Utility-first CSS framework
- **Custom Animations**: Smooth fade-in and slide-up effects

### Libraries
- **crypto-js**: Client-side AES encryption
- **lucide-react**: Beautiful, consistent icon library

### State Management
- **React Context API**: For global password manager state
- **React Hooks**: useState, useEffect, useCallback, useMemo

## 📦 Installation

### Prerequisites
- Node.js (v16 or higher)
- npm (v8 or higher)

### Setup Instructions

1. **Clone or navigate to the project directory**
   ```bash
   cd my-react-app
   ```

2. **Install dependencies**
   ```bash
   npm install --legacy-peer-deps
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open in browser**
   - Navigate to `http://localhost:5173` (or the port shown in terminal)

## 🚀 Usage Guide

### First-Time Setup
1. Launch the application
2. Create a strong master password (min 12 chars with uppercase, lowercase, numbers, symbols)
3. Confirm you understand the security requirements
4. You're now authenticated!

### Adding Passwords
1. Click the "Add" button in the header
2. Fill in the required fields:
   - Platform Name (e.g., "Gmail", "Twitter")
   - Username/Email
   - Password
3. Optionally fill in:
   - Category
   - Website URL
   - Notes
4. Password strength is displayed in real-time
5. Click "Add" to save

### Searching & Filtering
- **Search Bar**: Type platform name, username, or keywords
- **Category Filter**: Click categories in the sidebar
- **Favorites**: Quick access to starred passwords

### Generating Passwords
1. Click the ⚡ icon in the header
2. Adjust the generator settings:
   - Password length (8-64 characters)
   - Character types to include
   - Ambiguous character handling
3. Click "Regenerate" or "Generate 5" for multiple options
4. Click the download icon to use a generated password
5. Or copy manually with the copy button

### Managing Passwords
- **Edit**: Click "Edit" button on any password card
- **Delete**: Click "Delete" button (confirms before deletion)
- **Copy**: Click copy icon next to username or password
- **Visibility**: Click eye icon to toggle password visibility
- **Open URL**: Click external link icon to visit the website

### Settings
1. Click the ⚙️ icon in the header
2. Configure:
   - Auto-lock timer (5-60 minutes)
   - Dark mode (currently always enabled)
   - Master password change
   - Backup/restore options

### Backup & Restore
- **Export**: Click "Export Encrypted Backup" to download
- **Import**: Click "Import Backup" and select a previously exported file
- Backups are encrypted with your current master password

## 🔐 Security Best Practices

1. **Master Password**: 
   - Make it strong and unique
   - Store it safely - we cannot recover if you forget it
   - Change it periodically

2. **Backups**: 
   - Keep encrypted backups in a safe location
   - Never share backup files
   - Store in cloud backup if encryption level permits

3. **Session Management**:
   - Set appropriate auto-lock timer
   - Don't leave the app unattended
   - Logout when done

4. **Password Quality**:
   - Use the generator for strong passwords
   - Aim for "Strong" or "Very Strong" ratings
   - Avoid reusing passwords across services

## 📊 Dashboard Metrics

### Statistics Displayed
- **Total Accounts**: Number of stored password entries
- **Weak Passwords**: Count of passwords below 12 characters
- **Duplicate Passwords**: Number of reused passwords (security warning)

### Password Strength Levels
- **Very Weak** (Red): < 8 characters or very limited character types
- **Weak** (Red): 8-11 characters
- **Fair** (Yellow): 12 characters with limited variety
- **Good** (Blue): 12+ characters with mixed types
- **Strong** (Green): 16+ characters with all types
- **Very Strong** (Green): 16+ characters with maximum entropy

## 🎨 Design Features

### Glassmorphism Elements
- Frosted glass effect cards
- Backdrop blur for depth
- Semi-transparent overlays
- Smooth gradients

### Color Scheme
- **Base**: Dark slate (900-950)
- **Accent**: Blue to Purple gradient
- **Status Colors**: 
  - Green: Secure/Strong
  - Yellow: Warning/Fair
  - Red: Danger/Weak
  - Blue: Info/Good

### Animations
- **Fade In**: 0.3s ease-in-out
- **Slide Up**: 0.3s ease-out
- **Hover Effects**: Smooth transitions
- **Loading States**: Soft pulse animation

## 💾 Data Storage

### How Data is Stored
- All data stored in React state (in-memory)
- No persistence to disk or server
- Data cleared on page refresh or logout
- Passwords encrypted before storage

### What Happens on Logout
- Session ends immediately
- All data cleared from memory
- Auto-lock triggered on inactivity
- Master password forgotten

## 🐛 Troubleshooting

### "Port already in use"
- The dev server will automatically use the next available port
- Check the terminal output for the correct URL

### "Master password doesn't meet requirements"
- Password must have 12+ characters
- Must include uppercase letters (A-Z)
- Must include lowercase letters (a-z)
- Must include numbers (0-9)
- Must include symbols (!@#$, etc.)

### "Cannot decrypt password"
- Make sure you're using the correct master password
- If master password is changed, all passwords are re-encrypted
- Data is only valid for the current session

### App feels slow
- Generating multiple passwords at once is CPU-intensive
- Adding/editing many passwords may cause slight lag
- Refresh the page to reset if needed

## 📝 File Structure

```
src/
├── components/
│   ├── Login.jsx                 # Master password authentication
│   ├── Dashboard.jsx             # Main app dashboard
│   ├── PasswordCard.jsx           # Individual password display
│   ├── PasswordModal.jsx          # Add/edit password form
│   ├── PasswordGenerator.jsx      # Password generation tool
│   └── SettingsPanel.jsx          # Settings and preferences
├── context/
│   ├── PasswordManagerContext.jsx # Global state management
│   └── ToastContext.jsx           # Toast notification system
├── utils/
│   ├── encryption.js              # Crypto and validation functions
│   └── passwordGenerator.js       # Password generation utilities
├── App.jsx                        # Main App component
├── main.jsx                       # Entry point with providers
├── index.css                      # Tailwind and global styles
└── App.css                        # App-specific styles
```

## 🔮 Future Enhancement Ideas

- **Password Categories Management**: Create custom categories
- **Password Strength Analysis**: Detailed security metrics
- **Two-Factor Authentication**: Additional security layer
- **Offline Mode**: PWA support for offline access
- **Sync Across Devices**: Encrypted cloud sync
- **Browser Extension**: Quick access from any website
- **Mobile App**: Native mobile application
- **Password Audit**: Security audit and recommendations
- **Breach Detection**: Check against known breaches
- **Advanced Search**: Regex and advanced filtering

## 📄 License

This project is created as a demonstration of modern web application security practices and user interface design.

## ⚠️ Important Notes

### Security Disclaimer
- This is a client-side application for demonstration purposes
- For production use, additional security measures are recommended
- Always use strong, unique master passwords
- Regularly backup your data
- Keep the application updated

### Data Privacy
- No data is sent to external servers
- All processing happens in your browser
- No cookies or tracking
- No login to external services
- Complete control over your data

### Browser Compatibility
- Works best in modern browsers (Chrome, Firefox, Safari, Edge)
- Requires JavaScript enabled
- Supports responsive design (desktop, tablet, mobile)

---

**VaultKey** - Your secure, modern password manager. Built with React and privacy-first principles.
