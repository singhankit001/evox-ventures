"use client";

import { useReducedMotion } from "framer-motion";

/**
 * Static + CSS-only accents — avoids dozens of Framer infinite animations and
 * global mousemove springs that were driving main-thread cost in dev.
 */
export default function FooterBackground() {
  const reduced = useReducedMotion();

  return (
    <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden select-none">
      <div className="absolute inset-0 bg-[#050505]" />

      <div
        className="absolute inset-0 opacity-[0.035]"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.12) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.12) 1px, transparent 1px)`,
          backgroundSize: "80px 80px",
        }}
      />

      <div className="absolute bottom-0 left-1/2 h-[280px] w-[min(90vw,560px)] -translate-x-1/2 rounded-full bg-orange-500/6 blur-[64px]" />

      {!reduced && (
        <>
          <div className="footer-bg-sweep absolute -left-1/4 top-1/4 h-px w-1/2 bg-gradient-to-r from-transparent via-orange-500/12 to-transparent" />
          <div className="footer-bg-sweep footer-bg-sweep--delayed absolute -right-1/4 bottom-1/3 h-px w-1/2 bg-gradient-to-r from-transparent via-orange-400/8 to-transparent" />
        </>
      )}
    </div>
  );
}
