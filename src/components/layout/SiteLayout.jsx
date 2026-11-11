import { useEffect, useRef, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { Menu, MessageCircle, X } from "lucide-react";
import { BRAND_IMAGES, FOOTER_COLUMNS, NAV_LINKS, SITE } from "@/data/site";
import { cn } from "@/lib/utils";

export default function SiteLayout({ children }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const { pathname, hash } = useLocation();
  const navRef = useRef(null);

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
    if (!menuOpen) return undefined;
    const onKeyDown = (event) => {
      if (event.key === "Escape") setMenuOpen(false);
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
    <div className="min-h-screen flex flex-col bg-midnight text-ink">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:rounded-lg focus:bg-ice focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-midnight"
      >
        Skip to main content
      </a>

      <header
        ref={navRef}
        className="sticky top-0 z-40 border-b border-ice/15 bg-midnight/80 backdrop-blur-xl"
      >
        <nav
          aria-label="Main navigation"
          className="mx-auto flex h-[76px] max-w-7xl items-center justify-between gap-6 px-5 sm:px-8"
        >
          <Link
            to="/"
            aria-label="Zenith Softworks home"
            className="flex shrink-0 items-center gap-2.5"
          >
            <img
              src={BRAND_IMAGES.navbarLogo}
              alt="Zenith Softworks"
              onError={(e) => {
                e.currentTarget.onerror = null;
                e.currentTarget.src = BRAND_IMAGES.footerLogo;
              }}
              className="h-9 w-auto max-w-[175px] object-contain sm:h-10"
            />
          </Link>

          <div className="hidden items-center gap-6 lg:flex">
            {NAV_LINKS.map((item) => (
              <NavLink
                key={item.href}
                to={item.href}
                className={({ isActive }) =>
                  cn(
                    "text-xs font-medium tracking-wide transition-colors",
                    isActive ? "text-ice" : "text-muted hover:text-ink",
                  )
                }
              >
                {item.label}
              </NavLink>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <Link
              to="/contact/"
              className="hidden items-center gap-2 rounded-full border border-ice/35 bg-ice px-4 py-2 text-xs font-bold text-midnight transition hover:-translate-y-0.5 hover:bg-white sm:inline-flex"
            >
              Start a project <span aria-hidden="true">↗</span>
            </Link>
            <button
              type="button"
              aria-label={menuOpen ? "Close navigation" : "Open navigation"}
              aria-expanded={menuOpen}
              aria-controls="mobile-primary-nav"
              onClick={() => setMenuOpen((prev) => !prev)}
              className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-ice/20 bg-navy/40 text-ink lg:hidden"
            >
              {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </nav>

        {menuOpen && (
          <div
            id="mobile-primary-nav"
            className="border-t border-ice/15 bg-midnight/95 px-5 py-4 backdrop-blur-xl lg:hidden"
          >
            <div className="flex flex-col divide-y divide-ice/10">
              {NAV_LINKS.map((item) => (
                <NavLink
                  key={item.href}
                  to={item.href}
                  className={({ isActive }) =>
                    cn(
                      "py-3 text-sm font-medium transition-colors",
                      isActive ? "text-ice" : "text-muted hover:text-ink",
                    )
                  }
                >
                  {item.label}
                </NavLink>
              ))}
              <Link
                to="/contact/"
                className="mt-3 inline-flex items-center justify-center gap-2 rounded-full bg-ice px-5 py-3 text-sm font-bold text-midnight"
              >
                Start a project <span aria-hidden="true">↗</span>
              </Link>
            </div>
          </div>
        )}
      </header>

      <main id="main-content" tabIndex={-1} className="flex-1">
        {children}
      </main>

      <footer className="border-t border-ice/15 bg-[#010b19] text-ink">
        <div className="mx-auto max-w-7xl px-5 py-14 sm:px-8">
          <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
            <div>
              <Link to="/" className="inline-flex items-center">
                <img
                  src={BRAND_IMAGES.footerLogo}
                  alt="Zenith Softworks"
                  className="h-10 w-auto object-contain"
                />
              </Link>
              <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted">
                Thoughtful digital work for growing businesses. Real opportunities for ambitious
                talent.
              </p>
            </div>

            {FOOTER_COLUMNS.map((col) => (
              <div key={col.title}>
                <h4 className="font-display text-xs font-bold uppercase tracking-[0.18em] text-soft-blue">
                  {col.title}
                </h4>
                <ul className="mt-4 space-y-2.5 text-sm">
                  {col.links.map((item) => (
                    <li key={item.href}>
                      <Link
                        to={item.href}
                        className="text-muted transition-colors hover:text-ice"
                      >
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}

            <div>
              <h4 className="font-display text-xs font-bold uppercase tracking-[0.18em] text-soft-blue">
                Contact
              </h4>
              <ul className="mt-4 space-y-2.5 text-sm text-muted">
                <li>
                  <a href={`mailto:${SITE.email}`} className="transition-colors hover:text-ice">
                    {SITE.email}
                  </a>
                </li>
                <li>
                  <a href={`mailto:${SITE.helloEmail}`} className="transition-colors hover:text-ice">
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

          <div className="mt-12 flex flex-wrap items-center justify-between gap-4 border-t border-ice/15 pt-6 text-xs text-soft-blue">
            <span>© {new Date().getFullYear()} Zenith Softworks. Built with intention.</span>
            <div className="flex items-center gap-4">
              <Link to="/privacy/" className="transition-colors hover:text-ice">
                Privacy
              </Link>
              <span>·</span>
              <Link to="/terms/" className="transition-colors hover:text-ice">
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
        className="fixed right-5 bottom-5 z-40 inline-flex items-center gap-2 rounded-full bg-ice px-4 py-3 text-xs font-bold text-midnight shadow-2xl shadow-steel/25 transition hover:-translate-y-0.5 hover:bg-white"
      >
        <MessageCircle className="h-4 w-4" />
        <span className="hidden sm:inline">Let&apos;s talk</span>
      </a>
    </div>
  );
}
