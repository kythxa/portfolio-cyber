"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { TicketProgress } from "@/components/ticket-progress";
import type { AppTicket, AppUser, TicketStatus } from "@/lib/store";

const statusOptions: TicketStatus[] = ["sent", "pending", "accepted", "refused", "investigation", "resolved"];

type AdminTicket = AppTicket & {
  ownerName: string | null;
  ownerEmail: string | null;
  ownerRole: string | null;
};

export default function AdminPage() {
  const [user, setUser] = useState<AppUser | null>(null);
  const [tickets, setTickets] = useState<AdminTicket[]>([]);
  const [loading, setLoading] = useState(true);
  const [savingId, setSavingId] = useState<string | null>(null);

  async function load() {
    setLoading(true);
    const meResponse = await fetch("/api/me");
    if (!meResponse.ok) {
      setUser(null);
      setTickets([]);
      setLoading(false);
      return;
    }

    const meData = await meResponse.json() as { user?: AppUser };
    setUser(meData.user ?? null);

    if (meData.user?.role !== "admin") {
      setTickets([]);
      setLoading(false);
      return;
    }

    const ticketsResponse = await fetch("/api/admin/tickets");
    const ticketsData = (await ticketsResponse
      .json()
      .catch(() => ({ tickets: [] }))) as { tickets?: AdminTicket[] };
    setTickets(ticketsData.tickets ?? []);
    setLoading(false);
  }

  useEffect(() => {
    load().catch(() => setLoading(false));
  }, []);

  async function logout() {
    await fetch("/api/auth/logout", { method: "POST" });
    setUser(null);
    setTickets([]);
    await load();
  }

  async function saveTicket(ticket: AdminTicket) {
    setSavingId(ticket.id);
    await fetch(`/api/admin/tickets/${ticket.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        status: ticket.status,
        adminNotes: ticket.adminNotes,
      }),
    });
    setSavingId(null);
    await load();
  }

  return (
    <main className="content-stack">
      <section className="page-hero panel">
        <p className="eyebrow">ADMIN // DASHBOARD</p>
        <h1 className="page-title">Gestion des missions.</h1>
        <p className="page-intro">
          Chaque demande apparaît ici pour être triée, acceptée, refusée, suivie et résolue.
        </p>
      </section>

      {user ? (
        <section className="section">
          <div className="dashboard-toolbar">
            <div className="dashboard-chip">
              <span>{user.email}</span>
              <span className="dashboard-role">{user.role}</span>
            </div>
            <div className="hero-actions">
              <Link className="btn btn-secondary" href="/support">
                Voir le formulaire public
              </Link>
              <button className="btn btn-primary" type="button" onClick={logout}>
                Déconnexion
              </button>
            </div>
          </div>
        </section>
      ) : (
        <section className="section">
          <div className="panel auth-panel">
            <p className="paragraph">Vous devez être connecté avec un compte admin.</p>
            <div className="form-actions">
              <Link className="btn btn-primary" href="/login">
                Se connecter
              </Link>
            </div>
          </div>
        </section>
      )}

      <section className="section">
        {loading ? (
          <div className="panel auth-panel">
            <p className="paragraph">Chargement du dashboard…</p>
          </div>
        ) : user?.role === "admin" ? (
          <div className="ticket-grid">
            {tickets.map((ticket) => (
              <article key={ticket.id} className="panel ticket-card">
                <div className="ticket-head">
                  <div>
                    <p className="card-label">{ticket.title}</p>
                    <p className="ticket-meta">
                      {ticket.category} • {ticket.urgency}
                    </p>
                    <p className="ticket-meta">
                      {ticket.ownerName ?? ticket.requesterName} • {ticket.ownerEmail ?? ticket.requesterEmail}
                    </p>
                  </div>
                  <span className="ticket-status">{ticket.status}</span>
                </div>

                <p className="paragraph">{ticket.description}</p>

                <TicketProgress status={ticket.status} />

                <div className="admin-form">
                  <label className="field">
                    <span>Statut</span>
                    <select
                      value={ticket.status}
                      onChange={(e) =>
                        setTickets((current) =>
                          current.map((row) =>
                            row.id === ticket.id ? { ...row, status: e.target.value as TicketStatus } : row,
                          ),
                        )
                      }
                    >
                      {statusOptions.map((status) => (
                        <option key={status} value={status}>
                          {status}
                        </option>
                      ))}
                    </select>
                  </label>

                  <label className="field field-full">
                    <span>Notes admin</span>
                    <textarea
                      value={ticket.adminNotes}
                      onChange={(e) =>
                        setTickets((current) =>
                          current.map((row) =>
                            row.id === ticket.id ? { ...row, adminNotes: e.target.value } : row,
                          ),
                        )
                      }
                      rows={4}
                    />
                  </label>

                  <button
                    className="btn btn-primary"
                    type="button"
                    disabled={savingId === ticket.id}
                    onClick={() => saveTicket(ticket)}
                  >
                    {savingId === ticket.id ? "Sauvegarde..." : "Sauvegarder"}
                  </button>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="panel auth-panel">
            <p className="paragraph">Accès refusé.</p>
          </div>
        )}
      </section>
    </main>
  );
}