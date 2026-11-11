import { useEffect, useState } from "react";
import {
  ArrowDownRight, ArrowUpRight, BrainCircuit, Braces,
  ChevronDown, Cloud, Code2, Layers3, Mail,
  Menu, MessageCircle, MousePointer2, Phone, ShieldCheck, Smartphone,
  Sparkles, Workflow, X, Zap
} from "lucide-react";

const services = [
  { number: "01", icon: Code2, title: "Custom software", detail: "Purpose-built platforms, business tools and software shaped around the way your team actually works.", tags: ["Product engineering", "Business systems", "API development"] },
  { number: "02", icon: Smartphone, title: "Web & mobile apps", detail: "Fast, considered digital experiences — from marketing websites and e-commerce to full-stack applications.", tags: ["Web applications", "Mobile experiences", "E-commerce"] },
  { number: "03", icon: Cloud, title: "Cloud & integrations", detail: "Connected services and dependable foundations that help products communicate, scale and stay maintainable.", tags: ["Cloud setup", "Third-party APIs", "Database design"] },
  { number: "04", icon: BrainCircuit, title: "AI & automation", detail: "Useful AI capabilities and thoughtful automations that remove repetitive work and unlock better workflows.", tags: ["AI integrations", "Workflow automation", "Data intelligence"] },
];

const technologies = ["React", "Node.js", "Python", "TypeScript", "MongoDB", "MySQL", "AWS", "Firebase", "Flutter", "Docker", "Git"];

const projects = [
  { name: "NeuroTwin", category: "AI · RESEARCH PROTOTYPE", description: "An EEG analysis and digital-twin research platform exploring seizure-event detection and signal visualisation.", stack: ["Python", "TensorFlow", "FastAPI", "React"], status: "Research prototype", visual: "neuro" },
  { name: "MEGHAM", category: "CLOUD · PRODUCT CONCEPT", description: "A cloud workspace concept focused on organising files, sharing resources and managing access.", stack: ["React", "Node.js", "MongoDB"], status: "Independent concept", visual: "cloud" },
  { name: "Healthiet", category: "WEB APPLICATION", description: "A health and wellness application concept with user-focused workflows and data-driven recommendations.", stack: ["React", "Node.js", "MongoDB"], status: "Independent project", visual: "health" },
  { name: "PredX", category: "MACHINE LEARNING", description: "An experimental prediction project exploring how structured data can become useful, understandable insights.", stack: ["Python", "Machine Learning"], status: "Independent project", visual: "pred" },
  { name: "Aegis DRM", category: "DOCUMENT SECURITY", description: "A digital-rights concept exploring controlled access and protection workflows for digital documents.", stack: ["Web technologies", "Security workflows"], status: "Concept / prototype", visual: "aegis" },
  { name: "Cookit", category: "FOOD · DISCOVERY", description: "A recipe discovery experience designed around simple exploration and practical cooking workflows.", stack: ["React", "JavaScript", "API integration"], status: "Independent project", visual: "cook" },
];

const steps = [
  ["01", "Discover", "Understand the people, problem and outcome before choosing a solution."],
  ["02", "Plan", "Agree on scope, priorities, milestones and a practical technical direction."],
  ["03", "Design", "Shape the experience with clear flows, useful feedback and responsive layouts."],
  ["04", "Develop", "Build in focused iterations, share progress and test as we go."],
  ["05", "Launch & improve", "Ship carefully, hand over clearly and keep improving where it matters."],
];

function Brand({ footer = false }) {
  return <a className={`brand ${footer ? "brand-footer" : ""}`} href="#top" aria-label="Zenith Softworks home">
    <img src="/assets/zenith-mark.svg" alt="" width="38" height="38" />
    <span className="brand-type"><strong>ZENITH<span>.</span></strong><small>SOFTWORKS</small></span>
  </a>;
}

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  useEffect(() => {
    document.body.classList.toggle("menu-is-open", menuOpen);
    return () => document.body.classList.remove("menu-is-open");
  }, [menuOpen]);
  const links = [["Studio", "#studio"], ["Services", "#services"], ["Technology", "#technology"], ["Work", "#work"], ["Contact", "#contact"]];
  return <header className={`site-header ${scrolled ? "is-scrolled" : ""}`}>
    <div className="nav-wrap"><Brand />
      <nav className={menuOpen ? "nav-links is-open" : "nav-links"} aria-label="Main navigation">
        {links.map(([label, href]) => <a key={label} href={href} onClick={() => setMenuOpen(false)}>{label}</a>)}
        <a className="nav-cta" href="#contact" onClick={() => setMenuOpen(false)}>Start a project <ArrowUpRight size={15}/></a>
      </nav>
      <button className="menu-toggle" type="button" onClick={() => setMenuOpen(v => !v)} aria-label={menuOpen ? "Close navigation" : "Open navigation"} aria-expanded={menuOpen}>{menuOpen ? <X/> : <Menu/>}</button>
    </div>
  </header>;
}

