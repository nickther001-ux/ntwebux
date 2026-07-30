import express from 'express';
import cors from 'cors';
import { config } from './config.js';
import { db } from './database.js';
import { twilioService } from './services/twilio.js';
import { openaiService } from './services/openai.js';
import { scanWebsite } from './scanner.js';

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

async function processMissedCallTextback(callSid, callerNumber, twilioNumber) {
  try {
    const tenant = await db.getTenantByTwilioNumber(twilioNumber);
    if (!tenant) return;

    const smsConfig = await db.getSmsConfig(tenant.id);
    let systemPrompt = "You are an assistant for NT WebUX. Thank them, apologize, and ask how we can help. Keep <160 chars.";
    let fallbackMessage = "Thank you for calling. We missed your call. How can we help you?";

    if (smsConfig) {
      systemPrompt = smsConfig.system_prompt;
      fallbackMessage = smsConfig.fallback_message;
    }

    let smsBody;
    try {
      smsBody = await openaiService.generateSmsResponse(systemPrompt, callerNumber);
    } catch (e) {
      smsBody = fallbackMessage;
    }

    const success = await twilioService.sendSms(callerNumber, twilioNumber, smsBody);
    await db.updateCallLogStatus({
      callSid,
      status: success ? "missed-textback-sent" : "missed-textback-failed",
      smsSent: success,
      smsContent: smsBody
    });
  } catch (e) {
    console.error("Textback error:", e);
  }
}

app.get('/health', (req, res) => {
  res.status(200).json({ status: "healthy", mockMode: db.useMock });
});

app.post('/api/v1/voice/incoming', async (req, res) => {
  const callSid = req.body.CallSid || '';
  const callerNumber = req.body.From || '';
  const twilioNumber = req.body.To || '';
  const direction = req.body.Direction || 'inbound';

  let forwardTo = config.TWILIO_FROM_NUMBER || '+15145550100';
  let tenantId = null;

  try {
    const tenant = await db.getTenantByTwilioNumber(twilioNumber);
    if (tenant) {
      forwardTo = tenant.phone_number;
      tenantId = tenant.id;
    }
    await db.createCallLog({ tenantId, callerNumber, callSid, direction, status: 'ringing' });
  } catch (e) {}

  const twiml = twilioService.generateTwimlDial(forwardTo, '/api/v1/voice/dial-callback');
  res.type('text/xml').send(twiml);
});

app.post('/api/v1/voice/dial-callback', async (req, res) => {
  const callSid = req.body.CallSid || '';
  const dialStatus = req.body.DialCallStatus || 'failed';
  const durationStr = req.body.DialCallDuration || '0';
  const callerNumber = req.body.From || '';
  const twilioNumber = req.body.To || '';
  const duration = parseInt(durationStr, 10) || 0;

  const missedStates = ["busy", "no-answer", "failed", "canceled"];
  try {
    if (missedStates.includes(dialStatus)) {
      await db.updateCallLogStatus({ callSid, status: dialStatus, duration });
      processMissedCallTextback(callSid, callerNumber, twilioNumber);
    } else {
      await db.updateCallLogStatus({ callSid, status: "completed", duration });
    }
  } catch (e) {}

  res.type('text/xml').send(twilioService.generateTwimlHangup());
});

