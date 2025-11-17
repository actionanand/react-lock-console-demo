import { Link, useNavigate, useLocation } from 'react-router-dom';
import { clearAuthToken } from '../features/lock-screen';
import styles from './About.module.css';

export function About() {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    clearAuthToken();
    navigate('/lock');
  };

  return (
    <div className={styles.aboutPage}>
      <header className={styles.header}>
        <div className={styles.headerContent}>
          <h1 className={styles.logo}>🔐 React Demo</h1>
          <nav className={styles.nav}>
            <Link 
              to="/" 
              className={`${styles.navLink} ${location.pathname === '/' ? styles.active : ''}`}
            >
              Home
            </Link>
            <Link 
              to="/about" 
              className={`${styles.navLink} ${location.pathname === '/about' ? styles.active : ''}`}
            >
              About
            </Link>
            <button onClick={handleLogout} className={styles.logoutBtn}>
              Logout
            </button>
          </nav>
        </div>
      </header>

      <main className={styles.main}>
        <section className={styles.hero}>
          <h2 className={styles.heroTitle}>About This Project</h2>
          <p className={styles.heroSubtitle}>
            A demonstration of modular, reusable React features for lock screen and console management.
          </p>
        </section>

        <section className={styles.section}>
          <h3 className={styles.sectionTitle}>Project Overview</h3>
          <div className={styles.sectionContent}>
            <p>
              This project showcases two powerful features that can be easily integrated into any React application:
            </p>
            <ul className={styles.featureList}>
              <li className={styles.featureItem}>
                <strong>Lock Screen:</strong> A client-side password protection system using SHA1 hashing and localStorage. 
                Configurable expiry time allows you to set how long users stay authenticated. Perfect for internal tools, 
                admin panels, or any application requiring basic access control.
              </li>
              <li className={styles.featureItem}>
                <strong>Console Manager:</strong> A development tool that lets you control console.log() visibility via 
                localStorage. Disable logs in production, enable them when debugging. Cross-tab synchronization ensures 
                consistent state across all browser tabs.
              </li>
            </ul>
          </div>
        </section>

        <section className={styles.section}>
          <h3 className={styles.sectionTitle}>Technical Implementation</h3>
          <div className={styles.techStack}>
            <div className={styles.techCard}>
              <h4 className={styles.techCardTitle}>
                <span className={styles.icon}>⚛️</span>
                React 18
              </h4>
              <p className={styles.techCardDescription}>
                Built with React 18 using functional components and hooks. Modern React patterns ensure 
                optimal performance and maintainability.
              </p>
            </div>
            <div className={styles.techCard}>
              <h4 className={styles.techCardTitle}>
                <span className={styles.icon}>🚀</span>
                Vite
              </h4>
              <p className={styles.techCardDescription}>
                Lightning-fast build tool with HMR (Hot Module Replacement). Development server starts 
                instantly and updates are near-instantaneous.
              </p>
            </div>
            <div className={styles.techCard}>
              <h4 className={styles.techCardTitle}>
                <span className={styles.icon}>🎨</span>
                CSS Modules
              </h4>
              <p className={styles.techCardDescription}>
                Scoped styles prevent conflicts and namespace pollution. Clean, maintainable CSS with 
                automatic class name generation.
              </p>
            </div>
            <div className={styles.techCard}>
              <h4 className={styles.techCardTitle}>
                <span className={styles.icon}>🛣️</span>
                React Router
              </h4>
              <p className={styles.techCardDescription}>
                Client-side routing with protected routes. Navigate between pages without full page 
                reloads for a seamless user experience.
              </p>
            </div>
          </div>
        </section>

        <section className={styles.section}>
          <h3 className={styles.sectionTitle}>Key Features</h3>
          <div className={styles.sectionContent}>
            <ul className={styles.featureList}>
              <li className={styles.featureItem}>
                <strong>🔐 SHA1 Password Hashing:</strong> Passwords are hashed using the Web Crypto API before 
                storage and comparison. While SHA1 is used here for demonstration, it can be easily swapped for 
                stronger algorithms.
              </li>
              <li className={styles.featureItem}>
                <strong>⏰ Configurable Expiry:</strong> Set authentication expiry time in milliseconds. Use 0 for 
                no expiry, or set a specific duration like 3600000 (1 hour).
              </li>
              <li className={styles.featureItem}>
                <strong>💾 LocalStorage Persistence:</strong> Authentication state and console settings persist 
                across sessions. Users stay logged in even after closing the browser (unless expired).
              </li>
              <li className={styles.featureItem}>
                <strong>🔄 Cross-Tab Sync:</strong> Console manager state synchronizes across all open tabs. Enable 
                logs in one tab, and they're enabled everywhere.
              </li>
              <li className={styles.featureItem}>
                <strong>🎯 Modular Architecture:</strong> Features are organized in separate folders with clean 
                exports. Copy the entire feature folder to reuse in other projects.
              </li>
              <li className={styles.featureItem}>
                <strong>🪝 Custom Hooks:</strong> useLockScreen and useConsoleManager hooks provide clean APIs for 
                consuming feature state and actions in any component.
              </li>
              <li className={styles.featureItem}>
                <strong>🎨 Beautiful UI:</strong> Gradient designs, smooth animations, and responsive layouts. 
                Works great on desktop, tablet, and mobile devices.
              </li>
            </ul>
          </div>
        </section>

        <section className={styles.section}>
          <h3 className={styles.sectionTitle}>How to Use in Your Project</h3>
          <div className={styles.sectionContent}>
            <p>
              Both features are designed to be portable. Here's how to integrate them:
            </p>
            <div className={styles.codeBlock}>
              <pre>{`// 1. Copy the feature folders to your project
src/features/lock-screen/
src/features/console-manager/

// 2. Import in your App.jsx
import { LockScreen, useLockScreen } from './features/lock-screen';
import { ConsoleManager, initializeConsoleManager } from './features/console-manager';

// 3. Initialize console manager in main.jsx
import { initializeConsoleManager } from './features/console-manager';
initializeConsoleManager();

// 4. Use the lock screen for protected routes
function App() {
  const { authenticated } = useLockScreen();
  
  return authenticated ? (
    <>
      <ConsoleManager />
      <YourApp />
    </>
  ) : (
    <LockScreen />
  );
}

// 5. Configure in config.js files
// Lock Screen: Set passwordHash and expiryTime
// Console Manager: Set defaultEnabled and storage key`}</pre>
            </div>
          </div>
        </section>

        <section className={styles.section}>
          <h3 className={styles.sectionTitle}>Default Credentials</h3>
          <div className={styles.sectionContent}>
            <p>
              The default password is <span className={styles.highlight}>admin123</span>. 
              You can change this by updating the <code>passwordHash</code> in 
              <code>src/features/lock-screen/config.js</code>. Use the provided <code>sha1()</code> 
              function to generate a new hash for your desired password.
            </p>
          </div>
        </section>

        <section className={styles.section}>
          <h3 className={styles.sectionTitle}>Resources</h3>
          <ul className={styles.linkList}>
            <li className={styles.linkItem}>
              <a href="https://react.dev" target="_blank" rel="noopener noreferrer">
                <span className={styles.icon}>📚</span>
                React Documentation
              </a>
            </li>
            <li className={styles.linkItem}>
              <a href="https://vitejs.dev" target="_blank" rel="noopener noreferrer">
                <span className={styles.icon}>⚡</span>
                Vite Documentation
              </a>
            </li>
            <li className={styles.linkItem}>
              <a href="https://reactrouter.com" target="_blank" rel="noopener noreferrer">
                <span className={styles.icon}>🛣️</span>
                React Router Docs
              </a>
            </li>
          </ul>
        </section>
      </main>
    </div>
  );
}
