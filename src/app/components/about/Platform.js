import Image from "next/image";

export default function Platform() {
    return (
        <section className="md:px-6 px-5 md:py-5 bg-white">
            <div className="max-w-6xl mx-auto">
                <div className="grid md:grid-cols-2 items-center">
                    {/* Left: Features */}
                    <div className="flex flex-col gap-10 ">
                        <h2 className="text-4xl text-center py-10 md:text-5xl font-bold text-[#667085]">
                            Our <span className="font-bold text-black">New Platform</span>
                        </h2>

                        {/* Feature 1: Easy Job Search */}
                        <div className="flex gap-4">
                            <div className="">
                                <div className="w-12 shadow-[#00000005]  drop-shadow-[#0000000F] h-12 border-[2px] rounded-lg bg-white  flex items-center justify-center">
                                    <Image
                                        src="/images/Browsejobs/search-icon.svg"
                                        alt="Search"
                                        width={26}
                                        height={26}
                                        className=""
                                    />
                                </div>
                            </div>
                            <div>
                                <h3 className="text-lg font-bold text-gray-900 ">Easy Job Search</h3>
                                <p className="text-gray-600 text-sm leading-relaxed">
                                    Find relevant job opportunities with our advanced search filters
                                </p>
                            </div>
                        </div>

                        {/* Feature 2: Instant Notifications */}
                        <div className="flex gap-4">
                            <div className="">
                                 <div className="w-12 shadow-[#00000005]  drop-shadow-[#0000000F] h-12 border-[2px] rounded-lg bg-white  flex items-center justify-center">
                                    <Image
                                        src="/images/About/bxs_notification.svg"
                                        alt="Search"
                                        width={26}
                                        height={26}
                                        className=""
                                    />
                                </div>
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-gray-900">Instant Notifications</h3>
                                <p className="text-gray-600 text-sm leading-relaxed">
                                    Get real-time alerts for new job postings
                                </p>
                            </div>
                        </div>

                        {/* Feature 3: Community Support */}
                        <div className="flex gap-4">
                            <div className="shrink-0">
                                <div className="w-12 shadow-[#00000005]  drop-shadow-[#0000000F] h-12 border-[2px] rounded-lg bg-white  flex items-center justify-center">
                                    <Image
                                        src="/images/About/community.svg"
                                        alt="Search"
                                        width={26}
                                        height={26}
                                        className=""
                                    />
                                </div>
                            </div>
                            <div>
                                <h3 className="text-lg font-bold text-gray-900">Community Support</h3>
                                <p className="text-gray-600 text-sm leading-relaxed">
                                    Connect with other professionals in the industry
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Right: Illustration */}
                    <div className="flex justify-center md:justify-end">
                        <div className="relative w-full max-w-md">
                            <img
                                src="/images/About/About02.svg"
                                alt="New Platform Illustration"
                                className="w-full h-auto"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
