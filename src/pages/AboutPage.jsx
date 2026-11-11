import { Link } from "react-router-dom";
import PageHead from "@/components/layout/PageHead";
import CtaBanner from "@/components/ui/CtaBanner";
import PageHero from "@/components/ui/PageHero";
import { BRAND_IMAGES } from "@/data/site";

const MODEL_CARDS = [
  {
    num: "01",
    title: "Client-first outcomes",
    desc: "Every engagement begins with the audience, business objective, scope and measurable result—not with a technology trend.",
  },
  {
    num: "02",
    title: "Supervised contribution",
    desc: "Emerging contributors work within defined roles and checkpoints. Important design, code and launch decisions are reviewed.",
  },
  {
    num: "03",
    title: "Long-term ownership",
    desc: "Projects include clear credentials, documentation, handover and support options so the client is not trapped by the delivery team.",
  },
];

const QA_STEPS = [
  { num: "01", title: "Defined roles", desc: "Each contributor knows the task, owner, deadline and review point." },
  { num: "02", title: "Approved direction", desc: "Design and architecture are confirmed before uncontrolled implementation." },
  { num: "03", title: "Code review", desc: "Implementation is checked for clarity, security and maintainability." },
  { num: "04", title: "QA checklist", desc: "Responsive, content, functional and production checks are recorded." },
  { num: "05", title: "Client approval", desc: "Milestones remain visible and key decisions are confirmed." },
  { num: "06", title: "Handover", desc: "Access, documentation and the next maintenance step are made clear." },
];

const VALUES = [
  { title: "Clarity", desc: "Plain communication, visible scope and honest trade-offs." },
  { title: "Craft", desc: "Thoughtful details that improve trust, usability and maintainability." },
  { title: "Responsibility", desc: "Ownership of deadlines, quality, data and client confidence." },
  { title: "Growth", desc: "Every project should improve the business and the people who build it." },
];

export default function AboutPage() {
  return (
    <>
      <PageHead />
      <PageHero
        eyebrow="About Zenith"
        title="A digital agency designed to grow businesses and people."
        description="Zenith Softworks combines product thinking, premium design, practical engineering and supervised emerging talent to deliver work that clients can trust and contributors can learn from."
        aside={
          <div className="overflow-hidden rounded-3xl border border-ice/25 bg-midnight/60 p-2 shadow-2xl">
            <img
              src={BRAND_IMAGES.heroAbstractImg}
              alt="Zenith Softworks visual identity"
              className="aspect-[16/10] w-full rounded-2xl object-cover"
            />
          </div>
        }
      />

      <section className="py-20">
        <div className="mx-auto grid max-w-7xl gap-10 px-5 sm:px-8 lg:grid-cols-2 lg:items-center">
          <p className="font-display text-3xl font-bold leading-tight text-ink sm:text-4xl">
            Professional delivery should create value on both sides of the project.
          </p>
          <p className="text-base leading-relaxed text-muted">
            Clients need clear communication, dependable quality and a digital product they can
            own. Emerging talent needs real briefs, review, responsibility and evidence of
            capability. Zenith is built to connect those needs without lowering the standard of
            delivery.
          </p>
        </div>
      </section>

      <section className="border-y border-ice/15 bg-deep/90 py-20">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="max-w-3xl">
            <span className="text-xs font-bold uppercase tracking-[0.18em] text-soft-blue">
              The model
            </span>
            <h2 className="mt-3 font-display text-3xl font-bold text-ink sm:text-4xl">
              Agency discipline. Talent-studio energy.
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-muted">
              Zenith is not positioned as a large corporation, a generic freelance page or a
              ready-made academic-project shop. It is a growing delivery studio with a controlled
              workflow.
            </p>
          </div>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {MODEL_CARDS.map((card) => (
              <article
                key={card.num}
                className="rounded-3xl border border-ice/20 bg-navy/45 p-7 backdrop-blur"
              >
                <span className="text-xs font-bold text-ice">{card.num}</span>
                <h3 className="mt-3 font-display text-xl font-bold text-ink">{card.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{card.desc}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="max-w-3xl">
            <span className="text-xs font-bold uppercase tracking-[0.18em] text-soft-blue">
              How quality is protected
            </span>
            <h2 className="mt-3 font-display text-3xl font-bold text-ink sm:text-4xl">
              Talent may be emerging. Standards are not.
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-muted">
              Real opportunities only work when the client&apos;s trust is protected through
              structure and accountability.
            </p>
          </div>

          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {QA_STEPS.map((step) => (
              <div
                key={step.num}
                className="rounded-2xl border border-ice/15 bg-navy/35 p-6 backdrop-blur"
              >
                <span className="text-xs font-bold text-ice">{step.num}</span>
                <h3 className="mt-2 font-display text-lg font-bold text-ink">{step.title}</h3>
                <p className="mt-1.5 text-sm text-muted">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-ice/15 bg-deep/90 py-20">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <span className="text-xs font-bold uppercase tracking-[0.18em] text-soft-blue">
            What we value
          </span>
          <h2 className="mt-3 font-display text-3xl font-bold text-ink sm:text-4xl">
            The principles behind the work.
          </h2>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {VALUES.map((val) => (
              <div
                key={val.title}
                className="rounded-2xl border border-ice/15 bg-navy/40 p-6 backdrop-blur"
              >
                <strong className="block font-display text-lg text-ink">{val.title}</strong>
                <span className="mt-2 block text-sm leading-relaxed text-muted">{val.desc}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="mx-auto grid max-w-7xl gap-10 px-5 sm:px-8 lg:grid-cols-2 lg:items-center">
          <div>
            <span className="text-xs font-bold uppercase tracking-[0.18em] text-soft-blue">
              For emerging talent
            </span>
            <p className="mt-3 font-display text-3xl font-bold text-ink sm:text-4xl">
              Build work that can survive a real client review.
            </p>
          </div>
          <div className="space-y-6">
            <p className="text-base leading-relaxed text-muted">
              The Zenith Talent Network is for people willing to learn through delivery, accept
              feedback and take responsibility for quality—not people looking only for a
              certificate.
            </p>
            <Link
              to="/talent/"
              className="inline-flex items-center gap-2 rounded-full bg-ice px-6 py-3 text-xs font-bold text-midnight transition hover:bg-white"
            >
              Join Zenith Talent
            </Link>
          </div>
        </div>
      </section>

      <CtaBanner
        title="Build with Zenith."
        primaryLabel="Start a client project"
        primaryHref="/contact/"
        secondaryLabel="Apply to join"
        secondaryHref="/talent/"
      />
    </>
  );
}
