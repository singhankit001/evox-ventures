"use client";

import { useInView, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import ScrollReveal, { WordReveal } from "@/components/ui/ScrollReveal";
import { Zap, Target, Globe, Trophy } from "lucide-react";

function easeOutCubic(t) {
  return 1 - (1 - t) ** 3;
}

function Counter({ value, suffix = "" }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const start = performance.now();
    const duration = 2500;
    let raf = 0;

    const tick = (now) => {
      const t = Math.min(1, (now - start) / duration);
      const n = Math.round(value * easeOutCubic(t));
      setDisplay(n);
      if (t < 1) raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, value]);

  return (
    <span ref={ref}>
      {display}
      {suffix}
    </span>
  );
}

const stats = [
  { label: "Organized", value: 320, suffix: "+", icon: Trophy },
  { label: "Clients", value: 180, suffix: "+", icon: Zap },
  { label: "Cities", value: 45, suffix: "+", icon: Globe },
  { label: "Experience", value: 12, suffix: "Y", icon: Target },
];

export default function StatsSection() {
  return (
    <section id="stats" className="relative py-32 md:py-48 overflow-hidden bg-[#030303]">
      {/* Absolute Cinematic Flow Line */}
      <div className="absolute inset-0 pointer-events-none opacity-20 flex justify-center items-center">
        <svg width="100%" height="100%" viewBox="0 0 1200 400" preserveAspectRatio="none" className="absolute top-1/2 -translate-y-1/2">
          <motion.path
            d="M-200 200C100 200 300 50 600 50C900 50 1100 350 1400 350"
            fill="none"
            stroke="url(#ambient-grade)"
            strokeWidth="2"
            strokeLinecap="round"
            initial={{ pathLength: 0, opacity: 0 }}
            whileInView={{ pathLength: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 4, ease: "easeInOut" }}
            strokeDasharray="10 10"
          />
          <defs>
            <linearGradient id="ambient-grade" x1="0" y1="0" x2="1200" y2="400">
              <stop offset="0%" stopColor="#F97316" stopOpacity="0.1" />
              <stop offset="50%" stopColor="#F97316" stopOpacity="1" />
              <stop offset="100%" stopColor="#818CF8" stopOpacity="0.1" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      <div className="container relative z-10 mx-auto max-w-7xl px-6 md:px-12 flex flex-col items-center">
        <div className="text-center mb-24">
          <WordReveal className="text-5xl md:text-7xl lg:text-[7rem] font-black tracking-tighter leading-[0.9] text-white">
            Trusted At Scale
          </WordReveal>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 w-full gap-x-8 gap-y-16 lg:gap-x-12">
          {stats.map((s, i) => (
            <motion.div 
              key={s.label}
              className="flex flex-col items-center text-center group"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15, duration: 1, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="text-6xl md:text-8xl lg:text-[7rem] font-black tracking-tighter text-white transition-all duration-700 group-hover:text-orange-500 group-hover:scale-105 group-hover:drop-shadow-[0_0_40px_rgba(255,115,0,0.4)]">
                <Counter value={s.value} suffix={s.suffix} />
              </div>
              <div className="mt-6 flex items-center gap-3">
                 <s.icon className="w-4 h-4 text-orange-500/60" />
                 <span className="text-xs font-black uppercase tracking-[0.3em] text-zinc-500 font-bold whitespace-nowrap">
                   {s.label}
                 </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
