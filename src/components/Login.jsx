import React, { useState, useEffect } from 'react';
import { Lock, Eye, EyeOff, AlertCircle, CheckCircle2 } from 'lucide-react';
import { validateMasterPassword } from '../utils/encryption';
import { usePasswordManager } from '../context/PasswordManagerContext';
import { useToast } from '../context/ToastContext';

export const Login = ({ isFirstTime = true }) => {
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { authenticate } = usePasswordManager();
  const { addToast } = useToast();

  const validation = validateMasterPassword(password);
  const requirements = validation.requirements;

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isFirstTime && password.length === 0) {
      addToast('Please enter your master password', 'error');
      return;
    }

    if (isFirstTime && !validation.isValid) {
      addToast('Master password does not meet requirements', 'error');
      return;
    }

    setIsLoading(true);
    // Simulate authentication delay
    setTimeout(() => {
      authenticate(password);
      addToast('Successfully authenticated', 'success');
      setIsLoading(false);
    }, 500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Glass card */}
        <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl p-8 shadow-2xl">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-blue-400 to-purple-600 mb-4">
              <Lock className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-white mb-2">VaultKey</h1>
            <p className="text-gray-300 text-sm">
              {isFirstTime ? 'Create your master password' : 'Enter your master password'}
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Password Input */}
            <div>
              <label className="block text-sm font-medium text-gray-200 mb-2">
                Master Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder={isFirstTime ? 'Create a strong password' : 'Enter password'}
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-400 transition-colors"
                  disabled={isLoading}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-200 transition-colors"
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>

            {/* Requirements */}
            {isFirstTime && (
              <div className="bg-white/5 rounded-lg p-4 space-y-2">
                <p className="text-xs font-semibold text-gray-300 uppercase tracking-wide">
                  Requirements
                </p>
                <ul className="space-y-1 text-sm">
                  {[
                    { label: 'At least 12 characters', met: requirements.minLength },
                    { label: 'Uppercase letters (A-Z)', met: requirements.uppercase },
                    { label: 'Lowercase letters (a-z)', met: requirements.lowercase },
                    { label: 'Numbers (0-9)', met: requirements.numbers },
                    { label: 'Symbols (!@#$...)', met: requirements.symbols },
                  ].map((req, idx) => (
                    <li key={idx} className="flex items-center gap-2">
                      {req.met ? (
                        <CheckCircle2 className="w-4 h-4 text-green-400" />
                      ) : (
                        <div className="w-4 h-4 rounded-full border border-gray-500" />
                      )}
                      <span className={req.met ? 'text-green-400' : 'text-gray-400'}>
                        {req.label}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Info Message */}
            <div className="flex items-start gap-2 text-xs text-blue-300 bg-blue-500/10 p-3 rounded-lg border border-blue-500/20">
              <AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-semibold mb-1">Important:</p>
                <p>Store your master password safely. We cannot recover it if you forget it.</p>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading || (isFirstTime && !validation.isValid) || password.length === 0}
              className="w-full py-3 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 disabled:from-gray-600 disabled:to-gray-700 disabled:cursor-not-allowed text-white font-semibold rounded-lg transition-all transform hover:scale-105 active:scale-95"
            >
              {isLoading ? 'Authenticating...' : isFirstTime ? 'Create Password' : 'Unlock'}
            </button>
          </form>

          {/* Footer */}
          <p className="text-center text-xs text-gray-400 mt-6">
            All data is encrypted and stored locally in memory
          </p>
        </div>
      </div>
    </div>
  );
};
