import Footer from '../components/common/Footer';
import Navbar from '../components/common/Navbar';
import Carousel from '../components/home/Carousel';
import Categrid from '../components/home/Categrid';

export default function HomePage() {
	return (
		<div className="bg-white min-h-screen">
			<Navbar />
			<main className="pt-24 bg-white">
				<Carousel />
				<Categrid />
				<Footer/>
			</main>
		</div>
	);
}
