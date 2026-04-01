'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

import ChatMessage from './ChatMessage';
import TypingIndicator from './TypingIndicator';
import FloatingChatInput from './FloatingChatInput';

const EMOJI_REACTIONS = ['👍', '❤️', '😂', '🔥', '🎉', '😮', '😢', '🙏'];

function nowId() {
  return `${Date.now()}_${Math.random().toString(16).slice(2)}`;
}

function formatTime(ts) {
  const d = new Date(ts);
  return d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

function getPlainText(message) {
  const parts = [];
  if (message.type === 'text') parts.push(message.text ?? '');
  if (message.type === 'voice') parts.push('Voice message (demo)');
  if (message.attachmentName) parts.push(`Attachment: ${message.attachmentName}`);
  return parts.join('\n').trim();
}

function updateMessageStatus(messages, id, status) {
  return messages.map((m) => (m.id === id ? { ...m, status } : m));
}

function toggleReaction(message, emoji) {
  const prev = message.reactions ?? {};
  const existing = prev[emoji];
  const next = { ...prev };

  if (!existing) {
    next[emoji] = { count: 1, mine: true };
  } else if (existing.mine) {
    const nextCount = Math.max(0, existing.count - 1);
    if (nextCount === 0) delete next[emoji];
    else next[emoji] = { count: nextCount, mine: false };
  } else {
    next[emoji] = { count: existing.count + 1, mine: true };
  }

  return { ...message, reactions: next };
}

export default function ChatBox() {
  const [theme, setTheme] = useState('dark'); // 'dark' | 'light'
  const [isOnline, setIsOnline] = useState(true);
  const [isTyping, setIsTyping] = useState(false);

  const [reactionPickerFor, setReactionPickerFor] = useState(null);
  const [replyToId, setReplyToId] = useState(null);

  const [toast, setToast] = useState(null); // { id, text }

  const [messages, setMessages] = useState(() => {
    const base = Date.now();
    return [
      {
        id: nowId(),
        sender: 'them',
        type: 'text',
        text: 'Hey! Want to estimate event costs?',
        timestamp: base - 1000 * 60 * 6,
      },
      {
        id: nowId(),
        sender: 'me',
        type: 'text',
        text: 'Sure. What’s the venue and guest count?',
        timestamp: base - 1000 * 60 * 5,
        status: 'read',
        reactions: { '🔥': { count: 1, mine: true } },
      },
      {
        id: nowId(),
        sender: 'them',
        type: 'text',
        text: 'Demo: reply, reactions, statuses, typing indicator, and smooth animations are all included.',
        timestamp: base - 1000 * 60 * 4,
      },
      {
        id: nowId(),
        sender: 'me',
        type: 'text',
        text: 'Perfect. Send me the details and I’ll help you plan.',
        timestamp: base - 1000 * 60 * 3,
        status: 'delivered',
      },
    ];
  });

  const messagesEndRef = useRef(null);
  const scrollRef = useRef(null);

  const messagesById = useMemo(() => {
    const map = new Map();
    for (const m of messages) map.set(m.id, m);
    return map;
  }, [messages]);

  const replyToMessage = replyToId ? messagesById.get(replyToId) : null;

  const isNearBottom = () => {
    const el = scrollRef.current;
    if (!el) return true;
    const distance = el.scrollHeight - el.scrollTop - el.clientHeight;
    return distance < 220;
  };

  useEffect(() => {
    if (isNearBottom()) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [messages.length]);

  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.key === 'Escape') {
        setReactionPickerFor(null);
        setReplyToId(null);
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  const setToastTimed = (text) => {
    const id = nowId();
    setToast({ id, text });
    window.setTimeout(() => {
      setToast((t) => (t?.id === id ? null : t));
    }, 1600);
  };

  const onSend = async ({ text, attachmentName, isVoice }) => {
    const trimmed = (text ?? '').trim();
    const hasText = trimmed.length > 0;
    const hasAttachment = Boolean(attachmentName);
    const hasVoice = Boolean(isVoice);
    if (!hasText && !hasAttachment && !hasVoice) return;

    const baseTs = Date.now();
    const id = nowId();

    const message = {
      id,
      sender: 'me',
      type: isVoice ? 'voice' : 'text',
      text: isVoice ? '' : trimmed,
      attachmentName: hasAttachment ? attachmentName : undefined,
      replyToId: replyToId ?? undefined,
      timestamp: baseTs,
      status: 'sent',
    };

    setMessages((prev) => [...prev, message]);
    setReplyToId(null);
    setReactionPickerFor(null);
    setIsTyping(true);

    window.setTimeout(() => {
      setMessages((prev) => updateMessageStatus(prev, id, 'delivered'));
    }, 1000);

    window.setTimeout(() => {
      setMessages((prev) => updateMessageStatus(prev, id, 'read'));
      setIsTyping(false);
    }, 2600);

    // Simulate a remote reply
    window.setTimeout(() => {
      if (!isOnline) return;
      const reply = {
        id: nowId(),
        sender: 'them',
        type: attachmentName ? 'text' : 'text',
        text: attachmentName
          ? `Got it: ${attachmentName}. Anything else you want to add?`
          : hasVoice
            ? 'Voice message received (demo). I’ll reply shortly.'
            : `Nice. ${trimmed ? trimmed : 'Thanks!'}`,
        timestamp: Date.now(),
        replyToId: Math.random() > 0.6 ? id : undefined,
      };
      setMessages((prev) => [...prev, reply]);
    }, 1700);
  };

  const onReact = (messageId, emoji) => {
    setMessages((prev) =>
      prev.map((m) => {
        if (m.id !== messageId) return m;
        return toggleReaction(m, emoji);
      })
    );
  };

  const onCopy = async (message) => {
    try {
      await navigator.clipboard.writeText(getPlainText(message));
      setToastTimed('Copied to clipboard');
    } catch {
      setToastTimed('Copy failed');
    }
  };

  const onDelete = (messageId) => {
    setMessages((prev) => prev.filter((m) => m.id !== messageId));
    if (replyToId === messageId) setReplyToId(null);
    if (reactionPickerFor === messageId) setReactionPickerFor(null);
  };

  const renderStatus = (status) => {
    if (!status) return null;
    const base = 'inline-flex items-center justify-center';
    if (status === 'sent') {
      return (
        <span className={`${base} text-[12px] text-slate-500 dark:text-slate-400`}>
          ✓
        </span>
      );
    }
    if (status === 'delivered') {
      return (
        <span className={`${base} text-[12px] text-slate-500 dark:text-slate-400`}>
          ✓✓
        </span>
      );
    }
    return (
      <span className={`${base} text-[12px] text-sky-500 dark:text-sky-400`}>
        ✓✓
      </span>
    );
  };

  return (
    <div
      className={`relative w-full max-w-5xl mx-auto`}
    >
      <div
        className={`rounded-3xl border border-white/10 overflow-hidden ${
          theme === 'dark'
            ? 'dark bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-slate-100'
            : 'bg-gradient-to-b from-white via-slate-50 to-white text-slate-900'
        }`}
      >
        <div className="flex items-center justify-between px-4 sm:px-6 py-3 sm:py-4 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-2xl bg-white/10 dark:bg-white/10 flex items-center justify-center border border-white/10">
              <span className="text-lg">💬</span>
            </div>
            <div>
              <div className="font-semibold leading-tight text-base sm:text-lg">Chat with Evox</div>
              <div className="text-sm text-slate-700/80 dark:text-slate-400 flex items-center gap-2">
                <span
                  className={`h-2.5 w-2.5 rounded-full ${
                    isOnline ? 'bg-emerald-400' : 'bg-rose-400'
                  }`}
                />
                <span>{isOnline ? 'Online' : 'Offline'}</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setIsOnline((v) => !v)}
              className="px-3 py-2 rounded-xl bg-black/5 dark:bg-white/10 hover:bg-black/10 dark:hover:bg-white/15 transition border border-slate-200/40 dark:border-white/10 text-sm"
            >
              Toggle
            </button>
            <button
              type="button"
              onClick={() => setTheme((t) => (t === 'dark' ? 'light' : 'dark'))}
              className="px-3 py-2 rounded-xl bg-black/5 dark:bg-white/10 hover:bg-black/10 dark:hover:bg-white/15 transition border border-slate-200/40 dark:border-white/10 text-sm"
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? 'Light' : 'Dark'}
            </button>
          </div>
        </div>

        <div className="relative">
          <div
            ref={scrollRef}
            className="h-[70vh] sm:h-[72vh] overflow-y-auto px-3 sm:px-5 py-4 sm:py-6 bg-transparent"
          >
            <AnimatePresence initial={false}>
              {messages.map((m) => (
                <ChatMessage
                  key={m.id}
                  message={m}
                  timeLabel={formatTime(m.timestamp)}
                  replyToMessage={m.replyToId ? messagesById.get(m.replyToId) : null}
                  renderStatus={renderStatus}
                  isReactionPickerOpen={reactionPickerFor === m.id}
                  reactionOptions={EMOJI_REACTIONS}
                  onOpenReaction={() => setReactionPickerFor(m.id)}
                  onCloseReaction={() => setReactionPickerFor(null)}
                  onReact={(emoji) => onReact(m.id, emoji)}
                  onReply={() => setReplyToId(m.id)}
                  onCopy={() => onCopy(m)}
                  onDelete={() => onDelete(m.id)}
                />
              ))}
              {isTyping && isOnline && (
                <motion.div
                  key="typing"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="flex items-end gap-2 mb-2"
                >
                  <div className="ml-auto w-fit">
                    <TypingIndicator />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
            <div ref={messagesEndRef} />
          </div>

          <div className="px-3 sm:px-5 pb-4">
            <FloatingChatInput
              theme={theme}
              replyToMessage={replyToMessage}
              replyToId={replyToId}
              onCancelReply={() => setReplyToId(null)}
              onSend={onSend}
            />
          </div>
        </div>
      </div>

      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 12 }}
            className="fixed left-1/2 -translate-x-1/2 bottom-6 z-50 px-4 py-2 rounded-2xl border border-white/15 bg-black/40 backdrop-blur text-white/90 text-sm shadow-lg"
          >
            {toast.text}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

