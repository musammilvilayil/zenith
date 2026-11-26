import { Link } from "react-router";
import { ArrowRight, ArrowUpRight, Code2, Compass, Cpu, GraduationCap, Globe, ShieldCheck, ShoppingCart, Sparkles } from "lucide-react";
import PageHead from "@/components/layout/PageHead";
import { CASE_STUDIES } from "@/data/work";
import { BRAND_IMAGES } from "@/data/site";

const services = [
  { icon: Globe, title: "Website development", text: "Fast, responsive business websites that explain what you do and make it easy to enquire.", href: "/business/website-development/" },
  { icon: ShoppingCart, title: "E-commerce development", text: "Online stores with catalogues, checkout, payments and order management built around how you sell.", href: "/business/ecommerce-development/" },
  { icon: Code2, title: "Custom software", text: "Web applications, dashboards and internal tools shaped around your real workflows.", href: "/business/custom-software-development/" },
  { icon: GraduationCap, title: "BCA, BTech & MCA projects", text: "Guided project development with documentation and code walkthroughs you can explain at viva.", href: "/student-projects/" },
];

const steps = [
  ["Listen", "We start with your goals, users and constraints, not a template."],
  ["Scope", "A written scope, timeline and estimate before any work begins."],
  ["Build", "Design and development in visible milestones you can review."],
  ["Deliver", "Testing, launch support and a clear handover you can understand."],
];

const principles = [
  { icon: Compass, title: "Purpose first", text: "Understand the problem before choosing the solution." },
  { icon: ShieldCheck, title: "Built with care", text: "Accessible, responsive and maintainable by design." },
  { icon: Cpu, title: "Practical technology", text: "The right tools, never complexity for its own sake." },
  { icon: Sparkles, title: "Clear handover", text: "Useful documentation and a product you can run yourself." },
];

const cities = [
  ["Kollam", "/website-development-company-kollam/"],
  ["Kochi", "/software-development-company-kochi/"],
  ["Trivandrum", "/software-development-company-trivandrum/"],
  ["Calicut", "/website-development-company-calicut/"],
];

const questions = [
  ["What does Zenith Softworks build?", "We develop business websites, e-commerce platforms, custom software and academic software projects. Every engagement starts by understanding the requirement and agreeing on a practical scope."],
  ["Can you work with clients outside Kerala?", "Yes. We work remotely with clients across India using video calls, shared milestones and WhatsApp or email updates. In-person meetings within Kerala can be arranged where feasible."],
  ["How much does a project cost?", "Pricing depends on scope, features, integrations and design complexity. We share a written quotation after understanding your requirement, so you know the cost before work starts."],
  ["Do you support BCA, BTech and MCA projects?", "Yes. We provide practical development support, agreed documentation and code walkthroughs. Students are expected to take part in and understand their project work."],
];

