import { useEffect, useRef } from "react";
import {
  buildRamp,
  clamp,
  getRenderQuality,
  mixRgb,
  mountAnimatedCanvas,
  parseHex,
  rgbaCached,
  sampleRamp,
} from "@/lib/canvas";
import { cn } from "@/lib/utils";

const EDGE = "rgba(2, 16, 36, 0)";

/**
 * Multi-strand ribbons of fine glowing wires drifting and twisting in harmonic
 * interference waves. Colour ramps are pre-built per ribbon; segment and wire
 * counts scale with the device's render tier.
 */
export default function InterferenceRibbons({
  className,
  primaryColor = "#C1E8FF",
  secondaryColor = "#7DA0CA",
  accentColor = "#5483B3",
  ribbonCount = 3,
  wiresPerRibbon = 14,
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

    const { tier, scale } = getRenderQuality();
    const ribbons = clamp(Math.round(ribbonCount), 1, 5);
    const wires = clamp(Math.round(wiresPerRibbon * (tier === "full" ? 1 : scale + 0.15)), 4, 24);
    const segments = tier === "full" ? 96 : tier === "reduced" ? 64 : 40;
    const primaryRgb = parseHex(primaryColor);

    const ribbonData = Array.from({ length: ribbons }, (_, r) => {
      const ribbonU = ribbons === 1 ? 0.5 : r / (ribbons - 1);
      const base = mixRgb(accentColor, secondaryColor, ribbonU);
      return {
        r,
        ribbonU,
        ramp: buildRamp(base, primaryRgb, 24),
        ampFactor: 0.75 + 0.35 * Math.sin(r * 1.7 + 0.5),
        spread: 22 + r * 10,
        speed: driftSpeed * (0.85 + r * 0.18),
        direction: r % 2 === 0 ? 1 : -1,
      };
    });

    const wireU = Array.from({ length: wires }, (_, w) => (wires === 1 ? 0.5 : w / (wires - 1)));
    const ts = Array.from({ length: segments + 1 }, (_, s) => s / segments);
    const envelope = ts.map((t) => 0.65 + 0.35 * Math.sin(t * Math.PI));

    return mountAnimatedCanvas(canvas, {
      mouseInteraction,
      onDraw: ({ context, width, height, elapsed, pointer }) => {
        const pointerY = mouseInteraction ? (pointer.y - 0.5) * height * 0.08 : 0;
        const pointerPhase = mouseInteraction ? (pointer.x - 0.5) * 0.9 : 0;

        const prevComposite = context.globalCompositeOperation;
        context.globalCompositeOperation = "lighter";

        for (const ribbon of ribbonData) {
          const { r, ribbonU, speed, direction } = ribbon;
          const centerY = height * (0.28 + ribbonU * 0.44) + pointerY * (0.6 + ribbonU * 0.4);
          const ribbonAmp = height * amplitude * ribbon.ampFactor;
          const carrierPhase = elapsed * speed * direction + r * 1.4 + pointerPhase;
          const harmonicPhase = -elapsed * speed * 0.65 + r;
          const twistPhase = elapsed * speed * 1.15 * direction + r * 0.9;

          for (let w = 0; w < wires; w += 1) {
            const u = wireU[w];
            const wireOffset = (u - 0.5) * 2;
            const avgTwist = Math.cos(elapsed * speed * 0.7 + u * Math.PI * 2 + r);
            const depthAlpha = clamp((0.12 + (avgTwist + 1) * 0.16) * opacity, 0.05, 0.46);
            const wireRgb = sampleRamp(ribbon.ramp, 0.35 + avgTwist * 0.45);

            const grad = context.createLinearGradient(0, centerY, width, centerY);
            grad.addColorStop(0, EDGE);
            grad.addColorStop(0.14, rgbaCached(wireRgb, depthAlpha));
            grad.addColorStop(0.5, rgbaCached(primaryRgb, depthAlpha * 1.25));
            grad.addColorStop(0.86, rgbaCached(wireRgb, depthAlpha));
            grad.addColorStop(1, EDGE);

            context.strokeStyle = grad;
            context.lineWidth = 0.55 + (avgTwist + 1) * 0.32;
            context.beginPath();

            const twistWire = u * Math.PI * 1.5 + twistPhase;
            for (let s = 0; s <= segments; s += 1) {
              const t = ts[s];
              const carrier = Math.sin(t * Math.PI * 2.2 + carrierPhase) * ribbonAmp;
              const harmonic = Math.cos(t * Math.PI * 4.1 + harmonicPhase) * (ribbonAmp * 0.32);
              const twistWave =
                Math.sin(t * Math.PI * twist + twistWire) * ribbon.spread * envelope[s];
              const y = centerY + carrier + harmonic + wireOffset * twistWave;
              if (s === 0) context.moveTo(0, y);
              else context.lineTo(t * width, y);
            }
            context.stroke();
          }
        }

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
