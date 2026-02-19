"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Sparkles, Target, Trophy, Shield, Users, ArrowRight, Zap, Globe } from "lucide-react";
import { Button } from "@/components/ui/Button";

const easePremium = [0.22, 1, 0.36, 1];

const WHY_CHOOSE_US = [
  {
    title: "Unmatched Execution",
    desc: "We don't leave things to chance. Every detail is engineered for high-performance impact.",
    icon: Target,
  },
  {
    title: "Cinematic Production",
    desc: "We blend spatial design and technical depth to create environments that command attention.",
    icon: Sparkles,
  },
  {
    title: "Elite Network",
    desc: "Global access to top-tier talent and premier venues, ensuring absolute exclusivity for every project.",
    icon: Globe,
  },
  {
    title: "Absolute Security",
    desc: "Discreet and robust. We manage extreme-scale environments with zero friction.",
    icon: Shield,
  }
];

export default function AboutPage() {
  return (
    <main className="bg-[var(--bg-deep)] min-h-screen overflow-hidden selection:bg-orange-500 selection:text-white">
      
      {/* 1. CINEMATIC HERO */}
      <section className="relative h-[90vh] w-full flex items-center justify-center overflow-hidden">
        {/* Animated color orbs */}
        <motion.div
          className="pointer-events-none absolute top-[-10%] right-[-10%] w-[600px] h-[600px] rounded-full"
          style={{ background: 'radial-gradient(ellipse, rgba(249,115,22,0.12) 0%, transparent 70%)' }}
          animate={{ x: [0, -60, 30, 0], y: [0, 40, -20, 0], scale: [1, 1.2, 0.9, 1] }}
          transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="pointer-events-none absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] rounded-full"
          style={{ background: 'radial-gradient(ellipse, rgba(124,58,237,0.08) 0%, transparent 70%)' }}
          animate={{ x: [0, 50, -30, 0], y: [0, -40, 20, 0], scale: [1.1, 0.9, 1.05, 1.1] }}
          transition={{ duration: 25, repeat: Infinity, ease: 'easeInOut' }}
        />
        <div className="absolute inset-0 z-0">
          <Image 
            src="/images/corporate-v3.jpg" 
            alt="Evox Cinematic Heritage" 
            fill 
            className="object-cover opacity-20 grayscale brightness-[0.4] contrast-125"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#030303] via-transparent to-[#030303]" />
        </div>
        
        <div className="container relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: easePremium }}
          >
            <span className="eyebrow mb-10 block">The Evox Standard</span>
            <h1 className="hero-headline mb-10 tracking-[-0.05em] leading-[0.9]">
              Blueprint for the <br />
              <span className="text-orange-500 italic">Extraordinary</span>
            </h1>
            <p className="mx-auto max-w-2xl text-xl text-zinc-500 font-light tracking-tight">
              We engineer luxury events and high-performance environments <br className="hidden md:block" />
              that redefine human interaction.
            </p>
          </motion.div>
        </div>
      </section>

      {/* 2. THE PHILOSOPHY */}
      <section className="section-padding relative section-blend section-glow overflow-hidden">
        {/* Amber accent orb */}
        <motion.div
          className="pointer-events-none absolute top-[-20%] right-[-5%] w-[500px] h-[500px] rounded-full"
          style={{ background: 'radial-gradient(ellipse, rgba(251,191,36,0.07) 0%, transparent 70%)' }}
          animate={{ x: [0, -40, 20, 0], y: [0, 30, -20, 0] }}
          transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
        />
        <div className="container relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-24">
            <motion.div 
              className="lg:w-1/2 relative aspect-[4/5] w-full cinematic-image-wrapper !rounded-[3rem] border border-white/5"
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1.5, ease: easePremium }}
            >
              <Image 
                src="/images/social-v3.jpg" 
                alt="Evox Narrative" 
                fill 
                className="object-cover cinematic-image grayscale opacity-60"
              />
              <div className="absolute bottom-10 left-10 p-10 glass-surface rounded-[2rem] border-white/10">
                <div className="text-4xl font-black text-white tracking-tighter mb-2">500+</div>
                <p className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-500">Global Operations Conducted</p>
              </div>
            </motion.div>

            <div className="lg:w-1/2">
              <div className="reveal-up">
                {/* Animated "We Don't Plan. We Architect." heading */}
                <div className="mb-10">
                  <div className="overflow-hidden">
                    <motion.h2
                      initial={{ opacity: 0, y: 50, filter: 'blur(10px)' }}
                      whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.2, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
                      className="text-4xl md:text-5xl font-black text-white tracking-tighter uppercase"
                    >
                      We Don&apos;t Plan.
                    </motion.h2>
                  </div>
                  <div className="overflow-hidden">
                    <motion.h2
                      initial={{ opacity: 0, y: 50, filter: 'blur(10px)' }}
                      whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.2, delay: 0.32, ease: [0.22, 1, 0.36, 1] }}
                      className="text-4xl md:text-5xl font-black tracking-tighter uppercase italic"
                      style={{
                        background: 'linear-gradient(90deg, #f97316, #fbbf24, #f97316)',
                        backgroundSize: '200% 100%',
                        animation: 'colorshift 3s linear infinite',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        backgroundClip: 'text',
                      }}
                    >
                      We Architect.
                    </motion.h2>
                  </div>
                </div>
                <div className="space-y-8 text-xl text-zinc-500 font-light leading-relaxed tracking-tight">
                  <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: 0.5 }}
                  >
                    Evox Ventures was founded on a singular premise: that the standard event model is obsolete. We operate at the intersection of technical logistics, spatial creativity, and social psychology.
                  </motion.p>
                  <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: 0.65 }}
                  >
                    Whether deploying a 10-gigabit infrastructure for a global hackathon or coordinating a high-security luxury retreat, we absorb the operational chaos so you can command the spotlight.
                  </motion.p>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: 0.8 }}
                    className="pt-10"
                  >
                    <Button href="/portfolio" variant="luxury" className="px-12">
                      Explore Our Works
                    </Button>
                  </motion.div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. THE CORE EDGE */}
      <section className="section-padding relative overflow-hidden bg-[var(--bg-main)] border-y border-white/5">
        {/* Colorful depth orbs */}
        <motion.div
          className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] rounded-full"
          style={{ background: 'radial-gradient(ellipse, rgba(249,115,22,0.06) 0%, transparent 70%)' }}
          animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="pointer-events-none absolute bottom-0 right-0 w-[500px] h-[500px] rounded-full"
          style={{ background: 'radial-gradient(ellipse, rgba(16,185,129,0.05) 0%, transparent 70%)' }}
          animate={{ x: [0, -30, 0], y: [0, -30, 0] }}
          transition={{ duration: 16, repeat: Infinity, ease: 'easeInOut' }}
        />
        <div className="container relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {WHY_CHOOSE_US.map((item, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1, duration: 1 }}
                className="group p-10 glass-surface rounded-[2rem] border-white/5 hover:border-orange-500/20 transition-all duration-700"
              >
                <div className="mb-8 flex h-16 w-16 items-center justify-center rounded-[1.25rem] bg-orange-500/10 text-orange-500 group-hover:scale-110 transition-transform duration-700">
                  <item.icon className="h-8 w-8" />
                </div>
                <h3 className="mb-4 text-xl font-black text-white tracking-tight uppercase italic">{item.title}</h3>
                <p className="text-sm text-zinc-500 leading-relaxed font-light">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. DOMAIN OVERVIEW */}
      <section className="section-padding overflow-hidden">
        <div className="container text-center">
          <motion.div
            className="reveal-up"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span className="eyebrow mb-10 block">Global Versatility</span>
            <h2 className="text-4xl md:text-5xl font-black text-white mb-16 tracking-tighter uppercase italic leading-tight">
              High-Velocity Domain <br /><span className="text-orange-500">Expertise</span>
            </h2>
            <div className="flex flex-wrap justify-center gap-6">
              {['Corporate Summits', 'Tech Hackathons', 'Music Festivals', 'Elite Club Nights', 'Live Sports Events', 'Luxury Retreats'].map((tag, idx) => (
                <div key={idx} className="px-8 py-4 rounded-full glass-surface border-white/5 text-[11px] font-black uppercase tracking-[0.3em] text-zinc-400 hover:text-white hover:border-orange-500/50 transition-all cursor-default">
                  {tag}
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* 5. Global FinalCTA handled in Layout */}
    </main>
  );
}
