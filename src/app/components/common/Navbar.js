"use client";

import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';

export default function Navbar() {
	const [menuOpen, setMenuOpen] = useState(false);
	const [langOpen, setLangOpen] = useState(false);
	const supportedLangs = [
		{ code: 'en', label: 'English' },
		{ code: 'ta', label: 'தமிழ்' },
		{ code: 'hi', label: 'हिन्दी' },
	];
	const pathname = usePathname();

	useEffect(() => {
		if (typeof window === 'undefined') return;

		// Avoid adding the script multiple times
		if (document.getElementById('google-translate-script')) return;

		// Provide the global callback expected by Google's script
		window.googleTranslateElementInit = function () {
			if (window.google && window.google.translate) {
				new window.google.translate.TranslateElement({ pageLanguage: 'en' }, 'google_translate_element');
			}
		};

		const s = document.createElement('script');
		s.id = 'google-translate-script';
		s.src = '//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
		s.async = true;
		document.body.appendChild(s);

		// Inject CSS to hide Google's default UI (we use our own). Use broad selectors and !important.
		const style = document.createElement('style');
		style.id = 'google-translate-hide-style';
		style.innerHTML = `
			/* hide the hidden container used by our integration */
			#google_translate_element { display: none !important; }
			/* banner / frames */
			.goog-te-banner-frame, .goog-te-banner-frame.skiptranslate, iframe.goog-te-banner-frame, .goog-te-vertical-frame, .goog-te-balloon-frame { display: none !important; visibility: hidden !important; height: 0 !important; width: 0 !important; }
			/* gadget, logo, combo, menu, spinner */
			.goog-te-gadget, .goog-te-gadget-icon, .goog-te-gadget-logo, .goog-te-combo, .goog-te-menu-value, .goog-te-spinner, .goog-logo-link, .goog-logo { display: none !important; visibility: hidden !important; }
			/* other UI pieces */
			.skiptranslate, .goog-te-banner, .goog-close-link { display: none !important; }
			/* hide any iframes or images Google injects */
			iframe[src*="translate"], img[src*="translate"], img[alt*="Translate"], img[alt*="translate"], img[alt*="google"], img[class*="goog"] { display: none !important; visibility: hidden !important; width: 0 !important; height: 0 !important; }
			/* ensure body isn't shifted by translate toolbar */
			body { top: 0 !important; }
		`;
		document.head.appendChild(style);

		// Function to remove/hide elements injected by Google Translate
		function hideGoogleElements() {
			try {
				const selectors = [
					'.goog-te-banner-frame',
					'.goog-te-banner-frame.skiptranslate',
					'iframe[src*="translate"]',
					'img[src*="translate"]',
					'.goog-te-gadget',
					'.goog-te-gadget-icon',
					'.goog-te-gadget-logo',
					'.goog-te-combo',
					'.goog-te-menu-value',
					'.goog-te-spinner',
					'.goog-logo-link',
					'.goog-logo',
					'.goog-close-link',
				];
				selectors.forEach((sel) => {
					document.querySelectorAll(sel).forEach((el) => {
						try {
							if (el.tagName === 'IFRAME') {
								el.style.display = 'none';
								el.style.visibility = 'hidden';
								el.width = '0';
								el.height = '0';
							}
							el.remove();
						} catch (e) {}
					});
				});
			} catch (e) {}
		}

		// Run immediately and observe DOM for any future injections
		hideGoogleElements();

		const intervalId = setInterval(hideGoogleElements, 700);

		const observer = new MutationObserver(() => hideGoogleElements());
		observer.observe(document.body, { childList: true, subtree: true });

		// stop checks after a short while
		setTimeout(() => {
			clearInterval(intervalId);
			observer.disconnect();
		}, 10000);

		return () => {
			// leave the script in place; cleanup if you need to remove it on nav change
		};
	}, []);

	function setLanguage(lang) {
		if (typeof document === 'undefined') return;

		// Set googtrans cookie used by Google Translate widget
		const cookieValue = `/en/${lang}`;
		const expires = new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toUTCString();
		document.cookie = `googtrans=${cookieValue}; expires=${expires}; path=/`;

		// Also set two more cookies Google sometimes checks
		document.cookie = `googtrans=${cookieValue}; domain=${window.location.hostname}; expires=${expires}; path=/`;

		// Reload to apply translation
		window.location.reload();
	}

	return (
		<nav className="fixed top-0 left-0  z-50 bg-white shadow-md w-full">
			<div className="flex items-center  justify-between mx-auto px-4 md:px-8 lg:px-20 py-3 max-w-7xl relative">
				<div className="flex items-center">
					<Link href="/" aria-label="Home">
						<Image
							src="/images/logo.svg"
							alt="Bhairava Jobs Logo"
							width={56}
							height={56}
							className="h-12 md:h-14 w-auto"
							priority
						/>
					</Link>
				</div>
				{/* Desktop Menu */}
				<div className="hidden md:flex gap-8 items-center">
							{/* Language selector (custom) */}
							<div className="relative">
								<button
									aria-label="Language"
									onClick={() => setLangOpen(!langOpen)}
									className="flex items-center gap-2 p-2 rounded hover:bg-slate-100"
								>
									{/* Globe icon */}
									<svg className="w-5 h-5 text-[#232B3E]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor">
										<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 2a10 10 0 100 20 10 10 0 000-20zM2 12h20M12 2c2.21 2.21 3.5 5.22 3.5 8s-1.29 5.79-3.5 8M12 22c-2.21-2.21-3.5-5.22-3.5-8s1.29-5.79 3.5-8" />
									</svg>
								</button>
								{langOpen && (
									<div className="absolute right-0 mt-2 w-40 bg-white border rounded shadow-sm z-50">
										{supportedLangs.map((l) => (
											<button key={l.code} onClick={() => setLanguage(l.code)} className="w-full text-left px-3 py-2 hover:bg-slate-100 text-gray-700">
												{l.label}
											</button>
										))}
									</div>
								)}
								{/* Hidden Google element (script needs it) */}
								<div id="google_translate_element" className="hidden" />
							</div>
					<Link href="/" className={`font-medium text-base hover:text-[#D4A037] transition-colors ${pathname === '/' || pathname === '/home' ? 'text-[#D4A037] ' : 'text-[#232B3E]'}`}>Home</Link>
					<Link href="/browse-jobs" className={`font-medium text-base hover:text-[#D4A037] transition-colors ${pathname === '/browse-jobs' ? 'text-[#D4A037] ' : 'text-[#232B3E]'}`}>Browse Jobs</Link>
					<Link href="/about" className={`font-medium text-base hover:text-[#D4A037] transition-colors ${pathname === '/about' ? 'text-[#D4A037] ' : 'text-[#232B3E]'}`}>About</Link>
					<Link href="/testimonials" className={`font-medium text-base hover:text-[#D4A037] transition-colors ${pathname === '/testimonials' ? 'text-[#D4A037] ' : 'text-[#232B3E]'}`}>Testimonials</Link>
					<Link href="/contact" className={`font-medium text-base hover:text-[#D4A037] transition-colors ${pathname === '/contact' ? 'text-[#D4A037] ' : 'text-[#232B3E]'}`}>Contact</Link>
				</div>
				<div className="hidden md:block">
					<Link href="https://wa.me/916382946955?text=Hi%20Bhairava%20Jobs%2C%20I%20want%20to%20know%20more%20about%20job%20vacancies.">
						<button className="bg-[#D4A037] text-white rounded-full px-6 py-2 font-medium text-base cursor-pointer shadow-md hover:bg-[#b88c2c] transition-colors">
							Get In Touch
						</button>
					</Link>
				</div>
				<div className="flex items-center md:hidden">
					<button
						aria-label="Language"
						onClick={() => setLangOpen(!langOpen)}
						className="flex items-center justify-center p-2 rounded-lg hover:bg-slate-100"
					>
						<svg className="w-5 h-5 text-[#232B3E]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor">
							<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 2a10 10 0 100 20 10 10 0 000-20zM2 12h20M12 2c2.21 2.21 3.5 5.22 3.5 8s-1.29 5.79-3.5 8M12 22c-2.21-2.21-3.5-5.22-3.5-8s1.29-5.79 3.5-8" />
						</svg>
					</button>
					<button
						className="flex items-center justify-center p-2 rounded-lg border border-slate-200 bg-white shadow-sm ml-2"
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
				{/* Hidden Google element (script needs it) - always present */}
				<div id="google_translate_element" className="hidden" />
			</div>

			{/* Mobile language dropdown */}
			{langOpen && (
				<div className="md:hidden absolute right-4 top-16 w-44 bg-white border rounded shadow-sm z-50">
					{supportedLangs.map((l) => (
						<button key={l.code} onClick={() => setLanguage(l.code)} className="w-full text-left px-3 py-2 hover:bg-slate-100 text-gray-700">
							{l.label}
						</button>
						))}
				</div>
			)}
			{/* Mobile Menu */}
			{menuOpen && (
		<div className="md:hidden mx-4 mb-3 rounded-2xl border border-white/30 bg-white/60 backdrop-blur-lg shadow-2xl px-5 py-5 flex flex-col gap-4">
					<Link href="/" className={`font-medium text-[15px] leading-6 hover:text-[#D4A037] transition-colors ${pathname === '/' || pathname === '/home' ? 'text-[#D4A037] underline underline-offset-4' : 'text-[#232B3E]'}`} onClick={() => setMenuOpen(false)}>Home</Link>
					<Link href="/browse-jobs" className={`font-medium text-[15px] leading-6 hover:text-[#D4A037] transition-colors ${pathname === '/browse-jobs' ? 'text-[#D4A037] underline underline-offset-4' : 'text-[#232B3E]'}`} onClick={() => setMenuOpen(false)}>Browse Jobs</Link>
					<Link href="/about" className={`font-medium text-[15px] leading-6 hover:text-[#D4A037] transition-colors ${pathname === '/about' ? 'text-[#D4A037] underline underline-offset-4' : 'text-[#232B3E]'}`} onClick={() => setMenuOpen(false)}>About</Link>
					<Link href="/testimonials" className={`font-medium text-[15px] leading-6 hover:text-[#D4A037] transition-colors ${pathname === '/testimonials' ? 'text-[#D4A037] underline underline-offset-4' : 'text-[#232B3E]'}`} onClick={() => setMenuOpen(false)}>Testimonials</Link>
					<Link href="/contact" className={`font-medium text-[15px] leading-6 hover:text-[#D4A037] transition-colors ${pathname === '/contact' ? 'text-[#D4A037] underline underline-offset-4' : 'text-[#232B3E]'}`} onClick={() => setMenuOpen(false)}>Contact</Link>
					<Link href="https://wa.me/916382946955?text=Hi%20Bhairava%20Jobs%2C%20I%20want%20to%20know%20more%20about%20job%20vacancies.">
						<button className="bg-[#D4A037] text-white rounded-full px-6 py-2 font-medium text-base cursor-pointer shadow-md hover:bg-[#b88c2c] transition-colors">
							Get In Touch
						</button>
					</Link>
				</div>
			)}
		</nav>
	);
}