function SectionIntro({ index, eyebrow, title, accent, copy }) {
  return <div className="section-intro reveal">
    <div className="section-kicker"><span>{index}</span><i/>{eyebrow}</div>
    <div className="section-intro-grid"><h2>{title}<em>{accent}</em></h2>{copy && <p>{copy}</p>}</div>
  </div>;
}

function ProjectVisual({ type, name }) {
  return <div className={`project-visual visual-${type}`} aria-hidden="true">
    <div className="visual-grid"/>
    <div className="visual-orbit orbit-one"/><div className="visual-orbit orbit-two"/>
    <div className="visual-core"><span>{name.slice(0, 1)}</span></div>
    <div className="visual-caption">{type === "neuro" ? "SIGNAL / 01" : type === "cloud" ? "CONNECTED / 02" : type === "health" ? "WELLNESS / 03" : type === "pred" ? "INSIGHT / 04" : type === "aegis" ? "SECURE / 05" : "DISCOVER / 06"}</div>
    <span className="visual-cross cross-one">+</span><span className="visual-cross cross-two">+</span>
  </div>;
}

function ProjectCard({ project, index }) {
  return <article className="project-card reveal">
    <ProjectVisual type={project.visual} name={project.name}/>
    <div className="project-card-body">
      <div className="project-topline"><span>{project.category}</span><span>0{index + 1}</span></div>
      <h3>{project.name}<ArrowUpRight size={19}/></h3>
      <p>{project.description}</p>
      <div className="project-tags">{project.stack.map(tag => <span key={tag}>{tag}</span>)}</div>
      <div className="project-status"><i/>{project.status}</div>
    </div>
  </article>;
}

function EnquiryForm() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", service: "Web application", message: "" });
  const [status, setStatus] = useState("");
  const [sending, setSending] = useState(false);
  const [startedAt] = useState(() => Date.now());
  const update = event => setForm(current => ({ ...current, [event.target.name]: event.target.value }));
  const fallback = () => {
    const body = `Name: ${form.name}\nEmail: ${form.email}\nPhone: ${form.phone}\nService: ${form.service}\n\nProject details:\n${form.message}`;
    window.location.href = `mailto:hello@zenithsoftworks.in?subject=${encodeURIComponent("Project enquiry — Zenith Softworks")}&body=${encodeURIComponent(body)}`;
  };
  const submit = async event => {
    event.preventDefault();
    setSending(true);
    setStatus("");
    try {
      const response = await fetch("/api/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, page: window.location.href, form_started_at: startedAt }),
      });
      const result = await response.json().catch(() => ({}));
      if (response.ok && result.ok && result.delivered) {
        setStatus("Your enquiry has been sent. Thank you — we'll be in touch.");
        setForm({ name: "", email: "", phone: "", service: "Web application", message: "" });
      } else if (response.status === 503 || result.code === "EMAIL_NOT_CONFIGURED") {
        setStatus("Online email delivery isn't configured yet. Your email app will open with the details ready.");
        fallback();
      } else {
        setStatus(result.error || "We couldn't confirm delivery. Please email hello@zenithsoftworks.in.");
      }
    } catch {
      setStatus("The online form is unavailable. Your email app will open with the details ready.");
      fallback();
    } finally {
      setSending(false);
    }
  };
  return <form className="contact-form reveal" onSubmit={submit}>
    <div className="form-row">
      <label>Your name<input name="name" autoComplete="name" required maxLength="100" value={form.name} onChange={update} placeholder="Your name"/></label>
      <label>Email address<input name="email" type="email" autoComplete="email" required maxLength="254" value={form.email} onChange={update} placeholder="you@example.com"/></label>
    </div>
    <div className="form-row">
      <label>Phone number<input name="phone" type="tel" autoComplete="tel" required maxLength="30" value={form.phone} onChange={update} placeholder="+91 98765 43210"/></label>
      <label>What do you need?
        <span className="select-wrap"><select name="service" value={form.service} onChange={update}>
          <option>Custom software development</option><option>Web application</option><option>Mobile application</option><option>Cloud solutions & integrations</option><option>AI integrations & automation</option><option>AI and automation</option><option>Business website</option><option>Website redesign</option><option>E-commerce website</option><option>Startup MVP</option><option>Other</option>
        </select><ChevronDown size={16}/></span>
      </label>
    </div>
    <label>Tell us about your project<textarea name="message" required minLength="10" maxLength="4000" rows="5" value={form.message} onChange={update} placeholder="A little about the idea, what you need and what success looks like..."/></label>
    <div className="form-submit"><button className="button button-primary" type="submit" disabled={sending}>{sending ? "Sending..." : "Send project enquiry"} <ArrowUpRight size={17}/></button><span role="status" aria-live="polite">{status || "We’ll only use these details to respond to your enquiry."}</span></div>
  </form>;
}

