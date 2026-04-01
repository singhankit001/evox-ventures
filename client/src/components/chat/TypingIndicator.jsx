'use client';

import { motion } from 'framer-motion';

export default function TypingIndicator() {
  const dots = [0, 1, 2];
  return (
    <div className="inline-flex items-center gap-2 px-4 py-3 rounded-3xl bg-white/70 dark:bg-white/10 border border-white/35 dark:border-white/10 backdrop-blur">
      <div className="text-[13px] font-semibold text-slate-900/70 dark:text-slate-100/90">Typing</div>
      <div className="flex items-center gap-1">
        {dots.map((i) => (
          <motion.span
            key={i}
            className="h-2.5 w-2.5 rounded-full bg-sky-500/90 dark:bg-sky-400/90"
            animate={{ y: [0, -3, 0], opacity: [0.6, 1, 0.7] }}
            transition={{ duration: 0.9, repeat: Infinity, delay: i * 0.12 }}
          />
        ))}
      </div>
    </div>
  );
}

