import InterferenceRibbons from "@/components/fx/InterferenceRibbons";
import Button from "@/components/ui/Button";

export default function CtaBanner({
  title,
  label = "Next step",
  description = "Share the goal, the audience and any deadline. We reply with clear questions, not a sales script.",
  primaryLabel = "Send a project brief",
  primaryHref = "/contact/",
  secondaryLabel,
  secondaryHref,
}) {
  return (
    <section className="z-section relative isolate overflow-hidden border-t border-line">
      <div aria-hidden="true" className="z-ambient absolute inset-0 -z-20" />
      <InterferenceRibbons
        className="-z-10"
        primaryColor="#c1e8ff"
        secondaryColor="#80b2ff"
        accentColor="#5483b3"
        ribbonCount={2}
        wiresPerRibbon={10}
        opacity={0.32}
      />
      <div className="z-container">
        <div className="z-glass rounded-[1.75rem] p-8 sm:p-12 lg:p-16">
          <div className="grid gap-10 lg:grid-cols-[1.4fr_0.6fr] lg:items-end">
            <div>
              <p className="z-label z-label-accent z-eyebrow">{label}</p>
              <h2 className="z-display-md mt-5 max-w-3xl text-ink">{title}</h2>
              {description && <p className="mt-5 max-w-xl text-muted">{description}</p>}
            </div>
            <div className="flex flex-wrap gap-3 lg:justify-end">
              <Button to={primaryHref}>{primaryLabel}</Button>
              {secondaryLabel && secondaryHref && (
                <Button to={secondaryHref} variant="secondary" arrow={null}>
                  {secondaryLabel}
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
