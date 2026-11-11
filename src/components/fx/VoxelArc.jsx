import { useEffect, useRef } from "react";
import {
  clamp,
  getRenderQuality,
  hexToRgba,
  mixRgb,
  mountAnimatedCanvas,
  parseHex,
  rgbaCached,
} from "@/lib/canvas";
import { cn } from "@/lib/utils";

const WAVE_STEPS = 26; // wave values 0 … 1.25 quantised into a lookup table

/**
 * A curved horizon of square voxels rolling like a calm sea. Per-row colour
 * lookup tables and per-column edge fades are computed once, so the frame
 * loop never parses or mixes colours.
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

    const { scale } = getRenderQuality();
    const rowCount = clamp(Math.round(rows * Math.max(0.6, scale)), 4, 24);
    const colCount = clamp(Math.round(cols * Math.max(0.55, scale)), 12, 64);
    const crest = parseHex(crestColor);
    const mid = parseHex(midColor);
    const deep = parseHex(deepColor);

    const colData = Array.from({ length: colCount }, (_, c) => {
      const u = colCount === 1 ? 0.5 : c / (colCount - 1);
      const centeredU = (u - 0.5) * 2;
      return {
        u,
        arc: centeredU * centeredU,
        edgeFade: clamp(1 - Math.pow(Math.abs(centeredU), 2.4), 0, 1),
        phaseA: u * Math.PI * 3.4,
        phaseB: u * Math.PI * 5.2,
      };
    });

    const rowData = Array.from({ length: rowCount }, (_, r) => {
      const depth = rowCount === 1 ? 1 : r / (rowCount - 1);
      const lut = Array.from({ length: WAVE_STEPS }, (_, idx) => {
        const wave = (idx / (WAVE_STEPS - 1)) * 1.25;
        return mixRgb(
          mixRgb(deep, mid, clamp(depth * 0.7 + wave * 0.3, 0, 1)),
          crest,
          clamp((wave - 0.35) * 1.15, 0, 1),
        );
      });
      return {
        depth,
        perspective: 0.35 + depth * 0.95,
        depthCurve: Math.pow(depth, 1.35),
        lut,
      };
    });

    const glowStops = [
      [0, hexToRgba(midColor, 0.2 * opacity)],
      [0.55, hexToRgba(deepColor, 0.12 * opacity)],
      [1, "rgba(2, 16, 36, 0)"],
    ];

    return mountAnimatedCanvas(canvas, {
      mouseInteraction,
      onDraw: ({ context, width, height, elapsed, pointer }) => {
        const horizon = height * clamp(horizonY, 0.2, 0.8);
        const arcLift = height * arcCurvature;
        const t1 = elapsed * waveSpeed;
        const t2 = elapsed * waveSpeed * 0.72;

        const glowY = horizon + arcLift * 0.25;
        const horizonGlow = context.createRadialGradient(width * 0.5, glowY, 0, width * 0.5, glowY, width * 0.62);
        for (const [stop, color] of glowStops) horizonGlow.addColorStop(stop, color);
        context.fillStyle = horizonGlow;
        context.fillRect(0, 0, width, height);
        context.lineWidth = 0.75;

        for (const row of rowData) {
          const { depth, perspective, lut } = row;
          const rowY = horizon + row.depthCurve * (height - horizon * 0.85);
          const spanWidth = width * (0.78 + depth * 0.56);
          const startX = (width - spanWidth) * 0.5;
          const baseSize = clamp((spanWidth / colCount) * 0.56, 3, 22);
          const arcRow = arcLift * (1 - depth * 0.45);
          const rowNormY = rowY / height;
          const depthA = depth * 2.2;
          const depthB = depth * 3.1;
          const baseAlpha = 0.16 + depth * 0.46;

          for (const col of colData) {
            const swellA = Math.sin(col.phaseA - t1 + depthA);
            const swellB = Math.cos(col.phaseB + t2 - depthB);
            const waveNorm = (swellA * 0.62 + swellB * 0.38 + 1) * 0.5;

            let mouseLift = 0;
            if (mouseInteraction) {
              const dx = col.u - pointer.x;
              const dy = rowNormY - pointer.y;
              mouseLift = Math.exp(-(dx * dx + dy * dy) * 16) * 0.45;
            }

            const totalWave = clamp(waveNorm + mouseLift, 0, 1.25);
            const size = baseSize * (0.82 + totalWave * 0.36);
            const half = size * 0.5;
            const x = startX + col.u * spanWidth;
            const y = rowY + col.arc * arcRow - totalWave * waveHeight * perspective;
            if (y < -size || y > height + size) continue;

            const alpha = clamp((baseAlpha + totalWave * 0.25) * col.edgeFade * opacity, 0, 0.92);
            if (alpha <= 0.015) continue;

            const rgb = lut[Math.round((totalWave / 1.25) * (WAVE_STEPS - 1))];
            context.fillStyle = rgbaCached(rgb, alpha);
            context.fillRect(x - half, y - half, size, size);

            if (totalWave > 0.52) {
              context.strokeStyle = rgbaCached(
                crest,
                clamp((totalWave - 0.5) * 0.95 * col.edgeFade * opacity, 0, 0.75),
              );
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
