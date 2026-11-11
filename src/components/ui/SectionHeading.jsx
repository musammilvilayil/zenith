import { cn } from "@/lib/utils";

/**
 * Editorial section opener: an optional metadata rule, a mono label, a
 * display headline and supporting copy laid out side-by-side on desktop.
 */
export default function SectionHeading({
  index,
  meta,
  label,
  title,
  description,
  as: Heading = "h2",
  size = "lg",
  align = "split",
  className,
  children,
}) {
  return (
    <div className={cn("relative", className)}>
      {(index || meta) && (
        <div className="z-rule">
          <span className="z-label">{index}</span>
          {meta && <span className="z-label z-label-accent text-right">{meta}</span>}
        </div>
      )}
      <div
        className={cn(
          "grid gap-6",
          (index || meta) && "pt-10 sm:pt-14",
          align === "split" && description && "lg:grid-cols-[1.35fr_0.65fr] lg:items-end lg:gap-16",
        )}
      >
        <div>
          {label && <p className="z-label z-eyebrow mb-5">{label}</p>}
          <Heading className={size === "lg" ? "z-display-lg" : "z-display-md"}>{title}</Heading>
        </div>
        {description && (
          <div className="space-y-5">
            <p className="text-[0.975rem] leading-[1.72] text-muted [.z-light_&]:text-light-muted">
              {description}
            </p>
            {children}
          </div>
        )}
      </div>
    </div>
  );
}
