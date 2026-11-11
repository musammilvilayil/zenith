import { Link, useParams } from "react-router-dom";
import PageHead from "@/components/layout/PageHead";
import CtaBanner from "@/components/ui/CtaBanner";
import PageHero from "@/components/ui/PageHero";
import { DELIVERY_STEPS, SERVICE_DETAILS } from "@/data/services";
import NotFoundPage from "./NotFoundPage";

export default function ServiceDetailPage() {
  const { slug } = useParams();
  const detail = SERVICE_DETAILS[slug];

  if (!detail) return <NotFoundPage />;

  return (
    <>
      <PageHead />
      <PageHero
        eyebrow="Service"
        title={detail.title}
        description={detail.description}
        actions={
          <>
            <Link
              to={`/contact/?service=${encodeURIComponent(slug)}`}
              className="rounded-full bg-ice px-6 py-3 text-xs font-bold text-midnight transition hover:bg-white"
            >
              Discuss this service
            </Link>
            <Link
              to="/work/"
              className="rounded-full border border-ice/35 px-6 py-3 text-xs font-semibold text-ink transition hover:border-ice hover:bg-navy/50"
            >
              See relevant work
            </Link>
          </>
        }
      />

      <section className="py-20">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="max-w-3xl">
            <span className="text-xs font-bold uppercase tracking-[0.18em] text-soft-blue">
              What we deliver
            </span>
            <h2 className="mt-3 font-display text-3xl font-bold text-ink sm:text-4xl">
              A complete path from requirement to reliable operation.
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-muted">
              We combine product definition, experience design, engineering, testing, deployment
              and documentation in one accountable workflow.
            </p>
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-2">
            {DELIVERY_STEPS.map((step) => (
              <div
                key={step.num}
                className="rounded-3xl border border-ice/20 bg-navy/45 p-7 backdrop-blur"
              >
                <span className="text-xs font-bold text-ice">{step.num}</span>
                <h3 className="mt-3 font-display text-xl font-bold text-ink">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CtaBanner
        title={`Ready to plan your ${detail.title.toLowerCase()} project?`}
        primaryLabel="Discuss this service"
        primaryHref={`/contact/?service=${encodeURIComponent(slug)}`}
      />
    </>
  );
}
