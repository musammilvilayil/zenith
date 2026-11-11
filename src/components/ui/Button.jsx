import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

const VARIANTS = {
  primary: "z-btn-primary",
  secondary: "z-btn-secondary",
  dark: "z-btn-dark",
};

/**
 * Shared CTA. Renders a router <Link> for internal paths, an <a> for
 * external/hash/mailto targets, or a <button> when no `to`/`href` is given.
 */
export default function Button({
  to,
  href,
  variant = "primary",
  size,
  arrow = "↗",
  className,
  children,
  external,
  ...rest
}) {
  const classes = cn("z-btn", VARIANTS[variant], size === "sm" && "z-btn-sm", className);
  const content = (
    <>
      <span>{children}</span>
      {arrow && (
        <span aria-hidden="true" className={cn("z-btn-arrow", arrow === "↓" && "z-btn-arrow-down")}>
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
