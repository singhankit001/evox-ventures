"use client";

import Link from "next/link";
import Image from "next/image";
import { Mail, Phone, Instagram, Linkedin, Twitter, ArrowUpRight } from "lucide-react";

export default function Footer() {
  return (
    <footer className="relative bg-[#050505] pt-32 pb-10 overflow-hidden border-t border-white/[0.02]">
      {/* Massive Background Text */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full text-center pointer-events-none select-none overflow-hidden flex flex-col items-center justify-center opacity-[0.02]">
        <span className="text-[25vw] font-black leading-none tracking-tighter text-white">EVOX</span>
      </div>

      {/* Ambient Floor Glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3/4 h-[500px] bg-gradient-to-t from-orange-500/10 to-transparent blur-[120px] pointer-events-none" />

      <div className="container relative z-10 mx-auto max-w-7xl px-6 lg:px-8 flex flex-col">
        <div className="flex flex-col lg:flex-row justify-between items-start gap-16 lg:gap-24 mb-24">
          
          {/* Brand Manifesto */}
          <div className="lg:w-2/5 flex flex-col">
            <Link href="/" className="group flex flex-col w-fit mb-8" data-cursor-hover>
              <div className="relative h-12 w-48 mb-2">
                <Image
                  src="/logo.png"
                  alt="Evox Ventures"
                  fill
                  className="object-contain object-left filter contrast-125"
                />
              </div>
            </Link>
            
            <h3 className="text-2xl md:text-3xl font-black text-white tracking-tighter leading-[1.1] mb-6">
              Engineering the<br />
              <span className="text-orange-500">Unforgettable</span>
            </h3>
            
            <p className="max-w-md text-zinc-500 text-sm leading-relaxed font-light">
              We design and execute world-class experiences. From elite sporting tournaments to luxury club environments, we engineer every second for maximum impact.
            </p>
          </div>

          {/* Precision Links */}
          <div className="lg:w-3/5 grid grid-cols-2 md:grid-cols-3 gap-12 w-full">
            <div className="flex flex-col gap-6">
              <span className="text-[10px] font-black uppercase tracking-[0.3em] text-white/40">Navigation</span>
              <div className="flex flex-col gap-3">
                {["Home", "Portfolio", "Services", "About", "Contact"].map(link => (
                  <Link key={link} href={`/${link.toLowerCase() === 'home' ? '' : link.toLowerCase()}`} className="text-sm text-zinc-400 hover:text-white transition-colors duration-300 w-fit relative group">
                    <span className="relative z-10">{link}</span>
                    <span className="absolute -bottom-1 left-0 w-0 h-px bg-orange-500 transition-all duration-300 group-hover:w-full" />
                  </Link>
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-6">
              <span className="text-[10px] font-black uppercase tracking-[0.3em] text-white/40">Connect</span>
              <div className="flex flex-col gap-3">
                <a href="mailto:evoxventures2025@gmail.com" className="text-sm text-zinc-400 hover:text-white transition-colors duration-300 flex items-center gap-2 group">
                  <Mail size={14} className="text-orange-500/50 group-hover:text-orange-500 transition-colors" /> Mail
                </a>
                <a href="tel:+919545393239" className="text-sm text-zinc-400 hover:text-white transition-colors duration-300 flex items-center gap-2 group">
                  <Phone size={14} className="text-orange-500/50 group-hover:text-orange-500 transition-colors" /> Call
                </a>
              </div>
            </div>

            <div className="flex flex-col gap-6">
              <span className="text-[10px] font-black uppercase tracking-[0.3em] text-white/40">Social</span>
              <div className="flex flex-col gap-3">
                {[
                  { name: "Instagram", icon: Instagram, href: "https://www.instagram.com/evox_ventures/" },
                  { name: "Twitter", icon: Twitter },
                  { name: "LinkedIn", icon: Linkedin }
                ].map(social => (
                  <a
                    key={social.name}
                    href={social.href || "#"}
                    target={social.href ? "_blank" : undefined}
                    rel={social.href ? "noopener noreferrer" : undefined}
                    className="text-sm text-zinc-400 hover:text-white transition-colors duration-300 flex items-center gap-2 group"
                  >
                    <social.icon size={14} className="text-zinc-600 group-hover:text-white transition-colors" /> {social.name}
                  </a>
                ))}
              </div>
            </div>
          </div>

        </div>

        {/* Global Footer Baseline */}
        <div className="flex flex-col md:flex-row items-center justify-between pt-8 border-t border-white/[0.05] gap-6">
          <p className="text-[11px] font-semibold tracking-widest uppercase text-zinc-600">
            © {new Date().getFullYear()} Evox Ventures
          </p>
          <div className="flex gap-8">
            <Link href="/privacy" className="text-xs text-zinc-500 hover:text-white transition-colors">Privacy</Link>
            <Link href="/terms" className="text-xs text-zinc-500 hover:text-white transition-colors">Terms</Link>
          </div>
          <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-orange-500/50">
            Execution at Scale <ArrowUpRight size={12} className="text-orange-500" />
          </div>
        </div>
      </div>
    </footer>
  );
}
