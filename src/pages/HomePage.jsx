import { Link } from "react-router";
import { ArrowRight, ArrowUpRight, ArrowDown, Code2, Compass, Cpu, GraduationCap, Globe, ShieldCheck, ShoppingCart, Sparkles } from "lucide-react";
import PageHead from "@/components/layout/PageHead";
import { CASE_STUDIES } from "@/data/work";
import { BRAND_IMAGES } from "@/data/site";
import PinnedShowcase from "@/components/ui/PinnedShowcase";

const services = [
  { icon: Globe, title: "Website development", text: "Fast, responsive business websites that explain what you do and make it easy to enquire.", href: "/business/website-development/" },
  { icon: ShoppingCart, title: "E-commerce development", text: "Online stores with catalogues, checkout, payments and order management built around how you sell.", href: "/business/ecommerce-development/" },
  { icon: Code2, title: "Custom software", text: "Web applications, dashboards and internal tools shaped around your real workflows.", href: "/business/custom-software-development/" },
  { icon: GraduationCap, title: "BCA, BTech & MCA projects", text: "Guided project development with documentation and code walkthroughs you can explain at viva.", href: "/student-projects/" },
];

const showcase = [
  { short: "Websites", tag: "Website development", ghost: "WEBSITES", title: "Websites that explain and convert.", text: "Fast, responsive business websites with clear navigation, search-friendly structure and an easy way for customers to enquire.", href: "/business/website-development/", image: BRAND_IMAGES.workMeghamImg, alt: "Cloud file management web application interface" },
  { short: "E-commerce", tag: "E-commerce development", ghost: "STOREFRONTS", title: "Online stores built around how you sell.", text: "Product catalogues, checkout, payments and order management shaped to your products, pricing and delivery.", href: "/business/ecommerce-development/", image: BRAND_IMAGES.workProjexifyImg, alt: "Project collaboration platform dashboard" },
  { short: "Software", tag: "Custom software", ghost: "SOFTWARE", title: "Software for real workflows.", text: "Web applications, dashboards and internal tools that replace spreadsheets and manual follow-ups with one reliable system.", href: "/business/custom-software-development/", image: BRAND_IMAGES.workCarematrixImg, alt: "Hospital intelligence dashboard" },
  { short: "Student projects", tag: "BCA · BTech · MCA", ghost: "STUDENTS", title: "Projects you can build and explain.", text: "Guided project development with documentation and code walkthroughs, so you understand every module at viva.", href: "/student-projects/", image: BRAND_IMAGES.studentLabImg, alt: "Students working on a software project" },
];

