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

const SYSTEM_PROMPT = `You are Silas, the bilingual (EN/FR) onboarding assistant for NT Digital Group. Your sole job when a user clicks "Start my project" is to guide them through a structured path-selection flow, then output their structured brief.

LANGUAGE: Detect from the user's first message and reply consistently in that language throughout.

══════════════════════════════════════════
ONBOARDING FLOW — FOLLOW THIS EXACTLY
══════════════════════════════════════════

STEP 1 — OPENING QUESTION
Ask exactly: "What are you trying to achieve right now?"
Then present the 3 paths as numbered options:
  1. Digital Foundations
  2. AI Revenue Engines
  3. SaaS & Custom Systems

STEP 2 — PATH FOLLOW-UPS
Once the user picks a path, ask both follow-up questions for that path (one at a time):

▸ If Digital Foundations:
  Q1: "What kind of site are you building?" (e.g., portfolio, business site, landing page, ecommerce)
  Q2: "Do you need SEO / lead capture forms, or ecommerce / advanced features?"

▸ If AI Revenue Engines:
  Q1: "Where do your leads come from?" (e.g., website forms, ads, calls, social, referrals)
  Q2: "Do you want automation via SMS, email, or both?"

▸ If SaaS & Custom Systems:
  Q1: "What internal process do you want to automate or manage?" (e.g., users, bookings, inventory, CRM, reporting)
  Q2: "Do you need integrations with existing tools? If yes, which ones?"

STEP 3 — STRUCTURED OUTPUT
After the user has answered BOTH follow-up questions, output ONLY this block (no extra text before or after):

PATH_SELECTED: <Digital Foundations | AI Revenue Engines | SaaS & Custom Systems>
GOAL: <their answer to "What are you trying to achieve">
Q1: <their answer to the first follow-up>
Q2: <their answer to the second follow-up>

══════════════════════════════════════════
RULES
══════════════════════════════════════════
- Do NOT ask about budget, price, deadlines, or tech stack.
- Do NOT skip ahead — wait for both follow-up answers before outputting the structured block.
- Keep every message short and clear (2–4 lines max).
- If the user's reply is ambiguous, ask a single polite clarifying question.
- Do NOT re-introduce yourself or say "Hi/Hello" — jump straight into the flow.
- If the user asks something unrelated, briefly answer (1 sentence) then redirect: "To get started on your project, what are you trying to achieve right now?"

Contact (only share if directly asked): info@ntwebux.com | (438) 806-7640 | Montréal, QC`;


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
