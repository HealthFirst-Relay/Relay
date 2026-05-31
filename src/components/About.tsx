import { motion } from 'framer-motion';
import { Users, MapPinned, Footprints, HeartHandshake, Sparkles } from 'lucide-react';
import Counter from './Counter';

const baseStats = [
	{
		icon: Users,
		end: 0,
		suffix: '',
		label: 'Participants',
		color: 'from-saffron-500 to-saffron-600',
	},
	{
		icon: MapPinned,
		end: 1,
		suffix: '',
		label: 'Relay Season',
		color: 'from-leaf-500 to-leaf-700',
	},
	{
		icon: Footprints,
		end: 100,
		suffix: ' km',
		label: 'Distance Goals',
		color: 'from-sky2-500 to-sky2-600',
	},
	{
		icon: HeartHandshake,
		end: 50,
		suffix: '+',
		label: 'Volunteers',
		color: 'from-rose-400 to-rose-600',
	},
	{
		icon: Sparkles,
		end: 1,
		suffix: '',
		label: 'Routes Confirmed',
		color: 'from-amber-400 to-amber-600',
	},
];

const points = [
	'100% free participation for everyone',
	'Open to children, students, families & seniors',
	'Relay format — share the distance, share the joy',
	'Flexible 50–100+ km collective goal',
	'Health awareness camps along the route',
	'Stronger villages, healthier communities',
];

export default function About({ participantCount }: { participantCount: number }) {
	const stats = baseStats.map((s) =>
		s.label === 'Participants' ? { ...s, end: participantCount } : s
	);

	return (
		<section id="about" className="relative py-20 sm:py-28 bg-[#0a0a0a]">
			{/* Subtle glow */}
			<div
				aria-hidden
				className="pointer-events-none absolute inset-0 overflow-hidden"
			>
				<div className="absolute -top-20 left-1/2 -translate-x-1/2 h-64 w-[600px] rounded-full bg-leaf-600/8 blur-[80px]" />
			</div>
			<div className="container-x">
				<div className="grid lg:grid-cols-12 gap-12 items-start">
					<motion.div
						initial={{ opacity: 0, y: 24 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true, margin: '-80px' }}
						transition={{ duration: 0.6 }}
						className="lg:col-span-5"
					>
						<span className="section-eyebrow">About the Event</span>
						<h2 className="section-title mt-4">
							A relay that runs through every{' '}
							<span className="text-leaf-400">village,</span>{' '}
							<span className="text-saffron-400">school</span> and{' '}
							<span className="text-sky2-400">city.</span>
						</h2>
						<p className="mt-5 text-gray-400 text-lg leading-relaxed">
							Health First Relay Marathon is a free, all-inclusive relay
							where families, farmers, students, professionals and seniors run
							together — passing the baton of wellbeing from one neighbour to the
							next.
						</p>

						<ul className="mt-7 grid sm:grid-cols-2 gap-3">
							{points.map((p) => (
								<li
									key={p}
									className="flex items-start gap-3 card p-3"
								>
									<span className="mt-1 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-leaf-500 text-white text-[10px]">
										✓
									</span>
									<span className="text-sm text-gray-300">{p}</span>
								</li>
							))}
						</ul>
					</motion.div>

					<div className="lg:col-span-7">
						<motion.div
							initial={{ opacity: 0, scale: 0.96 }}
							whileInView={{ opacity: 1, scale: 1 }}
							viewport={{ once: true, margin: '-60px' }}
							transition={{ duration: 0.6 }}
							className="relative mb-5 rounded-3xl overflow-hidden shadow-2xl border border-white/10 h-60 sm:h-72"
						>
							<img
								src="https://images.unsplash.com/photo-1530137073521-28cda9e9b39c?auto=format&fit=crop&w=1400&q=70"
								alt="Children and adults running together in a community event"
								className="absolute inset-0 h-full w-full object-cover"
								loading="lazy"
								onError={(e) => {
  									const img = e.currentTarget as HTMLImageElement;
  									img.onerror = null;
 									img.src = `${import.meta.env.BASE_URL}images/relay-community.svg`;
								}}
							/>
							<div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/15 to-transparent" />
							<div className="absolute bottom-5 left-5 right-5 text-white">
								<div className="text-xs font-bold uppercase tracking-[0.2em] text-saffron-400">
									On the route
								</div>
								<div className="mt-1 text-lg sm:text-xl font-bold">
									From village lanes to city streets — one relay, one nation.
								</div>
							</div>
						</motion.div>

						<div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
							{stats.map((s, i) => (
								<motion.div
									key={s.label}
									initial={{ opacity: 0, y: 30 }}
									whileInView={{ opacity: 1, y: 0 }}
									viewport={{ once: true, margin: '-60px' }}
									transition={{ duration: 0.5, delay: i * 0.07 }}
									whileHover={{ y: -6 }}
									className="card p-6 relative overflow-hidden"
								>
									<div
										className={`absolute -top-10 -right-10 h-28 w-28 rounded-full bg-gradient-to-br ${s.color} opacity-15 blur-2xl`}
									/>
									<div
										className={`inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br ${s.color} text-white shadow-lg`}
									>
										<s.icon className="h-6 w-6" />
									</div>
									<div className="mt-4 text-3xl sm:text-4xl font-extrabold text-white">
										<Counter end={s.end} suffix={s.suffix} />
									</div>
									<div className="mt-1 text-sm font-semibold uppercase tracking-wider text-gray-400">
										{s.label}
									</div>
								</motion.div>
							))}

							<motion.div
								initial={{ opacity: 0, y: 30 }}
								whileInView={{ opacity: 1, y: 0 }}
								viewport={{ once: true }}
								transition={{ duration: 0.6, delay: 0.4 }}
								className="card p-6 bg-gradient-to-br from-saffron-500/80 to-leaf-600/80 border-0"
							>
								<div className="text-xs font-bold uppercase tracking-[0.2em] text-white/80">
									Community Impact
								</div>
								<div className="mt-3 text-xl font-extrabold leading-snug text-white">
									Every step plants a seed of healthier communities
								</div>
								<p className="mt-3 text-sm text-white/85">
									Awareness drives, free check-ups, school workshops &
									inter-generational meetups.
								</p>
							</motion.div>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
