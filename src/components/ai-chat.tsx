"use client";

import { useState, useRef, useEffect, useMemo } from "react";
import { useLocale } from "next-intl";
import { Sparkles, X, Send, AlertTriangle, Loader2 } from "lucide-react";
import ReactMarkdown from "react-markdown";
import { CHAT_TRANSLATIONS } from "@/lib/knowledge-base";
import { trackEvent } from "@/lib/analytics";

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
    trackEvent({ action: "ai_chat_message", category: "engagement", label: trimmed.slice(0, 100) });

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

      if (!assistantContent.trim()) {
        setMessages(newMessages);
        throw new Error("Empty response from AI. Please try again.");
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

          if (!assistantContent.trim()) {
            setMessages(newMessages);
            throw new Error("Empty response from AI. Please try again.");
          }
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
      <button
        onClick={() => { setOpen(true); trackEvent({ action: "ai_chat_open", category: "engagement" }); }}
        className="fixed bottom-6 end-6 z-50 flex items-center gap-2 rounded-full bg-[#FF6B00] px-4 py-3 text-white shadow-lg shadow-[#FF6B00]/25 transition-all duration-200 hover:scale-105 active:scale-95"
        style={{
          transform: open ? "scale(0)" : "scale(1)",
          opacity: open ? 0 : 1,
          pointerEvents: open ? "none" : "auto",
        }}
        aria-label={t.title}
      >
        <Sparkles className="h-5 w-5" />
        <span className="text-sm font-medium">Ask AI</span>
      </button>

      {/* Chat Panel */}
      {open && (
      <div
        className="fixed bottom-6 end-6 z-50 flex h-[min(600px,80vh)] w-[min(400px,calc(100vw-3rem))] flex-col overflow-hidden rounded-2xl border border-[#D0D0D0]/50 bg-white shadow-2xl"
      >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-[#D0D0D0]/30 px-4 py-3">
              <div className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#FF6B00]/10">
                  <Sparkles className="h-4 w-4 text-[#FF6B00]" />
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
                    {!msg.content ? (
                      <Loader2 className="h-4 w-4 animate-spin text-[#1b1b1b]/30" />
                    ) : msg.role === "user" ? (
                      msg.content
                    ) : (
                      <ReactMarkdown
                        components={{
                          h1: ({ children }) => <p className="font-semibold text-[#1b1b1b] mt-2 mb-1">{children}</p>,
                          h2: ({ children }) => <p className="font-semibold text-[#1b1b1b] mt-2 mb-1">{children}</p>,
                          h3: ({ children }) => <p className="font-medium text-[#1b1b1b] mt-1.5 mb-0.5">{children}</p>,
                          p: ({ children }) => <p className="mb-1.5 last:mb-0">{children}</p>,
                          strong: ({ children }) => <strong className="font-semibold text-[#1b1b1b]">{children}</strong>,
                          em: ({ children }) => <em className="italic">{children}</em>,
                          ul: ({ children }) => <ul className="ml-3 mb-1.5 space-y-0.5 list-disc">{children}</ul>,
                          ol: ({ children }) => <ol className="ml-3 mb-1.5 space-y-0.5 list-decimal">{children}</ol>,
                          li: ({ children }) => <li className="pl-0.5">{children}</li>,
                          a: ({ href, children }) => (
                            <a href={href} target="_blank" rel="noopener" className="text-[#FF6B00] underline underline-offset-2 hover:text-[#e55f00]">
                              {children}
                            </a>
                          ),
                          hr: () => <hr className="my-2 border-[#D0D0D0]/30" />,
                        }}
                      >
                        {msg.content}
                      </ReactMarkdown>
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
                maxLength={500}
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

            {/* Attribution */}
            <div className="border-t border-[#D0D0D0]/20 px-4 py-1.5 text-center">
              <span className="text-[9px] text-[#1b1b1b]/25">
                AI Assistant by{" "}
                <a
                  href="https://p-a.llc"
                  target="_blank"
                  rel="noopener"
                  className="text-[#1b1b1b]/35 hover:text-[#297FF3] transition-colors"
                >
                  Prime Associates
                </a>
              </span>
            </div>
      </div>
      )}
    </>
  );
}
