import { mkdir, readFile, writeFile } from "node:fs/promises";
import { dirname, join, resolve } from "node:path";
import pages1 from "../src/pages/legacyPages-1.js";
import pages2 from "../src/pages/legacyPages-2.js";
import pages3 from "../src/pages/legacyPages-3.js";
import pages4 from "../src/pages/legacyPages-4.js";

const pages = { ...pages1, ...pages2, ...pages3, ...pages4 };
const dist = resolve(process.cwd(), "dist");
const manifest = JSON.parse(await readFile(join(dist, ".vite/manifest.json"), "utf8"));
const entry = manifest["index.html"];
if (!entry?.file) throw new Error("Vite entry not found in build manifest.");
const css = (entry.css || []).map((file) => '<link rel="stylesheet" href="/' + file + '">').join("");
const bundle = '<script type="module" src="/' + entry.file + '"></script>';

for (const [route, source] of Object.entries(pages)) {
  const head = source.match(/<head[^>]*>([\s\S]*?)<\/head>/i)?.[1];
  const bodyOpen = source.match(/<body([^>]*)>/i)?.[1] || "";
  const body = source.match(/<body[^>]*>([\s\S]*?)<\/body>/i)?.[1];
  if (head == null || body == null) throw new Error("Could not parse legacy page: " + route);

  const safeBody = body.replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, "");
  const className = bodyOpen.match(/class=["']([^"']*)["']/i)?.[1] || "";
  const output = '<!doctype html><html lang="en"><head>' + head + css +
    '</head><body class="' + className + '"><div id="root"><div class="legacy-page ' +
    className + '">' + safeBody + '</div></div>' + bundle + '</body></html>';
  const relative = route === "/" ? "index.html" : route.replace(/^\/+|\/+$/g, "") + "/index.html";
  const target = join(dist, relative);
  await mkdir(dirname(target), { recursive: true });
  await writeFile(target, output, "utf8");
}
console.log("Prerendered " + Object.keys(pages).length + " SEO-ready React routes.");
