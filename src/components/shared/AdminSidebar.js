'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function AdminNavbar({ onLogout }) {
  const pathname = usePathname();

  const isActive = (path) => pathname === path ? 'bg-yellow-900 text-white' : 'text-yellow-50 hover:bg-yellow-800';

  return (
    <nav className="w-full bg-linear-to-r from-amber-900 via-yellow-900 to-amber-950 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Left: Admin Dashboard Title & Navigation */}
          <div className="flex items-center gap-8">
            <h1 className="text-xl font-bold text-white whitespace-nowrap">
              🏆 Admin Dashboard
            </h1>

            {/* Navigation Links */}
            <div className="hidden md:flex items-center gap-4">
              <Link
                href="/admin/jobs"
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${isActive('/admin/jobs')}`}
              >
                💼 Manage Jobs
              </Link>
              <Link
                href="/admin/dashboard"
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${isActive('/admin/dashboard')}`}
              >
                📊 Dashboard
              </Link>
            </div>
          </div>

          {/* Right: Logout Button */}
          <div>
            <button
              type="button"
              onClick={onLogout}
              className="px-6 py-2 bg-red-600 hover:bg-red-700 text-white font-medium rounded-lg transition duration-200 shadow-md hover:shadow-lg"
            >
              Logout
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className="md:hidden pb-4 flex gap-2 flex-wrap">
          <Link
            href="/admin/jobs"
            className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${isActive('/admin/jobs')}`}
          >
            💼 Manage
          </Link>
          <Link
            href="/admin/dashboard"
            className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${isActive('/admin/dashboard')}`}
          >
            📊 Stats
          </Link>
        </div>
      </div>
    </nav>
  );
}
