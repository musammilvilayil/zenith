import { useEffect, useRef, useState } from "react";
import { Link } from "react-router";
import { ArrowUpRight } from "lucide-react";

/**
 * Scroll-pinned showcase: a tall section whose inner stage stays sticky while
 * the scroll position steps through the items (big number, side index, image
 * card, ghost outline word). On small screens it degrades to stacked cards.
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
        <ol className="zn-pin-index" aria-label="Services">
          {items.map((item, i) => (
            <li key={item.title} className={i === active ? "is-active" : ""}><span>0{i + 1}</span>{item.short}</li>
          ))}
        </ol>
        <div className="zn-pin-copy">
          {items.map((item, i) => (
            <div key={item.title} className={"zn-pin-item " + (i === active ? "is-active" : "")} aria-hidden={i !== active}>
              <b className="zn-pin-num">0{i + 1}</b>
              <p className="zn-pin-tag">{item.tag}</p>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
              <Link to={item.href} tabIndex={i === active ? 0 : -1} className="zn-arrow-link">Learn more <ArrowUpRight size={16} /></Link>
            </div>
          ))}
        </div>
        <div className="zn-pin-media">
          <span className="zn-pin-count">ZENITH / SERVICES <em>0{active + 1} / 0{items.length}</em></span>
          {items.map((item, i) => (
            <img key={item.title} src={item.image} alt={item.alt} loading="lazy" decoding="async" className={i === active ? "is-active" : ""} />
          ))}
          <i className="zn-pin-bar" style={{ transform: `scaleX(${(active + 1) / items.length})` }} />
        </div>
        <div className="zn-pin-ghost" aria-hidden="true">
          {items.map((item, i) => <span key={item.title} className={i === active ? "is-active" : ""}>{item.ghost}</span>)}
        </div>
      </div>
      {/* Small-screen fallback: plain stacked cards */}
      <div className="zn-pin-stack">
        {items.map((item, i) => (
          <Link to={item.href} className="zn-card" key={item.title}>
            <img src={item.image} alt={item.alt} loading="lazy" decoding="async" />
            <div><b>0{i + 1}</b><h3>{item.title}</h3><p>{item.text}</p></div>
          </Link>
        ))}
      </div>
    </div>
  );
}
