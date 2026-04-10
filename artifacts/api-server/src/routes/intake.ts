import { Router, type IRouter } from "express";
import { Resend } from "resend";

const router: IRouter = Router();

const resend = process.env.RESEND_API_KEY
  ? new Resend(process.env.RESEND_API_KEY)
  : null;

const OWNER_EMAIL = "info@ntwebux.com";
const FROM        = "NT Web UX <onboarding@resend.dev>";

/* ── Row helper ── */
const row = (label: string, value: string) => `
  <tr>
    <td style="padding:10px 0;border-bottom:1px solid rgba(59,130,246,.12);
               color:#5a7db5;font-size:12px;text-transform:uppercase;
               letter-spacing:.08em;width:160px;vertical-align:top;">${label}</td>
    <td style="padding:10px 0;border-bottom:1px solid rgba(59,130,246,.12);
               font-size:14px;line-height:1.6;color:#d8e8ff;">${value || "—"}</td>
  </tr>`;

const section = (title: string, rows: string) => `
  <tr><td colspan="2" style="padding:24px 0 6px;">
    <div style="font-size:11px;font-weight:700;letter-spacing:.12em;
                text-transform:uppercase;color:#3b82f6;border-bottom:1px solid rgba(59,130,246,.25);
                padding-bottom:6px;">${title}</div>
  </td></tr>
  ${rows}`;

