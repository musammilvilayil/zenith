import { fileURLToPath, URL } from "node:url";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  base: "/",
  ssr: {
    // Bundle React Router during prerender so Vite can evaluate its ESM exports.
    noExternal: ["react-router", "react-router-dom"],
  },
  build: {
    outDir: "dist",
    emptyOutDir: true,
    manifest: true,
  },
});
