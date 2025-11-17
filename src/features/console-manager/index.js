// Console Manager Module Exports
// Use these imports to integrate console manager into your React app

export { ConsoleManager } from './ConsoleManager';
export { useConsoleManager } from './useConsoleManager';
export { 
  initializeConsoleManager,
  isConsoleEnabled, 
  enableConsole, 
  disableConsole,
  toggleConsole,
  forceRestoreConsole,
  getConfig,
  isServiceInitialized
} from './consoleManagerService';
export { consoleManagerConfig } from './config';
