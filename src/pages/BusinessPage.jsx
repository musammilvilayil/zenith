import { Link, useParams } from "react-router";
import PageHead from "@/components/layout/PageHead";
import PageHero from "@/components/ui/PageHero";
import CtaBanner from "@/components/ui/CtaBanner";
import NotFoundPage from "./NotFoundPage";

const SERVICES = {
  "website-development": {
    title: "Website Development Company in Kerala",
    intro: "A professional website helps customers understand your business, explore your services and contact you with confidence. We develop responsive business websites with clear navigation, thoughtful layouts and functionality suited to your requirements.",
    description: "Professional, responsive business website development for companies and service providers across India.",
    items: ["Company and corporate websites", "Service business websites", "Landing pages and campaign pages", "Portfolio and professional websites", "Multi-page business websites"],
    features: ["Responsive layouts", "Contact and enquiry forms", "WhatsApp integration", "Content management options where required", "Search-friendly page structure", "Analytics integration and deployment"],
    faqs: [["How much does a business website cost?", "Pricing is custom and depends on the number of pages, design requirements, content, integrations and functionality. We provide a quotation after discussing the scope."], ["Can you redesign an existing website?", "Yes. We can review an existing website and discuss improvements to its structure, design, responsiveness and performance."], ["Do you work outside Kerala?", "Yes. Projects can be delivered remotely across India. In-person discussions can be arranged within Kerala where feasible."], ["Will the website be mobile-friendly?", "Responsive layouts are included so the website can adapt to common mobile, tablet and desktop screen sizes."], ["Will you help with domain and hosting?", "Domain, hosting and deployment requirements can be reviewed and included in the agreed project scope."]],
  },
  "ecommerce-development": {
    title: "E-commerce Website Development in Kerala",
    intro: "Take your products online with an e-commerce website designed to make product discovery, ordering and management easier. We plan the store around your catalogue, customer journey and operational requirements.",
    description: "E-commerce website development with product catalogues, checkout, payment integration and order management.",
    items: ["Product and category management", "Shopping cart and checkout", "Payment gateway integration", "Order and customer management", "Admin dashboard", "Shipping integrations where required"],
    features: ["Mobile-friendly product pages", "Search and product filtering", "Secure checkout integration", "Order status workflows", "Admin-side product updates", "Analytics and launch support"],
    faqs: [["Can you integrate online payments?", "Payment gateway integration can be included after confirming the provider, account requirements and checkout workflow."], ["Can I manage products myself?", "An admin interface for managing products and orders can be included in the agreed scope."], ["How is e-commerce pricing decided?", "Pricing depends on catalogue size, integrations, design, checkout requirements and operational features."], ["Can you add delivery and order tracking?", "Shipping workflows and order status features can be included after confirming the courier or logistics provider and required integrations."], ["Can the store be managed through an admin panel?", "Product, inventory and order management features can be included based on the agreed administrative requirements."]],
  },
  "custom-software-development": {
    title: "Custom Software Development for Businesses in India",
    intro: "When standard tools do not fit your workflow, custom software can provide a more suitable way to manage operations. We develop web-based systems around specific requirements, users and business processes.",
    description: "Custom web applications, dashboards and business tools designed around your operations.",
    items: ["Booking and appointment systems", "Inventory management applications", "Business management dashboards", "Customer and partner portals", "Internal workflow systems", "Custom web applications"],
    features: ["Requirement and workflow analysis", "Role-based access where required", "Frontend and backend development", "Database design and integration", "Testing and deployment", "Technical handover"],
    faqs: [["Can you build software based on our existing process?", "Yes. We begin by understanding the current workflow, users and business rules before proposing a scope."], ["Can the application be expanded later?", "The architecture and delivery plan can account for expected future requirements, subject to scope and budget."], ["Do you provide maintenance?", "Post-launch support and maintenance can be discussed and included as a separate agreed arrangement."], ["Can you integrate third-party APIs?", "API integrations can be included after reviewing the provider documentation, authentication requirements and intended data flow."], ["Will the software work on mobile devices?", "Web applications can be designed responsively where the user workflows require mobile and tablet access."]],
  },
  "website-redesign": {
    title: "Website Redesign Services in Kerala",
    intro: "An outdated website can make it harder for visitors to understand your services or take action. We help improve existing websites through better structure, responsive layouts, usability and technical improvements.",
    description: "Website redesign services focused on usability, responsive layouts, content structure and performance.",
    items: ["Modern interface and visual design", "Mobile responsiveness", "Navigation and content hierarchy", "Performance improvements", "SEO structure and metadata", "Conversion-focused enquiry paths"],
    features: ["Existing-site review", "Content and page structure", "Responsive implementation", "Image and asset optimisation", "Metadata and canonical checks", "Launch and redirect planning"],
    faqs: [["Can you redesign my existing website without losing content?", "We first review the current site and identify content and functionality to preserve, improve or retire."], ["Will redesign improve SEO?", "A redesign can improve technical foundations and usability, but rankings are not guaranteed. Existing URLs, content and redirects must be handled carefully."], ["Can you work with my current platform?", "The available options depend on the current platform, access and technical condition of the website."], ["Will my existing Google rankings be preserved?", "We review existing URLs, metadata and content, and plan redirects where needed. Search rankings cannot be guaranteed, but avoidable migration issues can be reduced."], ["Can you improve website speed during redesign?", "Image optimisation, layout improvements and removal of unnecessary assets can be considered as part of the redesign scope."]],
  },
};

