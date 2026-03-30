"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Sparkles, Mail } from "lucide-react";

export default function PortfolioCTA() {
  return (
    <section className="relative overflow-hidden section-padding">
      {/* Background */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 50%, rgba(249,115,22,0.1), rgba(120,40,200,0.06) 50%, transparent 75%)",
        }}
      />
      {/* Top & bottom lines */}
      <div className="pointer-events-none absolute left-0 top-0 h-[1px] w-full bg-gradient-to-r from-transparent via-orange-500/40 to-transparent" />
      <div className="pointer-events-none absolute bottom-0 left-0 h-[1px] w-full bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      {/* Glowing orb */}
      <motion.div
        className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full blur-[140px]"
        style={{
          width: 600,
          height: 600,
          background: "radial-gradient(circle, rgba(255,106,0,0.14) 0%, transparent 70%)",
        }}
        animate={{ scale: [1, 1.1, 1], opacity: [0.5, 0.8, 0.5] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="container relative z-10 mx-auto max-w-3xl px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-orange-500/30 bg-orange-500/10 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-orange-400">
            <Sparkles className="h-3.5 w-3.5" />
            Your Story Next
          </span>

          <h2 className="mt-6 font-[family-name:var(--font-poppins)] text-4xl font-bold tracking-tight text-white md:text-5xl lg:text-6xl">
            Ready to create{" "}
            <span className="bg-gradient-to-br from-orange-400 to-orange-600 bg-clip-text text-transparent">
              something epic?
            </span>
          </h2>

          <p className="mx-auto mt-6 max-w-xl text-zinc-500 text-lg">
            Every event you see on this page started with one conversation. Let&apos;s talk about
            yours — and make it unforgettable.
          </p>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <Link href="/contact">
              <Button
                variant="primary"
                className="gap-2 py-5 px-10 text-base shadow-[0_8px_30px_rgba(255,106,0,0.3)] hover:shadow-[0_12px_40px_rgba(255,106,0,0.45)]"
              >
                <Mail className="h-4 w-4" />
                Start Planning
              </Button>
            </Link>
            <Link href="/budget-estimator">
              <Button variant="secondary" className="py-5 px-10 text-base">
                Get an Estimate
              </Button>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
