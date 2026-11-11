import { Link } from "react-router-dom";

/** items: [{ label, to? }] — the last item is the current page. */
export default function Breadcrumbs({ items = [] }) {
  if (items.length < 2) return null;
  return (
    <nav aria-label="Breadcrumb" className="mb-6">
      <ol className="z-mono-label flex flex-wrap items-center gap-x-2 gap-y-1 text-subtle">
        {items.map((item, idx) => {
          const last = idx === items.length - 1;
          return (
            <li key={`${item.label}-${idx}`} className="flex items-center gap-2">
              {last || !item.to ? (
                <span aria-current={last ? "page" : undefined} className={last ? "text-ice" : undefined}>
                  {item.label}
                </span>
              ) : (
                <Link to={item.to} className="transition-colors hover:text-ice">
                  {item.label}
                </Link>
              )}
              {!last && (
                <span aria-hidden="true" className="text-faint">
                  /
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
