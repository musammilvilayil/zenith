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

/** Mix two colours. Accepts hex strings or pre-parsed [r, g, b] arrays. */
export function mixRgb(start, end, amount) {
  const t = clamp(amount, 0, 1);
  const a = Array.isArray(start) ? start : parseHex(start);
  const b = Array.isArray(end) ? end : parseHex(end);
  return [
    Math.round(a[0] + (b[0] - a[0]) * t),
    Math.round(a[1] + (b[1] - a[1]) * t),
    Math.round(a[2] + (b[2] - a[2]) * t),
  ];
}

export function rgbString([r, g, b], alpha = 1) {
  return alpha >= 1 ? `rgb(${r}, ${g}, ${b})` : `rgba(${r}, ${g}, ${b}, ${clamp(alpha, 0, 1)})`;
}

export function mixColor(startHex, endHex, amount, alpha = 1) {
  return rgbString(mixRgb(startHex, endHex, amount), alpha);
}

/**
 * Builds a lookup table of `steps` colours from `start` to `end`, so hot render
 * loops index a pre-parsed RGB triple instead of parsing hex strings per frame.
 */
export function buildRamp(start, end, steps = 32) {
  const a = Array.isArray(start) ? start : parseHex(start);
  const b = Array.isArray(end) ? end : parseHex(end);
  return Array.from({ length: steps }, (_, idx) => mixRgb(a, b, idx / (steps - 1)));
}

export function sampleRamp(ramp, amount) {
  return ramp[Math.round(clamp(amount, 0, 1) * (ramp.length - 1))];
}

/** Quantise alpha so the same rgba() strings are reused (cached) across frames. */
const rgbaCache = new Map();
export function rgbaCached(rgb, alpha) {
  const a = Math.round(clamp(alpha, 0, 1) * 100);
  const key = (rgb[0] << 16) | (rgb[1] << 8) | rgb[2] | (a << 24);
  let value = rgbaCache.get(key);
  if (!value) {
    value = `rgba(${rgb[0]}, ${rgb[1]}, ${rgb[2]}, ${a / 100})`;
    if (rgbaCache.size > 4096) rgbaCache.clear();
    rgbaCache.set(key, value);
  }
  return value;
}

/**
 * Device performance tier used to scale particle / strand / segment counts.
 *  - "full":    desktop
 *  - "reduced": tablets and mid-range hardware
 *  - "lite":    phones, data-saver, low-memory or low-core devices
 */
export function getRenderQuality() {
  if (typeof window === "undefined") return { tier: "full", scale: 1 };
  const width = window.innerWidth || 1440;
  const cores = navigator.hardwareConcurrency || 8;
  const memory = navigator.deviceMemory || 8;
  const saveData = navigator.connection?.saveData === true;
  const coarse = window.matchMedia?.("(pointer: coarse)").matches;

  if (saveData || memory <= 2 || cores <= 2 || width < 640) return { tier: "lite", scale: 0.45 };
  if (width < 1024 || coarse || memory <= 4 || cores <= 4) return { tier: "reduced", scale: 0.7 };
  return { tier: "full", scale: 1 };
}

const MAX_DPR = 1.25;

/**
 * Attaches resize, reduced-motion, visibility and pointer lifecycle to a 2D
 * canvas and runs `onDraw` in a single requestAnimationFrame loop that:
 *  - only runs while the canvas is at least 5% inside the viewport,
 *  - pauses while the tab is hidden,
 *  - draws a single static frame when the user prefers reduced motion,
 *  - caps the backing-store DPR at 1.25,
 *  - never starts two loops at once.
 */
export function mountAnimatedCanvas(canvas, { mouseInteraction = true, onDraw, onResize }) {
  const context = canvas?.getContext("2d", { alpha: true });
  if (!canvas || !context) return () => {};

  const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
  const quality = getRenderQuality();
  const pointer = { x: 0.5, y: 0.5, tx: 0.5, ty: 0.5 };
  const dpr = Math.min(window.devicePixelRatio || 1, MAX_DPR);
  const allowPointer = mouseInteraction && quality.tier !== "lite";
  let width = 1;
  let height = 1;
  let animationId = 0;
  let running = false;
  let inView = false;
  let pageVisible = document.visibilityState !== "hidden";
  let elapsedBase = 0;
  let lastNow = 0;
  let pointerBound = false;

  const draw = (now) => {
    const reduced = motionQuery.matches;
    if (!reduced && lastNow) elapsedBase += Math.min(0.1, (now - lastNow) / 1000);
    lastNow = now;
    pointer.x += (pointer.tx - pointer.x) * 0.08;
    pointer.y += (pointer.ty - pointer.y) * 0.08;
    context.clearRect(0, 0, width, height);
    onDraw({ context, width, height, elapsed: reduced ? 0 : elapsedBase, pointer, reduced, quality });
  };

  const loop = (now) => {
    if (!running) return;
    draw(now);
    animationId = window.requestAnimationFrame(loop);
  };

  const onPointerMove = (event) => {
    const rect = canvas.getBoundingClientRect();
    if (!rect.width || !rect.height) return;
    pointer.tx = clamp((event.clientX - rect.left) / rect.width, 0, 1);
    pointer.ty = clamp((event.clientY - rect.top) / rect.height, 0, 1);
  };

  const bindPointer = (bind) => {
    if (!allowPointer || bind === pointerBound) return;
    pointerBound = bind;
    if (bind) window.addEventListener("pointermove", onPointerMove, { passive: true });
    else window.removeEventListener("pointermove", onPointerMove);
  };

  const stop = () => {
    running = false;
    window.cancelAnimationFrame(animationId);
    animationId = 0;
    bindPointer(false);
  };

  const sync = () => {
    const shouldRun = inView && pageVisible && !motionQuery.matches;
    if (shouldRun && !running) {
      running = true;
      lastNow = 0;
      bindPointer(true);
      animationId = window.requestAnimationFrame(loop);
    } else if (!shouldRun && running) {
      stop();
    }
    // Reduced motion: paint one composed, static frame.
    if (motionQuery.matches && inView) draw(performance.now());
  };

  const resize = () => {
    const rect = canvas.getBoundingClientRect();
    const nextWidth = Math.max(1, rect.width);
    const nextHeight = Math.max(1, rect.height);
    if (nextWidth === width && nextHeight === height && canvas.width > 1) return;
    width = nextWidth;
    height = nextHeight;
    canvas.width = Math.round(width * dpr);
    canvas.height = Math.round(height * dpr);
    context.setTransform(dpr, 0, 0, dpr, 0, 0);
    onResize?.({ width, height, quality });
    if (!running && inView) draw(performance.now());
  };

  const resizeObserver = new ResizeObserver(resize);
  resizeObserver.observe(canvas);

  const intersectionObserver = new IntersectionObserver(
    (entries) => {
      inView = entries.some((entry) => entry.isIntersecting);
      sync();
    },
    { threshold: 0.05 },
  );
  intersectionObserver.observe(canvas);

  const onVisibility = () => {
    pageVisible = document.visibilityState !== "hidden";
    sync();
  };

  document.addEventListener("visibilitychange", onVisibility);
  motionQuery.addEventListener?.("change", sync);
  resize();

  return () => {
    stop();
    resizeObserver.disconnect();
    intersectionObserver.disconnect();
    document.removeEventListener("visibilitychange", onVisibility);
    motionQuery.removeEventListener?.("change", sync);
  };
}
