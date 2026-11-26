import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { ROUTES_META } from "@/data/routesMeta";
import { SITE } from "@/data/site";

function upsertMeta(selector, createAttrs, content) {
  let el = document.head.querySelector(selector);
  if (!el) {
    el = document.createElement("meta");
    Object.entries(createAttrs).forEach(([k, v]) => el.setAttribute(k, v));
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

export default function PageHead({ title, description, canonical, ogTitle, ogDescription, robots }) {
  const { pathname } = useLocation();
  const normalized = pathname === "/" ? "/" : pathname.endsWith("/") ? pathname : `${pathname}/`;
  const meta = ROUTES_META[normalized] || {};

  const finalTitle = title || meta.title || `${SITE.name} — Digital Development Studio`;
  const finalDescription = description || meta.description || "Business websites, custom software and academic project development from Zenith Softworks, Kerala, India.";
  const finalCanonical = canonical || meta.canonical || `${SITE.siteUrl}${normalized}`;
  const finalOgTitle = ogTitle || meta.ogTitle || finalTitle;
  const finalOgDescription = ogDescription || meta.ogDescription || finalDescription;
  const finalRobots = robots || meta.robots || "index,follow";

  useEffect(() => {
    document.title = finalTitle;
    upsertMeta('meta[name="description"]', { name: "description" }, finalDescription);
    upsertMeta('meta[property="og:title"]', { property: "og:title" }, finalOgTitle);
    upsertMeta('meta[property="og:description"]', { property: "og:description" }, finalOgDescription);
    upsertMeta('meta[property="og:url"]', { property: "og:url" }, finalCanonical);
    upsertMeta('meta[property="og:type"]', { property: "og:type" }, "website");
    upsertMeta('meta[name="twitter:card"]', { name: "twitter:card" }, "summary");
    upsertMeta('meta[name="twitter:title"]', { name: "twitter:title" }, finalOgTitle);
    upsertMeta('meta[name="twitter:description"]', { name: "twitter:description" }, finalOgDescription);
    upsertMeta('meta[name="robots"]', { name: "robots" }, finalRobots);

    let link = document.head.querySelector('link[rel="canonical"]');
    if (!link) {
      link = document.createElement("link");
      link.rel = "canonical";
      document.head.appendChild(link);
    }
    link.href = finalCanonical;
  }, [finalTitle, finalDescription, finalCanonical, finalOgTitle, finalOgDescription, finalRobots]);

  return null;
}