'use client';

import { motion } from 'framer-motion';

export default function ReactionPicker({ options, onPick, onClose }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 6, scale: 0.98 }}
      className="mb-2 p-2 rounded-2xl bg-black/45 border border-white/15 backdrop-blur-lg shadow-xl"
      role="dialog"
      aria-label="Pick a reaction"
    >
      <div className="flex gap-1">
        {options.map((emoji) => (
          <button
            key={emoji}
            type="button"
            onClick={() => onPick(emoji)}
            className="h-10 w-10 rounded-xl hover:bg-white/10 transition flex items-center justify-center text-[18px]"
            aria-label={`React ${emoji}`}
          >
            {emoji}
          </button>
        ))}
      </div>

      <div className="mt-2 flex justify-end">
        <button
          type="button"
          onClick={onClose}
          className="text-[12px] text-slate-200/80 hover:text-white transition"
        >
          Close
        </button>
      </div>
    </motion.div>
  );
}

