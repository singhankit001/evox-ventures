"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import ScrollReveal, { ScrollRevealStagger, itemReveal } from "@/components/ui/ScrollReveal";
import { Card } from "@/components/ui/Card";

const events = [
  {
    title: "Corporate Gala",
    tag: "Corporate",
    src: "https://images.unsplash.com/photo-1511578314322-379afb476865?w=900&q=80",
  },
  {
    title: "Championship Night",
    tag: "Sports",
    src: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=900&q=80",
  },
  {
    title: "Executive Summit",
    tag: "Conference",
    src: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=900&q=80",
  },
  {
    title: "Luxury Soirée",
    tag: "Social",
    src: "https://images.unsplash.com/photo-1478146896981-b80fe463b330?w=900&q=80",
  },
];

export default function EventsShowcase() {
  return (
    <section id="showcase" className="relative section-padding">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_50%_100%,rgba(249,115,22,0.06),transparent_55%)]"
      />
      <div className="container relative z-10 mx-auto max-w-6xl px-4 md:px-6">
        <ScrollReveal className="mb-12 text-center">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.35em] text-orange-400/90">
            Events showcase
          </p>
          <h2 className="relative font-[family-name:var(--font-poppins)] text-3xl font-bold tracking-tight text-white md:text-5xl lg:text-6xl">
            Moments we&apos;ve{" "}
            <span className="bg-gradient-to-br from-orange-400 to-orange-600 bg-clip-text text-transparent">
              crafted
            </span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-[#A1A1AA] mb-0">
            A glimpse of experiences designed with precision, atmosphere, and unforgettable energy.
          </p>
        </ScrollReveal>

        <ScrollRevealStagger className="grid gap-8 sm:grid-cols-2 lg:gap-[40px]">
          {events.map((e) => (
            <motion.div key={e.title} variants={itemReveal}>
              <Card hoverable className="group relative flex h-full min-h-[400px] flex-col overflow-hidden sm:min-h-[500px]">
                <Image
                  src={e.src}
                  alt={e.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.05]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-80 transition-opacity duration-300 ease-out group-hover:opacity-100" />
                <div className="absolute inset-0 flex flex-col justify-end p-8">
                  <span className="mb-3 inline-block w-fit rounded-full border border-orange-500/30 bg-orange-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-orange-400 transition-transform duration-300 ease-out group-hover:-translate-y-2">
                    {e.tag}
                  </span>
                  <h3 className="font-[family-name:var(--font-poppins)] text-2xl font-semibold tracking-tight text-white transition-transform duration-300 ease-out group-hover:-translate-y-2 md:text-3xl">
                    {e.title}
                  </h3>
                  <Link
                    href="/portfolio"
                    className="mt-4 flex w-fit items-center gap-2 text-sm font-semibold tracking-widest text-orange-400 opacity-0 transition-all duration-300 ease-out group-hover:translate-y-0 group-hover:opacity-100"
                    data-cursor-hover
                  >
                    VIEW DETAILS →
                  </Link>
                </div>
              </Card>
            </motion.div>
          ))}
        </ScrollRevealStagger>
      </div>
    </section>
  );
}
