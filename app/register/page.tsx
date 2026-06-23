"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function RegisterPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError("");

    const response = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    const payload = (await response.json().catch(() => ({}))) as {
      error?: string;
      redirectTo?: string;
    };
    setLoading(false);

    if (!response.ok) {
      setError(payload.error ?? "Inscription impossible.");
      return;
    }

    router.push(payload.redirectTo ?? "/member");
    router.refresh();
  }

  return (
    <main className="content-stack">
      <section className="page-hero panel">
        <p className="eyebrow">MEMBRE // INSCRIPTION</p>
        <h1 className="page-title">Créer un compte.</h1>
        <p className="page-intro">
          Un compte permet de suivre les missions envoyées et leur progression.
        </p>
      </section>

      <section className="section">
        <form className="panel auth-panel" onSubmit={handleSubmit}>
          <div className="form-grid">
            <label className="field field-full">
              <span>Nom</span>
              <input
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                required
              />
            </label>
            <label className="field field-full">
              <span>Email</span>
              <input
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                required
              />
            </label>
            <label className="field field-full">
              <span>Mot de passe</span>
              <input
                type="password"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                required
              />
            </label>
          </div>

          <div className="form-actions">
            <button className="btn btn-primary" type="submit" disabled={loading}>
              {loading ? "Création..." : "Créer le compte"}
            </button>
            <Link className="btn btn-secondary" href="/login">
              J’ai déjà un compte
            </Link>
          </div>

          {error ? <p className="status-banner error">{error}</p> : null}
        </form>
      </section>
    </main>
  );
}