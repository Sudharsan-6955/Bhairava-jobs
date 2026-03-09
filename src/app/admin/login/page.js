'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminLogin() {
  const router = useRouter();
  const quote = "Success is the sum of small efforts repeated day in and day out. — Robert Collier";
  
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // Prevent access if already logged in
  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem('accessToken');
      if (token) {
        try {
          const { getApiBaseUrl } = await import('../../../lib/api');
          const API_URL = await getApiBaseUrl();

          const response = await fetch(`${API_URL}/auth/me`, {
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json'
            },
            credentials: 'include',
            cache: 'no-store'
          });

          if (response.ok) {
            router.replace('/admin/dashboard');
          } else {
            localStorage.removeItem('accessToken');
            localStorage.removeItem('admin');
            sessionStorage.clear();
          }
        } catch (error) {
          localStorage.removeItem('accessToken');
          localStorage.removeItem('admin');
          sessionStorage.clear();
        }
      }
    };

    checkAuth();
  }, [router]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setError(''); // Clear error on input change
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    // Validation
    if (!formData.email || !formData.password) {
      setError('Please fill in all fields');
      setLoading(false);
      return;
    }

    if (formData.password.length < 8) {
      setError('Password must be at least 8 characters');
      setLoading(false);
      return;
    }

    try {
      const { getApiBaseUrl } = await import('../../../lib/api');
      const API_URL = await getApiBaseUrl();

      const loginUrl = `${API_URL}/auth/login`;
      console.debug('Login URL:', loginUrl);
      const response = await fetch(loginUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include', // Important for cookies
        body: JSON.stringify({
          email: formData.email,
          password: formData.password
        })
      });

      const data = await response.json();

      if (!response.ok) {
        // Invalid credentials - show error silently without console error
        setError(data.message || 'Login failed');
        setLoading(false);
        return;
      }

      if (data.success) {
        // Store admin info in localStorage
        localStorage.setItem('admin', JSON.stringify(data.data.admin));
        localStorage.setItem('accessToken', data.data.accessToken);
        
        // Show success message
        console.log('✅ Login successful!');
        
        // Redirect to dashboard
        router.push('/admin/dashboard');
      } else {
        setError(data.message || 'Login failed');
      }
    } catch (err) {
      // Only show console error for actual network errors
      console.error('Network error:', err);
      setError('Network error. Please check if the server is running.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-600 via-amber-700 to-amber-900 flex items-center justify-center p-4">
      {/* Login Container */}
      <div className="w-full max-w-md">
        {/* Card */}
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden border-t-4 border-yellow-500">
          {/* Header */}
          <div className="bg-gradient-to-r from-amber-900 to-yellow-900 p-10 text-center">
            <div className="text-6xl mb-4">🏆</div>
            <h1 className="text-3xl font-bold text-white">Admin Portal</h1>
            <p className="text-yellow-100 mt-1 text-sm">🎯 Manage Your Premium Products</p>
          </div>

          {/* Welcome Quote */}
          <div className="bg-gradient-to-r from-yellow-50 to-amber-50 border-b-2 border-yellow-400 px-6 py-4">
            <p className="text-center text-sm italic text-amber-900 font-medium">
              ✨ "{quote}"
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="p-8 space-y-5">
            {/* Error Message */}
            {error && (
              <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded">
                <p className="font-medium">❌ {error}</p>
              </div>
            )}

            {/* Email Field */}
            <div>
              <label htmlFor="email" className="block text-sm font-bold text-amber-900 mb-2">
                👤 Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                disabled={loading}
                required
                autoComplete="username"
                className="w-full px-4 py-3 border-2 border-yellow-400 rounded-lg bg-yellow-50 text-amber-900 placeholder-amber-500 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent shadow-sm transition disabled:opacity-50 disabled:cursor-not-allowed"
              />
            </div>

            {/* Password Field */}
            <div>
              <label htmlFor="password" className="block text-sm font-bold text-amber-900 mb-2">
                🔐 Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter your secure password"
                disabled={loading}
                required
                minLength={8}
                autoComplete="current-password"
                className="w-full px-4 py-3 border-2 border-yellow-400 rounded-lg bg-yellow-50 text-amber-900 placeholder-amber-500 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent shadow-sm transition disabled:opacity-50 disabled:cursor-not-allowed"
              />
            </div>

            {/* Login Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-yellow-500 to-amber-600 hover:from-yellow-600 hover:to-amber-700 text-white font-bold py-3 rounded-lg shadow-lg hover:shadow-xl transition transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            >
              {loading ? '⏳ Logging in...' : '🚀 Login to Admin'}
            </button>
          </form>

          {/* Footer */}
          <div className="bg-gradient-to-r from-yellow-100 to-amber-100 px-8 py-4 text-center border-t-2 border-yellow-400">
            <p className="text-xs text-amber-900 font-medium">
              🔒 Secure & Encrypted Admin Area
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
