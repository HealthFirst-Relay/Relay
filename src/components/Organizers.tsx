import { motion } from 'framer-motion';
import { Linkedin, Twitter, Mail } from 'lucide-react';

const team = [
	{
		name: 'Aarav Sharma',
		role: 'Software Engineer',
		mission: 'Building digital tools to bring villages and cities together.',
		color: 'from-sky2-500 to-sky2-600',
		initials: 'AS',
	},
	{
		name: 'Dr. Priya Iyer',
		role: 'Doctor',
		mission: 'Championing preventive health awareness across rural India.',
		color: 'from-rose-400 to-rose-600',
		initials: 'PI',
	},
	{
		name: 'Meera Nair',
		role: 'Teacher',
		mission: 'Inspiring students to lead healthy, purposeful lives.',
		color: 'from-amber-400 to-amber-600',
		initials: 'MN',
	},
	{
		name: 'Rohan Verma',
		role: 'Student Lead',
		mission: 'Mobilising youth volunteers across schools and colleges.',
		color: 'from-violet-400 to-violet-600',
		initials: 'RV',
	},
	{
		name: 'Sunita Devi',
		role: 'Community Volunteer',
		mission: 'Connecting families and farmers to the health movement.',
		color: 'from-leaf-500 to-leaf-700',
		initials: 'SD',
	},
	{
		name: 'Karthik Rao',
		role: 'Operations Lead',
		mission: 'Making sure every relay route runs safely and smoothly.',
		color: 'from-saffron-400 to-saffron-600',
		initials: 'KR',
	},
	{
		name: 'Fatima Khan',
		role: 'Outreach Lead',
		mission: 'Bringing diverse communities under one running banner.',
		color: 'from-pink-400 to-pink-600',
		initials: 'FK',
	},
	{
		name: 'Vikram Singh',
		role: 'Logistics Volunteer',
		mission: 'Hydration, safety & smiles — at every kilometer.',
		color: 'from-emerald-400 to-emerald-600',
		initials: 'VS',
	},
];

export default function Organizers() {
	return (
		<section id="organizers" className="relative py-20 sm:py-28 bg-[#0a0a0a]">
			<div className="container-x">
				<div className="text-center max-w-3xl mx-auto">
					<span className="section-eyebrow">Organizers</span>
					<h2 className="section-title mt-4">Meet the Organizers</h2>
					<p className="mt-4 text-gray-400 text-lg">
						A passionate team of engineers, doctors, teachers, students and volunteers
						powering the movement.
					</p>
				</div>

				<div className="mt-12 grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
					{team.map((m, i) => (
						<motion.article
							key={m.name}
							initial={{ opacity: 0, y: 30 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true, margin: '-60px' }}
							transition={{ duration: 0.5, delay: i * 0.05 }}
							whileHover={{ y: -8 }}
							className="card p-6 text-center group"
						>
							<div className="relative mx-auto h-24 w-24">
								<div
									className={`absolute inset-0 rounded-full bg-gradient-to-br ${m.color} blur-md opacity-50 group-hover:opacity-80 transition`}
								/>
								<div
									className={`relative h-24 w-24 rounded-full bg-gradient-to-br ${m.color} text-white flex items-center justify-center text-2xl font-extrabold shadow-lg ring-4 ring-black/50`}
								>
									{m.initials}
								</div>
							</div>
							<h3 className="mt-4 text-lg font-bold text-white">{m.name}</h3>
							<div className="text-sm font-semibold text-saffron-400">
								{m.role}
							</div>
							<p className="mt-2 text-sm text-gray-400">{m.mission}</p>
							<div className="mt-4 flex items-center justify-center gap-2 text-gray-500">
								<a
									href="#"
									aria-label="LinkedIn"
									className="p-2 rounded-full hover:bg-white/8 hover:text-saffron-400 transition"
								>
									<Linkedin className="h-4 w-4" />
								</a>
								<a
									href="#"
									aria-label="Twitter"
									className="p-2 rounded-full hover:bg-white/8 hover:text-saffron-400 transition"
								>
									<Twitter className="h-4 w-4" />
								</a>
								<a
									href="#"
									aria-label="Email"
									className="p-2 rounded-full hover:bg-white/8 hover:text-saffron-400 transition"
								>
									<Mail className="h-4 w-4" />
								</a>
							</div>
						</motion.article>
					))}
				</div>
			</div>
		</section>
	);
}
