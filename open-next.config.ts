import { defineCloudflareConfig } from "@opennextjs/cloudflare";

// Configuration de l'adaptateur OpenNext -> Cloudflare Workers.
// C'est `opennextjs-cloudflare build` qui lit ce fichier, lance `next build`,
// puis génère `.open-next/worker.js` (le point d'entrée attendu par wrangler).
//
// Cache incrémental (ISR) optionnel : à activer plus tard via un binding R2/KV
// si le site a besoin de revalidation. Showcase statique -> laissé vide.
export default defineCloudflareConfig({});