function ContactSection() {
  return <section className="contact-section section-pad" id="contact">
    <div className="container"><div className="contact-layout">
      <div className="contact-copy reveal"><div className="section-kicker"><span>08</span><i/>LET'S BUILD SOMETHING</div>
        <p className="eyebrow">HAVE AN IDEA TAKING SHAPE?</p><h2>Let's make it<br/><em>real.</em></h2>
        <p className="contact-lead">Tell us what you're imagining. We'll listen, ask the right questions and help you find a practical next step.</p>
        <div className="contact-links">
          <a href="mailto:hello@zenithsoftworks.in"><Mail size={17}/>hello@zenithsoftworks.in<ArrowUpRight size={14}/></a>
          <a href="tel:+919497665504"><Phone size={17}/>+91 94976 65504<ArrowUpRight size={14}/></a>
          <span><MessageCircle size={17}/>Kollam, Kerala, India</span>
        </div>
      </div>
      <EnquiryForm/>
    </div></div>
  </section>;
}

function Footer() {
  return <footer className="site-footer"><div className="container">
    <div className="footer-top"><div><Brand footer/><p>Digital products, engineered with clarity.<br/>Built around people. Ready for what’s next.</p></div>
      <div className="footer-nav"><span>EXPLORE</span><a href="#studio">Studio</a><a href="#services">Services</a><a href="#technology">Technology</a><a href="#work">Selected work</a></div>
      <div className="footer-nav"><span>CONNECT</span><a href="mailto:hello@zenithsoftworks.in">Email us</a><a href="https://www.instagram.com/zenith.softworks/" target="_blank" rel="noreferrer">Instagram <ArrowUpRight size={13}/></a><a href="https://github.com/musammilvilayil" target="_blank" rel="noreferrer">GitHub <ArrowUpRight size={13}/></a></div>
    </div>
    <div className="footer-bottom"><span>© {new Date().getFullYear()} Zenith Softworks. All rights reserved.</span><span>DESIGNED & DEVELOPED BY ZENITH SOFTWORKS</span><a href="#top">BACK TO TOP ↑</a></div>
  </div></footer>;
}

