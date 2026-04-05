"use client";

import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useRef, useState } from "react";
import Image from "next/image";
import { ArrowRight, Zap, Trophy, Users, Sparkles, MapPin, Umbrella } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { EVENTS } from "./EventGrid"; // Reusing the data

const CATEGORY_ICONS = {
  "Sports Event": Trophy,
  "Tech": Zap,
  "Leisure": Umbrella,
  "Adventure": MapPin,
  "Club Party": Users,
  "Festival": Sparkles,
};

const StorySection = ({ event, index }) => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.4, 1, 1, 0.4]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.9, 1, 0.9]);
  
  const Icon = CATEGORY_ICONS[event.category] || Sparkles;

  return (
    <section 
      ref={containerRef}
      className="relative min-h-[90vh] flex items-center justify-center overflow-hidden py-24"
    >
      {/* Immersive Background */}
      <motion.div 
        className="absolute inset-0 z-0"
        style={{ scale, opacity }}
      >
        <Image 
          src={event.image} 
          alt={event.title} 
          fill 
          className="object-cover brightness-[0.3] grayscale-[0.5] contrast-125"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#030303] via-transparent to-[#030303]" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#030303] via-transparent to-[#030303]/40" />
      </motion.div>

      <div className="container relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-20">
          {/* Visual Narrative */}
          <motion.div 
            className="lg:w-1/2 relative aspect-[4/3] w-full cinematic-image-wrapper !rounded-[3rem] border border-white/5 shadow-2xl"
            style={{ y }}
          >
            <Image 
              src={event.moments?.[0] || event.image} 
              alt={event.title} 
              fill 
              className="object-cover cinematic-image"
            />
            <div className="absolute top-8 left-8 py-2 px-4 glass-surface rounded-full flex items-center gap-3 border-white/10 uppercase tracking-[0.2em] text-[10px] font-bold">
               <Icon className="w-3.5 h-3.5 text-orange-500" />
               <span>{event.category} • {event.year}</span>
            </div>
          </motion.div>

          {/* Textual Narrative */}
          <div className="lg:w-1/2 text-left">
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            >
              <h2 className="text-5xl md:text-7xl font-black text-white mb-8 tracking-tighter leading-[0.9] uppercase italic">
                {event.title}
              </h2>
              <p className="text-xl text-zinc-400 mb-12 font-light leading-relaxed max-w-xl">
                {event.description}
              </p>

              {/* Stats Highlights */}
              <div className="flex flex-wrap gap-10 mb-14">
                {event.highlights?.map((stat, i) => (
                  <div key={i} className="flex flex-col gap-1">
                    <span className="text-2xl font-black text-white tracking-tighter">
                      {stat.split(' ')[0]}
                    </span>
                    <span className="text-[9px] uppercase tracking-[0.2em] text-zinc-600 font-bold">
                      {stat.split(' ').slice(1).join(' ')}
                    </span>
                  </div>
                ))}
              </div>

              <div className="flex items-center gap-8">
                <Button href={`/portfolio/${event.id}`} variant="luxury" className="group">
                  Full Story <ArrowRight className="ml-3 w-4 h-4 transition-transform group-hover:translate-x-1" />
                </Button>
                <div className="hidden sm:block h-px w-20 bg-white/10" />
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default function ProjectStories() {
  return (
    <div className="relative bg-[#030303]">
      {/* Global Scroll Progress */}
      <div className="space-y-0">
        {EVENTS.map((event, index) => (
          <StorySection key={event.id} event={event} index={index} />
        ))}
      </div>
    </div>
  );
}
