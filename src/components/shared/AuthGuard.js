'use client';

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';

/**
 * Authentication Guard Component
 * Blocks access to protected pages and redirects to login if not authenticated
 * 
 * Usage: Wrap any protected component with this guard
 * <AuthGuard><YourComponent /></AuthGuard>
 */
export default function AuthGuard({ children }) {
  const router = useRouter();
  const pathname = usePathname();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    const verifyAuth = async () => {
      // Check if on login page (skip verification)
      if (pathname === '/admin/login') {
        setIsAuthenticated(true);
        setIsLoading(false);
        return;
      }

      const token = localStorage.getItem('accessToken');
      let apiBaseUrl;
      try {
        const { getApiBaseUrl } = await import('../../lib/api');
        apiBaseUrl = await getApiBaseUrl();
      } catch (e) {
        apiBaseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';
      }

      // No token found - redirect immediately
      if (!token) {
        if (isMounted) {
          router.replace('/admin/login');
          setIsLoading(false);
        }
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
          cache: 'no-store' // Always fetch fresh data
        });

        if (!response.ok) {
          throw new Error('Authentication failed');
        }

        // Token is valid
        if (isMounted) {
          setIsAuthenticated(true);
          setIsLoading(false);
        }
      } catch (error) {
        console.error('Auth verification error:', error);
        
        // Clear invalid token
        localStorage.removeItem('accessToken');
        localStorage.removeItem('admin');
        
        // Redirect to login
        if (isMounted) {
          router.replace('/admin/login');
          setIsLoading(false);
        }
      }
    };

    verifyAuth();

    // Cleanup function
    return () => {
      isMounted = false;
    };
  }, [router, pathname]);

  // Show nothing while loading (prevents flash of protected content)
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-yellow-50 to-amber-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-yellow-600 mx-auto"></div>
          <p className="mt-4 text-amber-900 font-semibold">Verifying access...</p>
        </div>
      </div>
    );
  }

  // Don't render children if not authenticated
  if (!isAuthenticated) {
    return null;
  }

  // Render protected content
  return <>{children}</>;
}
