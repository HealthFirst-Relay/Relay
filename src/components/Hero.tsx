import { motion } from 'framer-motion';
import { ArrowRight, HandHeart, Info, MapPin, CalendarDays, Play } from 'lucide-react';

export default function Hero() {
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
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute top-1/4 left-1/3 h-[500px] w-[500px] rounded-full bg-saffron-500/10 blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/4 h-[400px] w-[400px] rounded-full bg-leaf-500/10 blur-[100px]" />
      </div>

      <div className="container-x relative flex-1 flex items-center pt-24 sm:pt-28 pb-16 sm:pb-20">
        <div className="grid lg:grid-cols-12 gap-10 items-center w-full">
          <div className="lg:col-span-7">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="section-eyebrow">
              <span className="h-1.5 w-1.5 rounded-full bg-saffron-500 animate-pulse" />
              Free • For Everyone • Across India
            </motion.div>

            <motion.h1 initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.05 }}
              className="mt-5 text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-extrabold leading-[1.02] text-white">
              Health First{' '}
              <span className="bg-gradient-to-r from-saffron-400 via-saffron-500 to-leaf-400 bg-clip-text text-transparent">Relay</span>
              <br />
              <span className="bg-gradient-to-r from-leaf-400 to-saffron-400 bg-clip-text text-transparent">Marathon</span>{' '}India
            </motion.h1>

            <motion.p initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.15 }}
              className="mt-6 text-lg sm:text-xl text-gray-300 max-w-2xl leading-relaxed">
              <span className="font-semibold text-white">Run Together. Grow Together. Inspire Together.</span>{' '}
              A free community relay — from villages to cities — where every step builds healthier bodies, stronger minds, and deeper bonds.
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
                <CalendarDays className="h-4 w-4 text-saffron-400" /> Season 2026 • Pan-India
              </span>
              <span className="inline-flex items-center gap-2 bg-white/8 backdrop-blur px-4 py-2 rounded-full border border-white/12">
                <MapPin className="h-4 w-4 text-leaf-400" /> 50 – 100+ km Relay
              </span>
            </motion.div>
          </div>

          {/* Right — floating card */}
          <div className="lg:col-span-5 relative">
            <motion.div initial={{ opacity: 0, scale: 0.9, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative rounded-[2rem] bg-white/8 backdrop-blur-xl border border-white/15 shadow-2xl p-5 overflow-hidden">
              <div className="absolute -top-12 -right-12 h-40 w-40 rounded-full bg-saffron-500/25 blur-3xl" />
              <div className="absolute -bottom-8 -left-8 h-32 w-32 rounded-full bg-leaf-500/20 blur-2xl" />

              <div className="relative h-52 sm:h-60 rounded-2xl overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1571008887538-b36bb32f4571?auto=format&fit=crop&w=900&q=75"
                  alt="Group of runners moving together"
                  className="absolute inset-0 h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="h-14 w-14 rounded-full bg-white/20 backdrop-blur border border-white/30 flex items-center justify-center hover:scale-110 transition cursor-pointer">
                    <Play className="h-6 w-6 text-white fill-white ml-0.5" />
                  </div>
                </div>
                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
                  <span className="text-xs font-semibold bg-black/50 backdrop-blur px-2.5 py-1 rounded-full text-white">🏃 Live from the route</span>
                  <span className="text-xs font-bold bg-saffron-500/90 px-2.5 py-1 rounded-full text-white">Season 2026</span>
                </div>
              </div>

              <div className="mt-4 grid grid-cols-3 gap-3 text-center">
                {[{ k: '25K+', v: 'Participants' }, { k: '100%', v: 'Free' }, { k: '28', v: 'States' }].map((s) => (
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
              <span className="text-xs font-semibold text-white">A movement for healthier India</span>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Marquee strip */}
      <div className="relative border-y border-white/10 bg-white/4 backdrop-blur overflow-hidden">
        <div className="flex animate-[marquee_30s_linear_infinite] whitespace-nowrap py-3 text-gray-300 font-semibold text-sm">
          {Array.from({ length: 2 }).map((_, k) => (
            <div key={k} className="flex shrink-0 items-center gap-10 px-6">
              {['🏃 Run Together','🌱 Grow Together','✨ Inspire Together','🤝 Community First','🇮🇳 Made for India','💚 Health for All','🏅 Free Participation','❤️ Strong Villages','🎽 Relay Race'].map((t, i) => (
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
