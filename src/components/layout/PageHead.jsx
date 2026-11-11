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

export default function PageHead({ title, description, canonical, ogTitle, ogDescription }) {
  const { pathname } = useLocation();
  const normalized = pathname === "/" ? "/" : pathname.endsWith("/") ? pathname : `${pathname}/`;
  const meta = ROUTES_META[normalized] || {};

  const finalTitle = title || meta.title || `${SITE.name} — Digital Agency & Engineering Studio`;
  const finalDescription =
    description ||
    meta.description ||
    "Websites, applications and digital experiences built around people and possibility.";
  const finalCanonical = canonical || meta.canonical || `${SITE.siteUrl}${normalized}`;
  const finalOgTitle = ogTitle || meta.ogTitle || finalTitle;
  const finalOgDescription = ogDescription || meta.ogDescription || finalDescription;

  useEffect(() => {
    document.title = finalTitle;
    upsertMeta('meta[name="description"]', { name: "description" }, finalDescription);
    upsertMeta('meta[property="og:title"]', { property: "og:title" }, finalOgTitle);
    upsertMeta('meta[property="og:description"]', { property: "og:description" }, finalOgDescription);
    upsertMeta('meta[property="og:url"]', { property: "og:url" }, finalCanonical);

    let link = document.head.querySelector('link[rel="canonical"]');
    if (!link) {
      link = document.createElement("link");
      link.rel = "canonical";
      document.head.appendChild(link);
    }
    link.href = finalCanonical;
  }, [finalTitle, finalDescription, finalCanonical, finalOgTitle, finalOgDescription]);

  return null;
}
