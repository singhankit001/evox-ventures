"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import ScrollReveal, { ScrollRevealStagger, itemReveal } from "@/components/ui/ScrollReveal";
import { Card } from "@/components/ui/Card";
import LetterReveal from "@/components/ui/LetterReveal";

const events = [
  {
    title: "Cricket Tournament",
    date: "November 2025",
    tag: "Sports Event",
    description: "A high-energy competitive sports experience designed for scale and excitement.",
    src: "/images/cricket-main-final.jpg",
  },
  {
    title: "Kalsubai Trek",
    date: "December 2025",
    tag: "Adventure",
    description: "An exclusive summit expedition bridging raw nature with premium guided luxury.",
    src: "/images/trek-hero.png",
  },
  {
    title: "Alibaug Beach Trip",
    date: "January 2026",
    tag: "Leisure Travel",
    description: "An elevated coastal escape curated for atmosphere, relaxation, and seamless execution.",
    src: "/images/alibaug-pool.jpg",
  },
  {
    title: "Night Wave",
    date: "February 2026",
    tag: "Club Party",
    description: "A visionary nightlife production featuring world-class DJs and immersive light shows.",
    src: "/images/night-wave.jpg",
  },
  {
    title: "Rangholic",
    date: "3 March 2026",
    tag: "Festival",
    description: "A vibrant, massive-scale color festival blending cultural energy with luxury VIP tiering.",
    src: "/images/rangholic.jpg",
  },
  {
    title: "Badminton Tournament",
    date: "March 2026",
    tag: "Sports Event",
    description: "A high-stakes indoor court championship driven by flawless logistics and athlete focus.",
    src: "/images/badminton.jpg",
  },
  {
    title: "Tech Hackathon",
    date: "April 2026",
    tag: "Innovation",
    description: "A 48-hour continuous coding arena fueled by next-gen infrastructure and elite talent.",
    src: "/images/hackathon.jpg",
  },
];

