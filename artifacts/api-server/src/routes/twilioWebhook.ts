import { Router, type IRouter } from "express";
import { eq } from "drizzle-orm";

const router: IRouter = Router();

// Lazy imports matching your contact.ts layout
let db: any = null;
let tenantsTable: any = null;
let smsConfigTable: any = null;
let callLogsTable: any = null;
let conversationsTable: any = null;
let messagesTable: any = null;

async function getDb() {
  if (!process.env.DATABASE_URL) return null;
  if (db) return db;
  try {
    const mod = await import("@workspace/db");
    db = mod.db;
    tenantsTable = mod.tenants;
    smsConfigTable = mod.smsConfigurations;
    callLogsTable = mod.callLogs;
    conversationsTable = mod.conversations;
    messagesTable = mod.messages;
    return db;
  } catch (e) {
    console.error("Drizzle load error in Twilio Webhook:", e);
    return null;
  }
}

// Background worker for OpenAI Text-Back synthesis & Twilio dispatch
async function processMissedCallTextback(callSid: string, callerNumber: string, twilioNumber: string) {
  console.log(`[twilioWebhook] Initializing text-back for call ${callSid}...`);
  try {
    const database = await getDb();
    if (!database) return;

    // 1. Fetch Tenant details
    const tenantList = await database.select().from(tenantsTable).where(eq(tenantsTable.twilioNumber, twilioNumber)).limit(1);
    const tenant = tenantList[0];
    if (!tenant) {
      console.error(`[twilioWebhook] Aborted text-back. No tenant mapped to Twilio number ${twilioNumber}.`);
      return;
    }

    // 2. Fetch Active SMS Config
    const configList = await database.select()
      .from(smsConfigTable)
      .where(eq(smsConfigTable.tenantId, tenant.id))
      .limit(1);
    
    const smsConfig = configList.find((c: any) => c.isActive);
    const systemPrompt = smsConfig?.systemPrompt || 
      "You are an assistant for NT WebUX. Thank them for calling, apologize for missing the call, and ask how we can help. Keep response under 160 characters.";
    const fallbackMessage = smsConfig?.fallbackMessage || 
      "Thank you for calling. We missed your call. How can we help you today?";

    // 3. Generate SMS content via OpenAI API (direct fetch to avoid dependency imports)
    let smsBody = fallbackMessage;
    if (process.env.OPENAI_API_KEY) {
      try {
        const payload = {
          model: smsConfig?.openaiModel || "gpt-4o-mini",
          messages: [
            { role: "system", content: systemPrompt },
            { role: "user", content: `The customer with phone number ${callerNumber} tried calling but we missed the call. Write a short, engaging SMS response under 160 characters.` }
          ],
          max_tokens: 100,
          temperature: 0.7
        };
        const res = await fetch("https://api.openai.com/v1/chat/completions", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`
          },
          body: JSON.stringify(payload)
        });
        if (res.ok) {
          const data: any = await res.json();
          let content = data.choices[0].message.content.trim();
          if (content.startsWith('"') && content.endsWith('"')) {
            content = content.slice(1, -1);
          }
          smsBody = content;
        }
      } catch (err: any) {
        console.error("[twilioWebhook] OpenAI synthesis failed, using fallback:", err.message);
      }
    }

    // 4. Send SMS via Twilio HTTP REST API
    let smsSent = false;
    if (process.env.TWILIO_ACCOUNT_SID && process.env.TWILIO_AUTH_TOKEN) {
      try {
        const details: Record<string, string> = {
          "To": callerNumber,
          "From": twilioNumber,
          "Body": smsBody
        };
        const formBody = Object.keys(details)
          .map(k => encodeURIComponent(k) + "=" + encodeURIComponent(details[k]))
          .join("&");
        
        const auth = Buffer.from(`${process.env.TWILIO_ACCOUNT_SID}:${process.env.TWILIO_AUTH_TOKEN}`).toString("base64");
        
        const res = await fetch(`https://api.twilio.com/2010-04-01/Accounts/${process.env.TWILIO_ACCOUNT_SID}/Messages.json`, {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            "Authorization": `Basic ${auth}`
          },
          body: formBody
        });
        smsSent = res.ok;
      } catch (err: any) {
        console.error("[twilioWebhook] Twilio SMS dispatch failed:", err.message);
      }
    } else {
      // Mock mode logging
      console.log(`[MOCK Twilio SMS] Dispatch from ${twilioNumber} to ${callerNumber}: "${smsBody}"`);
      smsSent = true;
    }

    // 5. Update call log in database
    await database.update(callLogsTable)
      .set({
        status: smsSent ? "missed-textback-sent" : "missed-textback-failed",
        smsSent,
        smsContent: smsBody
      })
      .where(eq(callLogsTable.callSid, callSid));

    // 6. Integrate with your conversations and messages tables
    // Check if conversation already exists for this callerNumber
    const existingConv = await database.select()
      .from(conversationsTable)
      .where(eq(conversationsTable.title, callerNumber))
      .limit(1);

    let conversationId: number;
    if (existingConv[0]) {
      conversationId = existingConv[0].id;
    } else {
      const [newConv] = await database.insert(conversationsTable)
        .values({ title: callerNumber })
        .returning({ id: conversationsTable.id });
      conversationId = newConv.id;
    }

    // Log the user missed call event
    await database.insert(messagesTable).values({
      conversationId,
      role: "user",
      content: `[MISSED CALL] Ring event unanswered. Triggering automated SMS response.`
    });

    // Log the assistant response text
    await database.insert(messagesTable).values({
      conversationId,
      role: "assistant",
      content: smsBody
    });

    console.log(`[twilioWebhook] Completed missed call text-back workflow for ${callerNumber}`);

  } catch (e: any) {
    console.error("[twilioWebhook] processMissedCallTextback critical error:", e.message);
  }
}

