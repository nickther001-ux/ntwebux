/**
 * POST /api/webhook/stripe
 *
 * Receives Stripe events and handles the paid consultation flow.
 *
 * IMPORTANT: This route must be registered with express.raw() body parser
 * (before the global express.json() middleware) so the raw buffer is
 * available for Stripe's signature verification.
 *
 * When a checkout.session.completed event fires, the booking details are
 * read from session.metadata and the same generateMeetingAndSendEmail
 * helper used in the free flow is called.
 *
 * Expected metadata keys on the Stripe Checkout Session:
 *   name, email, phone, lang, preferredDate, preferredTime, timezone, notes
 */
import { type Request, type Response } from "express";
import Stripe from "stripe";
import { generateMeetingAndSendEmail } from "../lib/meetingHelper.js";

function getStripe(): Stripe | null {
  return process.env.STRIPE_SECRET_KEY
    ? new Stripe(process.env.STRIPE_SECRET_KEY)
    : null;
}

export async function stripeWebhookHandler(req: Request, res: Response) {
  const stripe = getStripe();

  if (!stripe) {
    console.warn("[stripe-webhook] STRIPE_SECRET_KEY not set — rejecting.");
    return res.status(503).json({ error: "Stripe not configured." });
  }

  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!webhookSecret) {
    console.warn("[stripe-webhook] STRIPE_WEBHOOK_SECRET not set — rejecting.");
    return res.status(503).json({ error: "Webhook secret not configured." });
  }

  /* ── Verify Stripe signature ── */
  const sig = req.headers["stripe-signature"] as string | undefined;
  if (!sig) {
    return res.status(400).json({ error: "Missing stripe-signature header." });
  }

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(req.body, sig, webhookSecret);
  } catch (err: any) {
    console.error("[stripe-webhook] Signature verification failed:", err.message);
    return res.status(400).json({ error: `Webhook signature error: ${err.message}` });
  }

  console.log(`[stripe-webhook] Received event: ${event.type} (id: ${event.id})`);

  /* ── Handle relevant events ── */
  if (event.type === "checkout.session.completed") {
    const session  = event.data.object as Stripe.Checkout.Session;
    const metadata = session.metadata ?? {};

    const name          = metadata.name          || "Client";
    const email         = metadata.email         || session.customer_email || "";
    const phone         = metadata.phone         || undefined;
    const lang          = (metadata.lang === "fr" ? "fr" : "en") as "en" | "fr";
    const preferredDate = metadata.preferredDate || "";
    const preferredTime = metadata.preferredTime || "";
    const timezone      = metadata.timezone      || "America/Toronto";
    const notes         = metadata.notes         || undefined;
    const amountCents   = session.amount_total   ?? undefined;

    if (!email) {
      console.error("[stripe-webhook] No email found in session metadata or customer_email.");
      return res.json({ received: true, warning: "No email found — emails not sent." });
    }

    try {
      const result = await generateMeetingAndSendEmail({
        name,
        email,
        phone,
        lang,
        notes,
        preferredDate,
        preferredTime,
        timezone,
        consultationType: "paid",
        amountCents,
      });

      console.log(`[stripe-webhook] Paid booking processed for ${email} | meet=${result.meetLink}`);
    } catch (err) {
      console.error("[stripe-webhook] generateMeetingAndSendEmail failed:", err);
    }
  }

  /* Always acknowledge receipt to Stripe */
  return res.json({ received: true });
}
