"use client";

import { motion, useMotionValue, useReducedMotion, useSpring } from "framer-motion";
import Link from "next/link";
import { useCallback, useRef } from "react";

const spring = { stiffness: 180, damping: 20, mass: 0.4 };

export function MagneticLink({ href, className, children, ...props }) {
  const ref = useRef(null);
  const reduceMotion = useReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, spring);
  const sy = useSpring(y, spring);

  const onMove = useCallback(
    (e) => {
      if (reduceMotion) return;
      const el = ref.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const cx = r.left + r.width / 2;
      const cy = r.top + r.height / 2;
      x.set((e.clientX - cx) * 0.2);
      y.set((e.clientY - cy) * 0.2);
    },
    [reduceMotion, x, y]
  );

  const onLeave = useCallback(() => {
    x.set(0);
    y.set(0);
  }, [x, y]);

  if (reduceMotion) {
    return (
      <span className="relative inline-block">
        <Link href={href} className={className} data-cursor-hover {...props}>
          {children}
        </Link>
      </span>
    );
  }

  return (
    <motion.span
      ref={ref}
      style={{ x: sx, y: sy, display: "inline-block" }}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className="relative"
    >
      <Link href={href} className={className} data-cursor-hover {...props}>
        {children}
      </Link>
    </motion.span>
  );
}
