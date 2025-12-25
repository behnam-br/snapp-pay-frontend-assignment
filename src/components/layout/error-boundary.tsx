import styles from '@/components/layout/error-boundary.module.scss';

import { useState } from 'react';
import { isRouteErrorResponse, useRouteError } from 'react-router-dom';

/**
 * Error boundary component for React Router.
 * Displays a user-friendly error page when a route throws an error.
 *
 * Handles:
 * - Route errors (404, 500, etc.)
 * - JavaScript errors thrown during rendering
 * - Failed lazy-loaded chunks
 */
export function ErrorBoundary() {
  const error = useRouteError();
  const [showStack, setShowStack] = useState(false);

  // Determine error details based on error type
  let title = 'Something went wrong';
  let message = 'An unexpected error occurred. Please try again.';
  let errorName = 'Error';
  let errorMessage = 'Unknown error';
  let stack: string | undefined;

  if (isRouteErrorResponse(error)) {
    // React Router error response (404, 500, etc.)
    title = `${error.status} ${error.statusText}`;
    message =
      error.status === 404
        ? "The page you're looking for doesn't exist."
        : error.data?.message || 'A server error occurred.';
    errorName = `HTTP ${error.status}`;
    errorMessage = error.statusText;
  } else if (error instanceof Error) {
    // JavaScript error
    errorName = error.name;
    errorMessage = error.message;
    stack = error.stack;

    // Provide helpful messages for common errors
    if (error.message.includes('Failed to fetch dynamically imported module')) {
      title = 'Failed to load page';
      message = 'There was a problem loading this page. Please refresh and try again.';
    } else if (error.message.includes('Loading chunk')) {
      title = 'Network error';
      message = 'Failed to load required resources. Please check your connection.';
    }
  } else if (typeof error === 'string') {
    errorMessage = error;
  }

  const handleReload = () => {
    window.location.reload();
  };

  const handleGoHome = () => {
    window.location.href = '/';
  };

  return (
    <div className={styles['error-boundary']}>
      <div className={styles['icon']}>⚠️</div>
      <h1 className={styles['title']}>{title}</h1>
      <p className={styles['message']}>{message}</p>

      <div className={styles['details']}>
        <div className={styles['error-name']}>{errorName}</div>
        <div className={styles['error-message']}>{errorMessage}</div>
      </div>

      <div className={styles['actions']}>
        <button
          className={`${styles['button']} ${styles['button-primary']}`}
          onClick={handleReload}
        >
          Refresh Page
        </button>
        <button
          className={`${styles['button']} ${styles['button-secondary']}`}
          onClick={handleGoHome}
        >
          Go to Home
        </button>
      </div>

      {stack && __DEV__ && (
        <div className={styles['stack']}>
          <button className={styles['stack-toggle']} onClick={() => setShowStack(!showStack)}>
            {showStack ? 'Hide' : 'Show'} Stack Trace
          </button>
          {showStack && <pre className={styles['stack-trace']}>{stack}</pre>}
        </div>
      )}
    </div>
  );
}
