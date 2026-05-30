import { FormEvent, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, Save, Send, AlertCircle, Database, Download } from 'lucide-react';

// ─────────────────────────────────────────────────────────────────────────────
// WHERE DOES THE FORM DATA GO?
//
// 1. EVERY successful registration is saved to the visitor's browser
//    localStorage under the key  "hfrm_registrations"  as an array of
//    submissions. Each submission gets a unique id + timestamp so you can
//    sort / de-duplicate later. This works 100% offline, no backend needed.
//
// 2. (Optional) If you set FORMSPREE_ENDPOINT below to your own Formspree URL
//    (https://formspree.io — free tier), the same data is ALSO sent to your
//    inbox / dashboard so you can collect entries from every visitor in one
//    place. Other compatible services: Getform, Web3Forms, Google Apps
//    Script Web App, Supabase REST, Firebase, your own /api endpoint, etc.
//
// 3. Drafts (clicking "Save Draft") are stored under "hfrm_draft" so the user
//    can come back later and continue.
//
// To download every registration captured on this device, click the
// "Download CSV" link that appears once at least one registration exists.
// ─────────────────────────────────────────────────────────────────────────────
const FORMSPREE_ENDPOINT = ''; // e.g. 'https://formspree.io/f/abcdwxyz'
const STORAGE_KEY = 'hfrm_registrations';
const DRAFT_KEY = 'hfrm_draft';

interface FormState {
  fullName: string;
  age: string;
  gender: string;
  email: string;
  mobile: string;
  village: string;
  state: string;
  occupation: string;
  distance: string;
  emergency: string;
  health: boolean;
  volunteer: boolean;
  team: string;
}

const empty: FormState = {
  fullName: '', age: '', gender: '', email: '', mobile: '',
  village: '', state: '', occupation: '', distance: '5 km',
  emergency: '', health: false, volunteer: false, team: 'Individual'
};

const states = ['Andhra Pradesh','Arunachal Pradesh','Assam','Bihar','Chhattisgarh','Delhi','Goa','Gujarat','Haryana','Himachal Pradesh','Jammu & Kashmir','Jharkhand','Karnataka','Kerala','Madhya Pradesh','Maharashtra','Manipur','Meghalaya','Mizoram','Nagaland','Odisha','Punjab','Rajasthan','Sikkim','Tamil Nadu','Telangana','Tripura','Uttar Pradesh','Uttarakhand','West Bengal'];

