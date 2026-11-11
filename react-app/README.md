# Zenith React migration

The site now runs through a React 19 + Vite application with all 26 existing public routes mapped into the React runtime. A compatibility renderer preserves the original page markup, CSS, content, forms and metadata while routes move to reusable native React components in subsequent passes.

## Run locally

```bash
cd react-app
npm install
npm run dev
```

## Validation and production build

```bash
npm run test:routes
npm run build
```

The build copies the existing `/assets`, `robots.txt`, `sitemap.xml` and `404.html` files into Vite's public output, then prerenders each existing route with its original title, description, canonical URL, Open Graph metadata, structured data and content. The React bundle mounts on every route and adds the GhostFibers canvas to the homepage hero.

## Preserved integrations

- Existing public URLs and page content (26 functional routes).
- Existing `/api/enquiry` Vercel serverless function and its validation/security behavior.
- Existing page CSS, imagery, JavaScript interactions and contact/talent forms.
- Page metadata, canonical URLs, structured data, sitemap, robots and 404 page.
- Existing security response headers.

## Migration status

This is a compatibility migration, not a claim that every legacy section has already been rewritten as native JSX. It puts every route under the React runtime without dropping working content or SEO. Shared navigation, footer, forms and page sections can now be extracted into reusable React components incrementally. The PR remains draft until the preview is visually and functionally reviewed; production is not switched by this branch.
