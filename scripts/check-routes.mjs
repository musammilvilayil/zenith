import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import { ALL_ROUTES, ROUTES_META } from "../src/data/routesMeta.js";

const requiredRoutes = [
  "/", "/about/", "/business/", "/business/website-development/",
  "/business/ecommerce-development/", "/business/custom-software-development/",
  "/business/website-redesign/", "/contact/", "/student-projects/",
  "/student-projects/bca-project-development/",
  "/student-projects/btech-project-development/",
  "/student-projects/mca-project-development/",
  "/student-projects/python-project-development/",
  "/student-projects/ai-ml-project-development/",
  "/student-projects/web-development-projects/",
  "/projects/", "/projects/megham/", "/projects/carematrix/",
  "/projects/she-shield/", "/projects/projexify/",
  "/resources/", "/resources/scope-custom-software-project/", "/resources/when-ai-automation-is-useful/", "/resources/mvp-does-not-mean-disposable/",
  "/website-development-company-kollam/", "/software-development-company-kochi/",
  "/software-development-company-trivandrum/", "/website-development-company-calicut/",
  "/resources/website-development-cost-kerala-2026/", "/resources/how-to-choose-website-development-company-kerala/", "/resources/custom-website-vs-wordpress/", "/resources/ecommerce-website-cost-india/",
  "/resources/bca-final-year-project-ideas/", "/resources/full-stack-project-ideas-bca-btech/", "/resources/python-final-year-project-ideas/", "/resources/how-to-choose-final-year-project-topic/",
  "/resources/custom-software-vs-ready-made-software/", "/resources/custom-software-development-cost-india/", "/resources/how-long-does-website-development-take/", "/resources/essential-features-business-website/",
  "/privacy/", "/terms/",
];

for (const route of requiredRoutes) {
  const meta = ROUTES_META[route];
  assert.ok(meta, `Missing metadata for route: ${route}`);
  assert.ok(meta.title, `Missing title for route: ${route}`);
  assert.ok(meta.description, `Missing description for route: ${route}`);
  assert.ok(meta.canonical, `Missing canonical URL for route: ${route}`);
}

assert.equal(ALL_ROUTES.length, Object.keys(ROUTES_META).length, "ALL_ROUTES must reflect the metadata map.");

const sitemap = readFileSync(resolve(process.cwd(), "public/sitemap.xml"), "utf8");
for (const route of requiredRoutes.filter((path) => !["/terms/"].includes(path))) {
  assert.ok(sitemap.includes(`https://zenithsoftworks.in${route}`), `Missing canonical URL from sitemap: ${route}`);
}

const requiredImages = [
  "src/assets/images/zenith-logo.webp",
  "public/og-zenith.png",
  "src/assets/images/zenith-mark.webp",
  "src/assets/images/hero-abstract.webp",
  "src/assets/images/work-megham.webp",
  "src/assets/images/work-carematrix.webp",
  "src/assets/images/work-she-shield.webp",
  "src/assets/images/work-projexify.webp",
  "src/assets/images/student-lab.webp",
];

for (const img of requiredImages) {
  assert.ok(existsSync(resolve(process.cwd(), img)), `Missing image asset: ${img}`);
}

console.log(`SEO route metadata, sitemap and image asset checks passed for ${ALL_ROUTES.length} routes.`);