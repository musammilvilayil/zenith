import { cp, mkdir, copyFile } from "node:fs/promises";
import { resolve } from "node:path";

const root = resolve(process.cwd(), "..");
const publicDir = resolve(process.cwd(), "public");
await mkdir(resolve(publicDir, "assets"), { recursive: true });
await cp(resolve(root, "assets"), resolve(publicDir, "assets"), { recursive: true, force: true });
for (const file of ["robots.txt", "sitemap.xml"]) {
  try { await copyFile(resolve(root, file), resolve(publicDir, file)); }
  catch (error) { if (error.code !== "ENOENT") throw error; }
}
console.log("Copied Zenith assets, robots.txt and sitemap.xml into Vite public output.");
