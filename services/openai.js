import { config } from '../config.js';

class OpenAIService {
  constructor() {
    this.apiKey = config.OPENAI_API_KEY;
    this.model = config.OPENAI_DEFAULT_MODEL;
    this.useMock = config.USE_MOCK_SERVICES || !this.apiKey;
  }

  async generateSmsResponse(systemPrompt, callerNumber) {
    if (this.useMock) {
      return (
        "Hi there! This is Nick from NT WebUX. Sorry we missed your call! " +
        "Are you looking to rebuild your web platforms, automate operations, or audit Quebec Bill 96 compliance?"
      );
    }
    const url = "https://api.openai.com/v1/chat/completions";
    const userMessage = `The customer with phone number ${callerNumber} tried calling but we missed the call. SMS response <160 chars.`;
    const payload = {
      model: this.model,
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userMessage }
      ],
      max_tokens: 100,
      temperature: 0.7
    };
    try {
      const res = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.apiKey}`
        },
        body: JSON.stringify(payload)
      });
      const data = await res.json();
      let content = data.choices[0].message.content.trim();
      if (content.startsWith('"') && content.endsWith('"')) {
        content = content.slice(1, -1);
      }
      return content;
    } catch (e) {
      throw e;
    }
  }
}

export const openaiService = new OpenAIService();
