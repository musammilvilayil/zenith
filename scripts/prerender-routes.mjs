import { mkdir, readdir, readFile, writeFile } from "node:fs/promises";
import { dirname, join, resolve } from "node:path";
import React from "react";
import { renderToString } from "react-dom/server";
import { createServer } from "vite";
import { ROUTES_META } from "../src/data/routesMeta.js";

const dist = resolve(process.cwd(), "dist");
const baseHtml = await readFile(join(dist, "index.html"), "utf8");
const fontFiles = (await readdir(join(dist, "assets"))).filter((f) => /^(archivo|inter-tight)-latin-wght-normal-.*\.woff2$/.test(f));
const fontPreloads = fontFiles.map((f) => `<link rel="preload" as="font" type="font/woff2" href="/assets/${f}" crossorigin />`).join("");
const manifest = JSON.parse(await readFile(join(dist, ".vite", "manifest.json"), "utf8"));

// The SSR pass (vite dev server) emits source paths such as /src/assets/images/x.webp.
// Map them to the hashed files produced by the production build so no 404s ship in static HTML.
function fixAssetUrls(markup) {
  return markup.replace(/\/src\/assets\/[^"'\s)]+/g, (match) => {
    const entry = manifest[match.slice(1).split("?")[0]];
    return entry ? `/${entry.file}` : match;
  });
}

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

