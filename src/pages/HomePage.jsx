import { Link } from "react-router";
import PageHead from "@/components/layout/PageHead";
import Button from "@/components/ui/Button";
import CtaBanner from "@/components/ui/CtaBanner";
import PortfolioCard from "@/components/ui/PortfolioCard";
import { BRAND_IMAGES } from "@/data/site";
import { CASE_STUDIES } from "@/data/work";

const SERVICES = [
  ["01","Website Development","Responsive business websites that explain your services and help customers get in touch.","/business/website-development/"],
  ["02","E-commerce Development","Online stores with product catalogues, checkout and order management.","/business/ecommerce-development/"],
  ["03","Custom Software","Web applications and business tools shaped around your workflows.","/business/custom-software-development/"],
  ["04","Academic Projects","Practical software project development for BCA, BTech, MCA and related students.","/student-projects/"],
];
const STEPS = ["Discover requirements","Plan the scope","Design the experience","Develop the solution","Test and deliver"];

export default function HomePage() {
  return (
    <>
      <PageHead />
      <section className="relative isolate -mt-[calc(var(--z-nav-h)+var(--z-nav-gap)*2)] flex min-h-[88svh] items-center overflow-hidden pt-[calc(var(--z-nav-h)+var(--z-nav-gap)*2)]">
        <div aria-hidden="true" className="z-ambient absolute inset-0 -z-20" />
        <div aria-hidden="true" className="z-grid-bg absolute inset-0 -z-10" />
        <div className="z-container-wide grid gap-10 py-16 lg:grid-cols-[1.15fr_0.85fr] lg:items-center lg:py-24">
          <div>
            <p className="z-label z-label-accent z-eyebrow">Digital development studio · Kerala, India</p>
            <h1 className="z-display-xl mt-7">Ideas Into Digital Products. <span className="z-accent-text">Built With Purpose.</span></h1>
            <p className="z-lede mt-7 max-w-2xl">From business websites and e-commerce platforms to custom software and academic projects, Zenith Softworks turns ideas into functional digital solutions through thoughtful design and practical development.</p>
            <div className="mt-9 flex flex-wrap gap-3"><Button to="/contact/">Start a Project</Button><Button href="#work" variant="secondary" arrow="↓" external={false}>Explore Our Work</Button></div>
            <p className="mt-6 text-sm text-muted">Remote project delivery across India · In-person discussions within Kerala where feasible.</p>
          </div>
          <div className="relative mx-auto w-full max-w-xl"><img src={BRAND_IMAGES.heroAbstractImg} alt="Abstract digital forms representing software and product development" width="900" height="900" fetchPriority="high" className="w-full rounded-[2rem] border border-line object-cover shadow-2xl" /></div>
        </div>
      </section>

      <section className="z-section border-y border-line bg-navy/40"><div className="z-container"><div className="max-w-3xl"><span className="z-label z-label-accent">Choose your path</span><h2 className="z-display-md mt-4">Two audiences. One practical approach to development.</h2><p className="mt-4 leading-relaxed text-muted">Explore the service path that matches what you want to build.</p></div><div className="mt-9 grid gap-5 md:grid-cols-2"><article className="z-card p-7 sm:p-9"><span className="z-label z-label-accent">01 / Businesses</span><h3 className="mt-4 font-display text-3xl font-bold">Build a stronger digital presence.</h3><p className="mt-4 leading-relaxed text-muted">Professional websites, e-commerce platforms and custom software designed around your business goals.</p><Link to="/business/" className="z-btn z-btn-primary mt-7">Explore Business Services</Link></article><article className="z-card p-7 sm:p-9"><span className="z-label z-label-accent">02 / Students</span><h3 className="mt-4 font-display text-3xl font-bold">Turn your project idea into working software.</h3><p className="mt-4 leading-relaxed text-muted">Academic software project development with agreed documentation, implementation support and technical walkthroughs.</p><Link to="/student-projects/" className="z-btn z-btn-secondary mt-7">Explore Student Projects</Link></article></div></div></section>

      <section className="z-section"><div className="z-container"><div className="max-w-3xl"><span className="z-label z-label-accent">What we build</span><h2 className="z-display-md mt-4">Digital solutions for different goals.</h2></div><div className="mt-9 grid gap-4 sm:grid-cols-2">{SERVICES.map(([num,title,desc,to])=><Link key={num} to={to} className="z-card z-card-interactive p-6"><span className="z-num">{num}</span><h3 className="mt-3 font-display text-xl font-bold">{title}</h3><p className="mt-2 text-sm leading-relaxed text-muted">{desc}</p><span className="mt-5 inline-flex text-sm font-semibold text-ice">Explore service ↗</span></Link>)}</div></div></section>

      <section id="work" className="z-section border-y border-line bg-navy/40"><div className="z-container"><div className="flex flex-wrap items-end justify-between gap-5"><div><span className="z-label z-label-accent">Selected projects</span><h2 className="z-display-md mt-4">Built around real requirements.</h2><p className="mt-3 max-w-2xl text-muted">Explore selected applications and digital work from Zenith Softworks.</p></div><Link to="/projects/" className="z-link">View all projects ↗</Link></div><div className="mt-10 grid gap-6 md:grid-cols-2">{CASE_STUDIES.map((project)=><PortfolioCard key={project.slug} project={project} />)}</div></div></section>

      <section className="z-section"><div className="z-container"><div className="max-w-3xl"><span className="z-label z-label-accent">Our process</span><h2 className="z-display-md mt-4">From idea to agreed delivery.</h2></div><div className="mt-9 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">{STEPS.map((step,i)=><article key={step} className="z-card p-5"><span className="z-num">0{i+1}</span><h3 className="mt-3 font-display font-bold">{step}</h3></article>)}</div></div></section>
      <CtaBanner title="Have an idea? Let's build it." primaryLabel="Start a project" primaryHref="/contact/" />
    </>
  );
}