'use client';

import { usePathname } from 'next/navigation';
import AdminLayout from '@/components/shared/AdminLayout';
import AuthGuard from '@/components/shared/AuthGuard';

export default function AdminRootLayout({ children }) {
  const pathname = usePathname();

  // Don't wrap login page with AuthGuard/AdminLayout
  if (pathname === '/admin/login') {
    return <>{children}</>;
  }

  // Protect all other admin pages with AuthGuard and AdminLayout
  return (
    <AuthGuard>
      <AdminLayout>{children}</AdminLayout>
    </AuthGuard>
  );
}
