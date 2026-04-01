"use client";

import { useCallback, useEffect, useRef, useState } from "react";

export default function CustomCursor() {
  const [enabled, setEnabled] = useState(false);
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const pos = useRef({ x: -100, y: -100 });
  const ringPos = useRef({ x: -100, y: -100 });
  const hovering = useRef(false);
  const rafId = useRef(null);

  // Check for pointer device
  useEffect(() => {
    const mq = window.matchMedia("(pointer: fine)");
    const update = () => setEnabled(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  // Hide default cursor
  useEffect(() => {
    if (!enabled) return;
    document.documentElement.classList.add("custom-cursor-active");
    return () => document.documentElement.classList.remove("custom-cursor-active");
  }, [enabled]);

  // Pure RAF render loop — no React re-renders, no springs, no layout thrashing
  const tick = useCallback(() => {
    // Lerp ring position toward actual cursor (smooth trailing)
    ringPos.current.x += (pos.current.x - ringPos.current.x) * 0.18;
    ringPos.current.y += (pos.current.y - ringPos.current.y) * 0.18;

    const dot = dotRef.current;
    const ring = ringRef.current;

    if (dot) {
      dot.style.transform = `translate3d(${pos.current.x}px, ${pos.current.y}px, 0) translate(-50%, -50%)`;
      dot.style.width = dot.style.height = hovering.current ? "10px" : "5px";
    }

    if (ring) {
      ring.style.transform = `translate3d(${ringPos.current.x}px, ${ringPos.current.y}px, 0) translate(-50%, -50%) scale(${hovering.current ? 1.35 : 1})`;
      ring.style.opacity = hovering.current ? "0.85" : "0.45";
    }

    rafId.current = requestAnimationFrame(tick);
  }, []);

  // Mouse tracking — zero state updates, just ref mutations
  const onMove = useCallback((e) => {
    pos.current.x = e.clientX;
    pos.current.y = e.clientY;

    const el = e.target;
    const interactive = el?.closest?.(
      "a, button, [role='button'], [data-cursor-hover], input, textarea, select"
    );
    hovering.current = Boolean(interactive);
  }, []);

  // Start/stop loop
  useEffect(() => {
    if (!enabled) return;

    window.addEventListener("mousemove", onMove, { passive: true });
    rafId.current = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("mousemove", onMove);
      if (rafId.current) cancelAnimationFrame(rafId.current);
    };
  }, [enabled, onMove, tick]);

  if (!enabled) return null;

  return (
    <>
      {/* Dot */}
      <div
        ref={dotRef}
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[10000] rounded-full bg-orange-400 shadow-[0_0_12px_rgba(249,115,22,0.8)]"
        style={{
          width: 5,
          height: 5,
          willChange: "transform",
          transition: "width 0.12s ease-out, height 0.12s ease-out",
        }}
      />

      {/* Ring — NO backdrop-blur, NO framer-motion springs */}
      <div
        ref={ringRef}
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[9999] h-8 w-8 rounded-full border-2 border-orange-400/50 shadow-[0_0_10px_rgba(249,115,22,0.2)]"
        style={{
          willChange: "transform, opacity",
          transition: "opacity 0.15s ease-out, box-shadow 0.15s ease-out",
        }}
      />
    </>
  );
}
