import Link from 'next/link';

export default function HeroSection() {
    return (
        <section className="px-6 py-16 max-w-6xl mx-auto">
            <div className="text-center ">
                {/* Tagline */}
                <div className='mx-auto w-fit mb-6 md:mb-10 p-0.5 bg-[#E4E7EC] rounded-3xl'>
                    <p className="text-sm px-3  text-center f text-black tracking-wide">
                        Connecting Opportunities That Matter
                    </p>
                </div>

                {/* Main Heading */}
                <h1 className="text-4xl text-black mb-6 md:mb-10 md:text-6xl font-bold">
                    About{' '}
                    <span className="text-[#667085] bg-clip-text ">
                        Bhairava Jobs
                    </span>
                </h1>

                {/* Subtitle */}
                <p className="md:text-xl text-sm text-gray-700 max-w-3xl mx-auto leading-relaxed">
                    Empowering Careers, Connecting Opportunities in Tenkasi Since 2026
                </p>

                {/* CTA Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
                    <Link href="/browse-jobs">
                        <button className="px-8 py-3 bg-black text-white font-semibold rounded-full hover:bg-gray-800 transition duration-300 w-full sm:w-auto">
                            Get Started
                        </button>
                    </Link>
                    <Link href="#mission">
                        <button className="px-8 py-3 bg-white text-black font-semibold border-2 border-gray-300 rounded-full hover:border-black transition duration-300 w-full sm:w-auto">
                            Learn More
                        </button>
                    </Link>
                </div>
            </div>
        </section>
    );
}
