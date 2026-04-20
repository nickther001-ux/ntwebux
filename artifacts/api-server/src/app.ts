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

/* ── SPA static file serving ──────────────────────────────────────────────
   Serve the built React app for all non-API routes so that deep links like
   /toronto work on hard refresh regardless of which static host is used.
   The server is run from the workspace root, so process.cwd() is reliable. */
const spaRoot = path.resolve(process.cwd(), "artifacts/nt-web-design/dist/public");

app.use(express.static(spaRoot));

// Catch-all: serve index.html for any path that didn't match /api/* or a static file
app.use((_req, res) => {
  res.sendFile(path.join(spaRoot, "index.html"));
});

export default app;
