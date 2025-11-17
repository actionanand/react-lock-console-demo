import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { validatePassword, storeAuthToken } from './lockScreenService';
import { lockScreenConfig } from './config';
import styles from './LockScreen.module.css';

export function LockScreen() {
  const [password, setPassword] = useState('');
  const [showError, setShowError] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!password) {
      return;
    }

    setIsLoading(true);
    setShowError(false);
    setShowSuccess(false);

    try {
      const isValid = await validatePassword(password);
      
      if (isValid) {
        storeAuthToken();
        setShowSuccess(true);
        
        // Redirect after a short delay
        setTimeout(() => {
          navigate('/');
        }, 800);
      } else {
        setShowError(true);
        setPassword('');
      }
    } catch (error) {
      setShowError(true);
      setPassword('');
    } finally {
      setIsLoading(false);
    }
  };

  const handlePasswordInput = () => {
    setShowError(false);
    setShowSuccess(false);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className={styles.lockScreenContainer}>
      <div className={styles.lockScreenCard}>
        <div className={styles.lockScreenHeader}>
          <div className={styles.lockIcon}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 1C8.676 1 6 3.676 6 7v3H4c-1.104 0-2 .896-2 2v9c0 1.104.896 2 2 2h16c1.104 0 2-.896 2-2v-9c0-1.104-.896-2-2-2h-2V7c0-3.324-2.676-6-6-6zm0 2c2.276 0 4 1.724 4 4v3H8V7c0-2.276 1.724-4 4-4zm-8 9h16v9H4v-9zm8 2c-1.104 0-2 .896-2 2 0 .738.405 1.376 1 1.723V19c0 .552.448 1 1 1s1-.448 1-1v-1.277c.595-.347 1-.985 1-1.723 0-1.104-.896-2-2-2z"/>
            </svg>
          </div>
          <h1 className={styles.title}>{lockScreenConfig.ui.title}</h1>
          <p className={styles.message}>{lockScreenConfig.ui.message}</p>
        </div>

        <form onSubmit={handleSubmit} className={styles.lockScreenForm}>
          <div className={styles.formGroup}>
            <div className={styles.inputWrapper}>
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onInput={handlePasswordInput}
                placeholder={lockScreenConfig.ui.passwordPlaceholder}
                className={`${styles.passwordInput} ${showError ? styles.error : ''} ${showSuccess ? styles.success : ''}`}
                disabled={isLoading}
                autoFocus
                autoComplete="off"
              />
              <button
                type="button"
                className={styles.togglePassword}
                onClick={togglePasswordVisibility}
                disabled={isLoading}
                tabIndex="-1"
              >
                {!showPassword ? (
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"/>
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 7c2.76 0 5 2.24 5 5 0 .65-.13 1.26-.36 1.83l2.92 2.92c1.51-1.26 2.7-2.89 3.43-4.75-1.73-4.39-6-7.5-11-7.5-1.4 0-2.74.25-3.98.7l2.16 2.16C10.74 7.13 11.35 7 12 7zM2 4.27l2.28 2.28.46.46C3.08 8.3 1.78 10.02 1 12c1.73 4.39 6 7.5 11 7.5 1.55 0 3.03-.3 4.38-.84l.42.42L19.73 22 21 20.73 3.27 3 2 4.27zM7.53 9.8l1.55 1.55c-.05.21-.08.43-.08.65 0 1.66 1.34 3 3 3 .22 0 .44-.03.65-.08l1.55 1.55c-.67.33-1.41.53-2.2.53-2.76 0-5-2.24-5-5 0-.79.2-1.53.53-2.2zm4.31-.78l3.15 3.15.02-.16c0-1.66-1.34-3-3-3l-.17.01z"/>
                  </svg>
                )}
              </button>
            </div>
          </div>

          <div className={styles.messageContainer}>
            {showError && (
              <p className={styles.errorMessage}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/>
                </svg>
                {lockScreenConfig.ui.errorMessage}
              </p>
            )}
            {showSuccess && (
              <p className={styles.successMessage}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                </svg>
                {lockScreenConfig.ui.successMessage}
              </p>
            )}
          </div>

          <button
            type="submit"
            className={styles.unlockButton}
            disabled={!password || isLoading}
          >
            {!isLoading ? (
              lockScreenConfig.ui.unlockButtonText
            ) : (
              <span className={styles.loadingSpinner}></span>
            )}
          </button>
        </form>

        {lockScreenConfig.ui.showPasswordHint && (
          <div className={styles.lockScreenFooter}>
            <p className={styles.hint}>{lockScreenConfig.ui.passwordHint}</p>
          </div>
        )}
      </div>
    </div>
  );
}
