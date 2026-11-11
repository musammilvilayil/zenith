import { Link } from "react-router-dom";
import GhostFibers from "@/components/fx/GhostFibers";
import InterferenceRibbons from "@/components/fx/InterferenceRibbons";
import LuminousFilaments from "@/components/fx/LuminousFilaments";
import VoxelArc from "@/components/fx/VoxelArc";
import PageHead from "@/components/layout/PageHead";
import { BRAND_IMAGES, SITE } from "@/data/site";
import { CASE_STUDIES } from "@/data/work";

const MARQUEE_ITEMS = [
  "Digital experiences",
  "Websites that work",
  "Useful applications",
  "Brands with purpose",
];

const HOME_SERVICES = [
  {
    num: "01",
    name: "Websites & digital presence",
    desc: "Distinctive, responsive websites designed to build trust and turn attention into enquiries.",
    to: "/services/",
  },
  {
    num: "02",
    name: "Web & mobile applications",
    desc: "Useful platforms, dashboards, portals and apps built around real workflows.",
    to: "/contact/?service=Web%20application",
  },
  {
    num: "03",
    name: "E-commerce & booking",
    desc: "Clear customer journeys, product catalogues, booking flows and operational tools.",
    to: "/contact/?service=E-commerce%20website",
  },
  {
    num: "04",
    name: "Brand, UI/UX & product design",
    desc: "A coherent visual language and interfaces that feel natural to use.",
    to: "/contact/?service=Branding%20and%20UI%2FUX",
  },
  {
    num: "05",
    name: "Launch, care & improvement",
    desc: "Deployment, maintenance and continuous improvements after launch.",
    to: "/contact/?service=Website%20maintenance",
  },
];

const APPROACH_STEPS = [
  {
    num: "01",
    title: "Listen & discover",
    desc: "Goals, audience, constraints and the real problem to solve.",
    arrow: "↘",
  },
  {
    num: "02",
    title: "Shape the direction",
    desc: "Scope, content, user journeys and a shared design direction.",
    arrow: "↘",
  },
  {
    num: "03",
    title: "Design & build",
    desc: "Thoughtful interfaces and maintainable engineering in clear milestones.",
    arrow: "↘",
  },
  {
    num: "04",
    title: "Test & launch",
    desc: "Responsive checks, functional review, deployment and handover.",
    arrow: "↗",
  },
];

const PACKAGES = [
  {
    num: "01",
    title: "Business website",
    desc: "A credible, enquiry-ready presence for a business or professional.",
    to: "/contact/?service=Business%20website",
  },
  {
    num: "02",
    title: "Website + growth system",
    desc: "Richer content, lead journeys, bookings, catalogues and optimisation.",
    to: "/contact/?service=Growth%20website",
  },
  {
    num: "03",
    title: "Custom application",
    desc: "A portal, SaaS product, mobile app or internal platform built to fit.",
    to: "/contact/?service=Web%20application",
  },
];

const TALENT_VALUES = [
  {
    num: "01",
    title: "Real briefs",
    desc: "Work shaped around actual users and goals.",
  },
  {
    num: "02",
    title: "Clear ownership",
    desc: "Roles, milestones and expectations defined early.",
  },
  {
    num: "03",
    title: "Quality reviews",
    desc: "Design, code and delivery reviewed thoughtfully.",
  },
  {
    num: "04",
    title: "Portfolio evidence",
    desc: "Demonstrable work—not empty promises.",
  },
];

