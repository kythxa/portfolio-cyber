const skills = [
  "Cybersécurité",
  "Analyse numérique",
  "Réseaux",
  "Linux",
  "Git / GitHub",
  "HTML / CSS",
  "JavaScript",
  "Investigation technique",
];

const cases = [
  {
    title: "Analyse d’un système",
    text: "Repérage des traces, observation des comportements, lecture des indices techniques.",
  },
  {
    title: "Veille sécurité",
    text: "Surveillance des vulnérabilités, compréhension des risques et documentation des anomalies.",
  },
  {
    title: "Portfolio en construction",
    text: "Un espace sobre, sombre et structuré pour montrer une identité technique claire.",
  },
];

const timeline = [
  {
    year: "01",
    title: "Observation",
    text: "Comprendre le contexte, les outils et les traces laissées par le système.",
  },
  {
    year: "02",
    title: "Analyse",
    text: "Croiser les indices, isoler les éléments utiles et bâtir une lecture logique.",
  },
  {
    year: "03",
    title: "Résolution",
    text: "Présenter les résultats de façon claire, propre et exploitable.",
  },
];

export default function Home() {
  return (
    <main className="page-shell">
      <div className="noise" aria-hidden="true" />

      <header className="hero">
        <div className="hero-content">
          <p className="eyebrow">PORTFOLIO // CYBER INVESTIGATION</p>
          <h1>KYRA</h1>
          <h2>Cyber-enquêtrice</h2>

          <p className="lead">
            Chaque système laisse des traces.
            <br />
            Mon rôle est de les trouver, de les comprendre, puis de les faire parler.
          </p>

          <div className="hero-actions">
            <a href="#about" className="btn btn-primary">
              Explorer le dossier
            </a>
            <a href="#contact" className="btn btn-secondary">
              Me contacter
            </a>
          </div>
        </div>

        <aside className="hero-card">
          <p className="card-label">STATUS</p>
          <ul className="status-list">
            <li>Enquête en cours</li>
            <li>Veille technique active</li>
            <li>Portfolio en construction</li>
          </ul>

          <div className="card-divider" />

          <p className="card-label">SIGNATURE</p>
          <p className="card-text">
            Une esthétique sombre, précise et silencieuse.
            <br />
            Un style entre film noir, terminal et salle d’interrogatoire.
          </p>
        </aside>
      </header>

      <section id="about" className="section">
        <div className="section-title">
          <p className="section-kicker">01</p>
          <h3>À propos</h3>
        </div>

        <div className="panel grid-two">
          <div>
            <p className="paragraph">
              Étudiante en CIEL, je m’intéresse à la cybersécurité, à l’analyse
              technique et à la logique des systèmes.
            </p>
            <p className="paragraph">
              J’aime les environnements sobres, efficaces, avec une identité
              visuelle forte. Ce portfolio sert à présenter mon univers :
              discret, sérieux, et orienté investigation.
            </p>
          </div>

          <div className="quote-box">
            <p className="quote-mark">“</p>
            <p className="quote">
              Rien n’est vraiment invisible. Il faut juste savoir où regarder.
            </p>
          </div>
        </div>
      </section>

      <section id="skills" className="section">
        <div className="section-title">
          <p className="section-kicker">02</p>
          <h3>Compétences</h3>
        </div>

        <div className="skills-grid">
          {skills.map((skill) => (
            <article className="skill-card" key={skill}>
              <span className="skill-dot" />
              <span>{skill}</span>
            </article>
          ))}
        </div>
      </section>

      <section id="cases" className="section">
        <div className="section-title">
          <p className="section-kicker">03</p>
          <h3>Dossiers</h3>
        </div>

        <div className="cases-grid">
          {cases.map((item) => (
            <article className="panel case-card" key={item.title}>
              <p className="card-index">/ {item.title}</p>
              <p className="paragraph">{item.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section id="process" className="section">
        <div className="section-title">
          <p className="section-kicker">04</p>
          <h3>Méthode</h3>
        </div>

        <div className="timeline">
          {timeline.map((step) => (
            <article className="timeline-item" key={step.year}>
              <div className="timeline-year">{step.year}</div>
              <div className="timeline-content">
                <h4>{step.title}</h4>
                <p>{step.text}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section id="contact" className="section">
        <div className="section-title">
          <p className="section-kicker">05</p>
          <h3>Contact</h3>
        </div>

        <div className="panel contact-panel">
          <p className="paragraph">
            Pour un projet, un stage ou une collaboration, tu peux me joindre ici.
          </p>

          <div className="contact-links">
            <a href="mailto:tonmail@example.com">tonmail@example.com</a>
            <a href="https://github.com/" target="_blank" rel="noreferrer">
              GitHub
            </a>
            <a href="#top">Retour en haut</a>
          </div>
        </div>
      </section>

      <footer className="footer">
        <p>KYRA // Cyber-enquêtrice // Portfolio en cours de développement</p>
      </footer>
    </main>
  );
}