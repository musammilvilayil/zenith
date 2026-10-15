# Zenith Softworks

Static marketing site with a protected serverless enquiry endpoint. Contact and Talent forms post to `/api/enquiry`; on a delivery failure, the browser offers a pre-filled WhatsApp fallback to **+91 94976 65504**.

## Before production

1. Buy `zenithsoftworks.in` only after choosing and approving a registrar and its final checkout price.
2. Use **Cloudflare Pages + Workers** for this commercial site if a free tier is required. Vercel's Hobby terms allow only personal, non-commercial use. Cloudflare's free tier supports static assets and limited Worker/Pages Function requests; its email-sending product needs a paid Workers plan for arbitrary-recipient email. This repository's `api/enquiry.js` is a Vercel function, so do not switch hosting until the endpoint is ported to a Pages Function/Worker.
3. For the current Vercel deployment, create the three environment variables listed in `.env.example` in Production, Preview and Development. Verify the sending domain in Resend before setting `FROM_EMAIL`.
4. Set `SITE_URL` to the actual canonical production origin. During the Vercel preview phase it may be the `https://zenith-softworks.vercel.app` URL; after the domain works, change it to `https://zenithsoftworks.in` and redeploy.
5. Add the domain in the hosting dashboard, then copy its exact DNS records to the registrar. Confirm both the root domain and `www` redirect before changing canonical URLs or submitting the sitemap to Search Console.
6. Submit one real test from `/contact/` and `/talent/`, confirm the emails arrive and reply-to works, then check mobile navigation and WhatsApp on a real phone.

## Local preview

`npx vercel dev` runs the static site and `/api/enquiry` locally. A plain static server cannot run the API route.

## Protection included

Server-side required-field, email, phone and URL validation; field length limits; HTML escaping in emails; same-origin checks; JSON-only payloads; a hidden honeypot; completion-time heuristic; no-store responses; and per-instance rate limiting. For higher-volume traffic, move rate limits to Cloudflare WAF/Turnstile or a shared store—serverless in-memory limits are intentionally only a first line of defence.
