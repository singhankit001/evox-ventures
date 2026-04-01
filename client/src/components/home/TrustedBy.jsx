"use client";

import { motion } from "framer-motion";
import ScrollReveal, { ScrollRevealStagger, itemReveal } from "@/components/ui/ScrollReveal";

const brands = [
  "TechCorp",
  "Apex Sports",
  "Horizon Finance",
  "Meridian Events",
  "Studio North",
  "Vertex Labs",
];

export default function TrustedBy() {
  return (
    <section id="trusted" className="relative overflow-hidden section-padding">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,transparent,rgba(249,115,22,0.04),transparent)]"
      />
      <div className="relative z-10 w-full">
        <ScrollReveal className="text-center container mx-auto">
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-zinc-500 mb-12">
            Trusted by leading teams
          </p>
        </ScrollReveal>

        <ScrollRevealStagger className="container mx-auto grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 lg:gap-12 items-center justify-items-center px-6">
          {brands.map((name, i) => (
            <motion.div
              variants={itemReveal}
              key={`${name}-${i}`}
              className="group relative flex items-center justify-center opacity-40 transition-opacity duration-300 hover:opacity-100 cursor-default"
            >
              <span className="font-[family-name:var(--font-poppins)] text-xl md:text-2xl font-semibold tracking-tight text-white transition-colors duration-300">
                {name}
              </span>
              <span className="absolute -bottom-2 left-1/2 h-[2px] w-0 -translate-x-1/2 bg-gradient-to-r from-orange-500 to-amber-400 transition-all duration-300 group-hover:w-[80%]" />
            </motion.div>
          ))}
        </ScrollRevealStagger>
      </div>
    </section>
  );
}
