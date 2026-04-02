import { useState, useRef, useEffect } from "react";
import { useLanguage } from "@/lib/i18n";
import { motion, AnimatePresence } from "framer-motion";
import { Send, X, Bot, ArrowLeft, MessageCircle, Mail, Phone, ChevronRight } from "lucide-react";

// VITE_API_URL lets you point to an externally deployed API (e.g. render.com backend service).
// If not set, falls back to the same origin (works on Replit and local dev).
const API_BASE = (import.meta.env.VITE_API_URL || import.meta.env.BASE_URL).replace(/\/$/, "");
const PHONE = "(438) 806-7640";
const PHONE_RAW = "14388067640";
const EMAIL = "nicktech@computer4u.com";

interface Message {
  role: "user" | "assistant";
  content: string;
}

type View = "home" | "chat";

function TypingDots() {
  return (
    <div style={{ display: "flex", gap: "4px", alignItems: "center", padding: "4px 2px" }}>
      {[0, 1, 2].map((i) => (
        <div key={i} style={{
          width: "6px", height: "6px", borderRadius: "50%",
          background: "rgba(147,197,253,0.6)",
          animation: "chatDot 1.2s ease-in-out infinite",
          animationDelay: `${i * 0.2}s`,
        }} />
      ))}
      <style>{`
        @keyframes chatDot {
          0%,80%,100% { transform:scale(0.7); opacity:0.4; }
          40% { transform:scale(1); opacity:1; }
        }
      `}</style>
    </div>
  );
}

