import Link from "next/link";
import Image from "next/image";

const formationCards = [
  {
    title: "2025 – 2026 // 1ère CIEL",
    text: "Baccalauréat professionnel CIEL à La Cordeille.",
    items: [
      "Conception et réalisation de cartes électroniques.",
      "Mise en service et maintenance de systèmes électroniques.",
      "Programmation de cartes Arduino.",
      "Installation et mise en service de réseaux informatiques.",
      "Configuration d’équipements réseaux : switch, routeur, borne Wi-Fi, caméra IP.",
    ],
  },
  {
    title: "2024 – 2025 // 2nde MTNE",
    text: "Baccalauréat professionnel à La Cordeille.",
    items: [
      "Montage, assemblage et soudure de cartes électroniques.",
      "Développement HTML, CSS et JavaScript.",
      "Assemblage et installation de PC.",
      "Création et configuration de machines virtuelles.",
    ],
  },
];

const experienceCards = [
  {
    title: "Stage // Comprox Technologies",
    text: "1er stage de 2nde MTNE.",
    items: ["Dépannage et réparation informatique sur ordinateurs fixes et portables."],
  },
  {
    title: "Stage // DIGISYS",
    text: "2e stage de 2nde MTNE.",
    items: ["Programmation et développement en langage C# et Python."],
  },
];

const qualities = [
  "Esprit logique et méthodique",
  "Autonomie et indépendance",
  "Curiosité technologique",
  "Analyse et réflexion",
  "Sens critique",
  "Rigueur et discipline",
];

export default function AboutPage() {
  return (
    <main className="content-stack">
      <section className="page-hero panel">
        <p className="eyebrow">01 // À PROPOS</p>
        <h1 className="page-title">
          Une approche méthodique, discrète et orientée investigation.
        </h1>
        <p className="page-intro">
          Je développe mes compétences dans les domaines de la cybersécurité,
          des réseaux et de l'investigation numérique, avec une approche basée
          sur la logique, l'analyse et la curiosité technique.
        </p>
      </section>

      <section className="section">
        <div className="section-title">
          <p className="section-kicker">À PROPOS DE MOI</p>
        </div>

        <div className="about-grid panel">
          <div className="portrait-frame">
            <Image
              src="/kyragreen.jpg"
              alt="Portrait de Kyra"
              fill
              className="portrait-image"
              priority
            />
          </div>

          <div className="stack">
            <p className="paragraph">
              Élève en Première CIEL, je m'intéresse particulièrement à la
              cybersécurité, aux réseaux, à l'investigation numérique et au
              développement informatique.
            </p>

            <p className="paragraph">
              J'aime comprendre comment fonctionne un système, analyser les
              informations disponibles et construire une vision claire à partir
              d'indices techniques.
            </p>

            <p className="paragraph">
              Mon objectif est de continuer à approfondir mes connaissances
              dans la protection des systèmes d'information et la cyber-
              investigation.
            </p>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="section-title">
          <p className="section-kicker">FORMATION</p>
          <h3>Le parcours</h3>
        </div>

        <div className="cards-grid">
          {formationCards.map((card) => (
            <article className="panel dossier-card" key={card.title}>
              <p className="card-label">{card.title}</p>
              <p className="paragraph">{card.text}</p>
              <ul className="mini-list">
                {card.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      <section className="section">
        <div className="section-title">
          <p className="section-kicker">EXPÉRIENCE</p>
          <h3>Les stages</h3>
        </div>

        <div className="cards-grid">
          {experienceCards.map((card) => (
            <article className="panel dossier-card" key={card.title}>
              <p className="card-label">{card.title}</p>
              <p className="paragraph">{card.text}</p>
              <ul className="mini-list">
                {card.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      <section className="section">
        <div className="section-title">
          <p className="section-kicker">QUALITÉS</p>
          <h3>Ce qui me définit</h3>
        </div>

        <div className="skills-grid">
          {qualities.map((item) => (
            <article className="panel skill-chip" key={item}>
              <span className="skill-dot" aria-hidden="true" />
              <span>{item}</span>
            </article>
          ))}
        </div>
      </section>

      <section className="section">
        <div className="section-title">
          <p className="section-kicker">OBJECTIF</p>
          <h3>La direction</h3>
        </div>

        <div className="panel text-panel">
          <p className="paragraph">
            Passionnée par les technologies numériques et la sécurité des
            systèmes, je souhaite continuer à évoluer dans les domaines de la
            cybersécurité, des réseaux et de l'investigation numérique.
          </p>

          <p className="paragraph">
            Ce portfolio sert à présenter mon parcours, mes compétences et ma
            progression dans un univers cohérent avec mon profil technique.
          </p>
        </div>
      </section>

      <section className="section section-actions">
        <Link className="btn btn-primary" href="/skills">
          Voir les compétences
        </Link>
        <Link className="btn btn-secondary" href="/">
          Retour à l'accueil
        </Link>
      </section>
    </main>
  );
}