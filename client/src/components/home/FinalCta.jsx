"use client";

import ScrollReveal from "@/components/ui/ScrollReveal";
import { Button } from "@/components/ui/Button";

export default function FinalCta() {
  return (
    <section id="cta" className="relative py-40 md:py-56 bg-[#030303] overflow-hidden">
      {/* Massive Ambient Radial Grade */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[radial-gradient(ellipse_at_center,rgba(255,115,0,0.15)_0%,transparent_70%)] blur-[100px] pointer-events-none" />
      
      <div className="container relative z-10 mx-auto px-6 text-center">
        <ScrollReveal className="flex flex-col items-center">
          <div className="h-24 w-px bg-gradient-to-b from-transparent via-orange-500 to-transparent mb-12 animate-pulse" />
          
          <h2 className="relative mx-auto max-w-4xl text-5xl font-black tracking-tighter text-white md:text-7xl lg:text-[6rem] drop-shadow-[0_0_40px_rgba(255,255,255,0.1)] leading-[1.05]">
            Let's Build Something <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-orange-600">Extraordinary.</span>
          </h2>
          
          <p className="relative mx-auto mt-10 max-w-2xl text-xl font-light leading-relaxed text-zinc-400 mb-16">
            Join the elite tier of brands relying on Evox Ventures for high-stakes, flawlessly executed live experiences.
          </p>

          <Button 
            href="/quotation" 
            variant="luxury" 
            className="relative px-12 py-5 text-xl tracking-[0.2em] font-bold shadow-[0_0_60px_rgba(249,115,22,0.4)] hover:shadow-[0_0_100px_rgba(249,115,22,0.7)] transition-all duration-700 hover:scale-105" 
            data-cursor-hover
          >
            Initiate Project
          </Button>
        </ScrollReveal>
      </div>
    </section>
  );
}
