import { useEffect, useRef } from "react";
import { clamp, hexToRgba, mixColor, mountAnimatedCanvas } from "@/lib/canvas";
import { cn } from "@/lib/utils";

/**
 * A curved horizon of square voxels rolling like a calm sea, styled with
 * Zenith's deep navy, steel, and ice-blue tokens.
 */
export default function VoxelArc({
  className,
  crestColor = "#C1E8FF",
  midColor = "#5483B3",
  deepColor = "#052659",
  rows = 12,
  cols = 38,
  horizonY = 0.44,
  arcCurvature = 0.14,
  waveHeight = 16,
  waveSpeed = 0.65,
  opacity = 0.8,
  mouseInteraction = true,
}) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return undefined;

    const rowCount = clamp(Math.round(rows), 4, 24);
    const colCount = clamp(Math.round(cols), 12, 64);

    return mountAnimatedCanvas(canvas, {
      mouseInteraction,
      onDraw: ({ context, width, height, elapsed, pointer }) => {
        const horizon = height * clamp(horizonY, 0.2, 0.8);
        const arcLift = height * arcCurvature;
        const pointerInfluenceX = pointer.x;
        const pointerInfluenceY = pointer.y;

        // Soft atmospheric horizon glow
        const horizonGlow = context.createRadialGradient(
          width * 0.5,
          horizon + arcLift * 0.25,
          0,
          width * 0.5,
          horizon + arcLift * 0.25,
          width * 0.62,
        );
        horizonGlow.addColorStop(0, hexToRgba(midColor, 0.2 * opacity));
        horizonGlow.addColorStop(0.55, hexToRgba(deepColor, 0.12 * opacity));
        horizonGlow.addColorStop(1, "rgba(2, 16, 36, 0)");
        context.fillStyle = horizonGlow;
        context.fillRect(0, 0, width, height);

        // Draw rows back-to-front so nearer voxels layer cleanly
        for (let r = 0; r < rowCount; r += 1) {
          const depth = rowCount === 1 ? 1 : r / (rowCount - 1); // 0 = far horizon, 1 = foreground
          const perspective = 0.35 + depth * 0.95;
          const rowY = horizon + Math.pow(depth, 1.35) * (height - horizon * 0.85);
          const spanWidth = width * (0.78 + depth * 0.56);
          const startX = (width - spanWidth) * 0.5;
          const baseSize = clamp((spanWidth / colCount) * 0.56, 3, 22);

          for (let c = 0; c < colCount; c += 1) {
            const u = colCount === 1 ? 0.5 : c / (colCount - 1);
            const centeredU = (u - 0.5) * 2; // -1 .. 1

            // Parabolic horizon arc: raises center, curves downward toward edges
            const arcOffset = (centeredU * centeredU) * arcLift * (1 - depth * 0.45);

            // Calm dual-wave sea swell
            const swellA = Math.sin(u * Math.PI * 3.4 - elapsed * waveSpeed + depth * 2.2);
            const swellB = Math.cos(u * Math.PI * 5.2 + elapsed * waveSpeed * 0.72 - depth * 3.1);
            const waveNorm = (swellA * 0.62 + swellB * 0.38 + 1) * 0.5; // 0 .. 1

            let mouseLift = 0;
            if (mouseInteraction) {
              const dx = u - pointerInfluenceX;
              const dy = (rowY / height) - pointerInfluenceY;
              const dist = Math.hypot(dx, dy);
              mouseLift = Math.exp(-dist * dist * 16) * 0.45;
            }

            const totalWave = clamp(waveNorm + mouseLift, 0, 1.25);
            const yOffset = -totalWave * waveHeight * perspective;
            const x = startX + u * spanWidth;
            const y = rowY + arcOffset + yOffset;

            if (y < -baseSize || y > height + baseSize) continue;

            const edgeFade = clamp(1 - Math.pow(Math.abs(centeredU), 2.4), 0, 1);
            const alpha = clamp((0.16 + depth * 0.46 + totalWave * 0.25) * edgeFade * opacity, 0, 0.92);
            if (alpha <= 0.015) continue;

            const size = baseSize * (0.82 + totalWave * 0.36);
            const half = size * 0.5;
            const voxelColor = mixColor(
              mixColor(deepColor, midColor, clamp(depth * 0.7 + totalWave * 0.3, 0, 1)),
              crestColor,
              clamp((totalWave - 0.35) * 1.15, 0, 1),
            );

            // Soft voxel body
            context.fillStyle = hexToRgba(voxelColor, alpha);
            context.fillRect(x - half, y - half, size, size);

            // Crisp ice-blue crest rim on high swells
            if (totalWave > 0.52) {
              context.strokeStyle = hexToRgba(crestColor, clamp((totalWave - 0.5) * 0.95 * edgeFade * opacity, 0, 0.75));
              context.lineWidth = 0.75;
              context.strokeRect(x - half, y - half, size, size);
            }
          }
        }
      },
    });
  }, [
    arcCurvature,
    cols,
    crestColor,
    deepColor,
    horizonY,
    midColor,
    mouseInteraction,
    opacity,
    rows,
    waveHeight,
    waveSpeed,
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

