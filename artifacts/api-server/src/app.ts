import express, { type Express } from "express";
import cors from "cors";
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

export default app;
