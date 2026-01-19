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
      element.setAttribute('download', `passkey-backup-${new Date().toISOString().split('T')[0]}.json`);
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
      <div className="absolute inset-0 bg-black/60 backdrop-blur-md" onClick={onClose} />

      {/* Panel */}
      <div className="relative w-full max-w-lg bg-gradient-to-br from-slate-900/95 to-slate-800/95 border border-white/20 rounded-3xl shadow-2xl max-h-[90vh] overflow-y-auto backdrop-blur-xl">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-white/10 sticky top-0 bg-gradient-to-r from-purple-500/10 to-blue-500/10">
          <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">Settings</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors p-1 hover:bg-white/10 rounded-lg"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-8">
          {/* Theme */}
          <section>
            <h3 className="text-lg font-bold text-white mb-4">Appearance</h3>
            <label className="flex items-center gap-3 cursor-pointer p-3 rounded-xl hover:bg-white/5 transition-colors">
              <div className="relative">
                <input
                  type="checkbox"
                  checked={darkMode}
                  onChange={(e) => setDarkMode(e.target.checked)}
                  className="w-5 h-5 rounded border-purple-400 text-purple-500 cursor-pointer"
                />
              </div>
              <span className="text-white font-medium">Dark Mode</span>
            </label>
            <p className="text-sm text-gray-400 mt-2 ml-8">
              {darkMode ? 'Dark mode is currently enabled' : 'Dark mode is currently disabled'}
            </p>
          </section>

          {/* Auto-lock */}
          <section>
            <h3 className="text-lg font-bold text-white mb-4">Security</h3>
            <div className="bg-white/5 border border-white/10 rounded-xl p-4">
              <div className="flex items-center justify-between mb-3">
                <label className="text-sm font-semibold text-gray-300">
                  Auto-lock after inactivity
                </label>
                <span className="text-lg font-bold text-purple-400">{autoLockTime} min</span>
              </div>
              <input
                type="range"
                min="5"
                max="60"
                step="5"
                value={autoLockTime}
                onChange={(e) => setAutoLockTime(parseInt(e.target.value))}
                className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-purple-500"
              />
              <div className="flex justify-between text-xs text-gray-400 mt-2">
                <span>5 min</span>
                <span>60 min</span>
              </div>
            </div>
          </section>

          {/* Change Master Password */}
          <section>
            <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
              <Lock className="w-5 h-5" />
              Master Password
            </h3>

            {!showChangeMaster ? (
              <button
                onClick={() => setShowChangeMaster(true)}
                className="w-full py-3 bg-gradient-to-r from-orange-500/40 to-amber-500/40 hover:from-orange-500/60 hover:to-amber-500/60 text-orange-300 rounded-xl font-semibold transition-all border border-orange-500/30"
              >
                Change Master Password
              </button>
            ) : (
              <div className="space-y-3 bg-white/5 border border-white/10 p-4 rounded-xl">
                <div>
                  <label className="block text-sm font-semibold text-gray-300 mb-2">
                    Current Master Password
                  </label>
                  <input
                    type="password"
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    className="w-full px-4 py-2.5 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-400/50 transition-all"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-300 mb-2">
                    New Master Password
                  </label>
                  <input
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="w-full px-4 py-2.5 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-400/50 transition-all"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-300 mb-2">
                    Confirm New Password
                  </label>
                  <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className={`w-full px-4 py-2.5 bg-white/10 border rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-400/50 transition-all ${
                      errors.confirmPassword ? 'border-red-500' : 'border-white/20'
                    }`}
                  />
                  {errors.confirmPassword && (
                    <p className="text-red-400 text-xs mt-2">{errors.confirmPassword}</p>
                  )}
                </div>

                <div className="flex gap-2 pt-2">
                  <button
                    onClick={() => {
                      setShowChangeMaster(false);
                      setCurrentPassword('');
                      setNewPassword('');
                      setConfirmPassword('');
                      setErrors({});
                    }}
                    className="flex-1 py-2.5 bg-white/10 hover:bg-white/20 text-white rounded-lg text-sm font-semibold transition-all border border-white/20"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleChangeMasterPassword}
                    className="flex-1 py-2.5 bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white rounded-lg text-sm font-semibold transition-all"
                  >
                    Update
                  </button>
                </div>
              </div>
            )}
          </section>

          {/* Import/Export */}
          <section>
            <h3 className="text-lg font-bold text-white mb-4">Backup & Restore</h3>
            <div className="space-y-3">
              <button
                onClick={handleExport}
                className="w-full py-3 bg-gradient-to-r from-green-500/40 to-emerald-500/40 hover:from-green-500/60 hover:to-emerald-500/60 text-green-300 rounded-xl font-semibold transition-all flex items-center justify-center gap-2 border border-green-500/30"
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
                <div className="py-3 bg-gradient-to-r from-cyan-500/40 to-blue-500/40 hover:from-cyan-500/60 hover:to-blue-500/60 text-cyan-300 rounded-xl font-semibold transition-all flex items-center justify-center gap-2 border border-cyan-500/30">
                  <Upload className="w-5 h-5" />
                  Import Backup
                </div>
              </label>

              <div className="flex items-start gap-3 text-xs text-amber-300 bg-amber-500/15 p-4 rounded-xl border border-amber-500/30">
                <AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <p>
                  Backups are encrypted using your master password. Keep them safe and never share them.
                </p>
              </div>
            </div>
          </section>

          {/* Info */}
          <section className="bg-gradient-to-r from-cyan-500/15 to-blue-500/15 p-4 rounded-xl border border-cyan-500/30">
            <div className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-cyan-400 mt-0.5 flex-shrink-0" />
              <div className="text-sm text-cyan-200">
                <p className="font-semibold mb-2">Privacy & Security</p>
                <ul className="space-y-1.5 text-xs opacity-90">
                  <li>✓ All data is encrypted locally</li>
                  <li>✓ Nothing is sent to any server</li>
                  <li>✓ Passwords are never stored in plain text</li>
                  <li>✓ Data exists only in your browser memory</li>
                </ul>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};
