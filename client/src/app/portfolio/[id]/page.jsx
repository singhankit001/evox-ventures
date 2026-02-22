"use client";

import { useParams, useRouter } from "next/navigation";
import { EVENTS } from "@/components/portfolio/EventGrid";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";
import { ChevronLeft, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/Button";
import ScrollReveal from "@/components/ui/ScrollReveal";

const easePremium = [0.22, 1, 0.36, 1];

export default function EventDetailPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id;
  const event = EVENTS.find((e) => e.id === id);
  const reduced = useReducedMotion();

  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll();
  const { scrollYProgress: heroScrollProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const scrollWidth = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  const heroScale = useTransform(heroScrollProgress, [0, 1], [1, 1.1]);
  const heroOpacity = useTransform(heroScrollProgress, [0, 0.8], [1, 0]);

  if (!event) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-[#030303] text-white">
        <h1 className="text-4xl font-black tracking-tighter uppercase italic">Event Not Found</h1>
        <Button variant="secondary" className="mt-10" onClick={() => router.push("/portfolio")}>
          Return to Archive
        </Button>
      </div>
    );
  }

  const currentIndex = EVENTS.findIndex(e => e.id === id);
  const nextEvent = EVENTS[(currentIndex + 1) % EVENTS.length];

  return (
    <div className="min-h-screen bg-[#030303] text-white selection:bg-orange-500 selection:text-white pb-32">
      {/* Precision Scroll Indicator */}
      <motion.div
        className="fixed top-0 left-0 z-[100] h-[3px] bg-gradient-to-r from-orange-400 to-orange-600 shadow-[0_0_15px_rgba(249,115,22,0.5)]"
        style={{ width: scrollWidth }}
      />

      {/* Floating Navigation */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="fixed left-6 md:left-12 top-12 md:top-16 z-[90] mix-blend-difference"
      >
        <button 
          onClick={() => router.push("/portfolio")}
          className="flex items-center gap-3 text-white hover:text-orange-400 transition-colors duration-300 font-bold uppercase tracking-[0.2em] text-[10px]"
        >
          <ChevronLeft className="h-4 w-4" />
          <span>Index</span>
        </button>
      </motion.div>

      {/* 1. The Monolith Hero */}
      <section ref={heroRef} className="relative h-screen w-full overflow-hidden flex flex-col justify-end">
        <motion.div style={!reduced ? { scale: heroScale, opacity: heroOpacity } : {}} className="absolute inset-0">
          <Image
            src={event.image}
            alt={event.title}
            fill
            className="object-cover grayscale-[0.2] brightness-[0.6] contrast-125"
            priority
          />
          {/* Intense Apple fade overlay directly from the baseline */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#030303] via-[#030303]/40 to-transparent opacity-95" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-transparent to-transparent opacity-60" />
        </motion.div>

        <div className="container relative z-10 mx-auto max-w-7xl px-6 md:px-12 pb-24 md:pb-32">
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: easePremium, delay: 0.2 }}
          >
            <div className="mb-8 flex flex-wrap items-center gap-4">
              <span className="inline-flex rounded-full border border-orange-500/30 bg-orange-500/10 px-4 py-2 text-[10px] sm:text-xs font-black uppercase tracking-[0.2em] text-orange-400 shadow-[0_0_15px_rgba(255,115,0,0.1)]">
                {event.category}
              </span>
              <span className="text-[10px] sm:text-xs font-bold uppercase tracking-[0.2em] text-white/70">
                {event.year}
              </span>
            </div>
            
            <h1 className="text-5xl md:text-7xl lg:text-[7.5rem] font-black text-white tracking-tighter leading-[0.9] drop-shadow-2xl">
              {event.title}
            </h1>
            
            {event.tagline && (
              <p className="mt-8 text-xl md:text-3xl font-light text-zinc-300 max-w-3xl tracking-tight">
                {event.tagline}
              </p>
            )}
          </motion.div>
        </div>
      </section>

      {/* 2. The Editorial Story (Minimum 10 Lines Implementation) */}
      <section className="relative z-20 py-24 md:py-40 bg-[#030303]">
        <div className="container mx-auto max-w-7xl px-6 md:px-12">
          <div className="flex flex-col lg:flex-row gap-20">
            {/* Left Column: Metadata & Metrics */}
            <div className="lg:w-1/3">
              <div className="sticky top-40">
                <ScrollReveal>
                  <p className="text-[10px] font-black uppercase tracking-[0.4em] text-orange-500 mb-8 border-b border-white/10 pb-4">Executive Brief</p>
                  <p className="text-lg text-zinc-400 font-light leading-relaxed mb-12">
                    {event.description}
                  </p>
                  
                  <div className="flex flex-col gap-8">
                    {event.highlights?.map((highlight, idx) => (
                      <div key={idx} className="group">
                        <p className="text-xs font-bold uppercase tracking-[0.3em] text-zinc-600 mb-2">Metric 0{idx + 1}</p>
                        <p className="text-2xl font-black text-white tracking-tighter transition-colors duration-500 group-hover:text-orange-500">{highlight}</p>
                      </div>
                    ))}
                  </div>
                </ScrollReveal>
              </div>
            </div>

            {/* Right Column: Deep Storytelling Blocks */}
            <div className="lg:w-2/3">
              <div className="max-w-4xl font-light text-xl md:text-2xl lg:text-[1.75rem] leading-[1.8] text-zinc-300 space-y-12">
                {event.story?.map((paragraph, index) => (
                  <ScrollReveal key={index} delay={0.1}>
                    <p className={`${index === 0 ? "text-3xl md:text-4xl lg:text-5xl font-normal leading-[1.4] text-white tracking-tight mb-16" : ""}`}>
                      {paragraph}
                    </p>
                  </ScrollReveal>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. The Cinematic Gallery Grid */}
      <section className="py-24 md:py-32 bg-[#080808]">
        <div className="container mx-auto max-w-7xl px-6 md:px-12 mb-20">
            <ScrollReveal>
                <h2 className="text-4xl md:text-5xl font-black tracking-tighter text-white">Visual Archive.</h2>
            </ScrollReveal>
        </div>
        
        {/* Asymmetrical Bento layout for the 4 moments */}
        <div className="container mx-auto max-w-7xl px-6 md:px-12">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-6">
            
            {/* Massive Hero Gallery Shot */}
            <motion.div 
               initial={{ opacity: 0, y: 40 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true }}
               transition={{ duration: 1 }}
               className="md:col-span-8 relative aspect-[4/3] md:aspect-[16/9] rounded-3xl overflow-hidden group"
            >
               <Image src={event.moments?.[0] || event.image} alt="Gallery 1" fill className="object-cover grayscale-[0.3] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-[1.5s]" />
            </motion.div>

            {/* Side Gallery Shot */}
            <motion.div 
               initial={{ opacity: 0, y: 40 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true }}
               transition={{ duration: 1, delay: 0.1 }}
               className="md:col-span-4 relative aspect-square rounded-3xl overflow-hidden group"
            >
               <Image src={event.moments?.[1] || event.image} alt="Gallery 2" fill className="object-cover grayscale-[0.3] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-[1.5s]" />
            </motion.div>

            {/* Bottom Left Gallery Shot */}
            <motion.div 
               initial={{ opacity: 0, y: 40 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true }}
               transition={{ duration: 1, delay: 0.2 }}
               className="md:col-span-5 relative aspect-[4/3] rounded-3xl overflow-hidden group"
            >
               <Image src={event.moments?.[2] || event.image} alt="Gallery 3" fill className="object-cover grayscale-[0.3] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-[1.5s]" />
            </motion.div>

            {/* Bottom Right Panoramic Gallery Shot */}
            <motion.div 
               initial={{ opacity: 0, y: 40 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true }}
               transition={{ duration: 1, delay: 0.3 }}
               className="md:col-span-7 relative aspect-[16/9] rounded-3xl overflow-hidden group"
            >
               <Image src={event.moments?.[3] || event.image} alt="Gallery 4" fill className="object-cover grayscale-[0.3] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-[1.5s]" />
            </motion.div>

          </div>
        </div>
      </section>

      {/* 4. Sequential Next-Event IntersectionCTA */}
      <section className="pt-40 container mx-auto max-w-7xl px-6 md:px-12">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="group relative overflow-hidden rounded-[3rem] border border-white/5 bg-zinc-900/40 p-16 md:p-32 text-center shadow-[0_0_80px_rgba(249,115,22,0.03)] transition-all hover:border-orange-500/20 hover:shadow-[0_0_100px_rgba(249,115,22,0.1)]"
          >
              <div aria-hidden className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,115,0,0.1)_0%,transparent_70%)] pointer-events-none" />
              
              <span className="text-[10px] font-black uppercase tracking-[0.5em] text-orange-500 mb-8 block">Advance To Next Setup</span>
              <h2 className="text-4xl md:text-6xl lg:text-7xl font-black mb-16 tracking-tighter text-white drop-shadow-xl">{nextEvent.title}</h2>
              
              <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                <Button 
                    variant="luxury" 
                    className="group px-12"
                    onClick={() => {
                        window.scrollTo(0, 0);
                        router.push(`/portfolio/${nextEvent.id}`);
                    }}
                >
                    <span className="mr-3">Explore Now</span>
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-2" />
                </Button>
                <Button 
                    variant="secondary"
                    className="px-10"
                    onClick={() => router.push("/portfolio")}
                >
                    Return to Index
                </Button>
              </div>
          </motion.div>
      </section>
    </div>
  );
}
