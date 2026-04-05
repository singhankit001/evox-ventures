"use client";

import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from "framer-motion";
import { ArrowRight} from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { Button } from "@/components/ui/Button";
import Image from "next/image";
import ParticleField from "@/components/ui/ParticleField";
import { AnimatePresence } from "framer-motion";

const easePremium = [0.22, 1, 0.36, 1];

const HEADLINES = [
  { light: "Creating", bold: "Unforgettable Experiences" },
  { light: "Engineering", bold: "Cinematic Moments" },
  { light: "Designing", bold: "Luxury Celebrations" },
  { light: "Curating", bold: "Elite Events" },
  { light: "Redefining", bold: "Premium Gatherings" }
];

export default function Hero() {
  const reduceMotion = useReducedMotion();
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const [particleCount, setParticleCount] = useState(60);
  const [headlineIdx, setHeadlineIdx] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setHeadlineIdx((prev) => (prev + 1) % HEADLINES.length);
    }, 4500);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const updateParticleCount = () => {
      setParticleCount(window.innerWidth > 1024 ? 180 : 60);
    };
    updateParticleCount();
    window.addEventListener("resize", updateParticleCount);
    return () => window.removeEventListener("resize", updateParticleCount);
  }, []);

  const springConfig = { stiffness: 40, damping: 25, mass: 1 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  const bgX = useTransform(smoothX, (v) => v * -0.04);
  const bgY = useTransform(smoothY, (v) => v * -0.04);
  const midX = useTransform(smoothX, (v) => v * 0.08);
  const midY = useTransform(smoothY, (v) => v * 0.08);
  const frontX = useTransform(smoothX, (v) => v * 0.15);
  const frontY = useTransform(smoothY, (v) => v * 0.15);
  const frontXNeg = useTransform(frontX, (v) => -v);
  const frontYNeg = useTransform(frontY, (v) => -v);

  const onMouseMove = useCallback(
    (e) => {
      if (reduceMotion) return;
      const x = (e.clientX / window.innerWidth - 0.5) * 100;
      const y = (e.clientY / window.innerHeight - 0.5) * 100;
      mouseX.set(x);
      mouseY.set(y);
    },
    [reduceMotion, mouseX, mouseY]
  );

  return (
    <section
      className="relative min-h-screen w-full overflow-hidden bg-[var(--bg-deep)]"
      onMouseMove={onMouseMove}
    >
      {/* Cinematic background */}
      <motion.div
        className="absolute inset-[-10%] z-0 h-[120%] w-[120%] will-change-transform"
        style={!reduceMotion ? { x: bgX, y: bgY } : undefined}
      >
        <Image
          src="/images/social-poster.jpg"
          alt=""
          fill
          priority
          className="object-cover opacity-30 grayscale-[0.2] brightness-[0.55] contrast-110 scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/70 to-black" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_30%,transparent_0%,rgba(0,0,0,0.5)_70%)]" />
      </motion.div>

      {!reduceMotion && <ParticleField count={particleCount} />}

      {/* Film Grain Texture Overlay */}
      <div className="pointer-events-none absolute inset-0 z-[15] opacity-[0.03] mix-blend-overlay">
        <div className="absolute inset-0 bg-[url('https://grain-y.com/assets/images/grain-dark.png')] animate-grain" />
      </div>

      <motion.div
        className="pointer-events-none absolute left-1/2 top-1/3 z-[12] h-[400px] w-[min(600px,90vw)] -translate-x-1/2 -translate-y-1/2 rounded-full bg-orange-500/10 blur-[150px]"
        style={!reduceMotion ? { x: midX, y: midY } : undefined}
      />

      {/* Bottom Vignette for Seamless Blending */}
      <div className="absolute bottom-0 left-0 right-0 h-96 z-20 bg-gradient-to-t from-[var(--bg-deep)] to-transparent" />

      <div className="relative z-30 mx-auto flex min-h-screen max-w-6xl flex-col justify-center items-center px-6 pb-48 pt-28 md:py-32 text-center">
        <div className="relative w-full max-w-4xl">


          {/* Cinematic Rotating Heading */}
          <div className="relative min-h-[160px] md:min-h-[200px] lg:min-h-[280px] flex items-center justify-center">

            {/* Ambient glow pulse — breathes on each transition */}
            <motion.div
              key={`glow-${headlineIdx}`}
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: [0, 0.35, 0.2], scale: [0.6, 1.4, 1.1] }}
              transition={{ duration: 2.2, ease: easePremium }}
              className="pointer-events-none absolute inset-0 rounded-full bg-orange-500/20 blur-[80px] -z-10"
            />

            <AnimatePresence mode="wait">
              <motion.h1
                key={headlineIdx}
                initial="hidden"
                animate="show"
                exit="exit"
                variants={{
                  hidden: { opacity: 0 },
                  show: { opacity: 1, transition: { staggerChildren: 0.06, delayChildren: 0 } },
                  exit: { opacity: 0, transition: { duration: 0.4, ease: easePremium } }
                }}
                className="flex flex-col items-center justify-center gap-3 tracking-tighter drop-shadow-2xl"
              >
                {/* Light verb — character by character stagger */}
                <motion.div
                  variants={{
                    hidden: {},
                    show: { transition: { staggerChildren: 0.04, delayChildren: 0 } },
                    exit: {}
                  }}
                  className="relative flex gap-[0.06em] overflow-hidden py-1"
                >
                  {HEADLINES[headlineIdx].light.split("").map((char, i) => (
                    <motion.span
                      key={i}
                      variants={{
                        hidden: { y: "110%", opacity: 0, rotateX: -60 },
                        show: {
                          y: 0,
                          opacity: 1,
                          rotateX: 0,
                          transition: { duration: 0.7, ease: easePremium }
                        },
                        exit: {
                          y: "-110%",
                          opacity: 0,
                          transition: { duration: 0.35, ease: easePremium }
                        }
                      }}
                      className="inline-block text-2xl md:text-3xl lg:text-[2.4rem] font-extralight tracking-[0.35em] uppercase bg-gradient-to-r from-amber-300 via-orange-400 to-rose-400 bg-clip-text text-transparent"
                      style={{ transformOrigin: "bottom" }}
                    >
                      {char === " " ? "\u00A0" : char}
                    </motion.span>
                  ))}

                  {/* Shimmer sweep across the light word */}
                  <motion.span
                    initial={{ x: "-100%", opacity: 0 }}
                    animate={{ x: "200%", opacity: [0, 0.6, 0] }}
                    transition={{ duration: 0.9, delay: HEADLINES[headlineIdx].light.length * 0.04 + 0.3, ease: "easeOut" }}
                    className="pointer-events-none absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent skew-x-[-20deg]"
                  />
                </motion.div>

                {/* Bold phrase — word-by-word mask clip from below */}
                <motion.div
                  variants={{
                    hidden: {},
                    show: { transition: { staggerChildren: 0.1, delayChildren: 0.3 } },
                    exit: {}
                  }}
                  className="flex flex-wrap justify-center gap-x-[0.2em] gap-y-1"
                >
                  {HEADLINES[headlineIdx].bold.split(" ").map((word, i) => (
                    <div key={i} className="overflow-hidden py-2">
                      <motion.span
                        variants={{
                          hidden: { y: "105%", opacity: 0, filter: "blur(10px)", scale: 0.95 },
                          show: {
                            y: 0,
                            opacity: 1,
                            filter: "blur(0px)",
                            scale: 1,
                            transition: { duration: 1.1, ease: easePremium }
                          },
                          exit: {
                            y: "-105%",
                            opacity: 0,
                            filter: "blur(8px)",
                            transition: { duration: 0.5, ease: easePremium }
                          }
                        }}
                        className="inline-block text-[3.2rem] sm:text-6xl md:text-7xl lg:text-[7.6rem] font-black leading-[0.95] bg-gradient-to-br from-white via-zinc-100 to-zinc-400 bg-clip-text text-transparent"
                      >
                        {word}
                      </motion.span>
                    </div>
                  ))}
                </motion.div>
              </motion.h1>
            </AnimatePresence>
          </div>


          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.6, ease: easePremium }}
            className="mx-auto mt-10 max-w-xl text-center text-base md:text-lg font-light leading-[1.8] text-zinc-400"
          >
            From adrenaline-fueled sports festivals to ultra-exclusive elite gatherings. We engineer high-end environments that redefine the boundaries of luxury live production, ensuring every second is orchestrated for absolute perfection.
          </motion.p>

          {/* Premium CTA Group — Stacked Layout */}
          <div className="mt-14 flex flex-col items-center justify-center gap-6">
            {/* Primary Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, delay: 0.8, ease: easePremium }}
            >
              <Button
                href="/quotation"
                variant="luxury"
                className="group relative px-10 py-6 text-base tracking-[0.2em] font-bold bg-gradient-to-r from-orange-500 via-orange-400 to-amber-500 shadow-[0_0_40px_rgba(255,140,0,0.4)] hover:shadow-[0_0_60px_rgba(255,140,0,0.7)] transition-all duration-700 hover:scale-105 active:scale-95 border-transparent outline-none ring-0"
              >
                <span className="relative z-10 flex items-center gap-3">
                  INITIALIZE PROJECT <ArrowRight className="h-4 w-4 transition-transform duration-500 group-hover:translate-x-2" />
                </span>
                {/* Magnetic-style subtle radial glow behind button */}
                <div className="absolute inset-0 rounded-full bg-orange-500/10 blur-2xl group-hover:bg-orange-500/20 transition-all duration-700 pointer-events-none -z-10" />
              </Button>
            </motion.div>

            {/* Secondary Subtitle — 'Begin Sequence' */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 0.7, y: 0 }}
              whileHover={{ opacity: 1 }}
              transition={{ 
                opacity: { duration: 1, delay: 1.1 },
                y: { duration: 1.2, delay: 1.1, ease: easePremium }
              }}
              className="flex flex-col items-center gap-4 cursor-default group/seq"
            >
              <span
                className="text-xs font-medium uppercase tracking-[0.4em] text-zinc-500 transition-colors duration-500 group-hover/seq:text-orange-400"
                style={{ marginRight: "-0.4em" }}
              >
                Begin Sequence
              </span>
              <div className="relative h-12 w-px overflow-hidden bg-white/10">
                <motion.div
                  animate={{ y: ["-100%", "100%"] }}
                  transition={{ duration: 2.5, repeat: Infinity, ease: "linear" }}
                  className="absolute inset-0 h-full w-full bg-gradient-to-b from-transparent via-orange-500 to-transparent"
                />
              </div>
            </motion.div>
          </div>
        </div>


      </div>


    </section>
  );
}
