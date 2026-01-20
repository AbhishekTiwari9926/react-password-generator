import React, { useEffect } from 'react';
import { Login } from './components/Login';
import { Dashboard } from './components/Dashboard';
import { usePasswordManager } from './context/PasswordManagerContext';
import { usePricing } from './context/PricingContext';

function App() {
  const { isAuthenticated, updateLastActivity } = usePasswordManager();

  // Update activity on any user interaction
  useEffect(() => {
    const handleUserActivity = () => {
      updateLastActivity();
    };

    const events = ['mousedown', 'keydown', 'scroll', 'touchstart'];
    events.forEach(event => {
      document.addEventListener(event, handleUserActivity);
    });

    return () => {
      events.forEach(event => {
        document.removeEventListener(event, handleUserActivity);
      });
    };
  }, [updateLastActivity]);

  return isAuthenticated ? <Dashboard /> : <Login />;
}

export default App;
