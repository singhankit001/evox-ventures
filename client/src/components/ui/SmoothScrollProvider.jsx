"use client";

import { useEffect, useRef } from "react";

export default function SmoothScrollProvider({ children }) {
  const lenisRef = useRef(null);

  useEffect(() => {
    // Skip on touch/mobile devices
    const isTouch = window.matchMedia("(pointer: coarse)").matches;
    if (isTouch) return;

    // Dynamic import to avoid SSR issues
    let rafId;
    let lenis;

    import("lenis").then(({ default: Lenis }) => {
      lenis = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        orientation: "vertical",
        gestureOrientation: "vertical",
        smoothWheel: true,
        wheelMultiplier: 0.9,
        touchMultiplier: 0,
        infinite: false,
      });

      lenisRef.current = lenis;

      // Expose globally for other components (e.g. ScrollTrigger integration)
      window.__lenis = lenis;

      function raf(time) {
        lenis.raf(time);
        rafId = requestAnimationFrame(raf);
      }
      rafId = requestAnimationFrame(raf);
    });

    return () => {
      if (rafId) cancelAnimationFrame(rafId);
      if (lenis) lenis.destroy();
      window.__lenis = null;
    };
  }, []);

  return <>{children}</>;
}
