"use client";

import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";

const PARALLAX_PANELS = [
  {
    image: "/images/sports-v3.jpg",
    title: "Sports Events",
    subtitle: "Cricket · Football · Badminton",
    description:
      "Three sports. Hundreds of competitors. Countless memories forged through sweat, skill, and the shared pursuit of excellence.",
    accent: "#f97316",
    align: "left",
  },
  {
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1800&q=85",
    title: "Escape & Travel Experiences",
    subtitle: "Travel · Retreat · Rejuvenate",
    description:
      "Sometimes the best team-building happens far from the office. Our beach retreats turn colleagues into lifelong companions.",
    accent: "#14b8a6",
    align: "right",
  },
  {
    image: "/images/corporate-v3.jpg",
    title: "Innovation Without Limits",
    subtitle: "Tech · Build · Deploy",
    description:
      "When brilliant minds collide with time pressure, magic happens. Our hackathon proved that the next big idea is just 48 hours away.",
    accent: "#3b82f6",
    align: "left",
  },
];

function ParallaxPanel({ panel, index }) {
  const ref = useRef(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const imageY = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);
  const contentY = useTransform(scrollYProgress, [0, 1], ["30px", "-30px"]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  const isLeft = panel.align === "left";

  return (
    <div
      ref={ref}
      className="relative flex min-h-[85vh] w-full items-center overflow-hidden"
    >
      {/* Background parallax image */}
      <motion.div
        className="absolute inset-0 z-0"
        style={!reduced ? { y: imageY } : undefined}
      >
        <Image
          src={panel.image}
          alt={panel.title}
          fill
          sizes="100vw"
          className="object-cover"
          priority={index === 0}
        />
        <div
          className="absolute inset-0"
          style={{
            background: `linear-gradient(${isLeft ? "to right" : "to left"}, rgba(5,5,5,1) 0%, rgba(5,5,5,0.7) 25%, rgba(5,5,5,0.2) 60%, transparent 100%)`,
          }}
        />
      </motion.div>

      {/* Accent glow overlay */}
      <div
        className="pointer-events-none absolute inset-0 z-[1]"
        style={{
          background: `radial-gradient(ellipse 50% 60% at ${isLeft ? "20%" : "80%"} 50%, ${panel.accent}12, transparent 65%)`,
        }}
      />

      {/* Glowing separator line */}
      {index > 0 && (
        <div
          className="pointer-events-none absolute left-0 top-0 z-[2] h-[1px] w-full"
          style={{
            background: `linear-gradient(to right, transparent, ${panel.accent}40, transparent)`,
          }}
        />
      )}

      {/* Content */}
      <div className="container relative z-10 mx-auto max-w-6xl px-6 md:px-10">
        <motion.div
          className={`max-w-xl ${isLeft ? "" : "ml-auto text-right"}`}
          style={!reduced ? { y: contentY, opacity } : undefined}
        >
          <motion.p
            initial={{ opacity: 0, x: isLeft ? -20 : 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="mb-2 text-xs font-bold uppercase tracking-[0.45em]"
            style={{ color: panel.accent }}
          >
            {panel.subtitle}
          </motion.p>

          <motion.h2
            initial={{ opacity: 0, x: isLeft ? -30 : 30 }}
            whileInView={{ 
              opacity: 1, 
              x: 0,
              textShadow: "0 0 20px rgba(255,255,255,0.3)",
              filter: "brightness(1.2)"
            }}
            viewport={{ once: false, amount: 0.4 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="font-[family-name:var(--font-poppins)] text-4xl font-bold tracking-tight text-white transition-all duration-700 sm:text-5xl lg:text-7xl"
          >
            {panel.title}
          </motion.h2>

          {/* Animated Accent line (Underline) */}
          <div className={`mt-6 mb-8 flex w-full ${!isLeft ? "justify-end" : "justify-start"}`}>
            <motion.div
              initial={{ width: 0, opacity: 0 }}
              whileInView={{ width: "100%", opacity: 1 }}
              viewport={{ once: false, amount: 0.5 }}
              transition={{ duration: 1.2, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="h-[4px] rounded-full shadow-[0_0_15px_rgba(249,115,22,0.4)]"
              style={{
                background: `linear-gradient(to right, ${panel.accent}, ${panel.accent}20)`,
                maxWidth: "100%",
                boxShadow: `0 0 25px ${panel.accent}50`,
              }}
            />
          </div>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.5 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-lg text-base leading-relaxed text-zinc-400 sm:text-xl"
          >
            {panel.description}
          </motion.p>
        </motion.div>
      </div>
    </div>
  );
}

export default function ParallaxExperience() {
  return (
    <section id="parallax-experience" className="relative w-full overflow-hidden">
      <div className="pointer-events-none absolute left-0 top-0 z-10 h-20 w-full bg-gradient-to-b from-[#050505] to-transparent" />
      {PARALLAX_PANELS.map((panel, i) => (
        <ParallaxPanel key={panel.title} panel={panel} index={i} />
      ))}
      <div className="pointer-events-none absolute bottom-0 left-0 z-10 h-20 w-full bg-gradient-to-t from-[#050505] to-transparent" />
    </section>
  );
}
