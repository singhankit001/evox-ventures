"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import ScrollReveal from "@/components/ui/ScrollReveal";

export default function FinalCta() {
  return (
    <section id="cta" className="relative section-padding">
      <div className="container relative z-10 mx-auto max-w-4xl px-4 text-center md:px-6">
        <ScrollReveal>
          <motion.div
            className="relative overflow-hidden rounded-[2rem] border border-orange-500/25 bg-gradient-to-br from-orange-500/15 via-zinc-900/60 to-purple-950/40 p-12 shadow-[0_0_80px_rgba(249,115,22,0.12)] backdrop-blur-xl md:p-16"
            whileHover={{ scale: 1.01 }}
            transition={{ type: "spring", stiffness: 200, damping: 25 }}
          >
            <div
              aria-hidden
              className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-orange-500/20 blur-[80px]"
            />
            <div
              aria-hidden
              className="pointer-events-none absolute -bottom-16 -left-16 h-48 w-48 rounded-full bg-purple-600/20 blur-[70px]"
            />
            <h2 className="relative mx-auto max-w-lg font-[family-name:var(--font-poppins)] text-3xl font-bold tracking-tight text-white md:text-4xl lg:text-5xl">
              Ready to plan your next event?
            </h2>
            <p className="relative mx-auto mt-4 max-w-md text-lg leading-[1.6] text-zinc-400 mb-6">
              Join brands that trust Evox Ventures for premium execution and transparent planning.
            </p>
            <Link
              href="/budget-estimator"
              className="relative inline-flex rounded-xl bg-[#FF6A00] px-10 py-4 text-sm font-semibold uppercase tracking-wide text-white shadow-[0_4px_20px_rgba(255,106,0,0.3)] transition hover:shadow-[0_8px_30px_rgba(255,106,0,0.5)]"
              data-cursor-hover
            >
              Start planning now
            </Link>
          </motion.div>
        </ScrollReveal>
      </div>
    </section>
  );
}