// Route 1: Incoming Call webhook
router.post("/api/v1/voice/incoming", async (req, res) => {
  const callSid = req.body.CallSid || "";
  const callerNumber = req.body.From || "";
  const twilioNumber = req.body.To || "";
  const direction = req.body.Direction || "inbound";

  console.log(`[TWILIO VOICE] Incoming CallSid=${callSid} | From=${callerNumber} | To=${twilioNumber}`);

  let forwardTo = process.env.TWILIO_FROM_NUMBER || "+15145550100";
  let tenantId = null;

  try {
    const database = await getDb();
    if (database) {
      const tenantList = await database.select().from(tenantsTable).where(eq(tenantsTable.twilioNumber, twilioNumber)).limit(1);
      const tenant = tenantList[0];
      if (tenant) {
        forwardTo = tenant.phoneNumber;
        tenantId = tenant.id;
      }
    }

    // Log Call
    if (database && callLogsTable) {
      await database.insert(callLogsTable).values({
        tenantId,
        callerNumber,
        callSid,
        direction,
        status: "ringing"
      });
    }
  } catch (e: any) {
    console.error("[TWILIO VOICE] Failed to log call:", e.message);
  }

  // XML dial forward twiml
  const twiml = `<?xml version="1.0" encoding="UTF-8"?>
<Response>
  <Dial timeout="20" action="/api/v1/voice/dial-callback" method="POST">
    ${forwardTo}
  </Dial>
</Response>`;

  res.type("text/xml").send(twiml);
});

// Route 2: Dial Callback webhook
router.post("/api/v1/voice/dial-callback", async (req, res) => {
  const callSid = req.body.CallSid || "";
  const dialStatus = req.body.DialCallStatus || "failed";
  const durationStr = req.body.DialCallDuration || "0";
  const callerNumber = req.body.From || "";
  const twilioNumber = req.body.To || "";

  const duration = parseInt(durationStr, 10) || 0;
  console.log(`[TWILIO VOICE] Callback: CallSid=${callSid} | Status=${dialStatus} | Duration=${duration}s`);

  const missedStates = ["busy", "no-answer", "failed", "canceled"];

  try {
    const database = await getDb();
    if (database && callLogsTable) {
      if (missedStates.includes(dialStatus)) {
        // missed: update log and trigger background text-back
        await database.update(callLogsTable)
          .set({ status: dialStatus, duration })
          .where(eq(callLogsTable.callSid, callSid));
        
        // Execute background text-back asynchronously (don't await)
        processMissedCallTextback(callSid, callerNumber, twilioNumber);
      } else {
        // completed: just log status
        await database.update(callLogsTable)
          .set({ status: "completed", duration })
          .where(eq(callLogsTable.callSid, callSid));
      }
    }
  } catch (e: any) {
    console.error("[TWILIO VOICE] Callback update failed:", e.message);
  }

  // XML hangup
  const twiml = `<?xml version="1.0" encoding="UTF-8"?>
<Response>
  <Hangup/>
</Response>`;
  res.type("text/xml").send(twiml);
});

export default router;
