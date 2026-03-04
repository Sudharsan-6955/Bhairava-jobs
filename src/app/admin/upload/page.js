'use client';

import UploadForm from '@/components/shared/UploadForm';

export default function AdminUpload() {
  return (
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Post a New Job</h1>
          <p className="text-gray-600 mt-2">
            Fill out the form below to create and publish a new job posting across your platform.
          </p>
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-lg shadow p-8">
          <UploadForm />
        </div>

        {/* Tips Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
            <h3 className="font-bold text-blue-900 mb-2">💡 Tip #1</h3>
            <p className="text-sm text-blue-800">
              Use a clear and specific job title to attract the right candidates and improve visibility.
            </p>
          </div>

          <div className="bg-green-50 border border-green-200 rounded-lg p-6">
            <h3 className="font-bold text-green-900 mb-2">💡 Tip #2</h3>
            <p className="text-sm text-green-800">
              Include relevant keywords in your description to help job seekers find your posting.
            </p>
          </div>

          <div className="bg-purple-50 border border-purple-200 rounded-lg p-6">
            <h3 className="font-bold text-purple-900 mb-2">💡 Tip #3</h3>
            <p className="text-sm text-purple-800">
              Add a professional image to increase application rates and engagement.
            </p>
          </div>
        </div>
      </div>
  );
}
