import React, { createContext, useContext, useState, useCallback } from 'react';
import { encryptPassword, decryptPassword } from '../utils/encryption';

const PasswordManagerContext = createContext();

export const PasswordManagerProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [masterPassword, setMasterPassword] = useState('');
  const [passwords, setPasswords] = useState([]);
  const [darkMode, setDarkMode] = useState(true);
  const [autoLockTime, setAutoLockTime] = useState(15);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [favorites, setFavorites] = useState([]);
  const [showGenerator, setShowGenerator] = useState(false);
  const [lastActivityTime, setLastActivityTime] = useState(Date.now());

  const authenticate = useCallback((password) => {
    setMasterPassword(password);
    setIsAuthenticated(true);
    setLastActivityTime(Date.now());
  }, []);

  const logout = useCallback(() => {
    setIsAuthenticated(false);
    setMasterPassword('');
    setPasswords([]);
    setFavorites([]);
  }, []);

  const addPassword = useCallback((entry) => {
    const encryptedPassword = encryptPassword(entry.password, masterPassword);
    const newEntry = {
      id: Date.now(),
      ...entry,
      password: encryptedPassword,
      createdAt: new Date().toISOString(),
      modifiedAt: new Date().toISOString(),
    };
    setPasswords(prev => [...prev, newEntry]);
    setLastActivityTime(Date.now());
    return newEntry.id;
  }, [masterPassword]);

  const updatePassword = useCallback((id, entry) => {
    setPasswords(prev =>
      prev.map(p =>
        p.id === id
          ? {
              ...p,
              ...entry,
              password: encryptPassword(entry.password, masterPassword),
              modifiedAt: new Date().toISOString(),
            }
          : p
      )
    );
    setLastActivityTime(Date.now());
  }, [masterPassword]);

  const deletePassword = useCallback((id) => {
    setPasswords(prev => prev.filter(p => p.id !== id));
    setFavorites(prev => prev.filter(fav => fav !== id));
    setLastActivityTime(Date.now());
  }, []);

  const getDecryptedPassword = useCallback((encryptedPassword) => {
    return decryptPassword(encryptedPassword, masterPassword);
  }, [masterPassword]);

  const toggleFavorite = useCallback((id) => {
    setFavorites(prev =>
      prev.includes(id) ? prev.filter(f => f !== id) : [...prev, id]
    );
    setLastActivityTime(Date.now());
  }, []);

  const changeMasterPassword = useCallback((newMasterPassword) => {
    // Re-encrypt all passwords with new master password
    const reencryptedPasswords = passwords.map(entry => {
      const decrypted = decryptPassword(entry.password, masterPassword);
      return {
        ...entry,
        password: encryptPassword(decrypted, newMasterPassword),
        modifiedAt: new Date().toISOString(),
      };
    });
    setPasswords(reencryptedPasswords);
    setMasterPassword(newMasterPassword);
    setLastActivityTime(Date.now());
  }, [masterPassword, passwords]);

  const exportData = useCallback(() => {
    return JSON.stringify(passwords, null, 2);
  }, [passwords]);

  const importData = useCallback((jsonData) => {
    try {
      const imported = JSON.parse(jsonData);
      if (Array.isArray(imported)) {
        setPasswords(imported);
        setLastActivityTime(Date.now());
        return true;
      }
      return false;
    } catch {
      return false;
    }
  }, []);

  const updateLastActivity = useCallback(() => {
    setLastActivityTime(Date.now());
  }, []);

  const value = {
    // Auth
    isAuthenticated,
    authenticate,
    logout,
    
    // Passwords
    passwords,
    addPassword,
    updatePassword,
    deletePassword,
    getDecryptedPassword,
    
    // Favorites
    favorites,
    toggleFavorite,
    
    // Settings
    darkMode,
    setDarkMode,
    autoLockTime,
    setAutoLockTime,
    
    // UI
    selectedCategory,
    setSelectedCategory,
    searchQuery,
    setSearchQuery,
    showGenerator,
    setShowGenerator,
    
    // Master Password
    changeMasterPassword,
    
    // Import/Export
    exportData,
    importData,
    
    // Activity
    lastActivityTime,
    updateLastActivity,
  };

  return (
    <PasswordManagerContext.Provider value={value}>
      {children}
    </PasswordManagerContext.Provider>
  );
};

export const usePasswordManager = () => {
  const context = useContext(PasswordManagerContext);
  if (!context) {
    throw new Error('usePasswordManager must be used within PasswordManagerProvider');
  }
  return context;
};
