import Footer from '../components/common/Footer';
import Navbar from '../components/common/Navbar';
import Carousel from '../components/home/Carousel';
import Categrid from '../components/home/Categrid';
import TestimonialsSection from '../components/home/TestimonialsCarousel';

export default function HomePage() {
	return (
		<div className="bg-white min-h-screen">
			<Navbar />
			<main className="pt-24 bg-white">
				<Carousel />
				<Categrid />
				<TestimonialsSection/>
				<Footer/>
			</main>
		</div>
	);
}
