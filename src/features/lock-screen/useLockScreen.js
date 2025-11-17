import { useState, useEffect } from 'react';
import { isAuthenticated } from './lockScreenService';

/**
 * Custom hook for lock screen authentication
 */
export function useLockScreen() {
  const [authenticated, setAuthenticated] = useState(isAuthenticated());

  useEffect(() => {
    // Check authentication status on mount
    setAuthenticated(isAuthenticated());
  }, []);

  const checkAuth = () => {
    const auth = isAuthenticated();
    setAuthenticated(auth);
    return auth;
  };

  return {
    authenticated,
    checkAuth
  };
}
