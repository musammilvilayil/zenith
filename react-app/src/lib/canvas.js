export function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value));
}

export function parseHex(hex, fallback = [193, 232, 255]) {
  const normalized = String(hex || "").replace("#", "").trim();
  const expanded =
    normalized.length === 3
      ? normalized
          .split("")
          .map((part) => part + part)
          .join("")
      : normalized;
  if (!/^[0-9a-fA-F]{6}$/.test(expanded)) return fallback;
  const value = Number.parseInt(expanded, 16);
  return [(value >> 16) & 255, (value >> 8) & 255, value & 255];
}

export function hexToRgba(hex, alpha = 1) {
  const [r, g, b] = parseHex(hex);
  return `rgba(${r}, ${g}, ${b}, ${clamp(alpha, 0, 1)})`;
}

export function mixColor(startHex, endHex, amount, alpha = 1) {
  const t = clamp(amount, 0, 1);
  const a = parseHex(startHex);
  const b = parseHex(endHex);
  const r = Math.round(a[0] + (b[0] - a[0]) * t);
  const g = Math.round(a[1] + (b[1] - a[1]) * t);
  const bl = Math.round(a[2] + (b[2] - a[2]) * t);
  return alpha >= 1
    ? `rgb(${r}, ${g}, ${bl})`
    : `rgba(${r}, ${g}, ${bl}, ${clamp(alpha, 0, 1)})`;
}

/**
 * Attaches resize, reduced-motion, pointer tracking, and animation loop
 * lifecycle management to an HTML5 2D canvas.
 */
export function mountAnimatedCanvas(canvas, { mouseInteraction = true, onDraw }) {
  const context = canvas?.getContext("2d", { alpha: true });
  if (!canvas || !context) return () => {};

  const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
  const pointer = { x: 0.5, y: 0.5, tx: 0.5, ty: 0.5 };
  const dpr = Math.min(window.devicePixelRatio || 1, 1.75);
  const start = performance.now();
  let width = 1;
  let height = 1;
  let animationId = 0;

  const resize = () => {
    const rect = canvas.getBoundingClientRect();
    width = Math.max(1, rect.width);
    height = Math.max(1, rect.height);
    canvas.width = Math.round(width * dpr);
    canvas.height = Math.round(height * dpr);
    context.setTransform(dpr, 0, 0, dpr, 0, 0);
  };

  const renderFrame = (now) => {
    const reduced = motionQuery.matches;
    const elapsed = reduced ? 0 : (now - start) / 1000;
    pointer.x += (pointer.tx - pointer.x) * 0.08;
    pointer.y += (pointer.ty - pointer.y) * 0.08;

    context.clearRect(0, 0, width, height);
    onDraw({ context, width, height, elapsed, pointer, reduced });

    if (!reduced) {
      animationId = window.requestAnimationFrame(renderFrame);
    }
  };

  const onPointerMove = (event) => {
    if (!mouseInteraction) return;
    const rect = canvas.getBoundingClientRect();
    if (!rect.width || !rect.height) return;
    pointer.tx = clamp((event.clientX - rect.left) / rect.width, 0, 1);
    pointer.ty = clamp((event.clientY - rect.top) / rect.height, 0, 1);
  };

  const onMotionChange = () => {
    window.cancelAnimationFrame(animationId);
    animationId = window.requestAnimationFrame(renderFrame);
  };

  resize();
  const observer = new ResizeObserver(() => {
    resize();
    if (motionQuery.matches) renderFrame(performance.now());
  });
  observer.observe(canvas);
  window.addEventListener("pointermove", onPointerMove, { passive: true });
  motionQuery.addEventListener?.("change", onMotionChange);
  animationId = window.requestAnimationFrame(renderFrame);

  return () => {
    window.cancelAnimationFrame(animationId);
    observer.disconnect();
    window.removeEventListener("pointermove", onPointerMove);
    motionQuery.removeEventListener?.("change", onMotionChange);
  };
}

