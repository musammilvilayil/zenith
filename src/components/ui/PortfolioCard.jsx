import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

/**
 * Editorial project card. `feature` renders the large 16:9 variant; standard
 * cards use 4:3 on mobile and 16:10 from tablet up.
 */
export default function PortfolioCard({ project, feature = false, headingLevel = "h3", className }) {
  const Heading = headingLevel;
  return (
    <Link
      to={`/work/${project.slug}/`}
      className={cn("z-card z-card-interactive group flex flex-col overflow-hidden p-2.5", className)}
    >
      <div className="relative overflow-hidden rounded-[0.95rem]">
        <img
          src={project.image}
          alt={project.imageAlt}
          loading="lazy"
          decoding="async"
          width="1376"
          height="768"
          className={cn(
            "w-full object-cover transition-[transform,filter] duration-[900ms] ease-[var(--z-ease)] group-hover:scale-[1.025] group-hover:brightness-110",
            feature ? "aspect-[4/3] sm:aspect-video" : "aspect-[4/3] md:aspect-[16/10]",
          )}
        />
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-gradient-to-t from-midnight/70 via-transparent to-transparent" />
        <span className="z-label absolute top-4 left-4 rounded-full border border-line bg-midnight/75 px-3 py-1.5 text-ice backdrop-blur-md">
          {project.category}
        </span>
      </div>

      <div className="flex flex-1 flex-col px-3.5 pt-6 pb-4 sm:px-5">
        <div className="flex items-center justify-between gap-4 border-b border-line pb-3">
          <span className="z-label">
            {project.index} / {project.heroLabel}
          </span>
          <span aria-hidden="true" className="text-ice transition-transform duration-500 ease-[var(--z-ease)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
            ↗
          </span>
        </div>
        <div className={cn("mt-5 gap-4", feature && "sm:flex sm:items-end sm:justify-between")}>
          <Heading
            className={cn(
              "font-display font-bold text-ink transition-colors duration-300 group-hover:text-ice",
              feature ? "text-3xl sm:text-5xl" : "text-2xl sm:text-3xl",
            )}
          >
            {project.title}
          </Heading>
          <p className={cn("mt-3 text-sm leading-relaxed text-muted", feature && "max-w-md sm:mt-0")}>
            {feature ? project.homeSummary : project.summary}
          </p>
        </div>
      </div>
    </Link>
  );
}
