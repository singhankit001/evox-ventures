"use client";

import { motion } from "framer-motion";
import ScrollReveal from "@/components/ui/ScrollReveal";

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
        <ScrollReveal className="mb-10 text-center container mx-auto">
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-zinc-500">
            Trusted by leading teams
          </p>
        </ScrollReveal>
        <div className="relative flex overflow-hidden w-full whitespace-nowrap [mask-image:linear-gradient(to_right,transparent,black_15%,black_85%,transparent)]">
          <motion.div
            className="flex items-center gap-14 md:gap-24 w-max"
            animate={{ x: ["0%", "-50%"] }}
            transition={{ duration: 30, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
          >
            {[...brands, ...brands, ...brands, ...brands].map((name, i) => (
              <div
                key={`${name}-${i}`}
                className="group relative flex items-center justify-center opacity-60 transition-opacity hover:opacity-100"
              >
                <span className="font-[family-name:var(--font-poppins)] text-xl md:text-2xl font-semibold tracking-tight text-white transition-colors duration-300">
                  {name}
                </span>
                <span className="absolute -bottom-1 left-0 h-px w-0 bg-gradient-to-r from-orange-500 to-amber-400 transition-all duration-500 group-hover:w-full" />
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
