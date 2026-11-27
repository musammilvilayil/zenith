import { useEffect, useRef, useState } from "react";
import { Link } from "react-router";
import { ArrowUpRight } from "lucide-react";

/**
 * Scroll-pinned showcase. Each item renders once (copy + image together):
 * on desktop the stage is sticky and scroll position steps through the items;
 * on small screens the same markup simply stacks. Rendering a single DOM
 * avoids duplicate text/headings for crawlers.
 */
export default function PinnedShowcase({ items }) {
  const ref = useRef(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;
    const onScroll = () => {
      const rect = el.getBoundingClientRect();
      const total = rect.height - window.innerHeight;
      if (total <= 0) return;
      const progress = Math.min(Math.max(-rect.top / total, 0), 0.999);
      setActive(Math.floor(progress * items.length));
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [items.length]);

  return (
    <div className="zn-pin" ref={ref} style={{ "--n": items.length }}>
      <div className="zn-pin-stage">
        <ol className="zn-pin-index" aria-hidden="true">
          {items.map((item, i) => (
            <li key={item.short} className={i === active ? "is-active" : ""}><span>0{i + 1}</span>{item.short}</li>
          ))}
        </ol>
        <div className="zn-pin-items">
          {items.map((item, i) => (
            <article key={item.title} className={"zn-pin-item " + (i === active ? "is-active" : "")}>
              <div className="zn-pin-copy">
                <span className="zn-pin-num" aria-hidden="true">0{i + 1}</span>
                <p className="zn-pin-tag">{item.tag}</p>
                <h3>{item.title}</h3>
                <p className="zn-pin-text">{item.text}</p>
                <Link to={item.href} tabIndex={i === active ? 0 : undefined} className="zn-arrow-link">{item.cta} <ArrowUpRight size={16} /></Link>
              </div>
              <figure className="zn-pin-media">
                <img src={item.image} alt={item.alt} loading="lazy" decoding="async" />
                <figcaption className="zn-pin-count">ZENITH / SERVICES <em>0{i + 1} / 0{items.length}</em></figcaption>
                <i className="zn-pin-bar" style={{ transform: `scaleX(${(i + 1) / items.length})` }} />
              </figure>
            </article>
          ))}
        </div>
        <div className="zn-pin-ghost" aria-hidden="true">
          {items.map((item, i) => <span key={item.short} className={i === active ? "is-active" : ""}>{item.ghost}</span>)}
        </div>
      </div>
    </div>
  );
}
