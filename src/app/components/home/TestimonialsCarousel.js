
"use client";
import { useEffect, useState } from 'react';
import { Inter } from 'next/font/google';
import api from '@/lib/api';

const inter = Inter({ subsets: ['latin'] });

const TestimonialsSection = () => {
    const [testimonials, setTestimonials] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let mounted = true;
        const fetchTestimonials = async () => {
            try {
                const base = await api.getApiBaseUrl();
                const res = await fetch(`${base}/testimonials?limit=20`);
                const data = await res.json();
                if (!mounted) return;
                if (res.ok && data && data.data) {
                    setTestimonials(data.data);
                } else {
                    setTestimonials([]);
                }
            } catch (err) {
                console.error('Fetch testimonials error', err);
                setTestimonials([]);
            } finally {
                if (mounted) setLoading(false);
            }
        };
        fetchTestimonials();
        return () => { mounted = false };
    }, []);

    // Fallback skeleton or sample when empty
    const items = testimonials.length ? testimonials : [
        { _id: 's1', message: 'No testimonials yet — be the first!', name: 'Community', company: '', rating: 5 }
    ];

    return (
        <section className="px-6 md:px-16 lg:px-28 py-12 md:py-16 overflow-hidden bg-white">
            <div className="max-w-7xl mx-auto">
                <div className="mb-16">
                    <div className="flex items-center gap-2 mb-6">
                        <div className="w-3 h-3 bg-blue-600 rounded-full"></div>
                        <p className={`${inter.className} text-gray-600 text-sm font-medium`}>What people say about us</p>
                    </div>

                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-[300] text-gray-900">What Our Users Say</h2>
                </div>

                <style>{`
                    /* Smooth GPU-accelerated scrolling */
                    @keyframes scroll-left { 0% { transform: translate3d(0,0,0); } 100% { transform: translate3d(-50%,0,0); } }
                    @keyframes scroll-right { 0% { transform: translate3d(-50%,0,0); } 100% { transform: translate3d(0,0,0); } }

                    :root { --scroll-duration: 36s; --scroll-ease: linear; }

                    .scroll-container-left,
                    .scroll-container-right {
                        will-change: transform;
                        transform: translate3d(0,0,0);
                        display: flex;
                        gap: 1.5rem;
                    }

                    .scroll-container-left { animation: scroll-left var(--scroll-duration) var(--scroll-ease) infinite; }
                    .scroll-container-right { animation: scroll-right calc(var(--scroll-duration) * 1.05) var(--scroll-ease) infinite; }

                    .scroll-container-left:hover,
                    .scroll-container-right:hover { animation-play-state: paused; }

                    /* Respect reduced motion preferences */
                    @media (prefers-reduced-motion: reduce) {
                        .scroll-container-left,
                        .scroll-container-right { animation: none !important; }
                    }
                `}</style>

                <div className="relative mb-8 w-full overflow-hidden">
                    <div className="absolute left-0 top-0 bottom-0 w-12 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none"></div>
                    <div className="absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none"></div>

                    <div className="flex gap-6 scroll-container-left w-fit">
                        {items.map((t, i) => (
                            <div key={`left-${t._id || i}`} className="flex-shrink-0 w-80 bg-white border border-gray-200 rounded-2xl p-6 hover:shadow-lg transition-shadow">
                                <p className={`${inter.className} text-gray-600 text-sm mb-6 leading-relaxed`}>{t.message || t.text || t.message}</p>
                                <div className="flex items-center gap-4">
                                    <div className="flex-1">
                                        <p className="font-semibold text-gray-900 text-sm">{t.name}</p>
                                        <p className={`${inter.className} text-gray-500 text-xs`}>{t.company || t.title || ''}</p>
                                        <div className="flex gap-1 mt-2">{[...Array(Math.max(0, Math.min(5, t.rating || 0)))].map((_, s) => (<span key={s} className="text-yellow-400 text-xs">★</span>))}</div>
                                    </div>
                                </div>
                            </div>
                        ))}
                        {items.map((t, i) => (
                            <div key={`left-dup-${t._id || i}`} className="flex-shrink-0 w-80 bg-white border border-gray-200 rounded-2xl p-6 hover:shadow-lg transition-shadow">
                                <p className={`${inter.className} text-gray-600 text-sm mb-6 leading-relaxed`}>{t.message || t.text}</p>
                                <div className="flex items-center gap-4">
                                    <div className="flex-1">
                                        <p className="font-semibold text-gray-900 text-sm">{t.name}</p>
                                        <p className={`${inter.className} text-gray-500 text-xs`}>{t.company || t.title || ''}</p>
                                        <div className="flex gap-1 mt-2">{[...Array(Math.max(0, Math.min(5, t.rating || 0)))].map((_, s) => (<span key={s} className="text-yellow-400 text-xs">★</span>))}</div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="relative w-full overflow-hidden">
                    <div className="absolute left-0 top-0 bottom-0 w-12 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none"></div>
                    <div className="absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none"></div>

                    <div className="flex gap-6 scroll-container-right w-fit">
                        {items.map((t, i) => (
                            <div key={`right-${t._id || i}`} className="flex-shrink-0 w-80 bg-white border border-gray-200 rounded-2xl p-6 hover:shadow-lg transition-shadow">
                                <p className={`${inter.className} text-gray-600 text-sm mb-6 leading-relaxed`}>{t.message || t.text}</p>
                                <div className="flex items-center gap-4">
                                    <div className="flex-1">
                                        <p className="font-semibold text-gray-900 text-sm">{t.name}</p>
                                        <p className={`${inter.className} text-gray-500 text-xs`}>{t.company || t.title || ''}</p>
                                        <div className="flex gap-1 mt-2">{[...Array(Math.max(0, Math.min(5, t.rating || 0)))].map((_, s) => (<span key={s} className="text-yellow-400 text-xs">★</span>))}</div>
                                    </div>
                                </div>
                            </div>
                        ))}
                        {items.map((t, i) => (
                            <div key={`right-dup-${t._id || i}`} className="flex-shrink-0 w-80 bg-white border border-gray-200 rounded-2xl p-6 hover:shadow-lg transition-shadow">
                                <p className={`${inter.className} text-gray-600 text-sm mb-6 leading-relaxed`}>{t.message || t.text}</p>
                                <div className="flex items-center gap-4">
                                    <div className="flex-1">
                                        <p className="font-semibold text-gray-900 text-sm">{t.name}</p>
                                        <p className={`${inter.className} text-gray-500 text-xs`}>{t.company || t.title || ''}</p>
                                        <div className="flex gap-1 mt-2">{[...Array(Math.max(0, Math.min(5, t.rating || 0)))].map((_, s) => (<span key={s} className="text-yellow-400 text-xs">★</span>))}</div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default TestimonialsSection;
