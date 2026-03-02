"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import Link from "next/link";
import { useRef } from "react";

export function Button({
  children,
  href,
  onClick,
  variant = "primary",
  className = "",
  ...props
}) {
  const ref = useRef(null);
  
  // Magnetic Effect Logic — Heavily dampened for luxury feel
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  const springConfig = { stiffness: 100, damping: 20, mass: 0.1 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);
  
  const rotateX = useTransform(smoothY, [-100, 100], [8, -8]);
  const rotateY = useTransform(smoothX, [-100, 100], [-8, 8]);

  const handleMouseMove = (e) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    mouseX.set((e.clientX - centerX) * 0.4);
    mouseY.set((e.clientY - centerY) * 0.4);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  const variants = {
    primary: "bg-white text-black border-transparent hover:shadow-[0_0_40px_rgba(255,255,255,0.2)] hover:scale-105",
    secondary: "backdrop-blur-md border border-white/20 text-white hover:border-orange-500 hover:scale-105",
    flagship: "bg-gradient-to-r from-orange-500 to-amber-600 text-white border-white/20 hover:scale-105 active:scale-95 shadow-[0_0_30px_rgba(249,115,22,0.3)] hover:shadow-[0_0_50px_rgba(249,115,22,0.6)]",
    luxury: "bg-orange-500 hover:bg-orange-600 text-white border-transparent hover:shadow-[0_0_40px_rgba(255,115,0,0.6)] shadow-[0_0_20px_rgba(249,115,22,0.1)] hover:scale-105",
  };

  const content = (
    <motion.button
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.98 }}
      style={{
        x: smoothX,
        y: smoothY,
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      className={`relative inline-flex items-center justify-center rounded-full px-10 py-5 text-[11px] font-bold uppercase tracking-[0.3em] transition-all duration-300 border ${variants[variant] || variants.primary} ${className}`}
      onClick={onClick}
      {...props}
    >
      <span className="relative z-10 flex items-center gap-2">{children}</span>
      {(variant === "luxury" || variant === "flagship") && (
        <motion.div 
          className="absolute inset-0 rounded-full bg-gradient-to-r from-white/20 to-transparent opacity-0 transition-opacity duration-500 hover:opacity-100" 
          layoutId="btn-glow"
        />
      )}
      {variant === "flagship" && (
        <div className="absolute inset-0 rounded-full bg-orange-500/20 blur-md animate-pulse -z-10" />
      )}
    </motion.button>
  );

  if (href) {
    return (
      <Link href={href} className="inline-block no-underline">
        {content}
      </Link>
    );
  }

  return content;
}
