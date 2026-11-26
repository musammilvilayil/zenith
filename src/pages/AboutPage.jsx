import { Link } from "react-router-dom";
import PageHead from "@/components/layout/PageHead";
import CtaBanner from "@/components/ui/CtaBanner";
import PageHero from "@/components/ui/PageHero";
import { BRAND_IMAGES } from "@/data/site";

const PRINCIPLES = [
  ["01","Understand the requirement","We begin with the audience, problem, expected outcome and constraints before choosing a technical approach."],
  ["02","Choose suitable technology","The stack should fit the project scope, users, integrations and long-term needs—not a passing trend."],
  ["03","Build with clarity","We prioritise usable interfaces, working features, maintainable code and clear communication."],
  ["04","Deliver responsibly","Testing, agreed documentation, handover and support expectations are discussed as part of the project."],
];

export default function AboutPage() {
  return (
    <>
      <PageHead />
      <PageHero
        eyebrow="About Zenith Softworks"
        title="A digital development studio built around practical solutions."
        description="Zenith Softworks is based in Kerala and works with businesses and students across India. We develop business websites, e-commerce platforms, custom software and academic software projects."
        aside={<div className="z-glass overflow-hidden rounded-[1.5rem] p-2"><img src={BRAND_IMAGES.heroAbstractImg} alt="Zenith Softworks digital development visual" className="aspect-[16/10] w-full rounded-2xl object-cover" /></div>}
      />
      <section className="z-section"><div className="z-container grid gap-10 lg:grid-cols-2 lg:items-center"><h2 className="z-display-md">Ideas become useful when they are carefully planned and properly built.</h2><p className="text-base leading-relaxed text-muted">We work across two areas: helping businesses establish or improve their digital presence, and helping computing students develop practical academic software projects. Each enquiry begins with a discussion of requirements, feasibility and expected deliverables.</p></div></section>
      <section className="z-section border-y border-line bg-navy/40"><div className="z-container"><span className="z-label z-label-accent">How we work</span><h2 className="z-display-md mt-4">A clear approach from first discussion to handover.</h2><div className="mt-9 grid gap-5 sm:grid-cols-2">{PRINCIPLES.map(([num,title,desc])=><article key={num} className="z-card p-7"><span className="z-num">{num}</span><h3 className="mt-3 font-display text-xl font-bold">{title}</h3><p className="mt-3 text-sm leading-relaxed text-muted">{desc}</p></article>)}</div></div></section>
      <section className="z-section"><div className="z-container grid gap-6 md:grid-cols-2"><article className="z-card p-7"><span className="z-label z-label-accent">For businesses</span><h2 className="mt-4 font-display text-2xl font-bold">Build your digital presence.</h2><p className="mt-3 text-sm leading-relaxed text-muted">Explore websites, e-commerce platforms, custom software and website redesign services.</p><Link to="/business/" className="z-link mt-5">Explore business services ↗</Link></article><article className="z-card p-7"><span className="z-label z-label-accent">For students</span><h2 className="mt-4 font-display text-2xl font-bold">Develop a project you understand.</h2><p className="mt-3 text-sm leading-relaxed text-muted">Discuss academic software project development, implementation scope and technical walkthroughs.</p><Link to="/student-projects/" className="z-link mt-5">Explore student projects ↗</Link></article></div></section>
      <CtaBanner title="Have a project in mind?" primaryLabel="Discuss your requirements" primaryHref="/contact/" />
    </>
  );
}