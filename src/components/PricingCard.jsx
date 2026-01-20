import React from 'react';
import { Check, Crown, Zap, TrendingUp } from 'lucide-react';

export const PricingCard = ({ plan, name, price, interval, features, isActive, onClick, isPopular }) => {
  const getIcon = () => {
    if (name === 'Enterprise') return <Crown className="w-6 h-6" />;
    if (name === 'Premium') return <Zap className="w-6 h-6" />;
    return <TrendingUp className="w-6 h-6" />;
  };

  return (
    <div
      className={`relative rounded-2xl transition-all duration-300 h-full flex flex-col ${
        isActive
          ? 'bg-gradient-to-br from-green-500/20 to-green-600/20 border-2 border-green-400/60'
          : isPopular
          ? 'bg-gradient-to-br from-purple-500/20 to-blue-500/20 border-2 border-purple-400/80 shadow-lg shadow-purple-500/30'
          : 'bg-gradient-to-br from-white/5 to-white/[0.02] border-2 border-white/10 hover:border-white/30'
      }`}
    >
      {/* Popular Badge */}
      {isPopular && (
        <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-10">
          <span className="inline-block px-4 py-1 bg-gradient-to-r from-purple-400 to-blue-400 text-white text-sm font-semibold rounded-full shadow-lg">
            Most Popular
          </span>
        </div>
      )}

      {/* Active Badge */}
      {isActive && (
        <div className="absolute -top-4 right-6 z-10">
          <span className="inline-block px-3 py-1 bg-green-400 text-green-950 text-xs font-bold rounded-full">
            ✓ ACTIVE
          </span>
        </div>
      )}

      <div className="p-6 sm:p-8 flex-1 flex flex-col">
        {/* Header */}
        <div className="flex items-center gap-3 mb-4">
          <div className={`p-2 rounded-lg flex-shrink-0 ${
            isActive
              ? 'bg-green-500/30 text-green-300'
              : isPopular
              ? 'bg-purple-500/30 text-purple-300'
              : 'bg-white/10 text-gray-300'
          }`}>
            {getIcon()}
          </div>
          <h3 className="text-xl sm:text-2xl font-bold text-white">{name}</h3>
        </div>

        {/* Price */}
        <div className="mb-6">
          <div className="flex items-baseline gap-1 flex-wrap">
            <span className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-purple-300 to-blue-300 bg-clip-text text-transparent">
              {price}
            </span>
            {interval && (
              <span className="text-sm sm:text-base text-gray-400 font-medium">{interval}</span>
            )}
          </div>
          {name === 'Free' && (
            <p className="text-gray-400 text-xs sm:text-sm mt-2">Forever free</p>
          )}
        </div>

        {/* CTA Button */}
        <button
          onClick={onClick}
          disabled={isActive}
          className={`w-full py-2.5 sm:py-3 rounded-lg font-semibold transition-all mb-6 sm:mb-8 text-sm sm:text-base ${
            isActive
              ? 'bg-green-500/30 text-green-300 cursor-default border border-green-400/50'
              : isPopular
              ? 'bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white shadow-lg hover:shadow-purple-500/50'
              : 'bg-white/10 hover:bg-white/20 text-white border border-white/10'
          }`}
        >
          {isActive ? 'Current Plan' : name === 'Free' ? 'Get Started' : 'Upgrade Now'}
        </button>

        {/* Features */}
        <div className="space-y-3 sm:space-y-4 flex-1">
          {features.map((feature, index) => (
            <div key={index} className="flex items-start gap-3">
              <Check className={`w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0 mt-0.5 ${
                isActive
                  ? 'text-green-400'
                  : isPopular
                  ? 'text-purple-400'
                  : 'text-blue-400'
              }`} />
              <span className="text-xs sm:text-sm text-gray-300 leading-relaxed">{feature}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
