import React, { useState, useMemo } from 'react';
import { Copy, RotateCw, Download } from 'lucide-react';
import { generatePassword, generateMultiplePasswords } from '../utils/passwordGenerator';
import { calculatePasswordStrength } from '../utils/encryption';
import { useToast } from '../context/ToastContext';

export const PasswordGenerator = ({ onSelect }) => {
  const [length, setLength] = useState(16);
  const [useUppercase, setUseUppercase] = useState(true);
  const [useLowercase, setUseLowercase] = useState(true);
  const [useNumbers, setUseNumbers] = useState(true);
  const [useSymbols, setUseSymbols] = useState(true);
  const [excludeAmbiguous, setExcludeAmbiguous] = useState(false);
  const [generatedPasswords, setGeneratedPasswords] = useState([generatePassword()]);
  const [copiedIndex, setCopiedIndex] = useState(null);
  const { addToast } = useToast();

  const options = {
    length,
    useUppercase,
    useLowercase,
    useNumbers,
    useSymbols,
    excludeAmbiguous,
  };

  const strengths = useMemo(() => {
    return generatedPasswords.map(pwd => calculatePasswordStrength(pwd));
  }, [generatedPasswords]);

  const handleGenerate = () => {
    const newPassword = generatePassword(options);
    setGeneratedPasswords([newPassword]);
  };

  const handleGenerateMultiple = () => {
    const newPasswords = generateMultiplePasswords(5, options);
    setGeneratedPasswords(newPasswords);
  };

  const handleCopy = (password, index) => {
    navigator.clipboard.writeText(password);
    setCopiedIndex(index);
    addToast('Password copied to clipboard', 'success');
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const handleSelect = (password) => {
    if (onSelect) {
      onSelect(password);
      addToast('Password selected', 'success');
    }
  };

  return (
    <div className="w-full space-y-6">
      {/* Settings */}
      <div className="bg-white/5 rounded-xl p-6 border border-white/10">
        <h3 className="text-lg font-semibold text-white mb-4">Generator Settings</h3>

        {/* Length Slider */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <label className="text-sm font-medium text-gray-300">Length</label>
            <span className="text-2xl font-bold text-blue-400">{length}</span>
          </div>
          <input
            type="range"
            min="8"
            max="64"
            value={length}
            onChange={(e) => setLength(parseInt(e.target.value))}
            className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-blue-500"
          />
          <div className="flex justify-between text-xs text-gray-400 mt-1">
            <span>8</span>
            <span>64</span>
          </div>
        </div>

        {/* Character Options */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          {[
            { label: 'Uppercase (A-Z)', value: useUppercase, onChange: setUseUppercase },
            { label: 'Lowercase (a-z)', value: useLowercase, onChange: setUseLowercase },
            { label: 'Numbers (0-9)', value: useNumbers, onChange: setUseNumbers },
            { label: 'Symbols (!@#$)', value: useSymbols, onChange: setUseSymbols },
          ].map((option, idx) => (
            <label key={idx} className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={option.value}
                onChange={(e) => option.onChange(e.target.checked)}
                className="w-4 h-4 rounded border-gray-400 text-blue-500 cursor-pointer"
              />
              <span className="text-sm text-gray-300">{option.label}</span>
            </label>
          ))}
        </div>

        {/* Ambiguous Option */}
        <label className="flex items-center gap-3 cursor-pointer">
          <input
            type="checkbox"
            checked={excludeAmbiguous}
            onChange={(e) => setExcludeAmbiguous(e.target.checked)}
            className="w-4 h-4 rounded border-gray-400 text-blue-500 cursor-pointer"
          />
          <span className="text-sm text-gray-300">Exclude ambiguous characters (i, l, 1, L, o, 0, O)</span>
        </label>
      </div>

      {/* Generated Passwords */}
      <div className="space-y-3">
        {generatedPasswords.map((password, index) => {
          const strength = strengths[index];
          const strengthColors = {
            red: 'bg-red-500/20 border-red-500/50',
            yellow: 'bg-yellow-500/20 border-yellow-500/50',
            blue: 'bg-blue-500/20 border-blue-500/50',
            green: 'bg-green-500/20 border-green-500/50',
          };

          return (
            <div
              key={index}
              className={`p-4 rounded-lg border transition-all ${strengthColors[strength.color] || 'bg-white/5 border-white/10'}`}
            >
              <div className="flex items-center justify-between gap-3">
                <div className="flex-1 min-w-0">
                  <p className="font-mono text-white break-all text-sm">{password}</p>
                  <div className="flex items-center gap-2 mt-2">
                    <span className={`text-xs font-semibold px-2 py-1 rounded-full ${
                      strength.color === 'red' ? 'bg-red-500/30 text-red-200' :
                      strength.color === 'yellow' ? 'bg-yellow-500/30 text-yellow-200' :
                      strength.color === 'blue' ? 'bg-blue-500/30 text-blue-200' :
                      'bg-green-500/30 text-green-200'
                    }`}>
                      {strength.label}
                    </span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleCopy(password, index)}
                    className={`p-2 rounded-lg transition-colors ${
                      copiedIndex === index
                        ? 'bg-green-500/20 text-green-400'
                        : 'bg-white/10 text-gray-300 hover:bg-white/20'
                    }`}
                    title="Copy to clipboard"
                  >
                    <Copy className="w-4 h-4" />
                  </button>
                  {onSelect && (
                    <button
                      onClick={() => handleSelect(password)}
                      className="p-2 rounded-lg bg-blue-500/20 text-blue-300 hover:bg-blue-500/30 transition-colors"
                      title="Use this password"
                    >
                      <Download className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Action Buttons */}
      <div className="flex gap-3">
        <button
          onClick={handleGenerate}
          className="flex-1 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
        >
          <RotateCw className="w-4 h-4" />
          Regenerate
        </button>
        <button
          onClick={handleGenerateMultiple}
          className="flex-1 py-2 bg-blue-500/20 hover:bg-blue-500/30 text-blue-300 rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
        >
          <RotateCw className="w-4 h-4" />
          Generate 5
        </button>
      </div>
    </div>
  );
};
