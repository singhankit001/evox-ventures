"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Quote, Star } from "lucide-react";
import { useEffect, useState } from "react";
import Image from "next/image";
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

  useEffect(() => {
    const t = setInterval(() => setI((x) => (x + 1) % items.length), 6000);
    return () => clearInterval(t);
  }, []);

  const prev = () => setI((x) => (x - 1 + items.length) % items.length);
  const next = () => setI((x) => (x + 1) % items.length);

  return (
    <section id="testimonials" className="relative section-padding">
      <div className="container relative z-10 mx-auto max-w-3xl px-4 md:px-6">
        <ScrollReveal className="mb-12 text-center">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.35em] text-orange-400/90">
            Voices
          </p>
          <h2 className="font-[family-name:var(--font-poppins)] text-3xl font-bold tracking-tight text-white md:text-4xl">
            What clients say
          </h2>
        </ScrollReveal>

        <Card hoverable={false} className="relative p-8 md:p-14">
          <Quote className="absolute right-8 top-8 h-10 w-10 text-orange-500/20 md:h-14 md:w-14" />

          <div className="relative min-h-[220px] md:min-h-[200px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={i}
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -40 }}
                transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                className="text-center flex flex-col items-center"
              >
                <div className="flex gap-1 mb-8 justify-center text-[#FF6A00]">
                  <Star className="w-5 h-5 fill-current" />
                  <Star className="w-5 h-5 fill-current" />
                  <Star className="w-5 h-5 fill-current" />
                  <Star className="w-5 h-5 fill-current" />
                  <Star className="w-5 h-5 fill-current" />
                </div>
                <p className="mb-10 font-[family-name:var(--font-poppins)] text-lg leading-[1.6] text-white/80 md:text-xl md:leading-[1.8] max-w-2xl">
                  &quot;{items[i].quote}&quot;
                </p>
                <div className="flex flex-col items-center justify-center gap-4 text-center">
                  <div className="h-14 w-14 overflow-hidden rounded-full border border-white/10 ring-2 ring-white/5">
                    <Image src={items[i].photo} alt={items[i].name} width={56} height={56} className="object-cover" />
                  </div>
                  <div>
                    <p className="font-semibold text-white/95 leading-tight">{items[i].name}</p>
                    <p className="text-sm text-white/50 leading-tight mt-1">{items[i].role}</p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="mt-12 flex items-center justify-center gap-6">
            <button
              type="button"
              onClick={prev}
              className="rounded-full border border-white/10 bg-white/[0.03] p-3 text-white transition duration-200 hover:border-[#FF6A00]/40 hover:bg-[#FF6A00]/10 hover:scale-[1.05]"
              aria-label="Previous testimonial"
              data-cursor-hover
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <div className="flex gap-3">
              {items.map((_, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setI(idx)}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    idx === i ? "w-8 bg-[#FF6A00] shadow-[0_0_12px_rgba(255,106,0,0.5)]" : "w-2 bg-white/20 hover:bg-white/40"
                  }`}
                  aria-label={`Go to slide ${idx + 1}`}
                  data-cursor-hover
                />
              ))}
            </div>
            <button
              type="button"
              onClick={next}
              className="rounded-full border border-white/10 bg-white/[0.03] p-3 text-white transition duration-200 hover:border-[#FF6A00]/40 hover:bg-[#FF6A00]/10 hover:scale-[1.05]"
              aria-label="Next testimonial"
              data-cursor-hover
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </Card>
      </div>
    </section>
  );
}
