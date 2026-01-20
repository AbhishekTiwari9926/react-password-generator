import React from 'react';
import { X, AlertCircle, Zap } from 'lucide-react';
import { usePricing } from '../context/PricingContext';

export const UpgradeModal = ({ isOpen, onClose, onUpgrade, remainingPasswords }) => {
  const { subscribeToPlan } = usePricing();

  if (!isOpen) return null;

  const handleUpgrade = (plan) => {
    subscribeToPlan(plan);
    onUpgrade?.(plan);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-gradient-to-br from-slate-900 to-slate-800 border border-white/10 rounded-2xl shadow-2xl max-w-2xl w-full overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-purple-600/20 to-blue-600/20 border-b border-white/10 px-8 py-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-yellow-500/20 rounded-lg">
              <AlertCircle className="w-6 h-6 text-yellow-400" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white">Plan Limit Reached</h2>
              <p className="text-gray-400 text-sm">You've reached your daily password limit on the Free plan</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 text-gray-400 hover:text-white hover:bg-white/10 rounded transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Content */}
        <div className="p-8">
          <div className="mb-8 p-4 bg-white/5 border border-yellow-400/30 rounded-lg">
            <p className="text-gray-200">
              <span className="font-semibold text-yellow-300">Free Plan:</span> Limited to 5 passwords per day. 
              {remainingPasswords && remainingPasswords > 0 && (
                <span> You have <strong>{remainingPasswords} {remainingPasswords === 1 ? 'password' : 'passwords'}</strong> remaining for today.</span>
              )}
              {remainingPasswords === 0 && (
                <span> Come back tomorrow to add more passwords, or upgrade now to add unlimited passwords!</span>
              )}
            </p>
          </div>

          <h3 className="text-lg font-semibold text-white mb-6">Upgrade to unlock unlimited passwords:</h3>

          {/* Premium Plan */}
          <div className="bg-gradient-to-br from-purple-500/10 to-blue-500/10 border border-purple-400/30 rounded-xl p-6 mb-4">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h4 className="text-xl font-bold text-white flex items-center gap-2">
                  <Zap className="w-5 h-5 text-purple-400" />
                  Premium Plan
                </h4>
                <p className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent mt-2">
                  ₹499<span className="text-gray-400 text-lg">/month</span>
                </p>
              </div>
            </div>
            <ul className="space-y-2 mb-4">
              <li className="text-gray-300 flex items-center gap-2">
                <span className="w-2 h-2 bg-purple-400 rounded-full"></span>
                Unlimited passwords
              </li>
              <li className="text-gray-300 flex items-center gap-2">
                <span className="w-2 h-2 bg-purple-400 rounded-full"></span>
                Password history
              </li>
              <li className="text-gray-300 flex items-center gap-2">
                <span className="w-2 h-2 bg-purple-400 rounded-full"></span>
                Dark mode
              </li>
              <li className="text-gray-300 flex items-center gap-2">
                <span className="w-2 h-2 bg-purple-400 rounded-full"></span>
                Advanced search
              </li>
            </ul>
            <button
              onClick={() => handleUpgrade('premium')}
              className="w-full py-3 bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white rounded-lg font-semibold transition-all shadow-lg hover:shadow-purple-500/50"
            >
              Upgrade to Premium
            </button>
          </div>

          {/* Enterprise Plan */}
          <div className="bg-gradient-to-br from-amber-500/10 to-orange-500/10 border border-amber-400/30 rounded-xl p-6">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h4 className="text-xl font-bold text-white flex items-center gap-2">
                  <Zap className="w-5 h-5 text-amber-400" />
                  Enterprise Plan
                </h4>
                <p className="text-2xl font-bold bg-gradient-to-r from-amber-400 to-orange-400 bg-clip-text text-transparent mt-2">
                  ₹999<span className="text-gray-400 text-lg">/month</span>
                </p>
              </div>
            </div>
            <ul className="space-y-2 mb-4">
              <li className="text-gray-300 flex items-center gap-2">
                <span className="w-2 h-2 bg-amber-400 rounded-full"></span>
                All Premium features
              </li>
              <li className="text-gray-300 flex items-center gap-2">
                <span className="w-2 h-2 bg-amber-400 rounded-full"></span>
                Team sharing
              </li>
              <li className="text-gray-300 flex items-center gap-2">
                <span className="w-2 h-2 bg-amber-400 rounded-full"></span>
                Analytics dashboard
              </li>
              <li className="text-gray-300 flex items-center gap-2">
                <span className="w-2 h-2 bg-amber-400 rounded-full"></span>
                Priority support
              </li>
            </ul>
            <button
              onClick={() => handleUpgrade('enterprise')}
              className="w-full py-3 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white rounded-lg font-semibold transition-all shadow-lg hover:shadow-amber-500/50"
            >
              Upgrade to Enterprise
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
