"use client";

import { motion, useReducedMotion } from "framer-motion";
import ScrollReveal from "@/components/ui/ScrollReveal";
import { useRef, useEffect, useState } from "react";

const TIMELINE_EVENTS = [
  { year: 2025, title: "Cricket Tournament", category: "Sports", description: "An electrifying cricket showdown that set a new standard for sportsmanship and excitement." },
  { year: 2026, title: "Holi Celebration", category: "Festival", description: "A high-octane explosion of colors, music, and joy that redefined festive celebrations." },
  { year: 2026, title: "Badminton Tournament", category: "Sports", description: "Fast-paced, fiercely competitive, and wildly fun — a highlight of the 2026 season." },
  { year: 2026, title: "Football Tournament", category: "Sports", description: "High-octane football action with knockout rounds and star players." },
  { year: 2026, title: "Beach Trip", category: "Travel", description: "A sun-soaked retreat that turned team bonding into a professional art form." },
  { year: 2026, title: "Club Party", category: "Social", description: "An exclusive premium night that turned colleagues into lifelong friends." },
  { year: 2026, title: "Tech Hackathon", category: "Tech", description: "Our most futuristic event yet — 48 hours of innovation and building." },
];

const CAT_COLORS = {
  Sports: "#f97316",
  Travel: "#14b8a6",
  Social: "#a855f7",
  Tech: "#3b82f6",
  Festival: "#f43f5e",
};

function TimelineNode({ event, index, isVisible }) {
  const color = CAT_COLORS[event.category];
  const isLeft = index % 2 === 0;

  return (
    <div className={`relative flex w-full items-center md:w-1/2 ${isLeft ? "md:pr-12 md:self-end md:justify-end" : "md:pl-12 md:ml-auto md:justify-start"}`}>
      {/* Connector line (desktop) */}
      <motion.div
        className="absolute hidden md:block h-[2px] w-12 top-1/2 -translate-y-1/2"
        style={{
          [isLeft ? "right" : "left"]: 0,
          background: `linear-gradient(${isLeft ? "to left" : "to right"}, ${color}60, transparent)`,
          transformOrigin: isLeft ? "right center" : "left center",
        }}
        initial={{ scaleX: 0 }}
        animate={isVisible ? { scaleX: 1 } : { scaleX: 0 }}
        transition={{ duration: 0.5, delay: index * 0.15 + 0.3 }}
      />

      {/* Card */}
      <motion.div
        className="w-full max-w-sm rounded-2xl border border-white/[0.06] bg-white/[0.04] p-6"
        style={{ borderColor: `${color}22` }}
        initial={{ opacity: 0, x: isLeft ? -30 : 30 }}
        animate={isVisible ? { opacity: 1, x: 0 } : { opacity: 0, x: isLeft ? -30 : 30 }}
        transition={{ duration: 0.65, delay: index * 0.12, ease: [0.22, 1, 0.36, 1] }}
        whileHover={{ borderColor: `${color}55`, boxShadow: `0 0 30px ${color}15` }}
      >
        <div className="flex items-center gap-3 mb-3">
          <span
            className="rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-widest"
            style={{ background: `${color}20`, color: color, border: `1px solid ${color}40` }}
          >
            {event.category}
          </span>
          <span className="text-xs font-bold text-zinc-600">{event.year}</span>
        </div>
        <h3 className="font-[family-name:var(--font-poppins)] text-lg font-bold text-white">
          {event.title}
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-zinc-500">{event.description}</p>
      </motion.div>
    </div>
  );
}

