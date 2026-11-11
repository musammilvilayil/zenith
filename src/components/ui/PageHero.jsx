import LuminousFilaments from "@/components/fx/LuminousFilaments";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import { cn } from "@/lib/utils";

/**
 * Shared hero for every inner page: breadcrumb trail, mono eyebrow, editorial
 * headline, lede, actions and an optional aside (image, card, metadata).
 */
export default function PageHero({
  eyebrow,
  title,
  description,
  actions,
  aside,
  className,
  crumb,
  meta,
  filaments = true,
}) {
  return (
    <section
      className={cn(
        "relative isolate -mt-[calc(var(--z-nav-h)+var(--z-nav-gap)*2)] overflow-hidden border-b border-line pt-[calc(var(--z-nav-h)+var(--z-nav-gap)*2)]",
        className,
      )}
    >
      <div aria-hidden="true" className="z-ambient absolute inset-0 -z-20" />
      <div aria-hidden="true" className="z-grid-bg absolute inset-0 -z-10 opacity-70" />
      {filaments && (
        <LuminousFilaments
          className="-z-10 opacity-80"
          coreColor="#edf3ff"
          fiberColor="#c1e8ff"
          secondaryColor="#5483b3"
          originX={0.9}
          originY={0.2}
          baseAngle={Math.PI * 0.96}
          spreadAngle={Math.PI * 0.62}
          filamentCount={22}
          reach={0.8}
          opacity={0.5}
        />
      )}

      <div className="z-container relative pt-10 pb-16 sm:pt-14 sm:pb-24">
        <div className="z-rise flex flex-wrap items-center justify-between gap-4 border-b border-line pb-4">
          <Breadcrumbs current={crumb} />
          {meta && <span className="z-label hidden sm:inline">{meta}</span>}
        </div>

        <div
          className={cn(
            "grid gap-12 pt-12 sm:pt-16",
            aside && "lg:grid-cols-[1.2fr_0.8fr] lg:items-center lg:gap-16",
          )}
        >
          <div className="max-w-4xl">
            {eyebrow && <p className="z-label z-label-accent z-eyebrow z-rise z-delay-1">{eyebrow}</p>}
            <h1 className="z-display-lg z-rise z-delay-2 mt-6 text-ink">{title}</h1>
            {description && <p className="z-lede z-rise z-delay-3 mt-6">{description}</p>}
            {actions && (
              <div className="z-rise z-delay-4 mt-9 flex flex-wrap items-center gap-3">{actions}</div>
            )}
          </div>
          {aside && <div className="z-fade z-delay-3 relative">{aside}</div>}
        </div>
      </div>
    </section>
  );
}
