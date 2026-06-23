import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";
import { SiteHeader } from "@/components/site-header";

export const metadata: Metadata = {
  title: "Kyra — Cyber-enquêtrice",
  description: "Portfolio sombre et cinématographique d’une cyber-enquêtrice en formation.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="fr">
      <body>
        <div className="noise" aria-hidden="true" />
        <SiteHeader />
        <div className="page-shell">{children}</div>
      </body>
    </html>
  );
}