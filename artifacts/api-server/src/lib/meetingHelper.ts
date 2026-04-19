/**
 * meetingHelper.ts
 * Single source of truth for:
 *   1. Creating a Google Calendar event with a Google Meet link
 *   2. Sending the confirmation + Meet link via Resend
 *
 * Used by both the free-booking route and the Stripe webhook route.
 */
import { google } from "googleapis";
import { Resend } from "resend";

/* ─── Constants ─────────────────────────────────────────────────── */
const OWNER_EMAIL = "info@ntwebux.com";
const FROM        = "NT Web UX <noreply@ntwebux.com>";
const MEETING_DURATION_MINUTES = 60;

/* ─── Lazy Resend client ────────────────────────────────────────── */
function getResend(): Resend | null {
  return process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;
}

/* ─── Lazy Google Calendar client ───────────────────────────────── */
function getCalendar() {
  const clientEmail  = process.env.GOOGLE_CLIENT_EMAIL;
  const privateKey   = process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n");

  if (!clientEmail || !privateKey) return null;

  const auth = new google.auth.GoogleAuth({
    credentials: { client_email: clientEmail, private_key: privateKey },
    scopes: ["https://www.googleapis.com/auth/calendar"],
  });

  return google.calendar({ version: "v3", auth });
}

/* ─── Types ─────────────────────────────────────────────────────── */
export interface MeetingRequest {
  name:          string;
  email:         string;
  phone?:        string;
  lang:          "en" | "fr";
  notes?:        string;
  /** ISO-8601 date string, e.g. "2024-05-15" */
  preferredDate: string;
  /** 24-hour time string, e.g. "14:00" */
  preferredTime: string;
  timezone:      string;
  /** "free" | "paid" — affects email subject/copy */
  consultationType: "free" | "paid";
  /** Stripe payment amount in cents (paid flow only) */
  amountCents?:  number;
}

export interface MeetingResult {
  success:    boolean;
  meetLink?:  string;
  eventId?:   string;
  error?:     string;
}

/* ─── HTML helpers ───────────────────────────────────────────────── */
const row = (label: string, value: string) => `
  <tr>
    <td style="padding:10px 0;border-bottom:1px solid rgba(59,130,246,.12);
               color:#5a7db5;font-size:12px;text-transform:uppercase;
               letter-spacing:.08em;width:160px;vertical-align:top;">${label}</td>
    <td style="padding:10px 0;border-bottom:1px solid rgba(59,130,246,.12);
               font-size:14px;line-height:1.6;color:#d8e8ff;">${value || "—"}</td>
  </tr>`;

function meetLinkBlock(meetUrl: string, lang: "en" | "fr") {
  return `
  <div style="margin:28px 0;padding:20px 24px;border-radius:14px;
              background:linear-gradient(135deg,rgba(59,130,246,.14) 0%,rgba(29,78,216,.07) 100%);
              border:1px solid rgba(59,130,246,.30);">
    <p style="margin:0 0 6px;font-size:12px;font-weight:700;letter-spacing:.1em;
              text-transform:uppercase;color:#5a7db5;">
      ${lang === "fr" ? "Lien Google Meet" : "Google Meet Link"}
    </p>
    <a href="${meetUrl}"
       style="font-size:17px;font-weight:700;color:#60a5fa;
              text-decoration:none;word-break:break-all;">
      ${meetUrl}
    </a>
    <p style="margin:10px 0 0;font-size:12px;color:rgba(255,255,255,.38);">
      ${lang === "fr"
        ? "Cliquez sur le lien ci-dessus pour rejoindre la réunion au moment prévu."
        : "Click the link above to join the meeting at the scheduled time."}
    </p>
  </div>`;
}

