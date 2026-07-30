import assert from 'assert';
import { cleanBusinessName, analyzeTextLanguage } from './scanner.js';
import { twilioService } from './services/twilio.js';
import { db } from './database.js';

async function runTests() {
  console.log("=== RUNNING NT WEBUX NODE.JS INTEGRATION TESTS ===\n");

  assert.strictEqual(cleanBusinessName("Ace Esthétique - Auto Detailing"), "Ace Esthétique");
  assert.strictEqual(cleanBusinessName("Body Dream | Field Services"), "Body Dream");
  console.log("  ↳ ✓ cleanBusinessName tests passed.\n");

  const frResult = analyzeTextLanguage("Bienvenue chez nous. Notre équipe est dévouée pour nettoyer votre auto. C'est le meilleur service de la ville.");
  const enResult = analyzeTextLanguage("Welcome to our clinic. We provide dental cleaning, implants, and teeth whitening. Call us today.");
  assert.strictEqual(frResult.isFrench, true);
  assert.strictEqual(enResult.isFrench, false);
  console.log("  ↳ ✓ analyzeTextLanguage tests passed.\n");

  const dialTwiml = twilioService.generateTwimlDial("+15149999999", "/api/v1/voice/dial-callback");
  assert.ok(dialTwiml.includes("<Dial timeout=\"20\" action=\"/api/v1/voice/dial-callback\""));
  console.log("  ↳ ✓ TwiML Generator tests passed.\n");

  db.useMock = true;
  const testSid = "test-verify-sid-999";
  await db.createCallLog({
    tenantId: "tenant-uuid-1111-2222-3333",
    callerNumber: "+15145558888",
    callSid: testSid,
    direction: "inbound",
    status: "ringing"
  });
  
  let currentLogs = db.readMockDb().call_logs;
  let loggedCall = currentLogs.find(l => l.call_sid === testSid);
  assert.ok(loggedCall);

  await db.updateCallLogStatus({
    callSid: testSid,
    status: "no-answer",
    duration: 0,
    smsSent: true,
    smsContent: "Sorry we missed you!"
  });

  currentLogs = db.readMockDb().call_logs;
  loggedCall = currentLogs.find(l => l.call_sid === testSid);
  assert.ok(loggedCall);
  assert.strictEqual(loggedCall.status, "no-answer");
  console.log("  ↳ ✓ Database Mock persistence tests passed.\n");

  console.log("=== ALL INTEGRATION TESTS PASSED ===");
}

runTests().catch(e => {
  console.error("Test failed:", e);
  process.exit(1);
});
