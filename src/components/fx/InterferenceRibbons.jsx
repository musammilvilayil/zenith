import { useEffect, useRef } from "react";
import { clamp, hexToRgba, mixColor, mountAnimatedCanvas } from "@/lib/canvas";
import { cn } from "@/lib/utils";

/**
 * Multi-strand ribbons of fine glowing wires drifting and twisting in harmonic
 * interference waves, tuned to Zenith's midnight/ice-blue palette.
 */
export default function InterferenceRibbons({
  className,
  primaryColor = "#C1E8FF",
  secondaryColor = "#7DA0CA",
  accentColor = "#5483B3",
  ribbonCount = 3,
  wiresPerRibbon = 10,
  twist = 2.4,
  driftSpeed = 0.38,
  amplitude = 0.14,
  opacity = 0.58,
  mouseInteraction = true,
}) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return undefined;

    const ribbons = clamp(Math.round(ribbonCount), 1, 4);
    const maxWires = clamp(Math.round(wiresPerRibbon), 4, 16);
    const desktopSegments = 56;

    const ribbonStops = Array.from({ length: ribbons }, (_, r) => {
      const ribbonU = ribbons === 1 ? 0.5 : r / (ribbons - 1);
      const tone = mixColor(accentColor, secondaryColor, ribbonU);
      return {
        edge: hexToRgba(tone, clamp(0.32 * opacity, 0.06, 0.45)),
        center: hexToRgba(primaryColor, clamp(0.45 * opacity, 0.08, 0.58)),
      };
    });

    let cachedWidth = 0;
    const ribbonGradients = [];

    return mountAnimatedCanvas(canvas, {
      mouseInteraction,
      targetFps: 60,
      onDraw: ({ context, width, height, elapsed, pointer }) => {
        const mobile = window.innerWidth < 768;
        const wires = mobile ? Math.min(maxWires, 7) : maxWires;
        const segments = mobile ? 32 : desktopSegments;
        const pointerY = mouseInteraction ? (pointer.y - 0.5) * height * 0.08 : 0;
        const pointerPhase = mouseInteraction ? (pointer.x - 0.5) * 0.9 : 0;

        if (width !== cachedWidth) {
          cachedWidth = width;
          ribbonGradients.length = 0;
          for (let r = 0; r < ribbons; r += 1) {
            const grad = context.createLinearGradient(0, 0, width, 0);
            grad.addColorStop(0, "rgba(2, 16, 36, 0)");
            grad.addColorStop(0.14, ribbonStops[r].edge);
            grad.addColorStop(0.5, ribbonStops[r].center);
            grad.addColorStop(0.86, ribbonStops[r].edge);
            grad.addColorStop(1, "rgba(2, 16, 36, 0)");
            ribbonGradients.push(grad);
          }
        }

        const prevComposite = context.globalCompositeOperation;
        context.globalCompositeOperation = "lighter";

        for (let r = 0; r < ribbons; r += 1) {
          const ribbonU = ribbons === 1 ? 0.5 : r / (ribbons - 1);
          const centerY = height * (0.28 + ribbonU * 0.44) + pointerY * (0.6 + ribbonU * 0.4);
          const ribbonAmp = height * amplitude * (0.75 + 0.35 * Math.sin(r * 1.7 + 0.5));
          const ribbonSpread = 22 + r * 10;
          const speed = driftSpeed * (0.85 + r * 0.18);
          const direction = r % 2 === 0 ? 1 : -1;

          context.strokeStyle = ribbonGradients[r];

          for (let w = 0; w < wires; w += 1) {
            const wireU = wires === 1 ? 0.5 : w / (wires - 1);
            const wireOffset = (wireU - 0.5) * 2;
            const avgTwist = Math.cos(elapsed * speed * 0.7 + wireU * Math.PI * 2 + r);

            context.globalAlpha = clamp(0.42 + (avgTwist + 1) * 0.29, 0.25, 1);
            context.lineWidth = 0.55 + (avgTwist + 1) * 0.32;
            context.beginPath();

            for (let s = 0; s <= segments; s += 1) {
              const t = s / segments;
              const x = t * width;
              const carrier =
                Math.sin(t * Math.PI * 2.2 + elapsed * speed * direction + r * 1.4 + pointerPhase) *
                ribbonAmp;
              const harmonic =
                Math.cos(t * Math.PI * 4.1 - elapsed * speed * 0.65 + r) * (ribbonAmp * 0.32);
              const twistWave =
                Math.sin(
                  t * Math.PI * twist +
                    elapsed * speed * 1.15 * direction +
                    wireU * Math.PI * 1.5 +
                    r * 0.9,
                ) *
                ribbonSpread *
                (0.65 + 0.35 * Math.sin(t * Math.PI));

              const y = centerY + carrier + harmonic + wireOffset * twistWave;
              if (s === 0) context.moveTo(x, y);
              else context.lineTo(x, y);
            }
            context.stroke();
          }
        }

        context.globalAlpha = 1;
        context.globalCompositeOperation = prevComposite;
      },
    });
  }, [
    accentColor,
    amplitude,
    driftSpeed,
    mouseInteraction,
    opacity,
    primaryColor,
    ribbonCount,
    secondaryColor,
    twist,
    wiresPerRibbon,
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
