"use client";

import React, { useRef, useEffect, useCallback } from "react";
import { useReducedMotion } from "framer-motion";

const ParticleField = ({ color = "#F97316", count = 60, interactionRadius = 150 }) => {
  const canvasRef = useRef(null);
  const particles = useRef([]);
  const mouse = useRef({ x: -9999, y: -9999 });
  const requestRef = useRef();
  const shouldReduceMotion = useReducedMotion();

  function makeParticle(cw, ch) {
    return {
      homeX: Math.random() * cw,
      homeY: Math.random() * ch,
      x: Math.random() * cw,
      y: Math.random() * ch,
      vx: 0,
      vy: 0,
      radius: Math.random() * 1.2 + 0.4,
      depth: Math.random() * 0.6 + 0.4,
      opacity: Math.random() * 0.4 + 0.1,
      color: Math.random() > 0.8 ? color : "#FFFFFF",
      driftSeed: Math.random() * Math.PI * 2,
    };
  }

  function updateParticle(p, mx, my, time) {
    const ax = Math.sin(time * 0.0008 + p.driftSeed) * 0.15;
    const ay = Math.cos(time * 0.0008 + p.driftSeed) * 0.15;
    let fx = ax, fy = ay;

    const dx = mx - p.x;
    const dy = my - p.y;
    const distSq = dx * dx + dy * dy;
    const r2 = interactionRadius * interactionRadius;

    if (distSq < r2) {
      const dist = Math.sqrt(distSq);
      const inf = (1 - dist / interactionRadius) ** 2;
      fx += (dx / dist) * 0.04 * inf * p.depth * 5;
      fy += (dy / dist) * 0.04 * inf * p.depth * 5;
    }

    fx += (p.homeX - p.x) * 0.018;
    fy += (p.homeY - p.y) * 0.018;

    p.vx = (p.vx + fx) * 0.9;
    p.vy = (p.vy + fy) * 0.9;
    p.x += p.vx;
    p.y += p.vy;
  }

  const initParticles = useCallback((w, h) => {
    const isMobile = w < 768;
    const cap = shouldReduceMotion ? 0 : isMobile ? Math.min(20, count) : Math.min(60, count);
    particles.current = Array.from({ length: cap }, () => makeParticle(w, h));
  }, [count, shouldReduceMotion, color]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    const setSize = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      const dpr = window.devicePixelRatio || 1;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = w + "px";
      canvas.style.height = h + "px";
      ctx.scale(dpr, dpr);
      initParticles(w, h);
    };

    setSize();
    window.addEventListener("resize", setSize, { passive: true });
    const onMouse = (e) => { mouse.current = { x: e.clientX, y: e.clientY }; };
    window.addEventListener("mousemove", onMouse, { passive: true });

    const render = (time) => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const { x: mx, y: my } = mouse.current;
      for (const p of particles.current) {
        updateParticle(p, mx, my, time);
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.opacity;
        ctx.fill();
      }
      ctx.globalAlpha = 1;
      requestRef.current = requestAnimationFrame(render);
    };

    requestRef.current = requestAnimationFrame(render);

    return () => {
      window.removeEventListener("resize", setSize);
      window.removeEventListener("mousemove", onMouse);
      cancelAnimationFrame(requestRef.current);
    };
  }, [initParticles]);

  if (shouldReduceMotion) return null;

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none absolute inset-0 z-[5] opacity-40 block"
      style={{ mixBlendMode: "screen" }}
    />
  );
};

export default ParticleField;
