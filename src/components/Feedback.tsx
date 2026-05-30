import { FormEvent, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, Send, Lightbulb } from 'lucide-react';

const types = ['Suggestion', 'Event Idea', 'Community Initiative', 'Volunteer Proposal'] as const;

export default function Feedback() {
  const [type, setType] = useState<typeof types[number]>('Suggestion');
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [sent, setSent] = useState(false);

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;
    setSent(true);
    setName(''); setEmail(''); setMessage(''); setRating(0);
    setTimeout(() => setSent(false), 4500);
  };

  return (
    <section id="feedback" className="relative py-20 sm:py-28 bg-[#080808]">
      <div className="container-x">
        <div className="grid lg:grid-cols-12 gap-10 items-start">
          <div className="lg:col-span-5">
            <span className="section-eyebrow">Feedback & Ideas</span>
            <h2 className="section-title mt-4">Shape this movement with us</h2>
            <p className="mt-4 text-gray-400 text-lg">
              Got an idea to make the relay better? A community initiative? A volunteer plan?
              Drop it here — every voice runs with us.
            </p>
            <div className="mt-6 grid sm:grid-cols-2 gap-3">
              {[
                { t: 'Share suggestions', d: 'Make the event smoother & inclusive.' },
                { t: 'Pitch event ideas', d: 'Add new experiences to the relay.' },
                { t: 'Propose initiatives', d: 'Health camps, awareness drives, etc.' },
                { t: 'Volunteer proposals', d: 'Lead a route, host a station.' }
              ].map((c) => (
                <div key={c.t} className="rounded-2xl card p-4">
                  <div className="flex items-center gap-2 font-bold text-white">
                    <Lightbulb className="h-4 w-4 text-saffron-400" />
                    {c.t}
                  </div>
                  <div className="text-sm text-gray-400 mt-1">{c.d}</div>
                </div>
              ))}
            </div>
          </div>

          <form onSubmit={onSubmit} className="lg:col-span-7 card p-6 sm:p-8 relative">
            <div>
              <label className="label">I want to share</label>
              <div className="flex flex-wrap gap-2">
                {types.map((t) => (
                  <button
                    type="button"
                    key={t}
                    onClick={() => setType(t)}
                    className={`px-4 py-2 rounded-full text-sm font-semibold border transition ${
                      type === t
                        ? 'bg-saffron-500 text-white border-saffron-500 shadow-md shadow-saffron-500/30'
                        : 'bg-white/6 border-white/15 text-gray-300 hover:bg-white/12'
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-5">
              <label className="label">How would you rate the initiative?</label>
              <div className="flex items-center gap-1.5">
                {[1, 2, 3, 4, 5].map((n) => {
                  const active = (hover || rating) >= n;
                  return (
                    <button type="button" key={n}
                      onMouseEnter={() => setHover(n)} onMouseLeave={() => setHover(0)}
                      onClick={() => setRating(n)} aria-label={`Rate ${n} stars`} className="p-1">
                      <Star className={`h-7 w-7 transition ${active ? 'fill-amber-400 text-amber-400 scale-110' : 'text-gray-600'}`} />
                    </button>
                  );
                })}
                <span className="ml-2 text-sm text-gray-400">{rating ? `${rating}/5` : 'Tap to rate'}</span>
              </div>
            </div>

            <div className="mt-5 grid sm:grid-cols-2 gap-5">
              <div>
                <label className="label">Your Name (optional)</label>
                <input className="input" value={name} onChange={(e) => setName(e.target.value)} placeholder="Anonymous is fine!" />
              </div>
              <div>
                <label className="label">Email (optional)</label>
                <input type="email" className="input" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="If you want a reply" />
              </div>
            </div>

            <div className="mt-5">
              <label className="label">Your Message</label>
              <textarea value={message} onChange={(e) => setMessage(e.target.value)} rows={5}
                className="input resize-y" placeholder={`Share your ${type.toLowerCase()}...`} required />
            </div>

            <div className="mt-6 flex flex-wrap gap-3">
              <button type="submit" className="btn-primary">
                <Send className="h-4 w-4" /> Submit
              </button>
              <span className="text-sm text-gray-500 self-center">We read every single message. 💚</span>
            </div>

            <AnimatePresence>
              {sent && (
                <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                  className="mt-5 rounded-2xl bg-leaf-500/15 border border-leaf-500/30 p-4 text-white font-semibold">
                  ✅ Thank you! Your {type.toLowerCase()} has been received.
                </motion.div>
              )}
            </AnimatePresence>
          </form>
        </div>
      </div>
    </section>
  );
}
