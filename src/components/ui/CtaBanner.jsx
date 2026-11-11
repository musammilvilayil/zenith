import { Link } from "react-router-dom";
import InterferenceRibbons from "@/components/fx/InterferenceRibbons";

export default function CtaBanner({
  title,
  primaryLabel = "Send a project brief",
  primaryHref = "/contact/",
  secondaryLabel,
  secondaryHref,
}) {
  return (
    <section className="relative isolate overflow-hidden border-t border-ice/15 bg-gradient-to-br from-navy/90 via-midnight to-deep py-20">
      <InterferenceRibbons
        primaryColor="#c1e8ff"
        secondaryColor="#80b2ff"
        accentColor="#2563eb"
        ribbonCount={2}
        wiresPerRibbon={10}
        opacity={0.38}
      />
      <div className="relative z-10 mx-auto flex max-w-7xl flex-col items-start justify-between gap-8 px-5 sm:px-8 lg:flex-row lg:items-center">
        <h2 className="max-w-2xl font-display text-3xl font-bold leading-tight text-ink sm:text-4xl">
          {title}
        </h2>
        <div className="flex flex-wrap gap-3">
          <Link
            to={primaryHref}
            className="inline-flex items-center gap-2 rounded-full bg-ice px-6 py-3.5 text-sm font-bold text-midnight transition hover:-translate-y-0.5 hover:bg-white"
          >
            {primaryLabel} <span aria-hidden="true">↗</span>
          </Link>
          {secondaryLabel && secondaryHref && (
            <Link
              to={secondaryHref}
              className="inline-flex items-center gap-2 rounded-full border border-ice/40 px-6 py-3.5 text-sm font-semibold text-ink transition hover:border-ice hover:bg-steel/20"
            >
              {secondaryLabel}
            </Link>
          )}
        </div>
      </div>
    </section>
  );
}
