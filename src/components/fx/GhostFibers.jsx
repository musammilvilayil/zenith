import { useEffect, useRef } from "react";
import { clamp, hexToRgba, mixColor, mountAnimatedCanvas } from "@/lib/canvas";
import "./GhostFibers.css";

export default function GhostFibers({
  glowColor = "#8b5cf6",
  layers = 3,
  twist = 1.6,
  threads = 38,
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
    if (!canvas) return undefined;

    const layerCount = clamp(Math.round(layers), 1, 5);
    const maxThreads = clamp(Math.round(threads), 12, 64);
    const desktopSteps = 28;

    // Precompute strand colors once outside the frame loop.
    const acrossColors = Array.from({ length: maxThreads }, (_, i) =>
      mixColor(lineColor, secondaryColor, i / Math.max(1, maxThreads - 1)),
    );
    const glowStop = hexToRgba(glowColor, clamp(0.08 * foldGlow, 0, 0.32));
    const vignetteStop =
      vignette > 0 ? `rgba(0,0,0,${clamp(vignette, 0, 0.8)})` : "";

    let cachedW = 0;
    let cachedH = 0;
    let cachedGlow = null;
    let cachedShade = null;

    return mountAnimatedCanvas(canvas, {
      mouseInteraction,
      targetFps: 60,
      onDraw: ({ context, width, height, elapsed, pointer, reduced }) => {
        const mobile = window.innerWidth < 768;
        const activeLayers = mobile ? Math.min(layerCount, 2) : layerCount;
        const steps = mobile ? 20 : desktopSteps;
        if (width !== cachedW || height !== cachedH) {
          cachedW = width;
          cachedH = height;
          cachedGlow = context.createRadialGradient(
            width * 0.5,
            height * 0.72,
            0,
            width * 0.5,
            height * 0.72,
            width * 0.62,
          );
          cachedGlow.addColorStop(0, glowStop);
          cachedGlow.addColorStop(1, "rgba(0,0,0,0)");

          if (vignette > 0) {
            cachedShade = context.createRadialGradient(
              width * 0.5,
              height * 0.5,
              width * 0.15,
              width * 0.5,
              height * 0.5,
              width * 0.75,
            );
            cachedShade.addColorStop(0, "rgba(0,0,0,0)");
            cachedShade.addColorStop(1, vignetteStop);
          } else {
            cachedShade = null;
          }
        }

        const introProgress = intro
          ? reduced
            ? 1
            : Math.min(1, elapsed * 0.7 + 0.15)
          : 1;
        const horizon = height * 0.27;
        const focusX = mouseInteraction
          ? (pointer.x - 0.5) * mouseStrength * 32
          : 0;
        const focusY = mouseInteraction ? (pointer.y - 0.5) * 12 : 0;
        const count = mobile ? Math.min(maxThreads, 20) : maxThreads;

        for (let layer = activeLayers - 1; layer >= 0; layer -= 1) {
          const depth = (layer + 1) / activeLayers;
          const alpha =
            clamp((0.12 + depth * 0.22) * depthOfField * brightness, 0, 0.92) *
            introProgress;
          context.globalAlpha = alpha;
          context.lineWidth = 0.45 + depth * 0.7;

          const depthScale = 0.25 + depth * 0.9;
          const amplitude = (5 + spread * 12) * depthScale;
          const xShift =
            focusX * (hoverEffect === "focus" ? 0.16 + depth * 0.18 : 0.08);
          const layerSpeed = elapsed * (0.28 + depth * 0.14);

          for (let i = 0; i < count; i += 1) {
            const u = i / Math.max(1, count - 1);
            const baseX = u * width;
            const phase = layerSpeed + u * twist * Math.PI * 2;
            const colorIndex = Math.round(u * (maxThreads - 1));
            const strandColor =
              gradient === "across"
                ? acrossColors[colorIndex]
                : layer % 2
                  ? secondaryColor
                  : lineColor;

            context.strokeStyle = strandColor;
            context.beginPath();

            for (let step = 0; step <= steps; step += 1) {
              const t = step / steps;
              const y = horizon + t * (height - horizon) + focusY * t;
              const perspective = 0.18 + t * 1.1;
              const wave =
                Math.sin(
                  phase +
                    t * (5 + twist * 2) +
                    Math.sin(u * 9 + elapsed) * waves,
                ) *
                amplitude *
                perspective;
              const cross = Math.sin(t * 11 + u * 13 + phase) * amplitude * 0.28;
              const x = baseX + xShift + wave + cross;
              if (step === 0) context.moveTo(x, y);
              else context.lineTo(x, y);
            }
            context.stroke();

            if (fiberStyle === "dots" && i % 3 === 0) {
              context.fillStyle = strandColor;
              for (let dot = 0; dot < 6; dot += 1) {
                const t = dot / 6;
                const y = horizon + t * (height - horizon) + focusY * t;
                const x =
                  baseX +
                  xShift +
                  Math.sin(phase + t * 7) * amplitude * (0.18 + t);
                context.beginPath();
                context.arc(x, y, 0.55 + depth * 0.5, 0, Math.PI * 2);
                context.fill();
              }
            }
          }
        }

        context.globalAlpha = 1;
        if (cachedGlow) {
          context.fillStyle = cachedGlow;
          context.fillRect(0, 0, width, height);
        }
        if (cachedShade) {
          context.fillStyle = cachedShade;
          context.fillRect(0, 0, width, height);
        }
      },
    });
  }, [
    brightness,
    depthOfField,
    fiberStyle,
    foldGlow,
    glowColor,
    gradient,
    hoverEffect,
    intro,
    layers,
    lineColor,
    mouseInteraction,
    mouseStrength,
    secondaryColor,
    spread,
    threads,
    twist,
    vignette,
    waves,
  ]);

  return (
    <div className="ghost-fibers-wrapper" aria-hidden="true">
      <div className="ghost-fibers-container">
        <canvas ref={canvasRef} className="ghost-fibers-canvas" />
      </div>
    </div>
  );
}
