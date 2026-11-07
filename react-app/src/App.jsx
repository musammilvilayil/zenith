import { Link, Route, Routes } from "react-router-dom";
import GhostFibers from "./components/GhostFibers/GhostFibers.jsx";
import "./styles/home.css";

function HomePage() {
  return (
    <main className="home">
      <header className="site-header">
        <Link className="brand" to="/" aria-label="Zenith Softworks home">
          <span className="brand-mark">Z<span>.</span></span>
          <span>ZENITH<small>SOFTWORKS</small></span>
        </Link>
        <nav aria-label="Main navigation">
          <a href="#studio">Studio</a>
          <a href="#capabilities">Capabilities</a>
          <a href="#work">Selected work</a>
          <a href="/contact/">Contact <span aria-hidden="true">↗</span></a>
        </nav>
      </header>

      <section className="hero" aria-labelledby="hero-title">
        <div className="hero-backdrop" aria-hidden="true" />
        <div className="hero-copy">
          <p className="eyebrow">INDEPENDENT DIGITAL STUDIO · KERALA, INDIA</p>
          <h1 id="hero-title">Every big idea<br /><em>starts somewhere.</em></h1>
          <p className="hero-description">
            Thoughtful websites, useful applications and digital experiences
            built around people and possibility.
          </p>
          <div className="hero-actions">
            <a className="button button-primary" href="/contact/">Start a project <span>↗</span></a>
            <a className="button button-quiet" href="#capabilities">Explore capabilities <span>↓</span></a>
          </div>
        </div>
        <GhostFibers
          glowColor="#8b5cf6"
          layers={3}
          twist={1.6}
          threads={72}
          fiberStyle="dots"
          depthOfField={0.85}
          hoverEffect="focus"
          intro={true}
          mouseInteraction={true}
          lineColor="#ffffff"
          secondaryColor="#2dd4bf"
          gradient="across"
          waves={0.5}
          spread={2.0}
          foldGlow={1.3}
          brightness={2}
          vignette={0}
          mouseStrength={1.15}
        />
        <div className="hero-foot" aria-hidden="true"><span>DESIGN WITH INTENTION</span><span>BUILD FOR WHAT'S NEXT ↓</span></div>
      </section>

      <section className="intro-section" id="studio">
        <p className="eyebrow">A SMALL STUDIO FOR AMBITIOUS IDEAS</p>
        <h2>Make technology feel<br /><em>more human.</em></h2>
        <p>We connect strategy, design and engineering to turn meaningful ideas into useful digital products.</p>
      </section>
      <section className="capabilities-section" id="capabilities">
        <p className="eyebrow">WHAT WE DO</p>
        <h2>Built around your next step.</h2>
        <div className="capability-grid">
          {["Web platforms","Custom software","Applied AI","Mobile experiences"].map((item,index)=>(
            <article className="capability-card" key={item}><span>0{index+1}</span><h3>{item}</h3><p>Clear thinking, considered design and dependable engineering.</p></article>
          ))}
        </div>
      </section>
      <footer className="site-footer"><span>© {new Date().getFullYear()} Zenith Softworks</span><a href="mailto:info@zenithsoftworks.in">info@zenithsoftworks.in ↗</a></footer>
    </main>
  );
}

function RoutePlaceholder({ title }) {
  return <main className="route-placeholder"><Link to="/">← Back to Zenith</Link><p className="eyebrow">ZENITH SOFTWORKS</p><h1>{title}</h1><p>This route is reserved for the page migration in the next React migration phase.</p></main>;
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="*" element={<RoutePlaceholder title="Page migration in progress" />} />
    </Routes>
  );
}
