import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router";
import { ArrowUpRight, Menu, X, MessageCircle } from "lucide-react";
import { BRAND_IMAGES, SITE } from "@/data/site";

const links = [
  { href: "/business/", label: "Business" },
  { href: "/student-projects/", label: "Student projects" },
  { href: "/projects/", label: "Work" },
  { href: "/resources/", label: "Insights" },
  { href: "/about/", label: "About" },
];

export default function SiteLayout({ children }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    setOpen(false);
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [pathname]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <div className="zn-site">
      <a className="zn-skip" href="#main-content">Skip to content</a>
      <header className={"zn-header " + (scrolled ? "is-scrolled" : "")}>
        <div className="zn-nav-wrap">
          <Link to="/" className="zn-brand">
            <img src={BRAND_IMAGES.markLogo} alt="Zenith Softworks logo" width="46" height="46" />
            <span className="zn-brand-text"><b>ZENITH</b> <i>SOFTWORKS</i></span>
          </Link>
          <nav className="zn-desktop-nav" aria-label="Main navigation">
            {links.map((link) => (
              <NavLink key={link.href} to={link.href} className={({ isActive }) => (isActive ? "active" : "")}>{link.label}</NavLink>
            ))}
          </nav>
          <div className="zn-nav-actions">
            <Link to="/contact/" className="zn-nav-cta">Start a project <ArrowUpRight size={16} /></Link>
            <button className="zn-menu-button" aria-label={open ? "Close menu" : "Open menu"} aria-expanded={open} aria-controls="zn-mobile-nav" onClick={() => setOpen((v) => !v)}>
              {open ? <X /> : <Menu />}
            </button>
          </div>
        </div>
        {open && (
          <nav id="zn-mobile-nav" className="zn-mobile-nav" aria-label="Mobile navigation">
            {links.map((link, i) => (
              <Link key={link.href} to={link.href}><span>0{i + 1}</span>{link.label}<ArrowUpRight size={17} /></Link>
            ))}
            <Link to="/contact/" className="zn-mobile-cta">Start a project <ArrowUpRight size={17} /></Link>
          </nav>
        )}
      </header>

      <main id="main-content" tabIndex="-1">{children}</main>

      <footer className="zn-footer">
        <div className="zn-footer-wave" aria-hidden="true" />
        <div className="zn-wrap">
          <div className="zn-footer-brand">
            <img src={BRAND_IMAGES.markLogo} alt="Zenith Softworks logo mark" width="56" height="50" loading="lazy" />
            <p>An independent digital development studio building websites, e-commerce stores, custom software and student projects from Kollam, Kerala.</p>
          </div>
          <nav className="zn-footer-nav" aria-label="Footer">
            <Link to="/">Home page</Link><Link to="/about/">About Zenith</Link><Link to="/business/">Business solutions</Link><Link to="/student-projects/">Student project help</Link><Link to="/projects/">Selected work</Link><Link to="/resources/">Guides and insights</Link><Link to="/contact/">Contact us</Link>
          </nav>
          <div className="zn-footer-columns">
            <div>
              <h3>Business</h3>
              <Link to="/business/website-development/">Website development</Link>
              <Link to="/business/ecommerce-development/">E-commerce</Link>
              <Link to="/business/custom-software-development/">Custom software</Link>
              <Link to="/business/website-redesign/">Website redesign</Link>
            </div>
            <div>
              <h3>Students</h3>
              <Link to="/student-projects/bca-project-development/">BCA projects</Link>
              <Link to="/student-projects/btech-project-development/">BTech projects</Link>
              <Link to="/student-projects/mca-project-development/">MCA projects</Link>
            </div>
            <div>
              <h3>Locations</h3>
              <Link to="/website-development-company-kollam/">Kollam web services</Link>
              <Link to="/software-development-company-kochi/">Kochi software services</Link>
              <Link to="/software-development-company-trivandrum/">Trivandrum software services</Link>
              <Link to="/website-development-company-calicut/">Calicut web services</Link>
            </div>
            <div>
              <h3>Contact</h3>
              <a href={"mailto:" + SITE.email}>{SITE.email}</a>
              <a href={SITE.whatsappHref} target="_blank" rel="noreferrer">{SITE.whatsappDisplay}</a>
              <span>Kerala, India · Remote across India</span>
            </div>
          </div>
          <p className="zn-footer-strip" aria-hidden="true">ZENITH<span>SOFTWORKS</span></p>
          <div className="zn-footer-bottom">
            <span>© {new Date().getFullYear()} Zenith Softworks. All rights reserved.</span>
            <div><Link to="/privacy/">Privacy Policy</Link><Link to="/terms/">Terms</Link></div>
          </div>
        </div>
      </footer>

      <a className="zn-whatsapp" href={SITE.whatsappHref} target="_blank" rel="noreferrer" aria-label="WhatsApp us to chat with Zenith Softworks">
        <MessageCircle size={19} /><span>WhatsApp us</span>
      </a>
    </div>
  );
}