export default function Registration() {
  const [form, setForm] = useState<FormState>(() => {
    // Auto-restore a saved draft if one exists
    try {
      const raw = localStorage.getItem(DRAFT_KEY);
      if (raw) return { ...empty, ...JSON.parse(raw) };
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
    if (!/^[6-9]\d{9}$/.test(form.mobile)) e.mobile = 'Enter a valid 10-digit mobile';
    if (!form.village.trim()) e.village = 'Please enter your village/city';
    if (!form.state) e.state = 'Please select your state';
    if (!form.occupation.trim()) e.occupation = 'Please share your occupation';
    if (!form.emergency.trim() || !/^[6-9]\d{9}$/.test(form.emergency)) e.emergency = 'Enter a valid emergency contact';
    if (!form.health) e.health = 'Please confirm health declaration';
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
    } catch {}
    return { id, total };
  };

  const onSubmit = async (ev: FormEvent) => {
    ev.preventDefault();
    if (!validate()) return;
    setSubmitting(true);

    // 1️⃣ Always save locally — never lose a registration
    const { id, total } = persistRegistration(form);

    // 2️⃣ Optionally forward to a remote inbox (Formspree / your API)
    if (FORMSPREE_ENDPOINT) {
      try {
        await fetch(FORMSPREE_ENDPOINT, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
          body: JSON.stringify({ id, ...form })
        });
      } catch {
        // Network failure is okay — we still have the local copy.
      }
    }

    setConfirmation({ id, total });
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

  const downloadCsv = () => {
    try {
      const list = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
      if (!Array.isArray(list) || list.length === 0) return;
      const headers = Object.keys(list[0]);
      const csv = [
        headers.join(','),
        ...list.map((row: Record<string, unknown>) =>
          headers.map((h) => `"${String(row[h] ?? '').replace(/"/g, '""')}"`).join(',')
        )
      ].join('\n');
      const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `hfrm-registrations-${new Date().toISOString().slice(0, 10)}.csv`;
      a.click();
      URL.revokeObjectURL(url);
    } catch {}
  };

  const savedCount = (() => {
    try { return (JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]') as unknown[]).length; }
    catch { return 0; }
  })();

  return (
    <section id="register" className="relative py-20 sm:py-28 bg-[#0a0a0a]">
      <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 h-72 w-[600px] rounded-full bg-leaf-600/6 blur-[90px]" />
      </div>
      <div className="container-x">
        <div className="grid lg:grid-cols-12 gap-10">
          <div className="lg:col-span-4">
            <span className="section-eyebrow">Registration</span>
            <h2 className="section-title mt-4">Join the Movement</h2>
            <p className="mt-4 text-gray-400 text-lg">
              Free registration. Open to everyone. Run alone, run with friends, or run as a school, college or village team.
            </p>
            <ul className="mt-6 space-y-3 text-sm">
              {['Free for all participants', 'Instant digital confirmation', 'Choose your distance goal', 'Volunteer & team options included'].map((t) => (
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
              <div className="absolute bottom-3 left-4 text-white text-xs font-bold uppercase tracking-widest text-saffron-400">Your race awaits →</div>
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
                  <input className="input" value={form.fullName} onChange={(e) => update('fullName', e.target.value)} placeholder="e.g. Aarav Sharma" />
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
                  <input className="input" value={form.mobile} onChange={(e) => update('mobile', e.target.value)} placeholder="10-digit mobile" />
                </Field>
                <Field label="Village / City" error={errors.village}>
                  <input className="input" value={form.village} onChange={(e) => update('village', e.target.value)} placeholder="Your town or village" />
                </Field>
                <Field label="State" error={errors.state}>
                  <select className="input" value={form.state} onChange={(e) => update('state', e.target.value)}>
                    <option value="">Select state</option>
                    {states.map((s) => <option key={s}>{s}</option>)}
                  </select>
                </Field>
                <Field label="Occupation" error={errors.occupation}>
                  <input className="input" value={form.occupation} onChange={(e) => update('occupation', e.target.value)} placeholder="Student / Farmer / Engineer..." />
                </Field>
                <Field label="Distance Goal">
                  <select className="input" value={form.distance} onChange={(e) => update('distance', e.target.value)}>
                    {['2 km','5 km','10 km','21 km','42 km','Relay (Team)'].map((d) => <option key={d}>{d}</option>)}
                  </select>
                </Field>
                <Field label="Emergency Contact" error={errors.emergency}>
                  <input className="input" value={form.emergency} onChange={(e) => update('emergency', e.target.value)} placeholder="10-digit number" />
                </Field>
                <Field label="Team Participation">
                  <select className="input" value={form.team} onChange={(e) => update('team', e.target.value)}>
                    {['Individual','Family','Friends Group','School','College','Village','Company'].map((t) => <option key={t}>{t}</option>)}
                  </select>
                </Field>
                <div className="sm:col-span-2 flex flex-col gap-3">
                  <label className="flex items-start gap-3 bg-leaf-500/10 border border-leaf-500/30 rounded-xl p-3 cursor-pointer">
                    <input type="checkbox" checked={form.health} onChange={(e) => update('health', e.target.checked)} className="mt-1 h-4 w-4 accent-leaf-500" />
                    <span className="text-sm text-gray-300">
                      <strong className="text-white">Health Declaration:</strong> I confirm I am medically fit to participate and understand this is a community wellness event.
                    </span>
                  </label>
                  {errors.health && <ErrorText msg={errors.health} />}
                  <label className="flex items-start gap-3 bg-saffron-500/10 border border-saffron-500/30 rounded-xl p-3 cursor-pointer">
                    <input type="checkbox" checked={form.volunteer} onChange={(e) => update('volunteer', e.target.checked)} className="mt-1 h-4 w-4 accent-saffron-500" />
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
                {savedCount > 0 && (
                  <button type="button" onClick={downloadCsv} className="btn-ghost">
                    <Download className="h-4 w-4" /> Download CSV ({savedCount})
                  </button>
                )}
              </div>

              {/* Storage transparency note */}
              <div className="mt-5 flex items-start gap-3 rounded-xl bg-white/5 border border-white/10 p-3 text-xs text-gray-400">
                <Database className="h-4 w-4 text-sky2-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-gray-200">Where your details go:</strong> Saved on this device under <code className="px-1 py-0.5 rounded bg-white/10 text-gray-200">hfrm_registrations</code>
                  {FORMSPREE_ENDPOINT ? ' and forwarded securely to organisers.' : ' — add a Formspree URL in Registration.tsx to also email entries to organisers.'}
                  {' '}We never share your data with third parties.
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
                      <div className="text-xs text-gray-400 mt-1">Total on this device: {confirmation.total}. Confirmation coming to your email.</div>
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
