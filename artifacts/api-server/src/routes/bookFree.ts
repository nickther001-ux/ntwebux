/**
 * POST /api/book-free
 *
 * Handles the "Consultation Découverte" (free discovery call) booking form.
 * Validates the request, triggers Google Meet event creation, and sends
 * confirmation emails to both the client and the owner.
 */
import { Router, type IRouter } from "express";
import { generateMeetingAndSendEmail } from "../lib/meetingHelper.js";

const router: IRouter = Router();

interface BookFreeBody {
  name:          string;
  email:         string;
  phone?:        string;
  lang?:         "en" | "fr";
  preferredDate: string;
  preferredTime: string;
  timezone?:     string;
  notes?:        string;
}

router.post("/book-free", async (req, res) => {
  try {
    const b = req.body as BookFreeBody;

    /* ── Validation ── */
    const missing: string[] = [];
    if (!b.name)          missing.push("name");
    if (!b.email)         missing.push("email");
    if (!b.preferredDate) missing.push("preferredDate");
    if (!b.preferredTime) missing.push("preferredTime");

    if (missing.length) {
      return res.status(400).json({
        error: `Missing required fields: ${missing.join(", ")}`,
      });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(b.email)) {
      return res.status(400).json({ error: "Invalid email address." });
    }

    const lang: "en" | "fr" =
      b.lang === "fr" ? "fr" : "en";

    const result = await generateMeetingAndSendEmail({
      name:             b.name.trim(),
      email:            b.email.trim().toLowerCase(),
      phone:            b.phone?.trim(),
      lang,
      notes:            b.notes?.trim(),
      preferredDate:    b.preferredDate,
      preferredTime:    b.preferredTime,
      timezone:         b.timezone || "America/Toronto",
      consultationType: "free",
    });

    console.log(`[book-free] OK for ${b.email} | meetLink=${result.meetLink}`);

    return res.json({
      success:  true,
      meetLink: result.meetLink,
      eventId:  result.eventId,
    });
  } catch (err) {
    console.error("[book-free] Unhandled error:", err);
    return res.status(500).json({ error: "Booking failed. Please try again." });
  }
});

export default router;
