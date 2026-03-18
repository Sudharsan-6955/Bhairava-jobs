'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import UploadForm from '@/components/shared/UploadForm';

export default function EditJobPage() {
  const router = useRouter();
  const params = useParams();
  const { id } = params || {};

  const [selectedJob, setSelectedJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [apiBaseUrl, setApiBaseUrl] = useState(null);
  const [apiResolved, setApiResolved] = useState(false);

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const { getApiBaseUrl } = await import('../../../../../lib/api');
        const base = await getApiBaseUrl();
        if (mounted) setApiBaseUrl(base);
      } catch (e) {
        try {
          const { getApiBaseUrlSync } = await import('../../../../../lib/api');
          if (mounted) setApiBaseUrl(getApiBaseUrlSync());
        } catch (_) {
          if (mounted) setApiBaseUrl(process.env.NEXT_PUBLIC_API_URL || 'https://bhairava-jobs-backend.onrender.com/api');
        }
      } finally {
        if (mounted) setApiResolved(true);
      }
    })();
    return () => { mounted = false; };
  }, []);

  useEffect(() => {
    if (!id || !apiResolved) return;

    let mounted = true;
    (async () => {
      try {
        const token = typeof window !== 'undefined' ? localStorage.getItem('accessToken') : null;
        const base = apiBaseUrl || process.env.NEXT_PUBLIC_API_URL || 'https://bhairava-jobs-backend.onrender.com/api';
        const res = await fetch(`${base}/jobs/${id}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': token ? `Bearer ${token}` : ''
          },
          credentials: 'include'
        });

        if (!res.ok) {
          let message = 'Failed to load job';
          try {
            const errData = await res.json();
            message = errData?.message || message;
          } catch (_) {
            // Keep default message when body is not JSON.
          }
          throw new Error(message);
        }

        const data = await res.json();
        if (mounted) setSelectedJob(data.data || data);
      } catch (err) {
        console.error('Load job error:', err);
      } finally {
        if (mounted) setLoading(false);
      }
    })();

    return () => { mounted = false; };
  }, [id, apiBaseUrl, apiResolved]);

  const handleUpdated = () => {
    router.push('/admin/jobs');
  };

  if (loading) {
    return (
      <div className="text-center py-12">
        <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        <p className="mt-4 text-gray-600">Loading job...</p>
      </div>
    );
  }

  if (!selectedJob) {
    return (
      <div className="p-6 bg-white rounded-lg">
        <p className="text-gray-600">Job not found or you don't have permission.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Edit Job</h1>
        <p className="text-gray-600 mt-2">Update job details and save changes.</p>
      </div>

      <div className="bg-white rounded-lg shadow p-8">
        <UploadForm
          selectedJob={selectedJob}
          onJobUpdated={handleUpdated}
          token={typeof window !== 'undefined' ? localStorage.getItem('accessToken') : null}
          apiBaseUrl={apiBaseUrl}
        />
      </div>
    </div>
  );
}
