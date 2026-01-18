# VaultKey - API Reference & Developer Guide

## 🔧 Utility Functions

### encryption.js

#### `encryptPassword(text, masterPassword)`
Encrypts plain text using AES encryption with the master password as the key.

**Parameters:**
- `text` (string): Plain text to encrypt
- `masterPassword` (string): Master password used as encryption key

**Returns:** Encrypted string

**Example:**
```javascript
const encrypted = encryptPassword("myPassword123", "masterPassword");
```

---

#### `decryptPassword(encryptedText, masterPassword)`
Decrypts AES encrypted text using the master password.

**Parameters:**
- `encryptedText` (string): Encrypted text
- `masterPassword` (string): Master password used as decryption key

**Returns:** Decrypted string or null if decryption fails

**Example:**
```javascript
const decrypted = decryptPassword(encryptedText, "masterPassword");
```

---

#### `validateMasterPassword(password)`
Validates master password against security requirements.

**Requirements:**
- Minimum 12 characters
- At least one uppercase letter (A-Z)
- At least one lowercase letter (a-z)
- At least one number (0-9)
- At least one symbol (!@#$%^&*, etc.)

**Returns:**
```javascript
{
  isValid: boolean,
  requirements: {
    uppercase: boolean,
    lowercase: boolean,
    numbers: boolean,
    symbols: boolean,
    minLength: boolean
  }
}
```

**Example:**
```javascript
const validation = validateMasterPassword("MyPass123!@#");
if (validation.isValid) {
  authenticate(password);
}
```

---

#### `calculatePasswordStrength(password)`
Calculates password strength score (0-6) and returns strength object.

**Scoring:**
- Length 8+: +1 point
- Length 12+: +1 point
- Length 16+: +1 point
- Mixed case: +1 point
- Contains numbers: +1 point
- Contains symbols: +1 point

**Returns:**
```javascript
{
  score: 0-6,
  label: string, // "Very Weak", "Weak", "Fair", "Good", "Strong", "Very Strong"
  color: string  // "gray", "red", "yellow", "blue", "green"
}
```

**Example:**
```javascript
const strength = calculatePasswordStrength("MyPassword123!");
// Returns: { score: 6, label: "Very Strong", color: "green" }
```

---

#### `detectDuplicatePasswords(passwords)`
Detects if any passwords are duplicated in the array.

**Parameters:**
- `passwords` (array): Array of password entry objects with `password` field

**Returns:**
```javascript
[
  {
    current: number,      // Index of duplicate
    previous: number,     // Index of original
    password: string      // The duplicated password
  }
]
```

---

#### `validatePasswordEntry(entry)`
Validates a password entry object for required fields.

**Parameters:**
- `entry` (object): Password entry with platform, username, password, url, notes

**Returns:**
```javascript
{
  isValid: boolean,
  errors: {
    platform?: string,
    username?: string,
    password?: string,
    url?: string
  }
}
```

---

### passwordGenerator.js

#### `generatePassword(options)`
Generates a random password based on specified options.

**Parameters:**
```javascript
{
  length: 8-64,              // Default: 16
  useUppercase: boolean,     // Default: true
  useLowercase: boolean,     // Default: true
  useNumbers: boolean,       // Default: true
  useSymbols: boolean,       // Default: true
  excludeAmbiguous: boolean  // Default: false
}
```

**Returns:** Generated password string

**Example:**
```javascript
const password = generatePassword({
  length: 16,
  useUppercase: true,
  useLowercase: true,
  useNumbers: true,
  useSymbols: true,
  excludeAmbiguous: false
});
```

---

#### `generateMultiplePasswords(count, options)`
Generates multiple random passwords at once.

**Parameters:**
- `count` (number): Number of passwords to generate
- `options` (object): Same as generatePassword options

**Returns:** Array of password strings

**Example:**
```javascript
const passwords = generateMultiplePasswords(5, {
  length: 16,
  useUppercase: true,
  useLowercase: true,
  useNumbers: true,
  useSymbols: true
});
```

---

## 🎯 Context API

### PasswordManagerContext

#### `usePasswordManager()`
Custom hook to access password manager context.

**Returns:**
```javascript
{
  // Authentication
  isAuthenticated: boolean,
  authenticate: (password: string) => void,
  logout: () => void,
  
  // Passwords
  passwords: Array,
  addPassword: (entry: object) => number,
  updatePassword: (id: number, entry: object) => void,
  deletePassword: (id: number) => void,
  getDecryptedPassword: (encrypted: string) => string,
  
  // Favorites
  favorites: Array<number>,
  toggleFavorite: (id: number) => void,
  
  // Settings
  darkMode: boolean,
  setDarkMode: (value: boolean) => void,
  autoLockTime: number,
  setAutoLockTime: (minutes: number) => void,
  
  // UI State
  selectedCategory: string,
  setSelectedCategory: (category: string) => void,
  searchQuery: string,
  setSearchQuery: (query: string) => void,
  showGenerator: boolean,
  setShowGenerator: (show: boolean) => void,
  
  // Master Password
  changeMasterPassword: (newPassword: string) => void,
  
  // Import/Export
  exportData: () => string,
  importData: (jsonData: string) => boolean,
  
  // Activity
  lastActivityTime: number,
  updateLastActivity: () => void
}
```

**Example:**
```javascript
const { passwords, addPassword, deletePassword } = usePasswordManager();
```

---

### ToastContext

#### `useToast()`
Custom hook to access toast notification functionality.

**Returns:**
```javascript
{
  addToast: (message: string, type: string, duration?: number) => number,
  removeToast: (id: number) => void
}
```

**Toast Types:**
- `"success"` - Green toast for successful actions
- `"error"` - Red toast for errors
- `"info"` - Blue toast for information

**Example:**
```javascript
const { addToast } = useToast();

addToast("Password copied!", "success", 3000);
addToast("Error saving password", "error", 5000);
```

---

## 📋 Component Props

### Login Component
```javascript
<Login isFirstTime={boolean} />
```

**Props:**
- `isFirstTime` (boolean): Whether this is first-time setup

---

### PasswordModal Component
```javascript
<PasswordModal
  isOpen={boolean}
  onClose={() => void}
  onSubmit={(formData) => void}
  editingEntry={object|null}
/>
```

**Props:**
- `isOpen`: Show/hide modal
- `onClose`: Callback when closing
- `onSubmit`: Callback with form data
- `editingEntry`: Password entry being edited (null for new)

**Form Data Structure:**
```javascript
{
  platform: string,
  username: string,
  password: string,
  url: string,
  category: string,
  notes: string
}
```

---

### PasswordCard Component
```javascript
<PasswordCard
  entry={object}
  decryptedPassword={string}
  onEdit={(entry) => void}
  onDelete={(id) => void}
  onToggleFavorite={(id) => void}
  isFavorite={boolean}
/>
```

**Props:**
- `entry`: Password entry object with full details
- `decryptedPassword`: Decrypted password string
- `onEdit`: Callback for edit action
- `onDelete`: Callback for delete action
- `onToggleFavorite`: Callback for favorite toggle
- `isFavorite`: Whether entry is favorited

---

### PasswordGenerator Component
```javascript
<PasswordGenerator onSelect={(password) => void} />
```

**Props:**
- `onSelect`: Callback when password is selected

---

### SettingsPanel Component
```javascript
<SettingsPanel isOpen={boolean} onClose={() => void} />
```

**Props:**
- `isOpen`: Show/hide settings panel
- `onClose`: Callback when closing

---

### Dashboard Component
```javascript
<Dashboard />
```

No props required. Uses context for state management.

---

## 🗂️ Password Entry Structure

### Password Object
```javascript
{
  id: number,                    // Unique identifier (timestamp)
  platform: string,              // Service name (e.g., "Gmail")
  username: string,              // Username or email
  password: string,              // Encrypted password
  url: string,                   // Optional website URL
  category: string,              // Category name
  notes: string,                 // Optional notes
  createdAt: string,             // ISO timestamp
  modifiedAt: string             // ISO timestamp
}
```

### Example Usage
```javascript
const passwordEntry = {
  id: 1705600000000,
  platform: "Gmail",
  username: "user@gmail.com",
  password: "U2FsdGVkX1...", // Encrypted
  url: "https://mail.google.com",
  category: "Email",
  notes: "Main email account",
  createdAt: "2026-01-18T12:00:00Z",
  modifiedAt: "2026-01-18T12:00:00Z"
};
```

---

## 🔄 Data Flow

### Adding a Password
```
User Input (Form)
    ↓
validatePasswordEntry()
    ↓
encryptPassword()
    ↓
addPassword() in Context
    ↓
Update passwords array
    ↓
addToast() notification
    ↓
Close modal
```

### Retrieving a Password
```
User clicks password card
    ↓
getDecryptedPassword()
    ↓
Decrypt using master password
    ↓
Display in password field
    ↓
User copies to clipboard
```

### Changing Master Password
```
User enters new password
    ↓
validateMasterPassword()
    ↓
changeMasterPassword()
    ↓
For each password:
  - decrypt with old password
  - encrypt with new password
    ↓
Update context state
    ↓
Notify user
```

---

## 🎨 Styling Classes

### Common Tailwind Patterns

**Card styling:**
```jsx
className="bg-white/5 border border-white/10 rounded-xl p-6"
```

**Button styling (primary):**
```jsx
className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-medium transition-colors"
```

**Button styling (secondary):**
```jsx
className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg font-medium transition-colors"
```

**Input styling:**
```jsx
className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:border-blue-400 focus:ring-1 focus:ring-blue-400"
```

**Badge/tag:**
```jsx
className="text-xs px-2 py-1 rounded-full bg-blue-500/30 text-blue-200"
```

---

## 🚀 Advanced Usage

### Adding Custom Validation
```javascript
const validation = validatePasswordEntry(entry);
if (!validation.isValid) {
  Object.entries(validation.errors).forEach(([field, error]) => {
    console.error(`${field}: ${error}`);
  });
}
```

### Batch Password Operations
```javascript
const { passwords, deletePassword } = usePasswordManager();

// Delete all weak passwords
passwords.forEach(password => {
  const strength = calculatePasswordStrength(decrypted);
  if (strength.score < 3) {
    deletePassword(password.id);
  }
});
```

### Export and Analyze
```javascript
const { exportData, passwords } = usePasswordManager();
const backupJson = exportData();

// Analyze password data
const duplicates = detectDuplicatePasswords(passwords);
console.log(`Found ${duplicates.length} duplicate passwords`);
```

---

## 📚 Integration Example

```javascript
import { usePasswordManager } from '../context/PasswordManagerContext';
import { useToast } from '../context/ToastContext';
import { calculatePasswordStrength } from '../utils/encryption';

function MyComponent() {
  const { addPassword, passwords } = usePasswordManager();
  const { addToast } = useToast();
  
  const handleSavePassword = (formData) => {
    const strength = calculatePasswordStrength(formData.password);
    
    if (strength.score < 3) {
      addToast('Password is too weak', 'error');
      return;
    }
    
    try {
      const id = addPassword(formData);
      addToast('Password saved successfully', 'success');
    } catch (error) {
      addToast('Failed to save password', 'error');
    }
  };
  
  return (
    // Component JSX
  );
}
```

---

## ⚠️ Important Notes

1. **Encryption**: All passwords are encrypted using AES from crypto-js
2. **Key**: The master password is used as the encryption key
3. **Storage**: Data exists only in React state (in-memory)
4. **Security**: Always use HTTPS in production
5. **Backups**: Exported files are encrypted with the current master password

---

**VaultKey API Reference** - Version 1.0
Last Updated: January 18, 2026
