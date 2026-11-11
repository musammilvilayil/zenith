import assert from "node:assert/strict";
import pages1 from "../src/pages/legacyPages-1.js";
import pages2 from "../src/pages/legacyPages-2.js";
import pages3 from "../src/pages/legacyPages-3.js";
import pages4 from "../src/pages/legacyPages-4.js";

const pages = { ...pages1, ...pages2, ...pages3, ...pages4 };
const required = [
  "/", "/about/", "/academic-services/", "/contact/", "/insights/",
  "/insights/1/", "/insights/2/", "/insights/3/", "/privacy/", "/services/",
  "/services/ai-automation/", "/services/cloud-devops/", "/services/iot-solutions/",
  "/services/mobile-apps/", "/services/software-development/", "/services/web-platforms/",
  "/solutions/", "/student-projects/", "/student-projects/sustainability/", "/talent/",
  "/terms/", "/work/", "/work/carematrix/", "/work/megham/", "/work/projexify/", "/work/she-shield/"
];
assert.equal(Object.keys(pages).length, 26, "Expected all 26 functional legacy routes.");
for (const route of required) {
  assert.ok(pages[route], "Missing route: " + route);
  assert.match(pages[route], /<title>/i, "Missing page title: " + route);
  assert.match(pages[route], /<body/i, "Missing body markup: " + route);
}
assert.match(pages["/"], /class="cinematic-hero"/, "Homepage hero markup missing.");
assert.match(pages["/contact/"], /id="enquiryForm"/, "Contact enquiry form missing.");
assert.match(pages["/talent/"], /Join Zenith Talent/, "Talent application route content missing.");
console.log("Route parity checks passed for all 26 pages, homepage hero, contact form and talent application.");