export default function HomePage() {
  const megham = CASE_STUDIES[0];
  const carematrix = CASE_STUDIES[1];
  const sheShield = CASE_STUDIES[2];

  return (
    <>
      <PageHead />

      {/* 01 / HERO */}
      <section className="relative isolate flex min-h-[calc(100svh-76px)] flex-col justify-between overflow-hidden bg-gradient-to-br from-midnight via-navy/85 to-deep px-5 py-5 sm:px-8 sm:py-7">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-10 opacity-20"
          style={{
            backgroundImage:
              "linear-gradient(rgba(193,232,255,.12) 1px,transparent 1px),linear-gradient(90deg,rgba(193,232,255,.12) 1px,transparent 1px)",
            backgroundSize: "64px 64px",
            maskImage: "linear-gradient(90deg,transparent 0%,black 35%,black 85%,transparent 100%)",
          }}
        />

        <GhostFibers
          glowColor="#2563eb"
          layers={3}
          twist={1.6}
          threads={38}
          fiberStyle="dots"
          depthOfField={0.85}
          hoverEffect="focus"
          intro
          mouseInteraction
          lineColor="#edf3ff"
          secondaryColor="#80b2ff"
          gradient="across"
          waves={0.5}
          spread={2}
          foldGlow={1.3}
          brightness={1.6}
          vignette={0}
          mouseStrength={1.15}
        />

        <div className="relative z-10 mx-auto flex w-full max-w-7xl items-center justify-between gap-4 border-b border-ice/15 pb-3.5 text-[10px] font-semibold tracking-[0.18em] text-muted sm:text-[11px]">
          <span>INDEPENDENT DIGITAL STUDIO</span>
          <span className="text-right">KERALA, INDIA · AVAILABLE FOR SELECT PROJECTS</span>
        </div>

        <div className="relative z-10 mx-auto grid w-full max-w-7xl items-center gap-8 py-6 sm:py-8 lg:grid-cols-12 lg:gap-10 lg:py-10">
          <div className="lg:col-span-7">
            <p className="inline-flex items-center gap-2.5 text-[11px] font-bold uppercase tracking-[0.17em] text-ice/90">
              <span className="inline-block h-2 w-2 rounded-full bg-ice shadow-[0_0_18px_rgba(193,232,255,0.85)]" />
              A little ambition changes everything
            </p>
            <h1 className="mt-4 font-display text-4xl font-bold leading-[1.02] tracking-tight text-ink sm:text-6xl lg:text-7xl xl:text-[5.5rem]">
              Every big idea
              <br />
              starts <em className="zenith-gradient-text not-italic">somewhere.</em>
            </h1>
            <div className="mt-6 flex flex-col items-start justify-between gap-5 sm:flex-row sm:items-end lg:mt-8">
              <p className="max-w-md text-sm leading-relaxed text-muted sm:text-base">
                We turn ambitious ideas into digital experiences people can feel, understand and
                use. Thoughtful strategy. Distinctive design. Technology built for what comes next.
              </p>
              <div className="flex flex-wrap items-center gap-4">
                <Link
                  to="/contact/"
                  className="inline-flex items-center gap-3.5 rounded-full bg-ice py-2.5 pr-3 pl-5 text-xs font-bold text-midnight transition hover:-translate-y-0.5 hover:bg-white"
                >
                  Let&apos;s make it real
                  <span className="grid h-7 w-7 place-items-center rounded-full bg-navy text-sm text-white">
                    ↗
                  </span>
                </Link>
                <a
                  href="#work"
                  className="inline-flex items-center gap-2 text-xs font-semibold text-ink/90 transition hover:text-ice"
                >
                  Explore our work <span className="text-ice">↓</span>
                </a>
              </div>
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-md lg:col-span-5 lg:max-w-none">
            <div className="zenith-card relative overflow-hidden rounded-3xl border border-ice/25 bg-navy/85 p-2 shadow-[0_0_90px_-20px_rgba(37,99,235,0.45)]">
              <img
                src={BRAND_IMAGES.heroAbstractImg}
                alt="Zenith Softworks architectural light prism and orbital rings"
                className="aspect-[16/10] max-h-[34vh] w-full rounded-2xl object-cover lg:max-h-[44vh]"
              />
              <div className="flex items-center justify-between px-3 pt-2.5 pb-1 text-[10px] font-semibold tracking-[0.16em] text-soft-blue">
                <span>01 / THE START</span>
                <span>IMAGINE WHAT&apos;S NEXT</span>
              </div>
            </div>
          </div>
        </div>

        <div className="relative z-10 mx-auto flex w-full max-w-7xl items-center justify-between gap-4 border-t border-ice/15 pt-3.5 text-[10px] font-semibold tracking-[0.16em] text-muted sm:text-[11px]">
          <span>01</span>
          <span className="hidden text-ice sm:inline">IDEA → IMPACT</span>
          <span>SCROLL TO EXPLORE ↓</span>
        </div>
      </section>

      {/* MARQUEE */}
      <section
        aria-label="Our capabilities"
        className="relative z-20 -mx-2 -rotate-1 overflow-hidden bg-ice py-3 text-midnight shadow-lg shadow-steel/20"
      >
        <div className="zenith-marquee-track font-display text-sm font-bold tracking-wide">
          {[...MARQUEE_ITEMS, ...MARQUEE_ITEMS].map((item, idx) => (
            <span key={`${item}-${idx}`} className="inline-flex items-center gap-6">
              <span>{item}</span>
              <span aria-hidden="true" className="text-base">
                ✳
              </span>
            </span>
          ))}
        </div>
      </section>

      {/* 02 / THE REASON — LuminousFilaments */}
      <section
        id="story"
        className="relative isolate overflow-hidden bg-gradient-to-b from-deep to-midnight py-16 sm:py-24 lg:py-32"
      >
        <LuminousFilaments
          coreColor="#edf3ff"
          fiberColor="#c1e8ff"
          secondaryColor="#2563eb"
          originX={0.88}
          originY={0.24}
          baseAngle={Math.PI * 0.94}
          spreadAngle={Math.PI * 0.78}
          filamentCount={26}
          opacity={0.68}
        />

        <div className="relative z-10 mx-auto w-full max-w-7xl px-5 sm:px-8">
          <div className="flex items-center justify-between gap-4 border-b border-ice/15 pb-4 text-[11px] font-semibold tracking-[0.16em] text-muted">
            <span>02 / THE REASON</span>
            <span className="text-soft-blue">BUILT AROUND PEOPLE</span>
          </div>

          <div className="grid gap-10 py-12 sm:py-14 lg:grid-cols-12 lg:items-start lg:gap-12">
            <div className="lg:col-span-7">
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-ice">
                Behind the pixels
              </p>
              <h2 className="mt-4 font-display text-3xl font-semibold leading-[1.08] text-ink sm:text-5xl lg:text-6xl">
                Technology is only powerful when it{" "}
                <em className="zenith-gradient-text not-italic">means something.</em>
              </h2>
            </div>

            <div className="space-y-5 lg:col-span-5 lg:pt-4">
              <p className="text-lg leading-relaxed text-ink sm:text-xl">
                A website is a first impression. An application can remove a daily frustration. A
                well-built system can give a growing team room to breathe.
              </p>
              <p className="text-sm leading-relaxed text-muted sm:text-base">
                That is how we think at Zenith. We start by understanding the people, the problem
                and the possibility—then shape the right digital answer, without adding complexity
                just to look clever.
              </p>
              <Link
                to="/about/"
                className="inline-flex items-center gap-6 border-b border-ice/40 py-3 text-xs font-semibold tracking-wide text-ink transition hover:border-ice hover:text-ice"
              >
                Get to know the studio <span className="text-ice">↗</span>
              </Link>
            </div>
          </div>

          <div className="flex flex-col justify-between gap-3 border-t border-ice/15 pt-5 text-[10px] font-semibold tracking-[0.14em] text-soft-blue sm:flex-row">
            <span>GOOD DESIGN MAKES IT CLEAR.</span>
            <span>GOOD ENGINEERING MAKES IT LAST.</span>
            <span>GOOD COLLABORATION MAKES IT POSSIBLE.</span>
          </div>
        </div>
      </section>

      {/* 03 / WHAT WE MAKE (Light section) */}
      <section
        id="services"
        className="bg-gradient-to-br from-[#EAF7FF] to-[#D7E9F7] py-16 text-light-ink sm:py-24 lg:py-32"
      >
        <div className="mx-auto w-full max-w-7xl px-5 sm:px-8">
          <div className="flex items-center justify-between gap-4 border-b border-navy/20 pb-4 text-[11px] font-semibold tracking-[0.16em] text-light-muted">
            <span>03 / WHAT WE MAKE</span>
            <span>FROM FIRST THOUGHT TO LIVE PRODUCT</span>
          </div>

          <div className="flex flex-col justify-between gap-6 py-10 sm:py-12 lg:flex-row lg:items-end">
            <h2 className="font-display text-3xl font-bold leading-[1.08] text-light-ink sm:text-5xl lg:text-6xl">
              Different challenges.
              <br />
              <em className="zenith-gradient-text-dark not-italic">One thoughtful process.</em>
            </h2>
            <p className="max-w-xs text-sm leading-relaxed text-light-muted">
              We choose the right tools for the problem—not the other way around.
            </p>
          </div>

          <div className="border-t border-navy/20">
            {HOME_SERVICES.map((svc) => (
              <Link
                key={svc.num}
                to={svc.to}
                className="group block border-b border-navy/20 py-6 transition-all duration-200 hover:bg-white/40 hover:px-4 sm:py-7"
              >
                <div className="flex flex-col gap-3 md:grid md:grid-cols-12 md:items-center md:gap-6">
                  <div className="flex items-center justify-between md:col-span-5 md:gap-6">
                    <div className="flex items-center gap-4 sm:gap-6">
                      <span className="font-mono text-xs font-bold tracking-wider text-[#1e40af] sm:text-sm">
                        {svc.num}
                      </span>
                      <span className="font-display text-xl font-bold text-slate-900 transition-colors group-hover:text-[#1e40af] sm:text-2xl">
                        {svc.name}
                      </span>
                    </div>
                    <span className="text-xl font-bold text-[#1e40af] md:hidden">↗</span>
                  </div>

                  <p className="text-sm leading-relaxed text-slate-600 sm:text-base md:col-span-6">
                    {svc.desc}
                  </p>

                  <div className="hidden text-right text-xl font-bold text-[#1e40af] transition-transform duration-200 group-hover:translate-x-1 group-hover:-translate-y-1 md:col-span-1 md:block">
                    ↗
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 04 / SELECTED WORK (With generated image assets) */}
      <section id="work" className="bg-midnight py-16 sm:py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="flex items-center justify-between gap-4 border-b border-ice/15 pb-4 text-[11px] font-semibold tracking-[0.16em] text-muted">
            <span>04 / SELECTED WORK</span>
            <span className="text-soft-blue">IDEAS TAKING SHAPE</span>
          </div>

          <div className="flex flex-col justify-between gap-6 py-10 sm:py-12 lg:flex-row lg:items-end">
            <h2 className="font-display text-3xl font-bold leading-[1.08] text-ink sm:text-5xl lg:text-6xl">
              Made to solve.
              <br />
              <em className="zenith-gradient-text not-italic">Built to matter.</em>
            </h2>
            <p className="max-w-xs text-sm leading-relaxed text-muted">
              Each project begins with a different problem. Here are a few of the systems and
              concepts shaping our work.
            </p>
          </div>

          {/* Featured Case Study: MEGHAM */}
          <Link to={`/work/${megham.slug}/`} className="group block">
            <div className="zenith-card relative overflow-hidden rounded-3xl border border-ice/20 bg-navy/45">
              <img
                src={megham.image}
                alt={megham.imageAlt}
                className="aspect-[4/3] max-h-[380px] w-full object-cover transition duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.02] md:aspect-video"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-midnight/85 via-midnight/15 to-transparent" />
              {megham.tags.map((tag, idx) => (
                <span
                  key={tag}
                  className={
                    idx === 0
                      ? "absolute top-4 left-4 rounded-full border border-ice/35 bg-midnight/75 px-3 py-1 text-[10px] font-semibold tracking-[0.14em] text-ice backdrop-blur sm:top-5 sm:left-5 sm:px-3.5 sm:py-1.5"
                      : "absolute right-4 bottom-4 rounded-full border border-ice/35 bg-midnight/75 px-3 py-1 text-[10px] font-semibold tracking-[0.14em] text-ice backdrop-blur sm:right-5 sm:bottom-5 sm:px-3.5 sm:py-1.5"
                  }
                >
                  {tag}
                </span>
              ))}
            </div>
            <div className="flex items-center justify-between border-b border-ice/15 py-4 text-[11px] font-semibold tracking-[0.16em] text-muted">
              <span>
                {megham.index} / {megham.heroLabel}
              </span>
              <span className="text-ice">EXPLORE PROJECT ↗</span>
            </div>
            <div className="flex flex-col justify-between gap-3 pt-4 pb-10 sm:flex-row sm:items-baseline">
              <h3 className="font-display text-3xl font-bold text-ink transition-colors group-hover:text-ice sm:text-4xl">
                {megham.title}
              </h3>
              <p className="max-w-md text-sm leading-relaxed text-muted">{megham.homeSummary}</p>
            </div>
          </Link>

          {/* Secondary Pair: CareMatrix & She Shield */}
          <div className="grid gap-6 md:grid-cols-2 lg:gap-8">
            {[carematrix, sheShield].map((project) => (
              <Link
                key={project.slug}
                to={`/work/${project.slug}/`}
                className="zenith-card group block rounded-3xl border border-ice/15 bg-navy/40 p-4 hover:border-ice/40 hover:bg-navy/65"
              >
                <div className="relative overflow-hidden rounded-2xl border border-ice/15">
                  <img
                    src={project.image}
                    alt={project.imageAlt}
                    className="aspect-[4/3] w-full object-cover transition duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.03] md:aspect-[16/10]"
                  />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-midnight/75 via-transparent to-transparent" />
                  <span className="absolute bottom-3 left-4 text-[10px] font-semibold tracking-[0.18em] text-ice">
                    {project.tags[0]}
                  </span>
                </div>
                <div className="mt-4 flex items-center justify-between border-b border-ice/15 pb-3 text-[11px] font-semibold tracking-[0.16em] text-muted">
                  <span>
                    {project.index} / {project.heroLabel}
                  </span>
                  <span className="text-ice transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                    ↗
                  </span>
                </div>
                <h3 className="mt-4 font-display text-2xl font-bold text-ink transition-colors group-hover:text-ice sm:text-3xl">
                  {project.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{project.homeSummary}</p>
              </Link>
            ))}
          </div>

          <div className="mt-10 flex flex-col items-start justify-between gap-4 border-t border-ice/15 pt-7 sm:flex-row sm:items-center">
            <p className="text-sm text-muted">Have a different challenge in mind?</p>
            <Link
              to="/work/"
              className="inline-flex items-center gap-4 rounded-full border border-ice/40 py-2.5 pr-3 pl-5 text-xs font-bold text-ink transition hover:border-ice hover:bg-navy/50"
            >
              Explore all work
              <span className="grid h-7 w-7 place-items-center rounded-full bg-navy text-sm text-ice">
                ↗
              </span>
            </Link>
          </div>
        </div>
      </section>

      {/* 05 / HOW WE WORK — InterferenceRibbons */}
      <section className="relative isolate overflow-hidden bg-gradient-to-b from-deep to-midnight py-16 sm:py-24 lg:py-32">
        <InterferenceRibbons
          primaryColor="#c1e8ff"
          secondaryColor="#80b2ff"
          accentColor="#2563eb"
          ribbonCount={3}
          wiresPerRibbon={10}
          twist={2.4}
          opacity={0.54}
        />

        <div className="relative z-10 mx-auto w-full max-w-7xl px-5 sm:px-8">
          <div className="flex items-center justify-between gap-4 border-b border-ice/15 pb-4 text-[11px] font-semibold tracking-[0.16em] text-muted">
            <span>05 / HOW WE WORK</span>
            <span className="text-soft-blue">NO BLACK BOXES. NO GUESSWORK.</span>
          </div>

          <div className="flex flex-col justify-between gap-6 py-10 sm:py-12 lg:flex-row lg:items-end">
            <h2 className="font-display text-3xl font-bold leading-[1.08] text-ink sm:text-5xl lg:text-6xl">
              Clear steps.
              <br />
              <em className="zenith-gradient-text not-italic">Better decisions.</em>
            </h2>
            <p className="max-w-md text-sm leading-relaxed text-muted">
              Good outcomes come from collaboration, honest communication and visible progress. You
              know what we&apos;re building, why it matters and what happens next.
            </p>
          </div>

          <div className="border-t border-ice/15">
            {APPROACH_STEPS.map((step) => (
              <div
                key={step.num}
                className="flex items-center justify-between gap-5 border-b border-ice/15 py-5 sm:gap-8 sm:py-6"
              >
                <div className="flex items-baseline gap-5 sm:gap-10">
                  <span className="w-8 shrink-0 font-mono text-xs font-bold text-ice">
                    {step.num}
                  </span>
                  <div>
                    <h3 className="font-display text-lg font-bold text-ink sm:text-2xl">
                      {step.title}
                    </h3>
                    <p className="mt-1 text-sm text-muted">{step.desc}</p>
                  </div>
                </div>
                <span className="shrink-0 text-right text-lg text-soft-blue">{step.arrow}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 06 / FIND YOUR START */}
      <section className="bg-midnight py-16 sm:py-24 lg:py-32">
        <div className="mx-auto w-full max-w-7xl px-5 sm:px-8">
          <div className="flex items-center justify-between gap-4 border-b border-ice/15 pb-4 text-[11px] font-semibold tracking-[0.16em] text-muted">
            <span>06 / FIND YOUR START</span>
            <span className="text-soft-blue">SCOPED AROUND YOUR NEEDS</span>
          </div>

          <div className="flex flex-col justify-between gap-6 py-10 sm:py-12 lg:flex-row lg:items-end">
            <h2 className="font-display text-3xl font-bold leading-[1.08] text-ink sm:text-5xl lg:text-6xl">
              Start with the idea.
              <br />
              <em className="zenith-gradient-text not-italic">We&apos;ll shape the scope.</em>
            </h2>
            <p className="max-w-sm text-sm leading-relaxed text-muted">
              Every project is quoted after reviewing requirements, content, integrations and
              timeline. No made-up one-size-fits-all price.
            </p>
          </div>

          <div className="border-t border-ice/15">
            {PACKAGES.map((pkg) => (
              <Link
                key={pkg.num}
                to={pkg.to}
                className="group flex items-center justify-between gap-5 border-b border-ice/15 py-6 transition hover:px-2 sm:gap-8 sm:py-7"
              >
                <div className="flex items-baseline gap-5 sm:gap-10">
                  <span className="w-8 shrink-0 font-mono text-xs font-bold text-ice">
                    {pkg.num}
                  </span>
                  <div>
                    <h3 className="font-display text-2xl font-bold text-ink transition-colors group-hover:text-ice sm:text-3xl lg:text-4xl">
                      {pkg.title}
                    </h3>
                    <p className="mt-1 text-sm text-muted">{pkg.desc}</p>
                  </div>
                </div>
                <span className="shrink-0 text-right text-xl text-ice transition-transform duration-200 group-hover:translate-x-1 group-hover:-translate-y-1">
                  ↗
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 07 / GROWING TOGETHER (Light section) */}
      <section className="bg-gradient-to-br from-[#EAF7FF] to-[#D7E9F7] py-16 text-light-ink sm:py-24 lg:py-32">
        <div className="mx-auto w-full max-w-7xl px-5 sm:px-8">
          <div className="flex items-center justify-between gap-4 border-b border-navy/20 pb-4 text-[11px] font-semibold tracking-[0.16em] text-light-muted">
            <span>07 / GROWING TOGETHER</span>
            <span>ZENITH TALENT NETWORK</span>
          </div>

          <div className="grid gap-8 py-10 sm:py-12 lg:grid-cols-12 lg:items-start lg:gap-10">
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#1e40af] lg:col-span-3">
              Learn by doing
            </p>
            <h2 className="font-display text-3xl font-bold leading-[1.08] text-light-ink sm:text-5xl lg:col-span-5">
              Emerging talent.
              <br />
              <em className="zenith-gradient-text-dark not-italic">Real work. Better craft.</em>
            </h2>
            <div className="space-y-5 lg:col-span-4">
              <p className="text-sm leading-relaxed text-light-muted">
                We create a structured environment where developers, designers and creators can
                contribute to meaningful work, improve through review and build evidence of
                professional capability.
              </p>
              <Link
                to="/talent/"
                className="inline-flex items-center gap-4 rounded-full bg-navy py-3 pr-3.5 pl-5 text-xs font-bold text-white transition hover:-translate-y-0.5 hover:bg-midnight"
              >
                Join the talent network
                <span className="grid h-7 w-7 place-items-center rounded-full bg-ice text-sm text-midnight">
                  ↗
                </span>
              </Link>
            </div>
          </div>

          <div className="grid gap-6 border-t border-navy/20 pt-6 sm:grid-cols-2 lg:grid-cols-4">
            {TALENT_VALUES.map((val, idx) => (
              <div
                key={val.num}
                className={idx > 0 ? "lg:border-l lg:border-navy/20 lg:pl-6" : ""}
              >
                <span className="text-xs font-bold text-[#1e40af]">{val.num}</span>
                <h3 className="mt-3 font-display text-lg font-bold text-light-ink">{val.title}</h3>
                <p className="mt-1.5 text-sm text-light-muted">{val.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SIDE QUEST / STUDENT LAB — VoxelArc + student-lab.jpg */}
      <section className="relative isolate overflow-hidden bg-deep py-16 sm:py-24 lg:py-32">
        <VoxelArc
          crestColor="#c1e8ff"
          midColor="#2563eb"
          deepColor="#0b1424"
          horizonY={0.46}
          arcCurvature={0.14}
          waveHeight={15}
          opacity={0.78}
        />

        <div className="relative z-10 mx-auto grid w-full max-w-7xl items-center gap-8 px-5 sm:px-8 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-5">
            <span className="text-[11px] font-bold uppercase tracking-[0.18em] text-ice">
              SIDE QUEST / STUDENT PROJECT LAB
            </span>
            <h2 className="mt-4 font-display text-3xl font-bold leading-[1.08] text-ink sm:text-5xl">
              Build something
              <br />
              <em className="zenith-gradient-text not-italic">you can explain.</em>
            </h2>
            <p className="mt-4 max-w-xl text-sm leading-relaxed text-muted">
              Explore project directions by technology, difficulty, course and duration. Practical
              guidance for students who want to understand what they build and demonstrate it with
              confidence.
            </p>
            <Link
              to="/student-projects/"
              className="mt-6 inline-flex items-center gap-6 border-b border-ice/40 py-3 text-xs font-semibold text-ink transition hover:border-ice hover:text-ice"
            >
              Explore the Student Lab <span className="text-ice">↗</span>
            </Link>
          </div>

          <div className="overflow-hidden rounded-3xl border border-ice/20 bg-midnight/85 p-2 lg:col-span-5">
            <img
              src={BRAND_IMAGES.studentLabImg}
              alt="Zenith Student Project Lab engineering blueprint and voxel nodes"
              className="aspect-[16/10] w-full rounded-2xl object-cover"
            />
          </div>

          <div className="lg:col-span-2 lg:text-right">
            <div className="font-display text-5xl font-bold tracking-tight text-ink sm:text-6xl lg:text-7xl">
              500<span className="text-ice">+</span>
            </div>
            <p className="mt-1 text-[11px] font-semibold tracking-[0.18em] text-soft-blue">
              PROJECT DIRECTIONS
            </p>
          </div>
        </div>
      </section>

      {/* 08 / FINAL CTA (Light section) */}
      <section
        id="contact"
        className="relative isolate overflow-hidden bg-gradient-to-br from-[#EAF7FF] to-[#D7E9F7] py-16 text-light-ink sm:py-24 lg:py-32"
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-24 top-12 -z-10 h-[42vw] w-[42vw] rounded-full bg-[radial-gradient(circle,rgba(84,131,179,0.28),transparent_68%)]"
        />

        <div className="mx-auto w-full max-w-7xl px-5 sm:px-8">
          <div className="flex items-center justify-between gap-4 border-b border-navy/20 pb-4 text-[11px] font-semibold tracking-[0.16em] text-light-muted">
            <span>08 / YOUR TURN</span>
            <span>LET&apos;S MAKE SOMETHING USEFUL</span>
          </div>

          <p className="mt-10 text-xs font-bold uppercase tracking-[0.16em] text-[#1e40af] sm:mt-14">
            Have an idea in mind?
          </p>
          <h2 className="mt-4 font-display text-4xl font-bold leading-[1.03] text-light-ink sm:text-6xl lg:text-7xl">
            Let&apos;s give it
            <br />
            <em className="zenith-gradient-text-dark not-italic">a real beginning.</em>
          </h2>

          <div className="mt-8 flex flex-col items-start justify-between gap-6 sm:mt-10 sm:flex-row sm:items-end">
            <p className="max-w-md text-base leading-relaxed text-light-muted">
              Tell us what you&apos;re trying to make, fix or improve. We&apos;ll start with a
              conversation—not a sales script.
            </p>
            <Link
              to="/contact/"
              className="inline-flex items-center gap-4 rounded-full bg-navy py-3.5 pr-4 pl-6 text-xs font-bold text-white transition hover:-translate-y-0.5 hover:bg-midnight"
            >
              Tell us about your idea
              <span className="grid h-7 w-7 place-items-center rounded-full bg-ice text-sm text-midnight">
                ↗
              </span>
            </Link>
          </div>

          <div className="mt-12 flex flex-wrap items-center gap-6 border-t border-navy/20 pt-6 text-xs font-bold text-[#1e40af] sm:mt-14">
            <a href={SITE.whatsappHref} target="_blank" rel="noopener noreferrer">
              WhatsApp ↗
            </a>
            <a href={`mailto:${SITE.email}`}>{SITE.email} ↗</a>
            <span className="font-medium text-light-muted sm:ml-auto">
              Kerala, India · Working everywhere
            </span>
          </div>
        </div>
      </section>
    </>
  );
}
