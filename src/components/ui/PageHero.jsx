import LuminousFilaments from "@/components/fx/LuminousFilaments";
import { useLocation } from "react-router-dom";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import { cn } from "@/lib/utils";

export default function PageHero({
  eyebrow,
  title,
  description,
  actions,
  aside,
  className,
  filaments = true,
}) {
  return (
    <section
      className={cn(
        "z-grain relative isolate overflow-hidden border-b border-ice/15 bg-gradient-to-br from-midnight via-navy/85 to-deep py-16 sm:py-24",
        className,
      )}
    >
      {filaments && (
        <LuminousFilaments
          coreColor="#edf3ff"
          fiberColor="#c1e8ff"
          secondaryColor="#2563eb"
          originX={0.85}
          originY={0.35}
          baseAngle={Math.PI * 0.96}
          spreadAngle={Math.PI * 0.74}
          filamentCount={22}
          reach={0.85}
          opacity={0.6}
        />
      )}

      <div className="relative z-10 mx-auto max-w-7xl px-5 sm:px-8">
        <div
          className={cn(
            "grid items-center gap-10",
            aside ? "lg:grid-cols-12" : "max-w-4xl",
          )}
        >
          <div className={aside ? "lg:col-span-7" : undefined}>
            {eyebrow && (
              <span className="z-mono-label inline-block text-soft-blue">
                {eyebrow}
              </span>
            )}
            <h1 className="mt-4 font-display text-3xl font-bold leading-[1.06] tracking-[-0.04em] text-ink sm:text-5xl lg:text-6xl">
              {title}
            </h1>
            {description && (
              <p className="mt-5 max-w-2xl text-base leading-[1.7] text-subtle sm:text-lg">
                {description}
              </p>
            )}
            {actions && <div className="mt-8 flex flex-wrap gap-3">{actions}</div>}
          </div>
          {aside && <div className="relative z-10 lg:col-span-5">{aside}</div>}
        </div>
      </div>
    </section>
  );
}

/** Derive "Home / Section / Page" from the URL when a page does not supply its own trail. */
function autoCrumbs(pathname) {
  const segments = pathname.split("/").filter(Boolean);
  if (!segments.length) return [];
  const ACRONYMS = { ai: "AI", iot: "IoT", devops: "DevOps", faqs: "FAQs" };
  const label = (slug) =>
    slug
      .split("-")
      .map((word) => ACRONYMS[word] ?? word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  const trail = [{ label: "Home", to: "/" }];
  segments.forEach((seg, i) => {
    const to = `/${segments.slice(0, i + 1).join("/")}/`;
    trail.push(i === segments.length - 1 ? { label: label(seg) } : { label: label(seg), to });
  });
  return trail;
}
