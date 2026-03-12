"use client";
import { useState, useRef, useEffect } from 'react';
import api from '@/lib/api';

export default function TestimonialForm() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [company, setCompany] = useState('');
    const [message, setMessage] = useState('');
    const [rating, setRating] = useState(5);
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(null);
    const timerRef = useRef(null);

    const submit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setSuccess(null);
        try {
            const base = await api.getApiBaseUrl();
            const res = await fetch(`${base}/testimonials`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, email, company, message, rating })
            });
            const data = await res.json();
            if (res.ok) {
                setSuccess('Thank you — your testimonial was submitted.');
                setName(''); setEmail(''); setCompany(''); setMessage(''); setRating(5);
            } else {
                setSuccess(data.message || 'Submission failed');
            }

            // Auto-hide success/failure message after 3s
            if (timerRef.current) clearTimeout(timerRef.current);
            timerRef.current = setTimeout(() => setSuccess(null), 3000);
        } catch (err) {
            setSuccess('Network error');
            if (timerRef.current) clearTimeout(timerRef.current);
            timerRef.current = setTimeout(() => setSuccess(null), 3000);
        }
        setLoading(false);
    };

    useEffect(() => {
        return () => {
            if (timerRef.current) clearTimeout(timerRef.current);
        };
    }, []);

    return (
        <section className="px-4 md:px-8 lg:px-20 py-24 bg-white">
            <div className="max-w-7xl mx-auto">
                <div className="flex justify-center">
                    <div className="w-full max-w-3xl bg-white drop-shadow-xl rounded-2xl p-6 md:p-8 border border-gray-200">
                        <h2 className="text-2xl md:text-3xl text-gray-500 font-bold text-center mb-6">Share Your Testimonial</h2>
                        <form className="space-y-4" onSubmit={submit}>
                            <div>
                                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                                <input id="name" name="name" value={name} onChange={(e) => setName(e.target.value)} placeholder="Your Name" className="w-full px-4 py-3 border border-gray-300 text-gray-700 placeholder-gray-400 rounded-lg focus:border-[#667085] focus:ring-2 focus:ring-[#667085] focus:ring-opacity-20 focus:outline-none" required />
                            </div>

                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                                <input id="email" name="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" className="w-full px-4 py-3 text-gray-700 placeholder-gray-400 border border-gray-300 rounded-lg focus:border-[#667085] focus:ring-2 focus:ring-[#667085] focus:ring-opacity-20 focus:outline-none" />
                            </div>

                            <div>
                                <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-2">Company / Role (optional)</label>
                                <input id="company" name="company" value={company} onChange={(e) => setCompany(e.target.value)} placeholder="Company or role" className="w-full px-4 py-3 border border-gray-300 text-gray-700 placeholder-gray-400 rounded-lg focus:border-[#667085] focus:ring-2 focus:ring-[#667085] focus:ring-opacity-20 focus:outline-none" />
                            </div>

                            <div>
                                <label htmlFor="testimonial" className="block text-sm font-medium text-gray-700 mb-2">Testimonial</label>
                                <textarea id="testimonial" name="testimonial" rows={6} value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Tell us about your experience..." className="w-full px-4 py-3 border border-gray-300 text-gray-700 placeholder-gray-400 rounded-lg focus:border-[#667085] focus:ring-2 focus:ring-[#667085] focus:ring-opacity-20 focus:outline-none resize-none" required></textarea>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Rating</label>
                                <div className="flex items-center gap-2">
                                    {[1,2,3,4,5].map((s) => (
                                        <button type="button" key={s} onClick={() => setRating(s)} className={`text-2xl ${s <= rating ? 'text-yellow-400' : 'text-gray-300'}`} aria-label={`Rate ${s}`}>
                                            ★
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div className="flex justify-center pt-2">
                                <button type="submit" disabled={loading} style={{ backgroundColor: '#667085' }} className="px-8 py-3 text-white font-semibold rounded-full hover:opacity-90 transition duration-300 flex items-center gap-3">
                                    {loading ? 'Submitting...' : 'Submit'}
                                </button>
                            </div>
                            {success && <p className="text-center text-sm mt-3 text-gray-700">{success}</p>}
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
}
