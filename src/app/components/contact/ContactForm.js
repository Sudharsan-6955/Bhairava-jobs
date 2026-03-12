"use client";

import { useState, useRef, useEffect } from 'react';
import { getApiBaseUrlSync, getApiBaseUrl } from '@/lib/api';

export default function ContactForm() {
    const [form, setForm] = useState({ fullName: '', email: '', contactNumber: '', qualification: '', message: '' });
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState('');
    const [error, setError] = useState('');
    const errorTimer = useRef(null);

    useEffect(() => {
        return () => {
            if (errorTimer.current) clearTimeout(errorTimer.current);
        };
    }, []);

    const handleChange = (e) => setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        setSuccess('');
        // Basic client-side validation
        if (!form.fullName || !form.email || !form.contactNumber || !form.qualification|| !form.message) {
            if (errorTimer.current) clearTimeout(errorTimer.current);
            setError('Fill the form without empty field');
            errorTimer.current = setTimeout(() => setError(''), 3000);
            setLoading(false);
            return;
        }

        try {
            const base = await getApiBaseUrl().catch(() => getApiBaseUrlSync());
            const res = await fetch(`${base}/contacts`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(form),
                credentials: 'include'
            });

            const data = await res.json().catch(() => ({}));

            if (!res.ok) {
                // Show server-provided message if available
                setError(data.message || 'Failed to send message');
                setLoading(false);
                return;
            }

            setSuccess('Message received — we will contact you soon');
            setForm({ fullName: '', email: '', contactNumber: '', qualification: '', message: '' });
            setTimeout(() => setSuccess(''), 4000);
        } catch (err) {
            console.error(err);
            setError('Failed to send message');
        } finally {
            setLoading(false);
        }
    };

    return (
        <section className="md:px-6 px-3 pt-20 bg-white">
            <div className="max-w-6xl mx-auto">
                <div className="grid md:grid-cols-2 gap-16 items-center">
                    {/* Left: Ping Us Section */}
                    <div className="space-y-8">
                        <h2 className="text-4xl md:text-5xl font-bold">
                            <span className="text-[#667085]">Ping</span>{' '}
                            <span className="text-black">Us !</span>
                        </h2>
                        
                        {/* Illustration */}
                        <div className="flex justify-center md:justify-start">
                            <img 
                                src="/images/Contact/Contact.svg" 
                                alt="Ping Us Illustration" 
                                className="w-full max-w-md h-auto"
                            />
                        </div>
                    </div>

                    {/* Right: Contact Form */}
                    <div className="bg-white drop-shadow-xl rounded-2xl p-4 md:p-8 border border-gray-200">
                        <form className="space-y-6" onSubmit={handleSubmit}>
                            {/* Full Name and Contact Number - Side by side */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {/* Full Name */}
                                <div>
                                    <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-2">
                                        Full Name
                                    </label>
                                    <input
                                        type="text"
                                        id="fullName"
                                        name="fullName"
                                        value={form.fullName}
                                        onChange={handleChange}
                                        placeholder="Your Name"
                                        className="w-full px-4 py-3 border border-gray-300 text-gray-700 placeholder-gray-400 rounded-lg focus:border-[#667085] focus:ring-2 focus:ring-[#667085] focus:ring-opacity-20 focus:outline-none transition"
                                    />
                                </div>

                                {/* Contact Number */}
                                <div>
                                    <label htmlFor="contactNumber" className="block text-sm font-medium text-gray-700 mb-2">
                                        Contact Number
                                    </label>
                                    <input
                                        type="tel"
                                        id="contactNumber"
                                        name="contactNumber"
                                        value={form.contactNumber}
                                        onChange={handleChange}
                                        placeholder="+91 9123456789"
                                        className="w-full px-4 py-3 border border-gray-300 text-gray-700 placeholder-gray-400 rounded-lg focus:border-[#667085] focus:ring-2 focus:ring-[#667085] focus:ring-opacity-20 focus:outline-none transition"
                                    />
                                </div>
                            </div>

                            {/* Email */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {/* Full Name */}
                                <div>
                                    <label htmlFor="Email" className="block text-sm font-medium text-gray-700 mb-2">
                                        Email
                                    </label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        value={form.email}
                                        onChange={handleChange}
                                        placeholder="Your Email"
                                        className="w-full px-4 py-3 border border-gray-300 text-gray-700 placeholder-gray-400 rounded-lg focus:border-[#667085] focus:ring-2 focus:ring-[#667085] focus:ring-opacity-20 focus:outline-none transition"
                                    />
                                </div>

                                {/* Contact Number */}
                                <div>
                                    <label htmlFor="Qualification" className="block text-sm font-medium text-gray-700 mb-2">
                                        Qualification
                                    </label>
                                    <input
                                        type="text"
                                        id="qualification"
                                        name="qualification"
                                        value={form.qualification}
                                        onChange={handleChange}
                                        placeholder="Educational"
                                        className="w-full px-4 py-3 border border-gray-300 text-gray-700 placeholder-gray-400 rounded-lg focus:border-[#667085] focus:ring-2 focus:ring-[#667085] focus:ring-opacity-20 focus:outline-none transition"
                                    />
                                </div>
                            </div>

                            {/* Description */}
                            <div>
                                <label htmlFor="description" className="block text-sm font-medium text-gray-900 mb-2">
                                    Description
                                </label>
                                <textarea
                                    id="message"
                                    name="message"
                                    value={form.message}
                                    onChange={handleChange}
                                    rows="5"
                                    placeholder="Enter your message..."
                                    className="w-full px-4 py-3 border border-gray-300 text-gray-700 placeholder-gray-400 rounded-lg focus:border-[#667085] focus:ring-2 focus:ring-[#667085] focus:ring-opacity-20 focus:outline-none transition resize-none"
                                ></textarea>
                            </div>
                            {/* Status (small inline text below description) */}
                            {success && (
                                <div role="status" aria-live="polite" className=" text-sm text-green-800 text-center">
                                    ✓ {success}
                                </div>
                            )}
                            {error && (
                                <div role="status" aria-live="polite" className=" text-sm text-red-800 text-center">
                                    ✗ {error}
                                </div>
                            )}

                            {/* Submit Button */}
                            <div className="flex justify-center ">
                                <button
                                    type="submit"
                                    disabled={loading}
                                    style={{ backgroundColor: '#667085' }}
                                    className="px-10 py-3 text-white font-semibold rounded-full hover:opacity-90 transition duration-300 flex items-center justify-center gap-3 shadow-lg hover:shadow-xl disabled:opacity-60"
                                >
                                    <img src="/images/Contact/send.svg" alt="Send Icon" className="w-5 h-5" />
                                    {loading ? 'Sending...' : 'Send Message'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
}
