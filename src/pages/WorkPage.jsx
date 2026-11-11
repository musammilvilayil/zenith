import { Link } from "react-router-dom";
import PageHead from "@/components/layout/PageHead";
import CtaBanner from "@/components/ui/CtaBanner";
import PageHero from "@/components/ui/PageHero";
import { CASE_STUDIES } from "@/data/work";

export default function WorkPage() {
  return (
    <>
      <PageHead />
      <PageHero
        eyebrow="Selected work"
        title="Systems built around real constraints."
        description="Each project starts with a specific operational problem and becomes a product that people can understand, use and maintain."
      />

      <section className="py-20">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="grid gap-8 md:grid-cols-2">
            {CASE_STUDIES.map((project) => (
              <Link
                key={project.slug}
                to={`/work/${project.slug}/`}
                className="zenith-card group flex flex-col overflow-hidden rounded-3xl border border-ice/20 bg-navy/45 hover:border-ice/45 hover:bg-navy/70"
              >
                <div className="relative overflow-hidden border-b border-ice/15">
                  <img
                    src={project.image}
                    alt={project.imageAlt}
                    className="aspect-[4/3] w-full object-cover transition duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.03] md:aspect-video"
                  />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-midnight/75 via-transparent to-transparent" />
                  <span className="absolute bottom-3 left-5 text-[10px] font-bold uppercase tracking-[0.18em] text-ice">
                    {project.index} · {project.category}
                  </span>
                </div>
                <div className="p-7">
                  <h2 className="font-display text-2xl font-bold text-ink transition-colors group-hover:text-ice">
                    {project.title}
                  </h2>
                  <p className="mt-3 text-sm leading-relaxed text-muted">{project.summary}</p>
                  <span className="mt-5 inline-flex items-center gap-2 text-xs font-bold text-ice">
                    View case study <span aria-hidden="true">↗</span>
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <CtaBanner title="Have a similar challenge?" primaryLabel="Start a conversation" />
    </>
  );
}