const OVERVIEW = [
  { slug: "website-development", title: "Website Development", desc: "Responsive websites that communicate your business clearly and make it easier for customers to enquire." },
  { slug: "ecommerce-development", title: "E-commerce Development", desc: "Online stores with product, checkout and order-management functionality." },
  { slug: "custom-software-development", title: "Custom Software Development", desc: "Web applications and business tools designed around your workflows." },
  { slug: "website-redesign", title: "Website Redesign", desc: "Improve an existing website's structure, responsiveness and user experience." },
];

const PROCESS = ["Understand your goals and users", "Define scope, deliverables and quotation", "Plan the experience and technical approach", "Develop and review working features", "Test, deploy and hand over the agreed solution"];

export default function BusinessPage() {
  const { slug } = useParams();
  const detail = slug ? SERVICES[slug] : null;
  if (slug && !detail) return <NotFoundPage />;

  return (
    <>
      <PageHead />
      <PageHero
        eyebrow={detail ? "Business development service" : "Business digital solutions · India"}
        title={detail?.title || "Digital Development Solutions for Growing Businesses"}
        description={detail?.intro || "Your digital presence should do more than look good. Zenith Softworks develops business websites, e-commerce platforms and custom software based on your goals, requirements and workflow. Based in Kerala, we work remotely with businesses across India."}
        actions={<><Link className="z-btn z-btn-primary" to="/contact/?type=business">Discuss Your Project</Link><Link className="z-btn z-btn-secondary" to="/projects/">Explore Our Work</Link></>}
        meta="Remote delivery across India · Based in Kerala"
      />

      {detail ? (
        <>
          <section className="z-section">
            <div className="z-container grid gap-12 lg:grid-cols-2">
              <div><span className="z-label z-label-accent">What we can build</span><h2 className="z-display-md mt-4">A solution shaped around your requirements.</h2><p className="mt-4 leading-relaxed text-muted">{detail.description}</p></div>
              <ul className="z-card grid gap-3 p-7">{detail.items.map((item) => <li key={item} className="flex gap-3 text-ink"><span className="text-ice">✦</span>{item}</li>)}</ul>
            </div>
          </section>
          <section className="z-section border-y border-line bg-navy/40"><div className="z-container"><h2 className="z-display-md">Features and delivery considerations</h2><div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{detail.features.map((item) => <div key={item} className="z-card p-5 text-sm text-muted">{item}</div>)}</div></div></section>
          <section className="z-section"><div className="z-container max-w-4xl"><h2 className="z-display-md">Frequently asked questions</h2><div className="mt-8 divide-y divide-line border-t border-line">{detail.faqs.map(([q,a]) => <article key={q} className="py-6"><h3 className="font-display text-lg font-bold">{q}</h3><p className="mt-2 leading-relaxed text-muted">{a}</p></article>)}</div></div></section>
        </>
      ) : (
        <>
          <section className="z-section"><div className="z-container"><div className="max-w-3xl"><span className="z-label z-label-accent">Our services</span><h2 className="z-display-md mt-4">Digital solutions for different business needs.</h2><p className="mt-4 text-muted">We start with the requirement, define a practical scope and select technologies that fit the problem.</p></div><div className="mt-10 grid gap-5 md:grid-cols-2">{OVERVIEW.map((item) => <Link key={item.slug} to={`/business/${item.slug}/`} className="z-card z-card-interactive p-7"><span className="z-num">{String(OVERVIEW.indexOf(item)+1).padStart(2,"0")}</span><h3 className="mt-3 font-display text-2xl font-bold">{item.title}</h3><p className="mt-3 text-sm leading-relaxed text-muted">{item.desc}</p><span className="mt-6 inline-flex text-sm font-semibold text-ice">Explore service ↗</span></Link>)}</div></div></section>
          <section className="z-section border-y border-line bg-navy/40"><div className="z-container"><h2 className="z-display-md">From requirement to launch.</h2><div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">{PROCESS.map((step,i)=><article key={step} className="z-card p-5"><span className="z-num">0{i+1}</span><p className="mt-3 text-sm text-muted">{step}</p></article>)}</div></div></section>
          <section className="z-section"><div className="z-container grid gap-8 lg:grid-cols-[1fr_0.8fr]"><div><h2 className="z-display-md">Custom quotations. Clear scope.</h2><p className="mt-4 max-w-2xl leading-relaxed text-muted">Every project has different requirements. Pricing depends on functionality, design, integrations, content, complexity and delivery scope. Share your requirements and we will discuss a project-specific quotation before development begins.</p></div><div className="z-card p-7"><h3 className="font-display text-xl font-bold">Working across India</h3><p className="mt-3 text-sm leading-relaxed text-muted">Zenith Softworks is based in Kerala. Projects can be delivered remotely across India, with in-person discussions within Kerala where feasible.</p><Link to="/contact/?type=business" className="z-btn z-btn-primary mt-6">Request a custom quote</Link></div></div></section>
        </>
      )}
      <CtaBanner title={detail ? "Let's discuss your requirements." : "Have a business project in mind?"} primaryLabel="Request a custom quote" primaryHref="/contact/?type=business" />
    </>
  );
}
