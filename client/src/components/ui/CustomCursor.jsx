"use client";

import { useEffect, useRef } from "react";
import { useMotionValue, useSpring, motion } from "framer-motion";

export default function CustomCursor() {
  const dotRef = useRef(null);
  const isHovering = useRef(false);
  const isVisible = useRef(false);

  const ringX = useMotionValue(-100);
  const ringY = useMotionValue(-100);

  // Slower spring for the trailing ring only
  const smoothRingX = useSpring(ringX, { stiffness: 180, damping: 22, mass: 0.5 });
  const smoothRingY = useSpring(ringY, { stiffness: 180, damping: 22, mass: 0.5 });

  useEffect(() => {
    const dot = dotRef.current;
    if (!dot) return;

    document.body.style.cursor = "none";

    const onMove = (e) => {
      const { clientX: x, clientY: y } = e;

      // Precision dot: instant via direct transform (no React re-render)
      dot.style.transform = `translate(${x - 4}px, ${y - 4}px)`;

      // Trailing ring: smooth spring
      ringX.set(x);
      ringY.set(y);

      if (!isVisible.current) {
        isVisible.current = true;
        dot.style.opacity = "1";
      }

      // Hover detection — throttled via ref, no setState
      const target = e.target;
      const hovering = Boolean(
        target.closest("a, button, [role='button'], input, textarea, [data-cursor-hover]")
      );
      if (hovering !== isHovering.current) {
        isHovering.current = hovering;
        dot.style.scale = hovering ? "2.5" : "1";
      }
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    return () => {
      window.removeEventListener("mousemove", onMove);
      document.body.style.cursor = "auto";
    };
  }, [ringX, ringY]);

  // Don't render on touch devices
  if (typeof window !== "undefined" && window.matchMedia("(pointer: coarse)").matches) {
    return null;
  }

  return (
    <>
      {/* Precision Dot — zero-lag via direct DOM */}
      <div
        ref={dotRef}
        className="pointer-events-none fixed left-0 top-0 z-[10000] h-2 w-2 rounded-full bg-white mix-blend-difference will-change-transform"
        style={{ opacity: 0, transition: "scale 0.15s ease" }}
      />

      {/* Trailing Ring — smooth spring via Framer Motion */}
      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-[9999] h-8 w-8 -translate-x-1/2 -translate-y-1/2 rounded-full border border-orange-500/40 bg-orange-500/5 will-change-transform"
        style={{ x: smoothRingX, y: smoothRingY }}
      />
    </>
  );
}

