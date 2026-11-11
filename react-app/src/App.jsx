import { useEffect, useState } from "react";
import { ArrowDown, ArrowRight, ArrowUpRight, Menu, X, Sparkles, Code2, Layers3, Smartphone, Cpu, Workflow, ShieldCheck, Globe2, Mail, MapPin, Phone, Github, Instagram } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import GhostFibers from "./components/GhostFibers/GhostFibers.jsx";

const services = [
  { n: "01", icon: Code2, title: "Custom software development", text: "Purpose-built software, business platforms and internal tools designed around the way your team works." },
  { n: "02", icon: Smartphone, title: "Web & mobile app development", text: "Responsive websites, web applications and mobile experiences that feel clear, fast and intuitive." },
  { n: "03", icon: Layers3, title: "Cloud solutions & integrations", text: "Cloud-ready architecture, APIs, databases and connected services built for dependable growth." },
  { n: "04", icon: Cpu, title: "AI integrations & automation", text: "Practical AI features, intelligent workflows and automation that help people do more with less friction." },
];

const projects = [
  { name: "MEGHAM", type: "CLOUD STORAGE PLATFORM", text: "A secure cloud workspace concept for organising, sharing and managing access to files.", stack: "React · Node.js · MongoDB", tone: "cloud", status: "Independent product project" },
  { name: "NeuroTwin", type: "BCI & EEG RESEARCH", text: "An EEG analysis and digital-twin research platform exploring seizure detection and clinician-facing visualisation.", stack: "Python · TensorFlow · FastAPI · React", tone: "neuro", status: "Research prototype" },
  { name: "SheShield", type: "MOBILE + IOT SAFETY", text: "A connected safety concept combining an Android app, ESP32 wearable communication and emergency workflows.", stack: "Android · Java · ESP32 · BLE", tone: "shield", status: "Prototype" },
  { name: "PredX", type: "PREDICTIVE ANALYTICS", text: "An experimental prediction product focused on turning structured data into understandable insights.", stack: "Python · Machine Learning", tone: "pred", status: "Independent project" },
  { name: "Healthiet", type: "HEALTH & WELLNESS", text: "A health-focused web application concept with user workflows and data-driven recommendations.", stack: "MERN · MongoDB", tone: "health", status: "Independent project" },
  { name: "Cookit", type: "FOOD & DISCOVERY", text: "A recipe discovery experience designed around simple exploration and practical cooking workflows.", stack: "React · JavaScript · API integration", tone: "cook", status: "Independent project" },
  { name: "Aegis DRM", type: "DOCUMENT SECURITY", text: "A digital-rights and protected-content concept exploring controlled access to digital documents.", stack: "Web technologies · Security workflows", tone: "aegis", status: "Concept / prototype" },
  { name: "VehicleSound AI", type: "AUDIO INTELLIGENCE", text: "An AI exploration focused on recognising and classifying vehicle sounds from audio signals.", stack: "Python · Audio ML", tone: "sound", status: "Research prototype" },
];

const capabilities = ["Strategy & discovery", "Interface design", "Full-stack engineering", "Integrations & automation", "Testing & launch", "Ongoing improvement"];

function Brand({ light = false }) {
  return <a className={`brand ${light ? "brand-light" : ""}`} href="/" aria-label="Zenith Softworks home">
    <img src="/assets/zenith-original-navbar.png" alt="" onError={(e) => { e.currentTarget.style.display = "none"; }} />
    <span>ZENITH<span className="brand-dot">.</span><small>SOFTWORKS</small></span>
  </a>;
}

function Header() {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  useEffect(() => setOpen(false), [location.pathname, location.hash]);
  const nav = [["Studio", "/#studio"], ["Services", "/#services"], ["Work", "/#work"], ["Approach", "/#approach"]];
  return <header className="site-header">
    <div className="nav-shell"><Brand />
      <nav className={open ? "nav-links nav-open" : "nav-links"} aria-label="Main navigation">
        {nav.map(([label, href]) => <a key={label} href={href}>{label}</a>)}
        <a className="nav-contact" href="/#contact">Start a project <ArrowUpRight size={15}/></a>
      </nav>
      <button className="menu-toggle" onClick={() => setOpen(!open)} aria-label={open ? "Close menu" : "Open menu"}>{open ? <X/> : <Menu/>}</button>
    </div>
  </header>;
}

