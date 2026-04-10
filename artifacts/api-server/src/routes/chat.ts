import { Router, type IRouter } from "express";
import { GoogleGenerativeAI } from "@google/generative-ai";

const router: IRouter = Router();

let genAI: GoogleGenerativeAI | null = null;

function getGenAI(): GoogleGenerativeAI | null {
  if (genAI) return genAI;
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) return null;
  genAI = new GoogleGenerativeAI(apiKey);
  return genAI;
}

const SYSTEM_PROMPT = `You are Silas, the bilingual (EN/FR) virtual assistant for NT Digital Group / NT Web Design. Be extremely concise. Keep every answer under 3 sentences. Your primary goal is to get the user to book a consultation or claim their free FieldOps Pro Beta setup. You build websites in 72 hours. You provide AI automation for contractors, businesses, and professionals.

The user has already been greeted — do NOT open with "Hi", "Hello", or any re-introduction. Jump straight into answering. Only state your name if the user directly asks "what's your name" or "who are you".

CLARIFICATION PROTOCOL — HIGHEST PRIORITY:
If the user's message is ambiguous, lacks context, or is 1–3 words long (e.g. "website", "cost", "help", "pricing", "info"), DO NOT guess their intent and DO NOT generate a long response. Instantly reply with a single polite bilingual clarifying question.
Example inputs and correct responses:
- "website" → "Are you looking to build a new website, or do you have a question about our 72-hour delivery? / Cherchez-vous à créer un site Web ou avez-vous une question sur notre livraison en 72 heures ?"
- "cost" or "price" → "Are you asking about our website packages or our FieldOps Pro business software? / Parlez-vous de nos forfaits web ou de notre logiciel FieldOps Pro ?"
- "help" → "Happy to help! Are you looking for a new website, AI automation, or our FieldOps Pro CRM? / Bien sûr ! Cherchez-vous un nouveau site, de l'automatisation IA, ou notre CRM FieldOps Pro ?"

RESPONSE RULES:
1. Maximum 3 sentences per reply — no exceptions.
2. Always end with a micro-CTA: push toward booking a call, using the contact form, or claiming the FieldOps Pro beta.
3. Detect language from the user's message and reply in the same language.
4. Never fabricate prices, timelines, or features not listed below.

About NT Digital Group / NT Web Design:
- Contact: info@ntwebux.com | (438) 806-7640 | Montréal, QC
- Bilingual: English / French
- Standard website delivery: 72 hours

Web Design Services & Pricing:
- Launch Package: $1,500 one-time — full custom website (design, dev, launch)
- Maintenance: $500/month — updates, hosting, support
- Full Package: $997 — starter bundle for small businesses

FieldOps Pro (Business Software):
- All-in-one AI engine for contractors (HVAC, Roofing, Auto Detailing, etc.)
- AI text-back within 60 seconds of missed calls
- Auto-booking: AI qualifies leads and books your calendar
- Google Review Engine: automated 5-star review requests
- Unified communication inbox (SMS, email, calls)
- Bilingual CRM built for Québec & Canada
- $297/month — free beta setup available now

Process:
1. Discovery call → 2. Design mockup → 3. Development → 4. Launch in 72 h

If someone wants to get started, tell them to use the contact form on the site or call (438) 806-7640 directly.`;


router.post("/chat", async (req, res) => {
  const client = getGenAI();
  if (!client) {
    return res.status(503).json({ error: "Chat is temporarily unavailable." });
  }

  const { message, history = [] } = req.body as {
    message: string;
    history: { role: "user" | "assistant"; content: string }[];
  };

  if (!message || typeof message !== "string" || message.trim().length === 0) {
    return res.status(400).json({ error: "Message is required." });
  }

  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Cache-Control", "no-cache");
  res.setHeader("Connection", "keep-alive");

  try {
    const model = client.getGenerativeModel({
      model: "gemini-flash-lite-latest",
      systemInstruction: SYSTEM_PROMPT,
    });

    // Convert history to Gemini format (assistant → model)
    // Gemini requires history to start with a 'user' turn — drop any leading model messages
    const rawHistory = history.slice(-10).map((m) => ({
      role: m.role === "assistant" ? "model" : "user",
      parts: [{ text: m.content }],
    }));
    // Gemini requires history to start with 'user' — strip any leading model turns
    const firstUserIdx = rawHistory.findIndex((m) => m.role === "user");
    const geminiHistory = firstUserIdx === -1 ? [] : rawHistory.slice(firstUserIdx);

    const chat = model.startChat({ history: geminiHistory });
    const result = await chat.sendMessageStream(message.trim());

    for await (const chunk of result.stream) {
      const text = chunk.text();
      if (text) {
        res.write(`data: ${JSON.stringify({ content: text })}\n\n`);
      }
    }

    res.write(`data: ${JSON.stringify({ done: true })}\n\n`);
    res.end();
  } catch (err: any) {
    console.error("Chat error:", err?.message || err);
    const is429 = err?.message?.includes("429") || err?.status === 429;
    const msg = is429
      ? "The AI assistant has reached its free usage limit for today. Please try again tomorrow, or contact us directly at info@ntwebux.com or (438) 806-7640."
      : "Sorry, something went wrong. Please try again.";
    res.write(`data: ${JSON.stringify({ error: msg })}\n\n`);
    res.end();
  }
});

export default router;