app.post('/api/v1/scanner/scan', async (req, res) => {
  const targetUrl = req.body.url;
  if (!targetUrl) return res.status(400).json({ error: "Please enter a valid website URL." });
  try {
    const result = await scanWebsite(targetUrl);
    res.status(200).json(result);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

app.get('/', async (req, res) => {
  let tenants = [], callLogs = [], scannerLeads = [];
  if (db.useMock) {
    const rawData = db.readMockDb();
    tenants = rawData.tenants || [];
    callLogs = rawData.call_logs || [];
    scannerLeads = rawData.scanner_leads || [];
  } else {
    try {
      const headers = db.headers;
      const tRes = await fetch(`${db.supabaseUrl}/rest/v1/tenants?limit=50`, { headers });
      tenants = tRes.ok ? await tRes.json() : [];
      const lRes = await fetch(`${db.supabaseUrl}/rest/v1/call_logs?order=created_at.desc&limit=50`, { headers });
      callLogs = lRes.ok ? await lRes.json() : [];
      const sRes = await fetch(`${db.supabaseUrl}/rest/v1/scanner_leads?order=created_at.desc&limit=50`, { headers });
      scannerLeads = sRes.ok ? await sRes.json() : [];
    } catch (e) {}
  }

  const tenantMap = tenants.reduce((acc, t) => { acc[t.id] = t.name; return acc; }, {});

  const html = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <title>NT WebUX Ops Dashboard</title>
        <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;600;700&display=swap" rel="stylesheet">
        <style>
            :root {
                --bg-main: #0B0F19;
                --bg-card: rgba(17, 24, 39, 0.7);
                --border-color: rgba(255, 255, 255, 0.08);
                --text-primary: #F3F4F6;
                --text-secondary: #9CA3AF;
                --primary: #6366F1;
                --success: #10B981;
                --warning: #F59E0B;
                --danger: #EF4444;
            }
            body { font-family: 'Plus Jakarta Sans', sans-serif; background: var(--bg-main); color: var(--text-primary); padding: 2rem; }
            header { display: flex; justify-content: space-between; margin-bottom: 2rem; border-bottom: 1px solid var(--border-color); padding-bottom: 1rem; }
            .logo { font-size: 1.5rem; font-weight: 700; background: linear-gradient(135deg, #FFF 0%, #6366F1 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
            .badge { padding: 0.35rem 0.75rem; border-radius: 9999px; font-size: 0.75rem; font-weight: 600; }
            .badge-live { background: rgba(16, 185, 129, 0.15); color: var(--success); }
            .badge-mock { background: rgba(245, 158, 11, 0.15); color: var(--warning); }
            .scanner-bar { background: rgba(99, 102, 241, 0.1); border: 1px solid rgba(99, 102, 241, 0.2); border-radius: 12px; padding: 1.5rem; margin-bottom: 2rem; display: flex; gap: 1rem; align-items: center; }
            .scanner-input { flex-grow: 1; background: rgba(17, 24, 39, 0.6); border: 1px solid var(--border-color); border-radius: 6px; padding: 0.75rem; color: #FFF; outline: none; }
            .scanner-button { background: var(--primary); border: none; color: #FFF; padding: 0.75rem 1.5rem; border-radius: 6px; font-weight: 600; cursor: pointer; }
            .grid { display: grid; grid-template-columns: 1fr 1fr; gap: 2rem; margin-bottom: 2rem; }
            .card { background: var(--bg-card); border: 1px solid var(--border-color); border-radius: 12px; padding: 1.5rem; }
            .card-title { font-size: 1.1rem; font-weight: 600; margin-bottom: 1rem; border-bottom: 1px solid var(--border-color); padding-bottom: 0.5rem; }
            table { width: 100%; border-collapse: collapse; font-size: 0.85rem; }
            th { color: var(--text-secondary); padding: 0.5rem 1rem; border-bottom: 1px solid var(--border-color); }
            td { padding: 0.75rem 1rem; border-bottom: 1px solid rgba(255, 255, 255, 0.04); }
            .score-high { color: var(--success); font-weight: 700; }
            .score-medium { color: var(--warning); font-weight: 700; }
            .score-low { color: var(--danger); font-weight: 700; }
            .desc-txt { display: inline-block; max-width: 150px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; color: var(--text-secondary); }
        </style>
    </head>
    <body>
        <header>
            <div class="logo">NT WebUX // Hybrid Ops Console</div>
            <span class="badge ${db.useMock ? 'badge-mock' : 'badge-live'}">
                Mode: ${db.useMock ? 'Local Mock DB' : 'Live Supabase'}
            </span>
        </header>

        <div class="scanner-bar">
            <span style="font-weight:600;">⚡ Compliance Scanner:</span>
            <input type="text" id="scan-url" class="scanner-input" placeholder="business.com" />
            <button id="scan-btn" class="scanner-button" onclick="runScan()">Analyze Domain</button>
        </div>

        <div class="grid">
            <div class="card">
                <div class="card-title">SaaS Tenants</div>
                <table>
                    <thead><tr><th>Name</th><th>Twilio Line</th><th>Forwarding Line</th></tr></thead>
                    <tbody>
                        ${tenants.map(t => `<tr><td><strong>${t.name}</strong></td><td>${t.twilio_number}</td><td>${t.phone_number}</td></tr>`).join('')}
                    </tbody>
                </table>
            </div>

            <div class="card">
                <div class="card-title">Compliance Leads</div>
                <table>
                    <thead><tr><th>Company</th><th>URL</th><th>Score</th><th>Failures</th></tr></thead>
                    <tbody>
                        ${scannerLeads.map(l => `
                            <tr>
                                <td><strong>${l.business_name || 'Unknown'}</strong></td>
                                <td><a href="${l.url}" target="_blank" style="color:var(--primary);">${l.url.replace('https://','')}</a></td>
                                <td><span class="${l.compliance_score >= 85 ? 'score-high' : l.compliance_score >= 50 ? 'score-medium' : 'score-low'}">${l.compliance_score}%</span></td>
                                <td><span class="desc-txt">${JSON.stringify(l.structural_failures)}</span></td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
            </div>
        </div>

        <div class="card">
            <div class="card-title">SMS Text-Back Call Logs</div>
            <table>
                <thead><tr><th>Time</th><th>Tenant</th><th>Caller</th><th>Status</th><th>Duration</th><th>SMS Body</th></tr></thead>
                <tbody>
                    ${callLogs.map(log => `
                        <tr>
                            <td>${(log.created_at || '').slice(0, 19).replace('T', ' ')}</td>
                            <td>${tenantMap[log.tenant_id] || 'Unmapped'}</td>
                            <td>${log.caller_number}</td>
                            <td>${log.status}</td>
                            <td>${log.duration || 0}s</td>
                            <td><span style="color:var(--success); font-weight:bold;">${log.sms_sent ? '✓ ' : '✗ '}</span><span class="desc-txt">${log.sms_content || 'N/A'}</span></td>
                        </tr>
                    `).reverse().join('')}
                </tbody>
            </table>
        </div>

        <script>
          async function runScan() {
            const urlInput = document.getElementById("scan-url");
            const btn = document.getElementById("scan-btn");
            const url = urlInput.value.trim();
            if (!url) return;
            btn.disabled = true;
            btn.innerText = "Scanning...";
            try {
              const res = await fetch("/api/v1/scanner/scan", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ url })
              });
              const result = await res.json();
              if (result.error) alert("Scan failed: " + result.error);
              else window.location.reload();
            } catch (e) {
              alert("Error: " + e.message);
            } finally {
              btn.disabled = false;
              btn.innerText = "Analyze Domain";
            }
          }
        </script>
    </body>
    </html>
  `;
  res.send(html);
});

const port = config.PORT;
const host = config.HOST;
app.listen(port, host, () => {
  console.log(`[SERVER] Live at http://${host}:${port}`);
});