function Footer() {
  return <footer className="footer">
    <div className="footer-cta"><p className="eyebrow">HAVE SOMETHING IN MIND?</p><h2>Let's make your next<br/><em>big idea real.</em></h2><Link className="button button-light" to="/contact/">Start a conversation <ArrowUpRight size={17}/></Link></div>
    <div className="footer-grid"><div><Brand light/><p>Thoughtful digital products, engineered with clarity and built for what comes next.</p><div className="socials"><a href="https://www.instagram.com/zenith.softworks/" target="_blank" rel="noreferrer" aria-label="Instagram"><Instagram/></a><a href="https://github.com/musammilvilayil" target="_blank" rel="noreferrer" aria-label="GitHub"><Github/></a></div></div>
      <div><b>EXPLORE</b><a href="/#studio">Studio</a><a href="/#services">Services</a><a href="/#work">Selected work</a><a href="/#contact">Contact</a></div>
      <div><b>GET IN TOUCH</b><a href="mailto:hello@zenithsoftworks.in">hello@zenithsoftworks.in</a><a href="tel:+919497665504">+91 94976 65504</a><span><MapPin size={14}/> Kollam, Kerala, India</span></div>
    </div>
    <div className="footer-bottom"><span>© {new Date().getFullYear()} Zenith Softworks. All rights reserved.</span><span>DESIGNED & DEVELOPED BY ZENITH SOFTWORKS</span><a href="https://zenithsoftworks.in">ZENITHSOFTWORKS.IN ↗</a></div>
  </footer>;
}

function SectionLabel({ number, children }) { return <div className="section-label"><span>{number} / {children}</span><i/></div>; }

function ProjectCard({ project, index }) {
  return <article className={`project-card project-${project.tone}`}>
    <div className="project-art" aria-hidden="true"><div className="project-art-grid"/><div className="project-orb"/><span className="project-art-name">{project.name}</span><span className="project-art-index">0{index + 1}</span><div className="project-art-lines"/></div>
    <div className="project-info"><div className="project-meta"><span>{project.type}</span><span>{project.status}</span></div><h3>{project.name}<ArrowUpRight size={19}/></h3><p>{project.text}</p><div className="project-stack">{project.stack}</div></div>
  </article>;
}

