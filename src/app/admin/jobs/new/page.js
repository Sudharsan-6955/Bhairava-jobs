'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import UploadForm from '@/components/shared/UploadForm';

export default function NewJobPage() {
  const router = useRouter();
  const [apiBaseUrl, setApiBaseUrl] = useState(null);

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const { getApiBaseUrl } = await import('../../../../lib/api');
        const base = await getApiBaseUrl();
        if (mounted) setApiBaseUrl(base);
      } catch (e) {
        try {
          const { getApiBaseUrlSync } = await import('../../../../lib/api');
          if (mounted) setApiBaseUrl(getApiBaseUrlSync());
        } catch (_) {
          if (mounted) setApiBaseUrl(process.env.NEXT_PUBLIC_API_URL || 'https://bhairava-jobs-backend.onrender.com/api');
        }
      }
    })();
    return () => { mounted = false; };
  }, []);

  const token = typeof window !== 'undefined' ? localStorage.getItem('accessToken') : null;

  const handleCreated = () => {
    router.push('/admin/jobs');
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Create New Job</h1>
        <p className="text-gray-600 mt-2">Use the form below to create a new job posting.</p>
      </div>

      <div className="bg-white rounded-lg shadow p-8">
        <UploadForm
          selectedJob={null}
          onJobCreated={handleCreated}
          token={token}
          apiBaseUrl={apiBaseUrl}
        />
      </div>
    </div>
  );
}
