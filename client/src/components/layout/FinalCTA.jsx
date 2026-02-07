"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { ArrowRight } from "lucide-react";

// Stagger each character of a word with blur + Y reveal
function AnimatedWord({ word, delay = 0, className = "" }) {
  return (
    <span className={`inline-block ${className}`}>
      {word.split("").map((char, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, y: 60, filter: "blur(20px)", rotateX: -30 }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)", rotateX: 0 }}
          viewport={{ once: true }}
          transition={{
            duration: 1.2,
            delay: delay + i * 0.04,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="inline-block"
          style={{ transformOrigin: "bottom" }}
        >
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}
    </span>
  );
}

export default function FinalCTA() {
  const containerRef = useRef(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.15, 0.85, 1], [0, 1, 1, 0]);
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);

  // Subtle mouse glow tracker
  useEffect(() => {
    const handleMove = (e) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex flex-col items-center justify-center text-center overflow-hidden bg-[#030303] py-32 px-6"
    >
      {/* ═══ VISION PRO ATMOSPHERE ═══ */}

      {/* Mouse-following glow */}
      <div
        className="pointer-events-none fixed inset-0 z-0 transition-all duration-700"
        style={{
          background: `radial-gradient(700px circle at ${mousePos.x}px ${mousePos.y}px, rgba(249,115,22,0.04), transparent 60%)`,
        }}
      />

      {/* Parallax background orbs */}
      <motion.div className="absolute inset-0 pointer-events-none" style={{ y: bgY }}>
        <motion.div
          animate={{ x: [0, 60, -30, 0], y: [0, -50, 30, 0], scale: [1, 1.2, 0.9, 1] }}
          transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[-15%] left-[-10%] w-[700px] h-[700px] bg-orange-500/8 blur-[140px] rounded-full"
        />
        <motion.div
          animate={{ x: [0, -50, 20, 0], y: [0, 60, -40, 0], scale: [1.1, 0.9, 1.05, 1.1] }}
          transition={{ duration: 28, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-[-15%] right-[-10%] w-[650px] h-[650px] bg-violet-600/6 blur-[120px] rounded-full"
        />
        <motion.div
          animate={{ scale: [1, 1.4, 1], opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[35%] left-[35%] w-[400px] h-[400px] bg-amber-500/4 blur-[100px] rounded-full"
        />
      </motion.div>

      {/* Grid texture */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.08) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
        }}
      />

      {/* Ambient floating particles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(16)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{
              width: i % 3 === 0 ? "2px" : "1px",
              height: i % 3 === 0 ? "2px" : "1px",
              background: i % 4 === 0 ? "rgba(251,146,60,0.6)" : "rgba(255,255,255,0.3)",
              top: `${10 + ((i * 37) % 80)}%`,
              left: `${5 + ((i * 53) % 90)}%`,
            }}
            animate={{
              y: [0, -(80 + i * 10), 0],
              opacity: [0.1, 0.8, 0.1],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: 8 + i * 0.8,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.4,
            }}
          />
        ))}
      </div>

      {/* Horizontal light streak */}
      <motion.div
        animate={{ opacity: [0.05, 0.15, 0.05], scaleX: [0.8, 1, 0.8] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/2 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-orange-400/20 to-transparent blur-sm"
      />

      {/* ═══ MAIN CONTENT ═══ */}
      <motion.div
        style={{ opacity }}
        className="container relative z-10 max-w-6xl mx-auto flex flex-col items-center"
      >
        {/* ── Eyebrow ── */}
        <motion.div
          initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="mb-14 flex items-center gap-5"
        >
          <motion.span
            animate={{ scaleX: [0, 1] }}
            transition={{ duration: 1.2, delay: 0.3 }}
            className="block w-16 h-[1px] bg-gradient-to-r from-transparent to-orange-500/60 origin-left"
          />
          <span className="text-[11px] md:text-xs font-black uppercase tracking-[0.55em] text-orange-400/80 drop-shadow-[0_0_12px_rgba(251,146,60,0.4)]">
            Your Story Starts Here
          </span>
          <motion.span
            animate={{ scaleX: [0, 1] }}
            transition={{ duration: 1.2, delay: 0.3 }}
            className="block w-16 h-[1px] bg-gradient-to-l from-transparent to-orange-500/60 origin-right"
          />
        </motion.div>

        {/* ── MAIN HEADLINE — 3-line char-by-char reveal ── */}
        <div className="mb-16 cursor-default" style={{ perspective: "1200px" }}>
          {/* Line 1 — plain white */}
          <div className="overflow-hidden pb-2">
            <h2 className="font-[family-name:var(--font-poppins)] text-[clamp(3rem,9vw,8rem)] font-black tracking-[-0.04em] leading-[0.95] text-white">
              <AnimatedWord word="Ready to Create" delay={0} />
            </h2>
          </div>

          {/* Line 2 — italic + shimmer */}
          <div className="overflow-hidden pb-2">
            <motion.h2
              initial={{ opacity: 0, y: 60, filter: "blur(20px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="font-[family-name:var(--font-poppins)] text-[clamp(3rem,9vw,8rem)] font-black tracking-[-0.04em] leading-[0.95] italic inline-block"
              style={{
                background: "linear-gradient(90deg, #ffffff 0%, #fed7aa 30%, #f97316 60%, #fbbf24 80%, #ffffff 100%)",
                backgroundSize: "300% 100%",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                animation: "ctaGradientShift 5s linear infinite",
                filter: "drop-shadow(0 0 40px rgba(249,115,22,0.35))",
              }}
            >
              Something
            </motion.h2>
          </div>

          {/* Line 3 — massive, outlined + filled hybrid */}
          <div className="overflow-hidden pb-2">
            <motion.h2
              initial={{ opacity: 0, y: 60, filter: "blur(20px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="font-[family-name:var(--font-poppins)] text-[clamp(2.5rem,8.5vw,7.5rem)] font-black tracking-[-0.04em] leading-[1] inline-block"
              style={{
                background: "linear-gradient(135deg, #fff 0%, #f4f4f5 20%, #f97316 50%, #fbbf24 75%, #fff 100%)",
                backgroundSize: "200% 200%",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                animation: "ctaGradientShift 4s linear infinite reverse",
                filter: "drop-shadow(0 0 60px rgba(249,115,22,0.3))",
              }}
            >
              Extraordinary?
            </motion.h2>
          </div>
        </div>

        {/* ── SUBTEXT ── */}
        <motion.p
          initial={{ opacity: 0, y: 30, filter: "blur(8px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true }}
          transition={{ delay: 1.4, duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          className="text-zinc-400 text-lg md:text-xl font-light max-w-2xl leading-relaxed mb-16 tracking-wide"
        >
          Every unforgettable experience starts with a vision. At Evox Ventures, we transform bold ideas into immersive realities — from elite sporting events to luxury experiences that leave a lasting legacy.
        </motion.p>

        {/* ── CTA BUTTONS ── */}
        <motion.div
          initial={{ opacity: 0, y: 40, filter: "blur(8px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true }}
          transition={{ delay: 1.7, duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col sm:flex-row items-center justify-center gap-6"
        >
          <Link href="/contact" className="w-full sm:w-auto">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}>
              <Button
                variant="luxury"
                className="w-full sm:w-auto group px-14 py-5 text-base rounded-full shadow-[0_0_50px_rgba(255,140,0,0.45)] hover:shadow-[0_0_80px_rgba(255,140,0,0.65)] transition-all duration-500"
              >
                Start Your Project
                <ArrowRight className="ml-2 w-4 h-4 transition-transform duration-300 group-hover:translate-x-2" />
              </Button>
            </motion.div>
          </Link>

          <Link href="/budget-estimator" className="w-full sm:w-auto">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}>
              <Button
                variant="secondary"
                className="w-full sm:w-auto px-14 py-5 text-base border-white/15 hover:border-orange-400/50 rounded-full transition-all duration-500"
              >
                Get a Quote
              </Button>
            </motion.div>
          </Link>
        </motion.div>

        {/* ── Footer signature ── */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 0.18 }}
          viewport={{ once: true }}
          transition={{ delay: 2.5, duration: 2 }}
          className="absolute bottom-12 left-0 w-full text-center"
        >
          <span className="text-[9px] font-black uppercase tracking-[1.2em] text-white select-none">
            Evox Ventures&nbsp;&nbsp;//&nbsp;&nbsp;Engineering the Unforgettable
          </span>
        </motion.div>
      </motion.div>

      <style jsx>{`
        @keyframes ctaGradientShift {
          0%   { background-position: 0% 50%; }
          50%  { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
      `}</style>
    </section>
  );
}
