import { getDb } from "./cloudflare";
import { sha256Hex } from "./security";

export type UserRole = "member" | "admin";
export type TicketStatus = "sent" | "pending" | "accepted" | "refused" | "investigation" | "resolved";

export interface AppUser {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  createdAt: string;
}

export interface AppTicket {
  id: string;
  userId: string | null;
  requesterName: string;
  requesterEmail: string;
  title: string;
  category: string;
  urgency: string;
  description: string;
  status: TicketStatus;
  adminNotes: string;
  createdAt: string;
  updatedAt: string;
}

export interface TicketEvent {
  id: string;
  ticketId: string;
  actorId: string | null;
  status: TicketStatus;
  note: string;
  createdAt: string;
}

function mapUser(row: Record<string, unknown>): AppUser {
  return {
    id: String(row.id),
    name: String(row.name),
    email: String(row.email),
    role: row.role === "admin" ? "admin" : "member",
    createdAt: String(row.created_at),
  };
}

function mapTicket(row: Record<string, unknown>): AppTicket {
  return {
    id: String(row.id),
    userId: row.user_id ? String(row.user_id) : null,
    requesterName: String(row.requester_name),
    requesterEmail: String(row.requester_email),
    title: String(row.title),
    category: String(row.category),
    urgency: String(row.urgency),
    description: String(row.description),
    status: String(row.status) as TicketStatus,
    adminNotes: String(row.admin_notes ?? ""),
    createdAt: String(row.created_at),
    updatedAt: String(row.updated_at),
  };
}

export async function findUserByEmail(email: string) {
  const db = getDb();
  const row = await db
    .prepare("SELECT id, name, email, password_hash, role, created_at FROM users WHERE lower(email) = lower(?) LIMIT 1")
    .bind(email)
    .first<Record<string, unknown>>();

  return row
    ? { ...mapUser(row), passwordHash: String(row.password_hash) }
    : null;
}

export async function findUserBySessionToken(token: string) {
  const db = getDb();
  const tokenHash = await sha256Hex(token);

  const row = await db
    .prepare(
      `SELECT u.id, u.name, u.email, u.role, u.created_at
       FROM sessions s
       JOIN users u ON u.id = s.user_id
       WHERE s.token_hash = ? AND s.expires_at > datetime('now')
       LIMIT 1`,
    )
    .bind(tokenHash)
    .first<Record<string, unknown>>();

  return row ? mapUser(row) : null;
}

export async function createUser(input: {
  name: string;
  email: string;
  passwordHash: string;
  role?: UserRole;
}) {
  const db = getDb();
  const user = {
    id: crypto.randomUUID(),
    name: input.name.trim(),
    email: input.email.trim().toLowerCase(),
    passwordHash: input.passwordHash,
    role: input.role ?? "member",
    createdAt: new Date().toISOString(),
  };

  await db
    .prepare(
      `INSERT INTO users (id, name, email, password_hash, role, created_at)
       VALUES (?, ?, ?, ?, ?, ?)`,
    )
    .bind(user.id, user.name, user.email, user.passwordHash, user.role, user.createdAt)
    .run();

  return user;
}

export async function createSession(userId: string, token: string, expiresAt: string) {
  const db = getDb();
  const tokenHash = await sha256Hex(token);
  const createdAt = new Date().toISOString();
  const id = crypto.randomUUID();

  await db
    .prepare(
      `INSERT INTO sessions (id, user_id, token_hash, expires_at, created_at)
       VALUES (?, ?, ?, ?, ?)`,
    )
    .bind(id, userId, tokenHash, expiresAt, createdAt)
    .run();

  return { id, tokenHash, expiresAt, createdAt };
}

export async function destroySession(token: string) {
  const db = getDb();
  const tokenHash = await sha256Hex(token);
  await db.prepare("DELETE FROM sessions WHERE token_hash = ?").bind(tokenHash).run();
}

