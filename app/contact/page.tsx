import Link from "next/link";

export default function ContactPage() {
  return (
    <main className="content-stack">
      <section className="page-hero panel">
        <p className="eyebrow">04 // CONTACT</p>
        <h1 className="page-title">Entrer en relation.</h1>
        <p className="page-intro">
          Pour un stage, un projet ou un échange technique, tu peux me joindre
          directement ici.
        </p>
      </section>

      <section className="section">
        <div className="panel contact-panel">
          <div className="stack">
            <p className="paragraph">
              Email :{" "}
              <a href="mailto:wildstetsqll@gmail.com">wildstetsqll@gmail.com</a>
            </p>
            <p className="paragraph">
              GitHub :{" "}
              <a href="https://github.com/kythxa" target="_blank" rel="noreferrer">
                github.com/kythxa
              </a>
            </p>
          </div>

          <div className="contact-links">
            <a href="mailto:wildstetsqll@gmail.com">Envoyer un mail</a>
            <a href="https://github.com/kythxa" target="_blank" rel="noreferrer">
              Ouvrir GitHub
            </a>
            <a href="/">Retour à l’accueil</a>
          </div>
        </div>
      </section>
    </main>
  );
}