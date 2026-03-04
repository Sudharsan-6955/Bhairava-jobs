"use client";

import { useState, useEffect, useRef, useMemo } from 'react';
import Image from 'next/image';
import { useSearchParams, useRouter } from 'next/navigation';
import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';
import { formatRelativeTime } from '../../utils/formatDate';

export default function BrowseJobsPage() {
	const searchParams = useSearchParams();
	const router = useRouter();
	const [jobs, setJobs] = useState([]);
	const [loading, setLoading] = useState(true);
	const [searchInput, setSearchInput] = useState('');
	const [selectedCategory, setSelectedCategory] = useState('All Categories');
	const [categories, setCategories] = useState(['All Categories']);
	const [showDropdown, setShowDropdown] = useState(false);
	const [currentPage, setCurrentPage] = useState(1);
	const [pageLoading, setPageLoading] = useState(false);
	const jobsSectionRef = useRef(null);

	// Mock data with placeholder images
	const mockJobs = [
		{
			id: 1,
			title: 'Senior React Developer',
			location: 'Tirunaelveli',
			company: 'Tech Innovations',
			description: 'Develop cutting-edge web applications with React and modern JavaScript.',
			image: '/images/carouel/ca1.png',
			type: 'Full-time',
			category: 'Technology',
			createdAt: new Date(),
		},
		{
			id: 2,
			title: 'Marketing Manager',
			location: 'Chennai',
			company: 'Digital Solutions',
			description: 'Lead marketing strategy and drive digital growth for our company.',
			image: '/images/carouel/ca2.png',
			type: 'Full-time',
			category: 'Marketing',
			createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
		},
		{
			id: 3,
			title: 'Product Designer',
			location: 'Bangalore',
			company: 'Creative Studio',
			description: 'Design beautiful and intuitive user experiences for web and mobile.',
			image: '/images/carouel/ca1.png',
			type: 'Contract',
			category: 'Design',
			createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
		},
		{
			id: 4,
			title: 'Data Scientist',
			location: 'Pune',
			company: 'Analytics Pro',
			description: 'Work on machine learning models and data analysis projects.',
			image: '/images/carouel/ca2.png',
			type: 'Full-time',
			category: 'Technology',
			createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
		},
		{
			id: 5,
			title: 'Content Writer',
			location: 'Mumbai',
			company: 'Media House',
			description: 'Create engaging content for our digital channels and platforms.',
			image: '/images/carouel/ca1.png',
			type: 'Part-time',
			category: 'Content',
			createdAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000),
		},
		{
			id: 6,
			title: 'Business Development Executive',
			location: 'Delhi',
			company: 'Growth Partners',
			description: 'Build client relationships and drive business growth and expansion.',
			image: '/images/carouel/ca2.png',
			type: 'Full-time',
			category: 'Sales',
			createdAt: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000),
		},
		{
			id: 7,
			title: 'UX/UI Designer',
			location: 'Remote',
			company: 'Design Hub',
			description: 'Create stunning interfaces and improve user experience design.',
			image: '/images/carouel/ca1.png',
			type: 'Remote',
			category: 'Design',
			createdAt: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000),
		},
		{
			id: 8,
			title: 'Full Stack Developer',
			location: 'Hyderabad',
			company: 'Web Solutions',
			description: 'Build complete web applications from frontend to backend.',
			image: '/images/carouel/ca2.png',
			type: 'Full-time',
			category: 'Technology',
			createdAt: new Date(Date.now() - 25 * 24 * 60 * 60 * 1000),
		},
		{
			id: 9,
			title: 'Social Media Specialist',
			location: 'Kolkata',
			company: 'Brand Connect',
			description: 'Manage social media campaigns and build online communities.',
			image: '/images/carouel/ca1.png',
			type: 'Part-time',
			category: 'Marketing',
			createdAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
		},
		{
			id: 10,
			title: 'Backend Developer',
			location: 'Coimbatore',
			company: 'CodeWorks',
			description: 'Build scalable backend services and APIs for enterprise applications.',
			image: '/images/carouel/ca2.png',
			type: 'Full-time',
			category: 'Technology',
			createdAt: new Date(Date.now() - 45 * 24 * 60 * 60 * 1000),
		},
	];

	useEffect(() => {
		// Fetch jobs from API
		const fetchJobs = async () => {
			try {
				setLoading(true);
				const apiBaseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

				let page = 1;
				const limit = 50;
				let totalPages = 1;
				const allJobs = [];

				do {
					const response = await fetch(`${apiBaseUrl}/jobs?page=${page}&limit=${limit}`);
					if (!response.ok) {
						throw new Error(`Failed to fetch jobs: ${response.status}`);
					}

					const data = await response.json();
					if (!data.success || !Array.isArray(data.data)) {
						throw new Error('Invalid jobs response format');
					}

					allJobs.push(...data.data);
					totalPages = data.totalPages || 1;
					page += 1;
				} while (page <= totalPages);

				if (allJobs.length > 0) {
					// Map API data to match frontend format
					const formattedJobs = allJobs.map((job) => ({
						id: job._id,
						title: job.title,
						location: job.location,
						company: job.company,
						description: job.description,
						image: job.posterImage,
						type: job.jobType,
						category: job.category,
						createdAt: job.createdAt,
					}));
					setJobs(formattedJobs);

					const dynamicCategories = [
						'All Categories',
						...new Set(formattedJobs.map((job) => job.category).filter(Boolean)),
					];
					setCategories(dynamicCategories);
				} else {
					// Fallback to mock data if API fails
					setJobs(mockJobs);
					setCategories(['All Categories', ...new Set(mockJobs.map((job) => job.category))]);
				}
			} catch (error) {
				console.error('Error fetching jobs:', error);
				// Fallback to mock data on error
				setJobs(mockJobs);
				setCategories(['All Categories', ...new Set(mockJobs.map((job) => job.category))]);
			} finally {
				setLoading(false);
			}
		};

		fetchJobs();
	}, []);

	// Initialize category from URL params
	useEffect(() => {
		const categoryParam = searchParams.get('category');
		if (categoryParam && categoryParam !== 'All Categories') {
			setSelectedCategory(categoryParam);
		}
	}, [searchParams]);

	// Reset to page 1 when search changes
	useEffect(() => {
		setCurrentPage(1);
	}, [searchInput, selectedCategory]);

	// Optimized filtering with useMemo
	const filteredJobs = useMemo(() => {
		return jobs.filter((job) => {
			const categoryMatch =
				selectedCategory === 'All Categories' ||
				(job.category || '').toLowerCase() === selectedCategory.toLowerCase();
			if (!categoryMatch) return false;

			if (!searchInput.trim()) return true;
			const searchTerm = searchInput.toLowerCase();
			return (
				job.title.toLowerCase().includes(searchTerm) ||
				job.location.toLowerCase().includes(searchTerm) ||
				job.company.toLowerCase().includes(searchTerm) ||
				job.description.toLowerCase().includes(searchTerm) ||
				(job.category || '').toLowerCase().includes(searchTerm)
			);
		});
	}, [jobs, selectedCategory, searchInput]);

	// Pagination variables
	const itemsPerPageDesktop = 6;
	const itemsPerPageMobile = 3;
	const [itemsPerPage, setItemsPerPage] = useState(itemsPerPageDesktop);

	useEffect(() => {
		const handleResize = () => {
			setItemsPerPage(window.innerWidth < 768 ? itemsPerPageMobile : itemsPerPageDesktop);
		};

		handleResize();
		window.addEventListener('resize', handleResize);
		return () => window.removeEventListener('resize', handleResize);
	}, []);

	// Memoized pagination calculations
	const totalPages = useMemo(() => Math.ceil(filteredJobs.length / itemsPerPage), [filteredJobs.length, itemsPerPage]);
	const paginatedJobs = useMemo(() => {
		const startIndex = (currentPage - 1) * itemsPerPage;
		return filteredJobs.slice(startIndex, startIndex + itemsPerPage);
	}, [filteredJobs, currentPage, itemsPerPage]);

	const scrollToJobsTop = () => {
		if (!jobsSectionRef.current) return;
		const navbarOffset = 110;
		const top = jobsSectionRef.current.getBoundingClientRect().top + window.scrollY - navbarOffset;
		window.scrollTo({ top, behavior: 'smooth' });
	};

	const handlePageChange = (page) => {
		if (page === currentPage) return;
		scrollToJobsTop();
		setPageLoading(true);
		setTimeout(() => {
			setCurrentPage(page);
			setPageLoading(false);
		}, 600);
	};

	const getVisiblePages = () => {
		if (totalPages <= 3) {
			return Array.from({ length: totalPages }, (_, index) => index + 1);
		}

		if (currentPage <= 2) {
			return [1, 2, '...', totalPages];
		}

		if (currentPage >= totalPages - 1) {
			return [1, '...', totalPages - 1, totalPages];
		}

		return [1, '...', currentPage, '...', totalPages];
	};

	return (
		<div className="bg-white min-h-screen">
			<Navbar />

			{/* Hero Section */}
			<div className="bg-white pt-36 pb-16 px-4 md:px-8">
				<div className="max-w-3xl mx-auto text-center">
					<p className="text-gray-600 font-medium text-sm tracking-wide mb-4">
						Connecting Opportunities That Matter
					</p>
					<h1 className="text-5xl md:text-6xl font-bold text-[#232B3E] mb-2">
						Get <span className="text-[#6B7280]">Explored</span>
					</h1>
					<p className="text-gray-600 text-base mb-8">
						Explore thousands of local opportunities and find the job that fits your skills, passion, and ambition.
					</p>

					{/* Search Bar with Dropdown */}
					<div className="w-full max-w-xl mx-auto flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
						<div className="relative flex-1 min-w-0 w-full">
							<input
								type="text"
								placeholder="Search here"
								value={searchInput}
								onChange={(e) => setSearchInput(e.target.value)}
								className="w-full px-4 md:px-5 py-2.5 md:py-3 pr-10 md:pr-12 rounded-full border border-gray-300 text-sm md:text-base text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#D4A037] focus:border-transparent"
							/>
							<div className="absolute right-3 md:right-4 top-1/2 -translate-y-1/2">
								<Image
									src="/images/Browsejobs/search-icon.svg"
									alt="Search"
									width={20}
									height={20}
									className="opacity-60 w-4 h-4 md:w-5 md:h-5"
								/>
							</div>
						</div>

						<div className="relative shrink-0 w-full sm:w-auto">
							<button
								onClick={() => setShowDropdown(!showDropdown)}
								className="rounded-full bg-[#4B5563] text-white hover:bg-[#3a4452] transition-colors flex items-center justify-center w-full sm:w-11 h-10 md:h-11 px-4 sm:px-0"
							>
								<span className="text-xs font-medium mr-2 sm:hidden truncate max-w-48">
									{selectedCategory}
								</span>
								<Image
									src="/images/Browsejobs/Down-Vector.svg"
									alt="Dropdown"
									width={16}
									height={16}
									className={`transition-transform w-4 h-4 md:w-5 md:h-5 ${showDropdown ? 'rotate-180' : ''}`}
								/>
							</button>

							{/* Dropdown Menu */}
							{showDropdown && (
								<div className="absolute top-full mt-2 left-0 sm:left-auto sm:right-0 bg-white border border-gray-300 rounded-lg shadow-lg z-10 w-full sm:min-w-max max-h-64 overflow-y-auto">
									{categories.map((category) => (
										<button
											key={category}
											onClick={() => {
												setSelectedCategory(category);
												setShowDropdown(false);
												// Update URL without page reload for better UX
												const params = new URLSearchParams(window.location.search);
												if (category === 'All Categories') {
													params.delete('category');
												} else {
													params.set('category', category);
												}
												const newUrl = params.toString() ? `?${params.toString()}` : '/browse-jobs';
												router.replace(newUrl, { scroll: false });
											}}
											className="block w-full text-left px-4 py-3 text-gray-700 hover:bg-[#D4A037] hover:text-white transition-colors first:rounded-t-lg last:rounded-b-lg"
										>
											{category}
										</button>
									))}
								</div>
							)}
						</div>
					</div>
					{selectedCategory !== 'All Categories' && (
						<p className="mt-3 text-sm text-gray-600">
							Filtered by: <span className="font-semibold text-[#232B3E]">{selectedCategory}</span>
						</p>
					)}
				</div>
			</div>

			{/* Jobs Section with Blue Background */}
			<div ref={jobsSectionRef} className="bg-[#E8F4F8] py-12">
				<div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-20">
					{loading || pageLoading ? (
						// Loading skeleton
						<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
							{Array.from({ length: itemsPerPage }).map((_, i) => (
								<div key={i} className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-100 animate-pulse">
									<div className="p-3">
										<div className="aspect-3/4 w-full bg-gray-300 rounded-md"></div>
									</div>
									<div className="p-5">
										<div className="h-4 bg-gray-300 rounded mb-2 w-3/4"></div>
										<div className="h-3 bg-gray-300 rounded mb-2 w-full"></div>
										<div className="h-3 bg-gray-300 rounded mb-4 w-5/6"></div>
										<div className="flex items-center justify-start gap-3 pt-3 border-t border-gray-200">
											<div className="h-8 w-24 bg-gray-300 rounded-full"></div>
											<div className="h-8 w-32 bg-gray-300 rounded-full"></div>
										</div>
									</div>
								</div>
							))}
						</div>
					) : filteredJobs.length === 0 ? (
						// No jobs found message
						<div className="text-center py-16">
							<div className="mb-4">
								<svg className="w-16 h-16 mx-auto text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 21l-4.35-4.35m0 0A7.5 7.5 0 103.5 3.5a7.5 7.5 0 0112.15 12.15z" />
								</svg>
							</div>
							<h3 className="text-2xl font-bold text-[#232B3E] mb-2">No Jobs Found</h3>
							<p className="text-gray-600 mb-4">
								We couldn't find any jobs matching "{searchInput}". Try searching with different keywords.
							</p>
							<button
								onClick={() => setSearchInput('')}
								className="bg-[#D4A037] text-white px-6 py-2 rounded-full text-sm font-semibold hover:bg-[#b88c2c] transition-colors"
							>
								Clear Search
							</button>
						</div>
					) : (
						<>
							{/* Jobs Grid */}
							<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
								{paginatedJobs.map((job, index) => (
									<div
										key={job.id}
										className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-100 hover:shadow-lg transition-shadow flex flex-col h-auto"
									>
										{/* Job Image */}
										<div className="p-2">
											<div className="relative aspect-[3/4] w-full bg-gray-200 overflow-hidden rounded-md">
												<Image
													src={job.image}
													alt={job.title}
													fill
													loading={index === 0 ? 'eager' : 'lazy'}
													className="object-center"
												/>
											</div>
										</div>

										{/* Job Info */}
										<div className="px-4 py-2 flex flex-col flex-grow">
											<h3 className="text-sm font-bold text-[#232B3E] mb-2 break-words">
												{job.title} <span className="text-gray-500 font-normal text-xs">– {job.location}</span>
											</h3>

											<p className="text-xs text-gray-600 mb-2 leading-4 line-clamp-2">
												{job.description}
											</p>

											<div className="flex flex-col sm:flex-row items-start sm:items-center justify-start gap-1.5 sm:gap-2 pt-2 border-t border-gray-300 mt-auto">
												<span className="bg-white text-xs text-gray-600 font-medium px-3 py-1.5 rounded-full shadow-md border border-gray-100 whitespace-nowrap">
													{formatRelativeTime(job.createdAt)}
												</span>
												<a
													href={`https://wa.me/?text=Check%20out%20this%20job%20opportunity%20-%20${job.title}%20at%20${job.company}`}
													target="_blank"
													rel="noopener noreferrer"
													className="w-full sm:w-auto justify-center bg-[#D4A037] text-white px-3 py-1.5 rounded-full text-xs font-semibold hover:bg-[#b88c2c] transition-all shadow-md hover:shadow-lg flex items-center gap-1"
												>
													<svg 
														xmlns="http://www.w3.org/2000/svg" 
														width="14" 
														height="14" 
														viewBox="0 0 24 24" 
														fill="none"
														className="shrink-0"
													>
														<path 
															fill="currentColor" 
															d="M21.98 11.41c-.34-5.8-5.61-10.27-11.68-9.27-4.18.69-7.53 4.08-8.18 8.26-.38 2.42.12 4.71 1.21 6.6l-.89 3.31c-.2.75.49 1.43 1.23 1.22l3.26-.9c1.48.87 3.21 1.37 5.06 1.37 5.64 0 10.32-4.97 9.99-10.59zm-5.1 4.31a2.279 2.279 0 01-1.16 1.1c-.3.13-.63.19-.98.19-.51 0-1.06-.12-1.63-.37a9.16 9.16 0 01-1.72-.99c-.58-.42-1.12-.89-1.64-1.4-.52-.52-.98-1.07-1.4-1.64-.41-.57-.74-1.14-.98-1.71-.24-.57-.36-1.12-.36-1.64 0-.34.06-.67.18-.97.12-.31.31-.59.58-.84.32-.32.67-.47 1.04-.47.14 0 .28.03.41.09.13.06.25.15.34.28l1.16 1.64c.09.13.16.24.2.35.05.11.07.21.07.31 0 .12-.04.24-.11.36s-.16.24-.28.36l-.38.4c-.06.06-.08.12-.08.2 0 .04.01.08.02.12.02.04.03.07.04.1.09.17.25.38.47.64a13.482 13.482 0 001.53 1.53c.26.22.48.37.65.46.03.01.06.03.09.04.04.02.08.02.13.02.09 0 .15-.03.21-.09l.38-.38c.13-.13.25-.22.36-.28.12-.07.23-.11.36-.11.1 0 .2.02.31.07.11.05.23.11.35.2l1.66 1.18c.13.09.22.2.28.32.05.13.08.25.08.39-.06.17-.1.36-.18.54z"
														/>
													</svg>
													Share on Whatsapp
												</a>
											</div>
										</div>
									</div>
								))}
							</div>

							{/* Pagination */}
							{totalPages > 1 && (
								<div className="flex flex-wrap justify-center md:justify-end items-center gap-2 mt-8">
									{/* Previous Button */}
									<button
										onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
										disabled={currentPage === 1}
										className="w-11 h-11 rounded-lg bg-white text-gray-700 border-2 border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed hover:border-[#D4A037] transition-colors flex items-center justify-center"
									>
										<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
											<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
										</svg>
									</button>

									{/* Page Numbers */}
									{getVisiblePages().map((item, index) => {
										if (item === '...') {
											return (
												<span
													key={`ellipsis-${index}`}
													className="px-3 py-2 rounded-lg font-semibold bg-white text-gray-700 border-2 border-gray-300"
												>
													...
												</span>
											);
										}

										const isCurrentPage = item === currentPage;
										return (
											<button
												key={item}
												onClick={() => handlePageChange(item)}
												className={`px-3 py-2 rounded-lg font-semibold transition-colors ${isCurrentPage
														? 'bg-[#D4A037] text-white border-2 border-[#D4A037]'
														: 'bg-white text-gray-700 border-2 border-gray-300 hover:border-[#D4A037]'
													}`}
											>
												{item}
											</button>
										);
									})}

									{/* Next Button */}
									<button
										onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
										disabled={currentPage === totalPages}
										className="w-11 h-11 rounded-lg bg-white text-gray-700 border-2 border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed hover:border-[#D4A037] transition-colors flex items-center justify-center"
									>
										<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
											<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
										</svg>
									</button>
								</div>
							)}
						</>
					)}
				</div>
			</div>

			{/* Social Links Section */}
			{/* <div className="bg-gray-50 py-8 px-4 md:px-8">
				<div className="max-w-6xl mx-auto text-center">
					<p className="text-gray-600 mb-4">Follow us on social media for job updates</p>
					<div className="flex justify-center gap-6">
						<a href="#" className="w-8 h-8 rounded-full bg-[#D4A037] text-white flex items-center justify-center hover:bg-[#b88c2c] transition-colors">
							<svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
								<path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
							</svg>
						</a>
						<a href="#" className="w-8 h-8 rounded-full bg-[#D4A037] text-white flex items-center justify-center hover:bg-[#b88c2c] transition-colors">
							<svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
								<path d="M24 4.557c-.915.405-1.897.648-2.925.765 1.051-.649 1.857-1.676 2.236-2.898-.984.589-2.075.991-3.236 1.214-.928-.99-2.252-1.608-3.714-1.608-2.81 0-5.090 2.279-5.090 5.09 0 .399.049.787.144 1.159-4.233-.214-7.983-2.24-10.496-5.325-.439.754-.689 1.631-.689 2.566 0 1.767.901 3.326 2.271 4.245-.838-.027-1.627-.257-2.315-.643v.065c0 2.468 1.756 4.524 4.084 4.994-.427.116-.876.18-1.338.18-.327 0-.646-.031-.958-.089.646 2.013 2.522 3.478 4.741 3.52-1.744 1.365-3.939 2.179-6.327 2.179-.41 0-.814-.024-1.21-.071 2.285 1.464 4.995 2.318 7.903 2.318 9.484 0 14.66-7.867 14.66-14.66 0-.223-.005-.446-.014-.668.996-.723 1.862-1.622 2.548-2.649z" />
							</svg>
						</a>
						<a href="#" className="w-8 h-8 rounded-full bg-[#D4A037] text-white flex items-center justify-center hover:bg-[#b88c2c] transition-colors">
							<svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
								<path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v 3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
							</svg>
						</a>
						<a href="#" className="w-8 h-8 rounded-full bg-[#D4A037] text-white flex items-center justify-center hover:bg-[#b88c2c] transition-colors">
							<svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
								<path d="M12 0c6.627 0 12 5.373 12 12s-5.373 12-12 12-12-5.373-12-12 5.373-12 12-12zm3.6 11.9h-7.2v1.1h7.2v-1.1zm0-2.8h-7.2v1.1h7.2v-1.1z" />
							</svg>
						</a>
					</div>
				</div>
			</div> */}

			<Footer />
		</div>
	);
}