function buildClientHtml(req: MeetingRequest, meetUrl: string): string {
  const fr     = req.lang === "fr";
  const isPaid = req.consultationType === "paid";
  const amount = req.amountCents != null
    ? `$${(req.amountCents / 100).toFixed(2)} CAD`
    : null;

  const dateStr = [req.preferredDate, req.preferredTime].filter(Boolean).join(" @ ") || "—";

  const rows = [
    row(fr ? "Date & heure" : "Date & time", dateStr),
    row(fr ? "Fuseau horaire" : "Timezone",  req.timezone || "—"),
    req.phone ? row(fr ? "Téléphone" : "Phone", req.phone) : "",
    req.notes ? row(fr ? "Notes" : "Notes", req.notes) : "",
    isPaid && amount ? row(fr ? "Paiement" : "Payment", `<strong style="color:#6ee7b7;">${amount} ✓</strong>`) : "",
  ].filter(Boolean).join("");

  const subject = isPaid
    ? (fr ? `Consultation Approfondie confirmée — ${req.name}` : `Deep-Dive Consultation confirmed — ${req.name}`)
    : (fr ? `Consultation Découverte confirmée — ${req.name}` : `Discovery Consultation confirmed — ${req.name}`);

  return `
  <div style="font-family:'Helvetica Neue',Arial,sans-serif;max-width:600px;
              margin:0 auto;background:#02040a;color:#d8e8ff;
              padding:40px 32px;border-radius:12px;
              border:1px solid rgba(59,130,246,.18);">

    <div style="margin-bottom:28px;">
      <span style="font-size:18px;font-weight:800;color:#fff;">
        NT <span style="color:#3b82f6;">WEB UX</span>
      </span>
    </div>

    <h2 style="font-size:22px;font-weight:800;color:#fff;margin:0 0 8px;">
      ✅ ${fr ? "Votre consultation est confirmée," : "Your consultation is confirmed,"} ${req.name}!
    </h2>
    <p style="font-size:14px;color:rgba(255,255,255,.55);line-height:1.7;margin:0 0 22px;">
      ${fr
        ? `Nous avons hâte de discuter avec vous. Rejoignez notre appel Google Meet au moment prévu.`
        : `We're looking forward to speaking with you. Join our Google Meet call at the scheduled time.`}
    </p>

    ${meetLinkBlock(meetUrl, req.lang)}

    <table style="width:100%;border-collapse:collapse;">${rows}</table>

    <div style="margin-top:32px;padding:16px 20px;border-radius:10px;
                background:rgba(59,130,246,.06);border:1px solid rgba(59,130,246,.16);">
      <p style="margin:0;font-size:13px;color:rgba(255,255,255,.45);">
        ${fr
          ? `Des questions ? Répondez à cet e-mail ou écrivez à <a href="mailto:${OWNER_EMAIL}" style="color:#3b82f6;">${OWNER_EMAIL}</a>`
          : `Questions? Reply to this email or reach us at <a href="mailto:${OWNER_EMAIL}" style="color:#3b82f6;">${OWNER_EMAIL}</a>`}
      </p>
    </div>
  </div>`;
}

function buildOwnerHtml(req: MeetingRequest, meetUrl: string): string {
  const isPaid = req.consultationType === "paid";
  const amount = req.amountCents != null ? `$${(req.amountCents / 100).toFixed(2)} CAD` : null;
  const dateStr = [req.preferredDate, req.preferredTime].filter(Boolean).join(" @ ") || "—";

  return `
  <div style="font-family:'Helvetica Neue',Arial,sans-serif;max-width:640px;
              margin:0 auto;background:#02040a;color:#d8e8ff;
              padding:40px 32px;border-radius:12px;
              border:1px solid rgba(59,130,246,.18);">

    <div style="margin-bottom:28px;">
      <span style="font-size:18px;font-weight:800;color:#fff;">
        NT <span style="color:#3b82f6;">WEB UX</span>
      </span>
    </div>

    <h2 style="font-size:22px;font-weight:800;color:#fff;margin:0 0 4px;">
      ${isPaid ? "💳 New Paid Consultation Booked" : "📅 New Free Consultation Booked"}
    </h2>
    <p style="font-size:13px;color:rgba(255,255,255,.4);margin:0 0 28px;">
      ${isPaid ? "Stripe checkout completed · Google Meet created" : "Free booking form submitted · Google Meet created"}
    </p>

    ${meetLinkBlock(meetUrl, "en")}

    <table style="width:100%;border-collapse:collapse;">
      ${row("Client", req.name)}
      ${row("Email", `<a href="mailto:${req.email}" style="color:#3b82f6;">${req.email}</a>`)}
      ${req.phone ? row("Phone", req.phone) : ""}
      ${row("Date & time", dateStr)}
      ${row("Timezone", req.timezone || "—")}
      ${row("Language", req.lang.toUpperCase())}
      ${isPaid && amount ? row("Payment", `<strong style="color:#6ee7b7;">${amount} ✓</strong>`) : ""}
      ${req.notes ? row("Notes", req.notes) : ""}
    </table>
  </div>`;
}

/* ─── Core helper ────────────────────────────────────────────────── */
export async function generateMeetingAndSendEmail(
  req: MeetingRequest
): Promise<MeetingResult> {
  const calendarId = process.env.GOOGLE_CALENDAR_ID || "primary";

  /* ── 1. Build event start/end times ── */
  let startDateTime: Date;
  try {
    const [year, month, day] = (req.preferredDate || "").split("-").map(Number);
    const [hour, minute]     = (req.preferredTime || "09:00").split(":").map(Number);
    startDateTime = new Date(year, month - 1, day, hour, minute);
    if (isNaN(startDateTime.getTime())) throw new Error("invalid date");
  } catch {
    // Fallback: next business day 9am
    startDateTime = new Date();
    startDateTime.setDate(startDateTime.getDate() + 1);
    startDateTime.setHours(9, 0, 0, 0);
  }

  const endDateTime = new Date(startDateTime.getTime() + MEETING_DURATION_MINUTES * 60_000);

  /* ── 2. Create Google Calendar event with Meet ── */
  let meetLink = "";
  let eventId  = "";

  const calendar = getCalendar();
  if (!calendar) {
    console.warn("Google Calendar credentials not set — skipping event creation.");
    meetLink = "https://meet.google.com/placeholder-link";
  } else {
    try {
      const response = await calendar.events.insert({
        calendarId,
        conferenceDataVersion: 1,
        sendUpdates: "all",
        requestBody: {
          summary: `${req.consultationType === "paid" ? "Consultation Approfondie" : "Consultation Découverte"} — ${req.name}`,
          description: [
            `Client: ${req.name} <${req.email}>`,
            req.phone   ? `Phone: ${req.phone}`   : "",
            req.notes   ? `Notes: ${req.notes}`   : "",
            req.lang    ? `Language: ${req.lang.toUpperCase()}` : "",
          ].filter(Boolean).join("\n"),
          start: { dateTime: startDateTime.toISOString(), timeZone: req.timezone || "America/Toronto" },
          end:   { dateTime: endDateTime.toISOString(),   timeZone: req.timezone || "America/Toronto" },
          attendees: [
            { email: req.email,  displayName: req.name },
            { email: OWNER_EMAIL, displayName: "NT Web UX" },
          ],
          conferenceData: {
            createRequest: {
              requestId: `ntwebux-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
              conferenceSolutionKey: { type: "hangoutsMeet" },
            },
          },
          reminders: {
            useDefault: false,
            overrides: [
              { method: "email",  minutes: 1440 },
              { method: "popup",  minutes: 15   },
            ],
          },
        },
      });

      meetLink = response.data.conferenceData?.entryPoints?.find(
        (ep) => ep.entryPointType === "video"
      )?.uri ?? "";
      eventId  = response.data.id ?? "";

      if (!meetLink) {
        console.warn("Google Meet link not found in event response; using fallback.");
        meetLink = response.data.hangoutLink ?? "https://meet.google.com/placeholder-link";
      }

      console.log("Calendar event created:", eventId, "| Meet:", meetLink);
    } catch (calErr) {
      console.error("Google Calendar event creation failed:", calErr);
      meetLink = "https://meet.google.com/placeholder-link";
    }
  }

  /* ── 3. Send emails via Resend ── */
  const resend = getResend();
  if (!resend) {
    console.warn("RESEND_API_KEY not set — skipping emails.");
    return { success: true, meetLink, eventId };
  }

  const clientHtml = buildClientHtml(req, meetLink);
  const ownerHtml  = buildOwnerHtml(req, meetLink);

  const isPaid = req.consultationType === "paid";
  const fr     = req.lang === "fr";

  const [ownerResult, clientResult] = await Promise.allSettled([
    resend.emails.send({
      from:    FROM,
      to:      OWNER_EMAIL,
      replyTo: req.email,
      subject: isPaid
        ? `💳 Paid consult booked: ${req.name} — ${[req.preferredDate, req.preferredTime].join(" ")}`
        : `📅 Free consult booked: ${req.name} — ${[req.preferredDate, req.preferredTime].join(" ")}`,
      html: ownerHtml,
    }),
    resend.emails.send({
      from:    FROM,
      to:      req.email,
      bcc:     OWNER_EMAIL,
      replyTo: OWNER_EMAIL,
      subject: fr
        ? (isPaid ? "Votre consultation approfondie est confirmée" : "Votre consultation découverte est confirmée")
        : (isPaid ? "Your deep-dive consultation is confirmed" : "Your discovery consultation is confirmed"),
      html: clientHtml,
    }),
  ]);

  if (ownerResult.status  === "rejected") console.error("Owner email failed:",  ownerResult.reason);
  if (clientResult.status === "rejected") console.error("Client email failed:", clientResult.reason);

  const ownerOk  = ownerResult.status  === "fulfilled";
  const clientOk = clientResult.status === "fulfilled";

  console.log(`Emails: owner=${ownerOk ? "OK" : "FAIL"} client=${clientOk ? "OK" : "FAIL"}`);

  return { success: true, meetLink, eventId };
}
