import { Router, type IRouter, type Request, type Response } from "express";

const router: IRouter = Router();

// ── IN-MEMORY STORAGE ──
interface ChatMessage {
  id: string;
  sessionId: string;
  role: "user" | "bot";
  content: string;
  timestamp: Date;
}

const messagesBySession = new Map<string, ChatMessage[]>();
let nextId = 1;

function generateId(): string {
  return `chat_${nextId++}_${Date.now()}`;
}

// ── SEND MESSAGE & GET BOT RESPONSE ──
router.post("/chat/message", (req: Request, res: Response) => {
  const { message, sessionId } = req.body as { message?: string; sessionId?: string };
  if (!message || !message.trim()) {
    res.status(400).json({ error: "Message cannot be empty." });
    return;
  }

  const sid = sessionId || generateId();
  const messages = messagesBySession.get(sid) || [];

  const userMsg: ChatMessage = {
    id: generateId(),
    sessionId: sid,
    role: "user",
    content: message.trim(),
    timestamp: new Date(),
  };
  messages.push(userMsg);

  const botReply = generateBotResponse(message.trim());
  const botMsg: ChatMessage = {
    id: generateId(),
    sessionId: sid,
    role: "bot",
    content: botReply,
    timestamp: new Date(),
  };
  messages.push(botMsg);

  messagesBySession.set(sid, messages);

  res.json({
    sessionId: sid,
    userMessage: { id: userMsg.id, content: userMsg.content, timestamp: userMsg.timestamp },
    botMessage: { id: botMsg.id, content: botMsg.content, timestamp: botMsg.timestamp },
  });
});

// ── GET CHAT HISTORY ──
router.get("/chat/history", (req: Request, res: Response) => {
  const sessionId = req.query.sessionId as string | undefined;
  if (!sessionId) {
    res.json({ messages: [] });
    return;
  }
  const messages = (messagesBySession.get(sessionId) || []).map((m) => ({
    id: m.id,
    role: m.role,
    content: m.content,
    timestamp: m.timestamp,
  }));
  res.json({ messages });
});

