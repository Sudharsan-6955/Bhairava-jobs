'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminDashboard() {
  const router = useRouter();

  // Single-entry decision: keep job creation on /admin/jobs.
  // Redirect dashboard to /admin/jobs to avoid duplicate upload forms.
  useEffect(() => {
    router.replace('/admin/jobs');
  }, [router]);

  return null;
}
