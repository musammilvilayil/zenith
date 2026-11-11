import assert from "node:assert/strict";
import { existsSync } from "node:fs";
import { resolve } from "node:path";
import { ALL_ROUTES, ROUTES_META } from "../src/data/routesMeta.js";

const requiredRoutes = [
  "/", "/about/", "/academic-services/", "/contact/", "/insights/",
  "/insights/1/", "/insights/2/", "/insights/3/", "/privacy/", "/services/",
  "/services/ai-automation/", "/services/cloud-devops/", "/services/iot-solutions/",
  "/services/mobile-apps/", "/services/software-development/", "/services/web-platforms/",
  "/solutions/", "/student-projects/", "/student-projects/sustainability/", "/talent/",
  "/terms/", "/work/", "/work/carematrix/", "/work/megham/", "/work/projexify/", "/work/she-shield/",
];

assert.equal(ALL_ROUTES.length, 26, "Expected all 26 Zenith routes in ROUTES_META.");
for (const route of requiredRoutes) {
  const meta = ROUTES_META[route];
  assert.ok(meta, `Missing metadata for route: ${route}`);
  assert.ok(meta.title, `Missing title for route: ${route}`);
  assert.ok(meta.description, `Missing description for route: ${route}`);
  assert.ok(meta.canonical, `Missing canonical URL for route: ${route}`);
}

const requiredImages = [
  "src/assets/images/zenith-original-navbar.png",
  "src/assets/images/zenith-logo-footer.svg",
  "src/assets/images/zenith-mark.svg",
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

console.log("Route parity and image asset checks passed for all 26 native React routes.");
