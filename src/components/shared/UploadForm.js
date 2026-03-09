'use client';

import { useState, useEffect } from 'react';

export default function UploadForm({
  selectedJob = null,
  onJobUpdated = null,
  onJobCreated = null,
  onCancel = null,
  token = null,
  apiBaseUrl = null
}) {
  const [resolvedApiBase, setResolvedApiBase] = useState(apiBaseUrl);
  const [formData, setFormData] = useState({
    title: '',
    company: '',
    description: '',
    category: '',
    location: '',
    jobType: 'Full-time',
    experience: '',
    deadline: '',
    status: 'active',
  });

  const [dragActive, setDragActive] = useState(false);
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [currentImageUrl, setCurrentImageUrl] = useState(null);

  // ===================================
  // Initialize form with selected job
  // ===================================
  useEffect(() => {
    let mounted = true;
    (async () => {
      if (!apiBaseUrl && typeof window !== 'undefined') {
        try {
          const { getApiBaseUrl } = await import('../../lib/api');
          const base = await getApiBaseUrl();
          if (mounted) setResolvedApiBase(base);
        } catch (e) {
          if (mounted) setResolvedApiBase(process.env.NEXT_PUBLIC_API_URL || 'https://bhairava-jobs-backend.onrender.com/api');
        }
      }
    })();
    return () => { mounted = false; };

    if (selectedJob) {
      setIsEditing(true);
      setFormData({
        title: selectedJob.title || '',
        company: selectedJob.company || '',
        description: selectedJob.description || '',
        category: selectedJob.category || '',
        location: selectedJob.location || '',
        jobType: selectedJob.jobType || 'Full-time',
        experience: selectedJob.experience || '',
        deadline: selectedJob.deadline ? selectedJob.deadline.split('T')[0] : '',
        status: selectedJob.status || 'active',
      });
      setCurrentImageUrl(selectedJob.posterImage);
      setImage(null);
    } else {
      setIsEditing(false);
      setFormData({
        title: '',
        company: '',
        description: '',
        category: '',
        location: '',
        jobType: 'Full-time',
        experience: '',
        deadline: '',
        status: 'active',
      });
      setCurrentImageUrl(null);
      setImage(null);
    }
    setError('');
    setSuccess(false);
  }, [selectedJob]);

  /**
   * Handle form field changes
   */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      if (file.type.startsWith('image/')) {
        setImage(file);
      } else {
        alert('Please drop an image file');
      }
    }
  };

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (file.type.startsWith('image/')) {
        setImage(file);
      } else {
        alert('Please select an image file');
      }
    }
  };

  /**
   * Handle form submission - Create or Update job
   */
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess(false);
    setLoading(true);

    try {
      // Validate required fields
      if (!formData.title || !formData.company || !formData.location || 
          !formData.description || !formData.category || !formData.experience || !formData.jobType) {
        setError('Please fill in all required fields');
        setLoading(false);
        return;
      }

      if (formData.description.trim().length < 50) {
        setError('Job description must be at least 50 characters');
        setLoading(false);
        return;
      }

      // For create: image is required
      if (!isEditing && !image) {
        setError('Please upload a job poster image');
        setLoading(false);
        return;
      }

      // Create form data for multipart upload
      const uploadFormData = new FormData();
      uploadFormData.append('title', formData.title);
      uploadFormData.append('company', formData.company);
      uploadFormData.append('description', formData.description);
      uploadFormData.append('category', formData.category);
      uploadFormData.append('location', formData.location);
      uploadFormData.append('jobType', formData.jobType);
      uploadFormData.append('experience', formData.experience);
      if (formData.deadline) {
        uploadFormData.append('deadline', formData.deadline);
      }
      if (formData.status) {
        uploadFormData.append('status', formData.status);
      }
      
      // Handle image upload or keep existing image
      if (image) {
        // New image is selected, upload it
        uploadFormData.append('posterImage', image);
      } else if (isEditing && currentImageUrl) {
        // Editing without new image, include existing image URL
        uploadFormData.append('posterImage', currentImageUrl);
      }

      const base = resolvedApiBase || apiBaseUrl || process.env.NEXT_PUBLIC_API_URL || 'https://bhairava-jobs-backend.onrender.com/api';
      const url = isEditing 
        ? `${base}/jobs/${selectedJob._id}` 
        : `${base}/jobs`;
      
      const method = isEditing ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        body: uploadFormData,
        headers: {
          'Authorization': `Bearer ${token}`
        },
        credentials: 'include'
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.errors?.[0] || data.message || 
          `Failed to ${isEditing ? 'update' : 'create'} job`
        );
      }

      setSuccess(true);
      
      // Reset form only for create
      if (!isEditing) {
        setFormData({
          title: '',
          company: '',
          description: '',
          category: '',
          location: '',
          jobType: 'Full-time',
          experience: '',
          deadline: '',
          status: 'active',
        });
        setImage(null);
        setTimeout(() => setSuccess(false), 3000);
        
        // Call callback for create
        if (onJobCreated) {
          setTimeout(() => onJobCreated(), 500);
        }
      } else {
        // Call callback for update
        if (onJobUpdated) {
          setTimeout(() => onJobUpdated(), 500);
        }
      }
    } catch (error) {
      console.error('Submit error:', error);
      setError(error.message || `Error ${isEditing ? 'updating' : 'creating'} job`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      {/* Success Message */}
      {success && (
        <div className="mb-6 p-4 bg-green-100 border border-green-400 text-green-700 rounded-lg">
          ✓ Job {isEditing ? 'updated' : 'created'} successfully!
        </div>
      )}

      {/* Error Message */}
      {error && (
        <div className="mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
          ✗ {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Basic Information */}
        <div className="bg-gray-50 p-6 rounded-lg">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Basic Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Title */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Job Title <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="e.g., Senior React Developer"
              />
            </div>

            {/* Company */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Company Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="company"
                value={formData.company}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="e.g., Tech Innovations Inc."
              />
            </div>

            {/* Category */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Category <span className="text-red-500">*</span>
              </label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Select Category</option>
                <option value="Technology">Technology</option>
                <option value="Design">Design</option>
                <option value="Marketing">Marketing</option>
                <option value="Sales">Sales</option>
                <option value="HR">HR</option>
                <option value="Finance">Finance</option>
                <option value="Content">Content</option>
                <option value="Other">Other</option>
              </select>
            </div>

            {/* Location */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Location <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="e.g., New York, NY"
              />
            </div>

            {/* Job Type */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Job Type <span className="text-red-500">*</span>
              </label>
              <select
                name="jobType"
                value={formData.jobType}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="Full-time">Full-time</option>
                <option value="Part-time">Part-time</option>
                <option value="Contract">Contract</option>
                <option value="Internship">Internship</option>
                <option value="Freelance">Freelance</option>
                <option value="Remote">Remote</option>
              </select>
            </div>

            {/* Experience Level */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Experience Level <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="experience"
                value={formData.experience}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="e.g., 2-3 years"
              />
            </div>

            {/* Status */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Status
              </label>
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="active">Active</option>
                <option value="closed">Closed</option>
              </select>
            </div>

            {/* Application Deadline */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Application Deadline
              </label>
              <input
                type="date"
                name="deadline"
                value={formData.deadline}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
        </div>

        {/* Job Details */}
        <div className="bg-gray-50 p-6 rounded-lg">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Job Details</h3>
          
          {/* Description */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Job Description <span className="text-red-500">*</span>
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
              rows="4"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter detailed job description... (minimum 50 characters)"
            />
          </div>
        </div>

        {/* Image Upload */}
        <div className="bg-gray-50 p-6 rounded-lg">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Job Poster Image {!isEditing && <span className="text-red-500">*</span>}
          </h3>
          {currentImageUrl && !image && (
            <div className="mb-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <p className="text-sm text-blue-700 mb-2">Current Image:</p>
              <img
                src={currentImageUrl}
                alt="Current"
                className="max-w-xs max-h-48 rounded-lg"
              />
            </div>
          )}
          <div
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
            className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition ${
              dragActive
                ? 'border-blue-500 bg-blue-50'
                : 'border-gray-300 bg-gray-50'
            }`}
          >
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="hidden"
              id="image-input"
            />
            <label htmlFor="image-input" className="cursor-pointer block">
              <div className="text-4xl mb-2">📷</div>
              <p className="text-sm text-gray-600 mb-1">
                {image ? image.name : 'Drag and drop your image here'}
              </p>
              <p className="text-xs text-gray-500">or click to select a file</p>
            </label>
          </div>
          {image && (
            <div className="mt-4">
              <p className="text-sm text-gray-600 mb-2">New Image Preview:</p>
              <img
                src={URL.createObjectURL(image)}
                alt="Preview"
                className="max-w-xs max-h-48 rounded-lg"
              />
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4 justify-between">
          <div className="flex gap-4 flex-1">
            <button
              type="submit"
              disabled={loading}
              className="flex-1 bg-linear-to-r from-blue-600 to-blue-800 text-white py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-blue-900 transition disabled:opacity-50"
            >
              {loading ? (
                <span>{isEditing ? 'Updating...' : 'Creating...'}</span>
              ) : (
                <span>{isEditing ? '✓ Update Job' : '✓ Create Job'}</span>
              )}
            </button>
          </div>
          {isEditing && onCancel && (
            <button
              type="button"
              onClick={onCancel}
              className="px-6 bg-gray-200 text-gray-800 py-3 rounded-lg font-semibold hover:bg-gray-300 transition"
            >
              Cancel
            </button>
          )}
          {!isEditing && (
            <button
              type="reset"
              className="px-6 bg-gray-200 text-gray-800 py-3 rounded-lg font-semibold hover:bg-gray-300 transition"
            >
              Clear
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
