import { Link, useParams } from "react-router-dom";
import PageHead from "@/components/layout/PageHead";
import CtaBanner from "@/components/ui/CtaBanner";
import PageHero from "@/components/ui/PageHero";
import { INSIGHTS } from "@/data/insights";
import NotFoundPage from "./NotFoundPage";

export default function InsightDetailPage() {
  const { id } = useParams();
  const article = INSIGHTS.find((item) => item.id === id);

  if (!article) return <NotFoundPage />;

  return (
    <>
      <PageHead />
      <PageHero
        eyebrow="Zenith insight"
        title={article.title}
        description={article.summary}
        actions={
          <Link
            to="/insights/"
            className="rounded-full border border-ice/35 px-5 py-2.5 text-xs font-semibold text-ink hover:border-ice"
          >
            ← All insights
          </Link>
        }
      />

      <article className="py-20">
        <div className="mx-auto max-w-3xl space-y-10 px-5 sm:px-8">
          {article.sections.map((section) => (
            <section key={section.heading} className="space-y-3">
              <h2 className="font-display text-2xl font-bold text-ink sm:text-3xl">
                {section.heading}
              </h2>
              <p className="text-base leading-relaxed text-muted">{section.body}</p>
            </section>
          ))}
        </div>
      </article>

      <CtaBanner title="Applying these principles to a new system?" />
    </>
  );
}
