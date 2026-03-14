"use client";

import { useScroll, useSpring, motion } from "framer-motion";

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();

  // Smooth out the progress tracking
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 z-[200] origin-left h-[2px] pointer-events-none"
      style={{
        scaleX,
        background: "linear-gradient(90deg, #f97316 0%, #fbbf24 50%, #f97316 100%)",
        boxShadow: "0 0 8px rgba(249, 115, 22, 0.6)",
      }}
    />
  );
}
