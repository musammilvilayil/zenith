import { Link } from "react-router";
import PageHead from "@/components/layout/PageHead";
import PageHero from "@/components/ui/PageHero";
import CtaBanner from "@/components/ui/CtaBanner";
import LOCATIONS from "@/data/locations";

export default function LocationPage({ location }) {
  const page = LOCATIONS[location];
  if (!page) return null;
  return (
    <>
      <PageHead />
      <PageHero eyebrow={page.eyebrow} title={page.title} description={page.intro}
        actions={<><Link to="/contact/?type=business" className="z-btn z-btn-primary">Discuss Your Project</Link><Link to="/projects/" className="z-btn z-btn-secondary">Explore Our Work</Link></>}
        meta="Based in Kollam, Kerala · Remote delivery across India"
      />
      <section className="z-section">
        <div className="z-container grid gap-10 lg:grid-cols-2">
          <div><span className="z-label z-label-accent">Local business requirements</span><h2 className="z-display-md mt-4">{page.heading}</h2><p className="mt-4 leading-relaxed text-muted">{page.body}</p><p className="mt-4 text-sm leading-relaxed text-muted">{page.note}</p></div>
          <ul className="z-card grid gap-4 p-7">{page.points.map((point) => <li key={point} className="flex gap-3"><span className="text-ice">✦</span>{point}</li>)}</ul>
        </div>
      </section>
      <section className="z-section border-t border-line">
        <div className="z-container">
          <h2 className="z-display-md">{page.projectsHeading}</h2>
          <div className="mt-7 grid gap-4 md:grid-cols-3">
            {page.projects.map(([title, text]) => <article key={title} className="z-card p-6"><h3 className="font-display text-xl font-bold text-ink">{title}</h3><p className="mt-3 text-sm leading-relaxed text-muted">{text}</p></article>)}
          </div>
        </div>
      </section>
      <section className="z-section border-t border-line">
        <div className="z-container grid gap-10 lg:grid-cols-2">
          <div><h2 className="z-display-md">{page.processHeading}</h2><ol className="mt-6 grid gap-4">{page.process.map((step, i) => <li key={step} className="z-card flex gap-4 p-5"><span className="z-num">0{i + 1}</span><span className="text-muted">{step}</span></li>)}</ol></div>
          <div><h2 className="z-display-md">Questions we hear</h2><div className="mt-6 grid gap-4">{page.faqs.map(([q, a]) => <div key={q} className="z-card p-5"><h3 className="font-display text-lg font-bold text-ink">{q}</h3><p className="mt-2 text-sm leading-relaxed text-muted">{a}</p></div>)}</div></div>
        </div>
      </section>
      <section className="z-section border-y border-line bg-navy/40">
        <div className="z-container"><h2 className="z-display-md">Explore development services</h2><div className="mt-7 grid gap-4 sm:grid-cols-2">
          {[
            ["Website Development","/business/website-development/"],
            ["E-commerce Development","/business/ecommerce-development/"],
            ["Custom Software Development","/business/custom-software-development/"],
            ["Website Redesign","/business/website-redesign/"]
          ].map(([label, href]) => <Link key={href} to={href} className="z-card p-5 font-semibold hover:border-ice/50">{label} ↗</Link>)}
        </div></div>
      </section>
      <CtaBanner title="Planning a website or software project?" primaryLabel="Discuss your requirements" primaryHref="/contact/?type=business" />
    </>
  );
}
