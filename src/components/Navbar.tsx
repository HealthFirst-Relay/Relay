import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Activity, Globe } from 'lucide-react';

const links = [
	{ href: '#about', label: 'About' },
	{ href: '#details', label: 'Details' },
	{ href: '#benefits', label: 'Benefits' },
	{ href: '#inspiration', label: 'Inspiration' },
	{ href: '#timeline', label: 'Timeline' },
	{ href: '#faq', label: 'FAQ' }
];

export default function Navbar() {
	const [scrolled, setScrolled] = useState(false);
	const [open, setOpen] = useState(false);

	useEffect(() => {
		const onScroll = () => setScrolled(window.scrollY > 30);
		onScroll();
		window.addEventListener('scroll', onScroll);
		return () => window.removeEventListener('scroll', onScroll);
	}, []);

	const handleTranslate = () => {
		const element = document.querySelector('.goog-te-combo') as HTMLSelectElement;
		if (element) {
			element.value = 'te';
			element.dispatchEvent(new Event('change'));
		}
	};

	return (
		<header
			className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
				scrolled
					? 'bg-[#080808]/90 backdrop-blur-xl shadow-lg shadow-black/40 border-b border-white/8'
					: 'bg-transparent'
			}`}
		>
			<div className="container-x flex items-center justify-between h-16 sm:h-20">
				<a href="#top" className="flex items-center gap-2 group">
					<span className="relative flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-saffron-500 to-leaf-600 text-white shadow-lg shadow-saffron-500/30 group-hover:scale-1[...]
						<Activity className="h-5 w-5" />
					</span>
					<span className="font-display font-extrabold text-lg sm:text-xl leading-tight text-white">
						Health First
						<span className="block text-[11px] sm:text-sm font-semibold uppercase tracking-[0.16em] text-saffron-400">
							Relay Marathon
						</span>
					</span>
				</a>

				<nav className="hidden lg:flex items-center gap-7">
					{links.map((l) => (
						<a
							key={l.href}
							href={l.href}
							className="text-base font-semibold text-gray-300 hover:text-white transition relative after:absolute after:left-0 after:-bottom-1 after:h-0.5 after:w-0 after:bg-saffron-500 hover:after:w-fu[...]
						>
							{l.label}
						</a>
					))}
				</nav>

				<div className="hidden lg:flex items-center gap-3">
					<button
						onClick={handleTranslate}
						title="Translate to Telugu"
						className="p-2.5 rounded-lg bg-white/10 border border-white/15 text-gray-300 hover:text-white hover:bg-white/20 transition flex items-center gap-2"
					>
						<Globe className="h-5 w-5" />
						<span className="text-sm font-semibold">తెలుగు</span>
					</button>
					<a href="#register" className="btn-primary !py-2.5 !px-6 text-base">
						Register Now
					</a>
				</div>

				<button
					aria-label="Toggle menu"
					className="lg:hidden p-2 rounded-lg bg-white/10 border border-white/15 text-white"
					onClick={() => setOpen((s) => !s)}
				>
					{open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
				</button>
			</div>

			<AnimatePresence>
				{open && (
					<motion.div
						initial={{ opacity: 0, y: -10 }}
						animate={{ opacity: 1, y: 0 }}
						exit={{ opacity: 0, y: -10 }}
						className="lg:hidden bg-[#0f0f0f] border-t border-white/10 shadow-xl"
					>
						<div className="container-x py-4 flex flex-col gap-1">
							{links.map((l) => (
								<a
									key={l.href}
									href={l.href}
									onClick={() => setOpen(false)}
									className="px-3 py-3 rounded-xl hover:bg-white/8 font-semibold text-base text-gray-200 hover:text-white transition"
								>
									{l.label}
								</a>
							))}
							<button
								onClick={() => {
									handleTranslate();
									setOpen(false);
								}}
								className="px-3 py-3 rounded-xl hover:bg-white/8 font-semibold text-base text-gray-200 hover:text-white transition flex items-center gap-2 w-full"
							>
								<Globe className="h-4 w-4" />
								తెలుగు (Telugu)
							</button>
							<a
								href="#register"
								onClick={() => setOpen(false)}
								className="btn-primary mt-2"
							>
								Register Now
							</a>
						</div>
					</motion.div>
				)}
			</AnimatePresence>
		</header>
	);
}
