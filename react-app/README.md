# Zenith React migration workspace

This isolated Vite + React application is the first migration slice. The existing production site remains untouched while routes are migrated and verified.

## Run locally

```bash
cd react-app
npm install
npm run dev
npm run build
```

## Migration contract

- Keep the existing public URLs and page content.
- Preserve the current Vercel enquiry endpoint and its validation/security behavior.
- Move shared navigation, footer, layout and repeated UI into reusable React components.
- Migrate each existing HTML route before switching the production build.
- Preserve page metadata, canonical URLs, structured data, sitemap and robots directives.
- Keep the original static site available until route parity and production smoke tests pass.

The homepage is the first React implementation slice. Remaining routes are intentionally not represented by placeholder content in production; they must be migrated before cutover.
