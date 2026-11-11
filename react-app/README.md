# Zenith Softworks — React application

This directory contains the rebuilt single-page website, implemented with React 19 and Vite.

## Development

```bash
npm install
npm run dev
```

## Production verification

```bash
npm run test:routes
npm run build
npm run preview
```

The build copies preserved files from the repository-level `/assets` directory into Vite's public output. The retained visual assets are the original Zenith brand mark, full logo artwork and original navbar graphic; the repository did not contain project screenshots.

The contact form submits to the existing Vercel function at `/api/enquiry`. Email delivery requires the Resend environment variables documented in the repository README. If delivery is not configured, the UI opens a prepared email draft instead of claiming the enquiry was sent.
