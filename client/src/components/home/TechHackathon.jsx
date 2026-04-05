"use client";

import { motion } from "framer-motion";
import { Cpu, Zap, Activity, Terminal as } from "lucide-react";
import Image from "next/image";
import { WordReveal } from "@/components/ui/ScrollReveal";

const features = [
  {
    title: "Innovation Sprints",
    description: "24-36 hour intense build windows with real-time mentor integration.",
    icon: Zap,
    color: "from-orange-600/20 to-amber-500/20"
  },
  {
    title: "Neural Infrastructure",
    description: "Dedicated low-latency 10Gbps zones for AI modeling and rapid deployment.",
    icon: Cpu,
    color: "from-blue-600/20 to-cyan-500/20"
  },
  {
    title: "Mainstage Pitching",
    description: "Multi-round judging sequences with high-fidelity production and live feedback.",
    icon: Activity,
    color: "from-purple-600/20 to-fuchsia-500/20"
  }
];

const Terminal = () => (
  <motion.div 
    initial={{ opacity: 0, x: 40, rotate: 2 }}
    whileInView={{ opacity: 1, x: 0, rotate: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 1.2, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
    className="absolute -bottom-12 -right-8 lg:-right-16 w-full max-w-md z-30 hidden md:block"
  >
    <div className="bg-[#0D0D0D]/90 backdrop-blur-2xl border border-white/10 rounded-2xl shadow-[0_40px_80px_rgba(0,0,0,0.8)] overflow-hidden">
      {/* Terminal Header */}
      <div className="flex items-center justify-between px-4 py-3 bg-white/5 border-b border-white/5">
        <div className="flex gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-[#FF5F56]" />
          <div className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E]" />
          <div className="w-2.5 h-2.5 rounded-full bg-[#27C93F]" />
        </div>
        <div className="text-[10px] font-mono text-zinc-500 tracking-widest uppercase">event_config.ts — evox-ventures</div>
        <div className="w-12" />
      </div>
      
      {/* Code Content */}
      <div className="p-6 font-mono text-xs leading-relaxed space-y-1">
        <div className="flex gap-4">
          <span className="text-zinc-700 w-4 select-none">1</span>
          <span className="text-purple-400">export <span className="text-blue-400">const</span> <span className="text-orange-400">HackathonConfig</span> = {"{"}</span>
        </div>
        <div className="flex gap-4">
          <span className="text-zinc-700 w-4 select-none">2</span>
          <span className="pl-4 text-zinc-400">status: <span className="text-green-400">&apos;LIVE_BUILD&apos;</span>,</span>
        </div>
        <div className="flex gap-4">
          <span className="text-zinc-700 w-4 select-none">3</span>
          <span className="pl-4 text-zinc-400">intensity: <span className="text-orange-400">100</span>,</span>
        </div>
        <div className="flex gap-4">
          <span className="text-zinc-700 w-4 select-none">4</span>
          <span className="pl-4 text-zinc-400">sprint_window: <span className="text-green-400">&apos;24H&apos;</span>,</span>
        </div>
        <div className="flex gap-4">
          <span className="text-zinc-700 w-4 select-none">5</span>
          <span className="pl-4 text-zinc-400">tracks: [<span className="text-green-400">&apos;AI&apos;</span>, <span className="text-green-400">&apos;WEB3&apos;</span>],</span>
        </div>
        <div className="flex gap-4">
          <span className="text-zinc-700 w-4 select-none">6</span>
          <span className="pl-4 text-zinc-400">mentor_support: <span className="text-blue-400">true</span>,</span>
        </div>
        <div className="flex gap-4">
          <span className="text-zinc-700 w-4 select-none">7</span>
          <span className="pl-4 text-zinc-400">final_pitch: <span className="text-blue-400">true</span></span>
        </div>
        <div className="flex gap-4">
          <span className="text-zinc-700 w-4 select-none">8</span>
          <span className="text-purple-400">{"}"};</span>
        </div>
        <div className="flex gap-4 pt-4 border-t border-white/5 mt-4">
          <span className="text-zinc-700 w-4 select-none">9</span>
          <span className="text-zinc-500 flex items-center gap-2">
            $ evox execute --build-mode immersive
            <motion.div 
              animate={{ opacity: [0, 1, 0] }}
              transition={{ duration: 1, repeat: Infinity }}
              className="w-1.5 h-4 bg-orange-500"
            />
          </span>
        </div>
      </div>
    </div>
  </motion.div>
);

export default function TechHackathon() {
  return (
    <section className="pt-20 pb-16 relative overflow-hidden section-blend bg-[#030303]">
      {/* Background Atmosphere */}
      <div className="absolute top-[20%] left-[10%] w-[400px] h-[400px] bg-orange-500/10 blur-[120px] rounded-full pointer-events-none -z-10" />
      
      {/* Floating Micro-Particles */}
      <div className="absolute inset-0 pointer-events-none opacity-20 -z-5">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-orange-400 rounded-full"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -40, 0],
              opacity: [0.2, 0.6, 0.2],
            }}
            transition={{
              duration: 5 + Math.random() * 5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.5,
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-24">
          <div className="lg:w-1/2">
            <motion.div
              initial={{ scale: 1 }}
              whileInView={{ scale: 1.02 }}
              transition={{ duration: 2, ease: [0.22, 1, 0.36, 1] }}
              className="relative"
            >
              {/* Luxury Eyebrow with Glow Dividers */}
              <div className="flex items-center gap-4 mb-8 group">
                <span className="w-12 h-[1px] bg-gradient-to-r from-transparent to-orange-500/60 transition-all duration-700 group-hover:w-16" />
                <span className="text-[11px] md:text-sm font-black uppercase tracking-[0.4em] text-orange-400 drop-shadow-[0_0_8px_rgba(251,146,60,0.4)]">
                  The Engineering Edge
                </span>
                <span className="w-12 h-[1px] bg-gradient-to-l from-transparent to-orange-500/60 transition-all duration-700 group-hover:w-16" />
              </div>

              {/* 3-Line Flagship Heading */}
              <div className="mb-10 cursor-default">
                {["Where Events", "Meet Pure", "Innovation"].map((line, i) => (
                  <div key={i} className="overflow-hidden py-1">
                    <motion.h2
                      initial={{ opacity: 0, y: 60, filter: "blur(10px)" }}
                      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                      viewport={{ once: true }}
                      transition={{ 
                        duration: 1.2, 
                        delay: i * 0.2, 
                        ease: [0.22, 1, 0.36, 1] 
                      }}
                      className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight leading-[1.1] bg-gradient-to-r from-white via-gray-100 to-orange-300 bg-clip-text text-transparent drop-shadow-[0_0_30px_rgba(255,140,0,0.2)] hover:drop-shadow-[0_0_40px_rgba(255,140,0,0.4)] transition-all duration-500"
                      style={{ 
                        backgroundSize: '200% 100%',
                        animation: 'textGradientShift 8s linear infinite'
                      }}
                    >
                      {line}
                    </motion.h2>
                  </div>
                ))}
              </div>
              
              <style jsx>{`
                @keyframes textGradientShift {
                  0% { background-position: 0% 50%; }
                  50% { background-position: 100% 50%; }
                  100% { background-position: 0% 50%; }
                }
              `}</style>
              
              <motion.div 
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.8, duration: 1 }}
                className="flex flex-wrap gap-3 mb-10"
              >
                {["24H SPRINT", "AI-FOCUS", "100+ TEAMS", "LIVE PITCHING"].map(tag => (
                  <span key={tag} className="px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-[10px] font-bold tracking-widest text-[#A1A1AA] uppercase">
                    {tag}
                  </span>
                ))}
              </motion.div>

              <motion.p 
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.9, duration: 1 }}
                className="text-lg text-zinc-400 mb-14 max-w-xl font-light leading-relaxed"
              >
                An intense innovation-driven experience where teams ideate, build, test, and pitch under pressure in a high-energy collaborative environment. We architect high-performance digital ecosystems for the next frontier of immersive live experience.
              </motion.p>

              <div className="grid gap-8">
                {features.map((feature, idx) => (
                  <motion.div
                    key={feature.title}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.15, duration: 0.8 }}
                  >
                    <div className="flex gap-8 group">
                      <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${feature.color} flex items-center justify-center shrink-0 border border-white/5 group-hover:scale-105 transition-transform duration-500`}>
                        <feature.icon className="w-7 h-7 text-white" />
                      </div>
                      <div className="flex flex-col justify-center">
                        <h3 className="text-lg font-bold text-white mb-1 tracking-tight">{feature.title}</h3>
                        <p className="text-zinc-500 leading-relaxed text-sm max-w-md italic">{feature.description}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>

          <div className="lg:w-1/2 relative pt-20 lg:pt-0">
            <div className="relative w-full max-w-xl mx-auto">
              <div className="absolute inset-[-15%] bg-gradient-to-tr from-orange-600/30 via-transparent to-purple-600/20 rounded-[3.5rem] blur-[100px] opacity-100 mix-blend-screen -z-10" />
              
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 40 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
                className="relative z-20 aspect-video rounded-[2.5rem] overflow-hidden border border-white/10 shadow-[0_40px_80px_rgba(0,0,0,0.8)] cinematic-image-wrapper"
              >
                <Image 
                  src="/images/hackathon.jpg" 
                  alt="Hack The Future Arena" 
                  fill 
                  className="object-cover contrast-110 saturate-125"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
              </motion.div>

              <Terminal />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
