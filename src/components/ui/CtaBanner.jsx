import Button from "@/components/ui/Button";
import InterferenceRibbons from "@/components/fx/InterferenceRibbons";

export default function CtaBanner({
  title,
  primaryLabel = "Send a project brief",
  primaryHref = "/contact/",
  secondaryLabel,
  secondaryHref,
}) {
  return (
    <section className="z-grain relative isolate overflow-hidden border-t border-ice/15 bg-gradient-to-br from-navy/90 via-midnight to-deep py-20">
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
          <Button to={primaryHref} arrow="↗">
            {primaryLabel}
          </Button>
          {secondaryLabel && secondaryHref && (
            <Button to={secondaryHref} variant="secondary">
              {secondaryLabel}
            </Button>
          )}
        </div>
      </div>
    </section>
  );
}
