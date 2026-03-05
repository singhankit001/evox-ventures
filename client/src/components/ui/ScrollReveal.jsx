"use client";

import { motion, useReducedMotion } from "framer-motion";

const ease = [0.22, 1, 0.36, 1];

export default function ScrollReveal({
  children,
  className = "",
  delay = 0,
  y = 36,
  blur = 8,
  once = true,
  amount = 0.2,
}) {
  const reduce = useReducedMotion();

  if (reduce) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y, filter: `blur(${blur}px)` }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once, amount }}
      transition={{
        duration: 0.9,
        delay,
        ease,
      }}
    >
      {children}
    </motion.div>
  );
}

export function ScrollRevealStagger({ children, className = "", stagger = 0.1 }) {
  const reduce = useReducedMotion();

  if (reduce) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.15 }}
      variants={{
        hidden: {},
        show: {
          transition: { staggerChildren: stagger, delayChildren: 0.08 },
        },
      }}
    >
      {children}
    </motion.div>
  );
}

export function WordReveal({ 
  children, 
  className = "", 
  delay = 0, 
  stagger = 0.05,
  once = true 
}) {
  const reduce = useReducedMotion();
  const words = typeof children === "string" ? children.split(" ") : [];

  if (reduce || words.length === 0) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once, amount: 0.2 }}
      variants={{
        hidden: {},
        show: {
          transition: { staggerChildren: stagger, delayChildren: delay }
        }
      }}
    >
      {words.map((word, i) => (
        <span key={i} className="inline-block overflow-hidden py-1 mr-[0.25em] last:mr-0">
          <motion.span
            variants={{
              hidden: { opacity: 0, y: "100%", filter: "blur(8px)" },
              show: { 
                opacity: 1, 
                y: 0, 
                filter: "blur(0px)",
                transition: { duration: 0.8, ease } 
              }
            }}
            className="inline-block"
          >
            {word}
          </motion.span>
        </span>
      ))}
    </motion.div>
  );
}

export const itemReveal = {
  hidden: { opacity: 0, y: 32, filter: "blur(6px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.8, ease },
  },
};
