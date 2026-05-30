import { motion } from 'framer-motion';
import { Code2, Stethoscope, BookOpen, GraduationCap, Briefcase, Microscope, Landmark, Users2, HeartHandshake } from 'lucide-react';

const profiles = [
	{ icon: Code2, role: 'Software Engineer', tagline: 'Building tech for Bharat', color: 'from-sky2-500 to-sky2-600' },
	{ icon: Stethoscope, role: 'Doctor', tagline: 'Caring beyond clinics', color: 'from-rose-400 to-rose-600' },
	{ icon: BookOpen, role: 'Teacher', tagline: 'Lighting young minds', color: 'from-amber-400 to-amber-600' },
	{ icon: GraduationCap, role: 'Student', tagline: 'Tomorrow, today', color: 'from-violet-400 to-violet-600' },
	{ icon: Briefcase, role: 'Entrepreneur', tagline: 'Ideas that uplift', color: 'from-saffron-400 to-saffron-600' },
	{ icon: Microscope, role: 'Scientist', tagline: 'Curiosity for India', color: 'from-emerald-400 to-emerald-600' },
	{ icon: Landmark, role: 'Politician', tagline: 'Public service first', color: 'from-indigo-400 to-indigo-600' },
	{ icon: Users2, role: 'Community Leader', tagline: 'Voice of the village', color: 'from-leaf-500 to-leaf-700' },
	{ icon: HeartHandshake, role: 'Social Worker', tagline: 'Hands that heal', color: 'from-pink-400 to-pink-600' }
];

export default function Inspiration() {
	return (
		<section id="inspiration" className="relative py-20 sm:py-28 bg-[#0a0a0a]">
			<div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
				<div className="absolute bottom-0 left-1/2 -translate-x-1/2 h-64 w-[700px] rounded-full bg-leaf-500/6 blur-[90px]" />
			</div>
			<div className="container-x">
				<div className="text-center max-w-3xl mx-auto">
					<span className="section-eyebrow">Inspiration</span>
					<h2 className="section-title mt-4">Meet. Learn. Get Inspired.</h2>
					<p className="mt-4 text-gray-400 text-lg">
						Walk beside the people you've only read about. Every relay route brings together
						doctors, scientists, teachers, students and changemakers — ready to share their stories.
					</p>
				</div>

				<div className="mt-12 grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
					{profiles.map((p, i) => (
						<motion.div
							key={p.role}
							initial={{ opacity: 0, y: 30 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true, margin: '-60px' }}
							transition={{ duration: 0.5, delay: i * 0.05 }}
							whileHover={{ y: -8, scale: 1.02 }}
							className="group relative card p-6 overflow-hidden"
						>
							<div className={`absolute inset-0 bg-gradient-to-br ${p.color} opacity-0 group-hover:opacity-100 transition duration-500`} />
							<div className="relative">
								<div className={`inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${p.color} text-white shadow-md transition`}>
									<p.icon className="h-7 w-7" />
								</div>
								<h3 className="mt-5 text-xl font-bold text-white group-hover:text-white transition">{p.role}</h3>
								<p className="mt-2 text-gray-400 group-hover:text-white/90 transition">{p.tagline}</p>
								<div className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-saffron-400 group-hover:text-white transition">
									Connect & Learn
									<span className="h-px w-8 bg-current group-hover:w-12 transition-all" />
								</div>
							</div>
						</motion.div>
					))}
				</div>

				<motion.blockquote
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					transition={{ duration: 0.6 }}
					className="mt-14 max-w-3xl mx-auto text-center text-xl sm:text-2xl font-display font-semibold text-gray-200"
				>
					"Every participant has a story.{' '}
					<span className="bg-gradient-to-r from-saffron-400 to-leaf-400 bg-clip-text text-transparent">
						Every story can inspire someone.
					</span>"
				</motion.blockquote>
			</div>
		</section>
	);
}
