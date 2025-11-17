import { Link, useNavigate, useLocation } from 'react-router-dom';
import { clearAuthToken } from '../features/lock-screen';
import styles from './Home.module.css';

export function Home() {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    clearAuthToken();
    navigate('/lock');
  };

  const handleTestLog = () => {
    console.log('🎉 Test Log:', { timestamp: new Date().toISOString(), message: 'This is a test log!' });
    console.warn('⚠️ Test Warning:', 'This is a warning message');
    console.error('❌ Test Error:', 'This is an error message');
    console.info('ℹ️ Test Info:', 'This is an info message');
    console.debug('🔍 Test Debug:', { data: 'debug information', nested: { value: 123 } });
    alert('Check the browser console! If console is disabled, you won\'t see the logs.');
  };

  return (
    <div className={styles.homePage}>
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
          <h2 className={styles.heroTitle}>Welcome to React Lock & Console Demo</h2>
          <p className={styles.heroSubtitle}>
            A production-ready implementation of client-side lock screen and console manager features.
            <br />
            Modular, reusable, and easy to integrate into any React project.
          </p>
        </section>

        <div className={styles.features}>
          <div className={styles.featureCard}>
            <div className={styles.featureIcon}>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 1C8.676 1 6 3.676 6 7v3H4c-1.104 0-2 .896-2 2v9c0 1.104.896 2 2 2h16c1.104 0 2-.896 2-2v-9c0-1.104-.896-2-2-2h-2V7c0-3.324-2.676-6-6-6zm0 2c2.276 0 4 1.724 4 4v3H8V7c0-2.276 1.724-4 4-4zm-8 9h16v9H4v-9zm8 2c-1.104 0-2 .896-2 2 0 .738.405 1.376 1 1.723V19c0 .552.448 1 1 1s1-.448 1-1v-1.277c.595-.347 1-.985 1-1.723 0-1.104-.896-2-2-2z"/>
              </svg>
            </div>
            <h3>🔐 Lock Screen</h3>
            <p>
              Password-protected access with SHA1 hashing. Configurable expiry time and local storage persistence. 
              Separate module for easy integration.
            </p>
          </div>

          <div className={styles.featureCard}>
            <div className={styles.featureIcon}>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20 19V7H4v12h16m0-16a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h16Z"/>
              </svg>
            </div>
            <h3>📟 Console Manager</h3>
            <p>
              Control console.log() visibility with localStorage flag. Beautiful UI with floating action button. 
              Disable logs in production, enable when debugging.
            </p>
          </div>

          <div className={styles.featureCard}>
            <div className={styles.featureIcon}>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                <path d="M14.6 16.6l4.6-4.6-4.6-4.6L16 6l6 6-6 6-1.4-1.4m-5.2 0L4.8 12l4.6-4.6L8 6l-6 6 6 6 1.4-1.4z"/>
              </svg>
            </div>
            <h3>🎨 CSS Modules</h3>
            <p>
              Scoped styles with CSS Modules. No style conflicts, no global namespace pollution. 
              Clean, maintainable, and modern styling approach.
            </p>
          </div>
        </div>

        <section className={styles.demoSection}>
          <h2>Try It Out</h2>
          <p>
            Click the buttons below to test the features. Check the floating purple/green button 
            in the bottom-right corner to toggle console logs!
          </p>
          <div className={styles.demoButtons}>
            <button onClick={handleTestLog} className={`${styles.demoBtn} ${styles.primaryBtn}`}>
              Test Console Logs
            </button>
            <button onClick={handleLogout} className={`${styles.demoBtn} ${styles.secondaryBtn}`}>
              Test Lock Screen
            </button>
          </div>
        </section>
      </main>
    </div>
  );
}
