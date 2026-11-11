import { cn } from "@/lib/utils";

/** Six-step collaboration timeline. Horizontal rail on desktop, vertical on mobile. */
export default function ProcessTimeline({ steps, className }) {
  return (
    <ol className={cn("grid gap-px overflow-hidden rounded-[1.5rem] border border-line bg-line sm:grid-cols-2 lg:grid-cols-3", className)}>
      {steps.map((step) => (
        <li key={step.num} className="group relative flex flex-col bg-midnight p-7 transition-colors duration-500 hover:bg-navy sm:p-8">
          <div className="flex items-center justify-between">
            <span className="z-num">{step.num}</span>
            {step.output && <span className="z-label text-faint">{step.output}</span>}
          </div>
          <span aria-hidden="true" className="mt-6 block h-px w-10 bg-ice/40 transition-all duration-500 group-hover:w-16 group-hover:bg-ice" />
          <h3 className="mt-6 font-display text-xl font-bold text-ink sm:text-2xl">{step.title}</h3>
          <p className="mt-3 text-sm leading-relaxed text-muted">{step.desc}</p>
        </li>
      ))}
    </ol>
  );
}
