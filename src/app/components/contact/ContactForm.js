export default function ContactForm() {
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
                        <form className="space-y-6">
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
                                        placeholder="Your Name"
                                        className="w-full px-4 py-3 border text-black border-gray-300 rounded-lg focus:border-[#667085] focus:ring-2 focus:ring-[#667085] focus:ring-opacity-20 focus:outline-none transition"
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
                                        placeholder="+91 9123456789"
                                        className="w-full px-4 py-3 border border-gray-300 text-black rounded-lg focus:border-[#667085] focus:ring-2 focus:ring-[#667085] focus:ring-opacity-20 focus:outline-none transition"
                                    />
                                </div>
                            </div>

                            {/* Email */}
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                                    Email
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    placeholder="your-email@mail.com"
                                    className="w-full px-4 py-3 border border-gray-300 text-black rounded-lg focus:border-[#667085] focus:ring-2 focus:ring-[#667085] focus:ring-opacity-20 focus:outline-none transition"
                                />
                            </div>

                            {/* Description */}
                            <div>
                                <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
                                    Description
                                </label>
                                <textarea
                                    id="description"
                                    name="description"
                                    rows="5"
                                    placeholder="Enter your message..."
                                    className="w-full px-4 py-3 border border-gray-300 text-black rounded-lg focus:border-[#667085] focus:ring-2 focus:ring-[#667085] focus:ring-opacity-20 focus:outline-none transition resize-none"
                                ></textarea>
                            </div>

                            {/* Submit Button */}
                            <div className="flex justify-center pt-4">
                                <button
                                    type="submit"
                                    style={{ backgroundColor: '#667085' }}
                                    className="px-10 py-3 text-white font-semibold rounded-full hover:opacity-90 transition duration-300 flex items-center justify-center gap-3 shadow-lg hover:shadow-xl"
                                >
                                    <img src="/images/Contact/send.svg" alt="Send Icon" className="w-5 h-5" />
                                    Send Message
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
}
