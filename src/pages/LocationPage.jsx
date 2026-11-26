import { Link } from "react-router";
import PageHead from "@/components/layout/PageHead";
import PageHero from "@/components/ui/PageHero";
import CtaBanner from "@/components/ui/CtaBanner";

const LOCATIONS = {
  kollam: {
    eyebrow: "Local development studio · Kollam, Kerala",
    title: "Website Development Company in Kollam, Kerala",
    intro: "Zenith Softworks is an independent software and web development studio based in Kollam, Kerala. We help local businesses, startups and professionals build responsive websites, online stores and custom web applications. Every project begins with a discussion about your goals, users and required features.",
    heading: "Digital development for Kollam businesses",
    body: "From a clear business website to an online store or a custom workflow application, we plan the solution around how your organisation works. We can discuss requirements locally where feasible and also deliver projects remotely.",
    points: ["Business and company websites", "E-commerce websites and online stores", "Custom web applications and dashboards", "Website redesign and technical improvements"],
    note: "Zenith is based in Kollam and serves clients across Kerala and remotely throughout India."
  },
  kochi: {
    eyebrow: "Remote development for Kochi businesses",
    title: "Software Development Services for Businesses in Kochi",
    intro: "Zenith Softworks works remotely with businesses and startups in Kochi that need websites, e-commerce platforms or custom software. We begin by understanding the business workflow, customer journey and technical requirements, then agree on a practical development scope.",
    heading: "Web applications for growing businesses in Kochi",
    body: "Businesses may need a new digital presence, a better online sales journey or software that connects everyday operations. Our remote process supports requirement discussions, design reviews, development updates and a structured handover without implying a physical Kochi office.",
    points: ["Business websites and landing pages", "E-commerce storefronts and checkout workflows", "Custom dashboards and business applications", "Website redesign and performance improvements"],
    note: "Zenith Softworks is based in Kollam, Kerala. Kochi projects are handled through remote collaboration."
  },
  trivandrum: {
    eyebrow: "Remote development for Thiruvananthapuram",
    title: "Software and Website Development for Trivandrum Businesses",
    intro: "Zenith Softworks provides remote website and software development for businesses and startups in Thiruvananthapuram. We help define the purpose of a website or application, identify the essential features and build a solution around the organisation's users and day-to-day requirements.",
    heading: "Practical digital systems for Trivandrum organisations",
    body: "Professional firms and growing teams may need a clearer service website, a customer-facing portal or a tailored internal system. We focus on useful functionality, responsive interfaces, maintainable implementation and a clear handover.",
    points: ["Professional and service-business websites", "Custom portals and management dashboards", "Database-driven web applications", "Redesign, responsive improvements and technical SEO foundations"],
    note: "Zenith Softworks is based in Kollam, Kerala and serves Trivandrum clients remotely."
  },
  calicut: {
    eyebrow: "Remote development for Kozhikode",
    title: "Website Development Services in Calicut, Kerala",
    intro: "Zenith Softworks works remotely with businesses in Kozhikode (Calicut) that want to improve their online presence or build practical software. We develop business websites, e-commerce experiences and custom applications based on the products, services and workflows each organisation needs to support.",
    heading: "Websites and online commerce for Calicut businesses",
    body: "A useful business website should explain what you offer and make enquiries simple. An online store should make product discovery, ordering and management straightforward. We plan each project around its audience, content, integrations and operational requirements.",
    points: ["Business websites and service pages", "E-commerce catalogues and online ordering", "Custom applications and admin dashboards", "Website redesign and mobile usability improvements"],
    note: "Zenith Softworks is based in Kollam, Kerala. Calicut projects are delivered through remote collaboration."
  }
};

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
