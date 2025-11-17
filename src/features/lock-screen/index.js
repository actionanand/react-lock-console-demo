// Lock Screen Module Exports
// Use these imports to integrate lock screen into your React app

export { LockScreen } from './LockScreen';
export { useLockScreen } from './useLockScreen';
export { 
  isAuthenticated, 
  clearAuthToken, 
  storeAuthToken, 
  validatePassword,
  getRemainingTime
} from './lockScreenService';
export { lockScreenConfig } from './config';
