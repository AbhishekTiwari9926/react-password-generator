import React, { createContext, useContext, useState, useCallback } from 'react';

const PricingContext = createContext();

const PLAN_LIMITS = {
  free: {
    name: 'Free',
    price: '₹0',
    passwordsPerDay: 5,
    features: ['Up to 5 passwords', 'Basic search', 'Categories'],
  },
  premium: {
    name: 'Premium',
    price: '₹499',
    interval: '/month',
    features: ['Unlimited passwords', 'Password history', 'Dark mode', 'Advanced search', 'Favorites'],
  },
  enterprise: {
    name: 'Enterprise',
    price: '₹999',
    interval: '/month',
    features: ['All Premium features', 'Team sharing', 'Analytics dashboard', 'Priority support', 'Custom security policies'],
  },
};

export const PricingProvider = ({ children }) => {
  const [currentPlan, setCurrentPlan] = useState('free');
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);
  const [passwordsAddedToday, setPasswordsAddedToday] = useState(0);
  const [lastPasswordAddDate, setLastPasswordAddDate] = useState(new Date().toDateString());

  const resetDailyCounter = useCallback(() => {
    const today = new Date().toDateString();
    if (lastPasswordAddDate !== today) {
      setPasswordsAddedToday(0);
      setLastPasswordAddDate(today);
    }
  }, [lastPasswordAddDate]);

  const canAddPassword = useCallback(() => {
    resetDailyCounter();
    if (currentPlan === 'free') {
      return passwordsAddedToday < PLAN_LIMITS.free.passwordsPerDay;
    }
    return true; // Premium and Enterprise have no limits
  }, [currentPlan, passwordsAddedToday, resetDailyCounter]);

  const incrementPasswordCount = useCallback(() => {
    resetDailyCounter();
    if (currentPlan === 'free') {
      setPasswordsAddedToday(prev => prev + 1);
    }
  }, [currentPlan, resetDailyCounter]);

  const getRemainingPasswords = useCallback(() => {
    if (currentPlan === 'free') {
      return PLAN_LIMITS.free.passwordsPerDay - passwordsAddedToday;
    }
    return Infinity;
  }, [currentPlan, passwordsAddedToday]);

  const subscribeToPlan = useCallback((plan) => {
    setCurrentPlan(plan);
    setPasswordsAddedToday(0);
    setShowUpgradeModal(false);
  }, []);

  const value = {
    currentPlan,
    subscribeToPlan,
    showUpgradeModal,
    setShowUpgradeModal,
    canAddPassword,
    incrementPasswordCount,
    getRemainingPasswords,
    passwordsAddedToday,
    planLimits: PLAN_LIMITS,
  };

  return (
    <PricingContext.Provider value={value}>
      {children}
    </PricingContext.Provider>
  );
};

export const usePricing = () => {
  const context = useContext(PricingContext);
  if (!context) {
    throw new Error('usePricing must be used within PricingProvider');
  }
  return context;
};
