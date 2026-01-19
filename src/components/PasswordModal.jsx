import React, { useState, useEffect } from 'react';
import { X, Eye, EyeOff, AlertCircle } from 'lucide-react';
import { calculatePasswordStrength, validatePasswordEntry } from '../utils/encryption';
import { useToast } from '../context/ToastContext';
import { CategoryIcon } from '../utils/categoryIcons';

const CATEGORIES = ['Social Media', 'Email', 'Banking', 'Finance', 'Work', 'Office', 'Shopping', 'Personal', 'Other'];

export const PasswordModal = ({ isOpen, onClose, onSubmit, editingEntry }) => {
  const [formData, setFormData] = useState({
    platform: '',
    username: '',
    password: '',
    url: '',
    category: 'Social Media',
    notes: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { addToast } = useToast();

  useEffect(() => {
    if (editingEntry) {
      setFormData({
        platform: editingEntry.platform,
        username: editingEntry.username,
        password: editingEntry.password,
        url: editingEntry.url || '',
        category: editingEntry.category || 'Social Media',
        notes: editingEntry.notes || '',
      });
    } else {
      setFormData({
        platform: '',
        username: '',
        password: '',
        url: '',
        category: 'Social Media',
        notes: '',
      });
    }
    setErrors({});
  }, [editingEntry, isOpen]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: '',
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validation = validatePasswordEntry(formData);
    if (!validation.isValid) {
      setErrors(validation.errors);
      addToast('Please fix the errors', 'error');
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      onSubmit(formData);
      setIsSubmitting(false);
      onClose();
    }, 300);
  };

  if (!isOpen) return null;

  const passwordStrength = calculatePasswordStrength(formData.password);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-md" onClick={onClose} />

      {/* Modal */}
      <div className="relative w-full max-w-md bg-gradient-to-br from-slate-900/95 to-slate-800/95 border border-white/20 rounded-3xl shadow-2xl backdrop-blur-xl">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-white/10 bg-gradient-to-r from-purple-500/10 to-blue-500/10">
          <h2 className="text-xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
            {editingEntry ? 'Edit Password' : 'Add New Password'}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors p-1 hover:bg-white/10 rounded-lg"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-5 max-h-[80vh] overflow-y-auto">
          {/* Platform */}
          <div>
            <label className="block text-sm font-semibold text-gray-300 mb-2">
              Platform Name <span className="text-red-400">*</span>
            </label>
            <input
              type="text"
              name="platform"
              value={formData.platform}
              onChange={handleChange}
              placeholder="e.g., Gmail, Twitter, Amazon"
              className={`w-full px-4 py-2.5 bg-white/10 border rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-400/50 transition-all ${
                errors.platform ? 'border-red-500' : 'border-white/20'
              }`}
            />
            {errors.platform && (
              <p className="text-red-400 text-xs mt-2 flex items-center gap-1"><AlertCircle className="w-3 h-3" /> {errors.platform}</p>
            )}
          </div>

          {/* Category */}
          <div>
            <label className="block text-sm font-semibold text-gray-300 mb-2">
              Category
            </label>
            <div className="flex items-center gap-2 mb-2">
              <CategoryIcon category={formData.category} size="sm" />
            </div>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full px-4 py-2.5 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-400/50 transition-all"
            >
              {CATEGORIES.map(cat => (
                <option key={cat} value={cat} className="bg-slate-900">
                  {cat}
                </option>
              ))}
            </select>
          </div>

          {/* Username */}
          <div>
            <label className="block text-sm font-semibold text-gray-300 mb-2">
              Username / Email <span className="text-red-400">*</span>
            </label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="e.g., user@example.com"
              className={`w-full px-4 py-2.5 bg-white/10 border rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-400/50 transition-all ${
                errors.username ? 'border-red-500' : 'border-white/20'
              }`}
            />
            {errors.username && (
              <p className="text-red-400 text-xs mt-2 flex items-center gap-1"><AlertCircle className="w-3 h-3" /> {errors.username}</p>
            )}
          </div>

          {/* Password */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="block text-sm font-semibold text-gray-300">
                Password <span className="text-red-400">*</span>
              </label>
              {formData.password && (
                <span className={`text-xs font-bold px-3 py-1 rounded-full ${
                  passwordStrength.color === 'red' ? 'bg-red-500/40 text-red-200' :
                  passwordStrength.color === 'yellow' ? 'bg-yellow-500/40 text-yellow-200' :
                  passwordStrength.color === 'blue' ? 'bg-blue-500/40 text-blue-200' :
                  'bg-green-500/40 text-green-200'
                }`}>
                  {passwordStrength.label}
                </span>
              )}
            </div>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter password"
                className={`w-full px-4 py-2.5 bg-white/10 border rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-400/50 transition-all pr-10 ${
                  errors.password ? 'border-red-500' : 'border-white/20'
                }`}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-200 transition-colors"
              >
                {showPassword ? (
                  <EyeOff className="w-4 h-4" />
                ) : (
                  <Eye className="w-4 h-4" />
                )}
              </button>
            </div>
            {errors.password && (
              <p className="text-red-400 text-xs mt-2 flex items-center gap-1"><AlertCircle className="w-3 h-3" /> {errors.password}</p>
            )}
          </div>

          {/* URL */}
          <div>
            <label className="block text-sm font-semibold text-gray-300 mb-2">
              Website URL (Optional)
            </label>
            <input
              type="text"
              name="url"
              value={formData.url}
              onChange={handleChange}
              placeholder="e.g., https://www.example.com"
              className={`w-full px-4 py-2.5 bg-white/10 border rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-400/50 transition-all ${
                errors.url ? 'border-red-500' : 'border-white/20'
              }`}
            />
            {errors.url && (
              <p className="text-red-400 text-xs mt-2 flex items-center gap-1"><AlertCircle className="w-3 h-3" /> {errors.url}</p>
            )}
          </div>

          {/* Notes */}
          <div>
            <label className="block text-sm font-semibold text-gray-300 mb-2">
              Notes (Optional)
            </label>
            <textarea
              name="notes"
              value={formData.notes}
              onChange={handleChange}
              placeholder="Security question answer, account recovery info, etc."
              rows="3"
              className="w-full px-4 py-2.5 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-400/50 transition-all resize-none"
            />
          </div>

          {/* Info */}
          <div className="flex items-start gap-3 text-xs text-cyan-300 bg-cyan-500/15 p-4 rounded-xl border border-cyan-500/30">
            <AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
            <p>All passwords are encrypted end-to-end with military-grade security</p>
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-2.5 bg-white/10 hover:bg-white/20 text-white rounded-xl font-semibold transition-all border border-white/20"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 py-2.5 bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 disabled:from-purple-500/50 disabled:to-blue-500/50 disabled:cursor-not-allowed text-white rounded-xl font-semibold transition-all"
            >
              {isSubmitting ? 'Saving...' : editingEntry ? 'Update' : 'Add'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
