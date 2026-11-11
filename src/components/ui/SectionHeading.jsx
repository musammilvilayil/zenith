import { cn } from "@/lib/utils";

/** Monospace metadata label, e.g. "04 / SELECTED WORK". */
export function MetaLabel({ children, tone = "dark", className, as: Tag = "span" }) {
  return (
    <Tag
      className={cn(
        "z-mono-label",
        tone === "dark" ? "text-subtle" : "text-light-muted",
        className,
      )}
    >
      {children}
    </Tag>
  );
}

/** Section header: meta rule + editorial title + optional supporting copy. */
export default function SectionHeading({
  index,
  label,
  aside,
  title,
  description,
  tone = "dark",
  as: Title = "h2",
  className,
}) {
  const light = tone === "light";
  return (
    <header className={className}>
      {(index || label || aside) && (
        <div
          className={cn(
            "flex items-center justify-between gap-4 border-b pb-4",
            light ? "border-navy/20" : "border-ice/15",
          )}
        >
          <MetaLabel tone={tone}>{[index, label].filter(Boolean).join(" / ")}</MetaLabel>
          {aside && (
            <MetaLabel tone={tone} className={light ? undefined : "text-soft-blue"}>
              {aside}
            </MetaLabel>
          )}
        </div>
      )}
      {(title || description) && (
        <div className="flex flex-col justify-between gap-6 py-10 sm:py-12 lg:flex-row lg:items-end">
          {title && (
            <Title
              className={cn(
                "font-display text-3xl font-bold leading-[1.06] tracking-[-0.04em] sm:text-5xl lg:text-6xl",
                light ? "text-light-ink" : "text-ink",
              )}
            >
              {title}
            </Title>
          )}
          {description && (
            <p
              className={cn(
                "max-w-md text-sm leading-[1.7] sm:text-base",
                light ? "text-light-muted" : "text-subtle",
              )}
            >
              {description}
            </p>
          )}
        </div>
      )}
    </header>
  );
}

