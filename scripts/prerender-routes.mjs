import { mkdir, readFile, writeFile } from "node:fs/promises";
import { dirname, join, resolve } from "node:path";
import React from "react";
import { renderToString } from "react-dom/server";
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

function setHeadTag(html, pattern, replacement) {
  const matches = [...html.matchAll(new RegExp(pattern.source, pattern.flags.includes("g") ? pattern.flags : pattern.flags + "g"))];
  if (!matches.length) return html.replace("</head>", `${replacement}</head>`);
  let output = html;
  for (let i = matches.length - 1; i >= 0; i -= 1) {
    const match = matches[i];
    output = output.slice(0, match.index) + (i === 0 ? replacement : "") + output.slice(match.index + match[0].length);
  }
  return output;
}

function setMeta(html, attribute, value) {
  const escaped = escapeAttr(value);
  const pattern = new RegExp(`<meta\\b(?=[^>]*\\b${attribute}=["'])[^>]*>`, "gi");
  return setHeadTag(html, pattern, `<meta ${attribute}="${escaped}" />`);
}

function setCanonical(html, href) {
  const pattern = /<link\b(?=[^>]*\brel=["']canonical["'])[^>]*>/gi;
  return setHeadTag(html, pattern, `<link rel="canonical" href="${escapeAttr(href)}" />`);
}

let StaticApp;
let vite;
try {
  vite = await createServer({ configFile: "./vite.config.js", server: { middlewareMode: true }, appType: "custom" });
  ({ default: StaticApp } = await vite.ssrLoadModule("/src/ssr.jsx"));
} catch (error) {
  console.warn("React static rendering could not be initialised; metadata-only HTML shells will be generated.", error);
}

for (const [route, meta] of Object.entries(ROUTES_META)) {
  let html = baseHtml.replace(/<title\b[^>]*>[\s\S]*?<\/title>/i, `<title>${escapeAttr(meta.title)}</title>`);

  html = setMeta(html, 'name="description"', meta.description);
  html = setMeta(html, 'name="robots"', meta.robots || "index,follow");
  html = setMeta(html, 'property="og:title"', meta.ogTitle || meta.title);
  html = setMeta(html, 'property="og:description"', meta.ogDescription || meta.description);
  html = setMeta(html, 'property="og:type"', "website");
  html = setMeta(html, 'property="og:site_name"', "Zenith Softworks");
  html = setMeta(html, 'property="og:url"', meta.canonical);
  html = setMeta(html, 'name="twitter:card"', "summary");
  html = setMeta(html, 'name="twitter:title"', meta.ogTitle || meta.title);
  html = setMeta(html, 'name="twitter:description"', meta.ogDescription || meta.description);
  html = setCanonical(html, meta.canonical);

  const pageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${meta.canonical}#webpage`,
    "url": meta.canonical,
    "name": meta.title,
    "description": meta.description,
    "isPartOf": { "@id": "https://zenithsoftworks.in/#website" },
    "about": { "@id": "https://zenithsoftworks.in/#organization" },
    "inLanguage": "en-IN"
  };
  const schemaTag = `<script type="application/ld+json">${JSON.stringify(pageSchema).replaceAll("<", "\\u003c")}</script>`;
  html = html.replace("</head>", `${schemaTag}</head>`);

  if (StaticApp && !["/insights/", "/services/"].includes(route)) {
    try {
      const markup = renderToString(React.createElement(StaticApp, { location: route }));
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
console.log(`Generated unique route metadata, canonical tags and WebPage structured data for ${Object.keys(ROUTES_META).length} routes.`);
