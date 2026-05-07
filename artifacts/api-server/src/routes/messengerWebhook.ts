import { Router, type Request, type Response } from "express";

const router = Router();

router.get("/", (req: Request, res: Response) => {
  const mode      = req.query["hub.mode"];
  const token     = req.query["hub.verify_token"];
  const challenge = req.query["hub.challenge"];

  if (mode === "subscribe" && token === process.env.VERIFY_TOKEN) {
    console.log("Facebook webhook verified.");
    res.status(200).send(challenge);
  } else {
    console.warn("Webhook verification failed — token mismatch or wrong mode.");
    res.sendStatus(403);
  }
});

router.post("/", (req: Request, res: Response) => {
  const body = req.body;

  if (body.object === "page") {
    body.entry?.forEach((entry: Record<string, unknown>) => {
      const events = (entry.messaging as Record<string, unknown>[]) ?? [];
      events.forEach((event) => {
        console.log("Incoming Messenger event:", JSON.stringify(event, null, 2));
      });
    });
    res.sendStatus(200);
  } else {
    res.sendStatus(404);
  }
});

export default router;
