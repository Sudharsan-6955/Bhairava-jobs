import Image from "next/image";
export default function Footer() {
    return (
        <footer className="bg-white pt-16 mt-2 md:mt-12 pb-0">
            <div className="mx-auto px-4 md:px-2 max-w-7xl">
                <div className="flex flex-col items-center">
                    <div className="bg-black rounded-full w-32 h-32 flex items-center justify-center mb-6 shadow-2xl shadow-white">
                        <img src="/images/logo.svg" alt="Bhairava Jobs Logo" className="w-20 h-20 object-contain" />
                    </div>
                    <h2 className="text-3xl font-bold text-black text-center mb-4">Let's Stay Connected</h2>
                    <p className="text-center md:text-lg text-gray-500 max-w-3xl md:w-full mb-6">
                        Interested in Finding, sharing, or exploring job vacancies? Feel free to reach out—let’s keep the conversation going.
                    </p>
                    <a
                        href="https://wa.me/918300015660?text=Hi%20Bhairava%20Jobs%2C%20I%20want%20to%20know%20more%20about%20job%20vacancies."
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 bg-white border border-gray-300 rounded-full px-8 py-3 font-medium text-base text-gray-700 shadow hover:bg-gray-100 transition-colors mb-12"
                    >
                        <Image src="/images/Browsejobs/whatsapp.svg" alt="WhatsApp" width={32} height={32} className="w-8 h-8" />
                        Contact Us
                    </a>
                </div>
            </div>

            <div className="bg-[#D4A037] py-6  mt-8 w-full">
                <div className="mx-auto max-w-7xl px-4 md:px-6">
                    <div className="border-t border-white/60 pt-6 flex text-xs items-center justify-between text-white md:text-sm">
                        <span>© {new Date().getFullYear()} All rights reserved.</span>
                        <span>example@gmail.com</span>
                    </div>
                </div>
            </div>
        </footer>
    );
}
