# Zenith Softworks

Zenith Softworks is an independent software development studio based in Kollam, Kerala. This repository contains the React + Vite single-page website and the Vercel serverless enquiry endpoint.

## Local development

```bash
cd react-app
npm install
npm run dev
```

For a production build:

```bash
npm run test:routes
npm run build
npm run preview
```

The Vite build copies the preserved brand assets from `/assets` into the public output. The original Zenith mark, full logo artwork and navbar graphic are retained.

## Enquiry delivery

The contact form posts to `/api/enquiry`. Configure these Vercel environment variables to enable email delivery:

- `RESEND_API_KEY`
- `FROM_EMAIL`
- `NOTIFY_EMAIL`
- `SITE_URL` (canonical production origin)

Without those settings, the endpoint returns an explicit configuration error and the form opens a pre-filled email draft. It never reports an undelivered message as sent.

## Portfolio accuracy

The portfolio distinguishes independent projects, concepts and research prototypes. It does not claim paid client relationships, customer counts, awards or performance metrics that have not been verified.