function Home() {
  return <>
    <section className="hero">
      <div className="hero-backdrop"><div className="hero-glow"/><div className="hero-grid"/></div>
      <div className="hero-top"><span><i/> INDEPENDENT DIGITAL STUDIO</span><span>KOLLAM, KERALA · INDIA</span></div>
      <div className="hero-content"><p className="eyebrow"><Sparkles size={14}/> IDEAS, ENGINEERED INTO REALITY</p><h1>Build beyond<br/>the <em>ordinary.</em></h1><div className="hero-bottom"><p>We design and build digital experiences, intelligent products and software that move ideas forward.</p><div className="hero-actions"><a className="button button-primary" href="#services">Explore Services <ArrowUpRight size={17}/></a><a className="text-link" href="#contact">Get in Touch <ArrowDown size={15}/></a></div></div></div>
      <div className="hero-effect"><GhostFibers glowColor="#2563eb" layers={4} twist={1.2} threads={68} fiberStyle="lines" depthOfField={0.8} hoverEffect="focus" intro mouseInteraction lineColor="#6ea7ff" secondaryColor="#c7dcff" gradient="across" waves={0.35} spread={1.65} foldGlow={1.5} brightness={1.65} vignette={0.2} mouseStrength={0.85}/></div>
      <div className="hero-bottomline"><span>01 — 05</span><span>FROM FIRST THOUGHT TO DIGITAL IMPACT</span><a href="#studio">SCROLL TO EXPLORE ↓</a></div>
    </section>
    <div className="ticker"><div className="ticker-track">{Array.from({length:2},(_,i)=><span key={i}>DIGITAL EXPERIENCES <b>✳</b> WEB APPLICATIONS <b>✳</b> AI & AUTOMATION <b>✳</b> PRODUCT ENGINEERING <b>✳</b> CONNECTED TECHNOLOGY <b>✳</b></span>)}</div></div>
    <section className="section studio-section" id="studio"><div className="section-inner"><SectionLabel number="02">THE STUDIO</SectionLabel><div className="studio-layout"><h2>Technology should make life <em>work better.</em></h2><div className="studio-copy"><p className="lead">We are an independent digital studio based in Kerala, partnering with people and businesses to turn complex ideas into useful digital products.</p><p>From a first website to a custom platform, we bring strategy, design and engineering together. We care about the details people notice — and the solid foundations they don't.</p><Link className="under-link" to="/about/">A little more about us <ArrowUpRight size={16}/></Link></div></div><div className="studio-principles"><span>01 / CLEAR THINKING</span><span>02 / PURPOSEFUL DESIGN</span><span>03 / SOLID ENGINEERING</span><span>04 / HONEST COLLABORATION</span></div></div></section>
    <section className="section services-section" id="services"><div className="section-inner"><SectionLabel number="03">WHAT WE DO</SectionLabel><div className="section-heading"><h2>One partner.<br/><em>Many possibilities.</em></h2><p>We choose the right technology for the challenge — never the other way around.</p></div><div className="service-list">{services.map(({n,icon:Icon,title,text})=><article className="service-row" key={n}><span className="service-number">{n}</span><span className="service-icon"><Icon size={21}/></span><h3>{title}</h3><p>{text}</p><ArrowUpRight className="service-arrow" size={20}/></article>)}</div></div></section>
    <section className="section tech-section" id="technology"><div className="section-inner"><SectionLabel number="04">OUR TECHNOLOGY TOOLKIT</SectionLabel><div className="tech-heading"><h2>Built with the <em>right tools.</em></h2><p>We select technologies around your product, your users and the problem to solve.</p></div><div className="tech-marquee" aria-label="Technologies"><div className="tech-track">{[0,1].map((copy)=><div className="tech-track-group" key={copy}>{["React","Node.js","Python","TypeScript","MongoDB","MySQL","AWS","Flutter","Firebase","Docker","Git"].map((tech)=><span className="tech-wordmark" key={tech}><i/>{tech}</span>)}</div>)}</div></div><div className="tech-caption">A practical, evolving toolkit — not a one-size-fits-all stack.</div></div></section>
    <section className="section why-section" id="why-us"><div className="section-inner"><SectionLabel number="05">WHY ZENITH</SectionLabel><div className="section-heading"><h2>Thoughtful work.<br/><em>Solid foundations.</em></h2><p>Good software comes from clear decisions, reliable execution and a team that keeps you in the loop.</p></div><div className="why-grid"><article><span>01</span><Workflow/><h3>Agile, collaborative process</h3><p>Work in focused milestones, review progress early and keep decisions transparent throughout the build.</p></article><article><span>02</span><ArrowUpRight/><h3>Clarity from day one</h3><p>Practical scope, understandable communication and realistic expectations — without unnecessary complexity.</p></article><article><span>03</span><ShieldCheck/><h3>Security-minded engineering</h3><p>Thoughtful access control, secure integration patterns and careful handling of application data.</p></article><article><span>04</span><Layers3/><h3>Built to evolve</h3><p>Responsive interfaces and maintainable foundations that can adapt as your product and business grow.</p></article></div></div></section>
    <section className="section work-section" id="work"><div className="section-inner"><SectionLabel number="04">SELECTED WORK & EXPERIMENTS</SectionLabel><div className="section-heading"><h2>Curiosity in.<br/><em>Creation out.</em></h2><p>A selection of independent builds, prototypes and research explorations. Each one is an opportunity to solve a different kind of problem.</p></div><div className="project-grid">{projects.map((project,i)=><ProjectCard key={project.name} project={project} index={i}/>)}</div><p className="work-note">Portfolio includes independent projects, concepts and research prototypes — not represented as paid client engagements.</p></div></section>
    <section className="section approach-section" id="approach"><div className="section-inner"><SectionLabel number="05">HOW WE WORK</SectionLabel><div className="approach-layout"><h2>Good work is a <em>process.</em></h2><p>Clear communication, visible progress and thoughtful decisions — from the first conversation to the final handover.</p></div><div className="approach-steps">{["Listen & understand","Shape the experience","Build with care","Test, launch & support"].map((s,i)=><div key={s}><span>0{i+1}</span><h3>{s}</h3><ArrowUpRight size={17}/></div>)}</div><div className="capability-cloud">{capabilities.map(c=><span key={c}>{c}</span>)}</div></div></section>
    <ContactSection/>
    <section className="closing-section"><div className="closing-glow"/><p className="eyebrow">THE NEXT CHAPTER STARTS HERE</p><h2>Have an idea?<br/><em>Let's give it shape.</em></h2><a className="button button-primary" href="#contact">Tell us about it <ArrowUpRight size={17}/></a></section>
  </>;
}

