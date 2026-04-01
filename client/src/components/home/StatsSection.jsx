"use client";

import { animate, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import ScrollReveal from "@/components/ui/ScrollReveal";

function Counter({ value, suffix = "" }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const controls = animate(0, value, {
      duration: 2.2,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => setDisplay(Math.round(v)),
    });
    return () => controls.stop();
  }, [inView, value]);

  return (
    <span ref={ref}>
      {display}
      {suffix}
    </span>
  );
}

const stats = [
  { label: "Events Organized", value: 320, suffix: "+" },
  { label: "Clients Served", value: 180, suffix: "+" },
  { label: "Cities Covered", value: 45, suffix: "+" },
  { label: "Years Experience", value: 12, suffix: "" },
];

export default function StatsSection() {
  return (
    <section id="stats" className="relative section-padding">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_50%,rgba(88,28,135,0.15),transparent_60%)]"
      />
      <div className="container relative z-10 mx-auto max-w-6xl px-4 md:px-6">
        <ScrollReveal className="mb-12 text-center">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.35em] text-orange-400/90">
            By the numbers
          </p>
          <h2 className="font-[family-name:var(--font-poppins)] text-3xl font-bold text-white md:text-4xl">
            Trusted at scale
          </h2>
        </ScrollReveal>
        <div className="grid gap-8 rounded-3xl border border-white/[0.07] bg-zinc-950/40 p-10 backdrop-blur-xl md:grid-cols-4 md:gap-4 md:p-14">
          {stats.map((s) => (
            <div
              key={s.label}
              className="text-center md:border-x md:border-white/[0.06] first:md:border-l-0 last:md:border-r-0"
            >
              <div className="font-[family-name:var(--font-poppins)] text-5xl font-bold tabular-nums text-white md:text-6xl">
                <span className="bg-gradient-to-b from-white to-zinc-400 bg-clip-text text-transparent">
                  <Counter value={s.value} suffix={s.suffix} />
                </span>
              </div>
              <p className="mt-3 text-sm font-medium uppercase tracking-wider text-zinc-500">
                {s.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
