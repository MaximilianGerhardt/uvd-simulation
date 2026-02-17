"use client";

import { useState, useRef, useEffect } from "react";
import { useLocale } from "next-intl";
import { MessageCircle, X, Send, AlertTriangle, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { CHAT_TRANSLATIONS } from "@/lib/knowledge-base";

interface Message {
  role: "user" | "assistant";
  content: string;
}

export function AIChat() {
  const locale = useLocale();
  const t = CHAT_TRANSLATIONS[locale] || CHAT_TRANSLATIONS.en;
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 300);
    }
  }, [open]);

  async function handleSubmit(e?: React.FormEvent) {
    e?.preventDefault();
    const trimmed = input.trim();
    if (!trimmed || isLoading) return;

    setError(null);
    const userMessage: Message = { role: "user", content: trimmed };
    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setInput("");
    setIsLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: newMessages.map((m) => ({ role: m.role, content: m.content })),
          locale,
        }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || `Error ${res.status}`);
      }

      const reader = res.body?.getReader();
      if (!reader) throw new Error("No response stream");

      const decoder = new TextDecoder();
      let assistantContent = "";

      setMessages([...newMessages, { role: "assistant", content: "" }]);

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        assistantContent += decoder.decode(value, { stream: true });
        setMessages([...newMessages, { role: "assistant", content: assistantContent }]);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setIsLoading(false);
    }
  }

  function handleSuggestion(question: string) {
    setInput(question);
    setTimeout(() => {
      const fakeEvent = { preventDefault: () => {} } as React.FormEvent;
      setInput("");
      const userMessage: Message = { role: "user", content: question };
      const newMessages = [...messages, userMessage];
      setMessages(newMessages);
      setIsLoading(true);
      setError(null);

      fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: newMessages.map((m) => ({ role: m.role, content: m.content })),
          locale,
        }),
      })
        .then(async (res) => {
          if (!res.ok) {
            const data = await res.json().catch(() => ({}));
            throw new Error(data.error || `Error ${res.status}`);
          }

          const reader = res.body?.getReader();
          if (!reader) throw new Error("No response stream");

          const decoder = new TextDecoder();
          let assistantContent = "";
          setMessages([...newMessages, { role: "assistant", content: "" }]);

          const read = async () => {
            while (true) {
              const { done, value } = await reader.read();
              if (done) break;
              assistantContent += decoder.decode(value, { stream: true });
              setMessages([...newMessages, { role: "assistant", content: assistantContent }]);
            }
          };
          await read();
        })
        .catch((err) => {
          setError(err instanceof Error ? err.message : "An error occurred");
        })
        .finally(() => {
          setIsLoading(false);
        });
    }, 0);
  }

  return (
    <>
      {/* Floating Button */}
      <AnimatePresence>
        {!open && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            onClick={() => setOpen(true)}
            className="fixed bottom-6 end-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#FF6B00] text-white shadow-lg shadow-[#FF6B00]/25 transition-transform hover:scale-105 active:scale-95"
            aria-label={t.title}
          >
            <MessageCircle className="h-6 w-6" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Chat Panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-6 end-6 z-50 flex h-[min(600px,80vh)] w-[min(400px,calc(100vw-3rem))] flex-col overflow-hidden rounded-2xl border border-[#D0D0D0]/50 bg-white shadow-2xl"
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-[#D0D0D0]/30 px-4 py-3">
              <div className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#FF6B00]/10">
                  <MessageCircle className="h-4 w-4 text-[#FF6B00]" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-[#1b1b1b]">{t.title}</p>
                  <p className="text-[10px] text-[#1b1b1b]/60">{t.disclaimer}</p>
                </div>
              </div>
              <button
                onClick={() => setOpen(false)}
                className="rounded-full p-1.5 text-[#1b1b1b]/60 transition-colors hover:bg-[#f8f8f8] hover:text-[#1b1b1b]"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Disclaimer Banner */}
            <div className="flex items-center gap-2 border-b border-[#D0D0D0]/20 bg-[#FF6B00]/5 px-4 py-2">
              <AlertTriangle className="h-3 w-3 shrink-0 text-[#FF6B00]" />
              <p className="text-[10px] text-[#1b1b1b]/60">{t.disclaimer}</p>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
              {messages.length === 0 && (
                <div className="space-y-2">
                  <p className="text-center text-xs text-[#1b1b1b]/30 mb-4">
                    {t.placeholder}
                  </p>
                  <div className="flex flex-wrap gap-2 justify-center">
                    {t.suggestedQuestions.map((q) => (
                      <button
                        key={q}
                        onClick={() => handleSuggestion(q)}
                        className="rounded-full border border-[#D0D0D0]/50 px-3 py-1.5 text-xs text-[#1b1b1b]/60 transition-all hover:border-[#FF6B00]/30 hover:text-[#FF6B00]"
                      >
                        {q}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {messages.map((msg, i) => (
                <div
                  key={i}
                  className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
                      msg.role === "user"
                        ? "bg-[#1b1b1b] text-white"
                        : "border border-[#D0D0D0]/30 bg-[#f8f8f8] text-[#1b1b1b]/70"
                    }`}
                  >
                    {msg.content || (
                      <Loader2 className="h-4 w-4 animate-spin text-[#1b1b1b]/30" />
                    )}
                  </div>
                </div>
              ))}

              {error && (
                <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-2 text-xs text-red-600">
                  {error}
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <form
              onSubmit={handleSubmit}
              className="flex items-center gap-2 border-t border-[#D0D0D0]/30 px-4 py-3"
            >
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={t.placeholder}
                disabled={isLoading}
                className="flex-1 bg-transparent text-sm text-[#1b1b1b] placeholder-[#1b1b1b]/30 outline-none disabled:opacity-50"
              />
              <button
                type="submit"
                disabled={!input.trim() || isLoading}
                className="flex h-8 w-8 items-center justify-center rounded-full bg-[#FF6B00] text-white transition-all hover:bg-[#e55f00] disabled:opacity-30 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <Loader2 className="h-3.5 w-3.5 animate-spin" />
                ) : (
                  <Send className="h-3.5 w-3.5" />
                )}
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
