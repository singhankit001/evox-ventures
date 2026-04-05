"use client";

import { motion, useScroll, useSpring } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";
import { WordReveal } from "@/components/ui/ScrollReveal";

const milestones = [
  {
    ghostText: "NOV",
    dateStr: "November 2025",
    category: "Sports Event",
    title: "Cricket Tournament",
    description: "A high-energy competitive sports event with strong crowd and execution feel, demanding absolute precision.",
    image: "/images/cricket-main-final.jpg"
  },
  {
    ghostText: "DEC",
    dateStr: "December 2025",
    category: "Adventure Experience",
    title: "Kalsubai Trek",
    description: "An immersive outdoor adventure experience fusing the endurance of the trail with an unforgettable atmosphere.",
    image: "/images/trek-hero.png"
  },
  {
    ghostText: "JAN",
    dateStr: "January 2026",
    category: "Travel / Leisure",
    title: "Alibaug Beach Trip",
    description: "An elevated beach getaway curated for relaxation, energy, and seamlessly engineered group moments.",
    image: "/images/alibaug-pool.jpg"
  },
  {
    ghostText: "FEB",
    dateStr: "February 2026",
    category: "Club Party",
    title: "Night Wave",
    description: "A high-energy nightlife experience designed with intense mood, electronic music, and a premium neon atmosphere.",
    image: "/images/night-wave.jpg"
  },
  {
    ghostText: "MAR",
    dateStr: "March 2026",
    category: "Sports Event",
    title: "Badminton Tournament",
    description: "A fast-paced indoor sports competition executed with high precision and non-stop athletic excitement.",
    image: "/images/badminton.jpg"
  },
  {
    ghostText: "MAR",
    dateStr: "3 March 2026",
    category: "Holi Festival",
    title: "Rangholic",
    description: "A color-filled festive celebration unmatched in energy, scale, and an absolutely unforgettable atmosphere.",
    image: "/images/rangholic.jpg"
  },
  {
    ghostText: "APR",
    dateStr: "April 2026",
    category: "Tech / Innovation",
    title: "Tech Hackathon",
    description: "A collaborative, ultra-modern tech-first event focused entirely on driving ideas, breakthrough innovation, and pure execution.",
    image: "/images/corporate-v3.jpg"
  }
];

const Milestone = ({ milestone, index }) => {
  const isEven = index % 2 === 0;

  return (
    <div className="relative mb-24 lg:mb-32 last:mb-0">
      <div className={`flex flex-col lg:flex-row items-center gap-16 lg:gap-32 ${isEven ? "" : "lg:flex-row-reverse text-right"}`}>
        <motion.div 
          className="lg:w-1/2 relative z-10"
          initial={{ opacity: 0, x: isEven ? -60 : 60 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className={`text-[10rem] md:text-[14rem] xl:text-[18rem] font-black absolute top-1/2 -translate-y-1/2 ${isEven ? "-left-12" : "-right-12"} -z-10 opacity-20 select-none text-white tracking-tighter drop-shadow-[0_0_80px_rgba(255,106,0,0.4)]`}>
            {milestone.ghostText}
          </span>
          <span className="eyebrow block mb-6 text-orange-500 font-bold tracking-[0.3em] uppercase text-[10px]">{milestone.dateStr} — {milestone.category}</span>
          <h3 className="text-4xl md:text-6xl font-black text-white mb-8 tracking-tighter leading-[1] drop-shadow-xl">{milestone.title}</h3>
          <p className="text-zinc-400 text-base md:text-lg leading-relaxed max-w-lg mx-auto lg:mx-0 font-light">
            {milestone.description}
          </p>
        </motion.div>

        <motion.div 
          className="lg:w-1/2 relative aspect-video cinematic-image-wrapper !rounded-[2.5rem] border border-white/10 shadow-[0_30px_60px_rgba(0,0,0,0.8)] overflow-hidden group hover:border-orange-500/30 hover:shadow-[0_0_50px_rgba(249,115,22,0.2)] transition-all duration-700"
          initial={{ opacity: 0, x: isEven ? 60 : -60, rotate: isEven ? 2 : -2 }}
          whileInView={{ opacity: 1, x: 0, rotate: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-orange-500/40 via-transparent to-transparent mix-blend-overlay z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
          <motion.div
            className="w-full h-full"
            initial={{ scale: 1.3 }}
            whileInView={{ scale: 1 }}
            transition={{ duration: 2, ease: [0.22, 1, 0.36, 1] }}
          >
            <Image 
              src={milestone.image} 
              alt={milestone.title} 
              fill 
              className="object-cover cinematic-image grayscale opacity-50 group-hover:grayscale-0 group-hover:scale-110 group-hover:opacity-100 transition-all duration-1000"
            />
          </motion.div>
        </motion.div>
      </div>
      
      {/* Timeline Indicator Node */}
      <div className="absolute left-1/2 -bottom-24 -translate-x-1/2 hidden lg:block">
        <div className="w-2 h-2 rounded-full bg-white/10" />
      </div>
    </div>
  );
};

export default function EvoxJourney() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start end", "end start"] });
  const scaleY = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  return (
    <section ref={containerRef} className="pt-0 pb-12 relative overflow-hidden section-blend bg-[#030303]">
      <div className="container relative z-10">
        <motion.div
          className="text-center mb-0"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Gradient badge eyebrow */}
          <div className="inline-flex items-center gap-3 mb-0">
            <span className="h-px w-8 bg-gradient-to-r from-transparent to-orange-500/60" />
            <span
              className="text-2xl md:text-5xl font-black uppercase"
              style={{ letterSpacing: "0.4em", marginRight: "-0.4em", background: "linear-gradient(to right, #fbbf24, #f97316, #fb7185)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}
            >
              The Evox Event Trajectory
            </span>
            <span className="h-px w-8 bg-gradient-to-l from-transparent to-orange-500/60" />
          </div>

          {/* Main heading — two-tone */}
          <WordReveal className="text-6xl md:text-8xl lg:text-[9rem] font-black tracking-tighter leading-[0.8] mb-[-1rem] bg-gradient-to-br from-white via-zinc-100 to-zinc-400 bg-clip-text text-transparent">
            Architecting the Live Journey
          </WordReveal>
        </motion.div>

        <div className="relative max-w-7xl mx-auto px-6 mt-[-4rem] lg:mt-[-8rem]">
          {/* Subtle Central Timeline Path */}
          <motion.div 
            className="absolute left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-orange-500 via-orange-500/30 to-transparent hidden lg:block shadow-[0_0_20px_rgba(255,106,0,0.8)]" 
            style={{ scaleY, transformOrigin: "top", marginLeft: "-2px" }}
          />

          {milestones.map((milestone, index) => (
            <Milestone key={index} milestone={milestone} index={index} />
          ))}
        </div>
      </div>

      {/* Atmospheric Gradients */}
      <div className="absolute top-[20%] right-0 w-[50vw] h-[50vw] bg-orange-600/[0.03] blur-[150px] rounded-full translate-x-1/2" />
      <div className="absolute bottom-[20%] left-0 w-[50vw] h-[50vw] bg-purple-600/[0.03] blur-[150px] rounded-full -translate-x-1/2" />
    </section>
  );
}