function EnquiryForm({ compact = false }) {
  const [form,setForm] = useState({name:"",email:"",service:"Custom software development",message:""});
  const update = (e) => setForm({...form,[e.target.name]:e.target.value});
  const submit = (e) => {
    e.preventDefault();
    const body = `Name: ${form.name}\nEmail: ${form.email}\nService: ${form.service}\n\nProject details:\n${form.message}`;
    window.location.href = `mailto:hello@zenithsoftworks.in?subject=${encodeURIComponent("Project enquiry — Zenith Softworks")}&body=${encodeURIComponent(body)}`;
  };
  return <form className={compact ? "contact-form contact-form-compact" : "contact-form"} onSubmit={submit}>
    <label>Your name<input required name="name" autoComplete="name" value={form.name} onChange={update} placeholder="How should we call you?"/></label>
    <label>Email address<input required type="email" name="email" autoComplete="email" value={form.email} onChange={update} placeholder="you@example.com"/></label>
    <label>What do you need?<select name="service" value={form.service} onChange={update}><option>Custom software development</option><option>Web / mobile application</option><option>Cloud solutions & integrations</option><option>AI / automation</option><option>UI/UX or product design</option><option>Something else</option></select></label>
    <label>Tell us about the project<textarea required rows={compact ? 4 : 5} name="message" value={form.message} onChange={update} placeholder="A few details about the idea, goals and timeline..."/></label>
    <button className="button button-primary" type="submit">Prepare enquiry <ArrowUpRight size={17}/></button>
    <small>Your email app will open with the enquiry ready to send. Nothing is submitted or stored on this website.</small>
  </form>;
}

function ContactSection() {
  return <section className="section contact-section" id="contact"><div className="section-inner"><SectionLabel number="08">START A CONVERSATION</SectionLabel><div className="contact-section-heading"><div><p className="eyebrow">HAVE A PROJECT IN MIND?</p><h2>Let's make<br/><em>something matter.</em></h2><p>Tell us what you're working on. We'll get back to you with a clear next step.</p></div><div className="contact-direct"><a href="mailto:hello@zenithsoftworks.in"><Mail/>hello@zenithsoftworks.in</a><a href="tel:+919497665504"><Phone/>+91 94976 65504</a><span><MapPin/>Kollam, Kerala, India</span><div className="socials"><a href="https://www.instagram.com/zenith.softworks/" target="_blank" rel="noreferrer" aria-label="Instagram"><Instagram/></a><a href="https://github.com/musammilvilayil" target="_blank" rel="noreferrer" aria-label="GitHub"><Github/></a></div></div></div><EnquiryForm compact/></div></section>;
}

