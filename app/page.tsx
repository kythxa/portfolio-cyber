import Link from "next/link";

const signals = [
  "Étudiante en 1ère CIEL",
  "Réseaux et électronique",
  "Programmation et virtualisation",
  "Investigation numérique",
];

const previewCards = [
  {
    title: "À propos",
    text: "Mon parcours, mon objectif et ma manière de travailler.",
    href: "/about",
  },
  {
    title: "Compétences",
    text: "OSINT, réseaux, électronique, programmation et outils utiles.",
    href: "/skills",
  },
  {
    title: "Contact",
    text: "Me joindre pour un stage, un projet ou un échange technique.",
    href: "/contact",
  },
];

export default function Home() {
  return (
    <main className="content-stack">
      <section className="hero">
        <div className="panel hero-main">
          <p className="eyebrow">PORTFOLIO // CYBER-ENQUÊTRICE</p>
          <h1>KYRA</h1>
          <h2>Cyber-enquêtrice</h2>

          <p className="lead">
            Chaque système laisse des traces.
            <br />
            Je les collecte, je les recoupe, puis je reconstruis le récit
            qu’il essayait de cacher.
          </p>

          <div className="hero-actions">
            <Link className="btn btn-primary" href="/about">
              Découvrir le profil
            </Link>
            <Link className="btn btn-secondary" href="/contact">
              Me contacter
            </Link>
          </div>
        </div>

        <aside className="panel hero-aside">
          <p className="card-label">SIGNAL ACTIF</p>
          <ul className="signal-list">
            {signals.map((signal) => (
              <li key={signal}>{signal}</li>
            ))}
          </ul>

          <div className="divider" />

          <p className="card-label">PROFIL</p>
          <p className="card-text">
            Je m’intéresse à la cybersécurité, à l’investigation numérique, aux
            réseaux, à l’électronique et à la programmation.
          </p>
        </aside>
      </section>

      <section className="section">
        <div className="section-title">
          <p className="section-kicker">APERÇU</p>
          <h3>Entrer dans le dossier</h3>
        </div>

        <div className="cards-grid">
          {previewCards.map((card) => (
            <Link key={card.href} href={card.href} className="panel card-link">
              <p className="card-label">{card.title}</p>
              <p className="paragraph">{card.text}</p>
              <span className="card-arrow">Ouvrir →</span>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}