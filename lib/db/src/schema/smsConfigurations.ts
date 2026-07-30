import { boolean, integer, pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";
import { tenants } from "./tenants.js";

export const smsConfigurations = pgTable("sms_configurations", {
  id: serial("id").primaryKey(),
  tenantId: integer("tenant_id")
    .notNull()
    .references(() => tenants.id, { onDelete: "cascade" }),
  systemPrompt: text("system_prompt").notNull(),
  fallbackMessage: text("fallback_message").notNull(),
  openaiModel: text("openai_model").default("gpt-4o-mini").notNull(),
  isActive: boolean("is_active").default(true).notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
});

export const insertSmsConfigSchema = createInsertSchema(smsConfigurations).omit({ id: true, createdAt: true });
export type SmsConfig = typeof smsConfigurations.$inferSelect;
export type InsertSmsConfig = z.infer<typeof insertSmsConfigSchema>;
