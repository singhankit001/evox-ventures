"use client";

import { motion } from "framer-motion";
import ScrollReveal from "@/components/ui/ScrollReveal";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";

export default function FinalCta() {
  return (
    <section id="cta" className="relative section-padding">
      <div className="container relative z-10 mx-auto max-w-4xl px-4 text-center md:px-6">
        <ScrollReveal>
          <Card hoverable={false} className="relative overflow-hidden rounded-[2rem] border-orange-500/20 bg-gradient-to-br from-orange-500/10 via-zinc-900/60 to-purple-950/30 p-12 md:p-16">
            <motion.div
              aria-hidden
              className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-orange-500/20 blur-[80px]"
              animate={{ scale: [1, 1.15, 1], opacity: [0.6, 0.9, 0.6] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div
              aria-hidden
              className="pointer-events-none absolute -bottom-16 -left-16 h-48 w-48 rounded-full bg-purple-600/15 blur-[70px]"
              animate={{ scale: [1, 1.1, 1], opacity: [0.5, 0.8, 0.5] }}
              transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            />
            <h2 className="relative mx-auto max-w-lg font-[family-name:var(--font-poppins)] text-3xl font-bold tracking-tight text-white md:text-4xl lg:text-5xl">
              Ready to plan your next event?
            </h2>
            <p className="relative mx-auto mt-6 max-w-md text-lg leading-[1.6] text-zinc-400 mb-8">
              Join brands that trust Evox Ventures for premium execution and transparent planning.
            </p>
            <Button href="/budget-estimator" variant="primary" className="relative py-5 px-12 text-base shadow-[0_8px_30px_rgba(255,106,0,0.3)] hover:shadow-[0_12px_40px_rgba(255,106,0,0.5)]">
              Start Planning Now
            </Button>
          </Card>
        </ScrollReveal>
      </div>
    </section>
  );
}
