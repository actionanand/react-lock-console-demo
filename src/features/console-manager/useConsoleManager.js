import { useState, useEffect } from 'react';
import { isConsoleEnabled, subscribeToConsoleState } from './consoleManagerService';

/**
 * Custom hook for console manager state
 */
export function useConsoleManager() {
  const [enabled, setEnabled] = useState(isConsoleEnabled());

  useEffect(() => {
    // Subscribe to state changes
    const unsubscribe = subscribeToConsoleState((isEnabled) => {
      setEnabled(isEnabled);
    });

    // Set initial state
    setEnabled(isConsoleEnabled());

    // Cleanup
    return unsubscribe;
  }, []);

  return {
    enabled,
    isConsoleEnabled: enabled
  };
}
