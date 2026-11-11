import { Link, useLocation } from "react-router-dom";
import { SITE } from "@/data/site";

const SEGMENT_LABELS = {
  about: "About",
  "academic-services": "Student Services",
  contact: "Contact",
  insights: "Insights",
  privacy: "Privacy",
  terms: "Terms",
  services: "Services",
  solutions: "Solutions",
  "student-projects": "Project Ideas",
  sustainability: "Sustainability",
  talent: "Talent",
  work: "Work",
};

function titleCase(segment) {
  return segment
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

/**
 * Route-derived breadcrumb trail with matching BreadcrumbList structured data.
 * `current` overrides the label of the last crumb (e.g. a project title).
 */
export default function Breadcrumbs({ current }) {
  const { pathname } = useLocation();
  const segments = pathname.split("/").filter(Boolean);
  if (segments.length === 0) return null;

  const crumbs = [{ label: "Home", href: "/" }];
  segments.forEach((segment, idx) => {
    const href = `/${segments.slice(0, idx + 1).join("/")}/`;
    const isLast = idx === segments.length - 1;
    crumbs.push({
      label: isLast && current ? current : SEGMENT_LABELS[segment] || titleCase(segment),
      href,
    });
  });

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: crumbs.map((crumb, idx) => ({
      "@type": "ListItem",
      position: idx + 1,
      name: crumb.label,
      item: `${SITE.siteUrl}${crumb.href}`,
    })),
  };

  return (
    <nav aria-label="Breadcrumb">
      <ol className="flex flex-wrap items-center gap-x-2.5 gap-y-1">
        {crumbs.map((crumb, idx) => {
          const isLast = idx === crumbs.length - 1;
          return (
            <li key={crumb.href} className="z-label flex items-center gap-2.5">
              {isLast ? (
                <span aria-current="page" className="text-ice">
                  {crumb.label}
                </span>
              ) : (
                <>
                  <Link to={crumb.href} className="transition-colors hover:text-ice">
                    {crumb.label}
                  </Link>
                  <span aria-hidden="true" className="text-faint">
                    /
                  </span>
                </>
              )}
            </li>
          );
        })}
      </ol>
      <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
    </nav>
  );
}
