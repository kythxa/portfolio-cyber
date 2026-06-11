import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Kyra — Cyber-Enquêtrice",
  description:
    "Portfolio de cyber-enquêtrice. Découvrez mes compétences en cybersécurité, mes projets et mon expérience professionnelle dans le domaine de la cyber-enquête. Explorez mon parcours et contactez-moi pour toute collaboration ou opportunité professionnelle.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body>{children}</body>
    </html>
  );
}