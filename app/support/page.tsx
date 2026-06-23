"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

type FormState = {
  requesterName: string;
  requesterEmail: string;
  title: string;
  category: string;
  urgency: string;
  description: string;
};

const emptyState: FormState = {
  requesterName: "",
  requesterEmail: "",
  title: "",
  category: "Compte / accès",
  urgency: "normal",
  description: "",
};

export default function SupportPage() {
  const [form, setForm] = useState<FormState>(emptyState);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("/api/me")
      .then(async (response) => {
        if (!response.ok) return null;
        return response.json();
      })
      .then((data: any) => {
        if (data?.user) {
          setForm((current) => ({
            ...current,
            requesterName: data.user.name ?? current.requesterName,
            requesterEmail: data.user.email ?? current.requesterEmail,
          }));
        }
      })
      .catch(() => {});
  }, []);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setSuccess("");
    setError("");

    const response = await fetch("/api/tickets", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    const payload = (await response.json().catch(() => ({}))) as { error?: string } | Record<string, any>;
    setLoading(false);

    if (!response.ok) {
      setError(payload.error ?? "Une erreur est survenue.");
      return;
    }

    setSuccess(
      "Votre demande a bien été envoyée. Pour suivre son état, vous pouvez vous connecter à votre espace membre.",
    );
    setForm(emptyState);
  }

  return (
    <main className="content-stack">
      <section className="page-hero panel">
        <p className="eyebrow">AIDE // DEMANDE DE MISSION</p>
        <h1 className="page-title">Soumettre une demande de cybersécurité.</h1>
        <p className="page-intro">
          Décris le problème, ajoute le contexte utile et je récupère la demande
          comme une mission à traiter.
        </p>
      </section>

      <section className="section">
        <form className="panel form-panel" onSubmit={handleSubmit}>
          <div className="form-grid">
            <label className="field">
              <span>Nom</span>
              <input
                value={form.requesterName}
                onChange={(e) => setForm({ ...form, requesterName: e.target.value })}
                placeholder="Ton nom"
                required
              />
            </label>

            <label className="field">
              <span>Email</span>
              <input
                type="email"
                value={form.requesterEmail}
                onChange={(e) => setForm({ ...form, requesterEmail: e.target.value })}
                placeholder="ton@email.com"
                required
              />
            </label>

            <label className="field">
              <span>Titre de la mission</span>
              <input
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                placeholder="Ex. compte compromis"
                required
              />
            </label>

            <label className="field">
              <span>Catégorie</span>
              <select value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })}>
                <option>Compte / accès</option>
                <option>Phishing</option>
                <option>Réseau</option>
                <option>Malware</option>
                <option>Analyse OSINT</option>
                <option>Autre</option>
              </select>
            </label>

            <label className="field">
              <span>Urgence</span>
              <select value={form.urgency} onChange={(e) => setForm({ ...form, urgency: e.target.value })}>
                <option value="low">Basse</option>
                <option value="normal">Normale</option>
                <option value="high">Haute</option>
                <option value="critical">Critique</option>
              </select>
            </label>

            <label className="field field-full">
              <span>Description</span>
              <textarea
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
                placeholder="Explique le contexte, ce qui s'est passé, les traces déjà observées, et ce que tu attends."
                rows={8}
                required
              />
            </label>
          </div>

          <div className="form-actions">
            <button className="btn btn-primary" type="submit" disabled={loading}>
              {loading ? "Envoi..." : "Envoyer la demande"}
            </button>
            <Link className="btn btn-secondary" href="/member">
              Accès membre
            </Link>
          </div>

          {success ? <p className="status-banner success">{success}</p> : null}
          {error ? <p className="status-banner error">{error}</p> : null}
        </form>
      </section>
    </main>
  );
}