router.post("/intake", async (req, res) => {
  try {
    const b = req.body as {
      plan:          { name: string; price: string | number };
      siteType:      string;
      style:         string;
      name:          string;
      business:      string;
      industry:      string;
      description:   string;
      city:          string;
      goals:         string[];
      hasLogo:       string;
      hasContent:    string;
      hasExistingSite: string;
      existingUrl:   string;
      email:         string;
      phone:         string;
      bestTime:      string;
      method:        string;
      notes:         string;
      lang:          string;
    };

    if (!b.email || !b.name || !b.plan?.name) {
      return res.status(400).json({ error: "Missing required fields." });
    }

    const fr        = b.lang === "fr";
    const planLabel = `${b.plan.name}${b.plan.price !== "—" ? ` ($${b.plan.price}/mo)` : " — Custom pricing"}`;
    const logoMap: Record<string, string> = { yes: "Yes", no: "No", needed: "Need one designed" };
    const logoVal   = logoMap[b.hasLogo] ?? (b.hasLogo || "—");

    /* ── Owner notification email ── */
    const ownerHtml = `
      <div style="font-family:'Helvetica Neue',Arial,sans-serif;max-width:640px;
                  margin:0 auto;background:#02040a;color:#d8e8ff;
                  padding:40px 32px;border-radius:12px;
                  border:1px solid rgba(59,130,246,.18);">

        <div style="display:flex;align-items:center;gap:12px;margin-bottom:32px;">
          <div style="width:36px;height:36px;border-radius:8px;
                      background:rgba(59,130,246,.2);display:inline-block;"></div>
          <span style="font-size:18px;font-weight:800;color:#fff;letter-spacing:-.02em;">
            NT <span style="color:#3b82f6;">WEB UX</span>
          </span>
        </div>

        <h2 style="font-size:22px;font-weight:800;color:#fff;margin:0 0 4px;">
          🎯 New Project Intake
        </h2>
        <p style="font-size:13px;color:rgba(255,255,255,.4);margin:0 0 28px;">
          Submitted via the Services & Pricing page
        </p>

        <table style="width:100%;border-collapse:collapse;">
          ${section("Selected Plan", row("Package", `<strong style="color:#93c5fd;">${planLabel}</strong>`))}
          ${section("Project", [
            row("Website type", b.siteType),
            row("Design style", b.style === "custom" ? "Fully custom" : "Based on a sample"),
            row("Industry", b.industry || b.siteType),
            row("City / Province", b.city),
          ].join(""))}
          ${section("About the client", [
            row("Name", b.name),
            row("Business", b.business),
            row("Description", b.description),
          ].join(""))}
          ${section("Goals & Assets", [
            row("Goals", (b.goals ?? []).join(", ")),
            row("Has logo", logoVal),
            row("Content ready", b.hasContent),
            row("Existing site", b.hasExistingSite === "yes"
              ? `Yes — <a href="${b.existingUrl}" style="color:#3b82f6;">${b.existingUrl || "URL to share"}</a>`
              : "No"),
          ].join(""))}
          ${section("Contact", [
            row("Email", `<a href="mailto:${b.email}" style="color:#3b82f6;">${b.email}</a>`),
            row("Phone / WhatsApp", b.phone),
            row("Best time", b.bestTime),
            row("Preferred method", b.method),
            row("Notes", b.notes),
          ].join(""))}
        </table>

        <div style="margin-top:32px;padding:16px 20px;border-radius:10px;
                    background:rgba(59,130,246,.08);border:1px solid rgba(59,130,246,.2);">
          <p style="margin:0;font-size:13px;color:rgba(255,255,255,.5);">
            Reply directly to this email to contact the client.
          </p>
        </div>
      </div>`;

    /* ── Customer confirmation email ── */
    const confirmRows = [
      ["Package",       planLabel],
      ["Website type",  b.siteType],
      ["Your goals",    (b.goals ?? []).join(", ")],
      ["Has logo",      logoVal],
      ["Content ready", b.hasContent],
      ["Phone",         b.phone],
      ["Best time",     b.bestTime],
    ].filter(([, v]) => v).map(([l, v]) => row(l, v)).join("");

    const confirmHtml = fr ? `
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
          ✅ Demande reçue, ${b.name}!
        </h2>
        <p style="font-size:14px;color:rgba(255,255,255,.55);line-height:1.7;margin:0 0 28px;">
          Merci pour votre confiance. Voici un récapitulatif de votre demande.
          Nous vous contacterons dans les <strong style="color:#93c5fd;">2 heures</strong>
          pour démarrer votre projet.
        </p>

        <table style="width:100%;border-collapse:collapse;">${confirmRows}</table>

        <div style="margin-top:32px;padding:20px 24px;border-radius:12px;
                    background:rgba(59,130,246,.08);border:1px solid rgba(59,130,246,.2);">
          <p style="margin:0 0 4px;font-size:14px;font-weight:700;color:#93c5fd;">
            Votre site web sera livré en 72h ⚡
          </p>
          <p style="margin:0;font-size:13px;color:rgba(255,255,255,.45);">
            Des questions? Répondez à cet email ou écrivez à
            <a href="mailto:${OWNER_EMAIL}" style="color:#3b82f6;">${OWNER_EMAIL}</a>
          </p>
        </div>
      </div>` : `
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
          ✅ We got your request, ${b.name}!
        </h2>
        <p style="font-size:14px;color:rgba(255,255,255,.55);line-height:1.7;margin:0 0 28px;">
          Thank you for choosing NT Web UX. Here's a summary of what you submitted.
          We'll reach out within <strong style="color:#93c5fd;">2 hours</strong>
          to kick off your project.
        </p>

        <table style="width:100%;border-collapse:collapse;">${confirmRows}</table>

        <div style="margin-top:32px;padding:20px 24px;border-radius:12px;
                    background:rgba(59,130,246,.08);border:1px solid rgba(59,130,246,.2);">
          <p style="margin:0 0 4px;font-size:14px;font-weight:700;color:#93c5fd;">
            Your website will be delivered within 72 hours ⚡
          </p>
          <p style="margin:0;font-size:13px;color:rgba(255,255,255,.45);">
            Questions? Reply to this email or reach us at
            <a href="mailto:${OWNER_EMAIL}" style="color:#3b82f6;">${OWNER_EMAIL}</a>
          </p>
        </div>
      </div>`;

    if (!resend) {
      console.warn("RESEND_API_KEY not set — intake email not sent.");
      return res.json({ success: true });
    }

    const [ownerResult, clientResult] = await Promise.allSettled([
      resend.emails.send({
        from:    FROM,
        to:      OWNER_EMAIL,
        replyTo: b.email,
        subject: `New intake: ${b.plan.name} - ${b.name}${b.business ? ` (${b.business})` : ""}`,
        html:    ownerHtml,
      }),
      resend.emails.send({
        from:    FROM,
        to:      b.email,
        bcc:     OWNER_EMAIL,
        subject: fr
          ? "Votre demande NT Web UX a bien ete recue"
          : "Your NT Web UX request was received",
        html:    confirmHtml,
      }),
    ]);

    if (ownerResult.status === "rejected") {
      console.error("Owner notification FAILED:", ownerResult.reason);
    } else {
      const r = ownerResult.value as any;
      if (r?.error) console.error("Owner notification Resend error:", r.error);
      else console.log("Owner notification sent OK, id:", r?.data?.id ?? r?.id);
    }

    if (clientResult.status === "rejected") {
      console.error("Client confirmation FAILED:", clientResult.reason);
    } else {
      const r = clientResult.value as any;
      if (r?.error) console.error("Client confirmation Resend error:", r.error);
      else console.log("Client confirmation sent OK, id:", r?.data?.id ?? r?.id);
    }

    res.json({ success: true });
  } catch (err) {
    console.error("Intake route error:", err);
    res.status(500).json({ error: "Failed to send. Please try again." });
  }
});

export default router;
