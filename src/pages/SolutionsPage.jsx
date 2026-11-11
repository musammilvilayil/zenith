import { Link } from "react-router-dom";
import PageHead from "@/components/layout/PageHead";
import CtaBanner from "@/components/ui/CtaBanner";
import PageHero from "@/components/ui/PageHero";

const AUDIENCES = [
  {
    num: "01",
    title: "Local and growing businesses",
    desc: "Premium websites, catalogues, booking flows, lead generation, internal tools and ongoing maintenance that make the business easier to trust and operate.",
    cta: "Start a business project →",
    to: "/contact/?service=Business%20website",
  },
  {
    num: "02",
    title: "Professionals and creators",
    desc: "Personal brands, portfolios, service websites, course platforms, content systems and digital storefronts designed around reputation and conversion.",
    cta: "Build your presence →",
    to: "/contact/?service=Business%20website",
  },
  {
    num: "03",
    title: "Startups and product teams",
    desc: "Product discovery, prototypes, MVPs, dashboards, mobile applications and scalable foundations for testing a real market.",
    cta: "Discuss an MVP →",
    to: "/contact/?service=Startup%20MVP",
  },
  {
    num: "04",
    title: "Institutions and operational teams",
    desc: "Portals, workflow systems, reporting dashboards, document processes and connected systems for structured daily operations.",
    cta: "Review a workflow →",
    to: "/contact/?service=Web%20application",
  },
  {
    num: "05",
    title: "Students and emerging builders",
    desc: "Project-direction discovery, architecture guidance, supervised prototypes, documentation structure and opportunities to contribute through the Zenith Talent Network.",
    cta: "Explore Student Lab →",
    to: "/student-projects/",
  },
];

const STARTING_POINTS = [
  {
    code: "A",
    quote: "“Our business looks outdated online.”",
    answer: "We review positioning, structure, content and visual trust, then plan a premium redesign.",
  },
  {
    code: "B",
    quote: "“Too much work is manual.”",
    answer: "We map the repeated workflow and define a practical portal, dashboard or automation.",
  },
  {
    code: "C",
    quote: "“We have a product idea.”",
    answer: "We reduce it to a testable scope, prototype the experience and plan a maintainable MVP.",
  },
];

export default function SolutionsPage() {
  return (
    <>
      <PageHead />
      <PageHero
        eyebrow="Who we build for"
        title="Different ambitions need different digital systems."
        description="The engagement changes with the audience and stage. The standards for scope, review, testing and handover remain the same."
      />

      <section className="py-20">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="divide-y divide-ice/15 border-t border-ice/15">
            {AUDIENCES.map((item) => (
              <article
                key={item.num}
                className="grid gap-4 py-8 md:grid-cols-[56px_1.1fr_1.4fr_auto] md:items-center"
              >
                <span className="text-xs font-bold text-ice">{item.num}</span>
                <h2 className="font-display text-2xl font-bold text-ink">{item.title}</h2>
                <p className="text-sm leading-relaxed text-muted">{item.desc}</p>
                <Link
                  to={item.to}
                  className="text-xs font-bold text-ice transition hover:text-white"
                >
                  {item.cta}
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-ice/15 bg-deep/90 py-20">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <span className="text-xs font-bold uppercase tracking-[0.18em] text-soft-blue">
            Common starting points
          </span>
          <h2 className="mt-3 font-display text-3xl font-bold text-ink sm:text-4xl">
            Bring the problem—even when the final feature list is unclear.
          </h2>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {STARTING_POINTS.map((item) => (
              <article
                key={item.code}
                className="rounded-3xl border border-ice/20 bg-navy/45 p-7 backdrop-blur"
              >
                <span className="text-xs font-bold text-ice">{item.code}</span>
                <h3 className="mt-3 font-display text-xl font-bold text-ink">{item.quote}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{item.answer}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <CtaBanner title="Explain the problem. We will shape the next step." />
    </>
  );
}
