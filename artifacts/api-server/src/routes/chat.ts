import { Router, type IRouter } from "express";
import OpenAI from "openai";

const router: IRouter = Router();

let openai: OpenAI | null = null;

function getOpenAI(): OpenAI | null {
  if (openai) return openai;
  // Support standard OPENAI_API_KEY (for render.com / external deployments)
  // and Replit's managed AI integration credentials
  const apiKey = process.env.OPENAI_API_KEY || process.env.AI_INTEGRATIONS_OPENAI_API_KEY;
  const baseURL = process.env.AI_INTEGRATIONS_OPENAI_BASE_URL; // optional — omit for direct OpenAI
  if (!apiKey) return null;
  openai = new OpenAI({ apiKey, ...(baseURL ? { baseURL } : {}) });
  return openai;
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
  const client = getOpenAI();
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
    const messages: OpenAI.Chat.Completions.ChatCompletionMessageParam[] = [
      { role: "system", content: SYSTEM_PROMPT },
      ...history.slice(-10).map((m: { role: "user" | "assistant"; content: string }) => ({
        role: m.role,
        content: m.content,
      })),
      { role: "user", content: message.trim() },
    ];

    const stream = await client.chat.completions.create({
      model: "gpt-4o-mini",
      max_completion_tokens: 512,
      messages,
      stream: true,
    });

    for await (const chunk of stream) {
      const content = chunk.choices[0]?.delta?.content;
      if (content) {
        res.write(`data: ${JSON.stringify({ content })}\n\n`);
      }
    }

    res.write(`data: ${JSON.stringify({ done: true })}\n\n`);
    res.end();
  } catch (err) {
    console.error("Chat error:", err);
    res.write(`data: ${JSON.stringify({ error: "Sorry, something went wrong. Please try again." })}\n\n`);
    res.end();
  }
});

export default router;
