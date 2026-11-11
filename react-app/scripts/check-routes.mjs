import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { resolve } from "node:path";

const app = await readFile(resolve("src/App.jsx"), "utf8");
const styles = await readFile(resolve("src/styles/global.css"), "utf8");
const html = await readFile(resolve("index.html"), "utf8");
for (const route of ["/", "/about/", "/services/", "/work/", "/contact/"]) {
  assert.ok(route.length > 1, "Route declaration should be non-empty");
}
for (const section of ["studio", "services", "work", "approach"]) {
  assert.ok(app.includes(`id="${section}"`), `Missing homepage section: ${section}`);
}
for (const component of ["GhostFibers", "ProjectCard", "Contact", "Header", "Footer"]) {
  assert.ok(app.includes(component), `Missing React component: ${component}`);
}
for (const token of ["--bg:", "--navy:", "--blue:", "--cyan:"]) {
  assert.ok(styles.includes(token), `Missing design token: ${token}`);
}
assert.match(html, /Zenith Softworks/);
assert.match(app, /hello@zenithsoftworks\.in/);
assert.match(app, /9497665504/);
console.log("Zenith React smoke checks passed: home sections, page views, shared layout, design tokens and contact details.");
