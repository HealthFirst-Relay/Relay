import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Plus } from 'lucide-react';

const faqs = [
	{
		q: 'Is participation free?',
		a: 'Yes, 100% free. There is no registration fee at any stage.',
	},
	{
		q: 'Who can join?',
		a: 'Children, students, young professionals, adults, senior citizens, families, villagers, schools, colleges and community groups — everyone is welcome.',
	},
	{
		q: 'What is the distance limit?',
		a: 'You can choose a personal goal from 1 km to 100 km. The final relay route and format will be shared after planning is complete.',
	},
	{
		q: 'Can families participate?',
		a: 'Yes. Families can register together, and minors should participate with a parent, guardian, school, or approved community group.',
	},
	{
		q: 'How do relay teams work?',
		a: 'A team passes a symbolic baton from one runner to the next. Each member runs a comfortable distance — no pressure, just participation.',
	},
	{
		q: 'When is the event date?',
		a: 'The date is coming soon. Registered participants will receive updates when the route and schedule are confirmed.',
	},
	{
		q: 'How do I volunteer?',
		a: 'Tick "Volunteer Interest" while registering, or use the Feedback section to send a volunteer proposal. The team will follow up as planning progresses.',
	},
	{
		q: 'How is my information used?',
		a: 'Your contact details are used for event confirmation, route updates, safety updates, and volunteer coordination. Do not submit sensitive medical details.',
	},
];

export default function FAQ() {
	const [open, setOpen] = useState<number | null>(0);
	return (
		<section id="faq" className="relative py-20 sm:py-28 bg-[#0a0a0a]">
			<div className="container-x max-w-4xl">
				<div className="text-center">
					<span className="section-eyebrow">FAQ</span>
					<h2 className="section-title mt-4">Frequently Asked Questions</h2>
				</div>
				<ul className="mt-10 space-y-3">
					{faqs.map((f, i) => {
						const isOpen = open === i;
						return (
							<li key={f.q} className="card p-0 overflow-hidden">
								<button
									className="w-full flex items-center justify-between gap-4 p-5 text-left"
									onClick={() => setOpen(isOpen ? null : i)}
									aria-expanded={isOpen}
								>
									<span className="font-bold text-white">{f.q}</span>
									<motion.span
										animate={{ rotate: isOpen ? 45 : 0 }}
										className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-saffron-500 text-white shrink-0 shadow-md shadow-saffron-500/30"
									>
										<Plus className="h-5 w-5" />
									</motion.span>
								</button>
								<AnimatePresence initial={false}>
									{isOpen && (
										<motion.div
											initial={{ height: 0, opacity: 0 }}
											animate={{ height: 'auto', opacity: 1 }}
											exit={{ height: 0, opacity: 0 }}
											transition={{ duration: 0.3 }}
											className="px-5 pb-5 text-gray-400"
										>
											{f.a}
										</motion.div>
									)}
								</AnimatePresence>
							</li>
						);
					})}
				</ul>
			</div>
		</section>
	);
}
