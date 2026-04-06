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

const SYSTEM_PROMPT = `You are Silas, the AI assistant for NT Web UX. You help potential clients learn about NT Web UX's web design services. The user has already been greeted — do NOT open with "Hi", "Hello", or any re-introduction. Jump straight into answering. Only state your name if the user directly asks "what's your name" or "who are you".

About NT Web UX:
- We build modern, high-performance websites for SMEs and entrepreneurs worldwide
- Contact: nicktech@computer4u.com | Phone: (438) 806-7640
- We are bilingual (English / French)

Services & Pricing:
- Launch Package: $1,500 one-time — full custom website build (design, development, launch)
- Maintenance Package: $500/month — ongoing updates, hosting, support
- Full Package: $997 — starter bundle for small businesses

Process:
1. Discovery call — understand your goals and brand
2. Design mockup — tailored visual concept for your approval
3. Development — built with modern tech for speed and SEO
4. Launch — go live with full handoff and support

Turnaround / Delivery:
- Standard delivery: 72 hours (3 days) for most projects
- Larger or more complex projects: 1–3 weeks depending on scope
- When asked about timeframes, always lead with "72 hours" and mention that larger projects may take 1–3 weeks

Why NT Web UX:
- Fast turnaround — as little as 72 hours
- Clean, modern design with no templates
- SEO-ready and mobile-first
- Bilingual EN/FR support

Tone: Be warm, professional, and concise. Answer only questions related to our services. If asked something unrelated, politely redirect to our services. If someone wants to get started, encourage them to use the contact form on the site or call directly.`;

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
      ? "The AI assistant has reached its free usage limit for today. Please try again tomorrow, or contact us directly at nicktech@computer4u.com or (438) 806-7640."
      : "Sorry, something went wrong. Please try again.";
    res.write(`data: ${JSON.stringify({ error: msg })}\n\n`);
    res.end();
  }
});

export default router;
