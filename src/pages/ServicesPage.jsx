import { Link } from "react-router-dom";
import PageHead from "@/components/layout/PageHead";
import CtaBanner from "@/components/ui/CtaBanner";
import PageHero from "@/components/ui/PageHero";
import { PRODUCT_ENGINEERING_SERVICES, WEBSITE_PACKAGES } from "@/data/services";
import { cn } from "@/lib/utils";

const DISCIPLINES = [
  {
    title: "Clear scope",
    desc: "Deliverables, assumptions, exclusions and milestones before development.",
  },
  {
    title: "Visible reviews",
    desc: "Design approval and working checkpoints instead of a surprise final delivery.",
  },
  {
    title: "Quality control",
    desc: "Responsive, functional, content and launch checks before handover.",
  },
  {
    title: "Ownership",
    desc: "Credentials, documentation and support options that reduce dependency.",
  },
];

export default function ServicesPage() {
  return (
    <>
      <PageHead />
      <PageHero
        eyebrow="Services & engagement options"
        title="From first impression to working digital product."
        description="Choose a clear starting point, then shape the final scope around your audience, operations, content, integrations and timeline."
      />

      <section className="z-section">
        <div className="z-container">
          <div className="max-w-3xl">
            <span className="z-label z-label-accent z-eyebrow">
              Website packages
            </span>
            <h2 className="z-display-md mt-5 text-ink">
              Built to make the business look credible and easier to choose.
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-muted">
              Final pricing is confirmed after a requirement review. No hidden fake discounts, no
              copied template with a changed logo.
            </p>
          </div>

          <div className="mt-10 grid gap-6 lg:grid-cols-3">
            {WEBSITE_PACKAGES.map((pkg) => (
              <article
                key={pkg.title}
                className={cn(
                  "z-card z-card-interactive z-card-pad flex flex-col justify-between",
                  pkg.featured
                    ? "!border-ice/45 !bg-surface"
                    : "",
                )}
              >
                <div>
                  <span className="z-label z-label-accent">
                    {pkg.tier}
                  </span>
                  <h3 className="mt-2 font-display text-2xl font-bold text-ink">{pkg.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted">{pkg.summary}</p>
                  <ul className="mt-6 space-y-2.5 border-t border-line pt-5 text-sm text-ink/90">
                    {pkg.features.map((feat) => (
                      <li key={feat} className="flex items-start gap-2.5">
                        <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-ice" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <Link
                  to={pkg.ctaHref}
                  className={cn(
                    "z-btn mt-8 w-full",
                    pkg.featured
                      ? "z-btn-primary"
                      : "z-btn-secondary",
                  )}
                >
                  {pkg.ctaLabel}
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="z-section border-y border-line bg-navy/40">
        <div className="z-container">
          <div className="max-w-3xl">
            <span className="z-label z-label-accent z-eyebrow">
              Product engineering
            </span>
            <h2 className="z-display-md mt-5 text-ink">
              When the requirement goes beyond a website.
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-muted">
              We define the workflow first, then choose architecture and technology that fit the
              problem.
            </p>
          </div>

          <div className="mt-10 divide-y divide-line border-t border-line">
            {PRODUCT_ENGINEERING_SERVICES.map((item) => (
              <article
                key={item.slug}
                className="grid gap-4 py-7 md:grid-cols-[56px_1.1fr_1.4fr_auto] md:items-center"
              >
                <span className="z-num">{item.num}</span>
                <h3 className="font-display text-xl font-bold text-ink">{item.title}</h3>
                <p className="text-sm leading-relaxed text-muted">{item.description}</p>
                <Link
                  to={`/services/${item.slug}/`}
                  className="text-xs font-bold text-ice transition hover:text-white"
                >
                  {item.cta}
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="z-section">
        <div className="z-container">
          <span className="z-label z-label-accent z-eyebrow">
            Included discipline
          </span>
          <h2 className="z-display-md mt-5 text-ink">
            Every engagement is more than design and code.
          </h2>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {DISCIPLINES.map((item) => (
              <div
                key={item.title}
                className="z-card p-6"
              >
                <strong className="block font-display text-lg text-ink">{item.title}</strong>
                <span className="mt-2 block text-sm leading-relaxed text-muted">{item.desc}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CtaBanner
        title="Tell us what the business needs to achieve."
        primaryLabel="Request a project review"
        primaryHref="/contact/"
      />
    </>
  );
}
