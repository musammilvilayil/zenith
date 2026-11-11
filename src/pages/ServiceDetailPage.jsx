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
              className="z-btn z-btn-primary"
            >
              Discuss this service
            </Link>
            <Link
              to="/work/"
              className="z-btn z-btn-secondary"
            >
              See relevant work
            </Link>
          </>
        }
      />

      <section className="z-section">
        <div className="z-container">
          <div className="max-w-3xl">
            <span className="z-label z-label-accent z-eyebrow">
              What we deliver
            </span>
            <h2 className="z-display-md mt-5 text-ink">
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
                className="z-card z-card-pad"
              >
                <span className="z-num">{step.num}</span>
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
