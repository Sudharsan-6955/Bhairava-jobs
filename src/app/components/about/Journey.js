export default function Journey() {
    return (
        <section className="md:px-6 px-5 py-5 bg-white">
            <div className="max-w-6xl mx-auto">
                <div className="grid md:grid-cols-2 gap-1 items-center">
                    {/* Left: Illustration */}
                    <div className="flex justify-center md:justify-start">
                        <div className="relative w-full max-w-md">
                            <img 
                                src="/images/About/About01.svg" 
                                alt="Our Journey Illustration" 
                                className="w-full h-auto"
                            />
                        </div>
                    </div>

                    {/* Right: Content */}
                    <div className="space-y-6">
                        <h2 className="text-4xl md:text-5xl font-bold text-[#667085]">
                            Our <span className="text-black">Journey</span>
                        </h2>
                        
                        <p className="text-lg text-gray-600 leading-relaxed">
                            Welcome to Bhairava Jobs, your gateway to employment opportunities in Tirupur!
                        </p>
                        
                        <p className="text-base text-gray-600 leading-relaxed">
                            For over six years, we have been dedicated to connecting job seekers and employers in the vibrant garment industry of Tirupur. We have proudly been a reliable source for posting garment jobs and news, contributing to the growth and success of countless individuals and businesses.
                        </p>

                        {/* Statistics */}
                        <div className="grid grid-cols-3 gap-6 pt-6">
                            <div className="text-center">
                                <div className="text-3xl md:text-4xl font-bold text-gray-900">1L+</div>
                                <div className="text-sm text-gray-600 mt-2">Instagram Followers</div>
                            </div>
                            <div className="text-center">
                                <div className="text-3xl md:text-4xl font-bold text-gray-900">1000+</div>
                                <div className="text-sm text-gray-600 mt-2">Jobs Posted</div>
                            </div>
                            <div className="text-center">
                                <div className="text-3xl md:text-4xl font-bold text-gray-900">500+</div>
                                <div className="text-sm text-gray-600 mt-2">Companies</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
