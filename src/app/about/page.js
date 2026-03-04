import Footer from '../components/common/Footer';
import Navbar from '../components/common/Navbar';
import HeroSection from '../components/about/HeroSection';
import Journey from '../components/about/Journey';
import Platform from '../components/about/Platform';
import Community from '../components/about/Community';

export default function AboutPage() {
    return (
        <div className="bg-white min-h-screen ">
            <Navbar />
            <main className="pt-24  max-w-7xl mx-auto">
                <HeroSection />
                <Journey />
                <Platform />
                <Community />
            </main>
            <Footer />
        </div>
    );
}
