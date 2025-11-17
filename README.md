# React Lock & Console Demo

A production-ready implementation of client-side lock screen and console manager features for React applications. Built with Vite, React Router, and CSS Modules.

## Features

### 🔐 Lock Screen
- **Password Protection**: SHA1-hashed password authentication
- **Configurable Expiry**: Set authentication duration or disable expiry
- **localStorage Persistence**: Stay logged in across sessions
- **Beautiful UI**: Gradient design with smooth animations
- **Responsive**: Works on all device sizes

### 📟 Console Manager
- **Toggle Console Logs**: Enable/disable console.log() via localStorage
- **Cross-Tab Sync**: State synchronized across all browser tabs
- **Floating Action Button**: Easy access with purple/green status indicator
- **Multiple Methods**: Intercepts log, warn, error, info, debug
- **Developer Friendly**: Pro tips and clear status messages

### 🎨 CSS Modules
- **Scoped Styles**: No global namespace pollution
- **Maintainable**: Clean, organized stylesheets
- **Modern**: Automatic class name generation

## Getting Started

### Prerequisites
- Node.js 16.x or higher
- npm or yarn

### Installation

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Start development server:**
   ```bash
   npm run dev
   ```

3. **Build for production:**
   ```bash
   npm run build
   ```

4. **Preview production build:**
   ```bash
   npm run preview
   ```

## Usage

### Default Credentials
- **Password**: `admin123`

### Testing Features

1. **Lock Screen**:
   - Click "Logout" button to return to lock screen
   - Enter password to unlock
   - Authentication persists across page refreshes

2. **Console Manager**:
   - Look for purple/green FAB button in bottom-right corner
   - Click to open console manager panel
   - Toggle "Enable Console Logs" to control console.log() visibility
   - Test with the "Test Console Logs" button on Home page

### Configuration

#### Lock Screen Configuration
Edit `src/features/lock-screen/config.js`:

```javascript
export const lockScreenConfig = {
  // SHA1 hash of 'admin123' (change this!)
  passwordHash: 'f865b53623b121fd34ee5426c792e5c33af8c227',
  
  // Expiry time in milliseconds (0 = no expiry)
  expiryTime: 0, // or 3600000 for 1 hour
  
  // localStorage key for auth token
  storageKey: 'auth_token',
  
  // UI messages
  messages: {
    title: 'Enter Password',
    placeholder: 'Password',
    buttonText: 'Unlock',
    errorMessage: 'Invalid password. Please try again.',
    successMessage: 'Access granted!'
  }
};
```

To generate a new password hash:
```javascript
import { sha1 } from './features/lock-screen/lockScreenService';
const hash = await sha1('your-new-password');
console.log(hash); // Copy this to config.js
```

#### Console Manager Configuration
Edit `src/features/console-manager/config.js`:

```javascript
export const consoleManagerConfig = {
  // localStorage key
  storageKey: 'enableLog',
  
  // Value to enable console
  enableValue: 'ON',
  
  // Default state (false = disabled by default)
  defaultEnabled: false,
  
  // Console methods to intercept
  interceptMethods: ['log', 'warn', 'error', 'info', 'debug'],
  
  // Show warning when console is disabled
  showDisabledWarning: true
};
```

## Project Structure

```
src/
├── features/
│   ├── lock-screen/
│   │   ├── config.js              # Lock screen configuration
│   │   ├── lockScreenService.js   # Authentication logic
│   │   ├── useLockScreen.js       # React hook
│   │   ├── LockScreen.jsx         # UI component
│   │   ├── LockScreen.module.css  # Scoped styles
│   │   └── index.js               # Public exports
│   │
│   └── console-manager/
│       ├── config.js                    # Console manager configuration
│       ├── consoleManagerService.js     # Console interception logic
│       ├── useConsoleManager.js         # React hook
│       ├── ConsoleManager.jsx           # UI component
│       ├── ConsoleManager.module.css    # Scoped styles
│       └── index.js                     # Public exports
│
├── pages/
│   ├── Home.jsx              # Home page component
│   ├── Home.module.css       # Home page styles
│   ├── About.jsx             # About page component
│   └── About.module.css      # About page styles
│
├── App.jsx                   # Main app with routing
├── main.jsx                  # Entry point
└── index.css                 # Global styles
```

