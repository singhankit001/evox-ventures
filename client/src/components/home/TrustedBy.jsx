"use client";

import { motion } from "framer-motion";

const brands = [
  "TechCorp",
  "Apex Sports",
  "Horizon Finance",
  "Meridian Events",
  "Studio North",
  "Vertex Labs",
];

export default function TrustedBy() {
  return (
    <section id="trusted" className="relative overflow-hidden py-16 border-y border-white/[0.02] bg-white/[0.01]">
      <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-[var(--bg-deep)] to-transparent z-10 pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-[var(--bg-deep)] to-transparent z-10 pointer-events-none" />
      
      <div className="relative z-0 flex w-full overflow-hidden">
        <motion.div
          animate={{ x: [0, -1000] }}
          transition={{
            x: {
              repeat: Infinity,
              repeatType: "loop",
              duration: 25,
              ease: "linear",
            },
          }}
          className="flex whitespace-nowrap items-center gap-16 md:gap-32 pr-16 md:pr-32"
        >
          {/* Double array to create seamless loop */}
          {[...brands, ...brands, ...brands].map((name, i) => (
            <div
              key={`${name}-${i}`}
              className="group relative flex items-center justify-center grayscale opacity-40 transition-all duration-500 hover:grayscale-0 hover:opacity-100 cursor-default"
            >
              <h3 className="font-[family-name:var(--font-poppins)] text-3xl md:text-5xl font-black tracking-tighter text-white transition-colors duration-500 group-hover:text-orange-500 group-hover:drop-shadow-[0_0_20px_rgba(249,115,22,0.5)]">
                {name}
              </h3>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