function setMeta(html, key, attrValue, value) {
  const escaped = escapeAttr(value);
  const pattern = new RegExp(`<meta\\b(?=[^>]*\\b${key}=["']${attrValue}["'])[^>]*>`, "gi");
  return setHeadTag(html, pattern, `<meta ${key}="${attrValue}" content="${escaped}" />`);
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

  html = setMeta(html, "name", "description", meta.description);
  html = setMeta(html, "name", "robots", meta.robots || "index,follow");
  html = setMeta(html, "property", "og:title", meta.ogTitle || meta.title);
  html = setMeta(html, "property", "og:description", meta.ogDescription || meta.description);
  html = setMeta(html, "property", "og:type", "website");
  html = setMeta(html, "property", "og:site_name", "Zenith Softworks");
  html = setMeta(html, "property", "og:url", meta.canonical);
  html = setMeta(html, "property", "og:image", "https://zenithsoftworks.in/og-zenith.png");
  html = setMeta(html, "name", "twitter:card", "summary_large_image");
  html = setMeta(html, "name", "twitter:image", "https://zenithsoftworks.in/og-zenith.png");
  html = setMeta(html, "name", "twitter:title", meta.ogTitle || meta.title);
  html = setMeta(html, "name", "twitter:description", meta.ogDescription || meta.description);
  html = setCanonical(html, meta.canonical);
  html = html.replace("</head>", `${fontPreloads}</head>`);

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
  const schemaGraph = [pageSchema];
  if (route !== "/") {
    const segments = route.split("/").filter(Boolean);
    const breadcrumbItems = [{ name: "Home", item: "https://zenithsoftworks.in/" }];
    let currentPath = "";
    for (const segment of segments) {
      currentPath += `/${segment}`;
      const segmentRoute = `${currentPath}/`;
      const segmentMeta = ROUTES_META[segmentRoute];
      breadcrumbItems.push({
        name: segmentMeta?.ogTitle || segmentMeta?.title || segment.replaceAll("-", " "),
        item: `https://zenithsoftworks.in${segmentRoute}`
      });
    }
    schemaGraph.push({
      "@type": "BreadcrumbList",
      "@id": `${meta.canonical}#breadcrumb`,
      "itemListElement": breadcrumbItems.map((item, index) => ({
        "@type": "ListItem",
        "position": index + 1,
        "name": item.name,
        "item": item.item
      }))
    });
  }
  if ((route.startsWith("/business/") && route.split("/").filter(Boolean).length > 1) || route.startsWith("/website-development-company-") || route.startsWith("/software-development-company-")) {
    schemaGraph.push({
      "@type": "Service",
      "@id": `${meta.canonical}#service`,
      "name": meta.ogTitle || meta.title,
      "description": meta.description,
      "url": meta.canonical,
      "provider": { "@id": "https://zenithsoftworks.in/#organization" },
      "areaServed": { "@type": "Country", "name": "India" }
    });
  }

  const faqByRoute = {
    "/business/website-development/": [
      ["How much does a business website cost?", "Pricing is custom and depends on the number of pages, design requirements, content, integrations and functionality. We provide a quotation after discussing the scope."],
      ["Can you redesign an existing website?", "Yes. We can review an existing website and discuss improvements to its structure, design, responsiveness and performance."],
      ["Do you work outside Kerala?", "Yes. Projects can be delivered remotely across India. In-person discussions can be arranged within Kerala where feasible."],
      ["Will the website be mobile-friendly?", "Responsive layouts are included so the website can adapt to common mobile, tablet and desktop screen sizes."],
      ["Will you help with domain and hosting?", "Domain, hosting and deployment requirements can be reviewed and included in the agreed project scope."]
    ],
    "/business/ecommerce-development/": [
      ["Can you integrate online payments?", "Payment gateway integration can be included after confirming the provider, account requirements and checkout workflow."],
      ["Can I manage products myself?", "An admin interface for managing products and orders can be included in the agreed scope."],
      ["How is e-commerce pricing decided?", "Pricing depends on catalogue size, integrations, design, checkout requirements and operational features."],
      ["Can you add delivery and order tracking?", "Shipping workflows and order status features can be included after confirming the courier or logistics provider and required integrations."],
      ["Can the store be managed through an admin panel?", "Product, inventory and order management features can be included based on the agreed administrative requirements."]
    ],
    "/business/custom-software-development/": [
      ["Can you build software based on our existing process?", "Yes. We begin by understanding the current workflow, users and business rules before proposing a scope."],
      ["Can the application be expanded later?", "The architecture and delivery plan can account for expected future requirements, subject to scope and budget."],
      ["Do you provide maintenance?", "Post-launch support and maintenance can be discussed and included as a separate agreed arrangement."],
      ["Can you integrate third-party APIs?", "API integrations can be included after reviewing the provider documentation, authentication requirements and intended data flow."],
      ["Will the software work on mobile devices?", "Web applications can be designed responsively where the user workflows require mobile and tablet access."]
    ],
    "/business/website-redesign/": [
      ["Can you redesign my existing website without losing content?", "We first review the current site and identify content and functionality to preserve, improve or retire."],
      ["Will redesign improve SEO?", "A redesign can improve technical foundations and usability, but rankings are not guaranteed. Existing URLs, content and redirects must be handled carefully."],
      ["Can you work with my current platform?", "The available options depend on the current platform, access and technical condition of the website."],
      ["Will my existing Google rankings be preserved?", "We review existing URLs, metadata and content, and plan redirects where needed. Search rankings cannot be guaranteed, but avoidable migration issues can be reduced."],
      ["Can you improve website speed during redesign?", "Image optimisation, layout improvements and removal of unnecessary assets can be considered as part of the redesign scope."]
    ]
  };
  if (faqByRoute[route]) {
    schemaGraph.push({
      "@type": "FAQPage",
      "@id": `${meta.canonical}#faq`,
      "mainEntity": faqByRoute[route].map(([question, answer]) => ({
        "@type": "Question",
        "name": question,
        "acceptedAnswer": { "@type": "Answer", "text": answer }
      }))
    });
  }

  if (route === "/student-projects/") {
    schemaGraph.push({
      "@type": "FAQPage",
      "@id": `${meta.canonical}#faq`,
      "mainEntity": [
        ["Do you support BCA final-year projects?", "Yes. We discuss BCA project requirements involving web applications, Python, databases and other suitable software topics. The scope is agreed after reviewing your course requirements."],
        ["Can you help with BTech and MCA projects?", "Yes. We review relevant computer science and IT project briefs, technical depth, available data and timelines before confirming feasibility."],
        ["Which technologies can be used?", "Depending on the project, options may include React, Node.js, Express, Python, REST APIs, PostgreSQL, MySQL and suitable AI or machine-learning libraries."],
        ["Will I understand the source code?", "The agreed handover can include code walkthroughs and explanations of the architecture, modules and implementation. Students are expected to participate and understand their work."],
        ["Do you work with students outside Kollam?", "Yes. Project discussions and delivery can be handled remotely across Kerala and India. In-person discussions within Kerala may be arranged where feasible."]
      ].map(([question, answer]) => ({
        "@type": "Question",
        "name": question,
        "acceptedAnswer": { "@type": "Answer", "text": answer }
      }))
    });
  }
  const schemaTag = `<script type="application/ld+json">${JSON.stringify({
    "@context": "https://schema.org",
    "@graph": schemaGraph
  }).replaceAll("<", "\\u003c")}</script>`;
  html = html.replace("</head>", `${schemaTag}</head>`);

  if (StaticApp && !["/insights/", "/services/"].includes(route)) {
    try {
      const markup = renderToString(React.createElement(StaticApp, { location: route }));
      // React inlines hoisted <link rel="preload"> tags in the markup; move them into <head> so the preload scanner finds them first.
      const preloadTags = [];
      const cleaned = fixAssetUrls(markup).replace(/<link rel="preload"[^>]*\/?>/g, (tag) => { preloadTags.push(tag); return ""; });
      html = html.replace("</head>", `${preloadTags.join("")}</head>`);
      html = html.replace('<div id="root"></div>', `<div id="root">${cleaned}</div>`);
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
