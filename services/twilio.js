import { config } from '../config.js';

class TwilioService {
  constructor() {
    this.accountSid = config.TWILIO_ACCOUNT_SID;
    this.authToken = config.TWILIO_AUTH_TOKEN;
    this.useMock = config.USE_MOCK_SERVICES || !this.accountSid || !this.authToken;
  }

  async sendSms(to, from, body) {
    if (this.useMock) {
      console.log(`[MOCK SMS] Sending SMS from ${from} to ${to}: "${body}"`);
      return true;
    }
    const url = `https://api.twilio.com/2010-04-01/Accounts/${this.accountSid}/Messages.json`;
    const details = { 'To': to, 'From': from, 'Body': body };
    const formBody = Object.keys(details)
      .map(key => encodeURIComponent(key) + '=' + encodeURIComponent(details[key]))
      .join('&');

    try {
      const auth = Buffer.from(`${this.accountSid}:${this.authToken}`).toString('base64');
      const res = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Authorization': `Basic ${auth}`
        },
        body: formBody
      });
      if (!res.ok) throw new Error(`Twilio status ${res.status}`);
      return true;
    } catch (e) {
      return false;
    }
  }

  generateTwimlDial(forwardingNumber, actionUrl, timeout = 20) {
    return (
      '<?xml version="1.0" encoding="UTF-8"?>\n' +
      '<Response>\n' +
      `    <Dial timeout="${timeout}" action="${actionUrl}" method="POST">\n` +
      `        ${forwardingNumber}\n` +
      '    </Dial>\n' +
      '</Response>'
    );
  }

  generateTwimlHangup() {
    return (
      '<?xml version="1.0" encoding="UTF-8"?>\n' +
      '<Response>\n' +
      '    <Hangup/>\n' +
      '</Response>'
    );
  }
}

export const twilioService = new TwilioService();
