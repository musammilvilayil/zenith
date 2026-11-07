import { useLayoutEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { useLocation } from "react-router-dom";
import GhostFibers from "./components/GhostFibers/GhostFibers.jsx";
import pages1 from "./pages/legacyPages-1.js";
import pages2 from "./pages/legacyPages-2.js";
import pages3 from "./pages/legacyPages-3.js";
import pages4 from "./pages/legacyPages-4.js";

const legacyPages = { ...pages1, ...pages2, ...pages3, ...pages4 };

function normalizePath(pathname) {
  if (pathname === "/") return "/";
  return pathname.endsWith("/") ? pathname : pathname + "/";
}

function LegacyPage() {
  const location = useLocation();
  const hostRef = useRef(null);
  const [heroTarget, setHeroTarget] = useState(null);
  const path = normalizePath(location.pathname);
  const html = legacyPages[path];

  useLayoutEffect(() => {
    const host = hostRef.current;
    if (!host) return undefined;
    setHeroTarget(null);

    if (!html) {
      host.innerHTML = '<main class="legacy-not-found"><p>404 · PAGE NOT FOUND</p><h1>This page has moved beyond the horizon.</h1><a href="/">Return to Zenith</a></main>';
      host.className = "legacy-page legacy-page-not-found";
      document.title = "Page not found | Zenith Softworks";
      document.body.className = "";
      return undefined;
    }

    const parsed = new DOMParser().parseFromString(html, "text/html");
    host.className = "legacy-page " + (parsed.body.className || "");
    host.innerHTML = parsed.body.innerHTML;
    document.body.className = parsed.body.className || "";

    const headNodes = [];
    parsed.head.querySelectorAll('meta[name],meta[property],link[rel="canonical"],link[rel="icon"],script[type="application/ld+json"]').forEach((node) => {
      const clone = node.cloneNode(true);
      document.head.appendChild(clone);
      headNodes.push(clone);
    });
    const description = parsed.head.querySelector('meta[name="description"]')?.content;
    if (description) {
      let meta = document.querySelector('meta[name="description"]');
      if (!meta) {
        meta = document.createElement("meta");
        meta.name = "description";
        document.head.appendChild(meta);
        headNodes.push(meta);
      }
      meta.content = description;
    }
    document.title = parsed.title || "Zenith Softworks";

    parsed.head.querySelectorAll('link[rel="stylesheet"]').forEach((node) => {
      const link = document.createElement("link");
      link.rel = "stylesheet";
      link.href = node.getAttribute("href");
      document.head.appendChild(link);
      headNodes.push(link);
    });

    const scriptNodes = [];
    parsed.body.querySelectorAll("script[src]").forEach((node) => {
      const script = document.createElement("script");
      script.src = node.getAttribute("src");
      script.defer = node.defer;
      script.async = false;
      document.body.appendChild(script);
      scriptNodes.push(script);
    });

    const target = host.querySelector(".cinematic-hero");
    if (target) setHeroTarget(target);

    const hash = location.hash;
    if (hash) requestAnimationFrame(() => document.getElementById(decodeURIComponent(hash.slice(1)))?.scrollIntoView());
    else window.scrollTo(0, 0);

    return () => {
      headNodes.forEach((node) => node.remove());
      scriptNodes.forEach((node) => node.remove());
      setHeroTarget(null);
    };
  }, [html, location.key, location.hash]);

  return (
    <>
      <div ref={hostRef} />
      {heroTarget && createPortal(
        <GhostFibers
          glowColor="#8b5cf6"
          layers={3}
          twist={1.6}
          threads={72}
          fiberStyle="dots"
          depthOfField={0.85}
          hoverEffect="focus"
          intro
          mouseInteraction
          lineColor="#ffffff"
          secondaryColor="#2dd4bf"
          gradient="across"
          waves={0.5}
          spread={2}
          foldGlow={1.3}
          brightness={2}
          vignette={0}
          mouseStrength={1.15}
        />,
        heroTarget,
      )}
    </>
  );
}

export default function App() {
  return <LegacyPage />;
}
