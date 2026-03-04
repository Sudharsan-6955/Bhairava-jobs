"use client";

import { useMemo, useState } from 'react';
import { useEffect } from 'react';
import Image from 'next/image';

export default function Carousel() {
    const slides = useMemo(
        () => [
            { id: 1, image: '/images/carouel/ca1.png', alt: 'Carousel slide 1' },
            { id: 2, image: '/images/carouel/ca2.png', alt: 'Carousel slide 2' },
        ],
        []
    );
    const [activeSlide, setActiveSlide] = useState(0);
    const currentSlide = slides[activeSlide];

    const goToPrevious = () => {
        setActiveSlide((current) => (current === 0 ? slides.length - 1 : current - 1));
    };

    const goToNext = () => {
        setActiveSlide((current) => (current === slides.length - 1 ? 0 : current + 1));
    };

    useEffect(() => {
        const intervalId = setInterval(() => {
            setActiveSlide((current) => (current === slides.length - 1 ? 0 : current + 1));
        }, 5000);

        return () => clearInterval(intervalId);
    }, [slides.length]);

    return (
        <section className="px-4 md:px-6 lg:px-8 py-8">
            <div className="relative mx-auto w-full max-w-4xl overflow-hidden rounded-xl bg-[#a8adad]">
                <div className="relative h-72 md:h-96 w-full">
                    <Image
                        src={currentSlide.image}
                        alt={currentSlide.alt}
                        fill
                        priority
                        className="object-cover"
                    />
                </div>

                <button
                    type="button"
                    onClick={goToPrevious}
                    aria-label="Previous slide"
                    className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full p-2"
                >
                    <Image
                        src="/images/carouel/right-arrow.svg"
                        alt="Previous"
                        width={18}
                        height={18}
                        className="rotate-180"
                    />
                </button>

                <button
                    type="button"
                    onClick={goToNext}
                    aria-label="Next slide"
                    className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full p-2"
                >
                    <Image
                        src="/images/carouel/right-arrow.svg"
                        alt="Next"
                        width={18}
                        height={18}
                    />
                </button>

                <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 items-center gap-2">
                    {slides.map((slide, index) => (
                        <button
                            key={slide.id}
                            type="button"
                            onClick={() => setActiveSlide(index)}
                            aria-label={`Go to slide ${index + 1}`}
                            className={`h-0.5 w-5 rounded-full transition-all ${
                                activeSlide === index ? 'bg-white' : 'bg-white/50'
                            }`}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}
