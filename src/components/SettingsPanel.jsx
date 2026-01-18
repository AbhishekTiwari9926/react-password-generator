import React, { useState } from 'react';
import { X, Lock, Download, Upload, AlertCircle, CheckCircle2 } from 'lucide-react';
import { validateMasterPassword } from '../utils/encryption';
import { usePasswordManager } from '../context/PasswordManagerContext';
import { useToast } from '../context/ToastContext';

export const SettingsPanel = ({ isOpen, onClose }) => {
  const {
    darkMode,
    setDarkMode,
    autoLockTime,
    setAutoLockTime,
    changeMasterPassword,
    exportData,
    importData,
  } = usePasswordManager();
  
  const [showChangeMaster, setShowChangeMaster] = useState(false);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState({});
  const { addToast } = useToast();

  const handleChangeMasterPassword = () => {
    if (!currentPassword || !newPassword || !confirmPassword) {
      addToast('All fields are required', 'error');
      return;
    }

    if (newPassword !== confirmPassword) {
      setErrors({ confirmPassword: 'Passwords do not match' });
      return;
    }

    const validation = validateMasterPassword(newPassword);
    if (!validation.isValid) {
      addToast('New password does not meet requirements', 'error');
      return;
    }

    changeMasterPassword(newPassword);
    setShowChangeMaster(false);
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
    setErrors({});
    addToast('Master password changed successfully', 'success');
  };

  const handleExport = () => {
    try {
      const data = exportData();
      const element = document.createElement('a');
      element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(data));
      element.setAttribute('download', `vaultkey-backup-${new Date().toISOString().split('T')[0]}.json`);
      element.style.display = 'none';
      document.body.appendChild(element);
      element.click();
      document.body.removeChild(element);
      addToast('Data exported successfully (encrypted)', 'success');
    } catch {
      addToast('Failed to export data', 'error');
    }
  };

  const handleImport = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const content = event.target?.result;
        if (importData(content)) {
          addToast('Data imported successfully', 'success');
        } else {
          addToast('Invalid file format', 'error');
        }
      } catch {
        addToast('Failed to import data', 'error');
      }
    };
    reader.readAsText(file);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />

      {/* Panel */}
      <div className="relative w-full max-w-lg bg-gray-900 border border-white/10 rounded-2xl shadow-2xl max-h-[90vh] overflow-y-auto animate-slide-up">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-white/10 sticky top-0 bg-gray-900">
          <h2 className="text-2xl font-bold text-white">Settings</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-8">
          {/* Theme */}
          <section>
            <h3 className="text-lg font-semibold text-white mb-4">Appearance</h3>
            <label className="flex items-center gap-3 cursor-pointer">
              <div className="relative">
                <input
                  type="checkbox"
                  checked={darkMode}
                  onChange={(e) => setDarkMode(e.target.checked)}
                  className="w-5 h-5 rounded border-gray-400 text-blue-500 cursor-pointer"
                />
              </div>
              <span className="text-white">Dark Mode</span>
            </label>
            <p className="text-sm text-gray-400 mt-2">
              {darkMode ? 'Dark mode is currently enabled' : 'Dark mode is currently disabled'}
            </p>
          </section>

          {/* Auto-lock */}
          <section>
            <h3 className="text-lg font-semibold text-white mb-4">Security</h3>
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-sm font-medium text-gray-300">
                  Auto-lock after inactivity
                </label>
                <span className="text-lg font-bold text-blue-400">{autoLockTime} min</span>
              </div>
              <input
                type="range"
                min="5"
                max="60"
                step="5"
                value={autoLockTime}
                onChange={(e) => setAutoLockTime(parseInt(e.target.value))}
                className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-blue-500"
              />
              <div className="flex justify-between text-xs text-gray-400 mt-1">
                <span>5 min</span>
                <span>60 min</span>
              </div>
            </div>
          </section>

          {/* Change Master Password */}
          <section>
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
              <Lock className="w-5 h-5" />
              Master Password
            </h3>

            {!showChangeMaster ? (
              <button
                onClick={() => setShowChangeMaster(true)}
                className="w-full py-2 bg-orange-500/20 hover:bg-orange-500/30 text-orange-300 rounded-lg font-medium transition-colors"
              >
                Change Master Password
              </button>
            ) : (
              <div className="space-y-3 bg-white/5 p-4 rounded-lg border border-white/10">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    Current Master Password
                  </label>
                  <input
                    type="password"
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-400 transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    New Master Password
                  </label>
                  <input
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-400 transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    Confirm New Password
                  </label>
                  <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className={`w-full px-3 py-2 bg-white/5 border rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-400 transition-colors ${
                      errors.confirmPassword ? 'border-red-500' : 'border-white/10'
                    }`}
                  />
                  {errors.confirmPassword && (
                    <p className="text-red-400 text-xs mt-1">{errors.confirmPassword}</p>
                  )}
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => {
                      setShowChangeMaster(false);
                      setCurrentPassword('');
                      setNewPassword('');
                      setConfirmPassword('');
                      setErrors({});
                    }}
                    className="flex-1 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg text-sm font-medium transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleChangeMasterPassword}
                    className="flex-1 py-2 bg-orange-500/20 hover:bg-orange-500/30 text-orange-300 rounded-lg text-sm font-medium transition-colors"
                  >
                    Update
                  </button>
                </div>
              </div>
            )}
          </section>

          {/* Import/Export */}
          <section>
            <h3 className="text-lg font-semibold text-white mb-4">Backup & Restore</h3>
            <div className="space-y-3">
              <button
                onClick={handleExport}
                className="w-full py-3 bg-green-500/20 hover:bg-green-500/30 text-green-300 rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
              >
                <Download className="w-5 h-5" />
                Export Encrypted Backup
              </button>

              <label className="w-full cursor-pointer">
                <input
                  type="file"
                  accept=".json"
                  onChange={handleImport}
                  className="hidden"
                />
                <div className="py-3 bg-blue-500/20 hover:bg-blue-500/30 text-blue-300 rounded-lg font-medium transition-colors flex items-center justify-center gap-2">
                  <Upload className="w-5 h-5" />
                  Import Backup
                </div>
              </label>

              <div className="flex items-start gap-2 text-xs text-orange-300 bg-orange-500/10 p-3 rounded-lg border border-orange-500/20">
                <AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <p>
                  Backups are encrypted using your master password. Keep them safe and never share them.
                </p>
              </div>
            </div>
          </section>

          {/* Info */}
          <section className="bg-blue-500/10 p-4 rounded-lg border border-blue-500/20">
            <div className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-blue-400 mt-0.5 flex-shrink-0" />
              <div className="text-sm text-blue-200">
                <p className="font-semibold mb-1">Privacy & Security</p>
                <ul className="space-y-1 text-xs opacity-90">
                  <li>• All data is encrypted locally</li>
                  <li>• Nothing is sent to any server</li>
                  <li>• Passwords are never stored in plain text</li>
                  <li>• Data exists only in your browser memory</li>
                </ul>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};
