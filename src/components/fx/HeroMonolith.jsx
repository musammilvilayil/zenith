/**
 * Pure CSS/SVG architectural monolith composition for the hero.
 * No JS loop: motion is three transform-only CSS animations that are
 * disabled under prefers-reduced-motion.
 */
export default function HeroMonolith() {
  return (
    <div
      aria-hidden="true"
      className="relative mx-auto aspect-[4/5] w-full max-w-[26rem] sm:max-w-md lg:max-w-none"
    >
      {/* ambient light */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_60%_35%,rgba(128,178,255,0.22),transparent_62%)]" />
      <div className="z-grid-mask absolute inset-0 opacity-70" />

      <svg viewBox="0 0 400 500" className="absolute inset-0 h-full w-full" role="presentation" focusable="false">
        <defs>
          <linearGradient id="zm-face-l" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#1a2c47" />
            <stop offset="1" stopColor="#0b1424" />
          </linearGradient>
          <linearGradient id="zm-face-r" x1="1" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#2c4a73" />
            <stop offset="1" stopColor="#0f1d33" />
          </linearGradient>
          <linearGradient id="zm-top" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#c1e8ff" />
            <stop offset="1" stopColor="#5483b3" />
          </linearGradient>
          <linearGradient id="zm-rim" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#c1e8ff" stopOpacity="0.9" />
            <stop offset="1" stopColor="#c1e8ff" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* ground ellipse */}
        <ellipse cx="200" cy="448" rx="150" ry="22" fill="#80b2ff" opacity="0.08" />
        <ellipse cx="200" cy="448" rx="96" ry="12" fill="#c1e8ff" opacity="0.08" />

        {/* tall monolith */}
        <g className="z-monolith-a">
          <polygon points="150,120 230,92 230,400 150,430" fill="url(#zm-face-l)" />
          <polygon points="230,92 300,128 300,436 230,400" fill="url(#zm-face-r)" />
          <polygon points="150,120 230,92 300,128 222,158" fill="url(#zm-top)" opacity="0.95" />
          <path d="M150 120 L150 430" stroke="url(#zm-rim)" strokeWidth="1" fill="none" />
          <path d="M230 92 L230 400" stroke="#c1e8ff" strokeOpacity="0.35" strokeWidth="1" fill="none" />
          <path d="M162 200 L226 178 M162 250 L226 228 M162 300 L226 278" stroke="#c1e8ff" strokeOpacity="0.12" strokeWidth="1" />
        </g>

        {/* low slab, left */}
        <g className="z-monolith-b">
          <polygon points="52,330 130,306 130,410 52,436" fill="url(#zm-face-l)" opacity="0.95" />
          <polygon points="130,306 176,330 176,438 130,410" fill="url(#zm-face-r)" opacity="0.9" />
          <polygon points="52,330 130,306 176,330 98,356" fill="#80b2ff" opacity="0.55" />
          <path d="M52 330 L52 436" stroke="#c1e8ff" strokeOpacity="0.4" strokeWidth="1" />
        </g>

        {/* floating cube, right */}
        <g className="z-monolith-c">
          <polygon points="298,196 338,184 338,232 298,244" fill="url(#zm-face-l)" />
          <polygon points="338,184 366,200 366,248 338,232" fill="url(#zm-face-r)" />
          <polygon points="298,196 338,184 366,200 326,212" fill="url(#zm-top)" opacity="0.85" />
          <path d="M298 196 L298 244" stroke="#c1e8ff" strokeOpacity="0.45" strokeWidth="1" />
        </g>

        {/* orbit */}
        <ellipse cx="200" cy="270" rx="176" ry="54" fill="none" stroke="#c1e8ff" strokeOpacity="0.16" strokeWidth="1" strokeDasharray="2 7" transform="rotate(-12 200 270)" />
      </svg>

      <div className="z-mono-label absolute bottom-0 left-0 text-faint">FIG. 01 — FORM / FUNCTION</div>
    </div>
  );
}
