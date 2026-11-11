import { mkdir, readFile, writeFile } from "node:fs/promises";
import { dirname, join, resolve } from "node:path";
import { ROUTES_META } from "../src/data/routesMeta.js";

const dist = resolve(process.cwd(), "dist");
const baseHtml = await readFile(join(dist, "index.html"), "utf8");

function escapeAttr(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll('"', "&quot;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");
}

for (const [route, meta] of Object.entries(ROUTES_META)) {
  let html = baseHtml.replace(
    /<title>[\s\S]*?<\/title>/i,
    `<title>${escapeAttr(meta.title)}</title>`,
  );
  html = html.replace(
    /<meta\s+name="description"[\s\S]*?\/>/i,
    `<meta name="description" content="${escapeAttr(meta.description)}" />`,
  );

  const headInject =
    `<link rel="canonical" href="${escapeAttr(meta.canonical)}" />` +
    `<meta property="og:title" content="${escapeAttr(meta.ogTitle || meta.title)}" />` +
    `<meta property="og:description" content="${escapeAttr(meta.ogDescription || meta.description)}" />` +
    `<meta property="og:type" content="website" />` +
    `<meta property="og:url" content="${escapeAttr(meta.canonical)}" />`;

  html = html.replace("</head>", `${headInject}</head>`);

  const relative =
    route === "/" ? "index.html" : `${route.replace(/^\/+|\/+$/g, "")}/index.html`;
  const target = join(dist, relative);
  await mkdir(dirname(target), { recursive: true });
  await writeFile(target, html, "utf8");
}

console.log(`Generated SEO HTML shells for ${Object.keys(ROUTES_META).length} React routes.`);
