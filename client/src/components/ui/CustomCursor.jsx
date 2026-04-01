"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import { useCallback, useEffect, useState } from "react";

const RIPPLE_DURATION_MS = 650;

export default function CustomCursor() {
  const [enabled, setEnabled] = useState(false);
  const [ripples, setRipples] = useState([]);
  const [hovering, setHovering] = useState(false);

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const smoothConfig = { damping: 28, stiffness: 420, mass: 0.4 };
  const trailConfig = { damping: 35, stiffness: 180, mass: 0.6 };

  const dotX = useSpring(cursorX, smoothConfig);
  const dotY = useSpring(cursorY, smoothConfig);
  const ringX = useSpring(cursorX, trailConfig);
  const ringY = useSpring(cursorY, trailConfig);

  useEffect(() => {
    const mq = window.matchMedia("(pointer: fine)");
    const update = () => setEnabled(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    if (!enabled) return;
    document.documentElement.classList.add("custom-cursor-active");
    return () => document.documentElement.classList.remove("custom-cursor-active");
  }, [enabled]);

  const onMove = useCallback(
    (e) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      const el = document.elementFromPoint(e.clientX, e.clientY);
      const interactive = el?.closest(
        "a, button, [role='button'], [data-cursor-hover], input, textarea, select"
      );
      setHovering(Boolean(interactive));
    },
    [cursorX, cursorY]
  );

  const onDown = useCallback((e) => {
    const id = `${Date.now()}-${Math.random()}`;
    setRipples((prev) => [...prev, { id, x: e.clientX, y: e.clientY }]);
    window.setTimeout(() => {
      setRipples((prev) => prev.filter((r) => r.id !== id));
    }, RIPPLE_DURATION_MS);
  }, []);

  useEffect(() => {
    if (!enabled) return;
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mousedown", onDown);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mousedown", onDown);
    };
  }, [enabled, onMove, onDown]);

  if (!enabled) return null;

  return (
    <>
      <motion.div
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[10000]"
        style={{ x: dotX, y: dotY, translateX: "-50%", translateY: "-50%" }}
      >
        <motion.div
          className="rounded-full bg-orange-400 shadow-[0_0_16px_rgba(249,115,22,0.85)]"
          animate={{ width: hovering ? 9 : 5, height: hovering ? 9 : 5 }}
          transition={{ type: "spring", stiffness: 400, damping: 28 }}
        />
      </motion.div>

      <motion.div
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[9999]"
        style={{ x: ringX, y: ringY, translateX: "-50%", translateY: "-50%" }}
      >
        <motion.div
          className="rounded-full border-2 border-orange-400/55 bg-orange-500/[0.06] backdrop-blur-[2px]"
          animate={{
            width: hovering ? 52 : 38,
            height: hovering ? 52 : 38,
            opacity: hovering ? 1 : 0.65,
            boxShadow: hovering
              ? "0 0 32px rgba(249, 115, 22, 0.55), 0 0 72px rgba(249, 115, 22, 0.2), inset 0 0 20px rgba(249, 115, 22, 0.15)"
              : "0 0 20px rgba(249, 115, 22, 0.25), 0 0 48px rgba(249, 115, 22, 0.08)",
          }}
          transition={{ type: "spring", stiffness: 260, damping: 22 }}
        />
      </motion.div>

      {ripples.map((r) => (
        <motion.span
          key={r.id}
          aria-hidden
          className="pointer-events-none fixed z-[9998] h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full border border-orange-400/50 bg-orange-500/20"
          style={{ left: r.x, top: r.y }}
          initial={{ scale: 0.2, opacity: 0.9 }}
          animate={{ scale: 4, opacity: 0 }}
          transition={{ duration: RIPPLE_DURATION_MS / 1000, ease: [0.22, 1, 0.36, 1] }}
        />
      ))}
    </>
  );
}
