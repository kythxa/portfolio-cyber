"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const links = [
  { href: "/", label: "Accueil" },
  { href: "/about", label: "À propos" },
  { href: "/skills", label: "Compétences" },
  { href: "/projects", label: "Projets" },
  { href: "/support", label: "Aide" },
  { href: "/member", label: "Espace membre" },
  { href: "/admin", label: "Admin" },
  { href: "/contact", label: "Contact" },
];

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <header className="topbar">
      <Link className="brand" href="/">
        KYRA
      </Link>

      <button
        type="button"
        className="burger-button"
        aria-label="Ouvrir le menu"
        aria-expanded={open}
        onClick={() => setOpen((value) => !value)}
      >
        <span className={open ? "burger-line top open" : "burger-line top"} />
        <span className={open ? "burger-line middle open" : "burger-line middle"} />
        <span className={open ? "burger-line bottom open" : "burger-line bottom"} />
      </button>

      <nav className={open ? "topnav mobile-open" : "topnav"} aria-label="Navigation principale">
        {links.map((link) => {
          const active = pathname === link.href;
          return (
            <Link
              key={link.href}
              href={link.href}
              className={active ? "navlink active" : "navlink"}
              aria-current={active ? "page" : undefined}
            >
              {link.label}
            </Link>
          );
        })}
      </nav>
    </header>
  );
}