import { lockScreenConfig } from './config';

/**
 * Lock Screen Service
 * Handles password validation, SHA1 hashing, and local storage management
 */

/**
 * Generate SHA1 hash of a string
 */
async function sha1(message) {
  const msgBuffer = new TextEncoder().encode(message);
  const hashBuffer = await crypto.subtle.digest('SHA-1', msgBuffer);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  return hashHex;
}

/**
 * Validate password against stored hash
 */
export async function validatePassword(password) {
  const hash = await sha1(password);
  return hash === lockScreenConfig.passwordHash;
}

/**
 * Store authentication token in local storage
 */
export function storeAuthToken() {
  const authData = {
    hash: lockScreenConfig.passwordHash,
    timestamp: Date.now()
  };
  localStorage.setItem(lockScreenConfig.storageKey, JSON.stringify(authData));
}

/**
 * Check if user is authenticated and token is not expired
 */
export function isAuthenticated() {
  const storedData = localStorage.getItem(lockScreenConfig.storageKey);
  
  if (!storedData) {
    return false;
  }

  try {
    const authData = JSON.parse(storedData);
    
    // Check if hash matches current config
    if (authData.hash !== lockScreenConfig.passwordHash) {
      clearAuthToken();
      return false;
    }

    // Check expiry (0 means no expiry)
    if (lockScreenConfig.expiryTime > 0) {
      const currentTime = Date.now();
      const elapsedTime = currentTime - authData.timestamp;
      
      if (elapsedTime > lockScreenConfig.expiryTime) {
        clearAuthToken();
        return false;
      }
    }

    return true;
  } catch (error) {
    clearAuthToken();
    return false;
  }
}

/**
 * Clear authentication token from local storage
 */
export function clearAuthToken() {
  localStorage.removeItem(lockScreenConfig.storageKey);
}

/**
 * Get remaining time before expiry (in milliseconds)
 * Returns -1 if no expiry is set
 */
export function getRemainingTime() {
  if (lockScreenConfig.expiryTime === 0) {
    return -1; // No expiry
  }

  const storedData = localStorage.getItem(lockScreenConfig.storageKey);
  if (!storedData) {
    return 0;
  }

  try {
    const authData = JSON.parse(storedData);
    const currentTime = Date.now();
    const elapsedTime = currentTime - authData.timestamp;
    const remaining = lockScreenConfig.expiryTime - elapsedTime;
    
    return remaining > 0 ? remaining : 0;
  } catch (error) {
    return 0;
  }
}
