import { motion } from 'framer-motion';
import { ClipboardCheck, Users, Dumbbell, Flag, PartyPopper, Trophy } from 'lucide-react';

const events = [
	{
		icon: ClipboardCheck,
		title: 'Registration Opens',
		date: 'Phase 1 • Online & Village Camps',
		desc: 'Free sign-up across India — schools, colleges, villages and towns.',
		color: 'from-saffron-400 to-saffron-600',
	},
	{
		icon: Users,
		title: 'Community Meetups',
		date: 'Phase 2 • Local Gatherings',
		desc: 'Meet your relay team, mentors and inspiring guests in your area.',
		color: 'from-sky2-500 to-sky2-600',
	},
	{
		icon: Dumbbell,
		title: 'Training Sessions',
		date: 'Phase 3 • Build-up Weeks',
		desc: 'Free guided runs, warm-ups, nutrition tips and health checks.',
		color: 'from-violet-400 to-violet-600',
	},
	{
		icon: Flag,
		title: 'Relay Marathon Day',
		date: 'The Big Day',
		desc: 'The baton runs through villages, fields and city streets — together.',
		color: 'from-leaf-500 to-leaf-700',
	},
	{
		icon: PartyPopper,
		title: 'Celebration Party',
		date: 'Same Evening',
		desc: 'Music, food, stories and selfies under the stars.',
		color: 'from-pink-400 to-pink-600',
	},
	{
		icon: Trophy,
		title: 'Awards & Recognition',
		date: 'Closing Ceremony',
		desc: 'Honouring champions, communities and unsung heroes.',
		color: 'from-amber-400 to-amber-600',
	},
];

export default function Timeline() {
	return (
		<section id="timeline" className="relative py-20 sm:py-28 bg-[#080808]">
			<div className="container-x">
				<div className="text-center max-w-3xl mx-auto">
					<span className="section-eyebrow">Event Timeline</span>
					<h2 className="section-title mt-4">
						The relay journey, one milestone at a time
					</h2>
				</div>

				<div className="relative mt-14">
					{/* Vertical line */}
					<div
						className="absolute left-4 sm:left-1/2 sm:-translate-x-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-saffron-500 via-leaf-500 to-sky2-500 rounded-full"
						aria-hidden
					/>

					<ul className="space-y-10">
						{events.map((e, i) => {
							const left = i % 2 === 0;
							return (
								<motion.li
									key={e.title}
									initial={{ opacity: 0, y: 30 }}
									whileInView={{ opacity: 1, y: 0 }}
									viewport={{ once: true, margin: '-80px' }}
									transition={{ duration: 0.55, delay: i * 0.05 }}
									className="relative pl-12 sm:pl-0 sm:grid sm:grid-cols-9 sm:gap-6 sm:items-center"
								>
									{/* Dot */}
									<span
										className={`absolute left-4 sm:left-1/2 sm:-translate-x-1/2 top-2 h-5 w-5 rounded-full bg-gradient-to-br ${e.color} ring-4 ring-[#080808] shadow-lg shadow-current`}
									/>

									<div
										className={`sm:col-span-4 ${
											left
												? 'sm:col-start-1 sm:text-right'
												: 'sm:col-start-6'
										}`}
									>
										<div className="card p-5 inline-block text-left">
											<div
												className={`inline-flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br ${e.color} text-white shadow-md`}
											>
												<e.icon className="h-5 w-5" />
											</div>
											<h3 className="mt-3 font-bold text-lg text-white">
												{e.title}
											</h3>
											<div className="text-xs font-semibold uppercase tracking-wider text-saffron-400">
												{e.date}
											</div>
											<p className="mt-2 text-sm text-gray-400">
												{e.desc}
											</p>
										</div>
									</div>
								</motion.li>
							);
						})}
					</ul>
				</div>
			</div>
		</section>
	);
}