export default function EventsShowcase() {
  return (
    <section id="showcase" className="relative section-padding section-glow overflow-hidden">
      {/* ═══ LIVING COLOR BACKGROUND SYSTEM ═══ */}
      {/* Primary orange halo */}
      <motion.div
        className="pointer-events-none absolute top-[-20%] left-[-10%] w-[700px] h-[700px] rounded-full"
        style={{ background: 'radial-gradient(ellipse, rgba(249,115,22,0.12) 0%, transparent 70%)' }}
        animate={{ x: [0, 80, -40, 0], y: [0, -60, 40, 0], scale: [1, 1.15, 0.9, 1] }}
        transition={{ duration: 22, repeat: Infinity, ease: 'easeInOut' }}
      />
      {/* Violet accent orb */}
      <motion.div
        className="pointer-events-none absolute bottom-[-10%] right-[-15%] w-[600px] h-[600px] rounded-full"
        style={{ background: 'radial-gradient(ellipse, rgba(124,58,237,0.09) 0%, transparent 70%)' }}
        animate={{ x: [0, -60, 30, 0], y: [0, 50, -30, 0], scale: [1.1, 0.95, 1.05, 1.1] }}
        transition={{ duration: 28, repeat: Infinity, ease: 'easeInOut' }}
      />
      {/* Emerald mid-section pulse */}
      <motion.div
        className="pointer-events-none absolute top-[40%] left-[40%] w-[400px] h-[400px] rounded-full"
        style={{ background: 'radial-gradient(ellipse, rgba(16,185,129,0.05) 0%, transparent 70%)' }}
        animate={{ scale: [1, 1.3, 1], opacity: [0.4, 0.7, 0.4] }}
        transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
      />
      {/* Subtle grid noise overlay */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)',
          backgroundSize: '80px 80px'
        }}
      />
      {/* Bottom gradient fade for smooth section transition */}
      <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-[#030303] to-transparent" />

      <div className="container relative z-10 mx-auto max-w-7xl px-4 md:px-6">
        {/* ═══ CINEMATIC HEADING REVEAL ═══ */}
        <div className="mb-16 text-center">
          {/* Eyebrow tag */}
          <motion.p
            initial={{ opacity: 0, y: 20, filter: 'blur(8px)' }}
            whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="mb-6 text-xs font-black uppercase tracking-[0.5em] text-orange-400 drop-shadow-[0_0_10px_rgba(251,146,60,0.4)]"
          >
            Experiences We Created
          </motion.p>

          {/* Line 1: "A Legacy of" */}
          <div className="overflow-hidden">
            <motion.span
              initial={{ opacity: 0, y: 60, filter: 'blur(12px)' }}
              whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="block font-[family-name:var(--font-poppins)] text-4xl md:text-5xl lg:text-7xl font-black tracking-tighter text-white drop-shadow-xl"
            >
              A Legacy of
            </motion.span>
          </div>

          {/* Line 2: "Execution" — shimmer gradient word */}
          <div className="overflow-hidden">
            <motion.span
              initial={{ opacity: 0, y: 60, filter: 'blur(12px)' }}
              whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="block font-[family-name:var(--font-poppins)] text-4xl md:text-5xl lg:text-7xl font-black tracking-tighter bg-gradient-to-r from-orange-400 via-amber-300 to-orange-500 bg-clip-text text-transparent drop-shadow-[0_0_25px_rgba(249,115,22,0.4)]"
              style={{ backgroundSize: '200% 100%', animation: 'colorshift 4s linear infinite' }}
            >
              <LetterReveal
                as="span"
                text="Execution"
                className=""
                delayStep={0.022}
              />
            </motion.span>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.6 }}
            className="mx-auto mt-6 max-w-2xl text-lg text-zinc-400 font-light leading-relaxed"
          >
            From visionary blueprints to flawless reality. A glimpse into the premium moments and high-stakes operations we engineer.
          </motion.p>
        </div>

        <ScrollRevealStagger className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 auto-rows-[400px]">
          {events.map((e, idx) => {
            const getBentoClass = (index) => {
              switch (index) {
                case 0: return "md:col-span-2 md:row-span-2"; // 1st: Massive Hero
                case 1: return "md:col-span-1 md:row-span-1"; // 2nd: Square
                case 2: return "md:col-span-1 md:row-span-1"; // 3rd: Square
                case 3: return "md:col-span-3 md:row-span-1"; // 4th: Panoramic
                case 4: return "md:col-span-1 md:row-span-1"; // 5th
                case 5: return "md:col-span-1 md:row-span-1"; // 6th
                case 6: return "md:col-span-1 md:row-span-1"; // 7th
                default: return "md:col-span-1 md:row-span-1";
              }
            };
            
            return (
              <motion.div key={e.title} variants={itemReveal} className={`relative flex ${getBentoClass(idx)}`}>
                <Card hoverable className="group w-full h-full relative flex flex-col overflow-hidden rounded-[2rem] shadow-none hover:shadow-[0_20px_50px_rgba(255,115,0,0.15)] transition-shadow duration-500 border-white/5">
                  <Image
                    src={e.src}
                    alt={e.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 80vw"
                    className="object-cover transition-transform duration-1000 ease-[0.22,1,0.36,1] group-hover:scale-105"
                    loading={idx < 2 ? "eager" : "lazy"}
                    priority={idx < 2}
                  />
                  
                  {/* Layered Luxury Gradients */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-80 transition-all duration-700 ease-out group-hover:opacity-95" />
                  <div className="absolute inset-0 bg-gradient-to-br from-orange-500/20 via-transparent to-transparent opacity-0 mix-blend-overlay transition-all duration-700 group-hover:opacity-100" />
                  
                  <div className="absolute inset-0 flex flex-col justify-end p-8 md:p-10">
                    <div className="flex flex-wrap items-center gap-3 mb-4 transition-transform duration-500 ease-out group-hover:-translate-y-2">
                      <span className="inline-block rounded-full border border-orange-500/30 bg-orange-500/10 px-3 py-1.5 text-[10px] font-black uppercase tracking-[0.2em] text-orange-400 shadow-[0_0_15px_rgba(255,115,0,0.1)]">
                        {e.tag}
                      </span>
                      <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/90 bg-white/10 px-3 py-1.5 rounded-full backdrop-blur-md border border-white/5">
                        {e.date}
                      </span>
                    </div>
                    
                    <h3 className={`font-[family-name:var(--font-poppins)] font-black tracking-tighter leading-[1.1] text-white transition-transform duration-500 ease-out group-hover:-translate-y-2 drop-shadow-xl ${idx === 0 || idx === 3 ? 'text-4xl md:text-5xl lg:text-6xl' : 'text-3xl md:text-4xl'}`}>
                      {e.title}
                    </h3>
                    
                    {/* Hidden Description that reveals cleanly on hover */}
                    <div className="overflow-hidden">
                      <p className="mt-4 text-sm md:text-base text-zinc-300 font-light leading-relaxed max-w-md translate-y-8 opacity-0 transition-all duration-500 ease-[0.22,1,0.36,1] group-hover:translate-y-0 group-hover:opacity-100">
                        {e.description}
                      </p>
                      <Link
                        href={`/portfolio/${e.title.toLowerCase().replace(/ /g, '-')}`}
                        className="mt-6 flex w-fit items-center gap-2 text-xs font-black tracking-[0.3em] uppercase text-orange-400 translate-y-8 opacity-0 transition-all duration-500 delay-[50ms] ease-[0.22,1,0.36,1] group-hover:translate-y-0 group-hover:opacity-100"
                        data-cursor-hover
                      >
                        Explore Event →
                      </Link>
                    </div>
                  </div>
                </Card>
              </motion.div>
            );
          })}
        </ScrollRevealStagger>
      </div>
    </section>
  );
}
