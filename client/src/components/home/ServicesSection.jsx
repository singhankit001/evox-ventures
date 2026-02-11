"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowUpRight, Layers, Sparkles, Wallet } from "lucide-react";
import ScrollReveal, { ScrollRevealStagger, itemReveal, WordReveal } from "@/components/ui/ScrollReveal";
import { Card } from "@/components/ui/Card";

const services = [
  {
    title: "Corporate Events",
    desc: "From product launches to executive summits, we craft professional, high-impact corporate gatherings.",
    icon: Sparkles,
  },
  {
    title: "Sports Management",
    desc: "Elite sports events and tournaments managed with precision, strategy, and cinematic production.",
    icon: Layers,
  },
  {
    title: "Social Gatherings",
    desc: "Luxury weddings, private parties, and intimate soirées designed to be truly unforgettable.",
    icon: Wallet,
  },
  {
    title: "Travel Tours",
    desc: "Curated premium travel experiences blending adventure, comfort, and seamless coordination.",
    icon: Sparkles,
  },
];

export default function ServicesSection() {
  return (
    <section
      id="services"
      className="relative overflow-hidden section-padding section-blend-top"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_90%_60%_at_50%_0%,rgba(249,115,22,0.08),transparent_55%)]"
      />
      <div className="container relative z-10 mx-auto max-w-6xl px-4 md:px-6">
        <div className="mb-20 text-center">
          <span className="eyebrow mb-8 inline-block italic">High-Stakes Execution</span>
          <WordReveal className="text-5xl md:text-7xl lg:text-[7.5rem] font-black tracking-tighter leading-[0.9] text-white overflow-hidden">
            Why choose Evox Ventures
          </WordReveal>
        </div>

        <ScrollRevealStagger className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {services.map((s) => (
            <motion.div key={s.title} variants={itemReveal} className="h-full">
              <Card hoverable className="group flex h-full flex-col p-8">
                <div className="mb-6 inline-flex rounded-2xl border border-orange-500/20 bg-orange-500/10 p-3 text-[#FF6A00] transition-transform duration-300 group-hover:scale-105">
                  <s.icon className="h-6 w-6" strokeWidth={1.5} />
                </div>
                <h3 className="mb-4 font-[family-name:var(--font-poppins)] text-xl md:text-2xl font-bold tracking-tight text-white transition-colors duration-300 group-hover:text-[#FF6A00]">
                  {s.title}
                </h3>
                <p className="mb-6 flex-grow text-sm leading-[1.6] text-[#A1A1AA] md:text-base md:leading-[1.8]">
                  {s.desc}
                </p>
                <Link
                  href="/services"
                  className="mt-auto inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-white transition-colors duration-200 hover:text-[#FF6A00] group-hover:text-[#FF6A00]"
                  data-cursor-hover
                >
                  Explore
                  <ArrowUpRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </Link>
              </Card>
            </motion.div>
          ))}
        </ScrollRevealStagger>
      </div>
    </section>
  );
}
