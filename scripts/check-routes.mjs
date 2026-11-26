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
  "/resources/", "/resources/1/", "/resources/2/", "/resources/3/",
  "/website-development-company-kollam/", "/software-development-company-kochi/",
  "/software-development-company-trivandrum/", "/website-development-company-calicut/",
  "/resources/4/", "/resources/5/", "/resources/6/", "/resources/7/",
  "/resources/8/", "/resources/9/", "/resources/10/", "/resources/11/",
  "/resources/12/", "/resources/13/", "/resources/14/", "/resources/15/",
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
  "src/assets/images/hero-abstract.jpg",
  "src/assets/images/work-megham.jpg",
  "src/assets/images/work-carematrix.jpg",
  "src/assets/images/work-she-shield.jpg",
  "src/assets/images/work-projexify.jpg",
  "src/assets/images/student-lab.jpg",
];

for (const img of requiredImages) {
  assert.ok(existsSync(resolve(process.cwd(), img)), `Missing image asset: ${img}`);
}

console.log(`SEO route metadata, sitemap and image asset checks passed for ${ALL_ROUTES.length} routes.`);