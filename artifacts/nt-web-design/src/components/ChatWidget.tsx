import { useState, useRef, useEffect } from "react";
import { useLanguage } from "@/lib/i18n";
import { motion, AnimatePresence } from "framer-motion";
import { Send, X, Bot, Minimize2 } from "lucide-react";

const BASE_URL = import.meta.env.BASE_URL.replace(/\/$/, "");

interface Message {
  role: "user" | "assistant";
  content: string;
}

function TypingDots() {
  return (
    <div style={{ display: "flex", gap: "4px", alignItems: "center", padding: "4px 2px" }}>
      {[0, 1, 2].map((i) => (
        <div
          key={i}
          style={{
            width: "6px", height: "6px", borderRadius: "50%",
            background: "rgba(147,197,253,0.6)",
            animation: "chatDot 1.2s ease-in-out infinite",
            animationDelay: `${i * 0.2}s`,
          }}
        />
      ))}
      <style>{`
        @keyframes chatDot {
          0%, 80%, 100% { transform: scale(0.7); opacity: 0.4; }
          40% { transform: scale(1); opacity: 1; }
        }
      `}</style>
    </div>
  );
}

export default function ChatWidget() {
  const { lang } = useLanguage();
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [started, setStarted] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const t = {
    title: lang === "fr" ? "Assistant NT WebUX" : "NT WebUX Assistant",
    subtitle: lang === "fr" ? "En ligne · Répond instantanément" : "Online · Replies instantly",
    placeholder: lang === "fr" ? "Posez votre question…" : "Ask me anything…",
    greeting: lang === "fr"
      ? "Bonjour ! Je suis l'assistant NT WebUX. Comment puis-je vous aider aujourd'hui ? Je peux répondre à vos questions sur nos services, tarifs, ou délais."
      : "Hi! I'm the NT WebUX assistant. How can I help you today? I can answer questions about our services, pricing, or timelines.",
  };

  // Show greeting when first opened
  useEffect(() => {
    if (open && !started) {
      setStarted(true);
      setMessages([{ role: "assistant", content: t.greeting }]);
    }
  }, [open]);

  // Auto-scroll to bottom
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  // Focus input when opened
  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 200);
  }, [open]);

  async function send() {
    const text = input.trim();
    if (!text || loading) return;

    const userMsg: Message = { role: "user", content: text };
    const history = [...messages, userMsg];
    setMessages(history);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch(`${BASE_URL}/api/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: text,
          history: messages.slice(-10),
        }),
      });

      if (!res.ok) throw new Error("API error");

      const reader = res.body!.getReader();
      const decoder = new TextDecoder();
      let assistantText = "";

      setMessages([...history, { role: "assistant", content: "" }]);
      setLoading(false);

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const raw = decoder.decode(value);
        const lines = raw.split("\n").filter((l) => l.startsWith("data: "));

        for (const line of lines) {
          try {
            const data = JSON.parse(line.slice(6));
            if (data.content) {
              assistantText += data.content;
              setMessages([...history, { role: "assistant", content: assistantText }]);
            }
            if (data.error) {
              setMessages([...history, { role: "assistant", content: data.error }]);
            }
          } catch {}
        }
      }
    } catch {
      setLoading(false);
      setMessages([...history, {
        role: "assistant",
        content: lang === "fr"
          ? "Désolé, une erreur est survenue. Veuillez réessayer ou nous contacter directement."
          : "Sorry, something went wrong. Please try again or contact us directly.",
      }]);
    }
  }

  function handleKey(e: React.KeyboardEvent) {
    if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); send(); }
  }

  return (
    <div style={{ position: "fixed", bottom: "28px", right: "28px", zIndex: 100 }}>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, scale: 0.93, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.93, y: 12 }}
            transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
            style={{
              position: "absolute",
              bottom: "68px",
              right: 0,
              width: "340px",
              background: "#0a1628",
              border: "1px solid rgba(59,130,246,0.2)",
              borderRadius: "20px",
              boxShadow: "0 24px 80px rgba(0,0,0,0.8), 0 0 0 1px rgba(59,130,246,0.08)",
              display: "flex",
              flexDirection: "column",
              overflow: "hidden",
              maxHeight: "520px",
            }}
          >
            {/* Header */}
            <div style={{
              padding: "16px 18px",
              background: "linear-gradient(135deg, rgba(59,130,246,0.15), rgba(37,99,235,0.08))",
              borderBottom: "1px solid rgba(59,130,246,0.15)",
              display: "flex",
              alignItems: "center",
              gap: "12px",
            }}>
              <div style={{
                width: "36px", height: "36px", borderRadius: "10px",
                background: "linear-gradient(135deg,#3b82f6,#2563eb)",
                display: "flex", alignItems: "center", justifyContent: "center",
                flexShrink: 0,
              }}>
                <Bot size={18} color="#fff" />
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: "13px", fontWeight: 700, color: "#fff", lineHeight: 1.3 }}>{t.title}</div>
                <div style={{ fontSize: "11px", color: "rgba(147,197,253,0.7)", display: "flex", alignItems: "center", gap: "5px", marginTop: "2px" }}>
                  <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#4ade80", display: "inline-block" }} />
                  {t.subtitle}
                </div>
              </div>
              <button
                onClick={() => setOpen(false)}
                style={{ background: "none", border: "none", cursor: "pointer", color: "rgba(255,255,255,0.4)", padding: "2px", display: "flex" }}
              >
                <Minimize2 size={16} />
              </button>
            </div>

            {/* Messages */}
            <div style={{
              flex: 1,
              overflowY: "auto",
              padding: "16px 14px",
              display: "flex",
              flexDirection: "column",
              gap: "10px",
              scrollbarWidth: "thin",
              scrollbarColor: "rgba(59,130,246,0.2) transparent",
            }}>
              {messages.map((m, i) => (
                <div
                  key={i}
                  style={{
                    display: "flex",
                    justifyContent: m.role === "user" ? "flex-end" : "flex-start",
                  }}
                >
                  <div
                    style={{
                      maxWidth: "82%",
                      padding: "10px 13px",
                      borderRadius: m.role === "user" ? "14px 14px 4px 14px" : "14px 14px 14px 4px",
                      background: m.role === "user"
                        ? "linear-gradient(135deg,#3b82f6,#2563eb)"
                        : "rgba(255,255,255,0.06)",
                      border: m.role === "user" ? "none" : "1px solid rgba(255,255,255,0.08)",
                      fontSize: "13px",
                      lineHeight: 1.55,
                      color: m.role === "user" ? "#fff" : "rgba(255,255,255,0.85)",
                      whiteSpace: "pre-wrap",
                      wordBreak: "break-word",
                    }}
                  >
                    {m.content || (m.role === "assistant" && <TypingDots />)}
                  </div>
                </div>
              ))}
              {loading && (
                <div style={{ display: "flex", justifyContent: "flex-start" }}>
                  <div style={{
                    padding: "10px 13px",
                    borderRadius: "14px 14px 14px 4px",
                    background: "rgba(255,255,255,0.06)",
                    border: "1px solid rgba(255,255,255,0.08)",
                  }}>
                    <TypingDots />
                  </div>
                </div>
              )}
              <div ref={bottomRef} />
            </div>

            {/* Input */}
            <div style={{
              padding: "12px 14px",
              borderTop: "1px solid rgba(255,255,255,0.07)",
              display: "flex",
              gap: "8px",
              alignItems: "center",
            }}>
              <input
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKey}
                placeholder={t.placeholder}
                disabled={loading}
                style={{
                  flex: 1,
                  background: "rgba(255,255,255,0.06)",
                  border: "1px solid rgba(255,255,255,0.1)",
                  borderRadius: "10px",
                  padding: "9px 13px",
                  fontSize: "13px",
                  color: "#fff",
                  outline: "none",
                  fontFamily: "inherit",
                  transition: "border-color 0.2s",
                }}
                onFocus={(e) => (e.target.style.borderColor = "rgba(59,130,246,0.5)")}
                onBlur={(e) => (e.target.style.borderColor = "rgba(255,255,255,0.1)")}
              />
              <button
                onClick={send}
                disabled={!input.trim() || loading}
                style={{
                  width: "36px", height: "36px", borderRadius: "10px",
                  background: input.trim() && !loading ? "linear-gradient(135deg,#3b82f6,#2563eb)" : "rgba(255,255,255,0.08)",
                  border: "none", cursor: input.trim() && !loading ? "pointer" : "not-allowed",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  flexShrink: 0, transition: "background 0.2s",
                  color: input.trim() && !loading ? "#fff" : "rgba(255,255,255,0.3)",
                }}
              >
                <Send size={15} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Toggle button */}
      <motion.button
        onClick={() => setOpen((o) => !o)}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
        aria-label="Chat"
        style={{
          width: "52px", height: "52px", borderRadius: "50%",
          background: "linear-gradient(135deg,#3b82f6,#2563eb)",
          border: "none", cursor: "pointer",
          display: "flex", alignItems: "center", justifyContent: "center",
          boxShadow: "0 4px 24px rgba(59,130,246,0.5)",
          color: "#fff", position: "relative",
        }}
      >
        <AnimatePresence mode="wait">
          {open ? (
            <motion.span key="x" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.15 }}>
              <X size={20} />
            </motion.span>
          ) : (
            <motion.span key="chat" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.15 }}>
              <Bot size={22} />
            </motion.span>
          )}
        </AnimatePresence>
      </motion.button>
    </div>
  );
}
