import { boolean, integer, pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";
import { tenants } from "./tenants.js";

export const callLogs = pgTable("call_logs", {
  id: serial("id").primaryKey(),
  tenantId: integer("tenant_id")
    .references(() => tenants.id, { onDelete: "set null" }),
  callerNumber: text("caller_number").notNull(),
  callSid: text("call_sid").notNull().unique(),
  status: text("status").notNull(),
  direction: text("direction").default("inbound").notNull(),
  duration: integer("duration"),
  smsSent: boolean("sms_sent").default(false).notNull(),
  smsContent: text("sms_content"),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
});

export const insertCallLogSchema = createInsertSchema(callLogs).omit({ id: true, createdAt: true });
export type CallLog = typeof callLogs.$inferSelect;
export type InsertCallLog = z.infer<typeof insertCallLogSchema>;