function Contact() {
  return <main className="inner-page"><div className="inner-hero"><p className="eyebrow">LET'S TALK</p><h1>Tell us what<br/><em>you're imagining.</em></h1><p>Share a little about your idea. We'll take it from there.</p></div><div className="contact-layout"><EnquiryForm/><aside className="contact-aside"><p className="eyebrow">DIRECT CONTACT</p><a href="mailto:hello@zenithsoftworks.in"><Mail/> hello@zenithsoftworks.in</a><a href="tel:+919497665504"><Phone/> +91 94976 65504</a><span><MapPin/> Kollam, Kerala, India</span><div className="contact-aside-note">Small studio. Big ideas. Thoughtful execution.</div></aside></div></main>;
}

function About() {
  return <main className="inner-page"><div className="inner-hero"><p className="eyebrow">THE STUDIO</p><h1>Small by design.<br/><em>Ambitious by nature.</em></h1><p>Zenith Softworks is an independent digital studio in Kollam, Kerala, focused on thoughtful software, web experiences and emerging technology.</p></div><div className="about-panels"><article><Code2/><h2>Engineering with purpose</h2><p>We build around real needs, practical constraints and long-term maintainability.</p></article><article><ShieldCheck/><h2>Honest by default</h2><p>Clear scope, realistic expectations and transparent communication are part of the work.</p></article><article><Layers3/><h2>Curious by nature</h2><p>We explore new tools and ideas through independent projects and research prototypes.</p></article></div></main>;
}

function ServicesPage() {
  return <main className="inner-page"><div className="inner-hero"><p className="eyebrow">CAPABILITIES</p><h1>From an idea<br/>to <em>something useful.</em></h1><p>Flexible engineering support for websites, applications and connected digital products.</p></div><div className="inner-services">{services.map(({n,icon:Icon,title,text})=><article key={n}><Icon/><span>{n}</span><h2>{title}</h2><p>{text}</p></article>)}</div></main>;
}

function WorkPage() {
  return <main className="inner-page"><div className="inner-hero"><p className="eyebrow">SELECTED WORK</p><h1>Ideas made<br/><em>tangible.</em></h1><p>Independent builds, concepts and research prototypes developed to explore useful technology.</p></div><div className="project-grid inner-project-grid">{projects.map((project,i)=><ProjectCard key={project.name} project={project} index={i}/>)}</div></main>;
}

function NotFound() { return <main className="inner-page"><div className="inner-hero"><p className="eyebrow">404 / NOT FOUND</p><h1>This page took<br/><em>a wrong turn.</em></h1><Link className="button button-primary" to="/">Back to home <ArrowRight size={17}/></Link></div></main>; }

export default function App() {
  const location = useLocation();
  useEffect(() => { const nodes = document.querySelectorAll(".section, .contact-section"); const observer = new IntersectionObserver((entries) => entries.forEach((entry) => { if (entry.isIntersecting) { entry.target.classList.add("is-visible"); observer.unobserve(entry.target); } }), { threshold: 0.12 }); nodes.forEach((node) => observer.observe(node)); return () => observer.disconnect(); }, [location.pathname]);
  useEffect(() => { if (location.hash) { const id = decodeURIComponent(location.hash.slice(1)); requestAnimationFrame(() => document.getElementById(id)?.scrollIntoView({behavior:"smooth"})); } else window.scrollTo(0,0); }, [location.pathname,location.hash]);
  return <><Header/><RoutesContent path={location.pathname}/><Footer/></>;
}

function RoutesContent({path}) {
  if (path === "/") return <Home/>;
  if (path === "/contact" || path === "/contact/") return <Contact/>;
  if (path === "/about" || path === "/about/") return <About/>;
  if (path === "/services" || path === "/services/") return <ServicesPage/>;
  if (path === "/work" || path === "/work/") return <WorkPage/>;
  return <NotFound/>;
}