// ── INTELLIGENT BOT RESPONSE ENGINE ──
function generateBotResponse(userMessage: string): string {
  const msg = userMessage.toLowerCase();

  // Greetings
  if (/^(hi|hello|hey|bonjour|salut|good\s*(morning|afternoon|evening))/.test(msg)) {
    return "Hello! Welcome to NTWEBDESIGN. I'm here to help you with pricing, project details, and timelines. What would you like to know about?";
  }

  // Pricing
  if (/(price|pricing|cost|how much|budget|rate|quote|devis|prix|combien)/.test(msg)) {
    if (/(basic|simple|starter|landing|one.?page)/.test(msg)) {
      return "Our Basic package starts at $500-$1,500 and includes:\n- Single-page or landing page design\n- Mobile responsive layout\n- Basic SEO setup\n- Contact form integration\n- 1 round of revisions\n\nPerfect for freelancers and small businesses getting started online. Would you like a custom quote?";
    }
    if (/(standard|business|professional|multi)/.test(msg)) {
      return "Our Standard package ranges from $1,500-$5,000 and includes:\n- Multi-page website (5-10 pages)\n- Custom responsive design\n- SEO optimization\n- CMS integration (WordPress/custom)\n- Contact forms & social media integration\n- 3 rounds of revisions\n- 30 days post-launch support\n\nIdeal for growing businesses. Want to discuss your specific needs?";
    }
    if (/(premium|enterprise|advanced|e.?commerce|shop|store)/.test(msg)) {
      return "Our Premium/Enterprise package starts at $5,000+ and includes:\n- Full custom design & development\n- E-commerce functionality\n- Advanced animations & interactions\n- Custom backend/API development\n- Performance optimization\n- SEO & analytics setup\n- Unlimited revisions during development\n- 90 days post-launch support\n\nPerfect for established businesses and e-commerce. Let's schedule a consultation!";
    }
    return "We offer three main pricing tiers:\n\n1. Basic ($500-$1,500) - Landing pages & simple sites\n2. Standard ($1,500-$5,000) - Multi-page business websites\n3. Premium ($5,000+) - E-commerce & custom web applications\n\nEach project is custom-quoted based on your specific needs. Which tier interests you? Or tell me about your project and I'll recommend the best fit!";
  }

  // Project types
  if (/(project|type|kind|what.*build|what.*make|what.*do|service|portfolio|e.?commerce|web\s*app|landing|wordpress|react)/.test(msg)) {
    if (/(e.?commerce|shop|store|sell|product)/.test(msg)) {
      return "We build powerful e-commerce solutions including:\n- Custom online stores with Shopify, WooCommerce, or fully custom builds\n- Product catalog & inventory management\n- Secure payment integration (Stripe, PayPal)\n- Order tracking & customer accounts\n- Mobile-optimized shopping experience\n\nTimeline: typically 8-16 weeks. Budget starts at $5,000. Would you like to discuss your store requirements?";
    }
    if (/(portfolio|personal|artist|creative|photographer)/.test(msg)) {
      return "We create stunning portfolio websites for creatives:\n- Beautiful gallery layouts with smooth animations\n- Project showcase with filtering\n- About & contact pages\n- Blog integration (optional)\n- Fast loading & SEO optimized\n\nTimeline: 2-4 weeks. Starting at $500. Want to see some examples of our work?";
    }
    if (/(wordpress|cms|blog)/.test(msg)) {
      return "We develop custom WordPress & CMS solutions:\n- Custom themes tailored to your brand\n- Easy-to-use admin dashboard\n- Blog & content management\n- Plugin integration & customization\n- SEO & performance optimization\n\nTimeline: 3-6 weeks. Budget: $1,000-$4,000. Would you like to learn more?";
    }
    if (/(web\s*app|application|saas|dashboard)/.test(msg)) {
      return "We develop custom web applications:\n- React/Node.js full-stack development\n- User authentication & dashboards\n- Real-time features\n- API development & integration\n- Database design & management\n- Cloud deployment\n\nTimeline: 8-20 weeks depending on complexity. Budget: $5,000+. Let's discuss your app idea!";
    }
    return "We specialize in several types of web projects:\n\n1. Landing Pages - Convert visitors into customers\n2. Business Websites - Professional multi-page sites\n3. E-Commerce Stores - Sell products online\n4. Portfolios - Showcase creative work\n5. Web Applications - Custom SaaS & dashboards\n6. WordPress/CMS - Content-managed sites\n\nWhich type of project are you interested in?";
  }

  // Timeline
  if (/(time|timeline|how long|duration|deadline|deliver|when|schedule|délai|quand)/.test(msg)) {
    if (/(basic|simple|landing|small|quick|fast|urgent)/.test(msg)) {
      return "For basic/landing page projects:\n- Design phase: 3-5 business days\n- Development: 5-7 business days\n- Review & revisions: 2-3 days\n\nTotal: approximately 2-3 weeks from kickoff to launch. Rush delivery (under 1 week) is available for an additional fee. Need a faster turnaround?";
    }
    if (/(standard|business|medium)/.test(msg)) {
      return "For standard business websites:\n- Discovery & planning: 1 week\n- Design mockups: 1-2 weeks\n- Development: 2-3 weeks\n- Testing & revisions: 1 week\n\nTotal: approximately 4-8 weeks. We provide weekly progress updates throughout. Would you like to set up a project timeline?";
    }
    if (/(premium|enterprise|complex|e.?commerce|large|app)/.test(msg)) {
      return "For premium/complex projects:\n- Discovery & strategy: 1-2 weeks\n- UX/UI design: 2-4 weeks\n- Development sprints: 4-8 weeks\n- Testing & QA: 1-2 weeks\n- Launch & optimization: 1 week\n\nTotal: approximately 8-16 weeks. We use agile methodology with bi-weekly demos. Ready to start planning?";
    }
    return "Our typical project timelines:\n\n1. Basic/Landing Page: 2-3 weeks\n2. Standard Business Site: 4-8 weeks\n3. E-Commerce Store: 8-12 weeks\n4. Custom Web Application: 8-16+ weeks\n\nTimelines depend on project scope, content readiness, and revision cycles. We also offer rush delivery for urgent needs. What's your target launch date?";
  }

  // Process / how it works
  if (/(process|how.*work|step|workflow|start|begin|method|approach)/.test(msg)) {
    return "Our development process has 5 key phases:\n\n1. Discovery - We learn about your business, goals & requirements\n2. Design - Wireframes & visual mockups for your approval\n3. Development - We bring the design to life with clean code\n4. Testing - Cross-browser, mobile & performance testing\n5. Launch - Deployment, training & handover\n\nWe keep you involved at every step with regular updates. Ready to get started? You can book a free consultation!";
  }

  // Technologies
  if (/(tech|technology|stack|framework|react|node|next|angular|vue|language|tool)/.test(msg)) {
    return "We work with modern, battle-tested technologies:\n\nFrontend: React, Next.js, Vue.js, TypeScript, Tailwind CSS\nBackend: Node.js, Express, Python, PostgreSQL\nCMS: WordPress, Strapi, Sanity\nE-Commerce: Shopify, WooCommerce, Custom\nHosting: AWS, Vercel, Netlify, DigitalOcean\n\nWe choose the best tech stack based on your project needs. Any specific technology preferences?";
  }

  // Support / maintenance
  if (/(support|maintenance|after|update|help|hosting|domain)/.test(msg)) {
    return "We offer comprehensive post-launch support:\n\n- 30-90 days free support (depending on package)\n- Monthly maintenance plans from $50/month\n- Security updates & backups\n- Content updates & minor changes\n- Performance monitoring\n- Hosting setup & management\n\nWe're here for the long term! Would you like details on our maintenance plans?";
  }

  // Contact / consultation
  if (/(contact|call|meet|consult|book|appointment|speak|talk|email|phone)/.test(msg)) {
    return "We'd love to connect with you! Here's how:\n\n- Fill out our contact form on the website\n- Email: nickther001@gmail.com\n- Book a free 30-minute consultation\n\nDuring the consultation, we'll discuss your project goals, timeline, and budget to create a tailored proposal. Would you like to schedule a call?";
  }

  // Thanks
  if (/(thank|thanks|merci|appreciate|great|awesome|perfect|excellent)/.test(msg)) {
    return "You're welcome! I'm glad I could help. Is there anything else you'd like to know about our services, pricing, or process? Feel free to ask anything!";
  }

  // Goodbye
  if (/(bye|goodbye|see you|au revoir|later|done|finish)/.test(msg)) {
    return "Thank you for chatting with us! If you have more questions later, feel free to come back anytime. You can also reach us through the contact form or email. Have a great day!";
  }

  // Default fallback
  return "Thanks for your message! I can help you with:\n\n- Pricing & packages\n- Project types we handle\n- Development timelines\n- Our process & technologies\n- Support & maintenance\n\nFeel free to ask about any of these topics, or tell me about your project and I'll provide a tailored recommendation!";
}

export default router;
