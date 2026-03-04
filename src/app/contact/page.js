import Footer from '../components/common/Footer';
import Navbar from '../components/common/Navbar';
import ContactForm from '../components/contact/ContactForm';
import Link from 'next/link';

export default function ContactPage() {
    return (
        <div className="bg-white min-h-screen">
            <Navbar />
            <main className="pt-24 pb-16">
                {/* Hero Section */}
                <section className="px-6 pt-24 max-w-6xl mx-auto">
                    <div className="text-center">
                        {/* Tagline */}
                        <div className='mx-auto w-fit mb-6 md:mb-10 bg-gray-200 rounded-3xl'>
                            <p className="text-md px-3 text-center font-medium text-gray-600 tracking-wide">
                                Connecting Opportunities That Matter
                            </p>
                        </div>

                        {/* Main Heading */}
                        <h1 className="text-5xl text-[#667085] mb-6 md:mb-10  md:text-6xl font-bold">
                            Get in{' '}
                            <span className="text-black">
                                Touch
                            </span>
                        </h1>

                        {/* Subtitle */}
                        <p className="text-sm md:text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed mb-8">
                            Whether you're looking to discuss about job, post job, or collaborate with us, we're always excited to connect and provide new opportunities.
                        </p>

                        {/* Connect Button */}
                        <a
                            href="https://wa.me/916382946955?text=Hi%20Bhairava%20Jobs%2C%20I%20want%20to%20know%20more%20about%20job%20vacancies."
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 w-fit mx-auto bg-white border border-gray-300 rounded-full px-8 py-3 font-medium text-base text-gray-700 shadow hover:bg-gray-100 transition-colors mb-12"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none">
                                <path fill="#667085" d="M21.98 11.41c-.34-5.8-5.61-10.27-11.68-9.27-4.18.69-7.53 4.08-8.18 8.26-.38 2.42.12 4.71 1.21 6.6l-.89 3.31c-.2.75.49 1.43 1.23 1.22l3.26-.9c1.48.87 3.21 1.37 5.06 1.37 5.64 0 10.32-4.97 9.99-10.59zm-5.1 4.31a2.279 2.279 0 01-1.16 1.1c-.3.13-.63.19-.98.19-.51 0-1.06-.12-1.63-.37a9.16 9.16 0 01-1.72-.99c-.58-.42-1.12-.89-1.64-1.4-.52-.52-.98-1.07-1.4-1.64-.41-.57-.74-1.14-.98-1.71-.24-.57-.36-1.12-.36-1.64 0-.34.06-.67.18-.97.12-.31.31-.59.58-.84.32-.32.67-.47 1.04-.47.14 0 .28.03.41.09.13.06.25.15.34.28l1.16 1.64c.09.13.16.24.2.35.05.11.07.21.07.31 0 .12-.04.24-.11.36s-.16.24-.28.36l-.38.4c-.06.06-.08.12-.08.2 0 .04.01.08.02.12.02.04.03.07.04.1.09.17.25.38.47.64a13.482 13.482 0 001.53 1.53c.26.22.48.37.65.46.03.01.06.03.09.04.04.02.08.02.13.02.09 0 .15-.03.21-.09l.38-.38c.13-.13.25-.22.36-.28.12-.07.23-.11.36-.11.1 0 .2.02.31.07.11.05.23.11.35.2l1.66 1.18c.13.09.22.2.28.32.05.13.08.25.08.39-.06.17-.1.36-.18.54z"></path>
                            </svg>
                            Contact Us
                        </a>
                    </div>
                </section>

                {/* Or Divider */}
                <div className="relative flex items-center justify-center ">
                    <div className="absolute inset-0 flex items-center px-6 max-w-6xl mx-auto">
                        <div className="w-full border-t-2 border-gray-200"></div>
                    </div>
                    <div className="relative bg-white px-2">
                        <span className="text-sm font-thin text-gray-400">Or</span>
                    </div>
                </div>

                <ContactForm />


                {/* Map Section */}
                <section className="px-6 pt-20 bg-gradient-to-br from-[#667085] via-[#5a6078] to-[#4a5068]">
                    <div className="max-w-6xl mx-auto">
                        <div className="mb-12 text-center">
                            <h1 className="text-5xl text-black mb-10 md:text-6xl font-bold">
                                Locate{' '}
                                <span className="text-[#667085]">
                                    Us
                                </span>
                            </h1>
                        </div>
                        <div className="rounded-3xl overflow-hidden shadow-2xl h-96 border-4 border-white">
                            <iframe
                                width="100%"
                                height="100%"
                                frameBorder="0"
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3916.4446849765253!2d77.3412536!3d11.3411!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba9f8c4e1e1e1e1%3A0x1e1e1e1e1e1e1e1e!2sTiruppur%2C%20Tamil%20Nadu!5e0!3m2!1sen!2sin!4v1234567890"
                                allowFullScreen=""
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                            ></iframe>
                        </div>

                    </div>
                </section>
            </main>
            <Footer />
        </div>
    );
}
