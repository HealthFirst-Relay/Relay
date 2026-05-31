import { motion } from 'framer-motion';
import { ArrowRight, HandHeart, Info, MapPin, CalendarDays, Flag } from 'lucide-react';

export default function Hero({ participantCount }: { participantCount: number }) {
  return (
    <section id="top" className="relative min-h-[100svh] flex flex-col overflow-hidden">
      {/* Full-bleed background photo */}
      <div className="absolute inset-0 -z-10">
        <img
          src="https://images.unsplash.com/photo-1452626038306-9aae5e071dd3?auto=format&fit=crop&w=1920&q=80"
          alt="Runners in a community marathon"
          className="h-full w-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#080808] via-[#080808]/80 to-[#080808]/30" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#080808] via-transparent to-[#080808]/60" />
      </div>

      {/* Orb accents */}
      <div className="container-x relative flex-1 flex items-center pt-24 sm:pt-28 pb-16 sm:pb-20">
        <div className="grid lg:grid-cols-12 gap-10 items-center w-full">
          <div className="lg:col-span-7">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="section-eyebrow">
              <span className="h-1.5 w-1.5 rounded-full bg-saffron-500 animate-pulse" />
              Inaugural Relay • Free Registration
            </motion.div>

            <motion.h1 initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.05 }}
              className="mt-5 text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-extrabold leading-[1.02] text-white">
              Health First{' '}
              <span className="bg-gradient-to-r from-saffron-400 via-saffron-500 to-leaf-400 bg-clip-text text-transparent">Relay</span>
              <br />
              <span className="bg-gradient-to-r from-leaf-400 to-saffron-400 bg-clip-text text-transparent">Marathon</span>
            </motion.h1>

            <motion.p initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.15 }}
              className="mt-6 text-lg sm:text-xl text-gray-300 max-w-2xl leading-relaxed">
              <span className="font-semibold text-white">Run Together. Grow Together. Inspire Together.</span>{' '}
              Be among the first participants in a volunteer-built community relay for health, connection, and simple movement. Run, walk, support, or help shape the first route.
            </motion.p>

            <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.25 }}
              className="mt-9 flex flex-wrap gap-3">
              <a href="#register" className="btn-primary text-base px-8 py-3.5">Register Now <ArrowRight className="h-5 w-5" /></a>
              <a href="#about" className="btn-ghost text-base"><Info className="h-5 w-5" /> Learn More</a>
              <a href="#feedback" className="btn-ghost text-base"><HandHeart className="h-5 w-5" /> Volunteer</a>
            </motion.div>

            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.7, delay: 0.4 }}
              className="mt-8 flex flex-wrap gap-4 text-sm text-gray-400">
              <span className="inline-flex items-center gap-2 bg-white/8 backdrop-blur px-4 py-2 rounded-full border border-white/12">
                <CalendarDays className="h-4 w-4 text-saffron-400" /> Date Coming Soon
              </span>
              <span className="inline-flex items-center gap-2 bg-white/8 backdrop-blur px-4 py-2 rounded-full border border-white/12">
                <MapPin className="h-4 w-4 text-leaf-400" /> First Community Route
              </span>
            </motion.div>
          </div>

          {/* Right — floating card */}
          <div className="lg:col-span-5 relative">
            <motion.div initial={{ opacity: 0, scale: 0.9, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative rounded-[2rem] bg-white/8 backdrop-blur-xl border border-white/15 shadow-2xl p-5 overflow-hidden">
              <div className="relative h-52 sm:h-60 rounded-2xl overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1571008887538-b36bb32f4571?auto=format&fit=crop&w=900&q=75"
                  alt="Group of runners moving together"
                  className="absolute inset-0 h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
                  <span className="text-xs font-semibold bg-black/50 backdrop-blur px-2.5 py-1 rounded-full text-white">Built by volunteers</span>
                  <span className="inline-flex items-center gap-1 text-xs font-bold bg-saffron-500/90 px-2.5 py-1 rounded-full text-white">
                    <Flag className="h-3.5 w-3.5" /> First Edition
                  </span>
                </div>
              </div>

              <div className="mt-4 grid grid-cols-3 gap-3 text-center">
                {[{ k: participantCount.toString(), v: 'Participants' }, { k: '100%', v: 'Free' }, { k: '1st', v: 'Relay' }].map((s) => (
                  <div key={s.v} className="rounded-2xl bg-white/6 border border-white/10 p-3">
                    <div className="text-xl font-extrabold text-saffron-400">{s.k}</div>
                    <div className="text-[11px] uppercase tracking-wider text-gray-400 font-semibold">{s.v}</div>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.7 }}
              className="hidden sm:flex mt-3 items-center gap-2 bg-white/10 backdrop-blur-xl rounded-full px-4 py-2 border border-white/20 w-fit">
              <span className="h-2 w-2 rounded-full bg-leaf-400 animate-pulse" />
              <span className="text-xs font-semibold text-white">A movement for healthier communities</span>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Marquee strip */}
      <div className="relative border-y border-white/10 bg-white/4 backdrop-blur overflow-hidden">
        <div className="flex animate-[marquee_30s_linear_infinite] whitespace-nowrap py-3 text-gray-300 font-semibold text-sm">
          {Array.from({ length: 2 }).map((_, k) => (
            <div key={k} className="flex shrink-0 items-center gap-10 px-6">
              {['Run Together','Grow Together','Inspire Together','Community First','Made for Everyone','Health for All','Free Participation','Strong Communities','Relay Race'].map((t, i) => (
                <span key={`${k}-${i}`} className="inline-flex items-center gap-2">
                  <span className="text-base">{t}</span>
                  <span className="h-1 w-1 rounded-full bg-saffron-500" />
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
