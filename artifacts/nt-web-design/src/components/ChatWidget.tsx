import { useState, useRef, useEffect, type CSSProperties } from "react";
import { useLanguage } from "@/lib/i18n";
import { motion, AnimatePresence } from "framer-motion";
import { Send, X, ArrowLeft, MessageCircle, Mail, Phone, ChevronRight, Cpu } from "lucide-react";

const PHONE     = "(438) 806-7640";
const PHONE_RAW = "14388067640";
const EMAIL     = "info@ntwebux.com";

/* ─── Types ────────────────────────────────────────────────── */
interface Message {
  role: "user" | "bot";
  content: string;
  chips?: string[];   // optional quick-reply chips attached to a bot message
}
type View = "home" | "chat";

/* ─── Typing indicator ──────────────────────────────────────── */
function TypingDots() {
  return (
    <div style={{ display: "flex", gap: "5px", alignItems: "center", padding: "4px 2px" }}>
      {[0, 1, 2].map((i) => (
        <div key={i} style={{
          width: "6px", height: "6px", borderRadius: "50%",
          background: "rgba(34,211,238,0.55)",
          animation: "chatDot 1.1s ease-in-out infinite",
          animationDelay: `${i * 0.18}s`,
        }} />
      ))}
      <style>{`
        @keyframes chatDot {
          0%,80%,100% { transform:scale(0.65); opacity:0.35; }
          40%          { transform:scale(1);    opacity:1;    }
        }
      `}</style>
    </div>
  );
}

/* ─── Keyword-matching engine ───────────────────────────────── */
function matchReply(raw: string, rules: Record<string, string>): string {
  const t = raw.toLowerCase();
  if (/price|cost|pricing|997|297|tarif|co[uû]t|prix|combien|how much|quel prix/.test(t))
    return rules.price;
  if (/\bai\b|automat|text.?back|\bia\b|automatisation|chatbot|voice.?agent|workflow/.test(t))
    return rules.ai;
  if (/website|web|portfolio|design|site|bento|showreel|page|landing/.test(t))
    return rules.website;
  if (/hello|hi\b|who are you|bonjour|salut|qui [eê]tes|coucou|hey\b|good (morning|afternoon)/.test(t))
    return rules.hello;
  if (/montreal|africa|japan|bilingual|bilingue|abidjan|hub|global|borderless/.test(t))
    return rules.global;
  if (/\bcode\b|custom|template|engineer|bespoke|framework|next\.?js|performance|speed|securit/.test(t))
    return rules.quality;
  if (/\bwhy\b|benefit|help|result|pourquoi|b[eé]n[eé]fice|r[eé]sultat|advantage|diff[eé]rence/.test(t))
    return rules.why;
  if (/\bfast\b|how long|timeline|start|when|d[eé]lai|livraison|rapide|begin|launch/.test(t))
    return rules.timeline;
  if (/money|leak|revenue|audit|losing|miss|appel|manqu|revenu|argent|calculat/.test(t))
    return rules.audit;
  if (/scale|foundation|fondation|build|construire/.test(t))
    return rules.scale;
  if (/automate|booking|r[eé]servation|roi|recover|recuper/.test(t))
    return rules.automate;
  return rules.fallback;
}

/* ─── Cyan bot avatar ───────────────────────────────────────── */
function BotAvatar({ size = 32 }: { size?: number }) {
  return (
    <div style={{
      width: `${size}px`, height: `${size}px`, borderRadius: `${Math.round(size * 0.28)}px`,
      background: "linear-gradient(135deg,#06b6d4,#0891b2)",
      boxShadow: "0 0 16px rgba(6,182,212,0.55)",
      display: "flex", alignItems: "center", justifyContent: "center",
      flexShrink: 0,
    }}>
      <Cpu size={Math.round(size * 0.5)} color="#fff" strokeWidth={1.8} />
    </div>
  );
}