/* ── Home screen ────────────────────────────────────── */
function HomeView({ lang, onStartChat }: { lang: string; onStartChat: () => void }) {
  const hero = lang === "fr" ? "Comment pouvons-nous vous aider ?" : "How can we help you?";
  const sub  = lang === "fr" ? "Choisissez comment nous contacter — nous sommes là pour vous." : "Choose how to reach us — we're here for you.";

  const channels = [
    {
      icon: <Phone size={18} />,
      color: "#3b82f6",
      bg: "rgba(59,130,246,0.1)",
      border: "rgba(59,130,246,0.2)",
      title: lang === "fr" ? "Appelez-nous" : "Call us",
      detail: PHONE,
      note: lang === "fr" ? "Disponible lun–ven, 9h–18h" : "Available Mon–Fri, 9 am–6 pm",
      action: () => { window.open(`tel:+${PHONE_RAW}`); },
    },
    {
      icon: <MessageCircle size={18} />,
      color: "#93c5fd",
      bg: "rgba(59,130,246,0.08)",
      border: "rgba(59,130,246,0.18)",
      title: lang === "fr" ? "Discutez avec nous" : "Chat with us",
      detail: lang === "fr" ? "Discutez avec Silas — IA" : "Chat with Silas — AI",
      note: lang === "fr" ? "Disponible 24h/24, 7j/7" : "Available 24/7",
      action: onStartChat,
      highlight: true,
    },
    {
      icon: <Mail size={18} />,
      color: "rgba(255,255,255,0.7)",
      bg: "rgba(255,255,255,0.04)",
      border: "rgba(255,255,255,0.1)",
      title: lang === "fr" ? "Envoyez-nous un email" : "Email us",
      detail: EMAIL,
      note: lang === "fr" ? "Réponse sous 24 h" : "Reply within 24 hours",
      action: () => { window.open(`mailto:${EMAIL}`); },
    },
  ];

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
      {/* Hero band */}
      <div style={{
        padding: "28px 22px 24px",
        background: "linear-gradient(145deg, rgba(37,99,235,0.3) 0%, rgba(15,23,42,0.6) 100%)",
        borderBottom: "1px solid rgba(59,130,246,0.15)",
        position: "relative",
        overflow: "hidden",
      }}>
        {/* Decorative orb */}
        <div style={{ position: "absolute", top: "-40px", right: "-40px", width: "140px", height: "140px", borderRadius: "50%", background: "radial-gradient(circle, rgba(59,130,246,0.2) 0%, transparent 70%)", pointerEvents: "none" }} />

        {/* Avatar row */}
        <div style={{ display: "flex", gap: "-6px", marginBottom: "14px" }}>
          {["S"].map((init) => (
            <div key={init} style={{
              width: "40px", height: "40px", borderRadius: "50%",
              background: "linear-gradient(135deg,#3b82f6,#2563eb)",
              border: "2px solid rgba(255,255,255,0.15)",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: "15px", fontWeight: 800, color: "#fff",
            }}>{init}</div>
          ))}
        </div>

        <div style={{ fontSize: "17px", fontWeight: 800, color: "#fff", marginBottom: "6px", lineHeight: 1.3 }}>{hero}</div>
        <div style={{ fontSize: "12.5px", color: "rgba(147,197,253,0.75)", lineHeight: 1.5 }}>{sub}</div>
      </div>

      {/* Channel cards */}
      <div style={{ padding: "14px 14px", display: "flex", flexDirection: "column", gap: "8px", flex: 1 }}>
        {channels.map((ch) => (
          <button
            key={ch.title}
            onClick={ch.action}
            style={{
              display: "flex", alignItems: "center", gap: "13px",
              padding: "13px 14px",
              background: ch.highlight ? "rgba(59,130,246,0.1)" : ch.bg,
              border: `1px solid ${ch.highlight ? "rgba(59,130,246,0.3)" : ch.border}`,
              borderRadius: "13px",
              cursor: "pointer", width: "100%", textAlign: "left",
              transition: "background 0.18s, border-color 0.18s, transform 0.15s",
              position: "relative",
            }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLButtonElement).style.background = ch.highlight ? "rgba(59,130,246,0.18)" : "rgba(255,255,255,0.07)";
              (e.currentTarget as HTMLButtonElement).style.transform = "translateY(-1px)";
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLButtonElement).style.background = ch.highlight ? "rgba(59,130,246,0.1)" : ch.bg;
              (e.currentTarget as HTMLButtonElement).style.transform = "translateY(0)";
            }}
          >
            {/* Icon */}
            <div style={{
              width: "38px", height: "38px", borderRadius: "10px",
              background: ch.highlight ? "linear-gradient(135deg,#3b82f6,#2563eb)" : `rgba(255,255,255,0.06)`,
              border: `1px solid ${ch.highlight ? "transparent" : "rgba(255,255,255,0.08)"}`,
              display: "flex", alignItems: "center", justifyContent: "center",
              flexShrink: 0, color: ch.highlight ? "#fff" : ch.color,
            }}>
              {ch.icon}
            </div>

            {/* Text */}
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: "13px", fontWeight: 700, color: "#fff", marginBottom: "2px" }}>{ch.title}</div>
              <div style={{ fontSize: "11.5px", color: "rgba(255,255,255,0.45)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{ch.detail}</div>
              <div style={{ fontSize: "10.5px", color: ch.highlight ? "rgba(147,197,253,0.65)" : "rgba(255,255,255,0.28)", marginTop: "2px" }}>{ch.note}</div>
            </div>

            <ChevronRight size={15} color="rgba(255,255,255,0.25)" style={{ flexShrink: 0 }} />
          </button>
        ))}
      </div>

      {/* Footer */}
      <div style={{ padding: "10px 18px 14px", textAlign: "center", borderTop: "1px solid rgba(255,255,255,0.05)" }}>
        <span style={{ fontSize: "10.5px", color: "rgba(255,255,255,0.2)", fontWeight: 500 }}>NT Web UX · Montréal</span>
      </div>
    </div>
  );
}

