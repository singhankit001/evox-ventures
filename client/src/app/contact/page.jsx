"use client";

import ContactForm from "@/components/ui/ContactForm";
import { motion } from "framer-motion";
import Image from "next/image";
import { Mail, Phone, MapPin, Globe, MessageSquare } from "lucide-react";

const CONTACT_INFO = [
  {
    icon: Mail,
    title: "Digital Correspondence",
    value: "evoxventures2025@gmail.com",
    href: "mailto:evoxventures2025@gmail.com"

  },
  {
    icon: Phone,
    title: "Direct Intelligence",
    value: "+91 95453 93239",
    href: "tel:+919545393239"
  },
  {
    icon: MapPin,
    title: "Global Command",
    value: "Pune, Maharashtra, India",
    href: null
  }
];

export default function ContactPage() {
  return (
    <main className="bg-[var(--bg-deep)] min-h-screen overflow-hidden selection:bg-orange-500 selection:text-white">
      
      {/* 1. CINEMATIC HERO */}
      <section className="relative h-[60vh] w-full flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(249,115,22,0.08)_0%,transparent_70%)]" />
        </div>
        
        <div className="container relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="eyebrow mb-10 block">Direct Engagement</span>
            <h1 className="hero-headline mb-10 tracking-[-0.05em] leading-[0.9]">
              Let&apos;s Engineering <br />
              <span className="text-orange-500 italic">Your Narrative</span>
            </h1>
          </motion.div>
        </div>
      </section>

      {/* 2. CONTACT ARCHITECTURE */}
      <section className="section-padding relative z-10 section-blend-bottom">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-24 items-start">
            
            {/* Left: Narrative & Info */}
            <div className="lg:col-span-5 flex flex-col gap-16">
              <motion.div
                initial={{ opacity: 0, x: -40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1.2 }}
              >
                <div className="flex flex-col space-y-10">
                  <div>
                    <h2 className="text-4xl font-black text-white mb-8 tracking-tighter uppercase italic">Direct Channels</h2>
                    <p className="text-xl text-zinc-500 font-light leading-relaxed tracking-tight max-w-md">
                      Reach our strategic managers directly. We maintain a 24-hour response protocol for all elite inquiries.
                    </p>
                  </div>

                  <div className="flex flex-col gap-10">
                    {CONTACT_INFO.map((info, idx) => (
                      <div key={idx} className="flex items-start gap-6 group">
                        <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-[1.25rem] glass-surface border-white/5 text-orange-500 group-hover:scale-110 transition-transform duration-700">
                          <info.icon className="h-6 w-6" />
                        </div>
                        <div className="flex flex-col pt-1">
                          <p className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-600 mb-2">{info.title}</p>
                          {info.href ? (
                            <a href={info.href} className="text-xl font-light text-white hover:text-orange-500 transition-colors tracking-tight">
                              {info.value}
                            </a>
                          ) : (
                            <p className="text-xl font-light text-white tracking-tight">{info.value}</p>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>

              {/* Visual Global Reach */}
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1.5, delay: 0.2 }}
                className="cinematic-image-wrapper aspect-[16/10] border border-white/5 relative"
              >
                <Image 
                  src="/images/corporate-v3.jpg" 
                  alt="Global Operational Reach"
                  fill
                  className="object-cover grayscale opacity-40"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-deep)] via-transparent to-transparent" />
                <div className="absolute inset-0 flex items-center justify-center">
                   <div className="relative flex h-20 w-20 items-center justify-center rounded-full bg-orange-500/10 text-orange-500">
                      <Globe className="h-8 w-8 animate-pulse" />
                      <span className="absolute inset-0 rounded-full border border-orange-500/40 animate-ping" />
                   </div>
                </div>
              </motion.div>
            </div>

            {/* Right: Interaction Layer */}
            <div className="lg:col-span-7">
              <motion.div
                initial={{ opacity: 0, x: 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1.2 }}
              >
                <ContactForm />
              </motion.div>
            </div>

          </div>
        </div>
      </section>

      {/* 3. LOGISTICAL NOTES */}
      <section className="py-32 border-t border-white/5">
        <div className="container text-center">
            <div className="inline-flex items-center gap-4 text-zinc-600 font-bold uppercase tracking-[0.4em] text-[10px]">
               <MessageSquare className="w-4 h-4 text-orange-500" />
               SECURE 256-BIT ENCRYPTED CHANNEL
            </div>
        </div>
      </section>

    </main>
  );
}
