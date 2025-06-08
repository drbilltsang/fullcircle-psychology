import {
  pgTable,
  text,
  varchar,
  timestamp,
  integer,
  serial,
  boolean,
  date,
  jsonb,
  decimal,
} from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";
import { relations } from "drizzle-orm";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: varchar("username", { length: 50 }).notNull().unique(),
  email: varchar("email", { length: 100 }).notNull().unique(),
  passwordHash: varchar("password_hash", { length: 255 }).notNull(),
  firstName: varchar("first_name", { length: 50 }),
  lastName: varchar("last_name", { length: 50 }),
  role: varchar("role", { length: 20 }).default("patient"), // patient, provider, admin
  isActive: boolean("is_active").default(true),
  phoneNumber: varchar("phone_number", { length: 20 }),
  dateOfBirth: date("date_of_birth"),
  address: text("address"),
  emergencyContact: jsonb("emergency_contact"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const appointments = pgTable("appointments", {
  id: serial("id").primaryKey(),
  patientId: integer("patient_id").notNull().references(() => users.id),
  providerId: integer("provider_id").references(() => users.id),
  appointmentDate: timestamp("appointment_date").notNull(),
  duration: integer("duration").default(60), // minutes
  appointmentType: varchar("appointment_type", { length: 50 }).notNull(), // initial, followup, assessment
  status: varchar("status", { length: 20 }).default("scheduled"), // scheduled, confirmed, completed, cancelled
  notes: text("notes"),
  meetingLink: varchar("meeting_link", { length: 255 }),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const documents = pgTable("documents", {
  id: serial("id").primaryKey(),
  patientId: integer("patient_id").notNull().references(() => users.id),
  uploadedBy: integer("uploaded_by").notNull().references(() => users.id),
  fileName: varchar("file_name", { length: 255 }).notNull(),
  fileType: varchar("file_type", { length: 50 }).notNull(),
  fileSize: integer("file_size").notNull(),
  documentType: varchar("document_type", { length: 50 }).notNull(), // intake, assessment, report, insurance
  isConfidential: boolean("is_confidential").default(false),
  uploadDate: timestamp("upload_date").defaultNow(),
  description: text("description"),
});

export const messages = pgTable("messages", {
  id: serial("id").primaryKey(),
  fromUserId: integer("from_user_id").notNull().references(() => users.id),
  toUserId: integer("to_user_id").notNull().references(() => users.id),
  subject: varchar("subject", { length: 255 }),
  content: text("content").notNull(),
  isRead: boolean("is_read").default(false),
  sentAt: timestamp("sent_at").defaultNow(),
});

export const assessments = pgTable("assessments", {
  id: serial("id").primaryKey(),
  patientId: integer("patient_id").notNull().references(() => users.id),
  assessmentType: varchar("assessment_type", { length: 100 }).notNull(),
  status: varchar("status", { length: 20 }).default("pending"), // pending, in_progress, completed
  responses: jsonb("responses"),
  completedAt: timestamp("completed_at"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const invoices = pgTable("invoices", {
  id: serial("id").primaryKey(),
  patientId: integer("patient_id").notNull().references(() => users.id),
  invoiceNumber: varchar("invoice_number", { length: 50 }).notNull().unique(),
  amount: varchar("amount", { length: 20 }).notNull(), // Store as string for precision
  description: text("description"),
  serviceDate: timestamp("service_date"),
  dueDate: timestamp("due_date"),
  status: varchar("status", { length: 20 }).default("pending"), // pending, paid, overdue
  paymentMethod: varchar("payment_method", { length: 50 }),
  paymentDate: timestamp("payment_date"),
  stripePaymentIntentId: varchar("stripe_payment_intent_id", { length: 100 }),
  createdAt: timestamp("created_at").defaultNow(),
});

// Relations
export const usersRelations = relations(users, ({ many }) => ({
  patientAppointments: many(appointments, { relationName: "patientAppointments" }),
  providerAppointments: many(appointments, { relationName: "providerAppointments" }),
  documents: many(documents),
  sentMessages: many(messages, { relationName: "sentMessages" }),
  receivedMessages: many(messages, { relationName: "receivedMessages" }),
  assessments: many(assessments),
  invoices: many(invoices),
}));

export const appointmentsRelations = relations(appointments, ({ one }) => ({
  patient: one(users, {
    fields: [appointments.patientId],
    references: [users.id],
    relationName: "patientAppointments",
  }),
  provider: one(users, {
    fields: [appointments.providerId],
    references: [users.id],
    relationName: "providerAppointments",
  }),
}));

export const documentsRelations = relations(documents, ({ one }) => ({
  patient: one(users, {
    fields: [documents.patientId],
    references: [users.id],
  }),
  uploadedByUser: one(users, {
    fields: [documents.uploadedBy],
    references: [users.id],
  }),
}));

export const messagesRelations = relations(messages, ({ one }) => ({
  fromUser: one(users, {
    fields: [messages.fromUserId],
    references: [users.id],
    relationName: "sentMessages",
  }),
  toUser: one(users, {
    fields: [messages.toUserId],
    references: [users.id],
    relationName: "receivedMessages",
  }),
}));

export const assessmentsRelations = relations(assessments, ({ one }) => ({
  patient: one(users, {
    fields: [assessments.patientId],
    references: [users.id],
  }),
}));

export const invoicesRelations = relations(invoices, ({ one }) => ({
  patient: one(users, {
    fields: [invoices.patientId],
    references: [users.id],
  }),
}));

// Insert schemas
export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  email: true,
  passwordHash: true,
  firstName: true,
  lastName: true,
  phoneNumber: true,
  dateOfBirth: true,
  address: true,
  emergencyContact: true,
});

export const insertAppointmentSchema = createInsertSchema(appointments).pick({
  patientId: true,
  providerId: true,
  appointmentDate: true,
  duration: true,
  appointmentType: true,
  notes: true,
});

export const insertDocumentSchema = createInsertSchema(documents).pick({
  patientId: true,
  uploadedBy: true,
  fileName: true,
  fileType: true,
  fileSize: true,
  documentType: true,
  isConfidential: true,
  description: true,
});

export const insertMessageSchema = createInsertSchema(messages).pick({
  fromUserId: true,
  toUserId: true,
  subject: true,
  content: true,
});

export const insertAssessmentSchema = createInsertSchema(assessments).pick({
  patientId: true,
  assessmentType: true,
  responses: true,
});

export const insertInvoiceSchema = createInsertSchema(invoices).pick({
  patientId: true,
  invoiceNumber: true,
  amount: true,
  description: true,
  serviceDate: true,
  dueDate: true,
});

// Types
export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
export type InsertAppointment = z.infer<typeof insertAppointmentSchema>;
export type Appointment = typeof appointments.$inferSelect;
export type InsertDocument = z.infer<typeof insertDocumentSchema>;
export type Document = typeof documents.$inferSelect;
export type InsertMessage = z.infer<typeof insertMessageSchema>;
export type Message = typeof messages.$inferSelect;
export type InsertAssessment = z.infer<typeof insertAssessmentSchema>;
export type Assessment = typeof assessments.$inferSelect;
export type InsertInvoice = z.infer<typeof insertInvoiceSchema>;
export type Invoice = typeof invoices.$inferSelect;
