"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState, useMemo } from "react";
import ScrollReveal from "@/components/ui/ScrollReveal";
import { Code2, Cpu, Zap, GitBranch, Terminal } from "lucide-react";

const CODE_LINES = [
  { code: "function buildFuture() {", delay: 0 },
  { code: "  const innovation = true;", delay: 0.3 },
  { code: "  const team = await Evox.assemble();", delay: 0.6 },
  { code: "  AI.start({ mode: 'unstoppable' });", delay: 0.9 },
  { code: "  deploy('ideas', { env: 'production' });", delay: 1.2 },
  { code: "  return success;", delay: 1.5 },
  { code: "}", delay: 1.8 },
  { code: "buildFuture(); // 🚀", delay: 2.1 },
];

const TERMINAL_SEQUENCE = [
  { text: "> initializing hackathon 2026...", color: "text-zinc-400", delay: 0 },
  { text: "> loading 120+ participants", color: "text-zinc-400", delay: 600 },
  { text: "> spinning up dev environments", color: "text-zinc-400", delay: 1200 },
  { text: "> teams formed: 24", color: "text-green-400", delay: 1800 },
  { text: "> projects built: 24", color: "text-green-400", delay: 2400 },
  { text: "> innovations deployed: ∞", color: "text-orange-400", delay: 3000 },
  { text: "> hackathon.status = SUCCESS ✓", color: "text-orange-400", delay: 3600 },
];

const HIGHLIGHTS = [
  { icon: Cpu, label: "24 Teams", sub: "Cross-functional squads" },
  { icon: Code2, label: "48 Hours", sub: "Non-stop building" },
  { icon: GitBranch, label: "24 Projects", sub: "Ideas shipped" },
  { icon: Zap, label: "120+ Participants", sub: "Innovators united" },
];

const FLOATING_CODE = [
  { text: "function buildFuture()", x: "5%", y: "15%", size: "text-xs", opacity: 0.12, dur: 18, delay: 0 },
  { text: "const innovation = true", x: "75%", y: "8%", size: "text-[10px]", opacity: 0.08, dur: 22, delay: 3 },
  { text: "AI.start()", x: "20%", y: "75%", size: "text-sm", opacity: 0.1, dur: 16, delay: 1.5 },
  { text: 'deploy("ideas")', x: "60%", y: "65%", size: "text-xs", opacity: 0.09, dur: 20, delay: 4 },
  { text: "await team.collaborate()", x: "40%", y: "85%", size: "text-[10px]", opacity: 0.07, dur: 25, delay: 2 },
  { text: "return success;", x: "85%", y: "40%", size: "text-xs", opacity: 0.08, dur: 19, delay: 5 },
  { text: "git commit -m 'shipped'", x: "10%", y: "45%", size: "text-[10px]", opacity: 0.06, dur: 23, delay: 7 },
  { text: "npm run build-future", x: "55%", y: "30%", size: "text-[10px]", opacity: 0.07, dur: 21, delay: 2.5 },
];

function FloatingCodeLines({ reduced }) {
  if (reduced) return null;
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {FLOATING_CODE.map((line, i) => (
        <motion.div
          key={i}
          className={`absolute font-mono font-semibold text-green-400 ${line.size}`}
          style={{ left: line.x, top: line.y, opacity: line.opacity }}
          animate={{
            y: [0, -30, 0],
            opacity: [line.opacity, line.opacity * 2.5, line.opacity],
          }}
          transition={{
            duration: line.dur,
            delay: line.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          {line.text}
        </motion.div>
      ))}
    </div>
  );
}

function TerminalWindow({ visible }) {
  const [lines, setLines] = useState([]);
  const [cursor, setCursor] = useState(true);

  useEffect(() => {
    if (!visible) return;
    const timers = TERMINAL_SEQUENCE.map(({ text, color, delay }) =>
      setTimeout(() => setLines((prev) => [...prev, { text, color }]), delay)
    );
    const cursorInterval = setInterval(() => setCursor((c) => !c), 530);
    return () => {
      timers.forEach(clearTimeout);
      clearInterval(cursorInterval);
    };
  }, [visible]);

  return (
    <div className="overflow-hidden rounded-xl border border-white/10 bg-[#0d1117] shadow-[0_0_60px_rgba(249,115,22,0.12)]">
      {/* Terminal title bar */}
      <div className="flex items-center gap-2 border-b border-white/8 bg-[#161b22] px-4 py-3">
        <span className="h-3 w-3 rounded-full bg-red-500/80" />
        <span className="h-3 w-3 rounded-full bg-yellow-500/80" />
        <span className="h-3 w-3 rounded-full bg-green-500/80" />
        <span className="ml-3 flex items-center gap-1.5 text-[11px] font-semibold text-zinc-500">
          <Terminal className="h-3.5 w-3.5" />
          evox-hackathon — bash
        </span>
      </div>
      {/* Terminal body */}
      <div className="min-h-[260px] p-5 font-mono text-[13px]">
        <p className="mb-3 text-zinc-600">Last login: Fri Apr 3 2026 — evox-hackathon</p>
        {lines.map((line, i) => (
          <motion.p
            key={i}
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
            className={`leading-7 ${line.color}`}
          >
            {line.text}
          </motion.p>
        ))}
        {lines.length < TERMINAL_SEQUENCE.length && (
          <span className="text-zinc-400">
            {cursor ? "█" : " "}
          </span>
        )}
        {lines.length === TERMINAL_SEQUENCE.length && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-2 text-zinc-600"
          >
            $ {cursor ? "█" : " "}
          </motion.p>
        )}
      </div>
    </div>
  );
}

