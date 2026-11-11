# Zenith Softworks

Native **React 19 + Vite 6 + Tailwind CSS v4** application for [zenithsoftworks.in](https://zenithsoftworks.in), with all 26 routes rendered natively in JSX, bundled image assets, and interactive canvas visual layers.

## Stack & Features

- **Native React Router (`src/App.jsx`):** All 26 public routes (`/`, `/services/`, `/work/`, `/about/`, `/solutions/`, `/talent/`, `/student-projects/`, `/student-projects/sustainability/`, `/academic-services/`, `/insights/`, `/contact/`, `/privacy/`, `/terms/`, plus service, case-study, and insight detail pages).
- **Canvas Visual Components (`src/components/fx/`):**
  - `GhostFibers` (homepage hero)
  - `LuminousFilaments` (homepage story & page heroes)
  - `InterferenceRibbons` (homepage approach & CTA banners)
  - `VoxelArc` (Student Lab section)
- **Bundled Image Assets (`src/assets/images/`):** Original Zenith logos (`zenith-original-navbar.png`, `zenith-logo-footer.svg`, `zenith-mark.svg`) and custom generated section/case-study visuals (`hero-abstract.jpg`, `work-megham.jpg`, `work-carematrix.jpg`, `work-she-shield.jpg`, `work-projexify.jpg`, `student-lab.jpg`).
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
