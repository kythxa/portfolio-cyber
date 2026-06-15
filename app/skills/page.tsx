import Link from "next/link";

const skillGroups = [
  {
    title: "Investigation numérique",
    text: "Compétences les plus proches du métier de cyber-enquêtrice.",
    items: [
      "OSINT / recherche d'informations publiques",
      "Recoupement d'indices",
      "Analyse de contexte technique",
      "Rédaction de synthèses claires",
      "Lecture de traces et d'événements",
    ],
  },
  {
    title: "Réseaux",
    text: "Ce que j'ai appris en configuration et en mise en service.",
    items: [
      "Installation et mise en service de réseaux informatiques",
      "Configuration de switchs",
      "Configuration de routeurs",
      "Configuration de bornes Wi-Fi",
      "Caméras IP",
    ],
  },
  {
    title: "Développement",
    text: "Les bases utiles pour créer et comprendre des outils techniques.",
    items: ["HTML", "CSS", "JavaScript", "C#", "Python", "Arduino"],
  },
  {
    title: "Électronique & systèmes",
    text: "La partie matérielle et maintenance.",
    items: [
      "Conception de cartes électroniques",
      "Montage, assemblage et soudure",
      "Maintenance de systèmes électroniques",
      "Dépannage informatique",
      "Assemblage et installation de PC",
      "Machines virtuelles",
    ],
  },
];

const method = [
  {
    step: "01",
    title: "Observation",
    text: "Comprendre le contexte, l'environnement et les éléments à surveiller.",
  },
  {
    step: "02",
    title: "Analyse",
    text: "Croiser les indices, isoler les faits et supprimer le superflu.",
  },
  {
    step: "03",
    title: "Restitution",
    text: "Présenter le résultat proprement, avec une structure solide et claire.",
  },
];

export default function SkillsPage() {
  return (
    <main className="content-stack">
      <section className="page-hero panel">
        <p className="eyebrow">02 // COMPÉTENCES</p>
        <h1 className="page-title">Des outils, de la logique et de la méthode.</h1>
        <p className="page-intro">
          J'ai gardé ici les compétences utiles à un vrai profil technique :
          enquête, réseaux, électronique, développement et systèmes.
        </p>
      </section>

      <section className="section">
        <div className="cards-grid">
          {skillGroups.map((group) => (
            <article className="panel dossier-card" key={group.title}>
              <p className="card-label">{group.title}</p>
              <p className="paragraph">{group.text}</p>
              <ul className="mini-list">
                {group.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      <section className="section">
        <div className="section-title">
          <p className="section-kicker">MÉTHODE</p>
          <h3>Comment je travaille</h3>
        </div>

        <div className="timeline">
          {method.map((item) => (
            <article className="panel timeline-item" key={item.step}>
              <div className="timeline-step">{item.step}</div>
              <div>
                <h4>{item.title}</h4>
                <p>{item.text}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="section section-actions">
        <Link className="btn btn-primary" href="/projects">
          Voir les projets
        </Link>
        <Link className="btn btn-secondary" href="/">
          Retour à l'accueil
        </Link>
      </section>
    </main>
  );
}