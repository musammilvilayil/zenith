import "./HeroMonolith.css";

/**
 * Architectural hero visual built from layered CSS/SVG surfaces – no canvas,
 * no 3D engine. Motion is compositor-only (transform/opacity) and disabled for
 * reduced-motion users.
 */
export default function HeroMonolith() {
  return (
    <div className="zm-stage" aria-hidden="true">
      <div className="zm-halo" />
      <svg className="zm-orbits" viewBox="0 0 600 600" fill="none">
        <defs>
          <linearGradient id="zm-orbit" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#c1e8ff" stopOpacity="0.55" />
            <stop offset="0.5" stopColor="#80b2ff" stopOpacity="0.12" />
            <stop offset="1" stopColor="#c1e8ff" stopOpacity="0.4" />
          </linearGradient>
        </defs>
        <ellipse cx="300" cy="318" rx="276" ry="92" stroke="url(#zm-orbit)" strokeWidth="1" />
        <ellipse
          cx="300"
          cy="318"
          rx="214"
          ry="70"
          stroke="#c1e8ff"
          strokeOpacity="0.16"
          strokeDasharray="2 7"
        />
        <circle className="zm-node" cx="62" cy="290" r="3" fill="#c1e8ff" />
        <circle className="zm-node zm-node-b" cx="512" cy="356" r="2.4" fill="#80b2ff" />
      </svg>

      <div className="zm-monolith">
        <div className="zm-slab zm-slab-back" />
        <div className="zm-slab zm-slab-mid" />
        <div className="zm-slab zm-slab-front">
          <span className="zm-edge" />
          <span className="zm-sheen" />
          <span className="zm-glyph">
            <svg viewBox="0 0 64 64" fill="none">
              <path d="M14 18h36L14 46h36" stroke="#c1e8ff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
        </div>
        <div className="zm-shard" />
      </div>

      <div className="zm-floor" />

      <div className="zm-chip zm-chip-a">
        <span className="zm-dot" />
        <span>Design · Engineering</span>
      </div>
      <div className="zm-chip zm-chip-b">
        <span>Idea → Launch</span>
      </div>
    </div>
  );
}
