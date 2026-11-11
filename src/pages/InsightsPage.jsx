import { Link } from "react-router-dom";
import PageHead from "@/components/layout/PageHead";
import PageHero from "@/components/ui/PageHero";
import { INSIGHTS } from "@/data/insights";

export default function InsightsPage() {
  return (
    <>
      <PageHead />
      <PageHero
        eyebrow="Insights"
        title="Clear thinking for digital product decisions."
        description="Practical writing on software, AI, product architecture and responsible delivery."
      />

      <section className="z-section">
        <div className="z-container">
          <div className="grid gap-6 md:grid-cols-3">
            {INSIGHTS.map((article) => (
              <article
                key={article.id}
                className="flex flex-col justify-between z-card p-7 backdrop-blur transition hover:-translate-y-1 hover:border-ice/45"
              >
                <div>
                  <span className="z-label z-label-accent">
                    Insight
                  </span>
                  <h2 className="mt-3 font-display text-2xl font-bold text-ink">{article.title}</h2>
                  <p className="mt-3 text-sm leading-relaxed text-muted">{article.summary}</p>
                </div>
                <Link
                  to={`/insights/${article.id}/`}
                  className="mt-6 inline-flex text-xs font-bold text-ice hover:underline"
                >
                  Read article →
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
