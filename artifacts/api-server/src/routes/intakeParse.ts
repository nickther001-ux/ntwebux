import { Router, type IRouter, type Request, type Response } from 'express';
import Anthropic from '@anthropic-ai/sdk';

const SITE_TYPES = ['business', 'restaurant', 'medical', 'ecommerce', 'portfolio', 'realestate', 'other'] as const;
const FEATURES = ['booking', 'payments', 'bilingual', 'ai_chat', 'crm', 'sms', 'blog', 'gallery'] as const;
const TIMELINES = ['72h', '2weeks', 'flexible'] as const;

const SYSTEM = `You extract website-project details from a prospect's message for a web agency in Montreal.
Return ONLY a JSON object, no prose, with these optional keys (omit any key you cannot infer with confidence):
- "siteType": one of ${JSON.stringify(SITE_TYPES)}
- "businessName": the business's proper name if explicitly stated (never invent one)
- "description": one short line describing what the business does, in the message's language
- "features": array, subset of ${JSON.stringify(FEATURES)}
- "timeline": one of ${JSON.stringify(TIMELINES)} ("72h" only if they say urgent/ASAP/this week)
- "name", "email", "phone": only if explicitly written in the message`;

const client = process.env.ANTHROPIC_API_KEY ? new Anthropic() : null;
const router: IRouter = Router();

const str = (v: unknown, max: number) => (typeof v === 'string' && v.trim() ? v.trim().slice(0, max) : undefined);

router.post('/intake/parse', async (req: Request, res: Response) => {
  const prompt = str(req.body?.prompt, 2000);
  if (!prompt || !client) return res.json({});

  try {
    const msg = await client.messages.create({
      model: 'claude-haiku-4-5-20251001',
      max_tokens: 400,
      system: SYSTEM,
      messages: [{ role: 'user', content: prompt }],
    });
    const text = msg.content.map(b => (b.type === 'text' ? b.text : '')).join('');
    const raw = JSON.parse(text.slice(text.indexOf('{'), text.lastIndexOf('}') + 1)) as Record<string, unknown>;

    const out: Record<string, unknown> = {};
    if (SITE_TYPES.includes(raw.siteType as any)) out.siteType = raw.siteType;
    if (TIMELINES.includes(raw.timeline as any)) out.timeline = raw.timeline;
    if (Array.isArray(raw.features)) out.features = raw.features.filter(f => FEATURES.includes(f as any));
    for (const [k, max] of [['businessName', 80], ['description', 200], ['name', 80], ['email', 120], ['phone', 30]] as const) {
      const v = str(raw[k], max);
      if (v) out[k] = v;
    }
    return res.json(out);
  } catch (err) {
    console.error('[intake/parse]', err instanceof Error ? err.message : err);
    return res.json({});
  }
});

export default router;
