import { Link } from "react-router";
import { ArrowRight, ArrowUpRight, ArrowDown, Code2, Compass, Cpu, GraduationCap, Globe, ShieldCheck, ShoppingCart, Sparkles } from "lucide-react";
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
  ["Understand your business", "We start with your goals, customers and constraints, not a ready-made template."],
  ["Define a written scope", "Features, timeline and a fixed estimate agreed in writing before any work begins."],
  ["Design and build", "Development in visible milestones, so you can review progress and give feedback early."],
  ["Launch and hand over", "Testing, launch support, documentation and a handover you can actually understand."],
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

      <section className="zn-hero zn-dark">
        <div className="zn-wrap zn-hero-grid">
          <div>
            <span className="zn-pill">Digital development studio · Kollam, Kerala</span>
            <h1>Software &amp; Website Development Company in <em>Kerala</em></h1>
            <p className="zn-lede">We turn clear requirements into responsive websites, online stores and custom software for businesses across India, with plain-language communication and a written scope from day one.</p>
            <div className="zn-hero-actions">
              <Link to="/contact/" className="zn-button zn-button-primary">Get a free project estimate <i><ArrowUpRight size={18} /></i></Link>
              <Link to="/projects/" className="zn-arrow-link">See our work <ArrowRight size={16} /></Link>
            </div>
            <ul className="zn-hero-meta">
              <li>Remote across India</li>
              <li>Written scope &amp; quote</li>
              <li>Student project support</li>
              <li><a href="#about" style={{ color: "inherit", textDecoration: "none" }}>Scroll <ArrowDown size={12} style={{ verticalAlign: "-1px" }} /></a></li>
            </ul>
          </div>
          <div className="zn-hero-visual" aria-hidden="true">
            <img src={BRAND_IMAGES.markLogo} alt="" width="240" height="212" fetchPriority="high" />
          </div>
        </div>
      </section>

      <section className="zn-section zn-paper" id="about">
        <div className="zn-wrap zn-about">
          <div>
            <p className="zn-label">01 — About the studio</p>
            <h2 className="zn-h2">Websites and software built around <em>how you work.</em></h2>
          </div>
          <div>
            <p className="zn-copy">Zenith Softworks is an independent digital development studio in Kollam, Kerala. We build business websites, e-commerce stores and custom software for clients across India, working remotely with clear communication from the first call to the final handover. Every project starts with your requirement: who the users are, what they need to do and how success will be measured. Only then do we choose the technology and agree a scope in writing. We also help BCA, BTech and MCA students build academic projects they understand and can explain at viva. If you are planning a new website, an online store or an internal tool, tell us what you need and we will suggest a sensible next step.</p>
            <div className="zn-stats">
              <div><strong>Kerala-based</strong><span>Studio in Kollam, serving all of India</span></div>
              <div><strong>Written scope</strong><span>Quote and timeline before work begins</span></div>
              <div><strong>Clear handover</strong><span>Documentation and walkthroughs included</span></div>
            </div>
          </div>
        </div>
      </section>

      <section className="zn-section zn-dark">
        <div className="zn-wrap">
          <div className="zn-head">
            <div>
              <p className="zn-label">02 — What we build</p>
              <h2 className="zn-h2">Website development, e-commerce <em>and custom software.</em></h2>
            </div>
            <p className="zn-lede">From the first sketch to the final handover, strategy, design and development stay in one focused process.</p>
          </div>
          <div className="zn-grid-4">
            {services.map(({ icon: Icon, title, text, href }, i) => (
              <Link to={href} className="zn-card zn-service" key={title}>
                <span className="zn-num">0{i + 1}</span>
                <span className="zn-icon"><Icon size={24} /></span>
                <h3>{title}</h3>
                <p>{text}</p>
                <span className="zn-more">Learn more <ArrowRight size={15} /></span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="zn-section zn-paper">
        <div className="zn-wrap">
          <div className="zn-head">
            <div>
              <p className="zn-label">03 — Our approach</p>
              <h2 className="zn-h2">We start with your requirement, <em>not a template.</em></h2>
            </div>
            <p className="zn-lede">You always know what is being built, why it matters and what happens next.</p>
          </div>
          <div className="zn-steps">
            {steps.map(([title, text], i) => (
              <div className="zn-step" key={title}><span>0{i + 1}</span><h3>{title}</h3><p>{text}</p></div>
            ))}
          </div>
        </div>
      </section>

      <section className="zn-section zn-dark" id="work">
        <div className="zn-wrap">
          <div className="zn-head">
            <div>
              <p className="zn-label">04 — Selected projects</p>
              <h2 className="zn-h2">Ideas, made <em>real.</em></h2>
            </div>
            <div><Link to="/projects/" className="zn-arrow-link">View all projects <ArrowUpRight size={17} /></Link></div>
          </div>
          <div className="zn-grid-2">
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

      <section className="zn-section zn-paper">
        <div className="zn-wrap">
          <div className="zn-head">
            <div>
              <p className="zn-label">05 — Why Zenith</p>
              <h2 className="zn-h2">Not just another <em>development studio.</em></h2>
            </div>
          </div>
          <div className="zn-why">
            {principles.map(({ icon: Icon, title, text }) => (
              <article key={title}><Icon /><h3>{title}</h3><p>{text}</p></article>
            ))}
          </div>
        </div>
      </section>

      <section className="zn-section zn-dark-2">
        <div className="zn-wrap zn-students">
          <div>
            <p className="zn-label">06 — For students</p>
            <h2 className="zn-h2">BCA, BTech and MCA projects you can <em>explain.</em></h2>
            <p className="zn-lede" style={{ marginTop: 22, maxWidth: 520 }}>Practical project support with documentation and code walkthroughs, for students across Kerala and India.</p>
            <ul className="zn-chiplist">
              <li><Link to="/student-projects/bca-project-development/">BCA</Link></li>
              <li><Link to="/student-projects/btech-project-development/">BTech</Link></li>
              <li><Link to="/student-projects/mca-project-development/">MCA</Link></li>
              <li><Link to="/student-projects/python-project-development/">Python</Link></li>
              <li><Link to="/student-projects/ai-ml-project-development/">AI / ML</Link></li>
            </ul>
            <Link to="/student-projects/" className="zn-button zn-button-primary">Explore student projects <i><ArrowUpRight size={18} /></i></Link>
          </div>
          <div className="zn-card zn-students-panel">
            <h3>What you get</h3>
            <ul>
              <li>A project plan matched to your syllabus and deadline</li>
              <li>Working code with guided implementation support</li>
              <li>Report documentation as agreed in the scope</li>
              <li>A walkthrough so you can present it confidently at viva</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="zn-section zn-paper">
        <div className="zn-wrap zn-faq">
          <div>
            <p className="zn-label">07 — Before we begin</p>
            <h2 className="zn-h2">Questions worth <em>asking.</em></h2>
            <p className="zn-lede">Working from Kollam and serving Kochi, Trivandrum, Calicut and the rest of India.</p>
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

      <section className="zn-cta-band">
        <div className="zn-wrap">
          <p className="zn-label">Let's talk</p>
          <h2>Ready to plan your next <em>website or software?</em></h2>
          <Link to="/contact/" className="zn-button zn-button-dark">Start a conversation <i><ArrowUpRight size={18} /></i></Link>
        </div>
        <span className="zn-wordmark" aria-hidden="true">ZENITH</span>
      </section>
    </>
  );
}
