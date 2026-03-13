'use client';

import { useEffect, useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import AdminNavbar from '@/components/shared/AdminSidebar';

export default function AdminLayout({ children }) {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const verifyAuthentication = useCallback(async () => {
    const token = localStorage.getItem('accessToken');
    let apiBaseUrl;
    try {
      const { getApiBaseUrl } = await import('../../lib/api');
      apiBaseUrl = await getApiBaseUrl();
    } catch (e) {
      apiBaseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';
    }

    // No token, redirect immediately
    if (!token) {
      router.replace('/admin/login');
      setIsLoading(false);
      return;
    }

    try {
      // Verify token with backend
      const response = await fetch(`${apiBaseUrl}/auth/me`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        credentials: 'include',
        cache: 'no-store' // Prevent caching
      });

      if (response.ok) {
        // Token is valid
        setIsAuthenticated(true);
        setIsLoading(false);
      } else {
        // Token invalid or expired
        throw new Error('Invalid token');
      }
    } catch (error) {
      console.error('Auth verification error:', error);
      
      // Clear invalid data
      localStorage.removeItem('accessToken');
      localStorage.removeItem('admin');
      sessionStorage.clear();
      
      // Redirect to login
      router.replace('/admin/login');
      setIsLoading(false);
    }
  }, [router]);

  useEffect(() => {
    verifyAuthentication();
  }, [verifyAuthentication]);

  const handleLogout = async () => {
    const token = localStorage.getItem('accessToken');
    let apiBaseUrl;
    try {
      const { getApiBaseUrl } = await import('../../lib/api');
      apiBaseUrl = await getApiBaseUrl();
    } catch (e) {
      apiBaseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';
    }

    setIsLoading(true);

    try {
      // Call backend logout to clear cookies and invalidate tokens
      await fetch(`${apiBaseUrl}/auth/logout`, {
        method: 'POST',
        headers: token ? { Authorization: `Bearer ${token}` } : {},
        credentials: 'include'
      });
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      // Clear ALL auth data from client
      localStorage.removeItem('accessToken');
      localStorage.removeItem('admin');
      sessionStorage.clear();
      
      // Clear any cached data
      if ('caches' in window) {
        caches.keys().then(names => {
          names.forEach(name => caches.delete(name));
        });
      }
      
      // Redirect to login with replace (no history)
      router.replace('/admin/login');
      
      // Force hard reload to clear all state
      setTimeout(() => {
        window.location.replace('/admin/login');
      }, 100);
    }
  };

  // Show loading state while verifying
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-yellow-50 to-amber-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-yellow-600 mx-auto"></div>
          <p className="mt-4 text-amber-900 font-semibold">Verifying authentication...</p>
        </div>
      </div>
    );
  }

  // Don't render anything if not authenticated
  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <AdminNavbar onLogout={handleLogout} />
      <main className="px-4 sm:px-6 lg:px-8 py-6 md:py-8">
        <div className="max-w-5xl md:max-w-7xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
}
