import { useLayoutEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { useLocation } from "react-router-dom";
import GhostFibers from "./components/GhostFibers/GhostFibers.jsx";
import InterferenceRibbons from "./components/InterferenceRibbons/InterferenceRibbons.jsx";
import LuminousFilaments from "./components/LuminousFilaments/LuminousFilaments.jsx";
import VoxelArc from "./components/VoxelArc/VoxelArc.jsx";
import pages1 from "./pages/legacyPages-1.js";
import pages2 from "./pages/legacyPages-2.js";
import pages3 from "./pages/legacyPages-3.js";
import pages4 from "./pages/legacyPages-4.js";

const legacyPages = { ...pages1, ...pages2, ...pages3, ...pages4 };

const EMPTY_FX_TARGETS = {
  hero: null,
  story: null,
  approach: null,
  student: null,
  pageHero: null,
};

function normalizePath(pathname) {
  if (pathname === "/") return "/";
  return pathname.endsWith("/") ? pathname : pathname + "/";
}

function LegacyPage() {
  const location = useLocation();
  const hostRef = useRef(null);
  const [fxTargets, setFxTargets] = useState(EMPTY_FX_TARGETS);
  const path = normalizePath(location.pathname);
  const html = legacyPages[path];

  useLayoutEffect(() => {
    const host = hostRef.current;
    if (!host) return undefined;
    setFxTargets(EMPTY_FX_TARGETS);

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
      const key = node.getAttribute("name") ? `meta[name="${node.getAttribute("name")}"]`
        : node.getAttribute("property") ? `meta[property="${node.getAttribute("property")}"]`
        : node.rel === "canonical" ? 'link[rel="canonical"]'
        : node.rel === "icon" ? 'link[rel="icon"]' : null;
      const exists = key ? document.head.querySelector(key) : [...document.head.querySelectorAll('script[type="application/ld+json"]')].some((item) => item.textContent === node.textContent);
      if (!exists) {
        const clone = node.cloneNode(true);
        document.head.appendChild(clone);
        headNodes.push(clone);
      }
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
      const href = node.getAttribute("href");
      if (!href) return;
      const resolvedHref = new URL(href, window.location.origin).href;
      const exists = [...document.head.querySelectorAll('link[rel="stylesheet"]')].some((item) => item.getAttribute("href") === href || item.href === resolvedHref);
      if (!exists) {
        const link = document.createElement("link");
        link.rel = "stylesheet";
        link.href = href;
        document.head.appendChild(link);
        headNodes.push(link);
      }
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

    const hero = host.querySelector(".cinematic-hero");
    const story = host.querySelector(".story-section");
    const approach = host.querySelector(".approach-section");
    const student = host.querySelector(".student-section");
    const pageHero = !hero ? host.querySelector(".page-hero") : null;

    const hosted = [story, approach, student, pageHero].filter(Boolean);
    hosted.forEach((node) => node.classList.add("zenith-fx-host"));
    setFxTargets({ hero, story, approach, student, pageHero });

    const hash = location.hash;
    if (hash) requestAnimationFrame(() => document.getElementById(decodeURIComponent(hash.slice(1)))?.scrollIntoView());
    else window.scrollTo(0, 0);

    return () => {
      headNodes.forEach((node) => node.remove());
      scriptNodes.forEach((node) => node.remove());
      hosted.forEach((node) => node.classList.remove("zenith-fx-host"));
      setFxTargets(EMPTY_FX_TARGETS);
    };
  }, [html, location.key, location.hash]);

  return (
    <>
      <div ref={hostRef} />
      {fxTargets.hero && createPortal(
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
        fxTargets.hero,
      )}
      {fxTargets.story && createPortal(
        <LuminousFilaments
          coreColor="#EAF7FF"
          fiberColor="#C1E8FF"
          secondaryColor="#5483B3"
          originX={0.88}
          originY={0.24}
          baseAngle={Math.PI * 0.94}
          spreadAngle={Math.PI * 0.78}
          filamentCount={34}
          opacity={0.68}
        />,
        fxTargets.story,
      )}
      {fxTargets.approach && createPortal(
        <InterferenceRibbons
          primaryColor="#C1E8FF"
          secondaryColor="#7DA0CA"
          accentColor="#5483B3"
          ribbonCount={3}
          wiresPerRibbon={14}
          twist={2.4}
          opacity={0.54}
        />,
        fxTargets.approach,
      )}
      {fxTargets.student && createPortal(
        <VoxelArc
          crestColor="#C1E8FF"
          midColor="#5483B3"
          deepColor="#052659"
          horizonY={0.46}
          arcCurvature={0.14}
          waveHeight={15}
          opacity={0.78}
        />,
        fxTargets.student,
      )}
      {fxTargets.pageHero && createPortal(
        <LuminousFilaments
          coreColor="#EAF7FF"
          fiberColor="#C1E8FF"
          secondaryColor="#5483B3"
          originX={0.84}
          originY={0.42}
          baseAngle={Math.PI * 0.98}
          spreadAngle={Math.PI * 0.72}
          filamentCount={28}
          reach={0.82}
          opacity={0.6}
        />,
        fxTargets.pageHero,
      )}
    </>
  );
}

export default function App() {
  return <LegacyPage />;
}
