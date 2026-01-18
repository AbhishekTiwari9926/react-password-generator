import React, { useState } from 'react';
import { Copy, Eye, EyeOff, Star, Edit2, Trash2, ExternalLink } from 'lucide-react';
import { calculatePasswordStrength } from '../utils/encryption';
import { useToast } from '../context/ToastContext';

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
    <div className="bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10 rounded-xl p-5 hover:border-white/20 transition-all hover:shadow-lg group">
      {/* Header */}
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <h3 className="text-lg font-semibold text-white">{entry.platform}</h3>
            <span className="text-xs px-2 py-1 rounded-full bg-white/10 text-gray-300">
              {entry.category}
            </span>
          </div>
          <p className="text-sm text-gray-400">{entry.username}</p>
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
        <div className="flex items-center justify-between mb-1">
          <span className="text-xs text-gray-400">Password Strength</span>
          <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
            passwordStrength.color === 'red' ? 'bg-red-500/30 text-red-200' :
            passwordStrength.color === 'yellow' ? 'bg-yellow-500/30 text-yellow-200' :
            passwordStrength.color === 'blue' ? 'bg-blue-500/30 text-blue-200' :
            'bg-green-500/30 text-green-200'
          }`}>
            {passwordStrength.label}
          </span>
        </div>
        <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
          <div
            className={`h-full transition-all ${
              passwordStrength.color === 'red' ? 'bg-red-500' :
              passwordStrength.color === 'yellow' ? 'bg-yellow-500' :
              passwordStrength.color === 'blue' ? 'bg-blue-500' :
              'bg-green-500'
            }`}
            style={{
              width: `${(passwordStrength.score / 6) * 100}%`,
            }}
          />
        </div>
      </div>

      {/* Password Field */}
      <div className="bg-white/5 rounded-lg p-3 mb-4">
        <div className="flex items-center justify-between gap-2">
          <div className="flex-1">
            <p className="text-xs text-gray-400 mb-1">Password</p>
            <p className="font-mono text-sm text-white break-all">
              {showPassword ? decryptedPassword : '••••••••'}
            </p>
          </div>
          <div className="flex gap-1">
            <button
              onClick={() => setShowPassword(!showPassword)}
              className="p-2 text-gray-400 hover:text-white hover:bg-white/10 rounded transition-colors"
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
              className={`p-2 rounded transition-colors ${
                copiedField === 'Password'
                  ? 'bg-green-500/20 text-green-400'
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
      <div className="flex items-center justify-between gap-2 mb-3">
        <div className="flex-1">
          <p className="text-xs text-gray-400">Username / Email</p>
          <p className="text-sm text-white break-all">{entry.username}</p>
        </div>
        <button
          onClick={() => handleCopy(entry.username, 'Username')}
          className={`p-2 rounded transition-colors flex-shrink-0 ${
            copiedField === 'Username'
              ? 'bg-green-500/20 text-green-400'
              : 'text-gray-400 hover:text-white hover:bg-white/10'
          }`}
          title="Copy username"
        >
          <Copy className="w-4 h-4" />
        </button>
      </div>

      {/* URL */}
      {entry.url && (
        <div className="flex items-center justify-between gap-2 mb-3">
          <div className="flex-1 min-w-0">
            <p className="text-xs text-gray-400">Website</p>
            <p className="text-xs text-blue-400 break-all truncate">{entry.url}</p>
          </div>
          <button
            onClick={handleOpenURL}
            className="p-2 text-gray-400 hover:text-blue-400 hover:bg-white/10 rounded transition-colors flex-shrink-0"
            title="Open website"
          >
            <ExternalLink className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Notes */}
      {entry.notes && (
        <div className="mb-3">
          <p className="text-xs text-gray-400">Notes</p>
          <p className="text-xs text-gray-300 bg-white/5 rounded p-2 max-h-12 overflow-y-auto">
            {entry.notes}
          </p>
        </div>
      )}

      {/* Metadata */}
      <div className="text-xs text-gray-500 space-y-1 mb-3 pb-3 border-t border-white/10 pt-3">
        <p>Created: {new Date(entry.createdAt).toLocaleDateString()}</p>
        {entry.modifiedAt !== entry.createdAt && (
          <p>Modified: {new Date(entry.modifiedAt).toLocaleDateString()}</p>
        )}
      </div>

      {/* Actions */}
      <div className="flex gap-2">
        <button
          onClick={() => onEdit(entry)}
          className="flex-1 py-2 bg-blue-500/20 hover:bg-blue-500/30 text-blue-300 rounded-lg text-sm font-medium transition-colors flex items-center justify-center gap-2"
        >
          <Edit2 className="w-4 h-4" />
          Edit
        </button>
        <button
          onClick={() => onDelete(entry.id)}
          className="flex-1 py-2 bg-red-500/20 hover:bg-red-500/30 text-red-300 rounded-lg text-sm font-medium transition-colors flex items-center justify-center gap-2"
        >
          <Trash2 className="w-4 h-4" />
          Delete
        </button>
      </div>
    </div>
  );
};
