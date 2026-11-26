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
      <div className="z-container">
        <div className="z-glass rounded-[1.75rem] !bg-[#050505] !border-[#050505] p-8 sm:p-12 lg:p-16">
          <div className="grid gap-10 lg:grid-cols-[1.4fr_0.6fr] lg:items-end">
            <div>
              <p className="z-label z-eyebrow !text-[#26b4ff]">{label}</p>
              <h2 className="z-display-md mt-5 max-w-3xl !text-white">{title}</h2>
              {description && <p className="mt-5 max-w-xl !text-white/70">{description}</p>}
            </div>
            <div className="flex flex-wrap gap-3 lg:justify-end">
              <Button to={primaryHref}>{primaryLabel}</Button>
              {secondaryLabel && secondaryHref && (
                <Button to={secondaryHref} variant="secondary" arrow={null} className="!text-white !border-white/40 hover:!bg-white/10">
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
