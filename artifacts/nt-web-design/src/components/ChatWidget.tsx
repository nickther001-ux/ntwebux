import { useState } from "react";
import { useLanguage } from "@/lib/i18n";

const PHONE = "(438) 806-7640";
const PHONE_RAW = "4388067640";
const EMAIL = "nickther001@gmail.com";
const WHATSAPP_URL = `https://wa.me/1${PHONE_RAW}`;

const LABELS: Record<string, { title: string; call: string; whatsapp: string; email: string; tagline: string }> = {
  en: {
    title: "Get in Touch",
    call: "Call Us",
    whatsapp: "WhatsApp",
    email: "Email Us",
    tagline: "We typically reply within a few hours.",
  },
  fr: {
    title: "Nous contacter",
    call: "Appeler",
    whatsapp: "WhatsApp",
    email: "Envoyer un email",
    tagline: "Nous répondons généralement en quelques heures.",
  },
};

export default function ChatWidget() {
  const { language } = useLanguage();
  const lang = (language || "en") as "en" | "fr";
  const t = LABELS[lang];
  const [open, setOpen] = useState(false);

  return (
    <>
      {open && (
        <div
          style={{
            position: "fixed",
            bottom: "88px",
            right: "24px",
            width: "260px",
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
              borderBottom: "1px solid rgba(0,140,255,0.15)",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <div>
              <div style={{ color: "#fff", fontWeight: 700, fontSize: "14px" }}>
                <span>NT</span>
                <span style={{ color: "#00aadd" }}>WebUX</span>
              </div>
              <div style={{ color: "rgba(180,210,240,0.6)", fontSize: "11px", marginTop: "2px" }}>
                {t.title}
              </div>
            </div>
            <button
              onClick={() => setOpen(false)}
              style={{
                background: "none",
                border: "none",
                color: "rgba(180,200,230,0.5)",
                cursor: "pointer",
                fontSize: "20px",
                lineHeight: 1,
                padding: "2px 4px",
              }}
            >
              ×
            </button>
          </div>

          {/* Links */}
          <div style={{ padding: "14px", display: "flex", flexDirection: "column", gap: "8px" }}>
            <a
              href={`tel:+1${PHONE_RAW}`}
              style={linkStyle("#00aadd")}
            >
              <PhoneIcon />
              <div>
                <div style={{ fontWeight: 600, fontSize: "13px", color: "#d8e8ff" }}>{t.call}</div>
                <div style={{ fontSize: "11px", color: "rgba(180,210,240,0.6)", marginTop: "1px" }}>{PHONE}</div>
              </div>
            </a>

            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              style={linkStyle("#25d366")}
            >
              <WhatsAppIcon />
              <div>
                <div style={{ fontWeight: 600, fontSize: "13px", color: "#d8e8ff" }}>{t.whatsapp}</div>
                <div style={{ fontSize: "11px", color: "rgba(180,210,240,0.6)", marginTop: "1px" }}>{PHONE}</div>
              </div>
            </a>

            <a
              href={`mailto:${EMAIL}`}
              style={linkStyle("#00aadd")}
            >
              <EmailIcon />
              <div>
                <div style={{ fontWeight: 600, fontSize: "13px", color: "#d8e8ff" }}>{t.email}</div>
                <div style={{ fontSize: "11px", color: "rgba(180,210,240,0.6)", marginTop: "1px" }}>{EMAIL}</div>
              </div>
            </a>
          </div>

          <div
            style={{
              padding: "10px 16px 14px",
              fontSize: "11px",
              color: "rgba(140,170,210,0.5)",
              textAlign: "center",
              borderTop: "1px solid rgba(0,140,255,0.08)",
            }}
          >
            {t.tagline}
          </div>
        </div>
      )}

      {/* Toggle button */}
      <button
        onClick={() => setOpen((o) => !o)}
        aria-label={open ? "Close contact" : "Contact us"}
        style={{
          position: "fixed",
          bottom: "24px",
          right: "24px",
          width: "56px",
          height: "56px",
          borderRadius: "50%",
          background: open
            ? "rgba(0,100,200,0.85)"
            : "linear-gradient(135deg, #0055bb 0%, #00aadd 100%)",
          border: "1px solid rgba(0,170,221,0.4)",
          boxShadow: "0 4px 20px rgba(0,140,255,0.4)",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 10000,
          transition: "background 0.2s",
        }}
      >
        {open ? (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        ) : (
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.39 2 2 0 0 1 3.6 1.22h3a2 2 0 0 1 2 1.72c.127.96.36 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.91a16 16 0 0 0 6 6l.91-.91a2 2 0 0 1 2.11-.45c.907.34 1.85.573 2.81.7A2 2 0 0 1 21.5 16.92z" />
          </svg>
        )}
      </button>
    </>
  );
}

function linkStyle(accentColor: string): React.CSSProperties {
  return {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    padding: "10px 12px",
    background: "rgba(0,140,255,0.06)",
    border: `1px solid rgba(0,140,255,0.12)`,
    borderRadius: "10px",
    textDecoration: "none",
    cursor: "pointer",
    transition: "background 0.15s",
    color: accentColor,
  };
}

function PhoneIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.39 2 2 0 0 1 3.6 1.22h3a2 2 0 0 1 2 1.72c.127.96.36 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.91a16 16 0 0 0 6 6l.91-.91a2 2 0 0 1 2.11-.45c.907.34 1.85.573 2.81.7A2 2 0 0 1 21.5 16.92z" />
    </svg>
  );
}

function WhatsAppIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" style={{ flexShrink: 0 }}>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z"/>
    </svg>
  );
}

function EmailIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2-2-2z" />
      <polyline points="22,6 12,13 2,6" />
    </svg>
  );
}
