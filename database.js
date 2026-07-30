import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { config } from './config.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const mockDbPath = path.resolve(__dirname, 'mock_db.json');

function initializeMockDb() {
  if (fs.existsSync(mockDbPath)) return;
  const seedData = {
    tenants: [
      {
        id: "tenant-uuid-1111-2222-3333",
        name: "NT WebUX Montreal HQ",
        phone_number: "+15149999999",
        twilio_number: "+15145550100",
        created_at: new Date().toISOString()
      }
    ],
    sms_configurations: [
      {
        id: "config-uuid-1111-2222-3333",
        tenant_id: "tenant-uuid-1111-2222-3333",
        system_prompt: "You are the senior executive AI assistant for NT WebUX, a premium Quebec web application and Bill 96 compliance engineering agency. Start by thanking them for calling NT WebUX, acknowledge that we missed their call, and ask: 'Are you looking to rebuild your web platforms, automate operations, or audit your Quebec compliance status?' Be warm, direct, and keep the message brief (under 160 characters).",
        fallback_message: "Thank you for calling NT WebUX! We missed your call, but we are ready to help. How can we serve your digital operations today?",
        openai_model: "gpt-4o-mini",
        is_active: true,
        created_at: new Date().toISOString()
      }
    ],
    call_logs: [],
    scanner_leads: []
  };
  fs.writeFileSync(mockDbPath, JSON.stringify(seedData, null, 2), 'utf8');
}

class DatabaseClient {
  constructor() {
    this.useMock = config.USE_MOCK_SERVICES;
    if (this.useMock) {
      initializeMockDb();
    } else {
      this.supabaseUrl = config.SUPABASE_URL.replace(/\/$/, "");
      this.headers = {
        "apikey": config.SUPABASE_SERVICE_ROLE_KEY,
        "Authorization": `Bearer ${config.SUPABASE_SERVICE_ROLE_KEY}`,
        "Content-Type": "application/json",
        "Prefer": "return=representation"
      };
      if (!this.supabaseUrl || !config.SUPABASE_SERVICE_ROLE_KEY) {
        this.useMock = true;
        initializeMockDb();
      }
    }
  }

  readMockDb() {
    return JSON.parse(fs.readFileSync(mockDbPath, 'utf8'));
  }

  writeMockDb(data) {
    fs.writeFileSync(mockDbPath, JSON.stringify(data, null, 2), 'utf8');
  }

  async getTenantByTwilioNumber(twilioNumber) {
    if (this.useMock) {
      const data = this.readMockDb();
      return data.tenants.find(t => t.twilio_number === twilioNumber) || null;
    }
    try {
      const url = `${this.supabaseUrl}/rest/v1/tenants?twilio_number=eq.${encodeURIComponent(twilioNumber)}`;
      const res = await fetch(url, { headers: this.headers });
      const records = await res.json();
      return records[0] || null;
    } catch (e) {
      return null;
    }
  }

  async getSmsConfig(tenantId) {
    if (this.useMock) {
      const data = this.readMockDb();
      return data.sms_configurations.find(c => c.tenant_id === tenantId && c.is_active) || null;
    }
    try {
      const url = `${this.supabaseUrl}/rest/v1/sms_configurations?tenant_id=eq.${encodeURIComponent(tenantId)}&is_active=eq.true`;
      const res = await fetch(url, { headers: this.headers });
      const records = await res.json();
      return records[0] || null;
    } catch (e) {
      return null;
    }
  }

  async createCallLog({ tenantId, callerNumber, callSid, direction, status }) {
    const payload = {
      tenant_id: tenantId,
      caller_number: callerNumber,
      call_sid: callSid,
      direction,
      status,
      sms_sent: false,
      sms_content: null,
      created_at: new Date().toISOString()
    };
    if (this.useMock) {
      const data = this.readMockDb();
      data.call_logs.push(payload);
      this.writeMockDb(data);
      return payload;
    }
    try {
      const url = `${this.supabaseUrl}/rest/v1/call_logs`;
      const res = await fetch(url, {
        method: 'POST',
        headers: this.headers,
        body: JSON.stringify(payload)
      });
      const records = await res.json();
      return records[0] || null;
    } catch (e) {
      return null;
    }
  }

  async updateCallLogStatus({ callSid, status, duration, smsSent, smsContent }) {
    const payload = { status };
    if (duration !== undefined) payload.duration = duration;
    if (smsSent !== undefined) payload.sms_sent = smsSent;
    if (smsContent !== undefined) payload.sms_content = smsContent;

    if (this.useMock) {
      const data = this.readMockDb();
      const log = data.call_logs.find(l => l.call_sid === callSid);
      if (log) {
        Object.assign(log, payload);
        this.writeMockDb(data);
        return log;
      }
      return null;
    }
    try {
      const url = `${this.supabaseUrl}/rest/v1/call_logs?call_sid=eq.${encodeURIComponent(callSid)}`;
      const res = await fetch(url, {
        method: 'PATCH',
        headers: this.headers,
        body: JSON.stringify(payload)
      });
      const records = await res.json();
      return records[0] || null;
    } catch (e) {
      return null;
    }
  }

  async createScannerLead({ url, businessName, complianceScore, structuralFailures, contactEmail, contactPhone, metaDescription }) {
    const payload = {
      url,
      business_name: businessName,
      compliance_score: complianceScore,
      structural_failures: structuralFailures,
      contact_email: contactEmail,
      contact_phone: contactPhone,
      meta_description: metaDescription,
      created_at: new Date().toISOString()
    };
    if (this.useMock) {
      const data = this.readMockDb();
      const idx = data.scanner_leads.findIndex(l => l.url === url);
      if (idx !== -1) {
        data.scanner_leads[idx] = Object.assign({}, data.scanner_leads[idx], payload);
      } else {
        data.scanner_leads.push(payload);
      }
      this.writeMockDb(data);
      return payload;
    }
    try {
      const customHeaders = {
        ...this.headers,
        "Prefer": "resolution=merge-duplicates,return=representation"
      };
      const res = await fetch(`${this.supabaseUrl}/rest/v1/scanner_leads`, {
        method: 'POST',
        headers: customHeaders,
        body: JSON.stringify(payload)
      });
      const records = await res.json();
      return records[0] || null;
    } catch (e) {
      return null;
    }
  }
}

export const db = new DatabaseClient();