/* ─── Chat screen (rule-based, zero API) ────────────────────── */
function ChatView({ lang, onBack, t }: { lang: string; onBack: () => void; t: (k: string) => any }) {
  const chat = t("chat");
  const rules: Record<string, string> = chat.rules;

  const WELCOME: Message = {
    role: "bot",
    content: chat.welcome,
    chips: [chat.scaleChip, chat.automateChip],
  };

  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput]       = useState("");
  const [typing, setTyping]     = useState(true);   // bot is "typing" on mount
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef  = useRef<HTMLInputElement>(null);

  /* Show welcome after 1.2-second typing animation */
  useEffect(() => {
    const id = setTimeout(() => {
      setTyping(false);
      setMessages([WELCOME]);
      setTimeout(() => inputRef.current?.focus(), 80);
    }, 1200);
    return () => clearTimeout(id);
  }, []);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, typing]);

  function send(text: string) {
    const trimmed = text.trim();
    if (!trimmed) return;
    const userMsg: Message = { role: "user", content: trimmed };
    const next = [...messages, userMsg];
    setMessages(next);
    setInput("");
    setTyping(true);
    setTimeout(() => {
      setTyping(false);
      setMessages([...next, { role: "bot", content: matchReply(trimmed, rules) }]);
    }, 1200);
  }

  const BUBBLE_BOT: CSSProperties = {
    maxWidth: "86%", padding: "10px 13px",
    borderRadius: "4px 14px 14px 14px",
    background: "rgba(255,255,255,0.055)",
    border: "1px solid rgba(255,255,255,0.10)",
    fontSize: "13px", lineHeight: 1.58,
    color: "rgba(255,255,255,0.88)",
    whiteSpace: "pre-wrap", wordBreak: "break-word",
  };
  const BUBBLE_USER: CSSProperties = {
    maxWidth: "82%", padding: "10px 13px",
    borderRadius: "14px 4px 14px 14px",
    background: "linear-gradient(135deg,#0891b2,#06b6d4)",
    fontSize: "13px", lineHeight: 1.58,
    color: "#fff", wordBreak: "break-word",
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%", minHeight: 0 }}>

      {/* Header */}
      <div style={{
        padding: "13px 16px",
        background: "linear-gradient(135deg,rgba(6,182,212,0.12),rgba(2,6,23,0.4))",
        borderBottom: "1px solid rgba(255,255,255,0.10)",
        display: "flex", alignItems: "center", gap: "11px", flexShrink: 0,
      }}>
        <button onClick={onBack} style={{ background: "none", border: "none", cursor: "pointer", color: "rgba(103,232,249,0.65)", padding: "2px", display: "flex", flexShrink: 0 }}>
          <ArrowLeft size={17} />
        </button>
        <BotAvatar size={34} />
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontSize: "13px", fontWeight: 700, color: "#fff", lineHeight: 1 }}>
            {chat.name}
            <span style={{ fontSize: "11px", fontWeight: 400, color: "rgba(103,232,249,0.55)", marginLeft: "6px" }}>· {chat.subName}</span>
          </div>
          <div style={{ fontSize: "11px", color: "rgba(103,232,249,0.65)", marginTop: "3px", display: "flex", alignItems: "center", gap: "5px" }}>
            <span style={{ width: "5px", height: "5px", borderRadius: "50%", background: "#4ade80", display: "inline-block", boxShadow: "0 0 6px #4ade80" }} />
            {chat.status}
          </div>
        </div>
      </div>

      {/* Message list */}
      <div style={{
        flex: 1, overflowY: "auto", padding: "14px 13px",
        display: "flex", flexDirection: "column", gap: "10px",
        scrollbarWidth: "thin", scrollbarColor: "rgba(6,182,212,0.2) transparent",
        minHeight: 0,
      }}>
        {messages.map((m, i) => (
          <div key={`msg-${i}`}>
            <div style={{ display: "flex", justifyContent: m.role === "user" ? "flex-end" : "flex-start" }}>
              {m.role === "bot" && (
                <div style={{ marginRight: "7px", marginTop: "2px", flexShrink: 0 }}>
                  <BotAvatar size={24} />
                </div>
              )}
              <div style={m.role === "bot" ? BUBBLE_BOT : BUBBLE_USER}>
                {m.content}
              </div>
            </div>
            {/* Quick-reply chips */}
            {m.chips && m.role === "bot" && (
              <div style={{ display: "flex", flexWrap: "wrap", gap: "7px", marginTop: "9px", paddingLeft: "31px" }}>
                {m.chips.map((chip) => (
                  <button
                    key={chip}
                    onClick={() => send(chip)}
                    style={{
                      background: "rgba(6,182,212,0.10)",
                      border: "1px solid rgba(6,182,212,0.30)",
                      borderRadius: "100px",
                      padding: "5px 13px",
                      fontSize: "11.5px", fontWeight: 600,
                      color: "rgba(103,232,249,0.85)",
                      cursor: "pointer",
                      transition: "background 0.18s, border-color 0.18s",
                    }}
                    onMouseEnter={e => {
                      (e.currentTarget as HTMLButtonElement).style.background = "rgba(6,182,212,0.20)";
                      (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(6,182,212,0.55)";
                    }}
                    onMouseLeave={e => {
                      (e.currentTarget as HTMLButtonElement).style.background = "rgba(6,182,212,0.10)";
                      (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(6,182,212,0.30)";
                    }}
                  >
                    {chip}
                  </button>
                ))}
              </div>
            )}
          </div>
        ))}

        {/* Typing indicator */}
        {typing && (
          <div style={{ display: "flex", alignItems: "flex-start", gap: "7px" }}>
            <BotAvatar size={24} />
            <div style={{ ...BUBBLE_BOT, padding: "10px 14px" }}>
              <TypingDots />
            </div>
          </div>
        )}

        <div ref={bottomRef} />
      </div>

      {/* Input bar */}
      <div style={{
        padding: "10px 12px 13px",
        borderTop: "1px solid rgba(255,255,255,0.08)",
        display: "flex", gap: "8px", alignItems: "center",
        flexShrink: 0,
      }}>
        <input
          ref={inputRef}
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === "Enter" && !e.shiftKey && (e.preventDefault(), send(input))}
          placeholder={chat.placeholder}
          disabled={typing}
          style={{
            flex: 1,
            background: "rgba(255,255,255,0.055)",
            border: "1px solid rgba(255,255,255,0.10)",
            borderRadius: "10px",
            padding: "9px 13px",
            fontSize: "13px", color: "#fff",
            outline: "none", fontFamily: "inherit",
            transition: "border-color 0.18s",
          }}
          onFocus={e => (e.target.style.borderColor = "rgba(6,182,212,0.5)")}
          onBlur={e =>  (e.target.style.borderColor = "rgba(255,255,255,0.10)")}
        />
        <button
          onClick={() => send(input)}
          disabled={!input.trim() || typing}
          style={{
            width: "36px", height: "36px", borderRadius: "10px", border: "none",
            background: input.trim() && !typing ? "linear-gradient(135deg,#0891b2,#06b6d4)" : "rgba(255,255,255,0.07)",
            cursor: input.trim() && !typing ? "pointer" : "not-allowed",
            display: "flex", alignItems: "center", justifyContent: "center",
            flexShrink: 0, transition: "background 0.18s",
            color: input.trim() && !typing ? "#fff" : "rgba(255,255,255,0.25)",
            boxShadow: input.trim() && !typing ? "0 0 14px rgba(6,182,212,0.4)" : "none",
          }}
        >
          <Send size={14} />
        </button>
      </div>
    </div>
  );
}

