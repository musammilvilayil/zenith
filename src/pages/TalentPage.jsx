import { Link } from "react-router-dom";
import PageHead from "@/components/layout/PageHead";
import EnquiryForm from "@/components/ui/EnquiryForm";
import PageHero from "@/components/ui/PageHero";
import { SITE } from "@/data/site";

const ROLES = [
  {
    area: "Development",
    title: "Frontend & full stack",
    desc: "Responsive interfaces, APIs, databases, integrations and production fixes.",
  },
  {
    area: "Design",
    title: "UI/UX & visual systems",
    desc: "Research, wireframes, page composition, brand systems and responsive detail.",
  },
  {
    area: "Mobile",
    title: "App development",
    desc: "Flutter, React Native, mobile workflows, notifications and device features.",
  },
  {
    area: "Quality",
    title: "QA & documentation",
    desc: "Test cases, device checks, issue reporting, user guides and delivery evidence.",
  },
  {
    area: "Growth",
    title: "Content & marketing",
    desc: "Case studies, launch posts, reels, business outreach and content operations.",
  },
  {
    area: "Technology",
    title: "AI, cloud & IoT",
    desc: "Automation, deployment, monitoring, devices, data flows and technical prototypes.",
  },
];

const PROCESS_STEPS = [
  { num: "01", title: "Apply", desc: "Share your role, current ability, portfolio and learning goals." },
  { num: "02", title: "Review", desc: "We assess fit honestly and may request a small practical task." },
  { num: "03", title: "Onboard", desc: "Understand workflow, communication, Git and quality expectations." },
  { num: "04", title: "Contribute", desc: "Start with defined work that matches your current capability." },
  { num: "05", title: "Improve", desc: "Use review feedback to strengthen the work and your process." },
  { num: "06", title: "Grow", desc: "Earn larger responsibilities and paid opportunities through consistency." },
];

const GAINS = [
  {
    title: "Real context",
    desc: "Understand why a client needs the work and what success means.",
  },
  {
    title: "Professional review",
    desc: "Receive actionable feedback on design, code and delivery habits.",
  },
  {
    title: "Team experience",
    desc: "Work with handoffs, ownership, deadlines and version control.",
  },
  {
    title: "Portfolio evidence",
    desc: "Build approved case-study material from work you genuinely understand.",
  },
];

export default function TalentPage() {
  return (
    <>
      <PageHead />
      <PageHero
        eyebrow="Zenith Talent Network"
        title="Learn by building. Earn by delivering. Grow with Zenith."
        description="A supervised talent network for emerging developers, designers, creators and technology specialists who want real responsibilities, honest feedback and demonstrable project experience."
        actions={
          <>
            <a
              href="#apply"
              className="rounded-full bg-ice px-6 py-3 text-xs font-bold text-midnight transition hover:bg-white"
            >
              Apply to join
            </a>
            <Link
              to="/work/"
              className="rounded-full border border-ice/35 px-6 py-3 text-xs font-semibold text-ink transition hover:border-ice hover:bg-navy/50"
            >
              See the standard of work
            </Link>
          </>
        }
      />

      <section className="py-20">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="max-w-3xl">
            <span className="text-xs font-bold uppercase tracking-[0.18em] text-soft-blue">
              Who this is for
            </span>
            <h2 className="mt-3 font-display text-3xl font-bold text-ink sm:text-4xl">
              People who want responsibility—not only a certificate.
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-muted">
              Experience level matters less than consistency, learning speed, communication and the
              willingness to improve work after review.
            </p>
          </div>

          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {ROLES.map((role) => (
              <article
                key={role.title}
                className="rounded-3xl border border-ice/20 bg-navy/45 p-7 backdrop-blur"
              >
                <span className="text-xs font-bold uppercase tracking-[0.16em] text-ice">
                  {role.area}
                </span>
                <h3 className="mt-2 font-display text-xl font-bold text-ink">{role.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{role.desc}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-ice/15 bg-deep/90 py-20">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="max-w-3xl">
            <span className="text-xs font-bold uppercase tracking-[0.18em] text-soft-blue">
              How participation works
            </span>
            <h2 className="mt-3 font-display text-3xl font-bold text-ink sm:text-4xl">
              Contribution grows with demonstrated reliability.
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-muted">
              Applying does not guarantee immediate paid work. Opportunities depend on project
              needs, skill fit, availability and the quality of completed review tasks.
            </p>
          </div>

          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {PROCESS_STEPS.map((step) => (
              <div
                key={step.num}
                className="rounded-2xl border border-ice/15 bg-navy/40 p-6 backdrop-blur"
              >
                <span className="text-xs font-bold text-ice">{step.num}</span>
                <h3 className="mt-2 font-display text-lg font-bold text-ink">{step.title}</h3>
                <p className="mt-1.5 text-sm text-muted">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <span className="text-xs font-bold uppercase tracking-[0.18em] text-soft-blue">
            What you gain
          </span>
          <h2 className="mt-3 font-display text-3xl font-bold text-ink sm:text-4xl">
            Evidence of capability that is stronger than a generic internship line.
          </h2>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {GAINS.map((gain) => (
              <div
                key={gain.title}
                className="rounded-2xl border border-ice/15 bg-navy/40 p-6 backdrop-blur"
              >
                <strong className="block font-display text-lg text-ink">{gain.title}</strong>
                <span className="mt-2 block text-sm leading-relaxed text-muted">{gain.desc}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="apply" className="border-t border-ice/15 bg-deep/90 py-20">
        <div className="mx-auto grid max-w-7xl gap-12 px-5 sm:px-8 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
          <aside className="space-y-6">
            <span className="text-xs font-bold uppercase tracking-[0.18em] text-soft-blue">
              Application
            </span>
            <h2 className="font-display text-3xl font-bold leading-tight text-ink sm:text-4xl">
              Show what you can do today—and what you are ready to learn next.
            </h2>
            <p className="text-base leading-relaxed text-muted">
              Be honest. A small project you understand is more valuable than a long list of tools
              you cannot explain.
            </p>
            <div className="rounded-2xl border border-ice/20 bg-midnight/70 p-6 text-sm leading-relaxed text-muted">
              <strong className="block font-display text-base text-ink">Before applying</strong>
              Prepare one portfolio, GitHub, design, writing or project link when available.
              Explain your actual contribution clearly.
            </div>
            <p className="text-sm text-muted">
              Questions about the network can be sent through WhatsApp:{" "}
              <a
                href={SITE.whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="text-ice hover:underline"
              >
                {SITE.whatsappDisplay}
              </a>
              .
            </p>
          </aside>

          <EnquiryForm mode="talent" />
        </div>
      </section>
    </>
  );
}
