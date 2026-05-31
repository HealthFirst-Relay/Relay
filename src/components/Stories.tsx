import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';

const stories = [
	{
		name: 'Anjali, Class 10 Student',
		place: 'Westside Community',
		quote: 'I never thought running could feel like a festival. I made friends from villages 50 km away — and I run every morning now!',
		color: 'from-violet-400 to-violet-600',
		initials: 'A',
		photo: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=300&q=70'
	},
	{
		name: 'Ramesh Bhai, Farmer',
		place: 'River Valley',
		quote: 'The marathon brought our entire village together. My back pain reduced and our youngsters now wake up early to run with me.',
		color: 'from-leaf-500 to-leaf-700',
		initials: 'R',
		photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=70'
	},
	{
		name: 'Mrs. Latha, Teacher',
		place: 'Southside School',
		quote: 'My students learnt teamwork, kindness and discipline in just one weekend. This is education at its purest.',
		color: 'from-amber-400 to-amber-600',
		initials: 'L',
		photo: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=300&q=70'
	},
	{
		name: 'Dr. Arjun, Physician',
		place: 'Central Clinic',
		quote: 'I met patients-turned-friends. The conversations on the route were more healing than any clinic.',
		color: 'from-rose-400 to-rose-600',
		initials: 'D',
		photo: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&w=300&q=70'
	},
	{
		name: 'Bhanwari Devi, 68',
		place: 'Desert Road',
		quote: 'I walked 3 km of the relay. People cheered me like a star. I felt 25 again!',
		color: 'from-saffron-400 to-saffron-600',
		initials: 'B',
		photo: 'https://images.unsplash.com/photo-1581579438747-104c53e7a7b3?auto=format&fit=crop&w=300&q=70'
	}
];

export default function Stories() {
	const [i, setI] = useState(0);

	useEffect(() => {
		const t = setInterval(() => setI((x) => (x + 1) % stories.length), 6000);
		return () => clearInterval(t);
	}, []);

	const next = () => setI((x) => (x + 1) % stories.length);
	const prev = () => setI((x) => (x - 1 + stories.length) % stories.length);

	const s = stories[i];

	return (
		<section id="stories" className="relative py-20 sm:py-28 bg-[#0a0a0a]">
			<div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
				<div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-72 w-[600px] rounded-full bg-saffron-500/5 blur-[100px]" />
			</div>
			<div className="container-x">
				<div className="text-center max-w-3xl mx-auto">
					<span className="section-eyebrow">Community Stories</span>
					<h2 className="section-title mt-4">Voices from across communities</h2>
				</div>

				<div className="mt-12 max-w-4xl mx-auto relative">
					<AnimatePresence mode="wait">
						<motion.figure
							key={i}
							initial={{ opacity: 0, y: 24 }}
							animate={{ opacity: 1, y: 0 }}
							exit={{ opacity: 0, y: -24 }}
							transition={{ duration: 0.45 }}
							className="card p-8 sm:p-10 relative"
						>
							<Quote className="absolute -top-4 -left-4 h-12 w-12 text-saffron-500/30" />
							<blockquote className="text-lg sm:text-2xl font-display font-semibold text-white leading-relaxed">
								"{s.quote}"
							</blockquote>
							<figcaption className="mt-6 flex items-center gap-4">
								<div className={`relative h-14 w-14 rounded-full overflow-hidden ring-2 ring-white/20 shadow-md bg-gradient-to-br ${s.color}`}>
									<img
										src={s.photo}
										alt={s.name}
										loading="lazy"
										className="absolute inset-0 h-full w-full object-cover"
										onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = 'none'; }}
									/>
									<span className="absolute inset-0 flex items-center justify-center font-extrabold text-xl text-white">
										{s.initials}
									</span>
								</div>
								<div>
									<div className="font-bold text-white">{s.name}</div>
									<div className="text-sm text-gray-400">{s.place}</div>
								</div>
							</figcaption>
						</motion.figure>
					</AnimatePresence>

					<div className="mt-6 flex items-center justify-center gap-3">
						<button onClick={prev} aria-label="Previous" className="p-2 rounded-full bg-white/8 border border-white/15 hover:bg-white/15 text-white transition">
							<ChevronLeft className="h-5 w-5" />
						</button>
						<div className="flex gap-2">
							{stories.map((_, k) => (
								<button
									key={k}
									aria-label={`Go to story ${k + 1}`}
									onClick={() => setI(k)}
									className={`h-2.5 rounded-full transition-all ${k === i ? 'w-8 bg-saffron-500' : 'w-2.5 bg-white/20 hover:bg-white/35'}`}
								/>
							))}
						</div>
						<button onClick={next} aria-label="Next" className="p-2 rounded-full bg-white/8 border border-white/15 hover:bg-white/15 text-white transition">
							<ChevronRight className="h-5 w-5" />
						</button>
					</div>
				</div>
			</div>
		</section>
	);
}
