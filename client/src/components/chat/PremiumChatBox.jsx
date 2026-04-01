"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  Check,
  CheckCheck,
  Copy,
  MessageCircleReply,
  Mic,
  Moon,
  Paperclip,
  SendHorizonal,
  SmilePlus,
  Sun,
  Trash2,
} from "lucide-react";

const QUICK_REACTIONS = ["👍", "❤️", "🔥", "😂", "👏", "😮"];

const initialMessages = [
  {
    id: "m-1",
    sender: "other",
    author: "Sophia",
    text: "Hey Ankit! The launch deck looks amazing. Want to review final details?",
    time: "09:24",
    status: "read",
    reactions: [{ emoji: "🔥", count: 1, mine: false }],
  },
  {
    id: "m-2",
    sender: "me",
    author: "You",
    text: "Absolutely. Can you also share the keynote visuals once?",
    time: "09:25",
    status: "read",
    reactions: [{ emoji: "👍", count: 2, mine: true }],
  },
  {
    id: "m-3",
    sender: "other",
    author: "Sophia",
    text: "Done. Also, the media team asked whether we keep the original gradient theme.",
    time: "09:27",
    status: "delivered",
    reactions: [],
    replyTo: {
      id: "m-2",
      author: "You",
      text: "Can you also share the keynote visuals once?",
    },
  },
];

function StatusIcon({ status }) {
  if (status === "sent") return <Check size={14} className="opacity-70" />;
  if (status === "delivered")
    return <CheckCheck size={14} className="opacity-80" />;
  if (status === "read")
    return <CheckCheck size={14} className="text-sky-400" />;
  return <Check size={14} className="opacity-60" />;
}

