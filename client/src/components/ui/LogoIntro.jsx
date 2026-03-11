"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

const STORAGE_KEY = "evox_intro_seen";

export default function LogoIntro() {
  const [visible, setVisible] = useState(false);
  const [phase, setPhase] = useState("enter"); // enter | glow | exit

  useEffect(() => {
    // Only show on first visit
    try {
      if (sessionStorage.getItem(STORAGE_KEY)) return;
    } catch (_) {}

    setVisible(true);

    // Sequence: enter(1.0s) → glow(0.8s) → exit(0.7s)
    const t1 = setTimeout(() => setPhase("glow"), 1000);
    const t2 = setTimeout(() => setPhase("exit"), 1900);
    const t3 = setTimeout(() => {
      setVisible(false);
      try { sessionStorage.setItem(STORAGE_KEY, "1"); } catch (_) {}
    }, 2700);

    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="intro"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          animate={phase === "exit" ? { opacity: 0 } : { opacity: 1 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-[#030303] pointer-events-none"
          aria-hidden="true"
        >
          {/* Ambient glow bloom */}
          <motion.div
            className="absolute rounded-full"
            initial={{ opacity: 0, scale: 0.6 }}
            animate={
              phase === "glow" || phase === "exit"
                ? { opacity: [0, 0.15, 0.08], scale: [0.6, 2.2, 2.6] }
                : { opacity: 0, scale: 0.6 }
            }
            transition={{ duration: 1.4, ease: "easeOut" }}
            style={{
              width: 400,
              height: 400,
              background: "radial-gradient(circle, rgba(249,115,22,0.5) 0%, transparent 70%)",
              filter: "blur(40px)",
            }}
          />

          {/* Logo mark */}
          <motion.div
            className="relative flex flex-col items-center gap-4"
            initial={{ opacity: 0, scale: 0.85, y: 8 }}
            animate={
              phase === "exit"
                ? { opacity: 0, scale: 1.06, y: -6 }
                : { opacity: 1, scale: phase === "glow" ? 1.04 : 1.0, y: 0 }
            }
            transition={
              phase === "exit"
                ? { duration: 0.7, ease: [0.22, 1, 0.36, 1] }
                : { duration: 0.9, ease: [0.22, 1, 0.36, 1] }
            }
          >
            <motion.div
              animate={
                phase === "glow"
                  ? { filter: "drop-shadow(0 0 24px rgba(249,115,22,0.9))" }
                  : { filter: "drop-shadow(0 0 10px rgba(249,115,22,0.4))" }
              }
              transition={{ duration: 0.8 }}
              className="relative w-80 h-40 sm:w-[32rem] sm:h-56"
            >
              <Image
                src="/logo.png"
                alt="Evox Ventures Logo"
                fill
                className="object-contain"
                priority
              />
            </motion.div>

            {/* Tagline */}
            <motion.p
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: phase === "enter" ? 0 : 0.4, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-zinc-500 text-[10px] uppercase tracking-[0.5em] font-semibold"
            >
              Premium Event Experiences
            </motion.p>
          </motion.div>

          {/* Bottom progress line */}
          <motion.div
            className="absolute bottom-0 left-0 h-[1px] bg-gradient-to-r from-transparent via-orange-500 to-transparent"
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{ scaleX: phase === "exit" ? 1 : phase === "glow" ? 0.7 : 0, opacity: 1 }}
            transition={{ duration: 1.2, ease: "easeInOut" }}
            style={{ width: "100%", transformOrigin: "left" }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
