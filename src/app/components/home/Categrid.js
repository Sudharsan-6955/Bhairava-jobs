import Image from 'next/image';
import Link from 'next/link';
import { Noto_Sans_Tamil } from 'next/font/google';
import categories from '@/lib/categories';

const tamilFont = Noto_Sans_Tamil({
	subsets: ['tamil'],
	weight: ['400', '600'],
	display: 'swap',
});

export default function Categrid() {
	return (
		<section className="bg-sky-50 pb-12">
			<div className="mx-auto max-w-7xl px-4 md:px-8 lg:px-20 py-5 md:py-8">
				<h2 className="text-center text-2xl md:text-4xl font-bold text-slate-800">Explore Jobs.</h2>
				<p className="mt-2 text-center text-sm text-slate-500">Check out and find a job you are looking for</p>

				<div className="mt-6 mx-auto max-w-5xl grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-4">
					{categories.map((category) => (
						<Link
							key={category.id}
							href={`/browse-jobs?category=${encodeURIComponent(category.title)}`}
							className="aspect-square rounded-md bg-white p-2 shadow-sm flex flex-col hover:shadow-lg hover:scale-105 transition-all duration-200 cursor-pointer"
						>
							<div className="relative w-full flex-1 overflow-hidden rounded">
								<Image
									src={category.image}
									alt={category.title}
									fill
									className="object-cover"
									sizes="(max-width: 768px) 50vw, 25vw"
								/>
							</div>
							<p className={`mt-2 text-center text-xs sm:text-sm font-semibold text-slate-700 ${category.isTamil ? tamilFont.className : ''}`}>
								{category.displayTitle ?? category.title}
							</p>
						</Link>
					))}
				</div>

				<div className="mt-6 flex justify-center">
					<Link
						href="/browse-jobs"
						className="rounded-full border border-slate-300 bg-white px-8 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 hover:border-slate-400 transition-colors"
					>
						View All
					</Link>
				</div>
			</div>
		</section>
	);
}
