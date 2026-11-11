import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const app = await readFile(new URL("../src/App.jsx", import.meta.url), "utf8");
const css = await readFile(new URL("../src/styles/home.css", import.meta.url), "utf8");
const html = await readFile(new URL("../index.html", import.meta.url), "utf8");
const pages = await readFile(new URL("../src/pages.jsx", import.meta.url), "utf8");

for (const section of ["studio", "services", "technology", "work", "process", "contact"]) {
  assert.ok(app.includes(`id="${section}"`), `Missing section: ${section}`);
}
for (const required of ["Custom software", "Web & mobile apps", "Cloud & integrations", "AI & automation", "NeuroTwin", "MEGHAM", "Healthiet", "PredX", "Aegis DRM", "Cookit"]) {
  assert.ok(app.includes(required), `Missing verified content: ${required}`);
}
for (const detail of ["zenith-mark.svg", "/api/enquiry", "hello@zenithsoftworks.in", "94976 65504"]) {
  assert.ok(app.includes(detail), `Missing required integration or contact detail: ${detail}`);
}
for (const token of ["--bg:", "--surface:", "--blue:", "--cyan:"]) {
  assert.ok((await readFile(new URL("../src/styles/global.css", import.meta.url), "utf8")).includes(token), `Missing design token: ${token}`);
}
assert.ok(css.includes("@media(max-width:760px)"), "Missing mobile layout");
for (const route of ["/about/","/services/","/solutions/","/work/","/insights/","/contact/","/talent/","/student-projects/","/academic-services/","/web-platforms/","/mobile-apps/","/services/software-development/","/services/ai-automation/","/services/iot-solutions/","/services/cloud-devops/","/privacy/","/terms/"]) {
  assert.ok(pages.includes(`"${route}"`), `Missing page route: ${route}`);
}
assert.ok(app.includes("InnerPage path={path}"), "Missing inner-page route integration");
assert.match(html, /canonical/);
console.log("Zenith rebuild checks passed: homepage sections, 17 inner routes, portfolio, brand assets, contact integration and responsive styles.");
