import express, { type Express } from "express";
import cors from "cors";
import path from "path";
import router from "./routes/index.js";
import { stripeWebhookHandler } from "./routes/stripeWebhook.js";

const app: Express = express();

app.use(cors());

/**
 * Stripe webhook MUST use express.raw() so the raw request buffer is available
 * for signature verification (stripe.webhooks.constructEvent).
 * This route is registered BEFORE the global express.json() middleware.
 */
app.post(
  "/api/webhook/stripe",
  express.raw({ type: "application/json" }),
  stripeWebhookHandler
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", router);

app.get('/webhook', (req, res) => {
  const mode      = req.query['hub.mode'];
  const token     = req.query['hub.verify_token'];
  const challenge = req.query['hub.challenge'];

  if (mode === 'subscribe' && token === process.env.VERIFY_TOKEN) {
    console.log('WEBHOOK_VERIFIED');
    res.status(200).send(challenge);
  } else {
    console.warn('Webhook verification failed — mode:', mode, '| token match:', token === process.env.VERIFY_TOKEN);
    res.sendStatus(403);
  }
});

app.post('/webhook', (req, res) => {
  const body = req.body;
  if (body.object === 'page') {
    body.entry.forEach((entry: Record<string, unknown>) => {
      const webhook_event = (entry.messaging as unknown[])[0];
      console.log('Message Received:', webhook_event);
    });
    res.status(200).send('EVENT_RECEIVED');
  } else {
    res.sendStatus(404);
  }
});

/* ── SPA static file serving ──────────────────────────────────────────────
   Use __dirname (absolute path of this compiled file) rather than process.cwd()
   so the path is correct regardless of which directory the server is launched
   from. In production the CWD is the artifact's own folder, not the workspace
   root, which made process.cwd()-relative paths resolve incorrectly. */
const spaRoot = path.resolve(import.meta.dirname, "../../nt-web-design/dist/public");

app.use(express.static(spaRoot));

// Catch-all: serve index.html for any path that didn't match /api/* or a static file
app.use((_req, res) => {
  res.sendFile(path.join(spaRoot, "index.html"));
});

export default app;
