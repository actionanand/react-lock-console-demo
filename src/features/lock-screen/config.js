/**
 * Lock Screen Configuration
 * 
 * This configuration controls the client-side password protection
 * for your React application.
 */

export const lockScreenConfig = {
  /**
   * SHA1 hash of the password
   * Default password: 'admin123'
   * Generate new hash: https://emn178.github.io/online-tools/sha1.html
   * Can be overridden via VITE_PASSWORD_HASH environment variable
   */
  passwordHash: import.meta.env.VITE_PASSWORD_HASH || 'f865b53623b121fd34ee5426c792e5c33af8c227',

  /**
   * Expiry time in milliseconds (0 means no expiry)
   * Examples:
   * - 0: No expiry (default)
   * - 3600000: 1 hour
   * - 86400000: 24 hours
   * - 604800000: 7 days
   */
  expiryTime: 0,

  /**
   * Local storage key for authentication token
   */
  storageKey: 'app_auth_token',

  /**
   * UI configuration
   */
  ui: {
    title: 'Authentication Required',
    message: 'Please enter the password to access the application',
    successMessage: 'Authentication successful! Redirecting...',
    errorMessage: 'Invalid password. Please try again.',
    unlockButtonText: 'Unlock',
    passwordPlaceholder: 'Enter password',
    showPasswordHint: true,
    passwordHint: 'Default password: admin123'
  }
};
