import { CalendarDays, CheckCircle2, MapPin, ShieldCheck, UsersRound } from 'lucide-react';

const basics = [
  { icon: CalendarDays, label: 'Date', value: 'Coming Soon' },
  { icon: MapPin, label: 'Route', value: 'First Community Route' },
  { icon: UsersRound, label: 'Format', value: 'Run, walk, or volunteer' },
  { icon: CheckCircle2, label: 'Cost', value: 'Free registration' },
];

const steps = [
  'Register your interest for the inaugural relay.',
  'Choose a comfortable 1-100 km distance goal.',
  'Receive route updates and next steps from the volunteer team.',
];

export default function EventBasics() {
  return (
    <section id="details" className="relative py-16 sm:py-20 bg-[#10130f]">
      <div className="container-x">
        <div className="grid lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-5">
            <span className="section-eyebrow">First Edition</span>
            <h2 className="section-title mt-4">Built by volunteers, for the community</h2>
            <p className="mt-4 text-gray-300 text-lg leading-relaxed">
              This is the first Health First Relay. The route, date, and volunteer team are being shaped with early participants, so registration is a simple interest form for updates and planning.
            </p>
          </div>

          <div className="lg:col-span-7 grid sm:grid-cols-2 gap-4">
            {basics.map((item) => (
              <div key={item.label} className="card p-5">
                <item.icon className="h-6 w-6 text-leaf-400" />
                <div className="mt-3 text-xs font-bold uppercase tracking-[0.18em] text-gray-500">{item.label}</div>
                <div className="mt-1 text-xl font-bold text-white">{item.value}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-8 grid lg:grid-cols-2 gap-4">
          <div className="card p-6">
            <h3 className="text-xl font-bold text-white">How it works</h3>
            <ol className="mt-4 space-y-3 text-gray-300">
              {steps.map((step, index) => (
                <li key={step} className="flex gap-3">
                  <span className="mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-leaf-600 text-sm font-bold text-white">
                    {index + 1}
                  </span>
                  <span>{step}</span>
                </li>
              ))}
            </ol>
          </div>

          <div className="card p-6">
            <div className="flex items-center gap-3">
              <ShieldCheck className="h-6 w-6 text-saffron-400" />
              <h3 className="text-xl font-bold text-white">What happens after registration</h3>
            </div>
            <p className="mt-4 text-gray-300 leading-relaxed">
              You receive a confirmation email, and the team may contact you with route, date, safety, and volunteer updates. Your contact details are used only for this event.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
