import Image from 'next/image';

export default function Community() {
    return (
        <section className="px-4 md:px-6 pt-20 bg-white">
            <div className="max-w-6xl mx-auto">
                {/* Header */}
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-bold text-[#667085] mb-4">
                        Our <span className="font-bold text-black">Community</span>
                    </h2>
                    <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                        Connect with our growing network of professionals across multiple platforms
                    </p>
                </div>

                {/* Social Media Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {/* Instagram Card */}
                    <div className="bg-white border-2 border-gray-200 rounded-2xl p-8 hover:border-gray-300 transition-all duration-300 hover:shadow-lg">
                        <div className="flex flex-col items-center text-center space-y-4">
                            <div className="w-16 h-16 border-2 border-gray-400 rounded-full flex items-center justify-center">
                                <Image src="/images/About/instagram.svg" alt="WhatsApp" width={32} height={32} className="w-8 h-8" />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900">Instagram</h3>
                            <p className="text-sm text-gray-600 leading-relaxed">
                                Get latest job updates with over 100,000 followers on Instagram
                            </p>
                        </div>
                    </div>

                    {/* WhatsApp Card */}
                    <div className="bg-white border-2 border-gray-200 rounded-2xl p-8 hover:border-gray-300 transition-all duration-300 hover:shadow-lg">
                        <div className="flex flex-col items-center text-center space-y-4">
                            <div className="w-16 h-16 border-2 border-gray-400 rounded-full flex items-center justify-center">
                                <Image src="/images/Browsejobs/whatsapp.svg" alt="WhatsApp" width={32} height={32} className="w-8 h-8" />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900">WhatsApp</h3>
                            <p className="text-sm text-gray-600 leading-relaxed">
                                Stay connected with job opportunities through our WhatsApp channel
                            </p>
                        </div>
                    </div>

                    {/* Telegram Card */}
                    <div className="bg-white border-2 border-gray-200 rounded-2xl p-8 hover:border-gray-300 transition-all duration-300 hover:shadow-lg">
                        <div className="flex flex-col items-center text-center space-y-4">
                            <div className="w-16 h-16 border-2 border-gray-400 rounded-full flex items-center justify-center">
                                <Image src="/images/About/telegram.svg" alt="WhatsApp" width={32} height={32} className="w-8 h-8" />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900">Telegram</h3>
                            <p className="text-sm text-gray-600 leading-relaxed">
                                Get instant job notifications through our Telegram group
                            </p>
                        </div>
                    </div>

                    {/* Facebook Card */}
                    <div className="bg-white border-2 border-gray-200 rounded-2xl p-8 hover:border-gray-300 transition-all duration-300 hover:shadow-lg">
                        <div className="flex flex-col items-center text-center space-y-4">
                            <div className="w-16 h-16 border-2 border-gray-400 rounded-full flex items-center justify-center">
                                <Image src="/images/About/facebook.svg" alt="WhatsApp" width={32} height={32} className="w-8 h-8" />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900">Facebook</h3>
                            <p className="text-sm text-gray-600 leading-relaxed">
                                Connect and get job notifications through our Facebook group
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
