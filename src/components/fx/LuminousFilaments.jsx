import { useEffect, useRef } from "react";
import { clamp, getRenderQuality, hexToRgba, mixColor, mountAnimatedCanvas } from "@/lib/canvas";
import { cn } from "@/lib/utils";

/**
 * Glowing fibers fanning out from a bright radial source, tuned to Zenith's
 * midnight-to-ice-blue palette. All colour strings and per-fiber constants are
 * computed once; the frame loop only does geometry.
 */
export default function LuminousFilaments({
  className,
  coreColor = "#EAF7FF",
  fiberColor = "#C1E8FF",
  secondaryColor = "#5483B3",
  filamentCount = 34,
  originX = 0.86,
  originY = 0.28,
  baseAngle = Math.PI * 0.92,
  spreadAngle = Math.PI * 0.82,
  reach = 0.92,
  glowIntensity = 0.85,
  speed = 0.45,
  mouseInteraction = true,
  opacity = 0.72,
}) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return undefined;

    const { scale } = getRenderQuality();
    const count = clamp(Math.round(filamentCount * scale), 8, 72);
    const transparent = hexToRgba(secondaryColor, 0);

    const bloomStops = [
      [0, hexToRgba(coreColor, 0.38 * glowIntensity * opacity)],
      [0.22, hexToRgba(fiberColor, 0.22 * glowIntensity * opacity)],
      [0.58, hexToRgba(secondaryColor, 0.08 * glowIntensity * opacity)],
      [1, "rgba(2, 16, 36, 0)"],
    ];
    const coreStops = [
      [0, hexToRgba(coreColor, 0.75 * opacity)],
      [0.45, hexToRgba(fiberColor, 0.25 * opacity)],
      [1, hexToRgba(fiberColor, 0)],
    ];

    const fibers = Array.from({ length: count }, (_, i) => {
      const u = count === 1 ? 0.5 : i / (count - 1);
      const centerBias = 1 - Math.abs(u - 0.5) * 1.45;
      const baseAlpha = clamp((0.14 + centerBias * 0.26) * opacity, 0.05, 0.55);
      return {
        i,
        u,
        centerBias,
        lineWidth: 0.65 + Math.max(0, centerBias) * 1.15,
        lengthFactor: 0.58 + 0.42 * Math.sin(u * Math.PI * 0.9 + 0.2),
        start: hexToRgba(coreColor, baseAlpha * 1.5),
        mid: mixColor(fiberColor, secondaryColor, 1 - centerBias, baseAlpha),
        pulseRadius: 1.4 + centerBias * 0.9,
      };
    });

    const pulseColors = Array.from({ length: 21 }, (_, idx) =>
      hexToRgba(coreColor, (idx / 20) * 0.55 * opacity),
    );

    return mountAnimatedCanvas(canvas, {
      mouseInteraction,
      onDraw: ({ context, width, height, elapsed, pointer }) => {
        const pointerShiftX = mouseInteraction ? (pointer.x - 0.5) * width * 0.04 : 0;
        const pointerShiftY = mouseInteraction ? (pointer.y - 0.5) * height * 0.04 : 0;
        const ox = originX * width + pointerShiftX * 0.4;
        const oy = originY * height + pointerShiftY * 0.4;
        const maxRadius = Math.hypot(width, height) * clamp(reach, 0.3, 1.4);

        const sourceRadius = Math.max(width, height) * 0.34;
        const bloom = context.createRadialGradient(ox, oy, 0, ox, oy, sourceRadius);
        for (const [stop, color] of bloomStops) bloom.addColorStop(stop, color);
        context.fillStyle = bloom;
        context.fillRect(0, 0, width, height);

        const prevComposite = context.globalCompositeOperation;
        context.globalCompositeOperation = "lighter";

        for (const fiber of fibers) {
          const { i, u } = fiber;
          const sway = Math.sin(elapsed * speed + i * 0.73) * 0.035;
          const angle = baseAngle + (u - 0.5) * spreadAngle + sway;
          const length = maxRadius * fiber.lengthFactor;
          const cos = Math.cos(angle);
          const sin = Math.sin(angle);

          const endX = ox + cos * length + pointerShiftX;
          const endY = oy + sin * length + pointerShiftY;
          const bend = Math.sin(elapsed * speed * 0.8 + i * 1.15) * 42 + (u - 0.5) * 90;

          const cp1x = ox + cos * length * 0.35 - sin * bend * 0.45;
          const cp1y = oy + sin * length * 0.35 + cos * bend * 0.45;
          const cp2x = ox + cos * length * 0.72 + sin * bend * 0.28;
          const cp2y = oy + sin * length * 0.72 - cos * bend * 0.28;

          const strandGrad = context.createLinearGradient(ox, oy, endX, endY);
          strandGrad.addColorStop(0, fiber.start);
          strandGrad.addColorStop(0.38, fiber.mid);
          strandGrad.addColorStop(1, transparent);

          context.strokeStyle = strandGrad;
          context.lineWidth = fiber.lineWidth;
          context.beginPath();
          context.moveTo(ox, oy);
          context.bezierCurveTo(cp1x, cp1y, cp2x, cp2y, endX, endY);
          context.stroke();

          if (i % 3 === 0) {
            const t = (elapsed * speed * 0.38 + u * 1.7) % 1;
            const pulse = Math.sin(t * Math.PI);
            if (pulse > 0.05) {
              const omt = 1 - t;
              const px =
                omt * omt * omt * ox + 3 * omt * omt * t * cp1x + 3 * omt * t * t * cp2x + t * t * t * endX;
              const py =
                omt * omt * omt * oy + 3 * omt * omt * t * cp1y + 3 * omt * t * t * cp2y + t * t * t * endY;
              context.fillStyle = pulseColors[Math.round(pulse * 20)];
              context.beginPath();
              context.arc(px, py, fiber.pulseRadius, 0, Math.PI * 2);
              context.fill();
            }
          }
        }

        const coreRadius = 28;
        const coreGrad = context.createRadialGradient(ox, oy, 0, ox, oy, coreRadius);
        for (const [stop, color] of coreStops) coreGrad.addColorStop(stop, color);
        context.fillStyle = coreGrad;
        context.beginPath();
        context.arc(ox, oy, coreRadius, 0, Math.PI * 2);
        context.fill();

        context.globalCompositeOperation = prevComposite;
      },
    });
  }, [
    baseAngle,
    coreColor,
    fiberColor,
    filamentCount,
    glowIntensity,
    mouseInteraction,
    opacity,
    originX,
    originY,
    reach,
    secondaryColor,
    speed,
    spreadAngle,
  ]);

  return (
    <div
      className={cn(
        "zenith-fx-layer pointer-events-none absolute inset-0 overflow-hidden select-none",
        className,
      )}
      aria-hidden="true"
    >
      <canvas ref={canvasRef} className="block h-full w-full" />
    </div>
  );
}
