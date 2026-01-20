import React, { useState } from 'react';
import { usePricing } from '../context/PricingContext';
import { PricingCard } from './PricingCard';
import { ChevronDown, ChevronUp } from 'lucide-react';

export const PricingSection = () => {
  const { currentPlan, subscribeToPlan, planLimits, passwordsAddedToday } = usePricing();
  const [isExpanded, setIsExpanded] = useState(false);

  const plans = [
    {
      plan: 'free',
      name: 'Free',
      price: planLimits.free.price,
      features: planLimits.free.features,
    },
    {
      plan: 'premium',
      name: 'Premium',
      price: planLimits.premium.price,
      interval: planLimits.premium.interval,
      features: planLimits.premium.features,
      isPopular: true,
    },
    {
      plan: 'enterprise',
      name: 'Enterprise',
      price: planLimits.enterprise.price,
      interval: planLimits.enterprise.interval,
      features: planLimits.enterprise.features,
    },
  ];

  return (
    <div className="bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10 rounded-2xl backdrop-blur-sm hover:border-white/20 transition-colors">
      {/* Header */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full px-4 sm:px-6 py-4 sm:py-5 flex items-center justify-between hover:bg-white/5 transition-colors rounded-t-2xl"
      >
        <div className="flex-1">
          <h2 className="text-base sm:text-lg font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent text-left">
            💳 Pricing Plans
          </h2>
          <p className="text-xs sm:text-sm text-gray-400 text-left mt-1">
            Current Plan: <span className="font-semibold text-purple-300 capitalize">{currentPlan}</span>
            {currentPlan === 'free' && (
              <span className="text-gray-500"> • {passwordsAddedToday}/5 passwords added today</span>
            )}
          </p>
        </div>
        <div className="text-gray-400 ml-2 flex-shrink-0">
          {isExpanded ? (
            <ChevronUp className="w-5 h-5" />
          ) : (
            <ChevronDown className="w-5 h-5" />
          )}
        </div>
      </button>

      {/* Pricing Cards */}
      {isExpanded && (
        <div className="px-3 sm:px-6 pb-6 border-t border-white/10 pt-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 auto-rows-max">
            {plans.map(({ plan, name, price, interval, features, isPopular }) => (
              <PricingCard
                key={plan}
                plan={plan}
                name={name}
                price={price}
                interval={interval}
                features={features}
                isPopular={isPopular}
                isActive={currentPlan === plan}
                onClick={() => subscribeToPlan(plan)}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
