# Health First Relay Marathon

A modern, mobile-friendly, highly interactive website for **Health First Relay Marathon** — a free community relay marathon promoting health, fitness, inspiration and community.

> **Run Together. Grow Together. Inspire Together.**

## ✨ Tech Stack

- **React 18** + **TypeScript**
- **Vite** for blazing-fast dev/build
- **Tailwind CSS** with a custom warm countryside theme
- **Framer Motion** for scroll & micro-animations
- **lucide-react** icons
- Fully responsive, accessible, SEO-friendly

## 🚀 Run Locally

```bash
npm install
npm run dev
```

The site will launch at **http://localhost:5173**

To build for production:

```bash
npm run build
npm run preview
```

## Form Collection

Registration and feedback submissions are backed up in the visitor's browser and can also be sent to a public form endpoint.

1. Create a Google Sheet.
2. Open Extensions > Apps Script.
3. Paste `docs/google-apps-script.js`.
4. Deploy as a Web App with access set to "Anyone".
5. Add the Web App URL as `VITE_SUBMISSION_ENDPOINT` in your GitHub Pages build environment.

No private API keys should be placed in React, `.env`, or GitHub Pages source. The browser endpoint must be safe to expose publicly.

## Public Launch Checklist

- Use HTTPS on GitHub Pages and your custom domain.
- Add your custom domain as `public/CNAME` when the exact domain is ready.
- Keep email, Sheets, and other private credentials inside the form provider or Apps Script only.
- Review the form fields before launch because registrations include personal contact information.

## 🧭 Sections

1. **Hero** — countryside SVG scene, animated runners, CTAs
2. **About the Event** — animated statistics counters
3. **Benefits** — Health, Mental Wellness, Community, Youth, Social Impact
4. **Inspiration** — interactive profile cards (engineers, doctors, teachers…)
5. **Rewards** — certificates, medals, party, recognition
6. **Organizers** — team grid with mission statements
7. **Timeline** — interactive event journey
8. **Community Stories** — rotating testimonial carousel
9. **Registration** — full form with validation + draft saving
10. **Feedback & Ideas** — star ratings + idea submission
11. **FAQ** — accessible accordion
12. **Footer** — social, contact, mission

## 🎨 Theme

A warm, hopeful community palette: saffron, leaf-green, earth tones and soft sky — designed to feel inspiring, family-friendly and movement-driven.

## ♿ Accessibility & Performance

- Reduced-motion support
- Semantic HTML, ARIA labels
- Keyboard-friendly navigation
- Lazy scroll-triggered animations
- Optimised fonts & icons

---

Made for healthier, kinder, more connected communities.

