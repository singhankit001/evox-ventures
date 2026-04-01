'use client';

import { useRef, useState } from 'react';
import { Mic, Paperclip, Send, Smile, X } from 'lucide-react';

const INPUT_EMOJIS = ['😀', '😂', '😍', '🔥', '🎉', '😮', '🙏', '👍', '❤️'];

function insertAtCursor(textareaEl, insertText) {
  if (!textareaEl) return;
  const start = textareaEl.selectionStart ?? textareaEl.value.length;
  const end = textareaEl.selectionEnd ?? textareaEl.value.length;
  const next = `${textareaEl.value.slice(0, start)}${insertText}${textareaEl.value.slice(end)}`;
  textareaEl.value = next;
  textareaEl.dispatchEvent(new Event('input', { bubbles: true }));

  // best-effort caret placement
  requestAnimationFrame(() => {
    const caret = start + insertText.length;
    textareaEl.selectionStart = caret;
    textareaEl.selectionEnd = caret;
  });
}

export default function FloatingChatInput({
  theme,
  replyToMessage,
  replyToId,
  onCancelReply,
  onSend,
}) {
  const textareaRef = useRef(null);

  const [text, setText] = useState('');
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [attachmentName, setAttachmentName] = useState('');
  const [isVoice, setIsVoice] = useState(false);

  const fileInputRef = useRef(null);

  const sendDisabled = !text.trim() && !attachmentName && !isVoice;

  const onSendClick = () => {
    if (sendDisabled) return;
    onSend({ text, attachmentName: attachmentName || undefined, isVoice });
    setText('');
    setAttachmentName('');
    setIsVoice(false);
    setShowEmojiPicker(false);
  };

  return (
    <div
      className={`rounded-3xl border ${
        theme === 'dark' ? 'bg-white/5 border-white/10' : 'bg-white/70 border-white/40'
      } backdrop-blur-xl shadow-lg`}
    >
      {replyToMessage && (
        <div className="px-4 pt-3 pb-2 border-b border-white/10">
          <div className="flex items-center justify-between gap-3">
            <div className="min-w-0">
              <div className="text-[12px] font-semibold text-slate-200/90">
                Replying to {replyToMessage.sender === 'me' ? 'You' : 'Evox'}
              </div>
              <div className="text-[12px] text-slate-200/70 truncate">
                {(replyToMessage.text ??
                  (replyToMessage.attachmentName ? `Attachment: ${replyToMessage.attachmentName}` : 'Voice message')) ||
                  ''}
              </div>
            </div>
            <button
              type="button"
              onClick={onCancelReply}
              className="h-8 w-8 rounded-xl inline-flex items-center justify-center bg-white/5 hover:bg-white/10 border border-white/10 transition"
              aria-label="Cancel reply"
            >
              <X size={16} />
            </button>
          </div>
        </div>
      )}

      <div className="p-3 sm:p-4 relative">
        {attachmentName && (
          <div className="mb-2 flex items-center justify-between gap-3 px-3 py-2 rounded-2xl bg-black/25 border border-white/10">
            <div className="min-w-0">
              <div className="text-[12px] text-slate-200/80 font-semibold">File</div>
              <div className="text-sm text-slate-100 truncate">{attachmentName}</div>
            </div>
            <button
              type="button"
              onClick={() => setAttachmentName('')}
              className="h-9 w-9 rounded-xl inline-flex items-center justify-center bg-white/5 hover:bg-white/10 border border-white/10 transition"
              aria-label="Remove attachment"
            >
              <X size={16} />
            </button>
          </div>
        )}

        {isVoice && (
          <div className="mb-2 text-[12px] text-slate-200/80 font-semibold flex items-center gap-2">
            <span className="inline-flex h-2.5 w-2.5 rounded-full bg-rose-400" />
            Voice mode enabled (demo)
          </div>
        )}

        {showEmojiPicker && (
          <div className="absolute bottom-20 left-3 sm:left-5 z-20 p-2 rounded-2xl bg-black/45 border border-white/15 backdrop-blur-lg shadow-xl">
            <div className="flex flex-wrap gap-1 max-w-[280px]">
              {INPUT_EMOJIS.map((emoji) => (
                <button
                  key={emoji}
                  type="button"
                  onClick={() => {
                    const el = textareaRef.current;
                    insertAtCursor(el, emoji);
                    setShowEmojiPicker(false);
                  }}
                  className="h-10 w-10 rounded-xl hover:bg-white/10 transition text-[18px]"
                  aria-label={`Insert emoji ${emoji}`}
                >
                  {emoji}
                </button>
              ))}
            </div>
          </div>
        )}

        <div className="flex items-end gap-2">
          <div className="flex items-center gap-2">
            <button
              type="button"
              className="h-11 w-11 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 transition inline-flex items-center justify-center"
              onClick={() => {
                setIsVoice(false);
                setShowEmojiPicker((v) => !v);
              }}
              aria-label="Insert emoji"
            >
              <Smile size={18} />
            </button>

            <button
              type="button"
              className="h-11 w-11 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 transition inline-flex items-center justify-center"
              onClick={() => fileInputRef.current?.click()}
              aria-label="Upload file"
            >
              <Paperclip size={18} />
            </button>

            <input
              ref={fileInputRef}
              type="file"
              className="hidden"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) setAttachmentName(file.name);
              }}
            />

            <button
              type="button"
              className={`h-11 w-11 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 transition inline-flex items-center justify-center ${
                isVoice ? 'text-rose-300' : 'text-slate-100'
              }`}
              onClick={() => {
                setAttachmentName('');
                setIsVoice((v) => !v);
                setShowEmojiPicker(false);
              }}
              aria-label="Voice message (demo)"
            >
              <Mic size={18} />
            </button>
          </div>

          <div className="flex-1 min-w-0">
            <textarea
              ref={textareaRef}
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Write a message…"
              rows={1}
              className={`w-full resize-none outline-none bg-transparent border-0 text-sm sm:text-base px-1 ${
                theme === 'dark' ? 'text-slate-100 placeholder:text-slate-400/90' : 'text-slate-900 placeholder:text-slate-500/70'
              }`}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  onSendClick();
                }
              }}
            />
          </div>

          <button
            type="button"
            disabled={sendDisabled}
            onClick={onSendClick}
            className={`h-11 w-11 rounded-2xl transition inline-flex items-center justify-center border ${
              sendDisabled
                ? 'bg-white/5 border-white/10 text-slate-400 cursor-not-allowed'
                : 'bg-gradient-to-br from-sky-500 to-indigo-500 border-white/15 text-white shadow-lg shadow-sky-500/20 hover:brightness-110'
            }`}
            aria-label="Send message"
          >
            <Send size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}

