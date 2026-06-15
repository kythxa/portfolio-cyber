import Link from "next/link";

export default function ProjectsPage() {
  return (
    <main className="content-stack">
      <section className="page-hero panel">
        <p className="eyebrow">03 // PROJETS</p>
        <h1 className="page-title">Les dossiers à venir.</h1>
        <p className="page-intro">
          Cette page regroupe les projets qui seront ajoutés au fur et à mesure
          de l’évolution du portfolio.
        </p>
      </section>

      <section className="section">
        <div className="panel dossier-card">
          <p className="card-label">PROJETS À VENIR</p>
          <p className="paragraph">
            Les prochains travaux viendront compléter le portfolio au fil du temps.
          </p>
        </div>
      </section>

      <section className="section section-actions">
        <Link className="btn btn-primary" href="/contact">
          Me contacter
        </Link>
        <Link className="btn btn-secondary" href="/">
          Retour à l’accueil
        </Link>
      </section>
    </main>
  );
}