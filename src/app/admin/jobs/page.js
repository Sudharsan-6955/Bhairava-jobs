'use client';

import { useState, useEffect } from 'react';
import UploadForm from '@/components/shared/UploadForm';

/**
 * Admin Jobs Management Page
 * Displays all jobs created by the admin with Edit and Delete functionality
 * - View all jobs in table/card format
 * - Edit button loads job data into form
 * - Delete button with confirmation dialog
 * - Real-time status updates
 */
export default function AdminJobsPage() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedJob, setSelectedJob] = useState(null);
  const [showJobForm, setShowJobForm] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [jobToDelete, setJobToDelete] = useState(null);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  const apiBaseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';
  const token = typeof window !== 'undefined' ? localStorage.getItem('accessToken') : null;

  /**
   * Fetch all jobs created by the admin
   */
  const fetchJobs = async () => {
    try {
      setLoading(true);
      setError('');

      const params = new URLSearchParams({
        page: '1',
        limit: '100'
      });

      if (filterStatus !== 'all') {
        params.set('status', filterStatus);
      }

      if (filterStatus === 'closed') {
        params.set('includeDeleted', 'true');
      }

      const response = await fetch(`${apiBaseUrl}/jobs?${params.toString()}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        credentials: 'include'
      });

      if (!response.ok) {
        throw new Error('Failed to fetch jobs');
      }

      const data = await response.json();
      
      if (data.success && Array.isArray(data.data)) {
        setJobs(data.data);
      }
    } catch (err) {
      console.error('Error fetching jobs:', err);
      setError('Failed to load jobs. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) {
      fetchJobs();
    }
  }, [token, filterStatus]);

  /**
   * Handle edit button click - load job data
   */
  const handleEdit = (job) => {
    setSelectedJob(job);
    setShowJobForm(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  /**
   * Handle delete button click - show confirmation modal
   */
  const handleDeleteClick = (job) => {
    setJobToDelete(job);
    setShowDeleteModal(true);
  };

  /**
   * Confirm and execute delete
   */
  const handleConfirmDelete = async () => {
    if (!jobToDelete) return;

    try {
      setDeleteLoading(true);

      const response = await fetch(
        `${apiBaseUrl}/jobs/${jobToDelete._id}`,
        {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          credentials: 'include'
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to delete job');
      }

      setSuccess(`Job "${jobToDelete.title}" deleted successfully`);
      setShowDeleteModal(false);
      setJobToDelete(null);

      // Refresh jobs list
      await fetchJobs();

      // Clear success message after 3 seconds
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      console.error('Delete error:', err);
      setError(err.message || 'Failed to delete job');
    } finally {
      setDeleteLoading(false);
    }
  };

  /**
   * Handle cancel edit
   */
  const handleCancelEdit = () => {
    setSelectedJob(null);
    setShowJobForm(false);
  };

  /**
   * Handle successful job update
   */
  const handleJobUpdated = () => {
    setSuccess('Job updated successfully');
    setSelectedJob(null);
    setShowJobForm(false);
    fetchJobs();
    setTimeout(() => setSuccess(''), 3000);
  };

  /**
   * Handle successful job creation
   */
  const handleJobCreated = () => {
    setSuccess('Job created successfully');
    setSelectedJob(null);
    setShowJobForm(false);
    fetchJobs();
    setTimeout(() => setSuccess(''), 3000);
  };

  return (
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Manage Jobs</h1>
            <p className="text-gray-600 mt-2">
              View, edit, and delete your job postings
            </p>
          </div>
          <button
            onClick={() => {
              setSelectedJob(null);
              setShowJobForm(true);
            }}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
          >
            + New Job
          </button>
        </div>

        {/* Success Message */}
        {success && (
          <div className="p-4 bg-green-100 border border-green-400 text-green-700 rounded-lg">
            ✓ {success}
          </div>
        )}

        {/* Error Message */}
        {error && (
          <div className="p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
            ✗ {error}
          </div>
        )}

        {/* Job Form (Create/Edit) */}
        {showJobForm && (
          <div className="bg-white rounded-lg shadow p-8 border-l-4 border-blue-500">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              {selectedJob ? 'Edit Job' : 'Create New Job'}
            </h2>
            <UploadForm
              selectedJob={selectedJob}
              onJobUpdated={handleJobUpdated}
              onJobCreated={handleJobCreated}
              onCancel={handleCancelEdit}
              token={token}
              apiBaseUrl={apiBaseUrl}
            />
          </div>
        )}

        {/* Filter Status Bar */}
        {!showJobForm && (
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
              <div className="flex gap-2">
                {['all', 'active', 'closed'].map(status => (
                  <button
                    key={status}
                    onClick={() => setFilterStatus(status)}
                    className={`px-4 py-2 rounded-lg font-medium transition-all ${
                      filterStatus === status
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {status.charAt(0).toUpperCase() + status.slice(1)} ({jobs.filter(j => status === 'all' || j.status === status).length})
                  </button>
                ))}
              </div>
              <div className="text-sm text-gray-600">
                Total: {jobs.length} jobs
              </div>
            </div>
          </div>
        )}

        {/* Jobs List */}
        {!showJobForm && (
          <div>
            {loading ? (
              <div className="text-center py-12">
                <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
                <p className="mt-4 text-gray-600">Loading jobs...</p>
              </div>
            ) : jobs.length === 0 ? (
              <div className="text-center py-12 bg-white rounded-lg shadow">
                <p className="text-gray-600 mb-4">No jobs found</p>
                <button
                  onClick={() => {
                    setSelectedJob(null);
                    setShowJobForm(true);
                  }}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Create Your First Job
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-6">
                {jobs.map((job) => (
                  <div
                    key={job._id}
                    className="bg-white rounded-lg shadow hover:shadow-lg transition-shadow border-l-4 border-gray-300"
                  >
                    <div className="p-6">
                      <div className="flex justify-between items-start gap-4">
                        {/* Job Info */}
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="text-xl font-bold text-gray-900">
                              {job.title}
                            </h3>
                            <span
                              className={`px-3 py-1 rounded-full text-sm font-medium ${
                                job.status === 'active'
                                  ? 'bg-green-100 text-green-700'
                                  : 'bg-red-100 text-red-700'
                              }`}
                            >
                              {job.status}
                            </span>
                          </div>
                          <p className="text-gray-600 mb-3">
                            {job.company} • {job.location}
                          </p>
                          <div className="flex flex-wrap gap-2 mb-3">
                            <span className="inline-block px-2 py-1 bg-gray-100 text-gray-700 rounded text-sm">
                              {job.jobType}
                            </span>
                            <span className="inline-block px-2 py-1 bg-blue-100 text-blue-700 rounded text-sm">
                              {job.category}
                            </span>
                            {job.salary && (
                              <span className="inline-block px-2 py-1 bg-green-100 text-green-700 rounded text-sm">
                                {job.salary}
                              </span>
                            )}
                          </div>
                          <p className="text-sm text-gray-600 line-clamp-2">
                            {job.description}
                          </p>
                          <div className="mt-3 flex gap-4 text-sm text-gray-500">
                            <span>📅 {new Date(job.createdAt).toLocaleDateString()}</span>
                          </div>
                        </div>

                        {/* Actions */}
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleEdit(job)}
                            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors font-medium whitespace-nowrap"
                          >
                            ✎ Edit
                          </button>
                          <button
                            onClick={() => handleDeleteClick(job)}
                            className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors font-medium whitespace-nowrap"
                          >
                            🗑️ Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Delete Confirmation Modal */}
        {showDeleteModal && jobToDelete && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg shadow-lg max-w-md w-full p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">
                Delete Job?
              </h2>
              <p className="text-gray-600 mb-6">
                Are you sure you want to delete "{jobToDelete.title}"? This action cannot be undone.
              </p>
              <div className="flex gap-4 justify-end">
                <button
                  onClick={() => {
                    setShowDeleteModal(false);
                    setJobToDelete(null);
                  }}
                  disabled={deleteLoading}
                  className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors font-medium disabled:opacity-50"
                >
                  Cancel
                </button>
                <button
                  onClick={handleConfirmDelete}
                  disabled={deleteLoading}
                  className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium disabled:opacity-50"
                >
                  {deleteLoading ? 'Deleting...' : 'Delete'}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
  );
}
