import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, '.env') });

export const config = {
  SUPABASE_URL: process.env.SUPABASE_URL || '',
  SUPABASE_SERVICE_ROLE_KEY: process.env.SUPABASE_SERVICE_ROLE_KEY || '',
  TWILIO_ACCOUNT_SID: process.env.TWILIO_ACCOUNT_SID || '',
  TWILIO_AUTH_TOKEN: process.env.TWILIO_AUTH_TOKEN || '',
  TWILIO_FROM_NUMBER: process.env.TWILIO_FROM_NUMBER || '',
  OPENAI_API_KEY: process.env.OPENAI_API_KEY || '',
  OPENAI_DEFAULT_MODEL: process.env.OPENAI_DEFAULT_MODEL || 'gpt-4o-mini',
  PORT: parseInt(process.env.PORT || '8000', 10),
  HOST: process.env.HOST || '0.0.0.0',
  USE_MOCK_SERVICES: (process.env.USE_MOCK_SERVICES || 'true').toLowerCase() === 'true'
};
