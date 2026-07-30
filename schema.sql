-- Run this inside your Supabase SQL editor to create the database schemas
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE IF NOT EXISTS tenants (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL,
    phone_number VARCHAR(50) NOT NULL UNIQUE,
    twilio_number VARCHAR(50) NOT NULL UNIQUE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS sms_configurations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    tenant_id UUID UNIQUE REFERENCES tenants(id) ON DELETE CASCADE,
    system_prompt TEXT NOT NULL,
    fallback_message TEXT NOT NULL,
    openai_model VARCHAR(50) NOT NULL DEFAULT 'gpt-4o-mini',
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS call_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    tenant_id UUID REFERENCES tenants(id) ON DELETE SET NULL,
    caller_number VARCHAR(50) NOT NULL,
    call_sid VARCHAR(100) UNIQUE NOT NULL,
    status VARCHAR(50) NOT NULL,
    direction VARCHAR(20) NOT NULL DEFAULT 'inbound',
    duration INTEGER,
    sms_sent BOOLEAN NOT NULL DEFAULT FALSE,
    sms_content TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS scanner_leads (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    url TEXT NOT NULL UNIQUE,
    business_name VARCHAR(255),
    compliance_score NUMERIC(5,2) NOT NULL,
    structural_failures JSONB NOT NULL,
    contact_email VARCHAR(255),
    contact_phone VARCHAR(50),
    meta_description TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);