export default function EventTimeline() {
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced) {
      queueMicrotask(() => setIsVisible(true));
      return;
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, [reduced]);

  return (
    <section ref={sectionRef} id="timeline" className="relative section-padding overflow-hidden">
      {/* Background */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background: "radial-gradient(ellipse 70% 50% at 50% 50%, rgba(249,115,22,0.04), transparent 65%), linear-gradient(180deg, transparent, rgba(5,5,5,0.6) 30%, rgba(5,5,5,0.6) 70%, transparent)",
        }}
      />

      {/* Horizontal accent line */}
      <div className="pointer-events-none absolute left-0 top-0 h-[1px] w-full bg-gradient-to-r from-transparent via-orange-500/30 to-transparent" />

      <div className="container relative z-10 mx-auto max-w-5xl px-4 md:px-6">
        <ScrollReveal className="mb-20 text-center">
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.45em] text-orange-400/90">
            Our Journey
          </p>
          <h2 className="font-[family-name:var(--font-poppins)] text-4xl font-bold tracking-tight text-white md:text-5xl">
            The Evox{" "}
            <span className="bg-gradient-to-br from-orange-400 to-orange-600 bg-clip-text text-transparent">
              Timeline
            </span>
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-zinc-500">
            Every event is a milestone. Here&apos;s how the Evox story unfolded.
          </p>
        </ScrollReveal>

        {/* Timeline */}
        <div className="relative">
          {/* Central vertical line (desktop) */}
          <div className="absolute left-1/2 hidden -translate-x-1/2 md:block">
            <motion.div
              className="w-[1px] origin-top"
              style={{
                height: `${TIMELINE_EVENTS.length * 180}px`,
                background: "linear-gradient(to bottom, transparent, rgba(249,115,22,0.4) 10%, rgba(249,115,22,0.2) 90%, transparent)",
              }}
              initial={{ scaleY: 0 }}
              animate={isVisible ? { scaleY: 1 } : { scaleY: 0 }}
              transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            />
          </div>

          {/* Mobile: left vertical line */}
          <div className="absolute left-4 md:hidden">
            <div
              className="w-[1px]"
              style={{
                height: "100%",
                background: "linear-gradient(to bottom, transparent, rgba(249,115,22,0.4), transparent)",
              }}
            />
          </div>

          <div className="flex flex-col gap-10 md:gap-14">
            {TIMELINE_EVENTS.map((event, index) => {
              const color = CAT_COLORS[event.category];
              const isLeft = index % 2 === 0;

              return (
                <div key={event.title} className="relative flex items-center gap-6 pl-10 md:pl-0 md:justify-center">
                  {/* Center dot */}
                  <motion.div
                    className="absolute left-4 md:left-1/2 z-10 -translate-x-1/2 rounded-full border-2 border-black"
                    style={{
                      width: 16,
                      height: 16,
                      background: color,
                      boxShadow: `0 0 20px ${color}60, 0 0 6px ${color}`,
                    }}
                    initial={{ scale: 0, opacity: 0 }}
                    animate={isVisible ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.12 + 0.2 }}
                  />

                  {/* Desktop layout: alternate left/right */}
                  <div className="hidden w-full md:flex md:items-center md:gap-0">
                    <div className="w-1/2 pr-16 flex justify-end">
                      {isLeft && (
                        <TimelineNode event={event} index={index} isVisible={isVisible} />
                      )}
                    </div>
                    <div className="w-1/2 pl-16">
                      {!isLeft && (
                        <TimelineNode event={event} index={index} isVisible={isVisible} />
                      )}
                    </div>
                  </div>

                  {/* Mobile layout */}
                  <div className="md:hidden w-full">
                    <motion.div
                      className="rounded-2xl border bg-white/[0.03] p-5"
                      style={{ borderColor: `${color}22` }}
                      initial={{ opacity: 0, x: 20 }}
                      animate={isVisible ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                    >
                      <div className="flex items-center gap-2 mb-2">
                        <span
                          className="rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-widest"
                          style={{ background: `${color}20`, color: color }}
                        >
                          {event.category}
                        </span>
                        <span className="text-xs font-bold text-zinc-600">{event.year}</span>
                      </div>
                      <h3 className="font-[family-name:var(--font-poppins)] text-base font-bold text-white">
                        {event.title}
                      </h3>
                      <p className="mt-1.5 text-xs leading-relaxed text-zinc-500">{event.description}</p>
                    </motion.div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
