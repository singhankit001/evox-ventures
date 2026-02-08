"use client";

import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { useRef } from "react";
import Link from "next/link";
import { MessageSquare } from "lucide-react";
import ScrollReveal from "@/components/ui/ScrollReveal";
import PremiumCTA from "@/components/ui/PremiumCTA";
import CTABackground from "@/components/ui/CTABackground";

export default function PreFooterCTA() {
  const ref = useRef(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "12%"]);

  return (
    <section
      ref={ref}
      className="relative isolate overflow-hidden py-24 sm:py-32"
    >
      <motion.div
        className="pointer-events-none absolute inset-0 -z-10"
        style={!reduced ? { y } : undefined}
      >
        <CTABackground variant="orange" />
        <div className="absolute inset-0 bg-[#050505]/55" />
        <div className="absolute left-1/2 top-1/2 h-[min(90vw,520px)] w-[min(90vw,720px)] -translate-x-1/2 -translate-y-1/2 rounded-full bg-orange-500/8 blur-[56px] opacity-50" />
      </motion.div>

      <div className="container relative z-10 mx-auto max-w-5xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <ScrollReveal>
            <p className="mb-6 text-sm font-bold uppercase tracking-[0.45em] text-orange-400">
              Transform Your Vision
            </p>
            <h2 className="font-[family-name:var(--font-poppins)] text-4xl font-bold tracking-tight text-white sm:text-6xl">
              Ready to Create Something{" "}
              <span className="bg-gradient-to-br from-orange-400 via-orange-500 to-amber-600 bg-clip-text text-transparent">
                Extraordinary?
              </span>
            </h2>
            <p className="mt-8 text-lg leading-relaxed text-zinc-400">
              Partner with Evox Ventures to build unforgettable sports, tech, and social experiences. We don&apos;t just manage events; we curate legacies.
            </p>
          </ScrollReveal>

          <ScrollReveal delay={0.12}>
            <div className="mt-12 flex flex-col items-center justify-center gap-8 sm:flex-row">
              <PremiumCTA 
                href="/budget-estimator" 
                text="Get a Quote" 
              />

              <Link
                href="/contact"
                className="group flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-10 py-5 text-sm font-bold uppercase tracking-widest text-white transition-all duration-300 hover:bg-white/10 hover:border-white/20 hover:shadow-[0_8px_32px_rgba(0,0,0,0.35)]"
                data-cursor-hover
              >
                Contact Us
                <MessageSquare size={18} className="text-orange-400 transition-transform duration-300 group-hover:scale-110" />
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 h-px w-full bg-gradient-to-r from-transparent via-zinc-800 to-transparent" />
    </section>
  );
}
