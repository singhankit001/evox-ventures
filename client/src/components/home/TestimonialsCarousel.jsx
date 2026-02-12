"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Quote, Star, User } from "lucide-react";
import { useEffect, useState } from "react";
import ScrollReveal from "@/components/ui/ScrollReveal";
import { Card } from "@/components/ui/Card";

const items = [
  {
    quote:
      "Evox delivered beyond our expectations—the entire production felt effortless on our side.",
    name: "Priya Sharma",
    role: "VP Marketing, TechCorp India",
    photo: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&h=150&fit=crop&q=80",
  },
  {
    quote:
      "From venue to talent to budget, every detail was handled with precision and transparency.",
    name: "James Mitchell",
    role: "Director of Operations, Apex Sports",
    photo: "https://images.unsplash.com/photo-1556157382-97eda2d62296?w=150&h=150&fit=crop&q=80",
  },
  {
    quote:
      "Our gala raised the bar for what a corporate event can feel like. Truly unforgettable.",
    name: "Ananya Desai",
    role: "Chief of Staff, Horizon Finance",
    photo: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&h=150&fit=crop&q=80",
  },
];

export default function TestimonialsCarousel() {
  const [i, setI] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (isHovered) return;
    const t = setInterval(() => setI((x) => (x + 1) % items.length), 8000);
    return () => clearInterval(t);
  }, [isHovered]);

  const prev = () => setI((x) => (x - 1 + items.length) % items.length);
  const next = () => setI((x) => (x + 1) % items.length);

  return (
    <section id="testimonials" className="relative pt-24 pb-32 overflow-hidden section-blend">
      {/* Dynamic Background Halo */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-orange-600/5 blur-[120px] rounded-full pointer-events-none -z-10" />
      
      {/* Floating Micro-Particles */}
      <div className="absolute inset-0 pointer-events-none opacity-20 -z-5">
        {[...Array(8)].map((_, idx) => (
          <motion.div
            key={idx}
            className="absolute w-1 h-1 bg-orange-400 rounded-full"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.1, 0.4, 0.1],
            }}
            transition={{
              duration: 4 + Math.random() * 4,
              repeat: Infinity,
              ease: "easeInOut",
              delay: idx * 0.3,
            }}
          />
        ))}
      </div>

      <div className="container relative z-10 mx-auto max-w-5xl px-6 md:px-12">
        <ScrollReveal className="mb-16 text-center">
          <div className="flex items-center justify-center gap-4 mb-6">
            <span className="w-8 h-[1px] bg-orange-500/40" />
            <span className="text-[11px] font-black uppercase tracking-[0.4em] text-orange-400">
              Voices
            </span>
            <span className="w-8 h-[1px] bg-orange-500/40" />
          </div>
          <h2 className="text-4xl md:text-6xl font-bold tracking-tighter text-white">
            What clients say
          </h2>
        </ScrollReveal>

        <motion.div 
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className="relative max-w-4xl mx-auto"
        >
          {/* Main Testimonial Card (Glassmorphism Monolith) */}
          <Card 
            hoverable={false} 
            className="relative p-12 md:p-20 bg-white/[0.02] backdrop-blur-3xl border-white/[0.05] shadow-[0_40px_100px_rgba(0,0,0,0.6)] overflow-hidden"
          >
            {/* Background Texture Overlay */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,115,0,0.03),transparent_40%)]" />
            
            <AnimatePresence mode="wait">
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30, filter: "blur(15px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, y: -30, filter: "blur(10px)" }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                className="relative text-center flex flex-col items-center"
              >
                {/* Elite Rating Sequence */}
                <motion.div 
                   initial={{ scale: 0.8, opacity: 0 }}
                   animate={{ scale: 1, opacity: 1 }}
                   transition={{ delay: 0.3 }}
                   className="flex gap-1.5 mb-10 text-[#FF6A00] drop-shadow-[0_0_12px_rgba(255,106,0,0.3)]"
                >
                  {[...Array(5)].map((_, s) => (
                    <Star key={s} className="w-4 h-4 fill-current transition-transform group-hover:scale-110" />
                  ))}
                </motion.div>

                {/* Flagship Quote Typography */}
                <h3 className="mb-14 text-2xl md:text-4xl lg:text-[2.75rem] font-bold leading-[1.25] tracking-tight bg-gradient-to-r from-white via-zinc-300 to-orange-200 bg-clip-text text-transparent hover:drop-shadow-[0_0_30px_rgba(255,115,0,0.15)] transition-all duration-500"
                    style={{ 
                      backgroundSize: '200% 100%',
                      animation: 'testimonialGradient 10s linear infinite'
                    }}
                >
                  &quot;{items[i].quote}&quot;
                </h3>

                {/* Executive Signature */}
                <motion.div 
                   initial={{ opacity: 0, x: 20 }}
                   animate={{ opacity: 1, x: 0 }}
                   transition={{ delay: 0.6 }}
                   className="flex flex-col items-center gap-6"
                >
                  {/* Photo with subtle orbit ring */}
                  <div className="relative group">
                    <div className="absolute inset-[-4px] rounded-full bg-gradient-to-r from-orange-500/20 to-transparent animate-spin-slow opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                    <div className="h-16 w-16 overflow-hidden rounded-full border border-white/10 ring-4 ring-white/5 bg-zinc-900 shadow-2xl relative z-10">
                      <img 
                        src={items[i].photo} 
                        alt={items[i].name} 
                        className="w-full h-full object-cover grayscale-[0.2] hover:grayscale-0 transition-all duration-500"
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-1">
                    <p className="text-lg font-black text-white/95 uppercase tracking-[0.2em]">{items[i].name}</p>
                    <p className="text-[11px] font-bold text-orange-400 uppercase tracking-[0.3em]">{items[i].role}</p>
                  </div>
                </motion.div>
              </motion.div>
            </AnimatePresence>

            <style jsx>{`
              @keyframes testimonialGradient {
                0% { background-position: 0% 50%; }
                50% { background-position: 100% 50%; }
                100% { background-position: 0% 50%; }
              }
              .animate-spin-slow {
                animation: spin 8s linear infinite;
              }
              @keyframes spin {
                from { transform: rotate(0deg); }
                to { transform: rotate(360deg); }
              }
            `}</style>
          </Card>

          {/* Luxury Navigation Cluster */}
          <div className="mt-12 flex flex-col md:flex-row items-center justify-between gap-8 px-6">
            <div className="flex items-center gap-10">
              <motion.button
                whileHover={{ scale: 1.1, x: -5 }}
                whileTap={{ scale: 0.9 }}
                onClick={prev}
                className="group flex items-center gap-3 text-zinc-500 hover:text-white transition-colors duration-300"
              >
                <ChevronLeft className="h-6 w-6 group-hover:text-orange-500 transition-colors" />
                <span className="hidden md:block text-[10px] font-black uppercase tracking-[0.3em]">Prev</span>
              </motion.button>

              <div className="flex gap-4 items-center">
                {items.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setI(idx)}
                    className="relative p-2 group"
                  >
                    <motion.div
                      className={`h-[3px] rounded-full transition-all duration-500 ${
                        idx === i ? "w-10 bg-orange-500 shadow-[0_0_15px_rgba(251,146,60,0.5)]" : "w-4 bg-white/10 group-hover:bg-white/30"
                      }`}
                    />
                  </button>
                ))}
              </div>

              <motion.button
                whileHover={{ scale: 1.1, x: 5 }}
                whileTap={{ scale: 0.9 }}
                onClick={next}
                className="group flex items-center gap-3 text-zinc-500 hover:text-white transition-colors duration-300"
              >
                <span className="hidden md:block text-[10px] font-black uppercase tracking-[0.3em]">Next</span>
                <ChevronRight className="h-6 w-6 group-hover:text-orange-500 transition-colors" />
              </motion.button>
            </div>

            <div className="text-[10px] font-black uppercase tracking-[0.5em] text-white/20 select-none">
              Evox // Voices 0{i + 1}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
