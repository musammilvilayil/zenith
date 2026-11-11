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
  rows = 9,
  cols = 28,
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

    const maxRows = clamp(Math.round(rows), 4, 18);
    const maxCols = clamp(Math.round(cols), 12, 48);

    // Pre-quantize voxel colors outside the frame loop to avoid per-cell hex parsing.
    const paletteSteps = 16;
    const palette = Array.from({ length: paletteSteps }, (_, i) => {
      const t = i / (paletteSteps - 1);
      return t < 0.55
        ? mixColor(deepColor, midColor, t / 0.55)
        : mixColor(midColor, crestColor, (t - 0.55) / 0.45);
    });
    const horizonStop0 = hexToRgba(midColor, 0.2 * opacity);
    const horizonStop1 = hexToRgba(deepColor, 0.12 * opacity);
    let cachedWidth = 0;
    let cachedHeight = 0;
    let cachedHorizonGlow = null;

    return mountAnimatedCanvas(canvas, {
      mouseInteraction,
      targetFps: 60,
      onDraw: ({ context, width, height, elapsed, pointer }) => {
        const mobile = window.innerWidth < 768;
        const rowCount = mobile ? Math.min(maxRows, 7) : maxRows;
        const colCount = mobile ? Math.min(maxCols, 18) : maxCols;
        const horizon = height * clamp(horizonY, 0.2, 0.8);
        const arcLift = height * arcCurvature;
        const pointerInfluenceX = pointer.x;
        const pointerInfluenceY = pointer.y;

        if (width !== cachedWidth || height !== cachedHeight) {
          cachedWidth = width;
          cachedHeight = height;
          cachedHorizonGlow = context.createRadialGradient(
            width * 0.5,
            horizon + arcLift * 0.25,
            0,
            width * 0.5,
            horizon + arcLift * 0.25,
            width * 0.62,
          );
          cachedHorizonGlow.addColorStop(0, horizonStop0);
          cachedHorizonGlow.addColorStop(0.55, horizonStop1);
          cachedHorizonGlow.addColorStop(1, "rgba(2, 16, 36, 0)");
        }
        context.fillStyle = cachedHorizonGlow;
        context.fillRect(0, 0, width, height);

        for (let r = 0; r < rowCount; r += 1) {
          const depth = rowCount === 1 ? 1 : r / (rowCount - 1);
          const perspective = 0.35 + depth * 0.95;
          const rowY = horizon + Math.pow(depth, 1.35) * (height - horizon * 0.85);
          const spanWidth = width * (0.78 + depth * 0.56);
          const startX = (width - spanWidth) * 0.5;
          const baseSize = clamp((spanWidth / colCount) * 0.56, 3, 22);

          for (let c = 0; c < colCount; c += 1) {
            const u = colCount === 1 ? 0.5 : c / (colCount - 1);
            const centeredU = (u - 0.5) * 2;
            const arcOffset = centeredU * centeredU * arcLift * (1 - depth * 0.45);

            const swellA = Math.sin(u * Math.PI * 3.4 - elapsed * waveSpeed + depth * 2.2);
            const swellB = Math.cos(u * Math.PI * 5.2 + elapsed * waveSpeed * 0.72 - depth * 3.1);
            const waveNorm = (swellA * 0.62 + swellB * 0.38 + 1) * 0.5;

            let mouseLift = 0;
            if (mouseInteraction) {
              const dx = u - pointerInfluenceX;
              const dy = rowY / height - pointerInfluenceY;
              const distSq = dx * dx + dy * dy;
              if (distSq < 0.2) mouseLift = Math.exp(-distSq * 16) * 0.45;
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
            const colorIdx = Math.min(
              paletteSteps - 1,
              Math.max(0, Math.round(clamp(depth * 0.45 + totalWave * 0.55, 0, 1) * (paletteSteps - 1))),
            );

            context.globalAlpha = alpha;
            context.fillStyle = palette[colorIdx];
            context.fillRect(x - half, y - half, size, size);

            if (totalWave > 0.55) {
              context.globalAlpha = clamp((totalWave - 0.5) * 0.85 * edgeFade * opacity, 0, 0.7);
              context.strokeStyle = crestColor;
              context.lineWidth = 0.75;
              context.strokeRect(x - half, y - half, size, size);
            }
          }
        }

        context.globalAlpha = 1;
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
