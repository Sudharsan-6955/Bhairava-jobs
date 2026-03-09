'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminDashboard() {
    const router = useRouter();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const [isVerifying, setIsVerifying] = useState(true);
    const [formData, setFormData] = useState({
        title: '',
        location: '',
        company: '',
        jobType: 'Full-time',
        category: '',
        experience: '',
        description: ''
    });
    const [posterImage, setPosterImage] = useState(null);

    // Additional protection layer - verify auth on component mount
    useEffect(() => {
        const verifyAccess = async () => {
            const token = localStorage.getItem('accessToken');

            if (!token) {
                router.replace('/admin/login');
                return;
            }

            let apiBaseUrl;
            try {
                const { getApiBaseUrl } = await import('../../../lib/api');
                apiBaseUrl = await getApiBaseUrl();
            } catch (e) {
                apiBaseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';
            }

            try {
                const response = await fetch(`${apiBaseUrl}/auth/me`, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    },
                    credentials: 'include',
                    cache: 'no-store'
                });

                if (!response.ok) {
                    // If the token is invalid or the endpoint returned an error, clear and redirect
                    localStorage.clear();
                    router.replace('/admin/login');
                    return;
                }

                setIsVerifying(false);
            } catch (err) {
                // Network-level failures end up here (e.g., CORS, DNS, or fetch aborted)
                console.error('Auth verification failed:', err);
                // Clear local auth and redirect to login since verification couldn't complete
                localStorage.clear();
                router.replace('/admin/login');
            }
        };

        verifyAccess();
    }, [router]);

    // Don't render until verification is complete
    if (isVerifying) {
        return null;
    }

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
        setError('');
        setMessage('');
    };

    const handleFileChange = (event) => {
        const file = event.target.files?.[0] || null;
        setPosterImage(file);
        setError('');
        setMessage('');
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setError('');
        setMessage('');

        if (!posterImage) {
            setError('Please select a poster image.');
            return;
        }

        if (formData.description.trim().length < 50) {
            setError('Description must be at least 50 characters.');
            return;
        }

        const token = localStorage.getItem('accessToken');
        if (!token) {
            setError('Session expired. Please login again.');
            router.push('/admin/login');
            return;
        }

        setIsSubmitting(true);

        try {
            let apiBaseUrl;
            try {
                const { getApiBaseUrl } = await import('../../../lib/api');
                apiBaseUrl = await getApiBaseUrl();
            } catch (e) {
                apiBaseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';
            }
            const payload = new FormData();

            payload.append('title', formData.title);
            payload.append('location', formData.location);
            payload.append('company', formData.company);
            payload.append('jobType', formData.jobType);
            payload.append('category', formData.category);
            payload.append('experience', formData.experience);
            payload.append('description', formData.description);
            payload.append('posterImage', posterImage);

            const response = await fetch(`${apiBaseUrl}/jobs`, {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${token}`
                },
                credentials: 'include',
                body: payload
            });

            const data = await response.json();

            if (!response.ok) {
                const validationMessage = Array.isArray(data.errors) ? data.errors.join(', ') : data.message;
                throw new Error(validationMessage || 'Failed to create job');
            }

            setMessage('Job created successfully with image upload.');
            setFormData({
                title: '',
                location: '',
                company: '',
                jobType: 'Full-time',
                category: '',
                experience: '',
                description: ''
            });
            setPosterImage(null);
        } catch (submitError) {
            setError(submitError.message || 'Failed to submit job.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen bg-white p-8">
            <div className="max-w-6xl mx-auto space-y-6">
                <div className="bg-white text-white pb-6 rounded-lg">
                    <h1 className="text-3xl text-amber-600 font-bold">Product Upload</h1>
                </div>

                <div className="flex justify-center">
                    <div className="bg-white rounded-xl shadow-2xl p-6 border-t-4 border-yellow-600 max-w-4xl w-full">
                        <form className="space-y-6" onSubmit={handleSubmit}>
                            {error && (
                                <div className="bg-red-100 text-red-700 border border-red-300 rounded-lg px-4 py-3">
                                    {error}
                                </div>
                            )}

                            {message && (
                                <div className="bg-green-100 text-green-700 border border-green-300 rounded-lg px-4 py-3">
                                    {message}
                                </div>
                            )}

                            <div>
                                <label className="block text-sm font-bold text-amber-900 mb-3">Job Title</label>
                                <input
                                    name="title"
                                    value={formData.title}
                                    onChange={handleChange}
                                    type="text"
                                    required
                                    placeholder="e.g., Social Media Specialist"
                                    className="w-full px-4 py-3 border-2 border-yellow-400 rounded-lg bg-yellow-50 text-amber-900 placeholder-amber-500 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent shadow-sm transition"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-bold text-amber-900 mb-3">Location</label>
                                <input
                                    name="location"
                                    value={formData.location}
                                    onChange={handleChange}
                                    type="text"
                                    required
                                    placeholder="e.g., Kolkata"
                                    className="w-full px-4 py-3 border-2 border-yellow-400 rounded-lg bg-yellow-50 text-amber-900 placeholder-amber-500 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent shadow-sm transition"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-bold text-amber-900 mb-3">Company Name</label>
                                <input
                                    name="company"
                                    value={formData.company}
                                    onChange={handleChange}
                                    type="text"
                                    required
                                    placeholder="e.g., Brand Connect"
                                    className="w-full px-4 py-3 border-2 border-yellow-400 rounded-lg bg-yellow-50 text-amber-900 placeholder-amber-500 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent shadow-sm transition"
                                />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-bold text-amber-900 mb-3">Job Type</label>
                                    <select
                                        name="jobType"
                                        value={formData.jobType}
                                        onChange={handleChange}
                                        required
                                        className="w-full px-4 py-3 border-2 border-yellow-400 rounded-lg bg-yellow-50 text-amber-900 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent shadow-sm transition"
                                    >
                                        <option value="Full-time">Full-time</option>
                                        <option value="Part-time">Part-time</option>
                                        <option value="Contract">Contract</option>
                                        <option value="Internship">Internship</option>
                                        <option value="Freelance">Freelance</option>
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-sm font-bold text-amber-900 mb-3">Category</label>
                                    <input
                                        name="category"
                                        value={formData.category}
                                        onChange={handleChange}
                                        type="text"
                                        required
                                        placeholder="e.g., Marketing"
                                        className="w-full px-4 py-3 border-2 border-yellow-400 rounded-lg bg-yellow-50 text-amber-900 placeholder-amber-500 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent shadow-sm transition"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-bold text-amber-900 mb-3">Experience</label>
                                <input
                                    name="experience"
                                    value={formData.experience}
                                    onChange={handleChange}
                                    type="text"
                                    required
                                    placeholder="e.g., 2+ years"
                                    className="w-full px-4 py-3 border-2 border-yellow-400 rounded-lg bg-yellow-50 text-amber-900 placeholder-amber-500 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent shadow-sm transition"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-bold text-amber-900 mb-3">Description</label>
                                <textarea
                                    name="description"
                                    value={formData.description}
                                    onChange={handleChange}
                                    rows="5"
                                    required
                                    placeholder="Write at least 50 characters about role responsibilities, required skills, and expectations."
                                    className="w-full px-4 py-3 border-2 border-yellow-400 rounded-lg bg-yellow-50 text-amber-900 placeholder-amber-500 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent shadow-sm transition resize-none"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-bold text-amber-900 mb-3">Poster Image (JPG/PNG/WEBP, max 2MB)</label>
                                <input
                                    type="file"
                                    accept="image/jpeg,image/jpg,image/png,image/webp"
                                    onChange={handleFileChange}
                                    required
                                    className="w-full px-4 py-3 border-2 border-yellow-400 rounded-lg bg-yellow-50 text-amber-900 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:bg-amber-600 file:text-white hover:file:bg-amber-700"
                                />
                                {posterImage && (
                                    <p className="text-sm text-amber-800 mt-2">Selected: {posterImage.name}</p>
                                )}
                            </div>

                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="w-full bg-linear-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-white py-3 rounded-lg font-bold shadow-lg hover:shadow-xl transition disabled:opacity-60"
                            >
                                {isSubmitting ? 'Submitting...' : 'Submit'}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
