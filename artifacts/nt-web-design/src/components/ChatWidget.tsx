import { useState, useRef, useEffect } from "react";
import { useLanguage } from "@/lib/i18n";

interface Message {
  role: "user" | "assistant";
  content: string;
}

const BASE_URL = import.meta.env.BASE_URL.replace(/\/$/, "");
const API_BASE = BASE_URL.replace(/\/[^/]*$/, "");

const WELCOME: Record<string, string> = {
  en: "Hello! How can we help you today? Ask us about pricing, projects, or timelines.",
  fr: "Bonjour! Comment pouvons-nous vous aider aujourd'hui? Posez-nous des questions sur nos tarifs, projets ou délais.",
};

const PLACEHOLDER: Record<string, string> = {
  en: "Type your message…",
  fr: "Tapez votre message…",
};

const TITLE: Record<string, string> = {
  en: "NT WebUX Assistant",
  fr: "Assistant NT WebUX",
};

export default function ChatWidget() {
  const { language } = useLanguage();
  const lang = language || "en";

  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [streaming, setStreaming] = useState(false);
  const [unread, setUnread] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (open) {
      setUnread(false);
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [open]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, streaming]);

  async function sendMessage() {
    const text = input.trim();
    if (!text || streaming) return;
    setInput("");

    const userMsg: Message = { role: "user", content: text };
    const updatedHistory = [...messages, userMsg];
    setMessages(updatedHistory);
    setStreaming(true);

    const assistantMsg: Message = { role: "assistant", content: "" };
    setMessages([...updatedHistory, assistantMsg]);

    try {
      const res = await fetch(`${API_BASE}/api/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: text,
          history: messages.slice(-10),
        }),
      });

      if (!res.ok || !res.body) throw new Error("Request failed");

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let buffer = "";
      let fullContent = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        buffer += decoder.decode(value, { stream: true });

        const lines = buffer.split("\n");
        buffer = lines.pop() ?? "";

        for (const line of lines) {
          if (!line.startsWith("data: ")) continue;
          try {
            const data = JSON.parse(line.slice(6));
            if (data.content) {
              fullContent += data.content;
              setMessages((prev) => {
                const next = [...prev];
                next[next.length - 1] = { role: "assistant", content: fullContent };
                return next;
              });
            }
            if (data.error) {
              setMessages((prev) => {
                const next = [...prev];
                next[next.length - 1] = { role: "assistant", content: data.error };
                return next;
              });
            }
          } catch {}
        }
      }
    } catch {
      setMessages((prev) => {
        const next = [...prev];
        next[next.length - 1] = {
          role: "assistant",
          content: lang === "fr"
            ? "Désolé, une erreur s'est produite. Veuillez réessayer."
            : "Sorry, something went wrong. Please try again.",
        };
        return next;
      });
    } finally {
      setStreaming(false);
      if (!open) setUnread(true);
    }
  }

  function handleKey(e: React.KeyboardEvent) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  }

  return (
    <>
      {/* Chat Window */}
      {open && (
        <div
          style={{
            position: "fixed",
            bottom: "88px",
            right: "24px",
            width: "360px",
            maxHeight: "520px",
            display: "flex",
            flexDirection: "column",
            background: "#0a0f1e",
            border: "1px solid rgba(0,170,221,0.25)",
            borderRadius: "16px",
            boxShadow: "0 8px 40px rgba(0,140,255,0.18)",
            zIndex: 9999,
            overflow: "hidden",
          }}
        >
          {/* Header */}
          <div
            style={{
              padding: "14px 18px",
              background: "linear-gradient(135deg, #060f24 0%, #0a1a38 100%)",
              borderBottom: "1px solid rgba(0,170,221,0.2)",
              display: "flex",
              alignItems: "center",
              gap: "10px",
            }}
          >
            <div
              style={{
                width: "10px",
                height: "10px",
                borderRadius: "50%",
                background: "#00ddaa",
                boxShadow: "0 0 6px #00ddaa",
                flexShrink: 0,
              }}
            />
            <span
              style={{
                color: "#fff",
                fontWeight: 700,
                fontSize: "14px",
                letterSpacing: "0.03em",
                flex: 1,
              }}
            >
              <span style={{ color: "#fff" }}>NT</span>
              <span style={{ color: "#00aadd" }}>WebUX</span>
              <span style={{ color: "rgba(180,200,230,0.7)", fontWeight: 400, marginLeft: "8px", fontSize: "12px" }}>
                {lang === "fr" ? "Assistant" : "Assistant"}
              </span>
            </span>
            <button
              onClick={() => setOpen(false)}
              style={{
                background: "none",
                border: "none",
                color: "rgba(180,200,230,0.5)",
                cursor: "pointer",
                fontSize: "18px",
                lineHeight: 1,
                padding: "2px 4px",
              }}
            >
              ×
            </button>
          </div>

          {/* Messages */}
          <div
            style={{
              flex: 1,
              overflowY: "auto",
              padding: "16px",
              display: "flex",
              flexDirection: "column",
              gap: "12px",
              minHeight: "200px",
              maxHeight: "360px",
            }}
          >
            {/* Welcome bubble */}
            <div
              style={{
                alignSelf: "flex-start",
                background: "rgba(0,140,255,0.08)",
                border: "1px solid rgba(0,140,255,0.15)",
                borderRadius: "12px 12px 12px 2px",
                padding: "10px 14px",
                color: "#c8deff",
                fontSize: "13px",
                lineHeight: "1.5",
                maxWidth: "88%",
              }}
            >
              {WELCOME[lang]}
            </div>

            {messages.map((msg, i) => (
              <div
                key={i}
                style={{
                  alignSelf: msg.role === "user" ? "flex-end" : "flex-start",
                  background:
                    msg.role === "user"
                      ? "linear-gradient(135deg, #0066cc 0%, #00aadd 100%)"
                      : "rgba(0,140,255,0.08)",
                  border: msg.role === "user" ? "none" : "1px solid rgba(0,140,255,0.15)",
                  borderRadius:
                    msg.role === "user"
                      ? "12px 12px 2px 12px"
                      : "12px 12px 12px 2px",
                  padding: "10px 14px",
                  color: msg.role === "user" ? "#fff" : "#c8deff",
                  fontSize: "13px",
                  lineHeight: "1.5",
                  maxWidth: "88%",
                  whiteSpace: "pre-wrap",
                }}
              >
                {msg.content}
                {streaming && i === messages.length - 1 && msg.role === "assistant" && msg.content === "" && (
                  <span style={{ opacity: 0.5 }}>
                    {lang === "fr" ? "En train d'écrire…" : "Typing…"}
                  </span>
                )}
              </div>
            ))}
            <div ref={bottomRef} />
          </div>

          {/* Input */}
          <div
            style={{
              padding: "12px 14px",
              borderTop: "1px solid rgba(0,140,255,0.12)",
              background: "#070d1c",
              display: "flex",
              gap: "8px",
              alignItems: "center",
            }}
          >
            <input
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKey}
              placeholder={PLACEHOLDER[lang]}
              disabled={streaming}
              style={{
                flex: 1,
                background: "rgba(0,140,255,0.06)",
                border: "1px solid rgba(0,140,255,0.2)",
                borderRadius: "8px",
                padding: "9px 12px",
                color: "#d8e8ff",
                fontSize: "13px",
                outline: "none",
                opacity: streaming ? 0.5 : 1,
              }}
            />
            <button
              onClick={sendMessage}
              disabled={streaming || !input.trim()}
              style={{
                background: input.trim() && !streaming
                  ? "linear-gradient(135deg, #0066cc, #00aadd)"
                  : "rgba(0,140,255,0.15)",
                border: "none",
                borderRadius: "8px",
                padding: "9px 14px",
                color: "#fff",
                cursor: input.trim() && !streaming ? "pointer" : "not-allowed",
                fontSize: "13px",
                fontWeight: 600,
                transition: "background 0.2s",
                flexShrink: 0,
              }}
            >
              {streaming ? "…" : "→"}
            </button>
          </div>
        </div>
      )}

      {/* Toggle Button */}
      <button
        onClick={() => setOpen((o) => !o)}
        style={{
          position: "fixed",
          bottom: "24px",
          right: "24px",
          width: "56px",
          height: "56px",
          borderRadius: "50%",
          background: open
            ? "rgba(0,100,200,0.8)"
            : "linear-gradient(135deg, #0055bb 0%, #00aadd 100%)",
          border: "1px solid rgba(0,170,221,0.4)",
          boxShadow: "0 4px 20px rgba(0,140,255,0.4)",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 10000,
          transition: "all 0.25s",
        }}
        aria-label={open ? "Close chat" : "Open chat"}
      >
        {unread && !open && (
          <span
            style={{
              position: "absolute",
              top: "4px",
              right: "4px",
              width: "10px",
              height: "10px",
              background: "#ff4466",
              borderRadius: "50%",
              border: "2px solid #060a14",
            }}
          />
        )}
        {open ? (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        ) : (
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
          </svg>
        )}
      </button>
    </>
  );
}
