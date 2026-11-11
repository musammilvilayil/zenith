import { useParams } from "react-router-dom";
import PageHead from "@/components/layout/PageHead";
import CtaBanner from "@/components/ui/CtaBanner";
import PageHero from "@/components/ui/PageHero";
import { CASE_STUDIES, CASE_STUDY_PILLARS } from "@/data/work";
import NotFoundPage from "./NotFoundPage";

export default function WorkDetailPage() {
  const { slug } = useParams();
  const project = CASE_STUDIES.find((item) => item.slug === slug);

  if (!project) return <NotFoundPage />;

  return (
    <>
      <PageHead />
      <PageHero
        eyebrow={`Case study · ${project.category}`}
        title={project.title}
        description={project.summary}
        aside={
          <div className="overflow-hidden rounded-3xl border border-ice/25 bg-midnight/60 p-2 shadow-2xl">
            <img
              src={project.image}
              alt={project.imageAlt}
              className="aspect-[4/3] w-full rounded-2xl object-cover"
            />
          </div>
        }
      />

      <section className="py-20">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="grid gap-6 md:grid-cols-2">
            {CASE_STUDY_PILLARS.map((pillar) => (
              <div
                key={pillar.num}
                className="rounded-3xl border border-ice/20 bg-navy/45 p-7 backdrop-blur"
              >
                <span className="text-xs font-bold text-ice">{pillar.num}</span>
                <h2 className="mt-3 font-display text-2xl font-bold text-ink">{pillar.title}</h2>
                <p className="mt-2 text-sm leading-relaxed text-muted">{pillar.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CtaBanner title="Have a similar challenge?" primaryLabel="Start a conversation" />
    </>
  );
}
