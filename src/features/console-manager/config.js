/**
 * Console Manager Configuration
 * 
 * Controls console.log() visibility based on localStorage
 */

export const consoleManagerConfig = {
  /**
   * LocalStorage key to check for console log state
   */
  storageKey: 'enableLog',

  /**
   * Value that enables console logs when found in localStorage
   */
  enableValue: 'ON',

  /**
   * Default state when localStorage key doesn't exist
   */
  defaultEnabled: false,

  /**
   * Console methods to intercept and control
   */
  interceptMethods: ['log', 'debug', 'info', 'warn', 'error', 'trace', 'table', 'group', 'groupEnd', 'groupCollapsed'],

  /**
   * Show warning message when logs are disabled
   */
  showDisabledWarning: true,

  /**
   * Custom warning message (shown once when console is accessed while disabled)
   */
  disabledWarningMessage: '🔇 Console logs are disabled. Set localStorage.enableLog = "ON" to enable.'
};
