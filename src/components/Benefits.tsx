import { motion } from 'framer-motion';
import { HeartPulse, Brain, Users2, GraduationCap, Globe2 } from 'lucide-react';

const benefits = [
	{
		icon: HeartPulse,
		title: 'Health Benefits',
		color: 'from-rose-400 to-rose-600',
		items: [
			'Improved heart health',
			'Better stamina',
			'Weight management',
			'Increased energy',
		],
	},
	{
		icon: Brain,
		title: 'Mental Wellness',
		color: 'from-violet-400 to-violet-600',
		items: [
			'Reduced stress',
			'Better mood',
			'Increased confidence',
			'Positive mindset',
		],
	},
	{
		icon: Users2,
		title: 'Community Benefits',
		color: 'from-saffron-400 to-saffron-600',
		items: [
			'Meet new people',
			'Strengthen local networks',
			'Encourage teamwork',
			'Build friendships',
		],
	},
	{
		icon: GraduationCap,
		title: 'Youth Development',
		color: 'from-sky2-500 to-sky2-600',
		items: [
			'Communication skills',
			'Leadership opportunities',
			'Confidence building',
			'Career inspiration',
		],
	},
	{
		icon: Globe2,
		title: 'Social Impact',
		color: 'from-leaf-500 to-leaf-700',
		items: [
			'Stronger villages',
			'Health awareness',
			'Community engagement',
			'Positive change',
		],
	},
];

export default function Benefits() {
	return (
		<section
			id="benefits"
			className="relative py-20 sm:py-28 bg-[#080808] overflow-hidden"
		>
			<div aria-hidden className="pointer-events-none absolute inset-0">
				<div className="absolute top-0 left-1/2 -translate-x-1/2 h-72 w-[700px] rounded-full bg-saffron-500/6 blur-[100px]" />
			</div>
			<div className="container-x">
				<div className="text-center max-w-3xl mx-auto">
					<span className="section-eyebrow">Why Join</span>
					<h2 className="section-title mt-4">
						Benefits that ripple far beyond the finish line
					</h2>
					<p className="mt-4 text-gray-400 text-lg">
						One relay. Five powerful ways it transforms lives across India.
					</p>
				</div>
				<div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
					{benefits.map((b, i) => (
						<motion.div
							key={b.title}
							initial={{ opacity: 0, y: 30 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true, margin: '-60px' }}
							transition={{ duration: 0.5, delay: i * 0.06 }}
							whileHover={{ y: -8, rotate: -0.4 }}
							className="card p-7 relative overflow-hidden group"
						>
							<div
								className={`absolute -top-16 -right-16 h-44 w-44 rounded-full bg-gradient-to-br ${b.color} opacity-15 blur-2xl group-hover:opacity-30 transition`}
							/>
							<div
								className={`inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${b.color} text-white shadow-lg`}
							>
								<b.icon className="h-7 w-7" />
							</div>
							<h3 className="mt-5 text-xl font-bold text-white">
								{b.title}
							</h3>
							<ul className="mt-4 space-y-2">
								{b.items.map((it) => (
									<li
										key={it}
										className="flex items-start gap-2 text-gray-400"
									>
										<span className="mt-2 h-1.5 w-1.5 rounded-full bg-leaf-400 shrink-0" />
										<span>{it}</span>
									</li>
								))}
							</ul>
						</motion.div>
					))}

					{/* Health photo card */}
					<motion.div
						initial={{ opacity: 0, scale: 0.95 }}
						whileInView={{ opacity: 1, scale: 1 }}
						viewport={{ once: true, margin: '-60px' }}
						transition={{ duration: 0.6, delay: 0.3 }}
						className="relative rounded-3xl overflow-hidden border border-white/10 h-64 sm:h-auto"
					>
						<img
							src="https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?auto=format&fit=crop&w=900&q=75"
							alt="Runner on an open road at sunrise"
							className="absolute inset-0 h-full w-full object-cover"
							loading="lazy"
						/>
						<div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
						<div className="absolute bottom-5 left-5 right-5 text-white">
							<div className="text-xs font-bold uppercase tracking-widest text-leaf-400">
								Fitness First
							</div>
							<div className="mt-1 font-bold text-lg">
								Run. Breathe. Thrive. Repeat.
							</div>
						</div>
					</motion.div>
				</div>
			</div>
		</section>
	);
}
