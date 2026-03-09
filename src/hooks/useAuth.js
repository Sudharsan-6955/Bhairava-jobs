'use client';

import { useState, useEffect, useCallback } from 'react';
import { getApiBaseUrlSync } from '../lib/api';
import { useRouter } from 'next/navigation';

/**
 * Production-Ready Authentication Hook
 * 
 * Features:
 * - Login/Logout functionality
 * - Token persistence
 * - Auto-authentication check
 * - Protected route wrapper
 * - Token refresh (optional)
 * 
 * Usage:
 * const { user, login, logout, isLoading, isAuthenticated } = useAuth();
 */
export const useAuth = () => {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Resolve API base at runtime to prefer local during local dev, otherwise deployed
  const resolveApiUrl = async () => {
    try {
      const { getApiBaseUrl } = await import('../lib/api');
      return await getApiBaseUrl();
    } catch (e) {
      // Use sync accessor which returns a normalized base
      return getApiBaseUrlSync();
    }
  };

  /**
   * Check if user is authenticated
   * Runs on mount and verifies token with backend
   */
  const checkAuth = useCallback(async () => {
    try {
      const token = localStorage.getItem('accessToken');
      const storedUser = localStorage.getItem('admin');

      if (!token) {
        setIsAuthenticated(false);
        setUser(null);
        setIsLoading(false);
        return false;
      }

      // Verify token with backend
      const API_URL = await resolveApiUrl();
      const response = await fetch(`${API_URL}/auth/me`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        credentials: 'include'
      });

      if (response.ok) {
        const data = await response.json();
        setUser(data.data);
        setIsAuthenticated(true);
        setIsLoading(false);
        return true;
      } else {
        // Token is invalid or expired
        localStorage.removeItem('accessToken');
        localStorage.removeItem('admin');
        setIsAuthenticated(false);
        setUser(null);
        setIsLoading(false);
        return false;
      }
    } catch (error) {
      console.error('Auth check error:', error);
      localStorage.removeItem('accessToken');
      localStorage.removeItem('admin');
      setIsAuthenticated(false);
      setUser(null);
      setIsLoading(false);
      return false;
    }
  }, [API_URL]);

  /**
   * Login function
   * @param {string} email - User email
   * @param {string} password - User password
   * @returns {Promise<{success: boolean, message: string}>}
   */
  const login = async (email, password) => {
    try {
      const API_URL = await resolveApiUrl();
      const response = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include', // Important for cookies
        body: JSON.stringify({ email, password })
      });

      const data = await response.json();

      if (!response.ok) {
        return {
          success: false,
          message: data.message || 'Login failed'
        };
      }

      if (data.success) {
        // Store token and user info
        localStorage.setItem('accessToken', data.data.accessToken);
        localStorage.setItem('admin', JSON.stringify(data.data.admin));
        
        setUser(data.data.admin);
        setIsAuthenticated(true);

        return {
          success: true,
          message: 'Login successful',
          user: data.data.admin
        };
      }

      return {
        success: false,
        message: data.message || 'Login failed'
      };

    } catch (error) {
      console.error('Login error:', error);
      return {
        success: false,
        message: 'Network error. Please check if the server is running.'
      };
    }
  };

  /**
   * Logout function
   * Clears tokens and redirects to login
   */
  const logout = async () => {
    try {
      const token = localStorage.getItem('accessToken');

      // Call backend logout
      const API_URL = await resolveApiUrl();
      await fetch(`${API_URL}/auth/logout`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        credentials: 'include'
      });
    } catch (error) {
      console.error('Logout error:', error);
      // Continue with cleanup even if request fails
    } finally {
      // Clear all auth data
      localStorage.removeItem('accessToken');
      localStorage.removeItem('admin');
      setUser(null);
      setIsAuthenticated(false);

      // Redirect to login
      router.push('/admin/login');
    }
  };

  /**
   * Refresh access token using refresh token
   * Optional - call this when you get 401 errors
   */
  const refreshToken = async () => {
    try {
      const API_URL = await resolveApiUrl();
      const response = await fetch(`${API_URL}/auth/refresh`, {
        method: 'POST',
        credentials: 'include' // Refresh token is in HTTP-only cookie
      });

      const data = await response.json();

      if (response.ok && data.success) {
        // Update access token
        localStorage.setItem('accessToken', data.data.accessToken);
        return true;
      }

      // Refresh failed, logout user
      await logout();
      return false;

    } catch (error) {
      console.error('Token refresh error:', error);
      await logout();
      return false;
    }
  };

  /**
   * Make authenticated API request with auto-retry on token expiry
   * @param {string} url - API endpoint
   * @param {object} options - Fetch options
   * @returns {Promise<Response>}
   */
  const authenticatedFetch = async (url, options = {}) => {
    const token = localStorage.getItem('accessToken');

    const API_URL = await resolveApiUrl();
    const requestUrl = (typeof url === 'string' && url.startsWith('/')) ? `${API_URL}${url}` : url;

    const config = {
      ...options,
      headers: {
        ...options.headers,
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      credentials: 'include'
    };

    let response = await fetch(requestUrl, config);

    // If token expired, try to refresh and retry
    if (response.status === 401) {
      const refreshed = await refreshToken();
      
      if (refreshed) {
        // Retry request with new token
        const newToken = localStorage.getItem('accessToken');
        config.headers['Authorization'] = `Bearer ${newToken}`;
        response = await fetch(url, config);
      }
    }

    return response;
  };

  // Check authentication on mount
  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  return {
    user,
    isLoading,
    isAuthenticated,
    login,
    logout,
    refreshToken,
    authenticatedFetch,
    checkAuth
  };
};

/**
 * Protected Route HOC
 * Wrap your protected pages with this
 * 
 * Usage:
 * export default withAuth(DashboardPage);
 */
export const withAuth = (Component) => {
  return function ProtectedRoute(props) {
    const { isAuthenticated, isLoading } = useAuth();
    const router = useRouter();

    useEffect(() => {
      if (!isLoading && !isAuthenticated) {
        router.replace('/admin/login');
      }
    }, [isAuthenticated, isLoading, router]);

    // Show loading while checking auth
    if (isLoading) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading...</p>
          </div>
        </div>
      );
    }

    // Don't render component if not authenticated
    if (!isAuthenticated) {
      return null;
    }

    // Render protected component
    return <Component {...props} />;
  };
};

export default useAuth;
