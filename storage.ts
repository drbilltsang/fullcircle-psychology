import { 
  users, 
  appointments, 
  documents, 
  messages, 
  assessments,
  invoices,
  type User, 
  type InsertUser,
  type Appointment,
  type InsertAppointment,
  type Document,
  type InsertDocument,
  type Message,
  type InsertMessage,
  type Assessment,
  type InsertAssessment,
  type Invoice,
  type InsertInvoice
} from "@shared/schema";
import { db } from "./db";
import { eq, and, desc } from "drizzle-orm";

export interface IStorage {
  // User operations
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  getUserByEmail(email: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  authenticateUser(username: string, password: string): Promise<User | null>;
  
  // Appointment operations
  getAppointments(patientId: number): Promise<Appointment[]>;
  getAppointmentById(id: number): Promise<Appointment | undefined>;
  createAppointment(appointment: InsertAppointment): Promise<Appointment>;
  updateAppointmentStatus(id: number, status: string): Promise<Appointment | undefined>;
  
  // Document operations
  getDocuments(patientId: number): Promise<Document[]>;
  uploadDocument(document: InsertDocument): Promise<Document>;
  
  // Message operations
  getMessages(userId: number): Promise<Message[]>;
  sendMessage(message: InsertMessage): Promise<Message>;
  markMessageAsRead(messageId: number): Promise<void>;
  
  // Assessment operations
  getAssessments(patientId: number): Promise<Assessment[]>;
  createAssessment(assessment: InsertAssessment): Promise<Assessment>;
  updateAssessmentResponses(id: number, responses: any): Promise<Assessment | undefined>;
  
  // Invoice operations
  getInvoices(patientId: number): Promise<Invoice[]>;
  createInvoice(invoice: InsertInvoice): Promise<Invoice>;
  updateInvoicePayment(invoiceId: number, status: string, paymentMethod: string, paymentIntentId?: string): Promise<Invoice | undefined>;
}

export class DatabaseStorage implements IStorage {
  // User operations
  async getUser(id: number): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user || undefined;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user || undefined;
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.email, email));
    return user || undefined;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db
      .insert(users)
      .values(insertUser)
      .returning();
    return user;
  }

  async authenticateUser(username: string, password: string): Promise<User | null> {
    const user = await this.getUserByUsername(username);
    if (!user) return null;
    
    // For now, simple password comparison - in production use bcrypt
    return user.passwordHash === password ? user : null;
  }

  // Appointment operations
  async getAppointments(patientId: number): Promise<Appointment[]> {
    return await db
      .select()
      .from(appointments)
      .where(eq(appointments.patientId, patientId))
      .orderBy(desc(appointments.appointmentDate));
  }

  async getAppointmentById(id: number): Promise<Appointment | undefined> {
    const [appointment] = await db.select().from(appointments).where(eq(appointments.id, id));
    return appointment || undefined;
  }

  async createAppointment(appointment: InsertAppointment): Promise<Appointment> {
    const [newAppointment] = await db
      .insert(appointments)
      .values(appointment)
      .returning();
    return newAppointment;
  }

  async updateAppointmentStatus(id: number, status: string): Promise<Appointment | undefined> {
    const [updated] = await db
      .update(appointments)
      .set({ status, updatedAt: new Date() })
      .where(eq(appointments.id, id))
      .returning();
    return updated || undefined;
  }

  // Document operations
  async getDocuments(patientId: number): Promise<Document[]> {
    return await db
      .select()
      .from(documents)
      .where(eq(documents.patientId, patientId))
      .orderBy(desc(documents.uploadDate));
  }

  async uploadDocument(document: InsertDocument): Promise<Document> {
    const [newDocument] = await db
      .insert(documents)
      .values(document)
      .returning();
    return newDocument;
  }

  // Message operations
  async getMessages(userId: number): Promise<Message[]> {
    return await db
      .select()
      .from(messages)
      .where(eq(messages.toUserId, userId))
      .orderBy(desc(messages.sentAt));
  }

  async sendMessage(message: InsertMessage): Promise<Message> {
    const [newMessage] = await db
      .insert(messages)
      .values(message)
      .returning();
    return newMessage;
  }

  async markMessageAsRead(messageId: number): Promise<void> {
    await db
      .update(messages)
      .set({ isRead: true })
      .where(eq(messages.id, messageId));
  }

  // Assessment operations
  async getAssessments(patientId: number): Promise<Assessment[]> {
    return await db
      .select()
      .from(assessments)
      .where(eq(assessments.patientId, patientId))
      .orderBy(desc(assessments.createdAt));
  }

  async createAssessment(assessment: InsertAssessment): Promise<Assessment> {
    const [newAssessment] = await db
      .insert(assessments)
      .values(assessment)
      .returning();
    return newAssessment;
  }

  async updateAssessmentResponses(id: number, responses: any): Promise<Assessment | undefined> {
    const [updated] = await db
      .update(assessments)
      .set({ 
        responses, 
        status: 'completed',
        completedAt: new Date() 
      })
      .where(eq(assessments.id, id))
      .returning();
    return updated || undefined;
  }

  // Invoice operations
  async getInvoices(patientId: number): Promise<Invoice[]> {
    return await db
      .select()
      .from(invoices)
      .where(eq(invoices.patientId, patientId))
      .orderBy(desc(invoices.createdAt));
  }

  async createInvoice(invoice: InsertInvoice): Promise<Invoice> {
    const [newInvoice] = await db
      .insert(invoices)
      .values(invoice)
      .returning();
    return newInvoice;
  }

  async updateInvoicePayment(invoiceId: number, status: string, paymentMethod: string, paymentIntentId?: string): Promise<Invoice | undefined> {
    const [updated] = await db
      .update(invoices)
      .set({ 
        status, 
        paymentMethod,
        paymentDate: new Date(),
        stripePaymentIntentId: paymentIntentId
      })
      .where(eq(invoices.id, invoiceId))
      .returning();
    return updated || undefined;
  }
}

export const storage = new DatabaseStorage();