## Using in Other Projects

Both features are designed to be portable. To use them in your own projects:

### 1. Copy Feature Folders
```bash
cp -r src/features/lock-screen your-project/src/features/
cp -r src/features/console-manager your-project/src/features/
```

### 2. Import and Use

**main.jsx:**
```javascript
import { initializeConsoleManager } from './features/console-manager';

// Initialize before rendering
initializeConsoleManager();

ReactDOM.createRoot(document.getElementById('root')).render(
  <App />
);
```

**App.jsx:**
```javascript
import { LockScreen, useLockScreen } from './features/lock-screen';
import { ConsoleManager } from './features/console-manager';

function App() {
  const { authenticated } = useLockScreen();

  return authenticated ? (
    <>
      <ConsoleManager />
      <YourAppRoutes />
    </>
  ) : (
    <LockScreen />
  );
}
```

### 3. Configure
- Update `passwordHash` in `lock-screen/config.js`
- Adjust `defaultEnabled` in `console-manager/config.js`
- Customize UI messages and settings as needed

## API Reference

### Lock Screen

#### `useLockScreen()`
React hook that provides authentication state.

**Returns:**
- `authenticated` (boolean): Current authentication status
- `checkAuth` (function): Function to manually check authentication

**Example:**
```javascript
const { authenticated } = useLockScreen();
```

#### `lockScreenService`
Functions for authentication management.

**Methods:**
- `sha1(text)`: Generate SHA1 hash (async)
- `validatePassword(inputPassword)`: Validate password (async)
- `storeAuthToken()`: Store authentication token
- `isAuthenticated()`: Check if user is authenticated
- `clearAuthToken()`: Clear authentication (logout)
- `getRemainingTime()`: Get remaining auth time in ms

**Example:**
```javascript
import { clearAuthToken } from './features/lock-screen';

function LogoutButton() {
  const handleLogout = () => {
    clearAuthToken();
  };
  
  return <button onClick={handleLogout}>Logout</button>;
}
```

### Console Manager

#### `useConsoleManager()`
React hook for console state management.

**Returns:**
- `enabled` (boolean): Current console state
- `isConsoleEnabled` (function): Function to check console state

**Example:**
```javascript
const { enabled } = useConsoleManager();
```

#### `consoleManagerService`
Functions for console management.

**Methods:**
- `initializeConsoleManager()`: Initialize console interception
- `isConsoleEnabled()`: Check if console is enabled
- `enableConsole()`: Enable console logs
- `disableConsole()`: Disable console logs
- `toggleConsole()`: Toggle console state
- `subscribeToConsoleState(callback)`: Subscribe to state changes
- `forceRestoreConsole()`: Restore original console methods

**Example:**
```javascript
import { toggleConsole } from './features/console-manager';

function DebugButton() {
  return <button onClick={toggleConsole}>Toggle Logs</button>;
}
```

## Technical Details

### Security Considerations
- **Client-Side Only**: This lock screen is NOT secure for production use with sensitive data
- **SHA1 Hashing**: Used for demonstration; consider stronger algorithms for real applications
- **localStorage**: Can be accessed/modified via browser DevTools
- **Use Case**: Best for internal tools, demos, or basic access control

### Browser Compatibility
- Modern browsers with ES6+ support
- Web Crypto API required for password hashing
- localStorage required for persistence

### Performance
- Lightweight: ~30KB total (unminified)
- No external dependencies beyond React and React Router
- CSS Modules ensure optimal CSS delivery

## Troubleshooting

### Console Logs Not Working
1. Open Console Manager panel (purple/green FAB button)
2. Click "Enable Console Logs"
3. Refresh the page
4. Check localStorage: `enableLog` should be `ON`

### Lock Screen Not Showing
1. Clear localStorage: `localStorage.removeItem('auth_token')`
2. Refresh the page
3. You should see the lock screen

### Styles Not Applied
1. Ensure CSS Modules are properly imported: `import styles from './Component.module.css'`
2. Use className with styles object: `className={styles.className}`
3. Check Vite config includes CSS Modules support

## License

MIT License - Feel free to use in your projects!

## Contributing

This is a demonstration project, but feel free to fork and customize for your needs!
