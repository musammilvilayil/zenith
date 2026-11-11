import LuminousFilaments from "@/components/fx/LuminousFilaments";
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
        "relative isolate overflow-hidden border-b border-ice/15 bg-gradient-to-br from-midnight via-navy/85 to-deep py-20 sm:py-28",
        className,
      )}
    >
      {filaments && (
        <LuminousFilaments
          coreColor="#EAF7FF"
          fiberColor="#C1E8FF"
          secondaryColor="#5483B3"
          originX={0.85}
          originY={0.35}
          baseAngle={Math.PI * 0.96}
          spreadAngle={Math.PI * 0.74}
          filamentCount={28}
          reach={0.85}
          opacity={0.6}
        />
      )}

      <div className="relative z-10 mx-auto max-w-7xl px-5 sm:px-8">
        <div
          className={cn(
            "grid items-center gap-10",
            aside ? "lg:grid-cols-[1.25fr_0.75fr]" : "max-w-4xl",
          )}
        >
          <div>
            {eyebrow && (
              <span className="inline-block text-[11px] font-bold uppercase tracking-[0.2em] text-soft-blue">
                {eyebrow}
              </span>
            )}
            <h1 className="mt-4 font-display text-4xl font-bold leading-[1.03] tracking-tight text-ink sm:text-5xl lg:text-6xl">
              {title}
            </h1>
            {description && (
              <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted sm:text-lg">
                {description}
              </p>
            )}
            {actions && <div className="mt-8 flex flex-wrap gap-3">{actions}</div>}
          </div>
          {aside && <div className="relative z-10">{aside}</div>}
        </div>
      </div>
    </section>
  );
}
