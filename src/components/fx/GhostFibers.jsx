import { useEffect, useRef } from "react";
import "./GhostFibers.css";

const clamp = (value, min, max) => Math.min(max, Math.max(min, value));

function hexToRgba(hex, alpha = 1) {
  const normalized = hex.replace("#", "").trim();
  const expanded = normalized.length === 3
    ? normalized.split("").map((part) => part + part).join("")
    : normalized;
  if (!/^[0-9a-fA-F]{6}$/.test(expanded)) return `rgba(139,92,246,${alpha})`;
  const value = Number.parseInt(expanded, 16);
  return `rgba(${(value >> 16) & 255},${(value >> 8) & 255},${value & 255},${alpha})`;
}

function mixColor(start, end, amount) {
  const parse = (hex) => {
    const value = hex.replace("#", "");
    const full = value.length === 3 ? value.split("").map((part) => part + part).join("") : value;
    if (!/^[0-9a-fA-F]{6}$/.test(full)) return [255, 255, 255];
    const number = Number.parseInt(full, 16);
    return [(number >> 16) & 255, (number >> 8) & 255, number & 255];
  };
  const a = parse(start);
  const b = parse(end);
  const rgb = a.map((channel, index) => Math.round(channel + (b[index] - channel) * amount));
  return `rgb(${rgb[0]}, ${rgb[1]}, ${rgb[2]})`;
}

export default function GhostFibers({
  glowColor = "#8b5cf6",
  layers = 3,
  twist = 1.6,
  threads = 72,
  fiberStyle = "dots",
  depthOfField = 0.85,
  hoverEffect = "focus",
  intro = true,
  mouseInteraction = true,
  lineColor = "#ffffff",
  secondaryColor = "#2dd4bf",
  gradient = "across",
  waves = 0.5,
  spread = 2,
  foldGlow = 1.3,
  brightness = 2,
  vignette = 0,
  mouseStrength = 1.15,
}) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d", { alpha: true });
    if (!canvas || !context) return undefined;

    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const pointer = { x: 0.5, y: 0.5 };
    let animationId = 0;
    let width = 0;
    let height = 0;
    let introProgress = intro ? 0 : 1;
    const dpr = Math.min(window.devicePixelRatio || 1, 1.75);
    const start = performance.now();

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      width = Math.max(1, rect.width);
      height = Math.max(1, rect.height);
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      context.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const onPointerMove = (event) => {
      if (!mouseInteraction) return;
      const rect = canvas.getBoundingClientRect();
      pointer.x = clamp((event.clientX - rect.left) / rect.width, 0, 1);
      pointer.y = clamp((event.clientY - rect.top) / rect.height, 0, 1);
    };

    const draw = (now) => {
      const elapsed = motionQuery.matches ? 0 : (now - start) / 1000;
      introProgress = intro ? (motionQuery.matches ? 1 : Math.min(1, elapsed * 0.7 + 0.15)) : 1;
      context.clearRect(0, 0, width, height);

      const horizon = height * 0.27;
      const focusX = mouseInteraction ? (pointer.x - 0.5) * mouseStrength * 32 : 0;
      const focusY = mouseInteraction ? (pointer.y - 0.5) * 12 : 0;
      const count = clamp(Math.round(threads), 12, 120);
      const layerCount = clamp(Math.round(layers), 1, 6);

      for (let layer = layerCount - 1; layer >= 0; layer -= 1) {
        const depth = (layer + 1) / layerCount;
        const alpha = clamp((0.12 + depth * 0.22) * depthOfField * brightness, 0, 0.92) * introProgress;
        context.globalAlpha = alpha;
        context.lineWidth = 0.45 + depth * 0.7;

        for (let i = 0; i < count; i += 1) {
          const u = i / Math.max(1, count - 1);
          const baseX = u * width;
          const depthScale = 0.25 + depth * 0.9;
          const amplitude = (5 + spread * 12) * depthScale;
          const phase = elapsed * (0.28 + depth * 0.14) + u * twist * Math.PI * 2;
          const xShift = focusX * (hoverEffect === "focus" ? 0.16 + depth * 0.18 : 0.08);
          const strandColor = gradient === "across"
            ? mixColor(lineColor, secondaryColor, u)
            : (layer % 2 ? secondaryColor : lineColor);
          context.strokeStyle = strandColor;
          context.fillStyle = strandColor;
          context.beginPath();

          for (let step = 0; step <= 48; step += 1) {
            const t = step / 48;
            const y = horizon + t * (height - horizon) + focusY * t;
            const perspective = 0.18 + t * 1.1;
            const wave = Math.sin(phase + t * (5 + twist * 2) + Math.sin(u * 9 + elapsed) * waves) * amplitude * perspective;
            const cross = Math.sin(t * 11 + u * 13 + phase) * amplitude * 0.28;
            const x = baseX + xShift + wave + cross;
            if (step === 0) context.moveTo(x, y);
            else context.lineTo(x, y);
          }
          context.stroke();

          if (fiberStyle === "dots" && i % 2 === 0) {
            for (let dot = 0; dot < 10; dot += 1) {
              const t = dot / 10;
              const y = horizon + t * (height - horizon) + focusY * t;
              const x = baseX + xShift + Math.sin(phase + t * 7) * amplitude * (0.18 + t);
              context.beginPath();
              context.arc(x, y, 0.45 + depth * 0.55, 0, Math.PI * 2);
              context.fill();
            }
          }
        }
      }

      context.globalAlpha = 1;
      const glow = context.createRadialGradient(width * 0.5, height * 0.72, 0, width * 0.5, height * 0.72, width * 0.62);
      glow.addColorStop(0, hexToRgba(glowColor, clamp(0.08 * foldGlow, 0, 0.32)));
      glow.addColorStop(1, "rgba(0,0,0,0)");
      context.fillStyle = glow;
      context.fillRect(0, 0, width, height);

      if (vignette > 0) {
        const shade = context.createRadialGradient(width / 2, height / 2, width * 0.15, width / 2, height / 2, width * 0.75);
        shade.addColorStop(0, "rgba(0,0,0,0)");
        shade.addColorStop(1, `rgba(0,0,0,${clamp(vignette, 0, 0.8)})`);
        context.fillStyle = shade;
        context.fillRect(0, 0, width, height);
      }

      if (!motionQuery.matches) animationId = window.requestAnimationFrame(draw);
    };

    resize();
    const observer = new ResizeObserver(resize);
    observer.observe(canvas);
    window.addEventListener("pointermove", onPointerMove, { passive: true });
    animationId = window.requestAnimationFrame(draw);

    return () => {
      window.cancelAnimationFrame(animationId);
      observer.disconnect();
      window.removeEventListener("pointermove", onPointerMove);
    };
  }, [brightness, depthOfField, fiberStyle, foldGlow, glowColor, gradient, hoverEffect, intro, layers, lineColor, mouseInteraction, mouseStrength, secondaryColor, spread, threads, twist, vignette, waves]);

  return (
    <div className="ghost-fibers-wrapper" aria-hidden="true">
      <div className="ghost-fibers-container">
        <canvas ref={canvasRef} className="ghost-fibers-canvas" />
      </div>
    </div>
  );
}
