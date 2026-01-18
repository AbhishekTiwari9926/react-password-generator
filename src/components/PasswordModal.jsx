import React, { useState, useEffect } from 'react';
import { X, Eye, EyeOff, AlertCircle } from 'lucide-react';
import { calculatePasswordStrength, validatePasswordEntry } from '../utils/encryption';
import { useToast } from '../context/ToastContext';

const CATEGORIES = ['Social Media', 'Banking', 'Email', 'Shopping', 'Work', 'Personal', 'Other'];

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
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />

      {/* Modal */}
      <div className="relative w-full max-w-md bg-gray-900 border border-white/10 rounded-2xl shadow-2xl animate-slide-up">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-white/10">
          <h2 className="text-xl font-bold text-white">
            {editingEntry ? 'Edit Password' : 'Add New Password'}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4 max-h-[80vh] overflow-y-auto">
          {/* Platform */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Platform Name <span className="text-red-400">*</span>
            </label>
            <input
              type="text"
              name="platform"
              value={formData.platform}
              onChange={handleChange}
              placeholder="e.g., Gmail, Twitter, Amazon"
              className={`w-full px-3 py-2 bg-white/5 border rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-400 transition-colors ${
                errors.platform ? 'border-red-500' : 'border-white/10'
              }`}
            />
            {errors.platform && (
              <p className="text-red-400 text-xs mt-1">{errors.platform}</p>
            )}
          </div>

          {/* Category */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Category
            </label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-400 transition-colors"
            >
              {CATEGORIES.map(cat => (
                <option key={cat} value={cat} className="bg-gray-900">
                  {cat}
                </option>
              ))}
            </select>
          </div>

          {/* Username */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Username / Email <span className="text-red-400">*</span>
            </label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="e.g., user@example.com"
              className={`w-full px-3 py-2 bg-white/5 border rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-400 transition-colors ${
                errors.username ? 'border-red-500' : 'border-white/10'
              }`}
            />
            {errors.username && (
              <p className="text-red-400 text-xs mt-1">{errors.username}</p>
            )}
          </div>

          {/* Password */}
          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="block text-sm font-medium text-gray-300">
                Password <span className="text-red-400">*</span>
              </label>
              {formData.password && (
                <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
                  passwordStrength.color === 'red' ? 'bg-red-500/30 text-red-200' :
                  passwordStrength.color === 'yellow' ? 'bg-yellow-500/30 text-yellow-200' :
                  passwordStrength.color === 'blue' ? 'bg-blue-500/30 text-blue-200' :
                  'bg-green-500/30 text-green-200'
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
                className={`w-full px-3 py-2 bg-white/5 border rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-400 transition-colors pr-10 ${
                  errors.password ? 'border-red-500' : 'border-white/10'
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
              <p className="text-red-400 text-xs mt-1">{errors.password}</p>
            )}
          </div>

          {/* URL */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Website URL (Optional)
            </label>
            <input
              type="text"
              name="url"
              value={formData.url}
              onChange={handleChange}
              placeholder="e.g., https://www.example.com"
              className={`w-full px-3 py-2 bg-white/5 border rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-400 transition-colors ${
                errors.url ? 'border-red-500' : 'border-white/10'
              }`}
            />
            {errors.url && (
              <p className="text-red-400 text-xs mt-1">{errors.url}</p>
            )}
          </div>

          {/* Notes */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Notes (Optional)
            </label>
            <textarea
              name="notes"
              value={formData.notes}
              onChange={handleChange}
              placeholder="Security question answer, account recovery info, etc."
              rows="3"
              className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-400 transition-colors resize-none"
            />
          </div>

          {/* Info */}
          <div className="flex items-start gap-2 text-xs text-blue-300 bg-blue-500/10 p-3 rounded-lg border border-blue-500/20">
            <AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
            <p>Password will be encrypted before storage</p>
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg font-medium transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 py-2 bg-blue-500 hover:bg-blue-600 disabled:bg-blue-500/50 disabled:cursor-not-allowed text-white rounded-lg font-medium transition-colors"
            >
              {isSubmitting ? 'Saving...' : editingEntry ? 'Update' : 'Add'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
