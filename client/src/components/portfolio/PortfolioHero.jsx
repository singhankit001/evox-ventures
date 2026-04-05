"use client";

import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { useRef, useMemo } from "react";

const easePremium = [0.22, 1, 0.36, 1];

function FloatingParticles({ reduced }) {
  const particles = useMemo(() => {
    if (reduced) return [];
    return Array.from({ length: 30 }, (_, i) => ({
      id: i,
      left: `${(i * 9.3 + 5) % 100}%`,
      top: `${(i * 13.7 + 12) % 100}%`,
      size: 1 + (i % 3) * 0.5,
      duration: 8 + (i % 10),
      delay: (i % 5) * 0.4,
      color: i % 2 === 0 ? "rgba(249,115,22,0.1)" : "rgba(255,255,255,0.05)",
    }));
  }, [reduced]);

  return (
    <div className="pointer-events-none absolute inset-0 z-[1] overflow-hidden">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full"
          style={{
            left: p.left,
            top: p.top,
            width: p.size,
            height: p.size,
            background: p.color,
          }}
          animate={
            reduced ? {} : {
              y: [0, -30, 0],
              opacity: [0.2, 0.5, 0.2],
            }
          }
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}

export default function PortfolioHero() {
  const ref = useRef(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });

  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.05]);

  return (
    <section
      ref={ref}
      className="relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-[#030303]"
    >
      {/* Cinematic Background Elements */}
      <motion.div
        className="pointer-events-none absolute inset-0 z-0"
        style={!reduced ? { scale } : undefined}
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(249,115,22,0.05)_0%,transparent_70%)]" />
        <div className="absolute right-0 top-1/4 h-[50vw] w-[50vw] rounded-full bg-orange-600/[0.01] blur-[150px]" />
      </motion.div>

      <FloatingParticles reduced={reduced} />

      {/* Main Narrative Content */}
      <motion.div
        className="container relative z-10 mx-auto px-6 text-center"
        style={!reduced ? { opacity } : undefined}
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: easePremium }}
        >
          <span className="eyebrow mb-10">Historical Archive</span>
          
          <h1 className="hero-headline mb-10 tracking-[-0.05em]">
            Experiences <br />
            <span className="text-orange-500 italic">We Architecture</span>
          </h1>

          <p className="mx-auto mt-12 max-w-2xl text-xl leading-relaxed text-zinc-500 font-light tracking-tight">
            From adrenaline-fueled sports spectacles to elite tech arenas. 
            A curated record of meticulously crafted human connections.
          </p>

          {/* Precision Stats */}
          <div className="mt-20 flex flex-wrap items-center justify-center gap-16 md:gap-24">
            {[
              { value: "08", label: "Core Verticals" },
              { value: "500k", label: "Lives Engaged" },
              { value: "05", label: "Continents" },
            ].map((stat) => (
              <div key={stat.label} className="text-center group">
                <p className="text-5xl font-black text-white tracking-tighter mb-2 group-hover:text-orange-500 transition-colors">
                  {stat.value}
                </p>
                <p className="text-[10px] font-black uppercase tracking-[0.4em] text-zinc-600">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </motion.div>
      </motion.div>

      {/* Premium Scroll Sequence Indicator */}
      <motion.div
        className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 text-white/20"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
      >
        <span className="text-[9px] font-black uppercase tracking-[0.5em]">Scroll to Narrative</span>
        <div className="relative h-16 w-px bg-white/5 overflow-hidden">
          <motion.div 
            animate={{ y: ["-100%", "100%"] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "linear" }}
            className="absolute inset-0 h-full w-full bg-gradient-to-b from-transparent via-orange-500/40 to-transparent"
          />
        </div>
      </motion.div>
    </section>
  );
}
