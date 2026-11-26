import { mkdir, readFile, writeFile } from "node:fs/promises";
import { dirname, join, resolve } from "node:path";
import React from "react";
import { renderToString } from "react-dom/server";
import { MemoryRouter } from "react-router";
import { createServer } from "vite";
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

let App;
let vite;
try {
  vite = await createServer({ configFile: "./vite.config.js", server: { middlewareMode: true }, appType: "custom", ssr: { noExternal: ["react-router", "react-router-dom"] } });
  ({ default: App } = await vite.ssrLoadModule("/src/App.jsx"));
} catch (error) {
  console.warn("React static rendering could not be initialised; metadata-only HTML shells will be generated.", error);
}

for (const [route, meta] of Object.entries(ROUTES_META)) {
  let html = baseHtml.replace(/<title>[\s\S]*?<\/title>/i, `<title>${escapeAttr(meta.title)}</title>`);
  html = html.replace(/<meta\s+name="description"[\s\S]*?\/>/i, `<meta name="description" content="${escapeAttr(meta.description)}" />`);

  const headInject = [
    `<link rel="canonical" href="${escapeAttr(meta.canonical)}" />`,
    `<meta property="og:title" content="${escapeAttr(meta.ogTitle || meta.title)}" />`,
    `<meta property="og:description" content="${escapeAttr(meta.ogDescription || meta.description)}" />`,
    `<meta property="og:type" content="website" />`,
    `<meta property="og:url" content="${escapeAttr(meta.canonical)}" />`,
    `<meta property="og:site_name" content="Zenith Softworks" />`,
    `<meta name="twitter:title" content="${escapeAttr(meta.ogTitle || meta.title)}" />`,
    `<meta name="twitter:description" content="${escapeAttr(meta.ogDescription || meta.description)}" />`,
    meta.robots ? `<meta name="robots" content="${escapeAttr(meta.robots)}" />` : "",
  ].join("");

  html = html.replace("</head>", `${headInject}</head>`);

  if (App && !["/insights/", "/services/"].includes(route)) {
    try {
      const markup = renderToString(
        React.createElement(MemoryRouter, { initialEntries: [route] }, React.createElement(App)),
      );
      html = html.replace('<div id="root"></div>', `<div id="root">${markup}</div>`);
    } catch (error) {
      console.warn(`Static content rendering skipped for ${route}; metadata shell retained.`, error.message);
    }
  }

  const relative = route === "/" ? "index.html" : `${route.replace(/^\/+|\/+$/g, "")}/index.html`;
  const target = join(dist, relative);
  await mkdir(dirname(target), { recursive: true });
  await writeFile(target, html, "utf8");
}

if (vite) await vite.close();
console.log(`Generated SEO HTML for ${Object.keys(ROUTES_META).length} routes (static page content where server rendering succeeds).`);
