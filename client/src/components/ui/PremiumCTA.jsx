"use client";

import {
  motion,
  useMotionValue,
  useSpring,
  useReducedMotion,
} from "framer-motion";
import { useCallback, useRef, useSyncExternalStore } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import styles from "./PremiumCTA.module.css";

const springLight = { stiffness: 120, damping: 18, mass: 0.35 };

function subscribeCoarse(cb) {
  const mq = window.matchMedia("(pointer: coarse)");
  mq.addEventListener("change", cb);
  return () => mq.removeEventListener("change", cb);
}

function getCoarseSnapshot() {
  return window.matchMedia("(pointer: coarse)").matches;
}

export default function PremiumCTA({
  href = "/budget-estimator",
  text = "Get a Quote",
  className = "",
}) {
  const ref = useRef(null);
  const reduced = useReducedMotion();
  const isTouch = useSyncExternalStore(subscribeCoarse, getCoarseSnapshot, () => false);

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, springLight);
  const springY = useSpring(y, springLight);

  const onMouseMove = useCallback(
    (e) => {
      if (reduced || isTouch || !ref.current) return;
      const { left, top, width, height } = ref.current.getBoundingClientRect();
      const cx = left + width / 2;
      const cy = top + height / 2;
      x.set((e.clientX - cx) * 0.12);
      y.set((e.clientY - cy) * 0.12);
    },
    [reduced, isTouch, x, y]
  );

  const onMouseLeave = useCallback(() => {
    x.set(0);
    y.set(0);
  }, [x, y]);

  const handleClick = useCallback((e) => {
    const el = e.currentTarget;
    const { left, top } = el.getBoundingClientRect();
    const ripple = document.createElement("span");
    ripple.className = styles.ripple;
    const size = 100;
    ripple.style.width = ripple.style.height = `${size}px`;
    ripple.style.left = `${e.clientX - left - size / 2}px`;
    ripple.style.top = `${e.clientY - top - size / 2}px`;
    el.appendChild(ripple);
    window.setTimeout(() => ripple.remove(), 600);
  }, []);

  return (
    <motion.div
      ref={ref}
      style={
        reduced || isTouch
          ? undefined
          : { x: springX, y: springY, willChange: "transform" }
      }
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      className={`${className}`}
    >
      <div
        className={`${styles.wrap} ${isTouch ? styles.touch : ""}`}
        data-cursor-hover
      >
        <div className={styles.glow} aria-hidden />
        <Link
          href={href}
          onClick={handleClick}
          className={`${styles.inner} group`}
        >
          <span className="relative z-10 flex items-center gap-3">
            {text}
            <span className={styles.icon}>
              <ArrowRight size={20} strokeWidth={2.5} aria-hidden />
            </span>
          </span>
          <span className={styles.shine} aria-hidden />
        </Link>
      </div>
    </motion.div>
  );
}