/* ─── Home screen ───────────────────────────────────────────── */
function HomeView({ lang, onStartChat }: { lang: string; onStartChat: () => void }) {
  const hero = lang === "fr" ? "Comment pouvons-nous vous aider ?" : "How can we help you?";
  const sub  = lang === "fr" ? "Choisissez comment nous contacter — nous sommes là pour vous." : "Choose how to reach us — we're here for you.";

  const channels = [
    {
      icon: <Phone size={18} />,
      color: "#3b82f6", bg: "rgba(59,130,246,0.08)", border: "rgba(59,130,246,0.18)",
      title: lang === "fr" ? "Appelez-nous" : "Call us",
      detail: PHONE,
      note: lang === "fr" ? "Disponible lun–ven, 9h–18h" : "Available Mon–Fri, 9 am–6 pm",
      action: () => window.open(`tel:+${PHONE_RAW}`),
      highlight: false,
    },
    {
      icon: <Cpu size={18} />,
      color: "#22d3ee", bg: "rgba(6,182,212,0.08)", border: "rgba(6,182,212,0.22)",
      title: lang === "fr" ? "Parler à Nickson 2.4" : "Chat with Nickson 2.4",
      detail: lang === "fr" ? "Nickson 2.4 — Instantané" : "Nickson 2.4 — Instant",
      note: lang === "fr" ? "Disponible 24h/24, 7j/7" : "Available 24/7",
      action: onStartChat,
      highlight: true,
    },
    {
      icon: <Mail size={18} />,
      color: "rgba(255,255,255,0.6)", bg: "rgba(255,255,255,0.04)", border: "rgba(255,255,255,0.08)",
      title: lang === "fr" ? "Envoyez-nous un email" : "Email us",
      detail: EMAIL,
      note: lang === "fr" ? "Réponse sous 24 h" : "Reply within 24 h",
      action: () => window.open(`mailto:${EMAIL}`),
      highlight: false,
    },
  ];

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
      {/* Hero band */}
      <div style={{
        padding: "26px 22px 22px",
        background: "linear-gradient(145deg,rgba(6,182,212,0.18) 0%,rgba(2,6,23,0.5) 100%)",
        borderBottom: "1px solid rgba(255,255,255,0.10)",
        position: "relative", overflow: "hidden",
      }}>
        <div style={{ position: "absolute", top: "-40px", right: "-40px", width: "140px", height: "140px", borderRadius: "50%", background: "radial-gradient(circle,rgba(6,182,212,0.18) 0%,transparent 70%)", pointerEvents: "none" }} />
        <div style={{ marginBottom: "14px" }}>
          <BotAvatar size={40} />
        </div>
        <div style={{ fontSize: "17px", fontWeight: 800, color: "#fff", marginBottom: "5px", lineHeight: 1.3 }}>{hero}</div>
        <div style={{ fontSize: "12px", color: "rgba(103,232,249,0.65)", lineHeight: 1.5 }}>{sub}</div>
      </div>

      {/* Channel cards */}
      <div style={{ padding: "13px", display: "flex", flexDirection: "column", gap: "8px", flex: 1 }}>
        {channels.map((ch) => (
          <button
            key={ch.title}
            onClick={ch.action}
            style={{
              display: "flex", alignItems: "center", gap: "13px",
              padding: "12px 13px",
              background: ch.highlight ? "rgba(6,182,212,0.08)" : ch.bg,
              border: `1px solid ${ch.highlight ? "rgba(6,182,212,0.28)" : ch.border}`,
              borderRadius: "13px",
              cursor: "pointer", width: "100%", textAlign: "left",
              transition: "background 0.18s, border-color 0.18s, transform 0.15s",
            }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLButtonElement).style.background = ch.highlight ? "rgba(6,182,212,0.16)" : "rgba(255,255,255,0.06)";
              (e.currentTarget as HTMLButtonElement).style.transform = "translateY(-1px)";
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLButtonElement).style.background = ch.highlight ? "rgba(6,182,212,0.08)" : ch.bg;
              (e.currentTarget as HTMLButtonElement).style.transform = "translateY(0)";
            }}
          >
            <div style={{
              width: "36px", height: "36px", borderRadius: "10px", flexShrink: 0,
              background: ch.highlight ? "linear-gradient(135deg,#0891b2,#06b6d4)" : "rgba(255,255,255,0.06)",
              border: `1px solid ${ch.highlight ? "transparent" : "rgba(255,255,255,0.08)"}`,
              display: "flex", alignItems: "center", justifyContent: "center",
              color: ch.highlight ? "#fff" : ch.color,
              boxShadow: ch.highlight ? "0 0 14px rgba(6,182,212,0.40)" : "none",
            }}>
              {ch.icon}
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: "13px", fontWeight: 700, color: "#fff", marginBottom: "2px" }}>{ch.title}</div>
              <div style={{ fontSize: "11.5px", color: "rgba(255,255,255,0.42)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{ch.detail}</div>
              <div style={{ fontSize: "10.5px", color: ch.highlight ? "rgba(103,232,249,0.6)" : "rgba(255,255,255,0.25)", marginTop: "2px" }}>{ch.note}</div>
            </div>
            <ChevronRight size={14} color="rgba(255,255,255,0.22)" style={{ flexShrink: 0 }} />
          </button>
        ))}
      </div>

      {/* Footer */}
      <div style={{ padding: "10px 18px 14px", textAlign: "center", borderTop: "1px solid rgba(255,255,255,0.06)" }}>
        <span style={{ fontSize: "10px", color: "rgba(255,255,255,0.18)", letterSpacing: "0.08em", textTransform: "uppercase" }}>
          NT Digital Group · Global AI Architecture
        </span>
      </div>
    </div>
  );
}

