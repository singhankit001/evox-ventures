"use client";

import { useInView } from "framer-motion";
import { useMemo, useRef } from "react";

/**
 * One-time staggered reveal using CSS (opacity + translateY).
 * Cheaper than per-letter Framer components.
 */
export default function LetterReveal({
  text,
  className = "",
  as: Tag = "span",
  delayStep = 0.018,
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.45 });

  const letters = useMemo(() => Array.from(text), [text]);

  return (
    <Tag
      ref={ref}
      className={`letter-reveal ${inView ? "letter-reveal--visible" : ""} ${className}`}
    >
      {letters.map((ch, i) => (
        <span
          key={`${i}-${ch}`}
          className="letter-reveal__char"
          style={{ animationDelay: `${i * delayStep}s` }}
        >
          {ch === " " ? "\u00A0" : ch}
        </span>
      ))}
    </Tag>
  );
}
