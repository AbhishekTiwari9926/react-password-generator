import React, { useState, useMemo, useEffect } from 'react';
import {
  Plus,
  Search,
  Settings,
  LogOut,
  Zap,
  AlertTriangle,
  BarChart3,
  Filter,
} from 'lucide-react';
import { usePasswordManager } from '../context/PasswordManagerContext';
import { useToast } from '../context/ToastContext';
import { PasswordCard } from './PasswordCard';
import { PasswordModal } from './PasswordModal';
import { PasswordGenerator } from './PasswordGenerator';
import { SettingsPanel } from './SettingsPanel';
import { detectDuplicatePasswords } from '../utils/encryption';

const CATEGORIES = ['All', 'Social Media', 'Banking', 'Email', 'Shopping', 'Work', 'Personal', 'Other'];

export const Dashboard = () => {
  const {
    passwords,
    addPassword,
    updatePassword,
    deletePassword,
    getDecryptedPassword,
    toggleFavorite,
    favorites,
    selectedCategory,
    setSelectedCategory,
    searchQuery,
    setSearchQuery,
    showGenerator,
    setShowGenerator,
    logout,
    lastActivityTime,
    autoLockTime,
  } = usePasswordManager();

  const [showModal, setShowModal] = useState(false);
  const [editingEntry, setEditingEntry] = useState(null);
  const [showSettings, setShowSettings] = useState(false);
  const [copiedToGenerator, setCopiedToGenerator] = useState(false);
  const { addToast } = useToast();

  // Auto-lock functionality
  useEffect(() => {
    const interval = setInterval(() => {
      const timeSinceLastActivity = Date.now() - lastActivityTime;
      const autoLockMs = autoLockTime * 60 * 1000;

      if (timeSinceLastActivity > autoLockMs) {
        logout();
        addToast('Session locked due to inactivity', 'info');
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [lastActivityTime, autoLockTime, logout, addToast]);

  // Filter passwords
  const filteredPasswords = useMemo(() => {
    let filtered = passwords;

    if (selectedCategory !== 'all' && selectedCategory !== 'All') {
      filtered = filtered.filter(p => p.category === selectedCategory);
    }

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(p =>
        p.platform.toLowerCase().includes(query) ||
        p.username.toLowerCase().includes(query) ||
        p.notes?.toLowerCase().includes(query)
      );
    }

    return filtered;
  }, [passwords, selectedCategory, searchQuery]);

  // Get statistics
  const stats = useMemo(() => {
    const duplicates = detectDuplicatePasswords(
      passwords.map(p => ({ ...p, password: getDecryptedPassword(p.password) }))
    );

    const weakPasswords = passwords.filter(p => {
      const decrypted = getDecryptedPassword(p.password);
      return decrypted && decrypted.length < 12;
    });

    return {
      totalAccounts: passwords.length,
      duplicateCount: duplicates.length,
      weakPasswordCount: weakPasswords.length,
    };
  }, [passwords, getDecryptedPassword]);

  const handleAddPassword = (formData) => {
    if (editingEntry) {
      updatePassword(editingEntry.id, formData);
      addToast('Password updated successfully', 'success');
    } else {
      addPassword(formData);
      addToast('Password added successfully', 'success');
    }
    setShowModal(false);
    setEditingEntry(null);
  };

  const handleEdit = (entry) => {
    setEditingEntry(entry);
    setShowModal(true);
  };

  const handleDelete = (id) => {
    if (confirm('Are you sure you want to delete this password? This action cannot be undone.')) {
      deletePassword(id);
      addToast('Password deleted', 'success');
    }
  };

  const handleGeneratorSelect = (password) => {
    setSearchQuery('');
    setSelectedCategory('All');
    setCopiedToGenerator(true);
    setTimeout(() => setCopiedToGenerator(false), 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Header */}
      <header className="sticky top-0 z-30 backdrop-blur-xl bg-white/5 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between gap-4">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-purple-600 flex items-center justify-center">
              <span className="font-bold text-white text-lg">V</span>
            </div>
            <h1 className="text-2xl font-bold text-white hidden sm:block">VaultKey</h1>
          </div>

          {/* Search Bar */}
          <div className="flex-1 max-w-md">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search passwords..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-400 transition-colors"
              />
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowGenerator(!showGenerator)}
              className="p-2 text-gray-300 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
              title="Password Generator"
            >
              <Zap className="w-5 h-5" />
            </button>
            <button
              onClick={() => {
                setShowModal(true);
                setEditingEntry(null);
              }}
              className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-medium transition-colors flex items-center gap-2"
            >
              <Plus className="w-5 h-5" />
              <span className="hidden sm:inline">Add</span>
            </button>
            <button
              onClick={() => setShowSettings(true)}
              className="p-2 text-gray-300 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
              title="Settings"
            >
              <Settings className="w-5 h-5" />
            </button>
            <button
              onClick={logout}
              className="p-2 text-gray-300 hover:text-red-400 hover:bg-red-400/10 rounded-lg transition-colors"
              title="Logout"
            >
              <LogOut className="w-5 h-5" />
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <aside className="lg:col-span-1">
            {/* Generator */}
            {showGenerator && (
              <div className="bg-white/5 border border-white/10 rounded-2xl p-6 mb-6 sticky top-24">
                <h2 className="text-lg font-bold text-white mb-4">Generator</h2>
                <PasswordGenerator onSelect={handleGeneratorSelect} />
              </div>
            )}

            {/* Categories */}
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6 sticky top-24">
              <div className="flex items-center gap-2 mb-4">
                <Filter className="w-5 h-5 text-blue-400" />
                <h2 className="text-lg font-bold text-white">Categories</h2>
              </div>
              <div className="space-y-2">
                {CATEGORIES.map(category => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`w-full text-left px-4 py-2 rounded-lg transition-colors ${
                      selectedCategory === category
                        ? 'bg-blue-500/30 text-blue-200 border border-blue-500/50'
                        : 'text-gray-300 hover:bg-white/10'
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>

              {/* Favorites */}
              {favorites.length > 0 && (
                <div className="mt-6 pt-6 border-t border-white/10">
                  <h3 className="text-sm font-semibold text-gray-300 mb-2">Favorites</h3>
                  <div className="space-y-2 max-h-48 overflow-y-auto">
                    {favorites.map(favId => {
                      const entry = passwords.find(p => p.id === favId);
                      return entry ? (
                        <button
                          key={favId}
                          onClick={() => setSearchQuery(entry.platform)}
                          className="w-full text-left px-3 py-2 text-sm text-yellow-300 hover:bg-white/10 rounded transition-colors truncate"
                        >
                          ⭐ {entry.platform}
                        </button>
                      ) : null;
                    })}
                  </div>
                </div>
              )}
            </div>
          </aside>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Stats */}
            {passwords.length > 0 && (
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
                <div className="bg-gradient-to-br from-blue-500/20 to-blue-600/20 border border-blue-500/30 rounded-xl p-4">
                  <p className="text-blue-300 text-sm font-medium mb-1">Total Accounts</p>
                  <p className="text-3xl font-bold text-blue-100">{stats.totalAccounts}</p>
                </div>

                {stats.weakPasswordCount > 0 && (
                  <div className="bg-gradient-to-br from-yellow-500/20 to-yellow-600/20 border border-yellow-500/30 rounded-xl p-4 flex items-start justify-between">
                    <div>
                      <p className="text-yellow-300 text-sm font-medium mb-1">Weak Passwords</p>
                      <p className="text-3xl font-bold text-yellow-100">{stats.weakPasswordCount}</p>
                    </div>
                    <AlertTriangle className="w-5 h-5 text-yellow-400 mt-1" />
                  </div>
                )}

                {stats.duplicateCount > 0 && (
                  <div className="bg-gradient-to-br from-red-500/20 to-red-600/20 border border-red-500/30 rounded-xl p-4 flex items-start justify-between">
                    <div>
                      <p className="text-red-300 text-sm font-medium mb-1">Duplicates</p>
                      <p className="text-3xl font-bold text-red-100">{stats.duplicateCount}</p>
                    </div>
                    <BarChart3 className="w-5 h-5 text-red-400 mt-1" />
                  </div>
                )}
              </div>
            )}

            {/* Password Cards */}
            {filteredPasswords.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredPasswords.map(entry => {
                  const decrypted = getDecryptedPassword(entry.password);
                  return (
                    <PasswordCard
                      key={entry.id}
                      entry={entry}
                      decryptedPassword={decrypted}
                      onEdit={handleEdit}
                      onDelete={handleDelete}
                      onToggleFavorite={toggleFavorite}
                      isFavorite={favorites.includes(entry.id)}
                    />
                  );
                })}
              </div>
            ) : (
              <div className="col-span-full text-center py-12">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white/5 mb-4">
                  <Zap className="w-8 h-8 text-gray-400" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">
                  {passwords.length === 0 ? 'No passwords yet' : 'No matching passwords'}
                </h3>
                <p className="text-gray-400 mb-6">
                  {passwords.length === 0
                    ? 'Create your first password entry to get started'
                    : 'Try adjusting your search or filters'}
                </p>
                {passwords.length === 0 && (
                  <button
                    onClick={() => setShowModal(true)}
                    className="px-6 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-medium transition-colors inline-flex items-center gap-2"
                  >
                    <Plus className="w-5 h-5" />
                    Add First Password
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Modals */}
      <PasswordModal
        isOpen={showModal}
        onClose={() => {
          setShowModal(false);
          setEditingEntry(null);
        }}
        onSubmit={handleAddPassword}
        editingEntry={editingEntry}
      />

      <SettingsPanel isOpen={showSettings} onClose={() => setShowSettings(false)} />
    </div>
  );
};
