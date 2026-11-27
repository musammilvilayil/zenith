# Zenith Softworks

Native **React 19 + Vite 6 + Tailwind CSS v4** application for [zenithsoftworks.in](https://zenithsoftworks.in), with all 26 routes rendered natively in JSX, bundled image assets, and interactive canvas visual layers.

## Stack & Features

- **Native React Router (`src/App.jsx`):** All 26 public routes (`/`, `/services/`, `/work/`, `/about/`, `/solutions/`, `/talent/`, `/student-projects/`, `/student-projects/sustainability/`, `/academic-services/`, `/insights/`, `/contact/`, `/privacy/`, `/terms/`, plus service, case-study, and insight detail pages).
- **Design system (light mode):** paper/white sections with dark "stage" accents and a single blue accent; Archivo + Inter Tight. Home layouts: centred hero, media/text split, timeline, scroll-pinned showcase (`src/components/ui/PinnedShowcase.jsx`), hover rows, tall cards, wave footer. Tokens live in `src/styles/global.css` and `src/styles/zenith-redesign.css`.
- **Brand assets:** `src/assets/images/zenith-logo.webp`, `zenith-mark.webp`; favicons, `apple-touch-icon.png` and the 1200×630 `og-zenith.png` are in `public/`.
- **Docs:** `docs/UI-AUDIT.md` (audit + redesign notes) and `docs/SEO-STRATEGY.md` (keyword plan, schema, blog and off-page plan).
- **Enquiry API (`api/enquiry.js`):** Preserved Vercel serverless endpoint with honeypot, validation, and WhatsApp fallback.

## Local Development

```bash
npm install
npm run dev
```

## Validation & Production Build

```bash
npm run test:routes
npm run build
```
