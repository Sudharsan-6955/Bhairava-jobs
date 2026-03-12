'use client';

import { useState, useEffect } from 'react';

export default function AdminContactsPage() {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const token = typeof window !== 'undefined' ? localStorage.getItem('accessToken') : null;
  const [apiBaseUrl, setApiBaseUrl] = useState(null);

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const { getApiBaseUrl } = await import('../../../lib/api');
        const base = await getApiBaseUrl();
        if (mounted) setApiBaseUrl(base);
      } catch (e) {
        const { getApiBaseUrlSync } = await import('../../../lib/api');
        if (mounted) setApiBaseUrl(getApiBaseUrlSync());
      }
    })();
    return () => { mounted = false; };
  }, []);

  const fetchContacts = async () => {
    if (!token) return;
    setLoading(true);
    setError('');
    try {
      const { getApiBaseUrlSync } = await import('../../../lib/api');
      const base = apiBaseUrl || getApiBaseUrlSync();
      const res = await fetch(`${base}/contacts?limit=200`, {
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        credentials: 'include'
      });
      if (!res.ok) throw new Error('Failed to fetch contacts');
      const data = await res.json();
      if (data.success) setContacts(data.data || []);
    } catch (err) {
      console.error(err);
      setError('Failed to load contacts');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchContacts(); }, [token, apiBaseUrl]);

  const handleDelete = async (id) => {
    if (!confirm('Delete this message?')) return;
    try {
      const { getApiBaseUrlSync } = await import('../../../lib/api');
      const base = apiBaseUrl || getApiBaseUrlSync();
      const res = await fetch(`${base}/contacts/${id}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        credentials: 'include'
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Failed to delete');
      setSuccess('Message deleted');
      fetchContacts();
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      console.error(err);
      setError(err.message || 'Failed to delete');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Contact Messages</h1>
          <p className="text-gray-600 mt-1">View and manage messages submitted via the contact page.</p>
        </div>
      </div>

      {success && <div className="p-3 bg-green-100 text-green-800 rounded">✓ {success}</div>}
      {error && <div className="p-3 bg-red-100 text-red-800 rounded">✗ {error}</div>}

      <div className="bg-white rounded-lg shadow p-6">
        {loading ? (
          <div className="text-center py-8">Loading...</div>
        ) : contacts.length === 0 ? (
          <div className="text-center py-8">No messages found.</div>
        ) : (
          <div className="space-y-4">
            {contacts.map(c => (
              <div key={c._id} className="border p-4 rounded-lg flex justify-between items-start">
                <div>
                  <div className="text-lg font-semibold">{c.fullName} <span className="text-sm text-gray-500">· {c.email}</span></div>
                  <div className="text-sm text-gray-600 mt-1">{c.contactNumber || ''} {c.qualification ? `· ${c.qualification}` : ''}</div>
                  <p className="mt-3 text-gray-800 whitespace-pre-wrap">{c.message}</p>
                  <div className="text-xs text-gray-500 mt-2">{new Date(c.createdAt).toLocaleString()}</div>
                </div>
                <div className="flex flex-col gap-2 ml-4">
                  <button onClick={() => handleDelete(c._id)} className="px-3 py-1 bg-red-600 text-white rounded">Delete</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