function TypingDots() {
  return (
    <div className="flex items-center gap-1 px-3 py-2">
      {[0, 1, 2].map((dot) => (
        <motion.span
          key={dot}
          className="h-1.5 w-1.5 rounded-full bg-zinc-500 dark:bg-zinc-300"
          animate={{ y: [0, -5, 0], opacity: [0.4, 1, 0.4] }}
          transition={{
            repeat: Number.POSITIVE_INFINITY,
            duration: 0.9,
            delay: dot * 0.14,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}

export default function PremiumChatBox() {
  const [messages, setMessages] = useState(initialMessages);
  const [draft, setDraft] = useState("");
  const [isDark, setIsDark] = useState(true);
  const [isOnline, setIsOnline] = useState(true);
  const [typing, setTyping] = useState(true);
  const [replyingTo, setReplyingTo] = useState(null);
  const [openReactionFor, setOpenReactionFor] = useState(null);
  const [recording, setRecording] = useState(false);

  const listRef = useRef(null);
  const fileRef = useRef(null);

  const modeClasses = isDark
    ? "bg-zinc-950 text-zinc-100"
    : "bg-zinc-100 text-zinc-900";

  const chatAreaBackground = useMemo(
    () =>
      isDark
        ? "bg-[radial-gradient(circle_at_20%_20%,rgba(14,165,233,0.18),transparent_38%),radial-gradient(circle_at_80%_0%,rgba(99,102,241,0.2),transparent_35%),radial-gradient(circle_at_70%_80%,rgba(217,70,239,0.14),transparent_40%)]"
        : "bg-[radial-gradient(circle_at_20%_20%,rgba(59,130,246,0.18),transparent_40%),radial-gradient(circle_at_80%_0%,rgba(168,85,247,0.18),transparent_35%),radial-gradient(circle_at_70%_80%,rgba(236,72,153,0.15),transparent_42%)]",
    [isDark]
  );

  useEffect(() => {
    if (!listRef.current) return;
    listRef.current.scrollTo({
      top: listRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages, typing]);

  useEffect(() => {
    const timer = setInterval(() => {
      setTyping((prev) => !prev);
    }, 3600);
    return () => clearInterval(timer);
  }, []);

  const handleSend = () => {
    const trimmed = draft.trim();
    if (!trimmed) return;
    const now = new Date();
    const time = `${String(now.getHours()).padStart(2, "0")}:${String(
      now.getMinutes()
    ).padStart(2, "0")}`;
    const newMessage = {
      id: `m-${Date.now()}`,
      sender: "me",
      author: "You",
      text: trimmed,
      time,
      status: "sent",
      reactions: [],
      replyTo: replyingTo
        ? { id: replyingTo.id, author: replyingTo.author, text: replyingTo.text }
        : undefined,
    };
    setMessages((prev) => [...prev, newMessage]);
    setDraft("");
    setReplyingTo(null);

    setTimeout(() => {
      setMessages((prev) =>
        prev.map((msg) =>
          msg.id === newMessage.id ? { ...msg, status: "delivered" } : msg
        )
      );
    }, 900);

    setTimeout(() => {
      setMessages((prev) =>
        prev.map((msg) =>
          msg.id === newMessage.id ? { ...msg, status: "read" } : msg
        )
      );
    }, 1800);
  };

  const addReaction = (id, emoji) => {
    setMessages((prev) =>
      prev.map((msg) => {
        if (msg.id !== id) return msg;
        const current = msg.reactions ?? [];
        const existing = current.find((entry) => entry.emoji === emoji);
        if (!existing) {
          return {
            ...msg,
            reactions: [...current, { emoji, count: 1, mine: true }],
          };
        }
        if (existing.mine) {
          const reduced = current
            .map((entry) =>
              entry.emoji === emoji
                ? { ...entry, count: entry.count - 1, mine: false }
                : entry
            )
            .filter((entry) => entry.count > 0);
          return { ...msg, reactions: reduced };
        }
        return {
          ...msg,
          reactions: current.map((entry) =>
            entry.emoji === emoji
              ? { ...entry, count: entry.count + 1, mine: true }
              : entry
          ),
        };
      })
    );
    setOpenReactionFor(null);
  };

  const deleteMessage = (id) => {
    setMessages((prev) => prev.filter((msg) => msg.id !== id));
    setReplyingTo((prev) => (prev?.id === id ? null : prev));
    setOpenReactionFor((prev) => (prev === id ? null : prev));
  };

  const copyMessage = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      // Ignore clipboard errors in unsupported contexts.
    }
  };

  return (
    <section
      className={`min-h-[calc(100vh-140px)] px-3 py-6 md:px-6 lg:px-8 ${modeClasses} transition-colors duration-300`}
    >
      <div className="mx-auto flex w-full max-w-5xl flex-col overflow-hidden rounded-3xl border border-white/20 bg-white/10 shadow-[0_12px_80px_rgba(0,0,0,0.25)] backdrop-blur-2xl">
        <header className="flex items-center justify-between border-b border-white/15 px-4 py-3 md:px-6">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="grid h-10 w-10 place-items-center rounded-2xl bg-gradient-to-br from-sky-500 to-violet-600 text-sm font-semibold text-white shadow-lg">
                SP
              </div>
              <span
                className={`absolute -bottom-0.5 -right-0.5 h-3.5 w-3.5 rounded-full border-2 ${
                  isDark ? "border-zinc-950" : "border-zinc-100"
                } ${isOnline ? "bg-emerald-400" : "bg-zinc-400"}`}
              />
            </div>
            <div>
              <p className="font-semibold">Sophia Parker</p>
              <p className="text-xs opacity-70">
                {isOnline ? "Online now" : "Last seen 12m ago"}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setIsOnline((prev) => !prev)}
              className="rounded-xl border border-white/20 px-3 py-1.5 text-xs hover:bg-white/10"
            >
              {isOnline ? "Set Offline" : "Set Online"}
            </button>
            <button
              type="button"
              aria-label="Toggle theme"
              onClick={() => setIsDark((prev) => !prev)}
              className="rounded-xl border border-white/20 p-2 hover:bg-white/10"
            >
              {isDark ? <Sun size={17} /> : <Moon size={17} />}
            </button>
          </div>
        </header>

        <div className={`relative flex-1 ${chatAreaBackground}`}>
          <div ref={listRef} className="h-[62vh] overflow-y-auto px-3 py-5 md:px-6">
            <AnimatePresence initial={false}>
              {messages.map((message) => {
                const mine = message.sender === "me";
                return (
                  <motion.article
                    layout
                    key={message.id}
                    initial={{ opacity: 0, y: 20, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -12, scale: 0.95 }}
                    transition={{ duration: 0.25, ease: "easeOut" }}
                    className={`group mb-3 flex ${mine ? "justify-end" : "justify-start"}`}
                  >
                    <div className={`relative w-full max-w-[85%] md:max-w-[70%] ${mine ? "items-end" : "items-start"}`}>
                      <div
                        className={`rounded-2xl border px-3.5 py-2.5 shadow-sm ${
                          mine
                            ? "border-sky-300/20 bg-gradient-to-br from-sky-500 to-indigo-600 text-white"
                            : isDark
                            ? "border-white/15 bg-zinc-900/70 text-zinc-100 backdrop-blur-md"
                            : "border-zinc-300/60 bg-white/75 text-zinc-800 backdrop-blur-md"
                        }`}
                      >
                        {message.replyTo ? (
                          <div className={`mb-2 rounded-xl border-l-2 px-2 py-1 text-xs ${mine ? "border-white/70 bg-white/20" : "border-sky-400/80 bg-sky-500/10"}`}>
                            <p className="font-medium opacity-90">{message.replyTo.author}</p>
                            <p className="truncate opacity-80">{message.replyTo.text}</p>
                          </div>
                        ) : null}

                        <p className="text-sm leading-relaxed md:text-[15px]">{message.text}</p>
                        <div className={`mt-1 flex items-center gap-1.5 text-[11px] ${mine ? "justify-end text-white/90" : "justify-end opacity-70"}`}>
                          <span>{message.time}</span>
                          {mine ? <StatusIcon status={message.status} /> : null}
                        </div>
                      </div>

                      {message.reactions?.length ? (
                        <div className={`mt-1.5 flex flex-wrap gap-1 ${mine ? "justify-end" : "justify-start"}`}>
                          {message.reactions.map((reaction) => (
                            <button
                              key={`${message.id}-${reaction.emoji}`}
                              type="button"
                              onClick={() => addReaction(message.id, reaction.emoji)}
                              className={`rounded-full border px-2 py-0.5 text-xs transition ${
                                reaction.mine
                                  ? "border-sky-400/60 bg-sky-500/20"
                                  : "border-white/20 bg-white/10"
                              }`}
                            >
                              {reaction.emoji} {reaction.count}
                            </button>
                          ))}
                        </div>
                      ) : null}

                      <div
                        className={`pointer-events-none absolute top-1/2 z-10 flex -translate-y-1/2 gap-1 opacity-0 transition group-hover:pointer-events-auto group-hover:opacity-100 ${
                          mine ? "-left-44" : "-right-44"
                        }`}
                      >
                        <button
                          type="button"
                          onClick={() =>
                            setReplyingTo({
                              id: message.id,
                              author: message.author,
                              text: message.text,
                            })
                          }
                          className="rounded-lg border border-white/20 bg-black/20 p-1.5 backdrop-blur hover:bg-black/35"
                          aria-label="Reply"
                        >
                          <MessageCircleReply size={15} />
                        </button>
                        <button
                          type="button"
                          onClick={() =>
                            setOpenReactionFor((prev) =>
                              prev === message.id ? null : message.id
                            )
                          }
                          className="rounded-lg border border-white/20 bg-black/20 p-1.5 backdrop-blur hover:bg-black/35"
                          aria-label="React"
                        >
                          <SmilePlus size={15} />
                        </button>
                        <button
                          type="button"
                          onClick={() => copyMessage(message.text)}
                          className="rounded-lg border border-white/20 bg-black/20 p-1.5 backdrop-blur hover:bg-black/35"
                          aria-label="Copy"
                        >
                          <Copy size={15} />
                        </button>
                        <button
                          type="button"
                          onClick={() => deleteMessage(message.id)}
                          className="rounded-lg border border-rose-400/40 bg-rose-500/10 p-1.5 backdrop-blur hover:bg-rose-500/20"
                          aria-label="Delete"
                        >
                          <Trash2 size={15} />
                        </button>
                      </div>

                      <AnimatePresence>
                        {openReactionFor === message.id ? (
                          <motion.div
                            initial={{ opacity: 0, y: 6, scale: 0.98 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 4, scale: 0.98 }}
                            className={`absolute ${mine ? "-left-2" : "-right-2"} top-full z-20 mt-1 flex gap-1 rounded-full border border-white/20 bg-black/30 p-1.5 backdrop-blur-xl`}
                          >
                            {QUICK_REACTIONS.map((emoji) => (
                              <button
                                key={emoji}
                                type="button"
                                onClick={() => addReaction(message.id, emoji)}
                                className="rounded-full px-1.5 py-1 text-sm transition hover:scale-110 hover:bg-white/20"
                              >
                                {emoji}
                              </button>
                            ))}
                          </motion.div>
                        ) : null}
                      </AnimatePresence>
                    </div>
                  </motion.article>
                );
              })}
            </AnimatePresence>

            <AnimatePresence>
              {typing ? (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 8 }}
                  className="mt-1 flex justify-start"
                >
                  <div
                    className={`rounded-2xl border px-1 py-0.5 ${
                      isDark
                        ? "border-white/15 bg-zinc-900/75"
                        : "border-zinc-300/60 bg-white/80"
                    }`}
                  >
                    <TypingDots />
                  </div>
                </motion.div>
              ) : null}
            </AnimatePresence>
          </div>

          <div className="sticky bottom-0 px-3 pb-3 md:px-6 md:pb-5">
            {replyingTo ? (
              <div
                className={`mb-2 flex items-start justify-between rounded-2xl border px-3 py-2 text-xs ${
                  isDark ? "border-white/20 bg-black/30" : "border-zinc-300 bg-white/70"
                }`}
              >
                <div className="overflow-hidden">
                  <p className="font-medium">Replying to {replyingTo.author}</p>
                  <p className="truncate opacity-80">{replyingTo.text}</p>
                </div>
                <button
                  type="button"
                  onClick={() => setReplyingTo(null)}
                  className="ml-3 rounded-md px-2 py-1 hover:bg-white/10"
                >
                  Cancel
                </button>
              </div>
            ) : null}

            <div
              className={`flex items-center gap-1 rounded-2xl border px-2 py-2 shadow-xl backdrop-blur-xl md:gap-2 ${
                isDark
                  ? "border-white/20 bg-zinc-900/70"
                  : "border-zinc-300/80 bg-white/85"
              }`}
            >
              <input
                ref={fileRef}
                type="file"
                className="hidden"
                onChange={() => {
                  setDraft((prev) => `${prev}${prev ? " " : ""}[file attached]`);
                }}
              />
              <button
                type="button"
                onClick={() => setDraft((prev) => `${prev}😊`)}
                className="rounded-xl p-2 hover:bg-white/10"
                aria-label="Insert emoji"
              >
                <SmilePlus size={18} />
              </button>
              <button
                type="button"
                onClick={() => fileRef.current?.click()}
                className="rounded-xl p-2 hover:bg-white/10"
                aria-label="Upload file"
              >
                <Paperclip size={18} />
              </button>
              <button
                type="button"
                onClick={() => {
                  if (!draft.trim()) {
                    handleSendVoice();
                    return;
                  }
                  setRecording(true);
                  setDraft((prev) => `${prev ? `${prev} ` : ""}🎙️ Voice message (demo)`);
                  window.setTimeout(() => setRecording(false), 900);
                }}
                className={`rounded-xl p-2 transition ${
                  recording ? "bg-rose-500/20 text-rose-300" : "hover:bg-white/10"
                }`}
                aria-label="Voice message"
              >
                <Mic size={18} />
              </button>

              <input
                value={draft}
                onChange={(event) => setDraft(event.target.value)}
                onKeyDown={(event) => {
                  if (event.key === "Enter" && !event.shiftKey) {
                    event.preventDefault();
                    handleSend();
                  }
                }}
                placeholder="Write a message..."
                className="mx-1 h-10 flex-1 rounded-xl bg-transparent px-3 text-sm outline-none placeholder:opacity-60 md:text-[15px]"
              />

              <motion.button
                whileTap={{ scale: 0.94 }}
                type="button"
                onClick={handleSend}
                className="rounded-xl bg-gradient-to-r from-sky-500 to-indigo-600 p-2.5 text-white shadow-lg hover:brightness-110"
                aria-label="Send message"
              >
                <SendHorizonal size={18} />
              </motion.button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
