"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { TicketProgress } from "@/components/ticket-progress";
import type { AppTicket, AppUser } from "@/lib/store";

export default function MemberPage() {
  const [user, setUser] = useState<AppUser | null>(null);
  const [tickets, setTickets] = useState<AppTicket[]>([]);
  const [loading, setLoading] = useState(true);

  const hasTickets = tickets.length > 0;

  async function load() {
    setLoading(true);
    const meResponse = await fetch("/api/me");
    if (!meResponse.ok) {
      setUser(null);
      setTickets([]);
      setLoading(false);
      return;
    }

    const meData: any = await meResponse.json().catch(() => ({}));
    setUser(meData.user ?? null);

    const ticketsResponse = await fetch("/api/tickets");
    const ticketsData = (await ticketsResponse.json().catch(() => ({ tickets: [] }))) as { tickets?: AppTicket[] };
    setTickets(ticketsData.tickets ?? []);
    setLoading(false);
  }

  useEffect(() => {
    load().catch(() => setLoading(false));
  }, []);

  const title = useMemo(() => {
    if (!user) return "Accès membre";
    return `Bienvenue, ${user.name}`;
  }, [user]);

  async function logout() {
    await fetch("/api/auth/logout", { method: "POST" });
    setUser(null);
    setTickets([]);
    await load();
  }

  return (
    <main className="content-stack">
      <section className="page-hero panel">
        <p className="eyebrow">MEMBRE // SUIVI</p>
        <h1 className="page-title">{title}</h1>
        <p className="page-intro">
          Suivi de vos missions et de leurs étapes : envoyé → en attente → accepté ou refusé → enquête → résolu.
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
                Nouvelle demande
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
            <p className="paragraph">
              Vous n’êtes pas connecté. Pour suivre l’état d’une demande, créez un compte ou connectez-vous.
            </p>
            <div className="form-actions">
              <Link className="btn btn-primary" href="/login">
                Se connecter
              </Link>
              <Link className="btn btn-secondary" href="/register">
                S’inscrire
              </Link>
            </div>
          </div>
        </section>
      )}

      <section className="section">
        {loading ? (
          <div className="panel auth-panel">
            <p className="paragraph">Chargement des missions…</p>
          </div>
        ) : hasTickets ? (
          <div className="ticket-grid">
            {tickets.map((ticket) => (
              <article key={ticket.id} className="panel ticket-card">
                <div className="ticket-head">
                  <div>
                    <p className="card-label">{ticket.title}</p>
                    <p className="ticket-meta">
                      {ticket.category} • {ticket.urgency}
                    </p>
                  </div>
                  <span className="ticket-status">{ticket.status}</span>
                </div>

                <p className="paragraph">{ticket.description}</p>

                <TicketProgress status={ticket.status} />

                {ticket.adminNotes ? (
                  <div className="ticket-notes">
                    <p className="card-label">Notes admin</p>
                    <p className="paragraph">{ticket.adminNotes}</p>
                  </div>
                ) : null}
              </article>
            ))}
          </div>
        ) : (
          <div className="panel auth-panel">
            <p className="paragraph">
              Aucune mission pour le moment.
            </p>
          </div>
        )}
      </section>
    </main>
  );
}