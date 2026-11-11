import { Link } from "react-router-dom";
import GhostFibers from "@/components/fx/GhostFibers";
import HeroMonolith from "@/components/fx/HeroMonolith";
import InterferenceRibbons from "@/components/fx/InterferenceRibbons";
import LuminousFilaments from "@/components/fx/LuminousFilaments";
import VoxelArc from "@/components/fx/VoxelArc";
import PageHead from "@/components/layout/PageHead";
import Button from "@/components/ui/Button";
import PortfolioCard from "@/components/ui/PortfolioCard";
import ProcessTimeline from "@/components/ui/ProcessTimeline";
import SectionHeading from "@/components/ui/SectionHeading";
import { ENGAGEMENT_PATHS, PROCESS_STEPS } from "@/data/process";
import { BRAND_IMAGES, SITE } from "@/data/site";
import { CASE_STUDIES } from "@/data/work";

const MARQUEE_ITEMS = [
  "Digital experiences",
  "Websites that work",
  "Useful applications",
  "Brands with purpose",
  "Product engineering",
  "Launch & care",
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

const TALENT_VALUES = [
  { num: "01", title: "Real briefs", desc: "Work shaped around actual users and goals." },
  { num: "02", title: "Clear ownership", desc: "Roles, milestones and expectations defined early." },
  { num: "03", title: "Quality reviews", desc: "Design, code and delivery reviewed thoughtfully." },
  { num: "04", title: "Portfolio evidence", desc: "Demonstrable work—not empty promises." },
];

export default function HomePage() {
  const [megham, carematrix, sheShield, projexify] = CASE_STUDIES;

  return (
    <>
      <PageHead />

      {/* 01 / HERO */}
      <section className="relative isolate -mt-[calc(var(--z-nav-h)+var(--z-nav-gap)*2)] flex min-h-[100svh] flex-col overflow-hidden pt-[calc(var(--z-nav-h)+var(--z-nav-gap)*2)]">
        <div aria-hidden="true" className="z-ambient absolute inset-0 -z-20" />
        <div aria-hidden="true" className="z-grid-bg absolute inset-0 -z-10" />
        <GhostFibers
          glowColor="#5483B3"
          layers={3}
          twist={1.6}
          threads={56}
          fiberStyle="dots"
          depthOfField={0.85}
          hoverEffect="focus"
          intro
          mouseInteraction
          lineColor="#EAF7FF"
          secondaryColor="#7DA0CA"
          gradient="across"
          waves={0.5}
          spread={2}
          foldGlow={1.3}
          brightness={1.25}
          vignette={0}
          mouseStrength={1.15}
        />

        <div className="z-container-wide flex flex-1 flex-col">
          <div className="z-fade flex items-center justify-between gap-4 border-b border-line py-4">
            <span className="z-label">Independent digital studio</span>
            <span className="z-label hidden text-right sm:inline">
              Kerala, India · Available for select projects
            </span>
            <span className="z-label sm:hidden">Kerala, India</span>
          </div>

          <div className="grid flex-1 items-center gap-10 py-12 sm:py-16 lg:grid-cols-[1.2fr_0.8fr] lg:gap-6 lg:py-8">
            <div className="relative z-10">
              <p className="z-label z-label-accent z-eyebrow z-rise">A little ambition changes everything</p>
              <h1 className="z-display-xl z-rise z-delay-1 mt-7 text-ink">
                Every big idea
                <br />
                starts <span className="z-accent-text">somewhere.</span>
              </h1>
              <p className="z-lede z-rise z-delay-2 mt-7 max-w-[34rem]">
                We turn ambitious ideas into digital experiences people can feel, understand and
                use. Thoughtful strategy. Distinctive design. Technology built for what comes next.
              </p>
              <div className="z-rise z-delay-3 mt-9 flex flex-wrap items-center gap-3">
                <Button to="/contact/">Start a Project</Button>
                <Button href="#work" variant="secondary" arrow="↓" external={false}>
                  Explore Our Work
                </Button>
              </div>
              <p className="z-rise z-delay-4 mt-8 flex items-center gap-3 text-sm text-muted">
                <span aria-hidden="true" className="h-px w-8 bg-ice/40" />
                Strategy, design and engineering under one accountable team.
              </p>
            </div>

            <div className="z-fade z-delay-2 relative mx-auto w-full max-w-[min(480px,86vw)] lg:max-w-[540px]">
              <HeroMonolith />
            </div>
          </div>

          <div className="relative z-10 grid grid-cols-2 items-end gap-4 border-t border-line py-5 sm:grid-cols-3">
            <div>
              <span className="z-label text-faint">Focus</span>
              <p className="mt-1 text-sm text-ink">Websites · Platforms · Apps</p>
            </div>
            <div className="hidden justify-self-center sm:flex sm:flex-col sm:items-center sm:gap-2">
              <span className="z-scroll-cue" aria-hidden="true" />
              <span className="z-label">Scroll to explore</span>
            </div>
            <div className="justify-self-end text-right">
              <span className="z-label text-faint">Approach</span>
              <p className="mt-1 text-sm text-ink">Idea → Impact</p>
            </div>
          </div>
        </div>
      </section>

      {/* CAPABILITY TICKER */}
      <section aria-label="Our capabilities" className="overflow-hidden border-y border-line bg-navy/60 py-4">
        <div className="zenith-marquee-track">
          {[...MARQUEE_ITEMS, ...MARQUEE_ITEMS].map((item, idx) => (
            <span
              key={`${item}-${idx}`}
              aria-hidden={idx >= MARQUEE_ITEMS.length ? "true" : undefined}
              className="inline-flex items-center gap-10 font-display text-lg font-semibold tracking-tight text-muted"
            >
              <span>{item}</span>
              <span aria-hidden="true" className="text-xs text-ice">
                ◆
              </span>
            </span>
          ))}
        </div>
      </section>

      {/* 02 / THE REASON */}
      <section id="story" className="z-section relative isolate overflow-hidden">
        <LuminousFilaments
          className="-z-10"
          coreColor="#EAF7FF"
          fiberColor="#C1E8FF"
          secondaryColor="#5483B3"
          originX={0.92}
          originY={0.18}
          baseAngle={Math.PI * 0.94}
          spreadAngle={Math.PI * 0.7}
          filamentCount={30}
          opacity={0.55}
        />
        <div className="z-container">
          <div className="z-rule">
            <span className="z-label">02 / The reason</span>
            <span className="z-label z-label-accent">Built around people</span>
          </div>

          <div className="grid gap-12 pt-14 lg:grid-cols-[1.15fr_0.85fr] lg:items-start lg:gap-20">
            <div>
              <p className="z-label z-eyebrow">Behind the pixels</p>
              <h2 className="z-display-lg mt-5">
                Technology is only powerful when it{" "}
                <span className="z-accent-text">means something.</span>
              </h2>
            </div>
            <div className="space-y-6 lg:pt-12">
              <p className="text-xl leading-relaxed text-ink">
                A website is a first impression. An application can remove a daily frustration. A
                well-built system can give a growing team room to breathe.
              </p>
              <p className="leading-relaxed text-muted">
                That is how we think at Zenith. We start by understanding the people, the problem
                and the possibility—then shape the right digital answer, without adding complexity
                just to look clever.
              </p>
              <Link to="/about/" className="z-link">
                Get to know the studio <span aria-hidden="true" className="text-ice">↗</span>
              </Link>
            </div>
          </div>

          <div className="mt-20 grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-3">
            {[
              ["Design", "Good design makes it clear."],
              ["Engineering", "Good engineering makes it last."],
              ["Collaboration", "Good collaboration makes it possible."],
            ].map(([label, text]) => (
              <div key={label} className="bg-midnight/90 p-6">
                <span className="z-label">{label}</span>
                <p className="mt-2 font-display text-lg font-semibold tracking-tight text-ink">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 03 / WHAT WE MAKE (light editorial section) */}
      <section id="services" className="z-light z-section">
        <div className="z-container">
          <SectionHeading
            index="03 / What we make"
            meta="From first thought to live product"
            title={
              <>
                Different challenges.
                <br />
                <span className="text-light-accent">One thoughtful process.</span>
              </>
            }
            description="We choose the right tools for the problem—not the other way around."
          />

          <ul className="mt-14 border-t border-light-ink/15">
            {HOME_SERVICES.map((svc) => (
              <li key={svc.num}>
                <Link
                  to={svc.to}
                  className="group grid grid-cols-[40px_minmax(0,1fr)_28px] items-center gap-x-4 gap-y-2 border-b border-light-ink/15 py-7 transition-[padding,background-color] duration-500 ease-[var(--z-ease)] hover:bg-white/50 hover:px-4 md:grid-cols-[56px_minmax(0,1.1fr)_minmax(0,0.9fr)_32px] md:gap-x-6"
                >
                  <span className="z-num row-start-1">{svc.num}</span>
                  <span className="row-start-1 font-display text-xl font-bold tracking-tight text-light-ink sm:text-2xl">
                    {svc.name}
                  </span>
                  <span className="col-span-2 col-start-2 text-sm leading-relaxed text-light-muted md:col-span-1 md:col-start-3 md:row-start-1">
                    {svc.desc}
                  </span>
                  <span
                    aria-hidden="true"
                    className="col-start-3 row-start-1 text-right text-xl text-light-accent transition-transform duration-500 ease-[var(--z-ease)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 md:col-start-4"
                  >
                    ↗
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 04 / SELECTED WORK */}
      <section id="work" className="z-section">
        <div className="z-container">
          <SectionHeading
            index="04 / Selected work"
            meta="Ideas taking shape"
            title={
              <>
                Made to solve.
                <br />
                <span className="z-accent-text">Built to matter.</span>
              </>
            }
            description="Each project begins with a different problem. Here are a few of the systems and concepts shaping our work."
          />

          <div className="mt-14 grid gap-5 lg:grid-cols-12">
            <PortfolioCard project={megham} feature className="lg:col-span-7" />
            <PortfolioCard project={carematrix} className="lg:col-span-5" />
            <PortfolioCard project={sheShield} className="lg:col-span-5" />
            <PortfolioCard project={projexify} feature className="lg:col-span-7" />
          </div>

          <div className="mt-12 flex flex-col items-start justify-between gap-4 border-t border-line pt-8 sm:flex-row sm:items-center">
            <p className="text-muted">Have a different challenge in mind?</p>
            <Button to="/work/" variant="secondary">
              Explore all work
            </Button>
          </div>
        </div>
      </section>

      {/* 05 / HOW WE WORK */}
      <section className="z-section relative isolate overflow-hidden border-t border-line">
        <InterferenceRibbons
          className="-z-10 opacity-70"
          primaryColor="#C1E8FF"
          secondaryColor="#7DA0CA"
          accentColor="#5483B3"
          ribbonCount={3}
          wiresPerRibbon={12}
          twist={2.4}
          opacity={0.42}
        />
        <div className="z-container">
          <SectionHeading
            index="05 / How we work"
            meta="No black boxes. No guesswork."
            title={
              <>
                Clear steps.
                <br />
                <span className="z-accent-text">Better decisions.</span>
              </>
            }
            description="Good outcomes come from collaboration, honest communication and visible progress. You know what we're building, why it matters and what happens next."
          />
          <ProcessTimeline steps={PROCESS_STEPS} className="mt-14" />
        </div>
      </section>

      {/* 06 / FIND YOUR START */}
      <section className="z-section border-t border-line">
        <div className="z-container">
          <SectionHeading
            index="06 / Find your start"
            meta="Scoped around your needs"
            title={
              <>
                Start with the idea.
                <br />
                <span className="z-accent-text">We&apos;ll shape the scope.</span>
              </>
            }
            description="Every project is quoted after reviewing requirements, content, integrations and timeline. No made-up one-size-fits-all price."
          />

          <div className="mt-14 grid gap-5 lg:grid-cols-3">
            {ENGAGEMENT_PATHS.map((path) => (
              <Link
                key={path.num}
                to={path.to}
                className="z-card z-card-interactive z-card-pad group flex flex-col"
              >
                <div className="flex items-center justify-between">
                  <span className="z-num">{path.num}</span>
                  <span aria-hidden="true" className="text-ice transition-transform duration-500 ease-[var(--z-ease)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                    ↗
                  </span>
                </div>
                <h3 className="mt-10 font-display text-3xl font-bold text-ink">{path.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted">{path.desc}</p>
                <p className="z-label mt-8 border-t border-line pt-5">What to expect</p>
                <ul className="mt-4 space-y-2.5 text-sm text-ink">
                  {path.expect.map((item) => (
                    <li key={item} className="flex gap-3">
                      <span aria-hidden="true" className="mt-2 h-1 w-1 shrink-0 rounded-full bg-ice" />
                      {item}
                    </li>
                  ))}
                </ul>
                <span className="mt-auto pt-8 text-sm font-semibold text-ice">Request a quotation</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 07 / GROWING TOGETHER (light editorial section) */}
      <section className="z-light z-section">
        <div className="z-container">
          <div className="z-rule">
            <span className="z-label">07 / Growing together</span>
            <span className="z-label">Zenith talent network</span>
          </div>

          <div className="grid gap-10 py-14 lg:grid-cols-[1.3fr_0.7fr] lg:items-end lg:gap-16">
            <div>
              <p className="z-label z-eyebrow">Learn by doing</p>
              <h2 className="z-display-lg mt-5 text-light-ink">
                Emerging talent.
                <br />
                <span className="text-light-accent">Real work. Better craft.</span>
              </h2>
            </div>
            <div className="space-y-6">
              <p className="leading-relaxed text-light-muted">
                We create a structured environment where developers, designers and creators can
                contribute to meaningful work, improve through review and build evidence of
                professional capability.
              </p>
              <Button to="/talent/" variant="dark">
                Join the talent network
              </Button>
            </div>
          </div>

          <div className="grid gap-8 border-t border-light-ink/15 pt-8 sm:grid-cols-2 lg:grid-cols-4">
            {TALENT_VALUES.map((val, idx) => (
              <div key={val.num} className={idx > 0 ? "lg:border-l lg:border-light-ink/15 lg:pl-8" : ""}>
                <span className="z-num">{val.num}</span>
                <h3 className="mt-4 font-display text-lg font-bold text-light-ink">{val.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-light-muted">{val.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SIDE QUEST / STUDENT LAB */}
      <section className="z-section relative isolate overflow-hidden bg-deep">
        <VoxelArc
          className="-z-10"
          crestColor="#C1E8FF"
          midColor="#5483B3"
          deepColor="#052659"
          horizonY={0.5}
          arcCurvature={0.14}
          waveHeight={15}
          opacity={0.7}
        />
        <div className="z-container grid items-center gap-12 lg:grid-cols-[1fr_1fr] lg:gap-16">
          <div>
            <p className="z-label z-label-accent z-eyebrow">Side quest / Student project lab</p>
            <h2 className="z-display-md mt-5">
              Build something
              <br />
              <span className="z-accent-text">you can explain.</span>
            </h2>
            <p className="mt-5 max-w-xl leading-relaxed text-muted">
              Explore project directions by technology, difficulty, course and duration. Practical
              guidance for students who want to understand what they build and demonstrate it with
              confidence.
            </p>
            <div className="mt-8 flex flex-wrap items-end gap-8">
              <Button to="/student-projects/" variant="secondary">
                Explore the Student Lab
              </Button>
              <div>
                <p className="font-display text-5xl font-bold tracking-tight text-ink">
                  500<span className="text-ice">+</span>
                </p>
                <p className="z-label mt-1">Project directions</p>
              </div>
            </div>
          </div>

          <div className="z-glass overflow-hidden rounded-[1.5rem] p-2">
            <img
              src={BRAND_IMAGES.studentLabImg}
              alt="Zenith Student Project Lab engineering blueprint and voxel nodes"
              loading="lazy"
              decoding="async"
              width="1376"
              height="768"
              className="aspect-[16/10] w-full rounded-[1.1rem] object-cover"
            />
          </div>
        </div>
      </section>

      {/* 08 / CLOSING CTA */}
      <section id="contact" className="z-section relative isolate overflow-hidden border-t border-line">
        <div aria-hidden="true" className="z-ambient absolute inset-0 -z-20" />
        <div aria-hidden="true" className="z-grid-bg absolute inset-0 -z-10 opacity-60" />
        <div className="z-container">
          <div className="z-rule">
            <span className="z-label">08 / Your turn</span>
            <span className="z-label z-label-accent">Let&apos;s make something useful</span>
          </div>

          <div className="pt-16 sm:pt-24">
            <p className="z-label z-eyebrow">Have an idea in mind?</p>
            <h2 className="z-display-xl mt-6 max-w-5xl">
              Let&apos;s give it <span className="z-accent-text">a real beginning.</span>
            </h2>
            <div className="mt-10 flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-end">
              <p className="z-lede">
                Tell us what you&apos;re trying to make, fix or improve. We&apos;ll start with a
                conversation—not a sales script.
              </p>
              <div className="flex flex-wrap gap-3">
                <Button to="/contact/">Tell us about your idea</Button>
                <Button href={SITE.whatsappHref} variant="secondary">
                  WhatsApp
                </Button>
              </div>
            </div>
          </div>

          <div className="mt-20 flex flex-wrap items-center gap-x-8 gap-y-3 border-t border-line pt-6">
            <a href={`mailto:${SITE.email}`} className="z-link">
              {SITE.email}
            </a>
            <span className="z-label sm:ml-auto">Kerala, India · Working everywhere</span>
          </div>
        </div>
      </section>
    </>
  );
}
