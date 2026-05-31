import { FormEvent, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, Save, Send, AlertCircle, Database } from 'lucide-react';
import { isRemoteSubmissionEnabled, submitToRemote } from '../lib/submissions';

const STORAGE_KEY = 'hfrm_registrations';
const DRAFT_KEY = 'hfrm_draft';

interface FormState {
  fullName: string;
  age: string;
  gender: string;
  email: string;
  mobile: string;
  village: string;
  occupation: string;
  distance: string;
  emergency: string;
  health: boolean;
  consent: boolean;
  volunteer: boolean;
  team: string;
}

const empty: FormState = {
  fullName: '', age: '', gender: '', email: '', mobile: '',
  village: '', occupation: '', distance: '5',
  emergency: '', health: false, consent: false, volunteer: false, team: 'Individual'
};

export default function Registration({ onRegistered }: { onRegistered?: (total: number) => void }) {
  const [form, setForm] = useState<FormState>(() => {
    // Auto-restore a saved draft if one exists
    try {
      const raw = localStorage.getItem(DRAFT_KEY);
      if (raw) {
        const draft = { ...empty, ...JSON.parse(raw) };
        draft.distance = String(draft.distance).replace(/[^\d]/g, '') || empty.distance;
        return draft;
      }
    } catch {}
    return empty;
  });
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});
  const [submitted, setSubmitted] = useState(false);
  const [drafted, setDrafted] = useState(false);
  const [confirmation, setConfirmation] = useState<{ id: string; total: number } | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const update = <K extends keyof FormState>(k: K, v: FormState[K]) => {
    setForm((f) => ({ ...f, [k]: v }));
    setErrors((e) => ({ ...e, [k]: undefined }));
  };

  const validate = () => {
    const e: typeof errors = {};
    if (!form.fullName.trim()) e.fullName = 'Please enter your full name';
    if (!form.age || +form.age < 4 || +form.age > 100) e.age = 'Enter a valid age (4–100)';
    if (!form.gender) e.gender = 'Please select gender';
    if (!/^\S+@\S+\.\S+$/.test(form.email)) e.email = 'Enter a valid email';
    if (!/^[+\d][\d\s().-]{7,19}$/.test(form.mobile)) e.mobile = 'Enter a valid phone number';
    if (!form.village.trim()) e.village = 'Please enter your village/city';
    if (!form.occupation.trim()) e.occupation = 'Please share your occupation';
    if (form.emergency.trim() && !/^[+\d][\d\s().-]{7,19}$/.test(form.emergency)) e.emergency = 'Enter a valid emergency contact';
    if (!form.health) e.health = 'Please confirm health declaration';
    if (!form.consent) e.consent = 'Please agree to be contacted about event updates';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const persistRegistration = (entry: FormState) => {
    // Generate a friendly unique ID like HFRM-2026-XXXXX
    const id = `HFRM-${new Date().getFullYear()}-${Math.random().toString(36).slice(2, 7).toUpperCase()}`;
    const record = { id, submittedAt: new Date().toISOString(), ...entry };
    let total = 1;
    try {
      const existing = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
      const list = Array.isArray(existing) ? existing : [];
      list.push(record);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
      total = list.length;
      window.dispatchEvent(new Event('hfrm:registration-saved'));
    } catch {}
    return { id, total };
  };

  const onSubmit = async (ev: FormEvent) => {
    ev.preventDefault();
    if (!validate()) return;
    setSubmitting(true);

    // 1️⃣ Always save locally — never lose a registration
    const { id, total } = persistRegistration(form);

    if (isRemoteSubmissionEnabled) {
      try {
        await submitToRemote({
          kind: 'registration',
          id,
          submittedAt: new Date().toISOString(),
          customerEmail: form.email,
          sendCustomerEmail: true,
          data: form,
        });
      } catch {
        // Network failure is okay because the visitor still gets a local receipt.
      }
    }

    setConfirmation({ id, total });
    onRegistered?.(total);
    setSubmitted(true);
    setDrafted(false);
    setSubmitting(false);
    try { localStorage.removeItem(DRAFT_KEY); } catch {}
    setTimeout(() => setSubmitted(false), 8000);
    setForm(empty);
  };

  const onSaveDraft = () => {
    try {
      localStorage.setItem(DRAFT_KEY, JSON.stringify(form));
      setDrafted(true);
      setTimeout(() => setDrafted(false), 3000);
    } catch {}
  };

  return (
    <section id="register" className="relative py-20 sm:py-28 bg-[#0a0a0a]">
      <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 h-72 w-[600px] rounded-full bg-leaf-600/6 blur-[90px]" />
      </div>
      <div className="container-x">
        <div className="grid lg:grid-cols-12 gap-10">
          <div className="lg:col-span-4">
            <span className="section-eyebrow">Registration</span>
            <h2 className="section-title mt-4">Be among the first participants</h2>
            <p className="mt-4 text-gray-400 text-lg">
              Free registration for the inaugural relay. The event date is coming soon, and registered participants will receive route and volunteer updates by email.
            </p>
            <ul className="mt-6 space-y-3 text-sm">
              {['No payment required', 'Confirmation email after submission', 'Choose a 1-100 km distance goal', 'Volunteer & team options included'].map((t) => (
                <li key={t} className="flex items-start gap-3 card p-3">
                  <CheckCircle2 className="h-5 w-5 text-leaf-400 shrink-0" />
                  <span className="text-gray-300">{t}</span>
                </li>
              ))}
            </ul>

            {/* Real photo */}
            <div className="mt-6 relative h-44 rounded-2xl overflow-hidden border border-white/10">
              <img
                src="https://images.unsplash.com/photo-1595435742656-5272d0b3fa82?auto=format&fit=crop&w=700&q=70"
                alt="Marathon runners crossing finish line"
                className="absolute inset-0 h-full w-full object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
              <div className="absolute bottom-3 left-4 text-white text-xs font-bold uppercase tracking-widest text-saffron-400">First route coming soon</div>
            </div>
          </div>

          <div className="lg:col-span-8">
            <motion.form
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              onSubmit={onSubmit}
              noValidate
              className="card p-6 sm:p-8 relative"
            >
              <div className="grid sm:grid-cols-2 gap-5">
                <Field label="Full Name" error={errors.fullName}>
                  <input className="input" value={form.fullName} onChange={(e) => update('fullName', e.target.value)} placeholder="e.g. Alex Morgan" />
                </Field>
                <Field label="Age" error={errors.age}>
                  <input type="number" className="input" value={form.age} onChange={(e) => update('age', e.target.value)} placeholder="e.g. 22" />
                </Field>
                <Field label="Gender" error={errors.gender}>
                  <select className="input" value={form.gender} onChange={(e) => update('gender', e.target.value)}>
                    <option value="">Select</option>
                    <option>Female</option><option>Male</option><option>Non-binary</option><option>Prefer not to say</option>
                  </select>
                </Field>
                <Field label="Email" error={errors.email}>
                  <input type="email" className="input" value={form.email} onChange={(e) => update('email', e.target.value)} placeholder="you@example.com" />
                </Field>
                <Field label="Mobile Number" error={errors.mobile}>
                  <input className="input" value={form.mobile} onChange={(e) => update('mobile', e.target.value)} placeholder="Phone number" />
                </Field>
                <Field label="Village / City" error={errors.village}>
                  <input className="input" value={form.village} onChange={(e) => update('village', e.target.value)} placeholder="Your town or village" />
                </Field>
                <Field label="Occupation" error={errors.occupation}>
                  <input className="input" value={form.occupation} onChange={(e) => update('occupation', e.target.value)} placeholder="Student / Farmer / Engineer..." />
                </Field>
                <Field label={`Distance Goal: ${form.distance} km`}>
                  <input
                    type="range"
                    min="1"
                    max="100"
                    step="1"
                    className="w-full accent-leaf-500"
                    value={form.distance}
                    onChange={(e) => update('distance', e.target.value)}
                  />
                  <div className="mt-2 flex justify-between text-xs text-gray-500">
                    <span>1 km</span>
                    <span>100 km</span>
                  </div>
                </Field>
                <Field label="Emergency Contact (optional)" error={errors.emergency}>
                  <input className="input" value={form.emergency} onChange={(e) => update('emergency', e.target.value)} placeholder="Emergency phone number" />
                </Field>
                <Field label="Team Participation">
                  <select className="input" value={form.team} onChange={(e) => update('team', e.target.value)}>
                    {['Individual','Family','Friends Group','School','College','Community Group','Company'].map((t) => <option key={t}>{t}</option>)}
                  </select>
                </Field>
                <div className="sm:col-span-2 flex flex-col gap-3">
                  <label className="flex items-start gap-3 bg-leaf-500/10 border border-leaf-500/30 rounded-xl p-3 cursor-pointer">
                    <input type="checkbox" checked={Boolean(form.health)} onChange={(e) => update('health', e.target.checked)} className="mt-1 h-4 w-4 accent-leaf-500" />
                    <span className="text-sm text-gray-300">
                      <strong className="text-white">Health Declaration:</strong> I confirm I am medically fit to participate and understand this is a community wellness event.
                    </span>
                  </label>
                  {errors.health && <ErrorText msg={errors.health} />}
                  <label className="flex items-start gap-3 bg-sky2-500/10 border border-sky2-500/30 rounded-xl p-3 cursor-pointer">
                    <input type="checkbox" checked={Boolean(form.consent)} onChange={(e) => update('consent', e.target.checked)} className="mt-1 h-4 w-4 accent-sky2-500" />
                    <span className="text-sm text-gray-300">
                      <strong className="text-white">Contact Consent:</strong> I agree to be contacted about event date, route, safety, and volunteer updates.
                    </span>
                  </label>
                  {errors.consent && <ErrorText msg={errors.consent} />}
                  <label className="flex items-start gap-3 bg-saffron-500/10 border border-saffron-500/30 rounded-xl p-3 cursor-pointer">
                    <input type="checkbox" checked={Boolean(form.volunteer)} onChange={(e) => update('volunteer', e.target.checked)} className="mt-1 h-4 w-4 accent-saffron-500" />
                    <span className="text-sm text-gray-300">
                      <strong className="text-white">Volunteer Interest:</strong> I would also like to help organise, support, or guide other runners.
                    </span>
                  </label>
                </div>
              </div>

              <div className="mt-7 flex flex-wrap gap-3">
                <button type="submit" disabled={submitting} className="btn-primary disabled:opacity-60 disabled:cursor-not-allowed">
                  <Send className="h-4 w-4" /> {submitting ? 'Submitting…' : 'Register Now'}
                </button>
                <button type="button" onClick={onSaveDraft} className="btn-ghost">
                  <Save className="h-4 w-4" /> Save Draft
                </button>
              </div>

              {/* Storage transparency note */}
              <div className="mt-5 flex items-start gap-3 rounded-xl bg-white/5 border border-white/10 p-3 text-xs text-gray-400">
                <Database className="h-4 w-4 text-sky2-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-gray-200">Where your details go:</strong> Saved on this device under <code className="px-1 py-0.5 rounded bg-white/10 text-gray-200">hfrm_registrations</code>
                  {isRemoteSubmissionEnabled ? ' and forwarded to the event team for planning updates.' : ' — add VITE_SUBMISSION_ENDPOINT to collect entries centrally and trigger confirmation email.'}
                  {' '}We use this only for event communication. Do not enter sensitive medical details here.
                </div>
              </div>

              <AnimatePresence>
                {submitted && confirmation && (
                  <motion.div
                    initial={{ opacity: 0, y: 20, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 20 }}
                    className="mt-6 flex items-start gap-3 rounded-2xl bg-leaf-500/15 border border-leaf-500/30 p-4"
                  >
                    <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-leaf-600 text-white shrink-0">
                      <CheckCircle2 className="h-5 w-5" />
                    </span>
                    <div>
                      <div className="font-bold text-white">You're in! 🎉</div>
                      <div className="text-sm text-gray-300">Your ID: <code className="px-1.5 py-0.5 rounded bg-white/10 font-bold text-white">{confirmation.id}</code></div>
                      <div className="text-xs text-gray-400 mt-1">Total on this device: {confirmation.total}.{isRemoteSubmissionEnabled ? ' Confirmation email requested.' : ' Online confirmation email is not connected yet.'}</div>
                    </div>
                  </motion.div>
                )}
                {drafted && !submitted && (
                  <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                    className="mt-6 text-sm text-gray-300 bg-white/5 border border-white/15 rounded-xl px-4 py-3">
                    Draft saved on this device.
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.form>
          </div>
        </div>
      </div>
    </section>
  );
}

function Field({ label, error, children }: { label: string; error?: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="label">{label}</label>
      {children}
      {error && <ErrorText msg={error} />}
    </div>
  );
}
function ErrorText({ msg }: { msg: string }) {
  return (
    <div className="mt-1.5 inline-flex items-center gap-1.5 text-xs font-semibold text-rose-600">
      <AlertCircle className="h-3.5 w-3.5" /> {msg}
    </div>
  );
}
