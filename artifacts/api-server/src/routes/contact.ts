import { Router, type IRouter } from "express";
import { SubmitContactFormBody, SubmitContactFormResponse } from "@workspace/api-zod";
import { db } from "@workspace/db";
import { contactsTable } from "@workspace/db/schema";
import { Resend } from "resend";

const router: IRouter = Router();

const resend = process.env.RESEND_API_KEY
  ? new Resend(process.env.RESEND_API_KEY)
  : null;

const NOTIFY_EMAIL = "nickther001@gmail.com";

router.post("/contact", async (req, res) => {
  try {
    const body = SubmitContactFormBody.parse(req.body);

    const [inserted] = await db
      .insert(contactsTable)
      .values({
        firstName: body.firstName ?? null,
        lastName: body.lastName ?? null,
        email: body.email,
        phone: body.phone ?? null,
        service: body.service ?? null,
        message: body.message,
      })
      .returning({ id: contactsTable.id });

    // Send notification email
    if (resend) {
      const fullName = [body.firstName, body.lastName].filter(Boolean).join(" ") || "Not provided";
      await resend.emails.send({
        from: "NT WebUX <onboarding@resend.dev>",
        to: NOTIFY_EMAIL,
        subject: `New Inquiry from ${fullName} — NT WebUX`,
        html: `
          <div style="font-family:sans-serif;max-width:600px;margin:0 auto;background:#060A14;color:#D8E8FF;padding:32px;border-radius:8px;">
            <h2 style="color:#00AADD;margin-bottom:24px;font-size:22px;">📬 New Project Inquiry</h2>
            <table style="width:100%;border-collapse:collapse;">
              <tr><td style="padding:10px 0;border-bottom:1px solid rgba(0,140,255,.15);color:#5A7DB5;width:140px;font-size:13px;text-transform:uppercase;letter-spacing:.08em;">Name</td><td style="padding:10px 0;border-bottom:1px solid rgba(0,140,255,.15);font-size:15px;">${fullName}</td></tr>
              <tr><td style="padding:10px 0;border-bottom:1px solid rgba(0,140,255,.15);color:#5A7DB5;font-size:13px;text-transform:uppercase;letter-spacing:.08em;">Email</td><td style="padding:10px 0;border-bottom:1px solid rgba(0,140,255,.15);font-size:15px;"><a href="mailto:${body.email}" style="color:#00AADD;">${body.email}</a></td></tr>
              <tr><td style="padding:10px 0;border-bottom:1px solid rgba(0,140,255,.15);color:#5A7DB5;font-size:13px;text-transform:uppercase;letter-spacing:.08em;">Phone</td><td style="padding:10px 0;border-bottom:1px solid rgba(0,140,255,.15);font-size:15px;">${body.phone || "—"}</td></tr>
              <tr><td style="padding:10px 0;border-bottom:1px solid rgba(0,140,255,.15);color:#5A7DB5;font-size:13px;text-transform:uppercase;letter-spacing:.08em;">Service</td><td style="padding:10px 0;border-bottom:1px solid rgba(0,140,255,.15);font-size:15px;">${body.service || "—"}</td></tr>
              <tr><td style="padding:14px 0;color:#5A7DB5;font-size:13px;text-transform:uppercase;letter-spacing:.08em;vertical-align:top;">Message</td><td style="padding:14px 0;font-size:15px;line-height:1.6;white-space:pre-wrap;">${body.message}</td></tr>
            </table>
            <p style="margin-top:28px;font-size:12px;color:rgba(90,125,181,.6);">Sent from NT WebUX contact form · Inquiry #${inserted.id}</p>
          </div>
        `,
      }).catch((err) => {
        console.error("Email send failed:", err);
      });
    }

    const data = SubmitContactFormResponse.parse({
      success: true,
      message: "Thank you! We'll be in touch within 24 hours.",
      id: inserted.id,
    });

    res.json(data);
  } catch (err) {
    res.status(400).json({ error: "Invalid request. Please check your inputs." });
  }
});

export default router;
