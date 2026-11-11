import { Link, useParams } from "react-router-dom";
import PageHead from "@/components/layout/PageHead";
import Button from "@/components/ui/Button";
import CtaBanner from "@/components/ui/CtaBanner";
import PageHero from "@/components/ui/PageHero";
import SectionHeading from "@/components/ui/SectionHeading";
import { CASE_STUDIES, CASE_STUDY_PILLARS } from "@/data/work";
import NotFoundPage from "./NotFoundPage";

export default function WorkDetailPage() {
  const { slug } = useParams();
  const index = CASE_STUDIES.findIndex((item) => item.slug === slug);
  const project = CASE_STUDIES[index];

  if (!project) return <NotFoundPage />;

  const prev = CASE_STUDIES[(index - 1 + CASE_STUDIES.length) % CASE_STUDIES.length];
  const next = CASE_STUDIES[(index + 1) % CASE_STUDIES.length];

  return (
    <>
      <PageHead />
      <PageHero
        crumb={project.title}
        eyebrow={`Case study · ${project.category}`}
        title={project.title}
        description={project.summary}
        meta={`${project.index} / ${String(CASE_STUDIES.length).padStart(2, "0")}`}
        actions={
          <>
            <Button to="/contact/">Discuss a similar project</Button>
            <Button to="/work/" variant="secondary" arrow={null}>
              All work
            </Button>
          </>
        }
      />

      <section className="z-section pt-0">
        <div className="z-container">
          <figure className="z-glass -mt-6 overflow-hidden rounded-[1.75rem] p-2 sm:-mt-10">
            <img
              src={project.image}
              alt={project.imageAlt}
              width="1376"
              height="768"
              fetchPriority="high"
              className="aspect-[4/3] w-full rounded-[1.35rem] object-cover sm:aspect-video"
            />
          </figure>

          <dl className="mt-6 grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-3">
            {[
              ["Industry", project.category],
              ["Scope", project.heroLabel],
              ["Focus", project.tags.join(" · ")],
            ].map(([term, value]) => (
              <div key={term} className="bg-midnight p-6">
                <dt className="z-label">{term}</dt>
                <dd className="mt-2 font-display text-lg font-semibold text-ink">{value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className="z-section border-t border-line">
        <div className="z-container">
          <SectionHeading
            index="Project narrative"
            meta={project.title}
            title="From problem to product foundation."
            size="md"
            description={project.homeSummary}
          />
          <div className="mt-14 grid gap-5 md:grid-cols-2">
            {CASE_STUDY_PILLARS.map((pillar) => (
              <article key={pillar.num} className="z-card z-card-pad">
                <span className="z-num">{pillar.num}</span>
                <h2 className="mt-8 font-display text-2xl font-bold text-ink">{pillar.title}</h2>
                <p className="mt-3 text-sm leading-relaxed text-muted">{pillar.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <nav aria-label="More projects" className="border-t border-line">
        <div className="z-container grid sm:grid-cols-2">
          {[
            ["Previous project", prev, "←"],
            ["Next project", next, "→"],
          ].map(([label, item, arrow], idx) => (
            <Link
              key={label}
              to={`/work/${item.slug}/`}
              className={`group py-10 transition-colors hover:bg-navy/40 sm:px-6 ${idx === 1 ? "border-t border-line text-right sm:border-t-0 sm:border-l" : ""}`}
            >
              <span className="z-label">{label}</span>
              <span className="mt-3 block font-display text-2xl font-bold text-ink transition-colors group-hover:text-ice sm:text-3xl">
                {idx === 0 && <span aria-hidden="true">{arrow} </span>}
                {item.title}
                {idx === 1 && <span aria-hidden="true"> {arrow}</span>}
              </span>
            </Link>
          ))}
        </div>
      </nav>

      <CtaBanner title="Have a similar challenge?" primaryLabel="Start a conversation" />
    </>
  );
}
