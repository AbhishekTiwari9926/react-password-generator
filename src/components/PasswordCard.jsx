import React, { useState } from 'react';
import { Copy, Eye, EyeOff, Star, Edit2, Trash2, ExternalLink } from 'lucide-react';
import { calculatePasswordStrength } from '../utils/encryption';
import { useToast } from '../context/ToastContext';
import { CategoryIcon } from '../utils/categoryIcons';

export const PasswordCard = ({ entry, decryptedPassword, onEdit, onDelete, onToggleFavorite, isFavorite }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [copiedField, setCopiedField] = useState(null);
  const { addToast } = useToast();

  const passwordStrength = calculatePasswordStrength(decryptedPassword);

  const handleCopy = (text, field) => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    addToast(`${field} copied to clipboard`, 'success');
    setTimeout(() => setCopiedField(null), 2000);
  };

  const handleOpenURL = () => {
    if (entry.url) {
      window.open(entry.url, '_blank');
    }
  };

  return (
    <div className="bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10 rounded-2xl p-6 hover:border-white/30 transition-all hover:shadow-2xl hover:shadow-purple-500/10 group backdrop-blur-sm">
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-start gap-3 flex-1">
          <CategoryIcon category={entry.category} size="md" />
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-white group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-purple-400 group-hover:to-blue-400 group-hover:bg-clip-text transition-all">{entry.platform}</h3>
            <p className="text-xs text-gray-400 mt-1">{entry.username}</p>
            <span className="inline-block text-xs px-3 py-1 rounded-full bg-gradient-to-r from-white/10 to-white/5 text-gray-300 mt-2 border border-white/10">
              {entry.category}
            </span>
          </div>
        </div>

        {/* Favorite Button */}
        <button
          onClick={() => onToggleFavorite(entry.id)}
          className="text-gray-400 hover:text-yellow-400 transition-colors p-2 hover:bg-white/10 rounded-lg"
          title={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
        >
          <Star className={`w-5 h-5 ${isFavorite ? 'fill-current' : ''}`} />
        </button>
      </div>

      {/* Password Strength */}
      <div className="mb-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs text-gray-400 font-medium">Strength</span>
          <span className={`text-xs font-bold px-3 py-1 rounded-full ${
            passwordStrength.color === 'red' ? 'bg-red-500/40 text-red-200' :
            passwordStrength.color === 'yellow' ? 'bg-yellow-500/40 text-yellow-200' :
            passwordStrength.color === 'blue' ? 'bg-blue-500/40 text-blue-200' :
            'bg-green-500/40 text-green-200'
          }`}>
            {passwordStrength.label}
          </span>
        </div>
        <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden border border-white/10">
          <div
            className={`h-full transition-all ${
              passwordStrength.color === 'red' ? 'bg-gradient-to-r from-red-500 to-red-400' :
              passwordStrength.color === 'yellow' ? 'bg-gradient-to-r from-yellow-500 to-amber-400' :
              passwordStrength.color === 'blue' ? 'bg-gradient-to-r from-blue-500 to-cyan-400' :
              'bg-gradient-to-r from-green-500 to-emerald-400'
            }`}
            style={{
              width: `${(passwordStrength.score / 6) * 100}%`,
            }}
          />
        </div>
      </div>

      {/* Password Field */}
      <div className="bg-gradient-to-br from-white/10 to-white/5 border border-white/20 rounded-xl p-4 mb-4 backdrop-blur-sm">
        <div className="flex items-center justify-between gap-2">
          <div className="flex-1 min-w-0">
            <p className="text-xs text-gray-400 mb-2 font-medium">Password</p>
            <p className="font-mono text-sm text-white break-all">
              {showPassword ? decryptedPassword : '••••••••'}
            </p>
          </div>
          <div className="flex gap-1 flex-shrink-0">
            <button
              onClick={() => setShowPassword(!showPassword)}
              className="p-2 text-gray-400 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
              title={showPassword ? 'Hide password' : 'Show password'}
            >
              {showPassword ? (
                <EyeOff className="w-4 h-4" />
              ) : (
                <Eye className="w-4 h-4" />
              )}
            </button>
            <button
              onClick={() => handleCopy(decryptedPassword, 'Password')}
              className={`p-2 rounded-lg transition-all ${
                copiedField === 'Password'
                  ? 'bg-gradient-to-r from-green-500/40 to-emerald-500/40 text-green-300'
                  : 'text-gray-400 hover:text-white hover:bg-white/10'
              }`}
              title="Copy password"
            >
              <Copy className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Username */}
      <div className="flex items-center justify-between gap-2 mb-4 p-3 bg-white/5 rounded-xl border border-white/10">
        <div className="flex-1 min-w-0">
          <p className="text-xs text-gray-400 mb-1 font-medium">Username / Email</p>
          <p className="text-sm text-white break-all">{entry.username}</p>
        </div>
        <button
          onClick={() => handleCopy(entry.username, 'Username')}
          className={`p-2 rounded-lg transition-all flex-shrink-0 ${
            copiedField === 'Username'
              ? 'bg-gradient-to-r from-green-500/40 to-emerald-500/40 text-green-300'
              : 'text-gray-400 hover:text-white hover:bg-white/10'
          }`}
          title="Copy username"
        >
          <Copy className="w-4 h-4" />
        </button>
      </div>

      {/* URL */}
      {entry.url && (
        <div className="flex items-center justify-between gap-2 mb-4 p-3 bg-white/5 rounded-xl border border-white/10">
          <div className="flex-1 min-w-0">
            <p className="text-xs text-gray-400 mb-1 font-medium">Website</p>
            <p className="text-xs text-blue-400 break-all truncate hover:text-blue-300">{entry.url}</p>
          </div>
          <button
            onClick={handleOpenURL}
            className="p-2 text-gray-400 hover:text-blue-400 hover:bg-white/10 rounded-lg transition-colors flex-shrink-0"
            title="Open website"
          >
            <ExternalLink className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Notes */}
      {entry.notes && (
        <div className="mb-4 p-3 bg-white/5 rounded-xl border border-white/10">
          <p className="text-xs text-gray-400 mb-2 font-medium">Notes</p>
          <p className="text-xs text-gray-300 max-h-20 overflow-y-auto">
            {entry.notes}
          </p>
        </div>
      )}

      {/* Metadata */}
      <div className="text-xs text-gray-500 space-y-1 mb-4 pb-4 border-t border-white/10 pt-3">
        <p>Created: {new Date(entry.createdAt).toLocaleDateString()}</p>
        {entry.modifiedAt !== entry.createdAt && (
          <p>Modified: {new Date(entry.modifiedAt).toLocaleDateString()}</p>
        )}
      </div>

      {/* Actions */}
      <div className="flex gap-2">
        <button
          onClick={() => onEdit(entry)}
          className="flex-1 py-2 bg-gradient-to-r from-blue-500/40 to-cyan-500/40 hover:from-blue-500/60 hover:to-cyan-500/60 text-blue-300 rounded-lg text-sm font-medium transition-all flex items-center justify-center gap-2 border border-blue-500/30"
        >
          <Edit2 className="w-4 h-4" />
          Edit
        </button>
        <button
          onClick={() => onDelete(entry.id)}
          className="flex-1 py-2 bg-gradient-to-r from-red-500/40 to-rose-500/40 hover:from-red-500/60 hover:to-rose-500/60 text-red-300 rounded-lg text-sm font-medium transition-all flex items-center justify-center gap-2 border border-red-500/30"
        >
          <Trash2 className="w-4 h-4" />
          Delete
        </button>
      </div>
    </div>
  );
};