export default function HomePage() {
  return (
    <>
      <PageHead />

      <section className="zn-hero">
        <div className="zn-wrap zn-hero-grid">
          <div className="zn-hero-copy">
            <span className="zn-pill">Digital development studio · Kollam, Kerala</span>
            <h1>Software &amp; Website Development Company in <span className="zn-grad-text">Kerala</span></h1>
            <p className="zn-lede">We turn clear requirements into responsive websites, online stores and custom software for businesses across India, with plain-language communication and a written scope from day one.</p>
            <div className="zn-hero-actions">
              <Link to="/contact/" className="zn-button zn-button-primary">Get a free project estimate <ArrowUpRight size={18} /></Link>
              <Link to="/projects/" className="zn-button zn-button-ghost">See our work</Link>
            </div>
            <ul className="zn-hero-facts">
              <li>Remote across India</li>
              <li>Written scope &amp; quote</li>
              <li>Student project support</li>
            </ul>
          </div>
          <div className="zn-hero-visual" aria-hidden="true">
            <img src={BRAND_IMAGES.markLogo} alt="" width="240" height="212" fetchPriority="high" />
          </div>
        </div>
      </section>

      <section className="zn-section">
        <div className="zn-wrap zn-intro-grid">
          <div>
            <p className="zn-overline">About the studio</p>
            <h2 className="zn-h2">Websites and software built around <span className="zn-grad-text">how you work</span></h2>
          </div>
          <div>
            <p className="zn-intro-copy">Zenith Softworks is an independent digital development studio in Kollam, Kerala. We build business websites, e-commerce stores and custom software for clients across India, working remotely with clear communication from the first call to the final handover. Every project starts with your requirement: who the users are, what they need to do and how success will be measured. Only then do we choose the technology and agree a scope in writing. We also help BCA, BTech and MCA students build academic projects they understand and can explain at viva. If you are planning a new website, an online store or an internal tool, tell us what you need and we will suggest a sensible next step.</p>
            <div className="zn-stat-row">
              <div><strong>Kerala-based</strong><span>Studio in Kollam, serving all of India</span></div>
              <div><strong>Written scope</strong><span>Quote and timeline before work begins</span></div>
              <div><strong>Clear handover</strong><span>Documentation and walkthroughs included</span></div>
            </div>
          </div>
        </div>
      </section>

      <section className="zn-section zn-section-alt">
        <div className="zn-wrap">
          <div className="zn-pathways">
            <div className="zn-card zn-pathway">
              <p className="zn-overline">For businesses</p>
              <h3>Make your digital presence a strength.</h3>
              <p>Websites, e-commerce and custom platforms that help your business communicate clearly and operate smarter.</p>
              <Link to="/business/" className="zn-button zn-button-primary">Explore business solutions <ArrowUpRight size={17} /></Link>
            </div>
            <div className="zn-card zn-pathway">
              <p className="zn-overline">For students</p>
              <h3>Build it. Understand it. Present it.</h3>
              <p>Practical software project support for BCA, BTech, MCA and computing students across Kerala and India.</p>
              <Link to="/student-projects/" className="zn-button zn-button-ghost">Explore student projects <ArrowUpRight size={17} /></Link>
            </div>
          </div>
        </div>
      </section>

      <section className="zn-section">
        <div className="zn-wrap">
          <div className="zn-section-head">
            <div>
              <p className="zn-overline">What we do</p>
              <h2 className="zn-h2">Website development, e-commerce<br />and custom software</h2>
            </div>
            <p className="zn-lede">From the first sketch to the final handover, strategy, design and development stay in one focused process.</p>
          </div>
          <div className="zn-service-grid">
            {services.map(({ icon: Icon, title, text, href }) => (
              <Link to={href} className="zn-card zn-service" key={title}>
                <span className="zn-icon"><Icon size={22} /></span>
                <h3>{title}</h3>
                <p>{text}</p>
                <span className="zn-more">Learn more <ArrowRight size={15} /></span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="zn-section zn-section-alt" id="work">
        <div className="zn-wrap">
          <div className="zn-section-head">
            <div>
              <p className="zn-overline">Selected projects</p>
              <h2 className="zn-h2">Ideas, made <span className="zn-grad-text">real</span></h2>
            </div>
            <Link to="/projects/" className="zn-arrow-link">View all projects <ArrowUpRight size={17} /></Link>
          </div>
          <div className="zn-project-grid">
            {CASE_STUDIES.map((project) => (
              <Link to={"/projects/" + project.slug + "/"} className="zn-card zn-project" key={project.slug}>
                <div className="zn-project-visual">
                  <img src={project.image} alt={project.imageAlt} loading="lazy" decoding="async" />
                  <span className="zn-project-open"><ArrowUpRight size={20} /></span>
                </div>
                <div className="zn-project-body">
                  <span className="zn-project-type">{project.index} / {project.category}</span>
                  <h3>{project.title}</h3>
                  <p>{project.homeSummary}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="zn-section">
        <div className="zn-wrap">
          <div className="zn-section-head">
            <div>
              <p className="zn-overline">How we work</p>
              <h2 className="zn-h2">A process with <span className="zn-grad-text">no guesswork</span></h2>
            </div>
            <p className="zn-lede">You always know what is being built, why it matters and what happens next.</p>
          </div>
          <div className="zn-process">
            {steps.map(([title, text], i) => (
              <div key={title}><span>0{i + 1}</span><h3>{title}</h3><p>{text}</p></div>
            ))}
          </div>
          <div className="zn-principles" style={{ marginTop: 28 }}>
            {principles.map(({ icon: Icon, title, text }) => (
              <article className="zn-card" key={title}><Icon /><h3>{title}</h3><p>{text}</p></article>
            ))}
          </div>
        </div>
      </section>

      <section className="zn-section zn-section-alt">
        <div className="zn-wrap zn-faq-grid">
          <div>
            <p className="zn-overline">Before we begin</p>
            <h2 className="zn-h2">Questions worth <span className="zn-grad-text">asking</span></h2>
            <p className="zn-lede">Working from Kollam and serving Kochi, Trivandrum, Calicut and the rest of India. Tell us what you are planning and we will suggest a sensible next step.</p>
            <Link to="/contact/" className="zn-arrow-link">Talk to our team <ArrowUpRight size={17} /></Link>
            <nav className="zn-cities" aria-label="Locations we serve">
              {cities.map(([name, href]) => <Link key={href} to={href}>{name}</Link>)}
            </nav>
          </div>
          <div className="zn-faq-list">
            {questions.map(([question, answer]) => (
              <details key={question}><summary>{question}<span>+</span></summary><p>{answer}</p></details>
            ))}
          </div>
        </div>
      </section>

      <section className="zn-section zn-contact-band">
        <div className="zn-wrap">
          <div className="zn-cta-box">
            <p className="zn-overline">Have a project in mind?</p>
            <h2>Let's build something <span className="zn-grad-text">worth launching.</span></h2>
            <Link to="/contact/" className="zn-button zn-button-primary">Start a conversation <ArrowUpRight size={18} /></Link>
            <img src={BRAND_IMAGES.markLogo} alt="" aria-hidden="true" />
          </div>
        </div>
      </section>
    </>
  );
}
