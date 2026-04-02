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

const SYSTEM_PROMPT = `You are the NT Web UX virtual assistant. You help potential clients learn about NT Web UX's web design services.

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

Why NT Web UX:
- Fast turnaround (typically 2-3 weeks)
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
      model: "gemini-1.5-flash",
      systemInstruction: SYSTEM_PROMPT,
    });

    // Convert history to Gemini format (assistant → model)
    const geminiHistory = history.slice(-10).map((m) => ({
      role: m.role === "assistant" ? "model" : "user",
      parts: [{ text: m.content }],
    }));

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