/* ─── Root widget ───────────────────────────────────────────── */
export default function ChatWidget() {
  const { lang, t } = useLanguage();
  const [open, setOpen]     = useState(false);
  const [view, setView]     = useState<View>("home");
  const [pulsing, setPulsing] = useState(false);
  const [isMobile, setIsMobile] = useState(() => window.innerWidth < 768);

  useEffect(() => {
    const update = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", update, { passive: true });
    return () => window.removeEventListener("resize", update);
  }, []);

  useEffect(() => {
    if (isMobile) return;
    if (sessionStorage.getItem("architect_opened")) return;
    const pulseTimer = setTimeout(() => setPulsing(true), 3500);
    const openTimer  = setTimeout(() => {
      setPulsing(false);
      setOpen(true);
      sessionStorage.setItem("architect_opened", "1");
    }, 4500);
    return () => { clearTimeout(pulseTimer); clearTimeout(openTimer); };
  }, [isMobile]);

  function close() { setOpen(false); setTimeout(() => setView("home"), 320); }

  /* Panel style: bottom-sheet on mobile, floating on desktop */
  const PANEL: CSSProperties = isMobile
    ? {
        position: "fixed", bottom: 0, left: 0, right: 0,
        width: "100%",
        height: view === "chat" ? "76vh" : "auto",
        maxHeight: "82vh",
        background: "rgba(2,6,23,0.96)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        border: "none",
        borderTop: "1px solid rgba(255,255,255,0.10)",
        borderRadius: "22px 22px 0 0",
        boxShadow: "0 -16px 60px rgba(0,0,0,0.75), 0 0 0 1px rgba(6,182,212,0.08)",
        overflow: "hidden", display: "flex", flexDirection: "column", zIndex: 200,
      }
    : {
        position: "fixed",
        bottom: "calc(88px + env(safe-area-inset-bottom,0px))",
        right:  "calc(16px + env(safe-area-inset-right,0px))",
        width: "min(340px, calc(100vw - 32px))",
        height: view === "chat" ? "min(520px,72vh)" : "auto",
        maxHeight: "min(560px,76vh)",
        background: "rgba(2,6,23,0.88)",
        backdropFilter: "blur(16px)",
        WebkitBackdropFilter: "blur(16px)",
        border: "1px solid rgba(255,255,255,0.10)",
        borderRadius: "22px",
        boxShadow: "0 24px 80px rgba(0,0,0,0.80), 0 0 0 1px rgba(6,182,212,0.08)",
        overflow: "hidden", display: "flex", flexDirection: "column", zIndex: 200,
      };

  return (
    <>
      {/* Mobile backdrop */}
      <AnimatePresence>
        {open && isMobile && (
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={close}
            style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.6)", zIndex: 199 }}
          />
        )}
      </AnimatePresence>

      {/* Panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="panel"
            initial={isMobile ? { y: "100%" } : { opacity: 0, scale: 0.93, y: 16 }}
            animate={isMobile ? { y: 0 }     : { opacity: 1, scale: 1,    y: 0  }}
            exit={isMobile    ? { y: "100%" } : { opacity: 0, scale: 0.93, y: 16 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            style={PANEL}
          >
            {/* Mobile drag handle */}
            {isMobile && (
              <div style={{ display: "flex", justifyContent: "center", padding: "10px 0 4px" }}>
                <div style={{ width: "36px", height: "4px", borderRadius: "2px", background: "rgba(255,255,255,0.16)" }} />
              </div>
            )}

            {/* Close button */}
            <button
              onClick={close}
              style={{
                position: "absolute", top: isMobile ? "14px" : "13px", right: "14px", zIndex: 10,
                background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.10)",
                borderRadius: "8px", width: "28px", height: "28px",
                display: "flex", alignItems: "center", justifyContent: "center",
                cursor: "pointer", color: "rgba(255,255,255,0.50)", transition: "background 0.15s",
              }}
              onMouseEnter={e => (e.currentTarget.style.background = "rgba(255,255,255,0.13)")}
              onMouseLeave={e => (e.currentTarget.style.background = "rgba(255,255,255,0.07)")}
            >
              <X size={13} />
            </button>

            {/* View switcher */}
            <AnimatePresence mode="wait">
              {view === "home" ? (
                <motion.div key="home" initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -16 }} transition={{ duration: 0.18 }} style={{ flex: 1, display: "flex", flexDirection: "column", minHeight: 0 }}>
                  <HomeView lang={lang} onStartChat={() => setView("chat")} />
                </motion.div>
              ) : (
                <motion.div key="chat" initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 16 }} transition={{ duration: 0.18 }} style={{ flex: 1, display: "flex", flexDirection: "column", minHeight: 0 }}>
                  <ChatView lang={lang} onBack={() => setView("home")} t={t} />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>

      {/* FAB */}
      <div style={{
        position: "fixed",
        bottom: "calc(20px + env(safe-area-inset-bottom,0px))",
        right:  "calc(16px + env(safe-area-inset-right,0px))",
        zIndex: 201, display: "inline-flex",
      }}>
        <div style={{ position: "relative", display: "inline-flex" }}>
          {pulsing && (
            <>
              <span style={{ position: "absolute", inset: "-6px",  borderRadius: "50%", border: "2px solid rgba(6,182,212,0.55)", animation: "archPing 0.9s cubic-bezier(0,0,0.2,1) infinite", pointerEvents: "none" }} />
              <span style={{ position: "absolute", inset: "-14px", borderRadius: "50%", border: "1.5px solid rgba(6,182,212,0.25)", animation: "archPing 0.9s cubic-bezier(0,0,0.2,1) infinite 0.28s", pointerEvents: "none" }} />
            </>
          )}
          <motion.button
            onClick={() => { setPulsing(false); open ? close() : setOpen(true); sessionStorage.setItem("architect_opened", "1"); }}
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.94 }}
            animate={pulsing ? { scale: [1, 1.06, 1] } : {}}
            transition={pulsing ? { duration: 0.9, repeat: Infinity } : {}}
            aria-label="Chat with Nickson 2.4"
            style={{
              position: "relative", width: "52px", height: "52px", borderRadius: "50%",
              background: "linear-gradient(135deg,#0891b2,#06b6d4)",
              border: "none", cursor: "pointer",
              display: "flex", alignItems: "center", justifyContent: "center",
              boxShadow: pulsing
                ? "0 4px 32px rgba(6,182,212,0.75)"
                : "0 4px 24px rgba(6,182,212,0.50)",
              color: "#fff", transition: "box-shadow 0.3s",
            }}
          >
            <AnimatePresence mode="wait">
              {open
                ? <motion.span key="x"   initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.15 }}><X size={20} /></motion.span>
                : <motion.span key="cpu" initial={{ rotate: 90, opacity: 0 }}  animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.15 }}><Cpu size={22} /></motion.span>
              }
            </AnimatePresence>
          </motion.button>
        </div>
      </div>

      <style>{`
        @keyframes archPing {
          0%   { transform:scale(1);   opacity:0.75; }
          80%  { transform:scale(1.65); opacity:0;   }
          100% { transform:scale(1.65); opacity:0;   }
        }
      `}</style>
    </>
  );
}
