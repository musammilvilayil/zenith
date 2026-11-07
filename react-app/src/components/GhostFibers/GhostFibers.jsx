import { useEffect, useRef } from "react";
import "./GhostFibers.css";

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
  spread = 2.0,
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

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const pointer = { x: 0.5, y: 0.5 };
    let frame = 0;
    let animationId = 0;
    let width = 0;
    let height = 0;
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
      pointer.x = (event.clientX - rect.left) / rect.width;
      pointer.y = (event.clientY - rect.top) / rect.height;
    };

    const draw = (now) => {
      const elapsed = reducedMotion.matches ? 0 : (now - start) / 1000;
      context.clearRect(0, 0, width, height);
      const horizon = height * 0.27;
      const focusX = mouseInteraction ? (pointer.x - 0.5) * mouseStrength * 32 : 0;
      const focusY = mouseInteraction ? (pointer.y - 0.5) * 12 : 0;
      const count = Math.max(12, Math.min(threads, 120));

      for (let layer = layers - 1; layer >= 0; layer -= 1) {
        const depth = (layer + 1) / Math.max(1, layers);
        const alpha = (0.12 + depth * 0.22) * Math.max(0.35, depthOfField);
        context.lineWidth = 0.45 + depth * 0.7;
        context.globalAlpha = alpha * brightness * (intro ? Math.min(1, elapsed * 0.7 + 0.15) : 1);
        context.strokeStyle = layer % 2 ? secondaryColor : lineColor;
        context.fillStyle = layer % 2 ? secondaryColor : lineColor;

        for (let i = 0; i < count; i += 1) {
          const u = i / Math.max(1, count - 1);
          const baseX = u * width;
          const depthScale = 0.25 + depth * 0.9;
          const amp = (5 + spread * 12) * depthScale;
          const phase = elapsed * (0.28 + depth * 0.14) + u * twist * Math.PI * 2;
          const xShift = focusX * (hoverEffect === "focus" ? 0.16 + depth * 0.18 : 0.08);
          context.beginPath();
          for (let step = 0; step <= 42; step += 1) {
            const t = step / 42;
            const y = horizon + t * (height - horizon) + focusY * t;
            const perspective = 0.18 + t * 1.1;
            const wave = Math.sin(phase + t * (5 + twist * 2) + Math.sin(u * 9 + elapsed) * waves) * amp * perspective;
            const cross = Math.sin(t * 11 + u * 13 + phase) * amp * 0.28;
            const x = baseX + xShift + wave + cross;
            if (step === 0) context.moveTo(x, y);
            else context.lineTo(x, y);
          }
          context.stroke();

          if (fiberStyle === "dots" && i % 2 === 0) {
            for (let dot = 0; dot < 9; dot += 1) {
              const t = dot / 9;
              const y = horizon + t * (height - horizon);
              const x = baseX + xShift + Math.sin(phase + t * 7) * amp * (0.18 + t);
              const radius = 0.45 + depth * 0.55;
              context.beginPath();
              context.arc(x, y, radius, 0, Math.PI * 2);
              context.fill();
            }
          }
        }
      }
      context.globalAlpha = 1;

      const glow = context.createRadialGradient(width * 0.5, height * 0.7, 0, width * 0.5, height * 0.7, width * 0.62);
      glow.addColorStop(0, `${glowColor}${foldGlow > 1 ? "22" : "14"}`);
      glow.addColorStop(1, "transparent");
      context.fillStyle = glow;
      context.fillRect(0, 0, width, height);

      if (vignette > 0) {
        const shade = context.createRadialGradient(width / 2, height / 2, width * 0.15, width / 2, height / 2, width * 0.75);
        shade.addColorStop(0, "transparent");
        shade.addColorStop(1, `rgba(0,0,0,${Math.min(0.8, vignette)})`);
        context.fillStyle = shade;
        context.fillRect(0, 0, width, height);
      }
      if (!reducedMotion.matches) animationId = window.requestAnimationFrame(draw);
    };

    resize();
    const observer = new ResizeObserver(resize);
    observer.observe(canvas);
    canvas.addEventListener("pointermove", onPointerMove, { passive: true });
    animationId = window.requestAnimationFrame(draw);

    return () => {
      window.cancelAnimationFrame(animationId);
      observer.disconnect();
      canvas.removeEventListener("pointermove", onPointerMove);
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
