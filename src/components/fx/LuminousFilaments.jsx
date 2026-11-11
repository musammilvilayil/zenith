import { useEffect, useRef } from "react";
import { clamp, hexToRgba, mixColor, mountAnimatedCanvas } from "@/lib/canvas";
import { cn } from "@/lib/utils";

/**
 * Glowing fibers fanning out from a bright radial source, tuned to Zenith's
 * midnight-to-ice-blue palette.
 */
export default function LuminousFilaments({
  className,
  coreColor = "#EAF7FF",
  fiberColor = "#C1E8FF",
  secondaryColor = "#5483B3",
  filamentCount = 26,
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

    const maxCount = clamp(Math.round(filamentCount), 8, 48);

    // Precompute filament colors & alphas outside the animation loop.
    const filamentStyles = Array.from({ length: maxCount }, (_, i) => {
      const u = maxCount === 1 ? 0.5 : i / (maxCount - 1);
      const centerBias = 1 - Math.abs(u - 0.5) * 1.45;
      const baseAlpha = clamp((0.14 + centerBias * 0.26) * opacity, 0.05, 0.55);
      return {
        u,
        centerBias,
        stroke: mixColor(fiberColor, secondaryColor, clamp(1 - centerBias, 0, 1), baseAlpha),
        lineWidth: 0.65 + Math.max(0, centerBias) * 1.15,
      };
    });

    const bloomStops = [
      hexToRgba(coreColor, 0.38 * glowIntensity * opacity),
      hexToRgba(fiberColor, 0.22 * glowIntensity * opacity),
      hexToRgba(secondaryColor, 0.08 * glowIntensity * opacity),
    ];
    const coreStops = [
      hexToRgba(coreColor, 0.75 * opacity),
      hexToRgba(fiberColor, 0.25 * opacity),
    ];

    const mobileFilamentStyles = filamentStyles.filter((_, index) =>
      index % 2 === 0,
    );
    let cachedWidth = 0;
    let cachedHeight = 0;
    let cachedBloom = null;
    let cachedCore = null;

    return mountAnimatedCanvas(canvas, {
      mouseInteraction,
      targetFps: 60,
      onDraw: ({ context, width, height, elapsed, pointer }) => {
        const mobile = window.innerWidth < 768;
        const activeStyles = mobile ? mobileFilamentStyles : filamentStyles;
        const count = activeStyles.length;
        const pointerShiftX = mouseInteraction ? (pointer.x - 0.5) * width * 0.04 : 0;
        const pointerShiftY = mouseInteraction ? (pointer.y - 0.5) * height * 0.04 : 0;
        const ox = originX * width + pointerShiftX * 0.4;
        const oy = originY * height + pointerShiftY * 0.4;
        const maxRadius = Math.hypot(width, height) * clamp(reach, 0.3, 1.4);

        if (width !== cachedWidth || height !== cachedHeight) {
          cachedWidth = width;
          cachedHeight = height;
          const gradientX = originX * width;
          const gradientY = originY * height;
          const sourceRadius = Math.max(width, height) * 0.34;
          cachedBloom = context.createRadialGradient(
            gradientX,
            gradientY,
            0,
            gradientX,
            gradientY,
            sourceRadius,
          );
          cachedBloom.addColorStop(0, bloomStops[0]);
          cachedBloom.addColorStop(0.22, bloomStops[1]);
          cachedBloom.addColorStop(0.58, bloomStops[2]);
          cachedBloom.addColorStop(1, "rgba(2, 16, 36, 0)");

          cachedCore = context.createRadialGradient(
            gradientX,
            gradientY,
            0,
            gradientX,
            gradientY,
            28,
          );
          cachedCore.addColorStop(0, coreStops[0]);
          cachedCore.addColorStop(0.45, coreStops[1]);
          cachedCore.addColorStop(1, "rgba(193, 232, 255, 0)");
        }

        context.fillStyle = cachedBloom;
        context.fillRect(0, 0, width, height);

        const prevComposite = context.globalCompositeOperation;
        context.globalCompositeOperation = "lighter";

        for (let i = 0; i < count; i += 1) {
          const style = activeStyles[i];
          const u = style.u;
          const sway = Math.sin(elapsed * speed + i * 0.73) * 0.035;
          const angle = baseAngle + (u - 0.5) * spreadAngle + sway;
          const length = maxRadius * (0.58 + 0.42 * Math.sin(u * Math.PI * 0.9 + 0.2));

          const endX = ox + Math.cos(angle) * length + pointerShiftX;
          const endY = oy + Math.sin(angle) * length + pointerShiftY;

          const bend = Math.sin(elapsed * speed * 0.8 + i * 1.15) * 42 + (u - 0.5) * 90;
          const perpX = -Math.sin(angle);
          const perpY = Math.cos(angle);

          const cp1x = ox + Math.cos(angle) * length * 0.35 + perpX * bend * 0.45;
          const cp1y = oy + Math.sin(angle) * length * 0.35 + perpY * bend * 0.45;
          const cp2x = ox + Math.cos(angle) * length * 0.72 - perpX * bend * 0.28;
          const cp2y = oy + Math.sin(angle) * length * 0.72 - perpY * bend * 0.28;

          context.strokeStyle = style.stroke;
          context.lineWidth = style.lineWidth;
          context.beginPath();
          context.moveTo(ox, oy);
          context.bezierCurveTo(cp1x, cp1y, cp2x, cp2y, endX, endY);
          context.stroke();

          if (i % 3 === 0) {
            const t = (elapsed * speed * 0.38 + u * 1.7) % 1;
            const omt = 1 - t;
            const px =
              omt * omt * omt * ox +
              3 * omt * omt * t * cp1x +
              3 * omt * t * t * cp2x +
              t * t * t * endX;
            const py =
              omt * omt * omt * oy +
              3 * omt * omt * t * cp1y +
              3 * omt * t * t * cp2y +
              t * t * t * endY;

            const pulseAlpha = Math.sin(t * Math.PI) * 0.55 * opacity;
            if (pulseAlpha > 0.02) {
              context.globalAlpha = pulseAlpha;
              context.fillStyle = coreColor;
              context.beginPath();
              context.arc(px, py, 1.4 + style.centerBias * 0.9, 0, Math.PI * 2);
              context.fill();
              context.globalAlpha = 1;
            }
          }
        }

        const coreRadius = 28;
        context.fillStyle = cachedCore;
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
