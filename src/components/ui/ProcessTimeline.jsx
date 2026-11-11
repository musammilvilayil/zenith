import { cn } from "@/lib/utils";

/** Vertical editorial timeline. steps: [{ title, desc }] */
export default function ProcessTimeline({ steps, tone = "dark", className }) {
  const light = tone === "light";
  return (
    <ol className={cn("border-t", light ? "border-navy/20" : "border-ice/15", className)}>
      {steps.map((step, idx) => (
        <li
          key={step.title}
          className={cn(
            "grid grid-cols-[2.5rem_1fr] items-baseline gap-4 border-b py-5 sm:grid-cols-[4rem_minmax(0,1fr)_minmax(0,1.2fr)] sm:gap-8 sm:py-6",
            light ? "border-navy/20" : "border-ice/15",
          )}
        >
          <span className={cn("z-mono-label", light ? "text-[#1e40af]" : "text-ice")}>
            {String(idx + 1).padStart(2, "0")}
          </span>
          <h3
            className={cn(
              "font-display text-xl font-bold tracking-[-0.03em] sm:text-2xl",
              light ? "text-light-ink" : "text-ink",
            )}
          >
            {step.title}
          </h3>
          <p
            className={cn(
              "col-start-2 text-sm leading-[1.7] sm:col-start-auto sm:text-base",
              light ? "text-light-muted" : "text-subtle",
            )}
          >
            {step.desc}
          </p>
        </li>
      ))}
    </ol>
  );
}

