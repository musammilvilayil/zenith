import { useEffect, useRef } from "react";
import {
  clamp,
  getRenderQuality,
  hexToRgba,
  mixColor,
  mountAnimatedCanvas,
} from "@/lib/canvas";
import "./GhostFibers.css";

/**
 * Perspective "floor" of drifting fibres. Runs on the shared canvas lifecycle
 * (viewport-paused, DPR-capped, reduced-motion aware); strand colours and
 * per-strand constants are prepared once outside the frame loop.
 */
export default function GhostFibers({
  glowColor = "#5483B3",
  layers = 3,
  twist = 1.6,
  threads = 72,
  fiberStyle = "dots",
  depthOfField = 0.85,
  hoverEffect = "focus",
  intro = true,
  mouseInteraction = true,
  lineColor = "#ffffff",
  secondaryColor = "#7DA0CA",
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

    const { tier, scale } = getRenderQuality();
    const count = clamp(Math.round(threads * scale), 12, 120);
    const layerCount = clamp(Math.round(layers) - (tier === "lite" ? 1 : 0), 1, 6);
    const steps = tier === "full" ? 48 : tier === "reduced" ? 36 : 24;
    const dotsPerStrand = tier === "lite" ? 0 : 10;
    const glowFill = hexToRgba(glowColor, clamp(0.08 * foldGlow, 0, 0.32));
    const vignetteFill = `rgba(0,0,0,${clamp(vignette, 0, 0.8)})`;

    const layerData = Array.from({ length: layerCount }, (_, idx) => {
      const layer = layerCount - 1 - idx; // back to front
      const depth = (layer + 1) / layerCount;
      return {
        depth,
        alpha: clamp((0.12 + depth * 0.22) * depthOfField * brightness, 0, 0.92),
        lineWidth: 0.45 + depth * 0.7,
        depthScale: 0.25 + depth * 0.9,
        speed: 0.28 + depth * 0.14,
        shiftFactor: hoverEffect === "focus" ? 0.16 + depth * 0.18 : 0.08,
        dotRadius: 0.45 + depth * 0.55,
        strands: Array.from({ length: count }, (_, i) => {
          const u = i / Math.max(1, count - 1);
          return {
            i,
            u,
            uTwist: u * twist * Math.PI * 2,
            u9: u * 9,
            u13: u * 13,
            color:
              gradient === "across"
                ? mixColor(lineColor, secondaryColor, u)
                : layer % 2
                  ? secondaryColor
                  : lineColor,
          };
        }),
      };
    });

    const ts = Array.from({ length: steps + 1 }, (_, s) => s / steps);
    const freq = 5 + twist * 2;

    return mountAnimatedCanvas(canvas, {
      mouseInteraction,
      onDraw: ({ context, width, height, elapsed, pointer, reduced }) => {
        const introProgress = intro && !reduced ? Math.min(1, elapsed * 0.7 + 0.15) : 1;
        const horizon = height * 0.27;
        const span = height - horizon;
        const focusX = mouseInteraction ? (pointer.x - 0.5) * mouseStrength * 32 : 0;
        const focusY = mouseInteraction ? (pointer.y - 0.5) * 12 : 0;

        for (const layer of layerData) {
          context.globalAlpha = layer.alpha * introProgress;
          context.lineWidth = layer.lineWidth;
          const amplitude = (5 + spread * 12) * layer.depthScale;
          const xShift = focusX * layer.shiftFactor;
          const layerPhase = elapsed * layer.speed;

          for (const strand of layer.strands) {
            const baseX = strand.u * width + xShift;
            const phase = layerPhase + strand.uTwist;
            const waveMod = Math.sin(strand.u9 + elapsed) * waves;
            context.strokeStyle = strand.color;
            context.beginPath();

            for (let step = 0; step <= steps; step += 1) {
              const t = ts[step];
              const y = horizon + t * span + focusY * t;
              const perspective = 0.18 + t * 1.1;
              const wave = Math.sin(phase + t * freq + waveMod) * amplitude * perspective;
              const cross = Math.sin(t * 11 + strand.u13 + phase) * amplitude * 0.28;
              if (step === 0) context.moveTo(baseX + wave + cross, y);
              else context.lineTo(baseX + wave + cross, y);
            }
            context.stroke();

            if (fiberStyle === "dots" && dotsPerStrand && strand.i % 2 === 0) {
              context.fillStyle = strand.color;
              context.beginPath();
              for (let dot = 0; dot < dotsPerStrand; dot += 1) {
                const t = dot / dotsPerStrand;
                const y = horizon + t * span + focusY * t;
                const x = baseX + Math.sin(phase + t * 7) * amplitude * (0.18 + t);
                context.moveTo(x + layer.dotRadius, y);
                context.arc(x, y, layer.dotRadius, 0, Math.PI * 2);
              }
              context.fill();
            }
          }
        }

        context.globalAlpha = 1;
        const glow = context.createRadialGradient(
          width * 0.5,
          height * 0.72,
          0,
          width * 0.5,
          height * 0.72,
          width * 0.62,
        );
        glow.addColorStop(0, glowFill);
        glow.addColorStop(1, "rgba(0,0,0,0)");
        context.fillStyle = glow;
        context.fillRect(0, 0, width, height);

        if (vignette > 0) {
          const shade = context.createRadialGradient(
            width / 2,
            height / 2,
            width * 0.15,
            width / 2,
            height / 2,
            width * 0.75,
          );
          shade.addColorStop(0, "rgba(0,0,0,0)");
          shade.addColorStop(1, vignetteFill);
          context.fillStyle = shade;
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