/* ── Chat screen ────────────────────────────────────── */
function ChatView({ lang, onBack }: { lang: string; onBack: () => void }) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const greeting = lang === "fr"
    ? "Bonjour ! Je m'appelle Silas, l'assistant IA de NT Web UX. Posez-moi n'importe quelle question sur nos services, tarifs ou délais de livraison."
    : "Hi there! I'm Silas, the AI assistant for NT Web UX. Ask me anything about our services, pricing, or turnaround times — happy to help!";

  useEffect(() => {
    setMessages([{ role: "assistant", content: greeting }]);
    setTimeout(() => inputRef.current?.focus(), 100);
  }, []);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  async function send() {
    const text = input.trim();
    if (!text || loading) return;
    const userMsg: Message = { role: "user", content: text };
    const history = [...messages, userMsg];
    setMessages(history);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch(`${API_BASE}/api/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text, history: messages.slice(-10) }),
      });
      if (!res.ok) throw new Error();
      const reader = res.body!.getReader();
      const decoder = new TextDecoder();
      let text2 = "";
      setMessages([...history, { role: "assistant", content: "" }]);
      setLoading(false);
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        for (const line of decoder.decode(value).split("\n").filter(l => l.startsWith("data: "))) {
          try {
            const raw = line.slice(6);
            const d = JSON.parse(raw);
            console.log("[chat SSE]", d);
            // Handle all common field names the server might use
            const chunk = d.content ?? d.message ?? d.assistant ?? d.text ?? null;
            if (chunk) { text2 += chunk; setMessages([...history, { role: "assistant", content: text2 }]); }
            if (d.error) setMessages([...history, { role: "assistant", content: d.error }]);
          } catch {}
        }
      }
      // Safety net: if stream ended but nothing was written, show a fallback instead of a stuck empty bubble
      if (!text2) {
        setMessages([...history, { role: "assistant", content: lang === "fr" ? "Désolé, une erreur est survenue. Contactez-nous par email." : "Sorry, something went wrong. Please try again or email us." }]);
      }
    } catch {
      setLoading(false);
      setMessages([...history, { role: "assistant", content: lang === "fr" ? "Une erreur est survenue. Réessayez ou contactez-nous par email." : "Something went wrong. Please try again or email us." }]);
    }
  }

  const placeholder = lang === "fr" ? "Écrivez votre message…" : "Write a message…";

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
      {/* Chat header */}
      <div style={{
        padding: "14px 16px",
        background: "linear-gradient(135deg, rgba(59,130,246,0.14), rgba(37,99,235,0.06))",
        borderBottom: "1px solid rgba(59,130,246,0.15)",
        display: "flex", alignItems: "center", gap: "11px",
      }}>
        <button onClick={onBack} style={{ background: "none", border: "none", cursor: "pointer", color: "rgba(147,197,253,0.7)", padding: "2px", display: "flex", flexShrink: 0 }}>
          <ArrowLeft size={17} />
        </button>
        <div style={{ width: "32px", height: "32px", borderRadius: "9px", background: "linear-gradient(135deg,#3b82f6,#2563eb)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
          <Bot size={16} color="#fff" />
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: "13px", fontWeight: 700, color: "#fff", lineHeight: 1 }}>Silas <span style={{ fontSize: "11px", fontWeight: 500, color: "rgba(147,197,253,0.6)" }}>· NT Web UX AI</span></div>
          <div style={{ fontSize: "11px", color: "rgba(147,197,253,0.65)", marginTop: "3px", display: "flex", alignItems: "center", gap: "5px" }}>
            <span style={{ width: "5px", height: "5px", borderRadius: "50%", background: "#4ade80", display: "inline-block" }} />
            {lang === "fr" ? "En ligne · Répond instantanément" : "Online · Replies instantly"}
          </div>
        </div>
      </div>

      {/* Messages */}
      <div style={{ flex: 1, overflowY: "auto", padding: "14px 12px", display: "flex", flexDirection: "column", gap: "9px", scrollbarWidth: "thin", scrollbarColor: "rgba(59,130,246,0.2) transparent" }}>
        {messages.map((m, i) => (
          <div key={i} style={{ display: "flex", justifyContent: m.role === "user" ? "flex-end" : "flex-start" }}>
            <div style={{
              maxWidth: "82%", padding: "9px 13px",
              borderRadius: m.role === "user" ? "14px 14px 4px 14px" : "14px 14px 14px 4px",
              background: m.role === "user" ? "linear-gradient(135deg,#3b82f6,#2563eb)" : "rgba(255,255,255,0.06)",
              border: m.role === "user" ? "none" : "1px solid rgba(255,255,255,0.08)",
              fontSize: "13px", lineHeight: 1.55,
              color: m.role === "user" ? "#fff" : "rgba(255,255,255,0.85)",
              whiteSpace: "pre-wrap", wordBreak: "break-word",
            }}>
              {m.content || (m.role === "assistant" ? <TypingDots /> : null)}
            </div>
          </div>
        ))}
        {loading && (
          <div style={{ display: "flex", justifyContent: "flex-start" }}>
            <div style={{ padding: "9px 13px", borderRadius: "14px 14px 14px 4px", background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.08)" }}>
              <TypingDots />
            </div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <div style={{ padding: "10px 12px 12px", borderTop: "1px solid rgba(255,255,255,0.06)", display: "flex", gap: "8px", alignItems: "center" }}>
        <input
          ref={inputRef}
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === "Enter" && !e.shiftKey && (e.preventDefault(), send())}
          placeholder={placeholder}
          disabled={loading}
          style={{ flex: 1, background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "10px", padding: "9px 13px", fontSize: "13px", color: "#fff", outline: "none", fontFamily: "inherit", transition: "border-color 0.2s" }}
          onFocus={e => (e.target.style.borderColor = "rgba(59,130,246,0.5)")}
          onBlur={e => (e.target.style.borderColor = "rgba(255,255,255,0.1)")}
        />
        <button
          onClick={send}
          disabled={!input.trim() || loading}
          style={{ width: "36px", height: "36px", borderRadius: "10px", background: input.trim() && !loading ? "linear-gradient(135deg,#3b82f6,#2563eb)" : "rgba(255,255,255,0.07)", border: "none", cursor: input.trim() && !loading ? "pointer" : "not-allowed", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, transition: "background 0.2s", color: input.trim() && !loading ? "#fff" : "rgba(255,255,255,0.25)" }}
        >
          <Send size={14} />
        </button>
      </div>
    </div>
  );
}

/* ── Root widget ────────────────────────────────────── */
export default function ChatWidget() {
  const { lang } = useLanguage();
  const [open, setOpen] = useState(false);
  const [view, setView] = useState<View>("home");

  // Reset to home when closed
  function close() { setOpen(false); setTimeout(() => setView("home"), 300); }

  return (
    <div style={{ position: "fixed", bottom: "28px", right: "28px", zIndex: 100 }}>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, scale: 0.93, y: 14 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.93, y: 14 }}
            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
            style={{
              position: "absolute", bottom: "68px", right: 0,
              width: "340px",
              height: view === "chat" ? "500px" : "auto",
              maxHeight: "560px",
              background: "#0a1628",
              border: "1px solid rgba(59,130,246,0.18)",
              borderRadius: "22px",
              boxShadow: "0 24px 80px rgba(0,0,0,0.85), 0 0 0 1px rgba(59,130,246,0.06)",
              overflow: "hidden",
              display: "flex", flexDirection: "column",
            }}
          >
            {/* Close button */}
            <button
              onClick={close}
              style={{ position: "absolute", top: "13px", right: "14px", zIndex: 10, background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "8px", width: "28px", height: "28px", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", color: "rgba(255,255,255,0.55)", transition: "background 0.15s" }}
              onMouseEnter={e => (e.currentTarget.style.background = "rgba(255,255,255,0.14)")}
              onMouseLeave={e => (e.currentTarget.style.background = "rgba(255,255,255,0.08)")}
            >
              <X size={14} />
            </button>

            {/* View switcher */}
            <AnimatePresence mode="wait">
              {view === "home" ? (
                <motion.div key="home" initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -16 }} transition={{ duration: 0.18 }} style={{ flex: 1, display: "flex", flexDirection: "column" }}>
                  <HomeView lang={lang} onStartChat={() => setView("chat")} />
                </motion.div>
              ) : (
                <motion.div key="chat" initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 16 }} transition={{ duration: 0.18 }} style={{ flex: 1, display: "flex", flexDirection: "column", height: "500px" }}>
                  <ChatView lang={lang} onBack={() => setView("home")} />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>

      {/* FAB toggle */}
      <motion.button
        onClick={() => open ? close() : setOpen(true)}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
        aria-label="Contact"
        style={{ width: "52px", height: "52px", borderRadius: "50%", background: "linear-gradient(135deg,#3b82f6,#2563eb)", border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 4px 28px rgba(59,130,246,0.55)", color: "#fff" }}
      >
        <AnimatePresence mode="wait">
          {open ? (
            <motion.span key="x" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.15 }}>
              <X size={20} />
            </motion.span>
          ) : (
            <motion.span key="msg" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.15 }}>
              <MessageCircle size={22} />
            </motion.span>
          )}
        </AnimatePresence>
      </motion.button>
    </div>
  );
}