function Home() {
  useEffect(() => {
    const nodes = document.querySelectorAll(".reveal");
    if (!("IntersectionObserver" in window)) {
      nodes.forEach(node => node.classList.add("is-visible"));
      return;
    }
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });
    nodes.forEach(node => observer.observe(node));
    return () => observer.disconnect();
  }, []);

  return <>
    <Header/>
    <main id="top">
      <section className="hero-section">
        <div className="hero-noise"/>
        <div className="hero-glow glow-a"/><div className="hero-glow glow-b"/>
        <div className="container hero-container">
          <div className="hero-overline"><span><i/>INDEPENDENT SOFTWARE STUDIO</span><span>KOLLAM · INDIA</span></div>
          <div className="hero-grid">
            <div className="hero-copy">
              <p className="eyebrow"><Sparkles size={14}/> IDEAS, ENGINEERED INTO REALITY</p>
              <h1>Engineering digital experiences that <em>move you forward.</em></h1>
              <p className="hero-description">We design and build scalable digital products, intelligent software and modern web experiences that turn ambitious ideas into useful reality.</p>
              <div className="hero-actions"><a className="button button-primary" href="#services">Explore services <ArrowUpRight size={17}/></a><a className="button button-quiet" href="#contact">Start a project <ArrowDownRight size={17}/></a></div>
              <div className="hero-footnote"><span>DESIGN <b>·</b> ENGINEERING <b>·</b> INTELLIGENCE</span><span>SCROLL TO EXPLORE ↓</span></div>
            </div>
            <div className="hero-art" aria-label="Abstract visual representing connected digital systems">
              <div className="art-ring ring-outer"/><div className="art-ring ring-mid"/><div className="art-ring ring-inner"/>
              <div className="art-crosshair horizontal"/><div className="art-crosshair vertical"/>
              <div className="art-core"><img src="/assets/zenith-mark.svg" alt="Zenith Softworks mark"/></div>
              <div className="art-node node-one"><Code2/><span>ENGINEER</span></div><div className="art-node node-two"><BrainCircuit/><span>INTELLIGENCE</span></div><div className="art-node node-three"><Layers3/><span>PRODUCT</span></div>
              <div className="art-coordinate coord-one">09° N / 76° E</div><div className="art-coordinate coord-two">SYSTEMS / 001</div>
              <div className="art-orbit-dot dot-one"/><div className="art-orbit-dot dot-two"/>
            </div>
          </div>
          <div className="hero-bottomline"><span>01 — 05</span><span>FROM FIRST THOUGHT TO DIGITAL IMPACT</span><span>SCROLL TO EXPLORE</span></div>
        </div>
      </section>

      <section className="intro-strip"><div className="container intro-strip-inner"><span>BUILT WITH INTENT</span><p>Good technology should feel <em>effortless.</em></p><span>THOUGHTFUL BY DESIGN <i>✳</i></span></div></section>

      <section className="studio-section section-pad" id="studio"><div className="container">
        <SectionIntro index="01" eyebrow="THE STUDIO" title="A small studio for" accent=" ambitious ideas." copy="Zenith Softworks is an independent software development studio focused on turning real-world problems into clear, useful digital products."/>
        <div className="studio-bottom reveal"><p>We bring product thinking, modern web technologies and practical engineering together — from the first conversation to the final handover.</p><div className="studio-pillars"><span><Braces/>Purposeful engineering</span><span><MousePointer2/>Human-first experiences</span><span><Zap/>Practical innovation</span></div></div>
      </div></section>

      <section className="services-section section-pad" id="services"><div className="container">
        <SectionIntro index="02" eyebrow="WHAT WE DO" title="From first sketch to" accent=" full-stack product." copy="The right solution starts with understanding the problem. We bring the capabilities to take it from idea to launch."/>
        <div className="services-list">{services.map(({number,icon:Icon,title,detail,tags})=><article className="service-item reveal" key={number}>
          <span className="service-number">{number}</span><div className="service-icon"><Icon size={22}/></div><div className="service-main"><h3>{title}</h3><p>{detail}</p><div className="service-tags">{tags.map(tag=><span key={tag}>{tag}</span>)}</div></div><span className="service-arrow"><ArrowUpRight/></span>
        </article>)}</div>
      </div></section>

      <section className="technology-section section-pad" id="technology"><div className="container">
        <SectionIntro index="03" eyebrow="THE TOOLKIT" title="Technology is a tool." accent=" The outcome is the point." copy="We choose tools to fit the product, the people using it and the problem it needs to solve."/>
        <div className="tech-grid reveal">{technologies.map((tech,i)=><div className="tech-item" key={tech}><span className="tech-index">0{i+1}</span><span className="tech-dot"/><strong>{tech}</strong><ArrowUpRight size={14}/></div>)}</div>
        <p className="tech-footnote"><span/>A flexible toolkit, applied where it makes sense.</p>
      </div></section>

      <section className="work-section section-pad" id="work"><div className="container">
        <SectionIntro index="04" eyebrow="SELECTED WORK" title="Experiments, ideas" accent=" made tangible." copy="A selection of independent builds, product concepts and research explorations. Each project is a chance to solve a different kind of problem."/>
        <div className="project-grid">{projects.map((project,i)=><ProjectCard project={project} index={i} key={project.name}/>)}</div>
        <p className="portfolio-disclaimer">Portfolio work includes independent projects, concepts and research prototypes. It is not presented as a list of paid client engagements.</p>
      </div></section>

      <section className="principles-section section-pad"><div className="container">
        <SectionIntro index="05" eyebrow="WHY ZENITH" title="Good work comes from" accent=" good decisions." copy="A dependable partner keeps the process understandable, the details considered and the work moving forward."/>
        <div className="principles-grid">
          <article className="principle-card reveal"><span>01</span><Workflow/><h3>Collaborative development</h3><p>Focused milestones, visible progress and useful feedback at every stage.</p></article>
          <article className="principle-card reveal"><span>02</span><MessageCircle/><h3>Clear communication</h3><p>Practical scope, straightforward updates and realistic expectations.</p></article>
          <article className="principle-card reveal"><span>03</span><ShieldCheck/><h3>Security-minded engineering</h3><p>Careful data handling, considered access and safer integration patterns.</p></article>
          <article className="principle-card reveal"><span>04</span><Layers3/><h3>Built to evolve</h3><p>Maintainable foundations that can adapt as your product changes.</p></article>
        </div>
      </div></section>

      <section className="process-section section-pad" id="process"><div className="container">
        <SectionIntro index="06" eyebrow="HOW WE WORK" title="A clear path from" accent=" idea to impact." copy="No mystery process. Just a thoughtful sequence, shared decisions and steady progress."/>
        <div className="process-list">{steps.map(([number,title,detail])=><article className="process-step reveal" key={number}><span>{number}</span><h3>{title}</h3><p>{detail}</p><ArrowUpRight size={18}/></article>)}</div>
      </div></section>

      <ContactSection/>
    </main>
    <Footer/>
  </>;
}

export default function App() { return <Home/>; }
