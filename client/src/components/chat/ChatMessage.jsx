'use client';

import { motion } from 'framer-motion';
import { Copy, CornerDownLeft, MessageCircleReply as Reply, Smile, Trash2 } from 'lucide-react';

import ReactionPicker from './ReactionPicker';

export default function ChatMessage({
  message,
  timeLabel,
  replyToMessage,
  renderStatus,
  isReactionPickerOpen,
  reactionOptions,
  onOpenReaction,
  onCloseReaction,
  onReact,
  onReply,
  onCopy,
  onDelete,
}) {
  const isMe = message.sender === 'me';
  const hasText = message.type === 'text' && Boolean(message.text?.trim());

  return (
    <motion.div
      initial={{ opacity: 0, y: 10, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 8 }}
      layout
      className={`group relative flex ${isMe ? 'justify-end' : 'justify-start'} mb-3`}
      key={message.id}
    >
      <div className={`${isMe ? 'items-end' : 'items-start'} flex max-w-[92%] gap-2`}>
        {!isMe && (
          <div className="mt-1 h-8 w-8 rounded-2xl bg-white/30 dark:bg-white/10 border border-white/20 dark:border-white/10 flex items-center justify-center">
            <span className="text-sm">EV</span>
          </div>
        )}

        <div className="relative">
          <div
            className={[
              'rounded-3xl px-4 py-3 border backdrop-blur',
              isMe
                ? 'bg-gradient-to-br from-sky-500/25 via-indigo-500/20 to-purple-500/20 border-white/25 dark:border-white/15'
                : 'bg-white/70 border-white/40 dark:bg-white/10 dark:border-white/10',
            ].join(' ')}
          >
            {replyToMessage && (
              <div className="mb-2 flex w-full items-center gap-2 text-left rounded-2xl px-3 py-2 bg-slate-100/55 dark:bg-black/25 border border-slate-200/50 dark:border-white/10">
                <CornerDownLeft size={16} className="text-sky-700 dark:text-sky-200" />
                <div className="min-w-0">
                  <div className="text-[12px] font-semibold text-slate-900/80 dark:text-slate-200/90">
                    Replying to {replyToMessage.sender === 'me' ? 'You' : 'Evox'}
                  </div>
                  <div className="text-[12px] truncate text-slate-900/60 dark:text-slate-200/80">
                    {(replyToMessage.text ?? (replyToMessage.attachmentName ? `Attachment: ${replyToMessage.attachmentName}` : '')).slice(
                      0,
                      60
                    )}
                    {((replyToMessage.text ?? '').length > 60 ? '...' : '')}
                  </div>
                </div>
              </div>
            )}

            {hasText && (
              <p className="text-sm sm:text-[15px] leading-relaxed text-slate-900 dark:text-slate-100/95">
                {message.text}
              </p>
            )}

            {message.attachmentName && (
              <div className="mt-1 rounded-2xl bg-white/60 dark:bg-white/8 border border-white/30 dark:border-white/10 px-3 py-2">
                <div className="text-[12px] text-slate-700 dark:text-slate-300/90 font-semibold mb-1">Attachment</div>
                <div className="text-sm text-slate-900 dark:text-slate-100 break-all">{message.attachmentName}</div>
              </div>
            )}

            {message.type === 'voice' && (
              <div className="mt-1 rounded-2xl bg-white/60 dark:bg-white/8 border border-white/30 dark:border-white/10 px-3 py-2 flex items-center gap-2">
                <span className="inline-flex h-8 w-8 rounded-xl bg-white/30 dark:bg-white/10 border border-white/20 dark:border-white/10 items-center justify-center">
                  🎙️
                </span>
                <div className="min-w-0">
                  <div className="text-[12px] text-slate-700 dark:text-slate-300/90 font-semibold">Voice message</div>
                  <div className="text-sm text-slate-900 dark:text-slate-100 truncate">Tap to play (demo)</div>
                </div>
              </div>
            )}

            {(message.reactions && Object.keys(message.reactions).length > 0) && (
              <div className="mt-3 flex flex-wrap gap-2">
                {Object.entries(message.reactions).map(([emoji, r]) => (
                  <button
                    key={emoji}
                    type="button"
                    onClick={() => onReact(emoji)}
                    className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[13px] border transition ${
                      r.mine
                        ? 'bg-sky-500/20 border-sky-400/40 text-sky-900 dark:text-sky-100'
                        : 'bg-white/60 border-white/30 text-slate-900 dark:bg-white/10 dark:border-white/10 dark:text-slate-100'
                    }`}
                    aria-label={`React ${emoji}`}
                  >
                    <span>{emoji}</span>
                    <span className="text-[12px] font-semibold">{r.count}</span>
                  </button>
                ))}
              </div>
            )}

            <div className="mt-2 flex items-center gap-2 justify-end">
              <span className="text-[11px] text-slate-500/80 dark:text-slate-300/80">{timeLabel}</span>
              {isMe && <div className="opacity-95">{renderStatus(message.status)}</div>}
            </div>
          </div>

          <div
            className="pointer-events-none absolute -top-3 right-2 opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 transition"
          >
            <div className="pointer-events-auto flex items-center gap-1 px-2 py-1 rounded-2xl bg-black/35 dark:bg-black/45 border border-white/10 backdrop-blur">
              <button
                type="button"
                className="p-1 rounded-xl hover:bg-white/10 transition"
                onClick={() => (isReactionPickerOpen ? onCloseReaction() : onOpenReaction())}
                aria-label="React"
              >
                <Smile size={16} />
              </button>

              <button
                type="button"
                className="p-1 rounded-xl hover:bg-white/10 transition"
                onClick={onReply}
                aria-label="Reply"
              >
                <Reply size={16} />
              </button>

              <button
                type="button"
                className="p-1 rounded-xl hover:bg-white/10 transition"
                onClick={onCopy}
                aria-label="Copy"
              >
                <Copy size={16} />
              </button>

              <button
                type="button"
                className="p-1 rounded-xl hover:bg-white/10 transition"
                onClick={onDelete}
                aria-label="Delete"
              >
                <Trash2 size={16} />
              </button>
            </div>

            {isReactionPickerOpen && (
              <div className="pointer-events-auto absolute right-0 top-full">
                <ReactionPicker
                  options={reactionOptions}
                  onPick={(emoji) => {
                    onReact(emoji);
                    onCloseReaction();
                  }}
                  onClose={onCloseReaction}
                />
              </div>
            )}
          </div>

          {/* Hover actions + reaction picker live above via parent */}
        </div>
      </div>
    </motion.div>
  );
}