export default function HackathonShowcase() {
  const sectionRef = useRef(null);
  const [visible, setVisible] = useState(false);
  const reduced = useReducedMotion();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => entry.isIntersecting && setVisible(true),
      { threshold: 0.2 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="hackathon"
      className="relative overflow-hidden section-padding"
      style={{
        background: "linear-gradient(180deg, transparent, rgba(15,20,30,0.8) 20%, rgba(15,20,30,0.8) 80%, transparent)",
      }}
    >
      {/* Floating code background */}
      <FloatingCodeLines reduced={reduced} />

      {/* Grid overlay */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(59,130,246,0.8) 1px, transparent 1px), linear-gradient(90deg, rgba(59,130,246,0.8) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      {/* Glow orbs */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute -left-40 top-1/3 h-96 w-96 rounded-full blur-[120px]"
          style={{ background: "radial-gradient(circle, rgba(59,130,246,0.15) 0%, transparent 70%)" }}
          animate={reduced ? {} : { scale: [1, 1.15, 1], opacity: [0.5, 0.8, 0.5] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute -right-40 bottom-1/4 h-80 w-80 rounded-full blur-[100px]"
          style={{ background: "radial-gradient(circle, rgba(249,115,22,0.12) 0%, transparent 70%)" }}
          animate={reduced ? {} : { scale: [1, 1.1, 1] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        />
      </div>

      {/* Accent lines */}
      <div className="pointer-events-none absolute left-0 top-0 h-[1px] w-full bg-gradient-to-r from-transparent via-blue-500/30 to-transparent" />
      <div className="pointer-events-none absolute bottom-0 left-0 h-[1px] w-full bg-gradient-to-r from-transparent via-orange-500/30 to-transparent" />

      <div className="container relative z-10 mx-auto max-w-6xl px-4 md:px-6">
        <ScrollReveal className="mb-16 text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-blue-500/30 bg-blue-500/10 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-blue-400">
            <Zap className="h-3.5 w-3.5" />
            Featured Event
          </span>
          <h2 className="mt-4 font-[family-name:var(--font-poppins)] text-4xl font-bold tracking-tight text-white md:text-5xl lg:text-6xl">
            Tech{" "}
            <span className="bg-gradient-to-br from-blue-400 via-cyan-400 to-orange-400 bg-clip-text text-transparent">
              Hackathon
            </span>{" "}
            2026
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-zinc-500">
            48 hours. 120 builders. 24 projects. One unforgettable explosion of creativity, code, and
            collaboration that defined what&apos;s next.
          </p>
        </ScrollReveal>

        {/* Two column layout */}
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-14 items-start">
          {/* Left: Terminal + Highlights */}
          <ScrollReveal>
            <TerminalWindow visible={visible} />

            {/* Highlight stats */}
            <div className="mt-8 grid grid-cols-2 gap-4">
              {HIGHLIGHTS.map(({ icon: Icon, label, sub }) => (
                <motion.div
                  key={label}
                  className="rounded-xl border border-white/8 bg-white/[0.03] p-4 backdrop-blur-sm"
                  whileHover={{
                    borderColor: "rgba(249,115,22,0.4)",
                    boxShadow: "0 0 20px rgba(249,115,22,0.08)",
                  }}
                  transition={{ duration: 0.2 }}
                >
                  <Icon className="mb-2 h-5 w-5 text-orange-400" />
                  <p className="font-[family-name:var(--font-poppins)] text-xl font-bold text-white">
                    {label}
                  </p>
                  <p className="text-xs text-zinc-500">{sub}</p>
                </motion.div>
              ))}
            </div>
          </ScrollReveal>

          {/* Right: Content */}
          <ScrollReveal delay={0.15}>
            <div className="space-y-8">
              {[
                {
                  title: "Event Highlights",
                  body: "From pre-dawn coding sprints to pitch presentations, the hackathon pushed every participant to their creative limits. Teams formed across disciplines — developers, designers, and domain experts — each bringing unique energy.",
                  accent: "#3b82f6",
                },
                {
                  title: "Projects Built",
                  body: "24 fully functional prototypes were built and demo'd in 48 hours. Projects ranged from AI-powered productivity tools to social impact platforms — each a testament to what focused innovation looks like.",
                  accent: "#f97316",
                },
                {
                  title: "Innovation Highlights",
                  body: "The best projects are now being incubated further. Evox Hackathon 2026 wasn't just an event — it was a launchpad for the next generation of ideas that will shape the future.",
                  accent: "#14b8a6",
                },
              ].map(({ title, body, accent }) => (
                <div
                  key={title}
                  className="relative rounded-xl border border-white/8 bg-white/[0.02] p-6 backdrop-blur-sm"
                  style={{ borderLeft: `2px solid ${accent}50` }}
                >
                  <div
                    className="absolute left-0 top-0 h-full w-1 rounded-l-xl opacity-60"
                    style={{ background: `linear-gradient(to bottom, ${accent}, transparent)` }}
                  />
                  <h3 className="font-[family-name:var(--font-poppins)] text-lg font-semibold text-white mb-2">
                    {title}
                  </h3>
                  <p className="text-sm leading-relaxed text-zinc-500">{body}</p>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
