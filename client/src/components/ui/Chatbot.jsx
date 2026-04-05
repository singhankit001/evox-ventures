"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X, Send, Loader2, CheckCircle2,
  Sparkles, Phone, Mail, User, ArrowRight, ExternalLink,
  Building2, Music2, UtensilsCrossed, Tent, IndianRupee, RotateCcw
} from "lucide-react";

// ─── Pricing Engine ─────────────────────────────────────────────────────────
const BASE_PRICING = {
  wedding:    { venue: 200000, decor: 150000, catering: 300000, entertainment: 80000 },
  corporate:  { venue: 120000, decor: 60000,  catering: 150000, entertainment: 40000 },
  club_party: { venue: 80000,  decor: 40000,  catering: 60000,  entertainment: 120000 },
  beach_trip: { venue: 50000,  decor: 20000,  catering: 80000,  entertainment: 30000 },
  sports:     { venue: 90000,  decor: 30000,  catering: 70000,  entertainment: 60000 },
  birthday:   { venue: 60000,  decor: 50000,  catering: 80000,  entertainment: 40000 },
  default:    { venue: 100000, decor: 50000,  catering: 100000, entertainment: 50000 },
};

function generateQuote(eventType, guests = 100) {
  const base = BASE_PRICING[eventType] || BASE_PRICING.default;
  const scale = Math.max(0.5, guests / 100);
  const clamp = (v) => Math.round(v * scale / 1000) * 1000;
  const venue = clamp(base.venue);
  const decor = clamp(base.decor);
  const catering = clamp(base.catering);
  const entertainment = clamp(base.entertainment);
  return { venue, decor, catering, entertainment, total: venue + decor + catering + entertainment };
}

function formatINR(n) {
  if (n >= 100000) return `₹${(n / 100000).toFixed(1)}L`;
  if (n >= 1000)   return `₹${(n / 1000).toFixed(0)}K`;
  return `₹${n}`;
}

// ─── WhatsApp Message Builder ────────────────────────────────────────────────
const WHATSAPP_NUMBER = "919000000000"; // Replace in .env or here

function buildWhatsAppMessage(lead, session, quote) {
  const lines = [
    `Hi Evox Ventures! I'm interested in planning an event.`,
    ``,
    `*My Details:*`,
    `Name: ${lead.name}`,
    `Email: ${lead.email}`,
    `Phone: ${lead.phone || "—"}`,
    ``,
    `*Event Brief:*`,
    `Type: ${session.eventType?.replace("_", " ") || "—"}`,
    `Location: ${session.location || "—"}`,
    `Guests: ${session.guests || "—"}`,
    `Date: ${session.date || "—"}`,
    ``,
    `*My Estimated Quote:*`,
    `Venue: ${formatINR(quote.venue)}`,
    `Décor: ${formatINR(quote.decor)}`,
    `Catering: ${formatINR(quote.catering)}`,
    `Entertainment: ${formatINR(quote.entertainment)}`,
    `Total: ${formatINR(quote.total)} (approx)`,
    ``,
    `Looking forward to connecting!`,
  ];
  return encodeURIComponent(lines.join("\n"));
}

// ─── Sub-components ─────────────────────────────────────────────────────────
function TypingIndicator() {
  return (
    <div className="flex items-end gap-2 mb-3">
      <div className="h-6 w-6 rounded-full bg-orange-500/20 flex items-center justify-center flex-shrink-0">
        <Sparkles className="h-3 w-3 text-orange-400" />
      </div>
      <div className="flex items-center gap-1 px-4 py-3 rounded-2xl rounded-bl-sm bg-white/[0.04] border border-white/5">
        {[0, 1, 2].map((i) => (
          <motion.span
            key={i}
            className="h-1.5 w-1.5 rounded-full bg-zinc-500"
            animate={{ y: [0, -4, 0], opacity: [0.4, 1, 0.4] }}
            transition={{ duration: 0.8, repeat: Infinity, delay: i * 0.15 }}
          />
        ))}
      </div>
    </div>
  );
}

