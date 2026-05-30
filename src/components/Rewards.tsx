import { motion } from 'framer-motion';
import { Award, Medal, BadgeCheck, Mic2, Users, Trophy, PartyPopper, ShieldCheck } from 'lucide-react';

const rewards = [
	{
		icon: BadgeCheck,
		title: 'Free Participation Certificate',
		desc: 'Beautifully designed digital + print certificate for every runner.',
		color: 'from-saffron-400 to-saffron-600',
	},
	{
		icon: Award,
		title: 'Community Recognition Awards',
		desc: 'Honour outstanding villages, schools and groups.',
		color: 'from-leaf-500 to-leaf-700',
	},
	{
		icon: ShieldCheck,
		title: 'Fitness Achievement Badges',
		desc: 'Earn badges for milestones, streaks and team goals.',
		color: 'from-rose-400 to-rose-600',
	},
	{
		icon: Users,
		title: 'Networking Opportunities',
		desc: 'Connect with mentors, peers and inspiring leaders.',
		color: 'from-sky2-500 to-sky2-600',
	},
	{
		icon: Mic2,
		title: 'Inspirational Speaker Sessions',
		desc: 'Listen to doctors, scientists, athletes & changemakers.',
		color: 'from-violet-400 to-violet-600',
	},
	{
		icon: Medal,
		title: 'Relay Finisher Medals',
		desc: 'A keepsake medal for every relay finisher.',
		color: 'from-amber-400 to-amber-600',
	},
	{
		icon: Trophy,
		title: 'Community Champion Awards',
		desc: 'Special honours for extraordinary contributions.',
		color: 'from-orange-400 to-orange-600',
	},
	{
		icon: PartyPopper,
		title: 'Post-Relay Celebration Party',
		desc: 'Music, food, fellowship — entry ticket included.',
		color: 'from-pink-400 to-pink-600',
	},
];

export default function Rewards() {
	return (
		<section
			id="rewards"
			className="relative py-20 sm:py-28 bg-[#080808] overflow-hidden"
		>
			<div
				aria-hidden
				className="pointer-events-none absolute inset-x-0 top-10 h-[20px] track-dots opacity-20"
			/>
			<div aria-hidden className="pointer-events-none absolute inset-0">
				<div className="absolute top-1/2 right-0 h-64 w-64 rounded-full bg-saffron-500/8 blur-[80px]" />
			</div>
			<div className="container-x">
				<div className="text-center max-w-3xl mx-auto">
					<span className="section-eyebrow">Rewards</span>
					<h2 className="section-title mt-4">Exciting Rewards & Experiences</h2>
					<p className="mt-4 text-gray-400 text-lg">
						Beyond the run — celebrations, recognition and friendships that last a
						lifetime.
					</p>
				</div>

				<div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
					{rewards.map((r, i) => (
						<motion.div
							key={r.title}
							initial={{ opacity: 0, y: 30, rotate: -1 }}
							whileInView={{ opacity: 1, y: 0, rotate: 0 }}
							viewport={{ once: true, margin: '-60px' }}
							transition={{ duration: 0.5, delay: i * 0.05 }}
							whileHover={{ y: -8, rotate: 0.6 }}
							className="card p-6 relative overflow-hidden"
						>
							<div
								className={`absolute -top-12 -right-12 h-32 w-32 rounded-full bg-gradient-to-br ${r.color} opacity-20 blur-2xl`}
							/>
							<div
								className={`inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br ${r.color} text-white shadow-md`}
							>
								<r.icon className="h-6 w-6" />
							</div>
							<h3 className="mt-4 font-bold text-lg leading-snug text-white">
								{r.title}
							</h3>
							<p className="mt-2 text-sm text-gray-400">{r.desc}</p>
						</motion.div>
					))}
				</div>
			</div>
		</section>
	);
}
