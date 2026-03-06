"use client";

import { useReducedMotion } from "framer-motion";

/**
 * Replaces layered Framer infinite loops with static gradients + one CSS sweep.
 */
export default function CTABackground({ variant = "orange" }) {
  const reduced = useReducedMotion();
  const warm = variant === "orange";

  return (
    <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden select-none">
      <div
        className={`absolute inset-0 opacity-50 blur-[72px] transition-colors duration-700 ${
          warm ? "bg-orange-500/12" : "bg-purple-500/12"
        }`}
      />

      {!reduced && (
        <>
          <div
            className={`cta-bg-sweep absolute top-1/4 left-0 h-px w-full bg-gradient-to-r from-transparent to-transparent ${
              warm
                ? "via-orange-500/15"
                : "via-purple-500/15"
            }`}
          />
          <div
            className={`cta-bg-sweep cta-bg-sweep--slow absolute bottom-1/3 left-0 h-px w-full bg-gradient-to-r from-transparent to-transparent ${
              warm ? "via-orange-400/10" : "via-purple-400/10"
            }`}
          />
        </>
      )}
    </div>
  );
}
