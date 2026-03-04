"use client";

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function Navbar() {
	const [menuOpen, setMenuOpen] = useState(false);

	return (
		<nav className="fixed top-0 left-0  z-50 bg-white shadow-md w-full">
			<div className="flex items-center  justify-between mx-auto px-4 md:px-8 lg:px-20 py-5 max-w-7xl">
				<div className="flex items-center">
					<Image
						src="/images/logo.svg"
						alt="Bhairava Jobs Logo"
						width={100}
						height={100}
						style={{ height: 'auto' }}
					/>
				</div>
				{/* Desktop Menu */}
				<div className="hidden md:flex gap-8 items-center">
					<Link href="/" className="text-[#232B3E] font-medium text-base hover:text-[#D4A037] transition-colors">Home</Link>
					<Link href="/browse-jobs" className="text-[#232B3E] font-medium text-base hover:text-[#D4A037] transition-colors">Browse Jobs</Link>
					<Link href="/about" className="text-[#232B3E] font-medium text-base hover:text-[#D4A037] transition-colors">About</Link>
					<Link href="/contact" className="text-[#232B3E] font-medium text-base hover:text-[#D4A037] transition-colors">Contact</Link>
				</div>
				<div className="hidden md:block">
					<Link href="/contact">
						<button className="bg-[#D4A037] text-white rounded-full px-6 py-2 font-medium text-base cursor-pointer shadow-md hover:bg-[#b88c2c] transition-colors">
							Get In Touch
						</button>
					</Link>
				</div>
				{/* Hamburger Icon */}
				<button
					className="md:hidden flex items-center justify-center p-2 rounded-lg border border-slate-200 bg-white shadow-sm"
					onClick={() => setMenuOpen(!menuOpen)}
					aria-label="Toggle menu"
				>
					{menuOpen ? (
						<svg className="w-6 h-6 text-[#232B3E]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
							<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
						</svg>
					) : (
						<svg className="w-6 h-6 text-[#232B3E]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
							<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
						</svg>
					)}
				</button>
			</div>
			{/* Mobile Menu */}
			{menuOpen && (
		<div className="md:hidden mx-4 mb-3 rounded-2xl border border-white/30 bg-white/60 backdrop-blur-lg shadow-2xl px-5 py-5 flex flex-col gap-4">
					<Link href="/" className="text-[#232B3E] font-semibold text-[15px] leading-6 hover:text-[#D4A037] transition-colors" onClick={() => setMenuOpen(false)}>Home</Link>
					<Link href="/browse-jobs" className="text-[#232B3E] font-semibold text-[15px] leading-6 hover:text-[#D4A037] transition-colors" onClick={() => setMenuOpen(false)}>Browse Jobs</Link>
					<Link href="/about" className="text-[#232B3E] font-semibold text-[15px] leading-6 hover:text-[#D4A037] transition-colors" onClick={() => setMenuOpen(false)}>About</Link>
					<Link href="/contact" className="text-[#232B3E] font-semibold text-[15px] leading-6 hover:text-[#D4A037] transition-colors" onClick={() => setMenuOpen(false)}>Contact</Link>
					<Link href="/contact">
						<button className="bg-[#D4A037] text-white rounded-full px-6 py-2.5 font-semibold text-[15px] cursor-pointer shadow-md hover:bg-[#b88c2c] transition-colors w-full mt-2" onClick={() => setMenuOpen(false)}>
							Get In Touch
						</button>
					</Link>
				</div>
			)}
		</nav>
	);
}
