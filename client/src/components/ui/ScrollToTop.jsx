"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/**
 * ScrollToTop Component
 * 
 * Ensures that whenever the pathname changes (user navigates to a new page),
 * the window scrolls to the very top.
 * 
 * This integrated version specifically handles:
 * 1. Standard window scrolling for mobile/touch.
 * 2. Lenis smooth scrolling if initialized globally.
 */
export default function ScrollToTop() {
  const pathname = usePathname();

  useEffect(() => {
    // 1. Standard window scroll reset (crucial for all browsers/devices)
    window.scrollTo(0, 0);
    
    // 2. Lenis instance specific reset (for smooth-scroll enabled desktop)
    // We check for the global __lenis instance created in SmoothScrollProvider
    if (window.__lenis) {
      window.__lenis.scrollTo(0, { immediate: true });
    }
    
    // 3. Document level reset as a fallback for high-inertia situations
    if (typeof document !== 'undefined') {
      document.documentElement.scrollTo(0, 0);
      document.body.scrollTo(0, 0);
    }
  }, [pathname]);

  return null;
}
