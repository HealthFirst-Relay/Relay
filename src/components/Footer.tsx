import { Activity, Facebook, Instagram, Linkedin, Mail, MapPin, Phone, Twitter, Youtube } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="relative mt-10 bg-gradient-to-b from-leaf-900 to-earth-900 text-white overflow-hidden">
      {/* Decorative top wave */}
      <svg className="absolute top-0 inset-x-0 -translate-y-px" viewBox="0 0 1440 60" preserveAspectRatio="none" aria-hidden>
        <path d="M0,40 C240,0 480,80 720,40 C960,0 1200,80 1440,40 L1440,0 L0,0 Z" fill="#0a0a0a" />
      </svg>

      <div className="container-x relative pt-20 pb-10">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10">
          <div>
            <div className="flex items-center gap-2">
              <span className="h-10 w-10 rounded-full bg-gradient-to-br from-saffron-500 to-leaf-500 flex items-center justify-center shadow-lg">
                <Activity className="h-5 w-5" />
              </span>
              <div className="font-display font-extrabold leading-tight text-lg sm:text-xl">
                Health First
                <div className="text-xs sm:text-sm font-semibold uppercase tracking-[0.16em] text-leaf-200">
                  Relay Marathon India
                </div>
              </div>
            </div>
            <p className="mt-4 text-base text-white/85 leading-relaxed">
              A free, all-inclusive relay marathon connecting India through health, fitness, inspiration and community.
              Run Together. Grow Together. Inspire Together.
            </p>
            <div className="mt-5 flex gap-2">
              {[Facebook, Instagram, Twitter, Linkedin, Youtube].map((Ic, i) => (
                <a key={i} href="#" aria-label="social" className="h-10 w-10 inline-flex items-center justify-center rounded-full bg-white/10 hover:bg-saffron-500 transition">
                  <Ic className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-bold uppercase tracking-wider text-base text-leaf-200">Explore</h4>
            <ul className="mt-4 space-y-2 text-base text-white/85">
              {[
                ['About', '#about'],
                ['Benefits', '#benefits'],
                ['Inspiration', '#inspiration'],
                ['Rewards', '#rewards'],
                ['Timeline', '#timeline'],
                ['FAQ', '#faq']
              ].map(([l, h]) => (
                <li key={l}><a href={h} className="hover:text-saffron-300 transition">{l}</a></li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-bold uppercase tracking-wider text-base text-leaf-200">Get Involved</h4>
            <ul className="mt-4 space-y-2 text-base text-white/85">
              <li><a href="#register" className="hover:text-saffron-300 transition">Register Now</a></li>
              <li><a href="#feedback" className="hover:text-saffron-300 transition">Volunteer Sign-Up</a></li>
              <li><a href="#feedback" className="hover:text-saffron-300 transition">Share an Idea</a></li>
              <li><a href="#stories" className="hover:text-saffron-300 transition">Community Stories</a></li>
              <li><a href="#" className="hover:text-saffron-300 transition">Privacy Policy</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold uppercase tracking-wider text-base text-leaf-200">Contact</h4>
            <ul className="mt-4 space-y-3 text-base text-white/85">
              <li className="flex items-start gap-3"><MapPin className="h-5 w-5 mt-0.5 text-saffron-300" /> Pan-India • Headquartered in Bengaluru</li>
              <li className="flex items-start gap-3"><Mail className="h-5 w-5 mt-0.5 text-saffron-300" /> hello@healthfirstrelay.in</li>
              <li className="flex items-start gap-3"><Phone className="h-5 w-5 mt-0.5 text-saffron-300" /> +91 90000 00000</li>
            </ul>
            <p className="mt-5 text-sm text-white/75 italic">
              Mission: To build a healthier, kinder, more connected India — one step at a time.
            </p>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3 text-sm text-white/75">
          <div>© {new Date().getFullYear()} Health First Relay Marathon India. Made with 💚 across India.</div>
          <div className="flex gap-4">
            <a href="#" className="hover:text-white">Privacy</a>
            <a href="#" className="hover:text-white">Terms</a>
            <a href="#" className="hover:text-white">Code of Conduct</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

