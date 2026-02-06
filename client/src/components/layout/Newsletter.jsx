"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, CheckCircle2, Loader2 } from "lucide-react";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("idle"); // idle | loading | success

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email) return;

    setStatus("loading");
    // Simulate API call
    setTimeout(() => {
      setStatus("success");
    }, 1500);
  };

  return (
    <div className="w-full max-w-sm rounded-2xl border border-white/5 bg-white/[0.04] p-8">
      <AnimatePresence mode="wait">
        {status === "success" ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.9, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 1.1 }}
            className="flex flex-col items-center justify-center py-6 text-center"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", damping: 10, stiffness: 200, delay: 0.2 }}
              className="relative mb-6"
            >
              <CheckCircle2 className="h-16 w-16 text-orange-400" strokeWidth={1.5} />
              <motion.div 
                className="absolute inset-0 rounded-full bg-orange-400/20 blur-xl"
                animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0.8, 0.5] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </motion.div>
            <h3 className="text-xl font-bold text-white">Welcome to the Club!</h3>
            <p className="mt-3 text-sm leading-relaxed text-zinc-400">
              You&apos;re now part of the Evox community. Stay tuned for extraordinary events.
            </p>
          </motion.div>
        ) : (
          <motion.div
            key="form"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
          >
            <h3 className="mb-2 text-lg font-bold text-white">Stay Updated</h3>
            <p className="mb-6 text-sm text-zinc-400">
              Join 500+ members and never miss an extraordinary experience.
            </p>
            <form onSubmit={handleSubmit} className="relative flex flex-col gap-3">
              <div className="relative group">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                  className="w-full rounded-xl border border-white/10 bg-black/40 px-5 py-4 text-sm text-white outline-none transition-all duration-300 placeholder:text-zinc-600 focus:border-orange-500/50 focus:ring-1 focus:ring-orange-500/50 group-hover:border-white/20"
                />
                <div className="absolute inset-0 -z-10 rounded-xl bg-orange-500/5 opacity-0 transition-opacity group-focus-within:opacity-100" />
              </div>
              <button
                type="submit"
                disabled={status === "loading"}
                className="relative flex items-center justify-center gap-2 overflow-hidden rounded-xl bg-orange-500 py-4 text-xs font-bold uppercase tracking-widest text-white transition-all duration-300 hover:bg-orange-600 hover:shadow-[0_0_25px_rgba(249,115,22,0.4)] disabled:opacity-70 disabled:cursor-not-allowed group"
              >
                {status === "loading" ? (
                  <>
                    <Loader2 size={16} className="animate-spin" />
                    Processing...
                  </>
                ) : (
                  <>
                    Subscribe
                    <Send size={15} className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
                  </>
                )}
                {/* Button Gloss */}
                <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-1000 group-hover:translate-x-full" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
