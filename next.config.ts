import type { NextConfig } from "next";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { initOpenNextCloudflareForDev } from "@opennextjs/cloudflare";

const projectRoot = path.dirname(fileURLToPath(import.meta.url));

const nextConfig: NextConfig = {
  // Empeche Turbopack de remonter dans freelance/ chercher un lockfile parent (CLAUDE.md §13).
  turbopack: {
    root: projectRoot,
  },
};

export default nextConfig;

// Desactive par defaut (CLAUDE.md §13) : a n'activer (appel `initOpenNextCloudflareForDev()`)
// que lorsque wrangler.jsonc aura un vrai database_id D1 + id KV. Sinon wrangler boucle
// sur des bindings vides et fait exploser la RAM en dev.
void initOpenNextCloudflareForDev;
