"use client";

import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "framer-motion";
import { ChevronDown } from "lucide-react";
import { useMemo } from "react";
import { useTypewriter } from "@/hooks/useTypewriter";
import { MagneticLink } from "./MagneticLink";
import { Button } from "@/components/ui/Button";
import styles from "./Hero.module.css";

const TYPING_PHRASES = [
  "Creating Unforgettable Experiences",
  "Premium Corporate Events",
  "Elite Sports Experiences",
];

const easePremium = [0.22, 1, 0.36, 1];

const sectionVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.18,
      delayChildren: 0.1,
    },
  },
};

const lineVariants = {
  hidden: { opacity: 0, y: 28 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.75, ease: easePremium },
  },
};

function FloatingParticles({ reduced }) {
  const particles = useMemo(() => {
    if (reduced) return [];
    return Array.from({ length: 36 }, (_, i) => ({
      id: i,
      left: `${(i * 7 + 11) % 100}%`,
      top: `${(i * 13 + 5) % 100}%`,
      size: 1.5 + (i % 5) * 0.6,
      duration: 12 + (i % 10),
      delay: (i % 6) * 0.35,
    }));
  }, [reduced]);

  return (
    <div className="pointer-events-none absolute inset-0 z-[1] overflow-hidden">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full bg-orange-400/25 shadow-[0_0_12px_rgba(249,115,22,0.35)]"
          style={{
            left: p.left,
            top: p.top,
            width: p.size,
            height: p.size,
          }}
          animate={
            reduced
              ? {}
              : {
                  y: [0, -36, 0],
                  x: [0, 16, 0],
                  opacity: [0.2, 0.65, 0.2],
                  scale: [1, 1.35, 1],
                }
          }
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}

function MeshGradient({ mouseX, mouseY, reduced }) {
  const x1 = useTransform(mouseX, (v) => v * 0.4);
  const y1 = useTransform(mouseY, (v) => v * 0.32);
  const x2 = useTransform(mouseX, (v) => v * -0.28);
  const y2 = useTransform(mouseY, (v) => v * -0.38);

  return (
    <div className="pointer-events-none absolute inset-0 z-0">
      {/* Base removed to allow global background gradient */}
      {/* Purple + orange mesh */}
      <motion.div
        className="absolute -left-[30%] top-[-20%] h-[85vh] w-[85vh] rounded-full bg-gradient-to-br from-purple-600/15 via-fuchsia-900/10 to-transparent blur-[120px]"
        style={!reduced ? { x: x1, y: y1 } : undefined}
      />
      <motion.div
        className="absolute -right-[25%] bottom-[-15%] h-[75vh] w-[75vh] rounded-full bg-gradient-to-tl from-orange-600/15 via-amber-900/10 to-transparent blur-[120px]"
        style={!reduced ? { x: x2, y: y2 } : undefined}
      />
      <motion.div
        className="absolute left-1/2 top-1/2 h-[min(120vw,900px)] w-[min(120vw,900px)] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-r from-[#FF6A00]/10 via-purple-600/5 to-orange-400/5 blur-[100px]"
        animate={
          reduced
            ? {}
            : {
                scale: [1, 1.06, 1],
                opacity: [0.5, 0.75, 0.5],
              }
        }
        transition={{ duration: 10, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
      />
      {/* Animated gradient wave layer */}
      <div className="hero-gradient-wave absolute inset-0 opacity-40 mix-blend-screen" />
    </div>
  );
}

export default function Hero() {
  const reduceMotion = useReducedMotion();
  const typed = useTypewriter(TYPING_PHRASES, {
    typeSpeed: 38,
    deleteSpeed: 26,
    holdMs: 2400,
    gapMs: 420,
  });

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const smoothX = useSpring(mouseX, { stiffness: 40, damping: 28, mass: 0.85 });
  const smoothY = useSpring(mouseY, { stiffness: 40, damping: 28, mass: 0.85 });

  const parallaxDecorX = useTransform(smoothX, (v) => v * 0.12);
  const parallaxDecorY = useTransform(smoothY, (v) => v * 0.1);

  const onMouseMove = (e) => {
    if (reduceMotion) return;
    const w = window.innerWidth || 1;
    const h = window.innerHeight || 1;
    mouseX.set((e.clientX / w - 0.5) * 120);
    mouseY.set((e.clientY / h - 0.5) * 120);
  };

  const onMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <section
      className={`${styles.hero} relative isolate flex min-h-screen hero-padding w-full items-center justify-center overflow-hidden`}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
    >
      <MeshGradient mouseX={smoothX} mouseY={smoothY} reduced={reduceMotion} />
      <FloatingParticles reduced={reduceMotion} />

      {!reduceMotion && (
        <motion.div
          className="pointer-events-none absolute inset-0 z-[2]"
          style={{ x: parallaxDecorX, y: parallaxDecorY }}
        >
          <motion.div
            className="absolute right-[10%] top-[18%] h-40 w-40 rounded-full border border-orange-400/15 bg-white/[0.02] backdrop-blur-md"
            animate={{ y: [0, -20, 0], rotate: [0, 8, 0] }}
            transition={{ duration: 14, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute bottom-[22%] left-[8%] h-28 w-48 rotate-[-8deg] rounded-3xl border border-purple-500/20 bg-purple-500/5 backdrop-blur-sm"
            animate={{ y: [0, 14, 0], x: [0, 10, 0] }}
            transition={{ duration: 16, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
          />
        </motion.div>
      )}

      <div className={`container relative z-10 ${styles.content}`}>
        <motion.div
          animate={{ opacity: [0.3, 0.5, 0.3], scale: [1, 1.05, 1] }}
          transition={{ duration: 8, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
          aria-hidden
          className="pointer-events-none absolute left-1/2 top-1/2 z-0 h-[min(110vw,800px)] w-[min(110vw,800px)] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(255,106,0,0.15)_0%,rgba(249,115,22,0.05)_40%,transparent_70%)] blur-3xl mix-blend-screen"
        />

        <motion.div
          variants={sectionVariants}
          initial="hidden"
          animate="show"
          className="relative z-10 mx-auto max-w-5xl text-center text-white"
        >
          <motion.p
            variants={lineVariants}
            className="mb-4 text-xs font-semibold uppercase tracking-[0.4em] text-orange-400/95"
          >
            Evox Ventures
          </motion.p>

          <motion.div variants={lineVariants} className="relative min-h-[8.5rem] md:min-h-[10rem]">
            <h1
              className={`${styles.title} bg-gradient-to-b from-white via-white to-zinc-400 bg-clip-text font-[family-name:var(--font-poppins)] tracking-tight text-transparent`}
            >
              <span className="inline-block min-h-[2.8em] text-balance md:min-h-[2.4em]">
                {typed}
                <motion.span
                  aria-hidden
                  className="ml-1 inline-block h-[1em] w-[3px] rounded-full bg-orange-400 align-middle"
                  animate={{ opacity: [1, 0.2, 1] }}
                  transition={{ duration: 0.9, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
                />
              </span>
            </h1>
          </motion.div>

          <motion.p variants={lineVariants} className={styles.subtitle}>
            Premium event management for corporate, sports, and social experiences—designed to feel
            cinematic, seamless, and unforgettable.
          </motion.p>

          <motion.div
            variants={lineVariants}
            className={`${styles.ctaGroup} mt-10 flex flex-wrap items-center justify-center gap-6`}
          >
            <MagneticLink href="/budget-estimator">
              <Button variant="primary" className="py-5 px-10 text-base shadow-[0_8px_30px_rgba(255,106,0,0.3)] hover:shadow-[0_12px_40px_rgba(255,106,0,0.45)]">
                Get an Estimate
              </Button>
            </MagneticLink>

            <MagneticLink href="/portfolio">
              <Button variant="secondary" className="py-5 px-10 text-base border-white/[0.08] hover:border-white/[0.15]">
                View Portfolio
              </Button>
            </MagneticLink>
          </motion.div>
        </motion.div>
      </div>

      <motion.a
        href="#services"
        className="absolute bottom-8 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-2 text-white/45"
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.1, duration: 0.6 }}
        data-cursor-hover
      >
        <span className="text-[11px] font-semibold uppercase tracking-[0.4em] text-white/50">Explore</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2.2, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
        >
          <ChevronDown className="h-5 w-5 text-orange-400/80" strokeWidth={2} />
        </motion.div>
        <span className="h-10 w-[1px] rounded-full bg-gradient-to-b from-orange-400/60 to-transparent" />
      </motion.a>
    </section>
  );
}
