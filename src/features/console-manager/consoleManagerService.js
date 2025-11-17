import { consoleManagerConfig } from './config';

/**
 * Console Manager Service
 * Intercepts console methods and controls their visibility
 */

// Store original console methods
const originalConsole = {};
let isInitialized = false;
let warningShown = false;
const stateListeners = new Set();

/**
 * Initialize console interception
 */
export function initializeConsoleManager() {
  if (isInitialized) {
    return;
  }

  // Store original console methods
  consoleManagerConfig.interceptMethods.forEach((method) => {
    if (console[method]) {
      originalConsole[method] = console[method].bind(console);
    }
  });

  // Override console methods
  applyConsoleState();
  isInitialized = true;

  // Listen for storage changes from other tabs/windows
  if (typeof window !== 'undefined') {
    window.addEventListener('storage', (event) => {
      if (event.key === consoleManagerConfig.storageKey) {
        applyConsoleState();
        notifyListeners();
      }
    });
  }
}

/**
 * Check if console is enabled based on localStorage
 */
export function isConsoleEnabled() {
  if (typeof localStorage === 'undefined') {
    return consoleManagerConfig.defaultEnabled;
  }

  const storedValue = localStorage.getItem(consoleManagerConfig.storageKey);
  
  if (storedValue === null) {
    return consoleManagerConfig.defaultEnabled;
  }

  return storedValue === consoleManagerConfig.enableValue;
}

/**
 * Enable console logs
 */
export function enableConsole() {
  localStorage.setItem(consoleManagerConfig.storageKey, consoleManagerConfig.enableValue);
  applyConsoleState();
  notifyListeners();
}

/**
 * Disable console logs
 */
export function disableConsole() {
  localStorage.removeItem(consoleManagerConfig.storageKey);
  applyConsoleState();
  notifyListeners();
}

/**
 * Toggle console state
 */
export function toggleConsole() {
  if (isConsoleEnabled()) {
    disableConsole();
  } else {
    enableConsole();
  }
  return isConsoleEnabled();
}

/**
 * Apply console state based on current settings
 */
function applyConsoleState() {
  const isEnabled = isConsoleEnabled();
  warningShown = false;

  consoleManagerConfig.interceptMethods.forEach((method) => {
    if (isEnabled) {
      // Restore original console method
      if (originalConsole[method]) {
        console[method] = originalConsole[method];
      }
    } else {
      // Replace with no-op or warning
      console[method] = (...args) => {
        // Show warning once if configured
        if (consoleManagerConfig.showDisabledWarning && !warningShown) {
          warningShown = true;
          // Use original console to show warning
          if (originalConsole['warn']) {
            originalConsole['warn'](consoleManagerConfig.disabledWarningMessage);
          }
        }
        // Do nothing else (logs are disabled)
      };
    }
  });
}

/**
 * Subscribe to console state changes
 */
export function subscribeToConsoleState(callback) {
  stateListeners.add(callback);
  
  // Return unsubscribe function
  return () => {
    stateListeners.delete(callback);
  };
}

/**
 * Notify all listeners of state change
 */
function notifyListeners() {
  const isEnabled = isConsoleEnabled();
  stateListeners.forEach(callback => {
    callback(isEnabled);
  });
}

/**
 * Force restore original console (useful for debugging)
 * WARNING: This bypasses the console manager
 */
export function forceRestoreConsole() {
  consoleManagerConfig.interceptMethods.forEach((method) => {
    if (originalConsole[method]) {
      console[method] = originalConsole[method];
    }
  });
}

/**
 * Get current configuration
 */
export function getConfig() {
  return { ...consoleManagerConfig };
}

/**
 * Check if service is initialized
 */
export function isServiceInitialized() {
  return isInitialized;
}
