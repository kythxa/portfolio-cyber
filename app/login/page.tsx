"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LoginPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError("");

    const response = await fetch("/api/auth/login", {
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
      setError(payload.error ?? "Connexion impossible.");
      return;
    }

    router.push(payload.redirectTo ?? "/member");
    router.refresh();
  }

  return (
    <main className="content-stack">
      <section className="page-hero panel">
        <p className="eyebrow">MEMBRE // CONNEXION</p>
        <h1 className="page-title">Se connecter.</h1>
        <p className="page-intro">
          Accédez à votre suivi de mission, à vos demandes et à leur état.
        </p>
      </section>

      <section className="section">
        <form className="panel auth-panel" onSubmit={handleSubmit}>
          <div className="form-grid">
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
              {loading ? "Connexion..." : "Se connecter"}
            </button>
            <Link className="btn btn-secondary" href="/register">
              Créer un compte
            </Link>
          </div>

          {error ? <p className="status-banner error">{error}</p> : null}
        </form>
      </section>
    </main>
  );
}