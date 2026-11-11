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
 * Attaches resize, IntersectionObserver viewport gating, visibility gating,
 * reduced-motion, pointer tracking, and throttled animation loop lifecycle
 * management to an HTML5 2D canvas.
 */
export function mountAnimatedCanvas(
  canvas,
  { mouseInteraction = true, targetFps = 60, onDraw },
) {
  const context = canvas?.getContext("2d", { alpha: true });
  if (!canvas || !context) return () => {};

  const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
  const pointer = { x: 0.5, y: 0.5, tx: 0.5, ty: 0.5 };
  const dpr = Math.min(window.devicePixelRatio || 1, 1.25);
  const minFrameInterval = targetFps > 0 ? 1000 / targetFps : 0;
  const supportsIntersectionObserver = "IntersectionObserver" in window;
  let width = 1;
  let height = 1;
  let animationId = 0;
  let isVisible = !supportsIntersectionObserver;
  let isTabActive = !document.hidden;
  let elapsed = 0;
  let lastTick = performance.now();
  let lastRender = 0;

  const resize = () => {
    const rect = canvas.getBoundingClientRect();
    width = Math.max(1, rect.width);
    height = Math.max(1, rect.height);
    const nextW = Math.round(width * dpr);
    const nextH = Math.round(height * dpr);
    if (canvas.width !== nextW || canvas.height !== nextH) {
      canvas.width = nextW;
      canvas.height = nextH;
    }
    context.setTransform(dpr, 0, 0, dpr, 0, 0);
  };

  const drawSingleFrame = (now) => {
    const reduced = motionQuery.matches;
    if (!reduced) {
      const delta = Math.min(0.1, Math.max(0, (now - lastTick) / 1000));
      elapsed += delta;
    } else {
      elapsed = 0;
    }
    lastTick = now;

    pointer.x += (pointer.tx - pointer.x) * 0.08;
    pointer.y += (pointer.ty - pointer.y) * 0.08;

    context.clearRect(0, 0, width, height);
    onDraw({ context, width, height, elapsed, pointer, reduced });
  };

  const stopLoop = () => {
    if (animationId) {
      window.cancelAnimationFrame(animationId);
      animationId = 0;
    }
  };

  const scheduleLoop = () => {
    if (animationId || motionQuery.matches || !isVisible || !isTabActive) return;
    lastTick = performance.now();
    animationId = window.requestAnimationFrame(loop);
  };

  const loop = (now) => {
    animationId = 0;
    if (!isVisible || !isTabActive || motionQuery.matches) return;

    if (now - lastRender >= minFrameInterval) {
      lastRender = now;
      drawSingleFrame(now);
    }
    animationId = window.requestAnimationFrame(loop);
  };

  const onPointerMove = (event) => {
    if (!mouseInteraction || !isVisible || !isTabActive) return;
    const rect = canvas.getBoundingClientRect();
    if (!rect.width || !rect.height) return;
    pointer.tx = clamp((event.clientX - rect.left) / rect.width, 0, 1);
    pointer.ty = clamp((event.clientY - rect.top) / rect.height, 0, 1);
  };

  const onVisibilityChange = () => {
    isTabActive = !document.hidden;
    if (isTabActive && isVisible) {
      scheduleLoop();
    } else {
      stopLoop();
    }
  };

  const onMotionChange = () => {
    stopLoop();
    if (isVisible && isTabActive) drawSingleFrame(performance.now());
    scheduleLoop();
  };

  resize();
  if (isVisible) drawSingleFrame(performance.now());

  const resizeObserver = new ResizeObserver(() => {
    resize();
    if (isVisible && isTabActive) drawSingleFrame(performance.now());
  });
  resizeObserver.observe(canvas);

  let intersectionObserver = null;
  if (supportsIntersectionObserver) {
    intersectionObserver = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        isVisible = Boolean(entry?.isIntersecting && entry.intersectionRatio >= 0.05);
        if (isVisible) {
          drawSingleFrame(performance.now());
          scheduleLoop();
        } else {
          stopLoop();
        }
      },
      { threshold: 0.05 },
    );
    intersectionObserver.observe(canvas.closest("section") || canvas);
  }

  window.addEventListener("pointermove", onPointerMove, { passive: true });
  document.addEventListener("visibilitychange", onVisibilityChange);
  motionQuery.addEventListener?.("change", onMotionChange);
  scheduleLoop();

  return () => {
    stopLoop();
    resizeObserver.disconnect();
    intersectionObserver?.disconnect();
    window.removeEventListener("pointermove", onPointerMove);
    document.removeEventListener("visibilitychange", onVisibilityChange);
    motionQuery.removeEventListener?.("change", onMotionChange);
  };
}