export async function createTicket(input: {
  userId: string | null;
  requesterName: string;
  requesterEmail: string;
  title: string;
  category: string;
  urgency: string;
  description: string;
}) {
  const db = getDb();
  const ticket: AppTicket = {
    id: crypto.randomUUID(),
    userId: input.userId,
    requesterName: input.requesterName.trim(),
    requesterEmail: input.requesterEmail.trim().toLowerCase(),
    title: input.title.trim(),
    category: input.category.trim(),
    urgency: input.urgency.trim(),
    description: input.description.trim(),
    status: "sent",
    adminNotes: "",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  await db
    .prepare(
      `INSERT INTO tickets
        (id, user_id, requester_name, requester_email, title, category, urgency, description, status, admin_notes, created_at, updated_at)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    )
    .bind(
      ticket.id,
      ticket.userId,
      ticket.requesterName,
      ticket.requesterEmail,
      ticket.title,
      ticket.category,
      ticket.urgency,
      ticket.description,
      ticket.status,
      ticket.adminNotes,
      ticket.createdAt,
      ticket.updatedAt,
    )
    .run();

  await createTicketEvent(ticket.id, null, "sent", "Demande envoyée");

  return ticket;
}

export async function createTicketEvent(
  ticketId: string,
  actorId: string | null,
  status: TicketStatus,
  note = "",
) {
  const db = getDb();
  await db
    .prepare(
      `INSERT INTO ticket_events (id, ticket_id, actor_id, status, note, created_at)
       VALUES (?, ?, ?, ?, ?, ?)`,
    )
    .bind(crypto.randomUUID(), ticketId, actorId, status, note, new Date().toISOString())
    .run();
}

export async function listTicketsForUser(user: AppUser) {
  const db = getDb();
  const { results } = await db
    .prepare(
      `SELECT *
       FROM tickets
       WHERE user_id = ? OR requester_email = ?
       ORDER BY created_at DESC`,
    )
    .bind(user.id, user.email)
    .all<Record<string, unknown>>();

  return results.map(mapTicket);
}

export async function listAllTickets() {
  const db = getDb();
  const { results } = await db
    .prepare(
      `SELECT
         t.*,
         u.name AS owner_name,
         u.email AS owner_email,
         u.role AS owner_role
       FROM tickets t
       LEFT JOIN users u ON u.id = t.user_id
       ORDER BY t.created_at DESC`,
    )
    .all<Record<string, unknown>>();

  return results.map((row: Record<string, unknown>) => ({
    ...mapTicket(row),
    ownerName: row.owner_name ? String(row.owner_name) : null,
    ownerEmail: row.owner_email ? String(row.owner_email) : null,
    ownerRole: row.owner_role ? String(row.owner_role) : null,
  }));
}

export async function getTicketById(ticketId: string) {
  const db = getDb();
  const row = await db
    .prepare("SELECT * FROM tickets WHERE id = ? LIMIT 1")
    .bind(ticketId)
    .first<Record<string, unknown>>();

  return row ? mapTicket(row) : null;
}

export async function getTicketEvents(ticketId: string) {
  const db = getDb();
  const { results } = await db
    .prepare(
      `SELECT id, ticket_id, actor_id, status, note, created_at
       FROM ticket_events
       WHERE ticket_id = ?
       ORDER BY created_at ASC`,
    )
    .bind(ticketId)
    .all<Record<string, unknown>>();

  return results.map((row: Record<string, unknown>) => ({
    id: String(row.id),
    ticketId: String(row.ticket_id),
    actorId: row.actor_id ? String(row.actor_id) : null,
    status: String(row.status) as TicketStatus,
    note: String(row.note ?? ""),
    createdAt: String(row.created_at),
  }));
}

export async function updateTicketStatus(input: {
  ticketId: string;
  status: TicketStatus;
  adminNotes: string;
  actorId: string;
}) {
  const db = getDb();
  const updatedAt = new Date().toISOString();

  await db
    .prepare(
      `UPDATE tickets
       SET status = ?, admin_notes = ?, updated_at = ?
       WHERE id = ?`,
    )
    .bind(input.status, input.adminNotes.trim(), updatedAt, input.ticketId)
    .run();

  await createTicketEvent(input.ticketId, input.actorId, input.status, input.adminNotes.trim());
}