const steps = [
  ["Understand your business", "Goals, customers and constraints first, not a ready-made template."],
  ["Define a written scope", "Features, timeline and estimate agreed in writing before work begins."],
  ["Design and build", "Visible milestones, so you can review progress and give early feedback."],
  ["Launch and hand over", "Testing, launch support and documentation you can understand."],
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

      {/* 1 — centred hero with glow mark and bottom meta bar */}
      <section className="zn-hero zn-hero-center zn-dark">
        <img className="zn-hero-bgmark" src={BRAND_IMAGES.markLogo} alt="" aria-hidden="true" width="240" height="212" fetchPriority="high" />
        <div className="zn-wrap zn-hero-inner">
          <span className="zn-pill">Digital development studio · Kollam, Kerala</span>
          <h1>Software &amp; Website Development Company in <em>Kerala</em></h1>
          <p className="zn-lede">We turn clear requirements into responsive websites, online stores and custom software for businesses across India, with a written scope from day one.</p>
          <div className="zn-hero-actions">
            <Link to="/contact/" className="zn-button zn-button-primary">Get a free project estimate <i><ArrowUpRight size={18} /></i></Link>
            <Link to="/projects/" className="zn-button zn-button-ghost">See our work</Link>
          </div>
        </div>
        <div className="zn-wrap zn-hero-bar">
          <span>Studio in Kollam, Kerala</span>
          <a href="#about" className="zn-scroll"><i />Scroll</a>
          <span>Remote across India</span>
        </div>
      </section>

      {/* 2 — split: visual left, text right */}
      <section className="zn-section zn-paper" id="about">
        <div className="zn-wrap zn-split">
          <div className="zn-split-media">
            <img src={BRAND_IMAGES.heroAbstractImg} alt="Abstract Zenith digital development visual" loading="lazy" decoding="async" />
            <span>Kollam · Kerala</span>
          </div>
          <div className="zn-split-copy">
            <p className="zn-label">About the studio</p>
            <h2 className="zn-h2 zn-h2-md">Websites and software built around <em>how you work.</em></h2>
            <p className="zn-copy">Zenith Softworks is an independent digital development studio in Kollam, Kerala. We build business websites, e-commerce stores and custom software for clients across India, working remotely with clear communication from the first call to the final handover.</p>
            <p className="zn-copy">Every project starts with your requirement: who the users are, what they need to do and how success will be measured. Only then do we choose the technology and agree a scope in writing. We also help BCA, BTech and MCA students build academic projects they understand and can explain at viva.</p>
            <p className="zn-copy">If you are planning a new website, an online store or an internal tool, tell us what you need and we will suggest a sensible next step.</p>
          </div>
        </div>
      </section>

      {/* 3 — horizontal timeline with dots on a line */}
      <section className="zn-section zn-dark">
        <div className="zn-wrap">
          <div className="zn-head">
            <div>
              <p className="zn-label">Our approach</p>
              <h2 className="zn-h2">We start with your requirement, <em>not a template.</em></h2>
            </div>
            <p className="zn-lede">Four connected steps. Each one builds on the last.</p>
          </div>
          <ol className="zn-timeline">
            {steps.map(([title, text], i) => (
              <li key={title}><i /><span>0{i + 1}</span><h3>{title}</h3><p>{text}</p></li>
            ))}
          </ol>
        </div>
      </section>

      {/* 4 — pinned scroll showcase */}
      <section className="zn-pin-section zn-dark" aria-labelledby="what-we-build">
        <div className="zn-wrap zn-pin-head">
          <p className="zn-label">What we build</p>
          <h2 className="zn-h2" id="what-we-build">Website development, e-commerce <em>and custom software.</em></h2>
        </div>
        <PinnedShowcase items={showcase} />
      </section>

      {/* 5 — hover-dim list rows */}
      <section className="zn-section zn-dark-2" id="work">
        <div className="zn-wrap">
          <div className="zn-head">
            <div>
              <p className="zn-label">Selected projects</p>
              <h2 className="zn-h2">Ideas, made <em>real.</em></h2>
            </div>
            <div><Link to="/projects/" className="zn-arrow-link">All projects <ArrowUpRight size={17} /></Link></div>
          </div>
          <div className="zn-rows">
            {CASE_STUDIES.map((project) => (
              <Link to={"/projects/" + project.slug + "/"} className="zn-row" key={project.slug}>
                <img src={project.image} alt={project.imageAlt} loading="lazy" decoding="async" />
                <span className="zn-row-num">{project.index}</span>
                <div><h3>{project.title}</h3><p>{project.homeSummary}</p></div>
                <span className="zn-row-cat">{project.category}</span>
                <ArrowUpRight className="zn-row-arrow" size={22} />
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 6 — tall coloured cards */}
      <section className="zn-section zn-paper">
        <div className="zn-wrap">
          <div className="zn-head">
            <div>
              <p className="zn-label">Why Zenith</p>
              <h2 className="zn-h2">Not just another <em>development studio.</em></h2>
            </div>
          </div>
          <div className="zn-tall">
            {principles.map(({ icon: Icon, title, text }, i) => (
              <article className={"zn-tall-" + (i + 1)} key={title}>
                <span className="zn-tall-top"><b>0{i + 1}</b><Icon size={22} /></span>
                <div><h3>{title}</h3><p>{text}</p></div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* 7 — students */}
      <section className="zn-section zn-dark">
        <div className="zn-wrap zn-students">
          <div>
            <p className="zn-label">For students</p>
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

      {/* 8 — FAQ */}
      <section className="zn-section zn-paper">
        <div className="zn-wrap zn-faq">
          <div>
            <p className="zn-label">Before we begin</p>
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

      {/* 9 — glow CTA (wave footer follows from the layout) */}
      <section className="zn-cta-glow zn-dark">
        <div className="zn-wrap">
          <p className="zn-label">Let's talk</p>
          <h2>Ready to plan your next <em>website or software?</em></h2>
          <Link to="/contact/" className="zn-button zn-button-primary">Start a conversation <i><ArrowUpRight size={18} /></i></Link>
        </div>
      </section>
    </>
  );
}
