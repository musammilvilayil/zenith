# Zenith Softworks – UI Audit & Redesign Notes

Audit of the previous site (light "editorial" theme) and what the redesign changed.

## 1. Findings (before)

| # | Area | Finding | Severity |
|---|------|---------|----------|
| 1 | Brand | Logo was a hand-drawn SVG approximation; header/footer used CSS filters (`brightness`, `invert`) on it, so colours drifted from the real brand. | High |
| 2 | Brand | Light paper (#f0f1ed) site did not match the dark, glowing blue brand mark; hero, cards and CTA each used a different blue. | High |
| 3 | CSS architecture | `zenith-redesign.css` was a minified layer of overrides fighting `global.css` (dark tokens) – ~40 `!important` "contrast repair" rules to flip text colours. Fragile and hard to extend. | High |
| 4 | Performance | Hero + 8 section photos were hot-linked from Unsplash (third-party requests, no control over weight, LCP risk); two preload hints pointed at them. | High |
| 5 | Performance | Case-study JPGs are 520–720 KB each. | Medium |
| 6 | Accessibility | Body copy at 9–12px in mono caps (`.zn-overline`, `.zn-cap-meta`, `.zn-hero-index` at 6–9px on mobile). Many contrast patches needed. | High |
| 7 | Accessibility | Hero decorative "Z." glyph and footer "DESIGNED WITH INTENTION" were noise; no visible focus style on custom buttons. | Medium |
| 8 | UX | Header CTA and mobile menu fine, but nav labels (Business / Work / Insights) were tiny (12px) with low contrast. | Medium |
| 9 | UX | Homepage had no path to the city landing pages (Kollam/Kochi/Trivandrum/Calicut) and no proof-of-process section above the fold. | Medium |
| 10 | SEO/Share | OG image was an SVG (not supported by Facebook, WhatsApp, LinkedIn); `twitter:card` was `summary` in client code. | High |
| 11 | SEO | Favicon was SVG only; no apple-touch-icon / `.ico`. | Low |
| 12 | Content | Homepage intro was ~140 words in one block; weak H2 hierarchy. | Medium |

## 2. What changed

* **Logo** – replaced with the supplied "Z / ZENITH SOFTWORKS" artwork. Black background was converted to true transparency, so it sits on the dark UI without a box. Assets: `zenith-logo.webp` (lock-up), `zenith-mark.webp` (Z), favicons, `apple-touch-icon.png`, `icon-512.png`, `og-zenith.png` (1200×630).
* **Design system "Zenith Glow"** – tokens derived from the logo: `#02050d` field, electric blue `#1f6bff` → sky `#35a8ff` → cyan `#19e0ff` gradient, white type. Manrope (display), DM Sans (body), Space Mono (labels only, ≥11px).
* **Components** – pill buttons with gradient primary + ghost secondary, glass header, cards with hover lift, FAQ accordions, process steps, city chips.
* **Homepage** – new hero (H1 + glowing Z mark), 116-word intro, business/student pathways, services, projects, process + principles, FAQ + city links, CTA band. No third-party images.
* **Inner pages** – the 50+ routes use shared `z-*` classes; the light overrides were deleted so they return to the dark system, with rounded cards/pill buttons layered on top.
* **Accessibility** – skip link kept, 44px targets, visible focus ring, `prefers-reduced-motion` respected, labels no longer below 11px.

## 3. Remaining recommendations

1. Compress case-study JPGs to WebP (~80 KB each).
2. Replace the numeric blog URLs (`/resources/1/`) with keyword slugs + 301s.
3. Add `/student-project-ideas/` to `sitemap.xml`.
4. Run Lighthouse on the deployed Vercel preview and fix any inner-page contrast regressions page by page.
