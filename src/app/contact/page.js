import Footer from '../components/common/Footer';
import Navbar from '../components/common/Navbar';
import ContactForm from '../components/contact/ContactForm';
import Link from 'next/link';
import Image from 'next/image';

export default function ContactPage() {
    return (
        <div className="bg-white min-h-screen">
            <Navbar />
            <main className="pt-24 pb-16">
                {/* Hero Section */}
                <section className="px-6 pt-24 max-w-6xl mx-auto">
                    <div className="text-center">
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
                            href="https://wa.me/918300015660?text=Hi%20Bhairava%20Jobs%2C%20I%20want%20to%20know%20more%20about%20job%20vacancies."
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 w-fit mx-auto bg-white border border-gray-300 rounded-full px-4 py-2 md:px-8 md:py-3 font-medium text-sm md:text-base text-gray-700 shadow hover:bg-gray-100 transition-colors mb-12"
                        >
                            <Image src="/images/Browsejobs/whatsapp.svg" alt="WhatsApp" width={32} height={32} />
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
                <section className="px-6 pt-16 ">
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
