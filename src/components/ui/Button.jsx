import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

const BASE =
  "group/btn inline-flex items-center justify-center gap-2.5 rounded-full text-sm font-bold transition duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ice disabled:pointer-events-none disabled:opacity-50 aria-disabled:pointer-events-none aria-disabled:opacity-50 motion-reduce:transition-none";

const VARIANTS = {
  primary:
    "border border-ice/40 bg-ice px-6 py-3.5 text-midnight shadow-[0_0_0_1px_rgba(193,232,255,0.2),0_12px_32px_-14px_rgba(128,178,255,0.55)] hover:-translate-y-0.5 hover:bg-white active:translate-y-0 motion-reduce:hover:translate-y-0",
  secondary:
    "border border-ice/30 bg-transparent px-6 py-3.5 text-ink hover:border-ice/70 hover:bg-ice/10 active:bg-ice/15",
  // For light-surface sections
  dark: "border border-navy bg-navy px-6 py-3.5 text-white hover:-translate-y-0.5 hover:bg-midnight active:translate-y-0 motion-reduce:hover:translate-y-0",
  "secondary-dark":
    "border border-navy/40 bg-transparent px-6 py-3.5 text-light-ink hover:border-navy hover:bg-navy/5",
};

/**
 * Shared button. Renders a router <Link> (to), an external <a> (href) or <button>.
 * `arrow` appends a decorative glyph (e.g. "↗", "↓").
 */
export default function Button({
  to,
  href,
  variant = "primary",
  arrow,
  className,
  children,
  external,
  ...rest
}) {
  const classes = cn(BASE, VARIANTS[variant], className);
  const content = (
    <>
      {children}
      {arrow && (
        <span
          aria-hidden="true"
          className="transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 motion-reduce:transform-none"
        >
          {arrow}
        </span>
      )}
    </>
  );

  if (to) {
    return (
      <Link to={to} className={classes} {...rest}>
        {content}
      </Link>
    );
  }
  if (href) {
    const isExternal = external ?? /^https?:/.test(href);
    return (
      <a
        href={href}
        className={classes}
        {...(isExternal ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        {...rest}
      >
        {content}
      </a>
    );
  }
  return (
    <button type="button" className={classes} {...rest}>
      {content}
    </button>
  );
}