function MessageBubble({ msg, index }) {
  const isAI = msg.role === "assistant";
  return (
    <motion.div
      initial={{ opacity: 0, y: 10, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
      className={`flex items-end gap-2 mb-3 ${isAI ? "" : "flex-row-reverse"}`}
    >
      {isAI && (
        <div className="h-6 w-6 rounded-full bg-orange-500/20 flex items-center justify-center flex-shrink-0">
          <Sparkles className="h-3 w-3 text-orange-400" />
        </div>
      )}
      <div
        className={`max-w-[82%] px-4 py-3 text-sm leading-relaxed rounded-2xl whitespace-pre-line ${
          isAI
            ? "rounded-bl-sm bg-white/[0.04] border border-white/5 text-zinc-200"
            : "rounded-br-sm bg-orange-500/90 text-white font-medium"
        }`}
      >
        {msg.content}
      </div>
    </motion.div>
  );
}

function QuoteCard({ quote, session, lead }) {
  const eventLabel = session.eventType?.replace("_", " ") || "Event";
  const items = [
    { label: "Venue", icon: Building2, value: quote.venue },
    { label: "Décor", icon: Tent, value: quote.decor },
    { label: "Catering", icon: UtensilsCrossed, value: quote.catering },
    { label: "Entertainment", icon: Music2, value: quote.entertainment },
  ];

  const waMsg = buildWhatsAppMessage(lead, session, quote);
  const waUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${waMsg}`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="p-1"
    >
      {/* Header */}
      <div className="mb-4 text-center">
        <div className="inline-flex items-center gap-2 mb-1">
          <IndianRupee className="h-3.5 w-3.5 text-orange-400" />
          <span className="text-[10px] font-black uppercase tracking-[0.25em] text-orange-400">Estimated Budget</span>
        </div>
        <p className="text-zinc-500 text-xs capitalize">{eventLabel} · {session.guests || 100} guests · {session.location || "India"}</p>
      </div>

      {/* Line Items */}
      <div className="space-y-2 mb-4">
        {items.map(({ label, icon: Icon, value }, i) => (
          <motion.div
            key={label}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.08, duration: 0.4 }}
            className="flex items-center justify-between px-3 py-2 rounded-xl bg-white/[0.03] border border-white/5"
          >
            <div className="flex items-center gap-2">
              <div className="h-6 w-6 rounded-lg bg-white/5 flex items-center justify-center">
                <Icon className="h-3 w-3 text-zinc-400" />
              </div>
              <span className="text-xs text-zinc-400">{label}</span>
            </div>
            <span className="text-xs font-semibold text-white">{formatINR(value)}</span>
          </motion.div>
        ))}
      </div>

      {/* Total */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.4, duration: 0.4 }}
        className="flex items-center justify-between px-4 py-3 rounded-xl bg-orange-500/10 border border-orange-500/20 mb-4"
      >
        <span className="text-sm font-bold text-white">Total (approx)</span>
        <span className="text-lg font-black text-orange-400">{formatINR(quote.total)}</span>
      </motion.div>

      <p className="text-[10px] text-zinc-600 text-center mb-4">
        Pricing varies based on exact requirements & vendors. Final quote shared after consultation.
      </p>

      {/* WhatsApp CTA */}
      <a
        href={waUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center gap-2 w-full py-3 px-4 rounded-xl bg-[#25D366] text-white text-sm font-bold hover:bg-[#22be5c] transition-colors shadow-[0_0_20px_rgba(37,211,102,0.3)]"
      >
        <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
        </svg>
        Continue on WhatsApp
        <ExternalLink className="h-3 w-3 opacity-70" />
      </a>
    </motion.div>
  );
}

// ─── Main Chatbot Component ──────────────────────────────────────────────────
export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [phase, setPhase] = useState("chat"); // chat | lead | quote
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content: "Welcome to Evox Concierge — where extraordinary events are born. ✨\n\nI'm here to help you create something truly unforgettable.\n\nWhat kind of event are you planning? (Wedding, Corporate, Club Party, Beach Retreat, Sports, Birthday...)",
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [sessionData, setSessionData] = useState({
    eventType: null, guests: null, location: null, date: null, budget: null,
  });
  const [lead, setLead] = useState({ name: "", email: "", phone: "" });
  const [leadStatus, setLeadStatus] = useState("idle"); // idle | loading | done | error
  const [quote, setQuote] = useState(null);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  // Auto-scroll
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  // Focus input when chat opens
  useEffect(() => {
    if (isOpen && phase === "chat") {
      setTimeout(() => inputRef.current?.focus(), 300);
    }
  }, [isOpen, phase]);

  const handleToggle = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);

  const sendMessage = useCallback(async () => {
    const text = input.trim();
    if (!text || isTyping) return;

    const userMsg = { role: "user", content: text };
    const updatedMessages = [...messages, userMsg];
    setMessages(updatedMessages);
    setInput("");
    setIsTyping(true);

    try {
      // Use relative URL so Next.js proxy can handle it, or direct server URL
      const res = await fetch("/api/concierge", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: updatedMessages,
          sessionData,
        }),
      });

      const data = await res.json();
      const newSession = { ...sessionData, ...data.sessionData };
      setSessionData(newSession);

      // Simulate typing delay for premium feel
      await new Promise((r) => setTimeout(r, 600 + Math.random() * 400));
      setIsTyping(false);

      setMessages((prev) => [...prev, { role: "assistant", content: data.reply }]);

      // Transition to lead phase when AI signals completion
      if (data.complete) {
        setTimeout(() => setPhase("lead"), 800);
      }
    } catch (err) {
      setIsTyping(false);
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "I apologize — there was a brief interruption. Please try again in a moment." },
      ]);
    }
  }, [input, isTyping, messages, sessionData]);

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const handleLeadSubmit = async (e) => {
    e.preventDefault();
    if (!lead.name || !lead.email) return;

    setLeadStatus("loading");
    const generatedQuote = generateQuote(sessionData.eventType, sessionData.guests);
    setQuote(generatedQuote);

    try {
      await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...lead, ...sessionData, quote: generatedQuote }),
      });
    } catch (_) {
      // Silently continue — lead saved server-side
    }

    setLeadStatus("done");
    setTimeout(() => setPhase("quote"), 400);
  };

  const handleReset = () => {
    setPhase("chat");
    setMessages([{
      role: "assistant",
      content: "Welcome back! I'd love to help you plan another extraordinary event. What are you envisioning?",
    }]);
    setSessionData({ eventType: null, guests: null, location: null, date: null, budget: null });
    setLead({ name: "", email: "", phone: "" });
    setLeadStatus("idle");
    setQuote(null);
    setInput("");
  };

  return (
    <div className="fixed bottom-6 right-6 z-[100] flex flex-col items-end">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.95 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="mb-4 w-[360px] overflow-hidden rounded-2xl border border-white/10 bg-[#080808] shadow-[0_24px_60px_rgba(0,0,0,0.8),0_0_30px_rgba(249,115,22,0.08)] backdrop-blur-xl"
          >
            {/* ── Header ── */}
            <div className="flex items-center justify-between border-b border-white/5 bg-white/[0.02] px-5 py-4">
              <div className="flex items-center gap-3">
                <div className="relative flex h-8 w-8 items-center justify-center rounded-full bg-orange-500/20">
                  <Sparkles className="h-4 w-4 text-orange-400" />
                  <span className="absolute bottom-0 right-0 h-2 w-2 rounded-full bg-green-500 ring-2 ring-[#080808]" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white" style={{ fontFamily: "var(--font-poppins)" }}>
                    Evox Concierge
                  </h3>
                  <p className="text-[10px] text-green-400">AI-Powered · Always On</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                {phase !== "chat" && (
                  <button
                    onClick={handleReset}
                    className="rounded-full p-1.5 text-zinc-500 hover:text-zinc-300 hover:bg-white/5 transition-colors"
                    title="Start over"
                  >
                    <RotateCcw className="h-3.5 w-3.5" />
                  </button>
                )}
                <button
                  onClick={handleToggle}
                  className="rounded-full p-1.5 text-zinc-400 hover:bg-white/10 hover:text-white transition-colors"
                  aria-label="Close"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* ── Phase Indicator ── */}
            <div className="flex border-b border-white/5">
              {["chat", "lead", "quote"].map((p, i) => (
                <div
                  key={p}
                  className={`flex-1 h-0.5 transition-colors duration-500 ${
                    phase === p ? "bg-orange-500" :
                    ["chat", "lead", "quote"].indexOf(phase) > i ? "bg-orange-500/30" : "bg-white/5"
                  }`}
                />
              ))}
            </div>

            {/* ── Body ── */}
            <AnimatePresence mode="wait">

              {/* Phase 1: Chat */}
              {phase === "chat" && (
                <motion.div
                  key="chat"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex flex-col"
                  style={{ height: "400px" }}
                >
                  {/* Message List */}
                  <div className="flex-1 overflow-y-auto p-4 space-y-1 scrollbar-thin scrollbar-track-transparent scrollbar-thumb-white/10">
                    {messages.map((msg, i) => (
                      <MessageBubble key={i} msg={msg} index={i} />
                    ))}
                    {isTyping && <TypingIndicator />}
                    <div ref={messagesEndRef} />
                  </div>

                  {/* Input */}
                  <div className="border-t border-white/5 p-3">
                    <div className="flex items-center gap-2 rounded-xl border border-white/8 bg-white/[0.03] px-3 py-2 focus-within:border-orange-500/40 transition-colors">
                      <input
                        ref={inputRef}
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={handleKeyDown}
                        placeholder="Tell me about your event..."
                        disabled={isTyping}
                        className="flex-1 bg-transparent text-sm text-white placeholder:text-zinc-600 focus:outline-none disabled:opacity-50"
                      />
                      <button
                        onClick={sendMessage}
                        disabled={!input.trim() || isTyping}
                        className="flex h-7 w-7 items-center justify-center rounded-lg bg-orange-500 text-white disabled:opacity-30 hover:bg-orange-600 transition-all disabled:cursor-not-allowed"
                      >
                        {isTyping
                          ? <Loader2 className="h-3.5 w-3.5 animate-spin" />
                          : <Send className="h-3.5 w-3.5" />
                        }
                      </button>
                    </div>
                    <p className="mt-1.5 text-center text-[10px] text-zinc-700">
                      Powered by Evox AI · 100% Confidential
                    </p>
                  </div>
                </motion.div>
              )}

              {/* Phase 2: Lead Capture */}
              {phase === "lead" && (
                <motion.div
                  key="lead"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4 }}
                  className="p-5"
                >
                  <div className="mb-5 text-center">
                    <div className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-orange-500/15 mb-3">
                      <Sparkles className="h-5 w-5 text-orange-400" />
                    </div>
                    <h4 className="font-bold text-white text-sm mb-1">Almost there.</h4>
                    <p className="text-xs text-zinc-500 leading-relaxed">
                      Where should we send your personalized event plan?
                    </p>
                  </div>

                  <form onSubmit={handleLeadSubmit} className="space-y-3">
                    {[
                      { name: "name",  type: "text",  icon: User,  placeholder: "Your Full Name" },
                      { name: "email", type: "email", icon: Mail,  placeholder: "Email Address" },
                      { name: "phone", type: "tel",   icon: Phone, placeholder: "Phone Number (optional)" },
                    ].map(({ name, type, icon: Icon, placeholder }) => (
                      <div key={name} className="relative">
                        <Icon className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-zinc-600" />
                        <input
                          type={type}
                          placeholder={placeholder}
                          value={lead[name]}
                          required={name !== "phone"}
                          onChange={(e) => setLead((p) => ({ ...p, [name]: e.target.value }))}
                          disabled={leadStatus === "loading"}
                          className="w-full rounded-xl border border-white/8 bg-white/[0.03] py-3 pl-9 pr-4 text-sm text-white placeholder:text-zinc-600 focus:border-orange-500/40 focus:outline-none transition-colors disabled:opacity-50"
                        />
                      </div>
                    ))}

                    <button
                      type="submit"
                      disabled={leadStatus === "loading" || !lead.name || !lead.email}
                      className="group mt-1 flex w-full items-center justify-center gap-2 rounded-xl bg-orange-500 py-3 text-sm font-bold text-white shadow-[0_0_20px_rgba(249,115,22,0.3)] hover:bg-orange-600 hover:shadow-[0_0_30px_rgba(249,115,22,0.4)] transition-all disabled:opacity-40 disabled:cursor-not-allowed"
                    >
                      {leadStatus === "loading" ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : (
                        <>
                          <span>Get My Personalized Quote</span>
                          <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                        </>
                      )}
                    </button>
                  </form>
                </motion.div>
              )}

              {/* Phase 3: Quote */}
              {phase === "quote" && quote && (
                <motion.div
                  key="quote"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="p-4 overflow-y-auto max-h-[480px]"
                >
                  <QuoteCard quote={quote} session={sessionData} lead={lead} />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Trigger Button ── */}
      <motion.button
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.93 }}
        onClick={handleToggle}
        data-cursor-hover
        className="relative flex h-14 w-14 items-center justify-center rounded-full bg-orange-500 text-white shadow-[0_0_30px_rgba(249,115,22,0.45)] hover:bg-orange-600 transition-colors"
        aria-label="Toggle Evox Concierge"
      >
        {/* Pulse ring */}
        {!isOpen && (
          <motion.span
            className="absolute inset-0 rounded-full border-2 border-orange-500/40"
            animate={{ scale: [1, 1.5], opacity: [0.6, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        )}
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div key="x" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.2 }}>
              <X className="h-6 w-6" />
            </motion.div>
          ) : (
            <motion.div key="chat" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.2 }}>
              <Sparkles className="h-6 w-6" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>
    </div>
  );
}
