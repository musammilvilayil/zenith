import { useEffect, useRef, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { Menu, MessageCircle, X } from "lucide-react";
import Button from "@/components/ui/Button";
import { BRAND_IMAGES, FOOTER_COLUMNS, NAV_LINKS, SITE } from "@/data/site";
import { cn } from "@/lib/utils";

// "Contact" is reachable through the dedicated CTA, so the desktop bar stays lighter.
const DESKTOP_LINKS = NAV_LINKS.filter((item) => item.href !== "/contact/");

export default function SiteLayout({ children }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { pathname, hash } = useLocation();
  const navRef = useRef(null);
  const menuButtonRef = useRef(null);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname, hash]);

  useEffect(() => {
    if (hash) {
      const target = document.getElementById(decodeURIComponent(hash.slice(1)));
      if (target) {
        requestAnimationFrame(() => target.scrollIntoView());
        return;
      }
    }
    window.scrollTo(0, 0);
  }, [pathname, hash]);

  useEffect(() => {
    let ticking = false;
    const update = () => {
      ticking = false;
      setScrolled(window.scrollY > 24);
    };
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!menuOpen) return undefined;
    const onKeyDown = (event) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
        menuButtonRef.current?.focus();
      }
    };
    const onPointerDown = (event) => {
      if (navRef.current && !navRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("pointerdown", onPointerDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("pointerdown", onPointerDown);
    };
  }, [menuOpen]);

  return (
    <div className="flex min-h-screen flex-col bg-midnight text-ink">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[70] focus:rounded-lg focus:bg-ice focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-midnight"
      >
        Skip to main content
      </a>

      <header
        ref={navRef}
        className="sticky top-0 z-50 px-[var(--z-nav-gap)] pt-[var(--z-nav-gap)] pb-[var(--z-nav-gap)]"
      >
        <nav
          aria-label="Main navigation"
          className={cn(
            "z-glass mx-auto flex h-[var(--z-nav-h)] max-w-[84rem] items-center justify-between gap-4 rounded-full pr-2.5 pl-5 transition-[background-color,border-color,box-shadow] duration-500 sm:pl-6",
            scrolled && "!bg-midnight/85 border-[rgba(193,232,255,0.2)]",
          )}
        >
          <Link
            to="/"
            aria-label="Zenith Softworks home"
            className="flex shrink-0 items-center rounded-md"
          >
            <img
              src={BRAND_IMAGES.navbarLogo}
              alt="Zenith Softworks"
              width="140"
              height="40"
              onError={(e) => {
                e.currentTarget.onerror = null;
                e.currentTarget.src = BRAND_IMAGES.footerLogo;
              }}
              className="h-8 w-auto max-w-[150px] object-contain sm:h-9"
            />
          </Link>

          <ul className="hidden items-center gap-1 lg:flex">
            {DESKTOP_LINKS.map((item) => (
              <li key={item.href}>
                <NavLink
                  to={item.href}
                  className={({ isActive }) =>
                    cn(
                      "relative inline-flex h-10 items-center rounded-full px-3.5 text-[0.8125rem] font-medium transition-colors duration-300 xl:px-4",
                      isActive
                        ? "bg-ice/10 text-ice"
                        : "text-muted hover:bg-ice/5 hover:text-ink",
                    )
                  }
                >
                  {({ isActive }) => (
                    <>
                      {item.label}
                      {isActive && (
                        <span
                          aria-hidden="true"
                          className="absolute bottom-1.5 left-1/2 h-[3px] w-[3px] -translate-x-1/2 rounded-full bg-ice"
                        />
                      )}
                    </>
                  )}
                </NavLink>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-2">
            <Button to="/contact/" size="sm" className="hidden sm:inline-flex">
              Start a project
            </Button>
            <button
              ref={menuButtonRef}
              type="button"
              aria-label={menuOpen ? "Close navigation" : "Open navigation"}
              aria-expanded={menuOpen}
              aria-controls="mobile-primary-nav"
              onClick={() => setMenuOpen((prev) => !prev)}
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-line bg-ice/5 text-ink transition-colors hover:bg-ice/10 lg:hidden"
            >
              {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </nav>

        {menuOpen && (
          <div
            id="mobile-primary-nav"
            className="z-glass mx-auto mt-2 max-w-[84rem] rounded-[1.75rem] !bg-midnight/95 p-3 lg:hidden"
          >
            <ul className="flex flex-col">
              {NAV_LINKS.map((item, idx) => (
                <li key={item.href}>
                  <NavLink
                    to={item.href}
                    className={({ isActive }) =>
                      cn(
                        "flex min-h-[52px] items-center justify-between rounded-2xl px-4 font-display text-lg font-semibold tracking-tight transition-colors",
                        isActive ? "bg-ice/10 text-ice" : "text-ink hover:bg-ice/5",
                      )
                    }
                  >
                    {item.label}
                    <span aria-hidden="true" className="z-label text-faint">{String(idx + 1).padStart(2, "0")}</span>
                  </NavLink>
                </li>
              ))}
            </ul>
            <div className="mt-3 grid gap-2 border-t border-line pt-3 sm:grid-cols-2">
              <Button to="/contact/" className="w-full">
                Start a project
              </Button>
              <Button href={SITE.whatsappHref} variant="secondary" className="w-full">
                WhatsApp us
              </Button>
            </div>
          </div>
        )}
      </header>

      <main id="main-content" tabIndex={-1} className="flex-1 outline-none">
        {children}
      </main>

      <footer className="relative isolate overflow-hidden border-t border-line bg-deep text-ink">
        <div aria-hidden="true" className="z-ambient absolute inset-0 -z-10 opacity-70" />
        <div className="z-container pt-20 pb-10">
          <div className="grid gap-12 border-b border-line pb-14 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
            <div>
              <p className="z-label z-eyebrow">Have something in mind?</p>
              <p className="z-display-lg mt-6 max-w-3xl">
                Let&apos;s build it <span className="z-accent-text">properly.</span>
              </p>
            </div>
            <div className="flex flex-wrap gap-3 lg:justify-end">
              <Button to="/contact/">Start a project</Button>
              <Button href={`mailto:${SITE.email}`} variant="secondary" external={false}>
                {SITE.email}
              </Button>
            </div>
          </div>

          <div className="grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-[1.3fr_1fr_1fr_1fr]">
            <div>
              <Link to="/" aria-label="Zenith Softworks home" className="inline-flex rounded-md">
                <img
                  src={BRAND_IMAGES.footerLogo}
                  alt="Zenith Softworks"
                  width="160"
                  height="40"
                  loading="lazy"
                  className="h-10 w-auto object-contain"
                />
              </Link>
              <p className="mt-5 max-w-xs text-sm leading-relaxed text-muted">
                Thoughtful digital work for growing businesses. Real opportunities for ambitious
                talent.
              </p>
            </div>

            {FOOTER_COLUMNS.map((col) => (
              <div key={col.title}>
                <h2 className="z-label z-label-accent">{col.title}</h2>
                <ul className="mt-5 space-y-3 text-sm">
                  {col.links.map((item) => (
                    <li key={item.href}>
                      <Link to={item.href} className="text-muted transition-colors hover:text-ice">
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}

            <div>
              <h2 className="z-label z-label-accent">Contact</h2>
              <ul className="mt-5 space-y-3 text-sm text-muted">
                <li>
                  <a href={`mailto:${SITE.email}`} className="break-all transition-colors hover:text-ice">
                    {SITE.email}
                  </a>
                </li>
                <li>
                  <a
                    href={`mailto:${SITE.helloEmail}`}
                    className="break-all transition-colors hover:text-ice"
                  >
                    {SITE.helloEmail}
                  </a>
                </li>
                <li>
                  <a
                    href={SITE.whatsappHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="transition-colors hover:text-ice"
                  >
                    {SITE.whatsappDisplay}
                  </a>
                </li>
                <li>Kerala, India</li>
              </ul>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-4 border-t border-line pt-6">
            <span className="z-label">
              © {new Date().getFullYear()} Zenith Softworks · Built with intention
            </span>
            <div className="flex items-center gap-5">
              <Link to="/privacy/" className="z-label transition-colors hover:text-ice">
                Privacy
              </Link>
              <Link to="/terms/" className="z-label transition-colors hover:text-ice">
                Terms
              </Link>
            </div>
          </div>
        </div>
      </footer>

      <a
        href={SITE.whatsappHref}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with Zenith Softworks on WhatsApp"
        className="z-glass fixed right-4 bottom-4 z-40 inline-flex h-12 items-center gap-2 rounded-full px-4 text-sm font-semibold text-ink transition-[transform,border-color] duration-500 ease-[var(--z-ease)] hover:-translate-y-0.5 hover:border-ice/50 sm:right-6 sm:bottom-6"
      >
        <MessageCircle aria-hidden="true" className="h-4 w-4 text-ice" />
        <span className="hidden sm:inline">Let&apos;s talk</span>
      </a>
    </div>
  );
}
